function getTestimoniData() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/d9f675620d3f635a1682", true);

    xhr.onload = () => {
      console.log("status", xhr.status);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // console.log(response);
        resolve(response.testimonial);
      } else {
        reject("error");
      }
    };

    xhr.onerror = () => {
      reject("network error");
    };

    xhr.send();
  });
}

async function allTestimonial() {
  const testimonials = await getTestimoniData();

  const testimonialHTML = testimonials.map((testimonial) => {
    return `                <div class="d-flex flex-column p-4 m-4" style=" width: 350px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);";>
        <div class="mb-3">
            <img src="${testimonial.image}" alt="download" width="300px" height="250px" style="border-radius: 8px;">
        </div>
        <div>
            <h3 class="fw-bold">${testimonial.name}</h3>
            <strong>Pekerjaan: ${testimonial.pekerjaan}</strong>
            <div style="margin-top: 10px;">
                <p>${testimonial.message}</p>
                <p>Rating: ${testimonial.rating}</p>
            </div>
           
        </div>
        
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

async function filterTestimonial(rating) {
  const testimonials = await getTestimoniData();
  const filter = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );
  const filterHTML = filter.map((testimonial) => {
    return `                               <div class="d-flex flex-column p-4 m-4" style=" width: 350px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);";>
        <div class="mb-3">
            <img src="${testimonial.image}" alt="download" width="300px" height="250px" style="border-radius: 8px;">
        </div>
        <div>
            <h3 class="fw-bold">${testimonial.name}</h3>
            <strong>Pekerjaan: ${testimonial.pekerjaan}</strong>
            <div style="margin-top: 10px;">
                <p>${testimonial.message}</p>
                <p>Rating: ${testimonial.rating}</p>
            </div>
           
        </div>
        
    </div>`;
  });
  document.getElementById("testimonials").innerHTML = filterHTML.join("");
}
allTestimonial()