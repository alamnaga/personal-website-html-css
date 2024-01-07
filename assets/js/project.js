const projects = [];

function addProject(e){
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const desc = document.getElementById('desc').value;
    const technologies = document.getElementsByName("technologies");

    let tech = [];

    for (let i = 0; i < technologies.length; i++){
        if (technologies[i].checked){
            tech.push(technologies[i].value);
        }
    }

    const image = document.getElementById('upload-image').files;

    const imageLink = URL.createObjectURL(image[0]);

    const project = {
        name,
        startDate,
        endDate,
        desc,
        image : imageLink,
        tech
    }

    projects.unshift(project);
    renderProjects();

    console.log("project", projects);

}

function renderProjects(){

    let html = '';
     

    for (let i = 0; i < projects.length; i++){

        const startDate = new Date(projects[i].startDate);
        const endDate = new Date(projects[i].endDate);

        const durationInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
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

        const icon = projects[i].tech.map(tech => {
            switch (tech){
                case 'html':
                    return '<i class="fab fa-html5"></i>';
                case 'react':
                    return '<i class="fab fa-react"></i>';
                case 'css':
                    return '<i class="fab fa-css3"></i>';
                case 'javascript':
                    return '<i class="fab fa-js"></i>';
                default:
                    return '';
            }
        }).join('');

        html += `
        <div class="card-project">
                            <div>
                                <img src="${projects[i].image}" alt="download" width="300px" height="250px">
                            </div>
                            <div>
                                <h3><a href="detail-project.html">${projects[i].name}</a></h3>
                                <p style="margin-top: 8px;">Durasi: ${durationText}</p>
                                <div style="margin-top: 10px;">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet blanditiis omnis nostrum quasi, veniam nihil impedit! Repellat, iusto laborum ullam at esse natus fuga id explicabo quaerat consequatur nostrum.</p>
                                </div>
                                <div class="technologies">
                                    <p>Technologies: ${icon}</p>
                                </div>
                            </div>
                            <div class="button-project" >
                                <button class="button">Edit</button>
                                <button class="button">Delete</button>
                            </div>
                        </div>`
    }

    document.getElementById('project-content').innerHTML = html;
}

renderProjects()