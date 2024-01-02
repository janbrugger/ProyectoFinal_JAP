const productID = localStorage.getItem("productID");
const container = document.getElementById("products-container");
const comments = document.getElementById("comments-container")
const rating = document.getElementById("rating");
const selectedRating = document.getElementById("selected-rating");
const btnComment = document.getElementById("btnComment");
const relatedProducts = document.getElementById("related-products-container")
const relatedProductsTitle = document.getElementById("related-products-title")






  function getProduct(data) {
    return new Promise((resolve, reject) => { //la funcion devuelve una promesa
      fetch(data)
        .then(response => response.json())
        .then(data => resolve(data)) //si obtenemos la data devolvemos una promesa resuelta
        .catch(error => reject(error)) //en caso contrario devolvemos una promesa rechazada
    });
  }
  
  //Función que trae los comentarios ya ingresados de cada producto
  function getComments(data) {
    return new Promise((resolve, reject) => {
      fetch(data)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
  }
  

  async function showData() {
  
    try {
      let product = await getProduct(PRODUCT_INFO_URL + productID + ".json"); //espera a recibir los resultados de la funcion.
      showProducts(product);
    } catch (error) { console.log(error) }
  
    try {
      let comments = await getComments(PRODUCT_INFO_COMMENTS_URL + productID + ".json");
      showComments(comments);
    } catch (error) { console.log(error) }

    try {
      let related = await getProduct(PRODUCT_INFO_URL + productID + ".json");
      showRelatedProducts(related);
    } catch (error) { console.log(error) }
  
  }

//Función que muestra los detalles de cada producto
function showProducts(data) {
    container.innerHTML += `<div class="container">
    <h1 class="p-5">${data.name}</h1>
    <hr>
    <h3>Precio</h3>
    <p class="pb-4">${data.cost} ${data.currency}</p>
    <h3>Descripción</h3>
    <p class="pb-4">${data.description}</p>
    <h3>Categoría</h3>
    <p class="pb-4">${data.category}</p>
    <h3>Cantidad vendidos</h3>
    <p class="pb-4">${data.soldCount}</p>
    <h3>Imagenes ilustrativas</h3>
    <div class="d-flex flex-row">
    
    ${createCarrousel(data.images)}
     </div>
    </div>`
};

//Función que muestra los comentarios ya ingresados de cada producto
function showComments(data_comments){ 
  container.innerHTML += '<h3 class="mt-4">Comentarios</h3>';
  if (data_comments.length === 0) {
      comments.innerHTML = `<h5 class="text-center text-muted" >
      No se han agregado comentarios sobre este producto</h5>`;
  } else {
  for (const comment of data_comments) {
      container.innerHTML += `
      <div class="list-group-item">
          <h4>${comment.user}</h4>
          <span>
          ${stars(comment.score)}
          </span>
          <p>${comment.description}</p>
          <small class="text-muted">
          ${comment.dateTime}</small>
      </div>
      `
  }
}
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
            <img src="${product.image}" class="img-fluid mt-2" style="max-width: 300px; max-height: 100px;">
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
  return `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    ${images.map((image,index) => {
      return `<div class="carousel-item ${index===0 ? "active" : ""}">
      <img src="${image}" class="d-block rounded" alt="...">
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

  //agrega comentario con usuario y fecha actual 
  btnComment.addEventListener("click", () => {
    const comment = document.getElementById("opinion");
    const ratingValue = selectedRating.textContent;

    var today = new Date();
    var fechaActual = today.toLocaleString();

    if (comment.value != "" && ratingValue != 0 ) {
      container.innerHTML += `
      <div class="list-group-item">
          <h4>${User.email}</h4>
          <span>
          ${stars(ratingValue)}
          </span>
          <p>${comment.value}</p>
          <small class="text-muted">
          ${fechaActual} </small>
      </div>
      `
      comment.value = "";  //se limpia el textarea
      selectedRating.textContent = 0;   //se vuelve a 0 el contador de estrellas seleccionadas
      const allStars = document.querySelectorAll(".star");
      allStars.forEach((star) => {    //se remueven todas las estrellas seleccionadas
        star.classList.remove("selected");
        });

    } else {
      alert("Debe agregar un comentario y una puntuación")
    }

  });

  document.addEventListener("DOMContentLoaded", function() {
    showData();
    userMenu();

  });