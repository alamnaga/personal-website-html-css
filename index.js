const express = require("express");
const app = express();
const port = 5000;

//use handlebars for view engine
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets")); //untuk mengakses file asset
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/contact", contact);
app.get("/add-project", addProject);
app.get("/testimoni", testimoni);
app.get("/project-detail/:id", projectDetail);
app.post("/add-project", handlePostProject);
app.get("/delete/:id", deleteProject);

const data = [];

function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("form");
}
function testimoni(req, res) {
  res.render("testimonial");
}

function duration(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const durationInDays = Math.floor(
    (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
  );
  const durationInWeeks = Math.floor(durationInDays / 7);
  const durationInMonths = Math.floor(durationInDays / 30);

  if (durationInMonths > 0) {
    return `${durationInMonths} Bulan`;
  } else if (durationInWeeks > 0) {
    return `${durationInWeeks} Minggu`;
  } else {
    return `${durationInDays} Hari`;
  }
}

function techToIcon(technologies) {
  const techIconMap = {
    html: { icon: '<i class="fab fa-html5 me-2"></i>', name: 'HTML' },
    react: { icon: '<i class="fab fa-react me-2"></i>', name: 'ReactJS' },
    css: { icon: '<i class="fab fa-css3 me-2"></i>', name: 'CSS' },
    javascript: { icon: '<i class="fab fa-js me-2"></i>', name: 'JavaScript' },
  };

  return technologies.map((tech) => techIconMap[tech]);
}

function addProject(req, res) {
  const addTitle = "Add Project";

  data.forEach((item) => {
    // item.techArray = techToIcon(item.technologies);
    item.duration = duration(item.startDate, item.endDate);
  });

  res.render("project", { data, addTitle });
}

function projectDetail(req, res) {
  const { id } = req.params;

  const dataDetail = data[id];

  console.log(dataDetail);

  res.render("detail-project", { data: dataDetail });
}

function handlePostProject(req, res) {
  const { name, startDate, endDate, desc, technologies } = req.body;

  const technologiesArray = Array.isArray(technologies)
    ? technologies
    : [technologies];

  data.unshift({
    name,
    startDate,
    endDate,
    desc,
    // technologies: technologiesArray,
    techArray: techToIcon(technologiesArray), 
  });

  res.redirect("/add-project");

  console.log(data);
}

function deleteProject(req, res) {
  // console.log("hapus");
  const { id } = req.params

  data.splice(id, 1)
  console.log("berhasil delete id", id);
  res.redirect('/add-project')
}


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
