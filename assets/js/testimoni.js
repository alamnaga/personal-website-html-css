class Testimonial{

    #name = "";
    #image = "";
    #pekerjaan = "";
    #message = "";

    constructor(name, image,pekerjaan, message){
        this.name = name;
        this.image = image;
        this.pekerjaan = pekerjaan;
        this.message = message;
    }

    set name(val){
        this.#name = val;
    }
    set image(val){
        this.#image = val;
    }
    set pekerjaan(val){
        this.#pekerjaan = val;
    }
    set message(val){
        this.#message = val;
    }
    get name(){
        return this.#name;
    }
    get image(){
        return this.#image;
    }
    get pekerjaan(){
        return this.#pekerjaan;
    }
    get message(){
        return this.#message;
    }

    html(){
        return `                <div class="card-project">
        <div>
            <img src="${this.image}" alt="download" width="300px" height="250px">
        </div>
        <div>
            <h3>${this.name}</h3>
            <p>${this.pekerjaan}</p>
            <div style="margin-top: 10px;">
                <p>${this.message}</p>
            </div>
           
        </div>
        
    </div>`
    }
}

const testimoni1 = new Testimonial("Hafidh","https://cdn.pixabay.com/photo/2023/08/20/09/25/ai-generated-8202042_960_720.jpg","Fullstack Developer","Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quae. ");
const testimoni2 = new Testimonial("Alam","https://cdn.pixabay.com/photo/2022/09/29/17/15/halloween-7487706_960_720.jpg","Mobile Developer","Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quae. ");

const testimonials = [testimoni1, testimoni2];

let testimonialHTML = "";

for(let i = 0; i < testimonials.length; i++){
    testimonialHTML += testimonials[i].html();
}
document.getElementById("testimonials").innerHTML = testimonialHTML