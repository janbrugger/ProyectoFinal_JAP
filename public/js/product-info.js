const productID = localStorage.getItem("productID");
const container = document.getElementById("products-container");
const commentsContainer = document.getElementById("comments-container");
const rating = document.getElementById("rating");
const selectedRating = document.getElementById("selected-rating");
  
const btnComment = document.getElementById("btnComment");
const relatedProducts = document.getElementById("related-products-container")
const relatedProductsTitle = document.getElementById("related-products-title")

var myHeaders = new Headers();
myHeaders.append("access-token", localStorage.getItem("access-token"));

var requestOptions = {
  headers: myHeaders
}

function getData(data) {
  return new Promise((resolve, reject) => { //la funcion devuelve una promesa
    fetch(data, requestOptions)
      .then(response => response.json())
      .then(data => resolve(data)) //si obtenemos la data devolvemos una promesa resuelta
      .catch(error => reject(error)) //en caso contrario devolvemos una promesa rechazada
  });
}


async function showData() {

  try {
    let product = await getData(PRODUCT_INFO_URL + productID); //espera a recibir los resultados de la funcion.
    product.quantity = 1;
    showProducts(product);
  } catch (error) { console.log(error) }

  try {
    let comments = await getData(PRODUCT_INFO_COMMENTS_URL + productID);
    showComments(comments);
    hayComentarios()
  } catch (error) { console.log(error) }

  try {
    let related = await getData(PRODUCT_INFO_URL + productID);
    showRelatedProducts(related);
  } catch (error) { console.log(error) }

}

async function logBuyMessage(){
  try {
    let message = await getData(CART_BUY_URL);
    console.log(message)
  } catch (error) { console.log(error) }
}

//Función que muestra los detalles de cada producto
function showProducts(data) {
  container.innerHTML += `
  <div class="container">
  <h1 class="p-4 m-0">${data.name}</h1> <button id="btnCarrito" class="btn btn-success">Comprar</button>
  <button id="btnViewCart" class="btn btn-secondary">Ver carrito</button>
  <hr class="my-2">
  <h3 class="m-0">Precio</h3>
  <p class="pb-2">${data.cost} ${data.currency}</p>
  <h3 class="m-0">Descripción</h3>
  <p class="fs-6">${data.description}</p>
  <h3 class="m-0">Categoría</h3>
  <p class="pb-2">${data.category}</p>
  <h3 class="m-0">Cantidad vendidos</h3>
  <p class="pb-2">${data.soldCount}</p>
  <h3>Imagenes ilustrativas</h3>
  <div class="">
  ${createCarrousel(data.images)}
   </div>
  </div>`

  const btnCarrito = document.getElementById("btnCarrito")


  btnCarrito.addEventListener('click', async  () => {
   await addToCart();
  });

 
async function addToCart() {
  const productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  const productoLocal = productosSeleccionados.find(product => product.id === data.id)

    const getResponse = await getCart()
    const productoExistente = getResponse.find(article => article.id === data.id)
    // comprueba si ya existe ese producto en el array, si no existe lo agrega.
  if (!productoExistente || !productoLocal) {

  productosSeleccionados.push(data); //guarda en local storage
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));

    postCart({ //solicitud POST a la base de datos del carrito
      id: data.id,
      name: data.name,
      quantity: 1,
      cost: data.cost,
      currency: data.currency,
      image: data.images[0]})

    logBuyMessage()//Trae mensaje de que la compra se hizo con exito (buy.json)

    // Mostrar la alerta de éxito
    document.getElementById('success-alert').classList.remove('d-none');
    setTimeout(function() {
      document.getElementById('success-alert').classList.add('d-none');
    }, 3000); 
  } else {
    // Mostrar la alerta de error
    document.getElementById('error-alert').classList.remove('d-none');
    setTimeout(function() {
      document.getElementById('error-alert').classList.add('d-none');
    }, 3000); 
  }
  }

//GET a articulos del carrito
async function getCart(data) {
  try {
    const response = await requestCRUD('GET', data, CART_INFO_URL);
    console.log(response)
    return response || [];
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return [];
  }
}

//POST al carrito
function postCart(data) {
  requestCRUD('POST', data, CART_INFO_URL).then((response) => response ? getCart(response) : showAlert());
}


const btnGoToCart = document.getElementById("btnViewCart");
btnGoToCart.addEventListener('click', () => {
  window.location = "cart.html"
})

};





//Función que muestra los productos relacionados
function showRelatedProducts(data_relatedProducts) {
  relatedProductsTitle.innerHTML += '<h3 class="mt-4">Productos relacionados</h3>';
  if (data_relatedProducts.length === 0) {
    relatedProducts.innerHTML += `<h5 class="text-center text-muted">
      No hay productos relacionados</h5>`;
  } else {
    for (const product of data_relatedProducts.relatedProducts) {
      relatedProducts.innerHTML += `
        <div onclick="setProductID(${product.id})" class="list-group-item d-inline-block mr-2 mb-2 cursor-active"> 
        <div>
            <img src="${product.image}" class="img-fluid mt-2">
        </div>  
        <h4 class="h6 text-center mt-2">${product.name}</h4> 
        </div>`;
    }
  }
};




