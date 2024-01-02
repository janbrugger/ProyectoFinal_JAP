const CATEGORIES_URL = "/api/categories";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "/api/categories_products/";
const PRODUCT_INFO_URL = "api/products/";
const PRODUCT_INFO_COMMENTS_URL = "api/products_comments/";
const CART_INFO_URL = "/articles";
const CART_BUY_URL = "api/cart";
const EXT_TYPE = ".json";
var User = JSON.parse(localStorage.getItem("user")) || []//user es la key con la que identifico la session.
const navbar = document.getElementById("navbar");
const divThemeMenu = document.getElementById("divThemeMenu");



let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var myHeaders = new Headers();
myHeaders.append("access-token", localStorage.getItem("access-token"));

var requestOptions = {
  headers: myHeaders
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url, requestOptions)
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
    navbar.innerHTML += `  <li class="nav-item">
    <div class="collapse navbar-collapse show" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            ${User.email}
            <img class="object-fit-cover" id="imageNavbar" width=25px height=25px alt="Imagen" class="image-container" src="img/silueta.webp";>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil <svg xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-user-circle" width="20" height="20" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg></a></li>
            <li><a class="dropdown-item" href="cart.html">Mi carrito <svg xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-shopping-cart" width="20" height="20" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg></a></li>
            <li><a class="dropdown-item" id="itemLogout" href="login.html">Cerrar sesión <svg
                  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="20" height="20"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M9 12h12l-3 -3" />
                  <path d="M18 15l3 -3" />
                </svg></a></li>
          </ul>
        </li>
      </ul>
    </div>
  </li>`
  }

  loadImageNavbar()
  logout();

};

// Carga la imagen guardada si existe
function loadImageNavbar() {
  const savedImage = localStorage.getItem("savedImage");
  const imageNavbar = document.getElementById("imageNavbar");

  if (savedImage) {
    imageNavbar.src = savedImage;
  }
}

let verificacionLogin = function () { //Verificacion del login:
  if (!localStorage.getItem("access-token")) { //si se cumple redirecciona al login.
    alert("Inicia sesion para continuar");
    window.location.href = "login.html";
    return true;
  };
};

//funcion para eliminar "access-token" del localStorage
let logout = function () {
  try {
    const itemLogout = document.getElementById("itemLogout"); //itemLogout es el id del dropdown-item "Cerrar sesion"

    itemLogout.addEventListener("click", function () {
      localStorage.removeItem("access-token")
    })
  } catch (error) {
    console.log(error); //error que se genera al intentar obtener el elemento "logout"
  }
}



//Función para guardar id del producto y redirigir a la página
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

//Función para agregar el menu del tema a todos los html
function themeMenu() {
  divThemeMenu.innerHTML += `  <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
  <symbol id="check2" viewBox="0 0 16 16">
    <path
      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </symbol>
  <symbol id="circle-half" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
  </symbol>
  <symbol id="moon-stars-fill" viewBox="0 0 16 16">
    <path
      d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    <path
      d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
  </symbol>
  <symbol id="sun-fill" viewBox="0 0 16 16">
    <path
      d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
  </symbol>
</svg>

<div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
  <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button"
    aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
    <svg class="bi my-1 theme-icon-active" width="1em" height="1em">
      <use href="#circle-half"></use>
    </svg>
    <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
        aria-pressed="false">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
          <use href="#sun-fill"></use>
        </svg>
        Claro
        <svg class="bi ms-auto d-none" width="1em" height="1em">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
        aria-pressed="false">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
          <use href="#moon-stars-fill"></use>
        </svg>
        Oscuro
        <svg class="bi ms-auto d-none" width="1em" height="1em">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
        aria-pressed="true">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
          <use href="#circle-half"></use>
        </svg>
        Auto
        <svg class="bi ms-auto d-none" width="1em" height="1em">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>
  </ul>
</div> `
}

//funcion de bootstrap para agregar funcionalidad al menu del tema.
(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()

async function requestCRUD(method, data, endpoint) {
  let result;
  switch (method) {
      case 'GET':
          let getResponse = await fetch(endpoint);
          result = getResponse.ok ? getResponse.json() : false;
          break;

      case 'DELETE':
          let deleteResponse = await fetch(API_URL + data.id, { method: method });
          result = deleteResponse.ok ? deleteResponse.json() : false;
          break;

      case 'PUT':
          let putResponse = await fetch(API_URL + data.id, {
              method: method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: data.name, lastname: data.lastname })
          });
          result = putResponse.ok ? putResponse.json() : false;
          break;

      case 'POST':
          let postResponse = await fetch(endpoint, {
              method: method,
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          });
          result = postResponse.ok ? postResponse.json() : false;
          break;
  }

  return result;
}