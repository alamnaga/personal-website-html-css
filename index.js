const express = require("express");
const dbPool = require("./src/connection/index");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middlewares/uploadFile");
const app = express();
const port = 5000;

//middleware session
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    store: session.MemoryStore(),
    secret: "session_storage",
    saveUninitialized: true,
  })
);
app.use(flash());

//sequelize config
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);
let models = require("./src/models");
// let projects = models.Project;

//use handlebars for view engine
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets")); //untuk mengakses file asset
app.use("/uploads", express.static("src/uploads"));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/contact", contact);
app.get("/add-project", addProject);
app.get("/testimoni", testimoni);
app.get("/register", register);
app.get("/login", login);
app.get("/project-detail/:id", projectDetail);
app.get("/edit-project/:id", editProject);
app.get("/delete/:id", deleteProject);
app.get("/logout", handleLogout);

app.post("/add-project", upload.single('image'), handlePostProject);
app.post("/edit-project/:id",upload.single('image'), handleEditProject);
app.post("/register", handleRegister);
app.post("/login", handleLogin);

const data = [];
// console.log(SequelizePool);

function home(req, res) {
  res.render("index", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}

function contact(req, res) {
  res.render("form", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}
function testimoni(req, res) {
  res.render("testimonial", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}
function register(req, res) {
  res.render("register");
}
function login(req, res) {
  res.render("login");
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
    const query = await SequelizePool.query(
      `SELECT projects.id, projects.name AS name, start_date, end_date, description, technologies, image, projects."createdAt", projects."updatedAt", users.name AS author_name FROM projects LEFT JOIN users ON projects.author = users.id`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const data = query.map((res) => ({
      ...res,
      duration: duration(res.start_date, res.end_date),
      techArray: techToIcon(res.technologies),
    }));
    // console.log("INI APA WOY:", data.map(item => ({ startDate: item.startDate, endDate: item.endDate })));
    console.log(data);
    console.log({ iduser: req.session.idUser });


    res.render("project", {
      data,
      addTitle,
      isLogin: req.session.isLogin,
      user: req.session.user,
      iduser: req.session.idUser
    });
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

    const query = await SequelizePool.query(
      `
    SELECT
      projects.id,
      projects.name AS name,
      start_date,
      end_date,
      description,
      technologies,
      image,
      projects."createdAt",
      projects."updatedAt",
      users.name AS author_name
    FROM projects
    LEFT JOIN users ON projects.author = users.id
    WHERE projects.id = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    const data = query.map((res) => ({
      ...res,

      duration: duration(res.start_date, res.end_date),
      techArray: techToIcon(res.technologies),
    }));
    console.log(data[0]);

    res.render("detail-project", {
      data: data[0],
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
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
    const image = req.file.filename;
    const author = req.session.idUser;

    const technologiesArray = Array.isArray(technologies)
      ? technologies
      : [technologies];

    const query = await SequelizePool.query(
      `INSERT INTO projects (name, start_date, end_date, description, technologies, image, author, "createdAt", "updatedAt") VALUES ('${name}', '${startDate}', '${endDate}', '${desc}',  ARRAY[:technologies], '${image}', ${author}, NOW(), NOW())`,
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
  try {
    const { name, startDate, endDate, desc, technologies } = req.body;
    const image = req.file ? req.file.filename : '';
    const technologiesArray = Array.isArray(technologies)
      ? technologies
      : [technologies];

    console.log({iniimage: image})

    const { id } = req.params;

    const query = await SequelizePool.query(
      `UPDATE projects SET name = '${name}', start_date = '${startDate}', end_date = '${endDate}', description = '${desc}', technologies = ARRAY[:technologies], image='${image}', "updatedAt" = NOW() WHERE id = ${id}`,
      {
        replacements: { technologies: technologiesArray },
        type: QueryTypes.UPDATE,
      }
    );
    // console.log(query);
    res.redirect("/add-project");
  } catch (error) {
    throw error;
  }
}

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    const query = await SequelizePool.query(
      `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hash}', NOW(), NOW())`
    );
    console.log(query);
    res.redirect("/login");
  } catch (error) {
    throw error;
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const checkEmail = await SequelizePool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (checkEmail.length === 0) {
      req.flash("failed", "Email is not register!");
      return res.redirect("/login");
    }

    bcrypt.compare(password, checkEmail[0].password, (err, result) => {
      if (!result) {
        req.flash("failed", "Password Salah");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = checkEmail[0].name;
        req.session.idUser = checkEmail[0].id;
        req.flash("success", "Login Berhasil");
        res.redirect("/");
      }
    });

    console.log(checkEmail);
  } catch (error) {
    throw error;
  }
}

function handleLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/login");
  });
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

    res.render("edit-project", {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (error) {
    throw error;
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    await SequelizePool.query(`DELETE FROM projects WHERE id = ${id}`);

    res.redirect("/add-project");
  } catch (error) {
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