//Función para otorgar puntaje a través de estrellas
function stars(quantity) {
  return "<i class='fa fa-star checked'></i>".repeat(Math.floor(quantity)) + "<i class='fa fa-star'></i>".repeat(5 - Math.floor(quantity));
};

//Función para crear el carrusel de Imágenes
function createCarrousel(images) {
  return `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel ">
    <div class="carousel-inner">
    ${images.map((image, index) => {
    return `<div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="${image}" class="w-100 d-block rounded" alt="...">
    </div>`
  })}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
};

// Manejador de clic en las estrellas
rating.addEventListener("click", (event) => {
  if (event.target.classList.contains("star")) {
    const ratingValue = event.target.getAttribute("data-rating");

    // Actualizamos la puntuación seleccionada en el DOM
    selectedRating.textContent = ratingValue;

    // Obtener todas las estrellas
    const stars = document.querySelectorAll(".star");

    // Iterar sobre las estrellas y aplicar el estilo según la puntuación seleccionada
    stars.forEach((star) => {
      const starRating = star.getAttribute("data-rating");
      if (starRating <= ratingValue) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }
});


//Funcionalidad de los comentarios
//Función que muestra los comentarios
function showComments(data_comments) {
  data_comments.sort(compararPorFecha);
  commentsContainer.innerHTML = "";
  for (const comment of data_comments) {
    commentsContainer.innerHTML += `
      <div class="list-group-item container border border-secondary-subtle rounded my-2 p-1">
       <div class="d-flex flex-wrap justify-content-between ">
          <h6 class="fw-bold ">${comment.user}</h6>
          <span>
          ${stars(comment.score)}
          </span>
        </div>
        <div>
          <p class="mb-1">${comment.description}</p>
          <small class="text-muted">${comment.dateTime}</small>
        </div>
      </div>
      `
  }

};

function compararPorFecha(a, b) {
  const fechaA = new Date(a.dateTime);
  const fechaB = new Date(b.dateTime);
  return fechaB - fechaA;
}

//alerta si hay error al realizar comentarios o comprar el producto
function showAlert() {
  document.getElementById("alert-error").classList.add("show");
  window.setTimeout(() => document.getElementById("alert-error").classList.remove("show"), 3000)
  resultsElement = document.getElementById("results").innerHTML = "";
}

//hace get a los comentarios
function getAll(data) {
  requestCRUD('GET', data, PRODUCT_INFO_COMMENTS_URL + productID).then((response) => response ? showComments(response) : showAlert());
}

//hace post a los comentarios que se desean enviar
function postDatos(data) {
    requestCRUD('POST', data, PRODUCT_INFO_COMMENTS_URL + productID).then((response) => response ? getAll(response) : showAlert());
}


//Retorna la hora y fecha actuales formateada para ingresarla en los comentarios
function horaActualizada(){
    // Obtiene la fecha actual
    const fechaHoraActual = new Date();

    // Obtiene el año, mes y día
    const year = fechaHoraActual.getFullYear();
    const month = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero inicial si es necesario
    const day = fechaHoraActual.getDate().toString().padStart(2, '0'); // Agrega un cero inicial si es necesario

    // Obtiene la hora, minuto y segundo
    const hours = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutes = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    const seconds = fechaHoraActual.getSeconds().toString().padStart(2, '0');

    // Crea la cadena de fecha y hora con el formato deseado
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}



function hayComentarios() { //verifica si hay comentarios y cambia la propiedad del mensaje para mostrarlo/ocultarlo.
  if (commentsContainer.children.length === 0) {
    document.getElementById("mensajeNoComentarios").style.display = "block";
  } else {
    document.getElementById("mensajeNoComentarios").style.display = "none"
  }
}


document.addEventListener("DOMContentLoaded", function () {
  showData();
  userMenu();
  hayComentarios();
  themeMenu();

//funcionalidad del botón para enviar comentarios
btnComment.addEventListener("click", () => {
  const comment = document.getElementById("opinion");
  const ratingValue = selectedRating.textContent;

  if (comment.value != "" && ratingValue != 0) {
    let score = selectedRating.textContent;
    let description = comment.value;
    postDatos({ 
      score: selectedRating.textContent, 
      description: description, 
      user: User.email, 
      dateTime: horaActualizada()});
    [score, description].forEach(element => element.value = "");

    comment.value = "";  //se limpia el textarea
    selectedRating.textContent = 0;   //se vuelve a 0 el contador de estrellas seleccionadas
    const allStars = document.querySelectorAll(".star");
    allStars.forEach((star) => {    //se remueven todas las estrellas seleccionadas
      star.classList.remove("selected");
      hayComentarios()
    });
  } else {
    alert("Debe agregar un comentario y una puntuación")
  }
});


});


