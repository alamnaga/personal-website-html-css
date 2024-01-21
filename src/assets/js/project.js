const projects = [];

function addProject(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const desc = document.getElementById("desc").value;
  const technologies = document.getElementsByName("technologies");

  let tech = [];

  for (let i = 0; i < technologies.length; i++) {
    if (technologies[i].checked) {
      tech.push(technologies[i].value);
    }
  }

  const image = document.getElementById("upload-image").files;

  const imageLink = URL.createObjectURL(image[0]);

  const project = {
    name,
    startDate,
    endDate,
    desc,
    image: imageLink,
    tech,
  };

  projects.unshift(project);
  renderProjects();

  console.log("project", projects);
}

function renderProjects() {
  let html = "";

  for (let i = 0; i < projects.length; i++) {
    const startDate = new Date(projects[i].startDate);
    const endDate = new Date(projects[i].endDate);

    const durationInDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const durationInWeeks = Math.floor(durationInDays / 7);
    const durationInMonths = Math.floor(durationInDays / 30);

    let durationText;

    if (durationInMonths > 0) {
      durationText = `${durationInMonths} Bulan`;
    } else if (durationInWeeks > 0) {
      durationText = `${durationInWeeks} Minggu`;
    } else {
      durationText = `${durationInDays} Hari`;
    }

    const icon = projects[i].tech
      .map((tech) => {
        switch (tech) {
          case "html":
            return '<i class="fab fa-html5"></i>';
          case "react":
            return '<i class="fab fa-react"></i>';
          case "css":
            return '<i class="fab fa-css3"></i>';
          case "javascript":
            return '<i class="fab fa-js"></i>';
          default:
            return "";
        }
      })
      .join("");

    html += `
            <div class="d-flex flex-column p-4 m-4" style="width: 350px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div>
            <img src="${projects[i].image}" alt="download" width="300px" height="250px">
        </div>
        <div>
            <h3 class="mt-3"><a href="detail-project.html">${projects[i].name}</a></h3>
            <p class="mt-3">Durasi: ${durationText}</p>
            <div style="margin-top: 10px;">
                <p>${projects[i].desc}</p>
            </div>
            <div class="mt-3 fs-5 fw-bold">
                <p>Technologies: ${icon}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-dark w-100 mx-1">Edit</button>
            <button class="btn btn-dark w-100 mx-1">Delete</button>
        </div>
        </div>
        `;
  }

  document.getElementById("project-content").innerHTML = html;
}

renderProjects();
