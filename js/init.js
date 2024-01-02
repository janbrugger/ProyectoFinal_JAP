const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const User = JSON.parse(localStorage.getItem("user")) || []//user es la key con la que identifico la session.
const navbar = document.getElementById("navbar");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let userMenu = function () { //funcion para mostrar usuario en navbar.
  if (!verificacionLogin()) {
    // Muestra el menú desplegable desde el email del usuario.
    navbar.innerHTML += `<li class="nav-item">
   
    <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
    data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${User.email}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg></a></li>  
          <li><a class="dropdown-item" href="cart.html">Mi carrito <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17h-11v-14h-2" />
          <path d="M6 5l14 1l-1 7h-13" />
        </svg></a></li>
        <li><a class="dropdown-item" id="itemLogout" href="login.html">Cerrar sesión <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
          </svg></a></li>
          <li><input onclick="cambiarTema()" class="dropdown-item" type="checkbox"  id="switch"/><label for="switch" class="switch">Toggle</label></li>
            </li>`
  }
  logout();
  themeCheck()

};

let verificacionLogin = function () { //Verificacion del login:
  if (User.email == undefined || User.email === "" || User.password == undefined || User.password.length < 6) { //si se cumple redirecciona al login.
    alert("Inicia sesion para continuar");
    window.location.href = "login.html";
    return true;
  };
};

//funcion para eliminar "user" del localStorage
let logout = function () {
  try {
    const itemLogout = document.getElementById("itemLogout"); //itemLogout es el id del dropdown-item "Cerrar sesion"

    itemLogout.addEventListener("click", function () {
      localStorage.removeItem("user")
    })
  } catch (error) {
    console.log(error); //error que se genera al intentar obtener el elemento "logout"
  }
}


//DARK MODE
const currentTheme = localStorage.getItem("theme");

function themeCheck(){ 
  if (currentTheme) {
    document.querySelector("body").setAttribute("data-bs-theme", currentTheme);
    if(localStorage.getItem("theme") === "dark"){  //switch que se queda activo si esta en modo oscuro.
      document.getElementById("switch").setAttribute("checked", "checked");
  
    }
  }
}


//dark mode
const cambiarTema = () => {
  const body = document.querySelector("body");
  const isLightMode = body.getAttribute("data-bs-theme") === "light";
  const newTheme = isLightMode ? "dark" : "light";

  body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};


//Función para guardar id del producto y redirigir a la página
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}