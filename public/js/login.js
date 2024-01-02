function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    setTimeout(() => {
        document.getElementById("alert-success").classList.remove("show")
    }, 3000);

}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(() => {
        document.getElementById("alert-danger").classList.remove("show")
    }, 3000);


}


// Obtener referencia al botón de registro
const logForm = document.querySelector("#logForm");


// Agregar evento de click al botón de registro
logForm.addEventListener("submit", (e) => {
    e.preventDefault() //evita que la pagina se recargue

    const email = document.querySelector("#floatingInput").value;            // Obtener el valor del campo "Email"
    const password = document.querySelector("#floatingPassword").value;    // Obtener el valor del campo "Contraseña"


    var User = JSON.parse(localStorage.getItem("user")) || []; //el  storage es donde se va a guardar el mail y contraseña
    User = { email: email, password: password }; //agregamos el email y contraseña
    localStorage.setItem("user", JSON.stringify(User)); //guardamos en el storage


    //const body = {"username": "admin", "password" : "admin" };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": email,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/login", requestOptions)
        .then(response => {
            if (response.status === 200) {
                showAlertSuccess();
                window.location.href = "index.html";
                return response.json();                

            } else {
                console.log("error: ", response.status)
                showAlertError();
            }
        }).then(result => {
            console.log(result.token);
            localStorage.setItem("access-token", result.token);
        })
        .catch(error => console.log('error', error));

});

// Rerefencias a campo de contraseña y al botón show
const passwordInput = document.querySelector("#floatingPassword");
const passwordButton = document.querySelector("#password-addon");
let isPasswordVisible = false;

// Evento de clic al botón show
passwordButton.addEventListener("click", () => {
    if (!isPasswordVisible) {
        passwordInput.type = "text";
        passwordButton.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        passwordButton.textContent = "Show";
    }
    isPasswordVisible = !isPasswordVisible;
});