const nombre = document.getElementById("nombre");
const nombre2 = document.getElementById("nombre2");
const apellido = document.getElementById("apellido");
const apellido2 = document.getElementById("apellido2");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");

const fileInput = document.getElementById("fileInput");
const uploadedImage = document.getElementById("uploadedImage");
const uploadButton = document.getElementById("uploadButton");
const imagenAdicional = document.getElementById("imagenAdicional");

uploadButton.addEventListener("click", function () {
    const file = fileInput.files[0];
    if (file) {
        if (file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            uploadedImage.src = imageUrl;

            const imageNavbar = document.getElementById("imageNavbar");
            imageNavbar.src = imageUrl;

            // Guarda la imagen en el Local Storage
            localStorage.setItem("savedImage", imageUrl);

        } else {
            document.getElementById('error-alert').classList.add('show');
      setTimeout(function() {
        document.getElementById('error-alert').classList.remove('show');
      }, 3000); 
    
        }
    }
    
});

// Carga la imagen guardada si existe
const savedImage = localStorage.getItem("savedImage");
if (savedImage) {
    uploadedImage.src = savedImage;
}

document.addEventListener("DOMContentLoaded", function () {
    userMenu();
    themeMenu();
    autocompleteProfileInfo()
});

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()

    if (nombre.value != "" && apellido.value != "" && contacto.value != "") {
        setProfileInfo()
        // Mostrar la alerta de éxito
    document.getElementById('success-alert').classList.add('show');
    setTimeout(function() {
      document.getElementById('success-alert').classList.remove('show');
    }, 3000); 
    }
    
});

//guarda los datos ingresados en el localStorage
function setProfileInfo() {

    User.name = nombre.value;
    User.name2 = nombre2.value;
    User.lastName = apellido.value;
    User.lastName2 = apellido2.value;
    User.email = email.value
    User.contact = contacto.value;
    localStorage.setItem("user", JSON.stringify(User));
};

//rellena los campos con la informacion del perfil al cargar la pagina.
function autocompleteProfileInfo() {

    if (User.name) { nombre.value = User.name; };
    if (User.name2) { nombre2.value = User.name2; };
    if (User.lastName) { apellido.value = User.lastName; };
    if (User.lastName2) { apellido2.value = User.lastName2; };
    if (User.email) { email.value = User.email; };
    if (User.contact) { contacto.value = User.contact; };
}

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

