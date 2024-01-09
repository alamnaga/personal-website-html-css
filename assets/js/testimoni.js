const testimonials = [
    {
        name: "Alam",
        message: "Mantap kerjaan oke",
        image: "https://images.pexels.com/photos/11215484/pexels-photo-11215484.jpeg?cs=srgb&dl=pexels-caique-araujo-11215484.jpg&fm=jpg",
        pekerjaan: "Data Science",
        rating: 3
    },
    {
        name: "Dian Sastro",
        message: "Keren saya suka",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQUn4vpNQFnFrnHh0m5FMW4T1oL2x_SPMNoxKWl7LesZpXw8nWmet7cZFjyqWXipyHJE&usqp=CAU",
        pekerjaan: "Dosen",
        rating: 4,
    },
    {
        name: "Lia",
        message: "Keren",
        image: "https://images.pexels.com/photos/4820355/pexels-photo-4820355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        pekerjaan: "Guru",
        rating: 3,
    },
    {
        name: "Dia saya cinta",
        message: "Keren makasih udah bantu",
        image: "https://images.pexels.com/photos/17832908/pexels-photo-17832908/free-photo-of-wanita-tanah-pertanian-berbohong-pedesaan.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        pekerjaan: "Tes",
        rating: 1
    },
    
]

function allTestimonial(){
    const testimonialHTML = testimonials.map((testimonial) => {
        return `                <div class="card-project">
        <div>
            <img src="${testimonial.image}" alt="download" width="300px" height="250px">
        </div>
        <div>
            <h3>${testimonial.name}</h3>
            <p>${testimonial.pekerjaan}</p>
            <div style="margin-top: 10px;">
                <p>${testimonial.message}</p>
                <p>Rating:${testimonial.rating}</p>
            </div>
           
        </div>
        
    </div>`
    }) 

    document.getElementById('testimonials').innerHTML = testimonialHTML.join('')
}

function filterTestimonial(rating){
    const filter = testimonials.filter((testimonial) => testimonial.rating === rating)
    const filterHTML = filter.map(( testimonial) => {
        return `                <div class="card-project">
        <div>
            <img src="${ testimonial.image}" alt="download" width="300px" height="250px">
        </div>
        <div>
            <h3>${ testimonial.name}</h3>
            <p>${ testimonial.pekerjaan}</p>
            <div style="margin-top: 10px;">
                <p>${ testimonial.message}</p>
                <p>Rating:${testimonial.rating}</p>
            </div>
           
        </div>
        
    </div>`
    })
    document.getElementById('testimonials').innerHTML = filterHTML.join('')
}

allTestimonial()