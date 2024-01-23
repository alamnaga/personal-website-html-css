const express = require("express");
const dbPool = require("./src/connection/index");
const app = express();
const port = 5000;

//sequelize config
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);
let models = require("./src/models");
let projects = models.Project;

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
app.get("/edit-project/:id", editProject);
app.get("/delete/:id", deleteProject);

app.post("/add-project", handlePostProject);
app.post("/edit-project/:id", handleEditProject);

const data = [];
// console.log(SequelizePool);

async function home(req, res) {
  // res.render("index");
  // dbPool.connect((err, client, done) => {
  //   if (err) throw err;

  //   client.query("SELECT * FROM tb_projects", (err, result) => {
  //     done();
  //     if(err) throw err
  //     res.status(200).json(result.rows);
  //   });
  // })
  try {
    const query = await SequelizePool.query("SELECT * FROM projects", {
      type: QueryTypes.SELECT,
    });
    console.log(query);
    res.render("index");
  } catch (error) {
    throw error;
  }
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
    html: { icon: '<i class="fab fa-html5 me-2"></i>', name: "HTML" },
    react: { icon: '<i class="fab fa-react me-2"></i>', name: "ReactJS" },
    css: { icon: '<i class="fab fa-css3 me-2"></i>', name: "CSS" },
    javascript: { icon: '<i class="fab fa-js me-2"></i>', name: "JavaScript" },
  };

  return technologies.map((tech) => techIconMap[tech]);
}

async function addProject(req, res) {
  const addTitle = "Add Project";

  // data.forEach((item) => {
  //   // item.techArray = techToIcon(item.technologies);
  //   item.duration = duration(item.startDate, item.endDate);
  // });

  // res.render("project", { data, addTitle });

  try {
    const query = await SequelizePool.query("SELECT * FROM projects", {
      type: QueryTypes.SELECT,
    });
    const data = query.map((res) => ({
      ...res,
      image:
        "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?w=826&t=st=1705553908~exp=1705554508~hmac=e65ecda5f1b0cc049b17c786b0674845bdd02f9ac3dcda91ed3ae13847e2c389",
      duration: duration(res.start_date, res.end_date),
      techArray: techToIcon(res.technologies),
    }));
    // console.log("INI APA WOY:", data.map(item => ({ startDate: item.startDate, endDate: item.endDate })));
    // console.log(data);

    res.render("project", { data, addTitle });
  } catch (error) {
    throw error;
  }
}

async function projectDetail(req, res) {
  // const { id } = req.params;

  // const dataDetail = data[id];

  // console.log(dataDetail);

  // res.render("detail-project", { data: dataDetail });

  try {
    const { id } = req.params;

    const query = await SequelizePool.query("SELECT * FROM projects WHERE id = :id", {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    const data = query.map((res) => ({
      ...res,
     
      duration: duration(res.start_date, res.end_date),
      techArray: techToIcon(res.technologies),
    }));
    console.log(data[0]);


    res.render("detail-project", { data: data[0] });
  } catch (error) {
    throw error;
  }
}

async function handlePostProject(req, res) {
  // const { name, startDate, endDate, desc, technologies } = req.body;

  // const technologiesArray = Array.isArray(technologies)
  //   ? technologies
  //   : [technologies];

  // data.unshift({
  //   name,
  //   startDate,
  //   endDate,
  //   desc,
  //   // technologies: technologiesArray,
  //   techArray: techToIcon(technologiesArray),
  // });

  try {
    const { name, startDate, endDate, desc, technologies } = req.body;

    const technologiesArray = Array.isArray(technologies)
      ? technologies
      : [technologies];

    const query = await SequelizePool.query(
      `INSERT INTO projects (name, start_date, end_date, description, technologies, "createdAt", "updatedAt") VALUES ('${name}', '${startDate}', '${endDate}', '${desc}',  ARRAY[:technologies], NOW(), NOW())`,
      {
        replacements: { technologies: technologiesArray },
        type: QueryTypes.INSERT,
      }
    );

    console.log(query);
    res.redirect("/add-project");
  } catch (error) {
    throw error;
  }

  // res.redirect("/add-project");

  // console.log(data);
}

async function handleEditProject(req, res) {
  try{
    const { name, startDate, endDate, desc, technologies } = req.body;
    const technologiesArray = Array.isArray(technologies)
      ? technologies
      : [technologies];

    const { id } = req.params;

    const query = await SequelizePool.query(
      `UPDATE projects SET name = '${name}', start_date = '${startDate}', end_date = '${endDate}', description = '${desc}', technologies = ARRAY[:technologies], "updatedAt" = NOW() WHERE id = ${id}`,
      {
        replacements: { technologies: technologiesArray },
        type: QueryTypes.UPDATE,
      }
    );
    // console.log(query);
    res.redirect("/add-project");

  }
  catch(error){
    throw error
  }
}

async function editProject(req, res) {
  try {
    const { id } = req.params;

    const query = await SequelizePool.query(
      "SELECT * FROM projects WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    const data = query[0];

    // console.log(data);

    res.render("edit-project", { data });
  } catch (error) {
    throw error;
  }
}



async function deleteProject(req, res) {
  try {
    const { id } = req.params
    await SequelizePool.query(`DELETE FROM projects WHERE id = ${id}`)

    res.redirect('/add-project')
} catch (error) {
    throw error
}
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
