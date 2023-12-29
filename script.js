function formSubmit(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name == "" || email == "" || phone == "" || subject == "" || message == ""){
        alert("Masukan semua data");
    }

    let a = document.createElement('a');

    a.href = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=alamsaungnaga@gmail.com&su=${subject}&body=${encodeURI(message + '\n\nHormat saya, \nNama:' + name + '\nEmail:' + email + '\nNo:' + phone)}`;

    a.target = '_blank';
    a.click();
}