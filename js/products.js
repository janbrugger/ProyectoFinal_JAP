const categoryID = localStorage.getItem("catID") ?? 101;

// Buscador
const searchInput = document.getElementById('buscador'); //toma datos del input
const contenidoProductos = document.getElementById("list-container"); // datos de los productos

const btnFiltrar = document.getElementById("rangeFilterCount");
const btnLimpiar = document.getElementById("clearRangeFilter");

const minInput = document.getElementById("rangeFilterCountMin");
const maxInput = document.getElementById("rangeFilterCountMax");

const btnOrdenDesc = document.getElementById("sortByPriceDesc");
const btnOrdenAsc = document.getElementById("sortByPriceAsc");
const btnOrdenRelev = document.getElementById("sortBySoldCount");

let originalData = []; 

//función fetch de los datos de la api
function getData() { 
      try {
        fetch(PRODUCTS_URL + categoryID + ".json")
        .then(response => response.json())
        .then(data => {
            originalData = data.products; //aqui se almacenan los datos en el array originalData
          showData(originalData);
        })
      } catch (error) {console.error("error fetchig data:", error)}
};


// funcion que muestra los datos en el html
function showData(dataArray) {
  contenidoProductos.innerHTML = ''; //primero vacía el contenido 
  if (dataArray.length === 0) {
    contenidoProductos.innerHTML = `<h4 class="text-center text-muted mt-5">
    No se han agregado productos a esta categoría</h4>`;
} else {
  for (const item of dataArray) {
    contenidoProductos.innerHTML += `
      <div onclick="setProductID(${item.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
              <div class="col-3"> <img src="${item.image}" alt="product image" class="img-thumbnail"/> </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <div class="mb-1">
                      <h4>${item.name} - ${item.currency} ${item.cost}</h4> 
                      <p>${item.description}</p> 
                      </div>
                      <small class="text-muted"> ${item.soldCount} vendidos</small> 
                  </div>
              </div>
          </div>
      </div>
      `; 
  }
  }
};

//Funciones de Filtro por precio y limpieza
function filtrarPrecio(elements) {
  const contFiltrado = [];
  for (const element of elements) { 
      const price = parseFloat(element.cost); // Obtener el precio como número
      if (!isNaN(price) && price >= parseFloat(minInput.value) && price <= parseFloat(maxInput.value)) {
          contFiltrado.push(element);
      }
  }
  if(contFiltrado.length ) {
    showData(contFiltrado);
  } else {
    noResultado();
  }
};

function noResultado() {

  LimpiarHTML()

  const noResultado = document.createElement("DIV");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados"
  contenidoProductos.appendChild(noResultado);
}

function LimpiarHTML (){
  while(contenidoProductos.firstChild) {
      contenidoProductos.removeChild(contenidoProductos.firstChild);
  }

}

function limpiar() {
  getData(); // Vuelve a obtener los datos originales del listado
  minInput.value = "";
  maxInput.value = "";
};

 //funcion para ordenar por relevancia
 function sortBySoldCount(dataArray) {
  let dataOrdenada = [...dataArray];

  dataOrdenada.sort((a, b) => {
      const soldCountA = a.soldCount;
      const soldCountB = b.soldCount;
      return  soldCountB - soldCountA;
  });
  showData(dataOrdenada);
}

//funcion para ordenar por precio ascendente o descendente
function sortByPrice(dataArray, orden) {
let dataOrdenada = [...dataArray]; // Crear una copia de los datos originales

dataOrdenada.sort((a, b) => {
    const priceA = a.cost;
    const priceB = b.cost;

    if (orden === "asc") {
        return priceA - priceB;
    } else if (orden === "desc") {
        return priceB - priceA;
    }
});
showData(dataOrdenada);
}


//evento al cargar el sitio
document.addEventListener("DOMContentLoaded", () => { 
  getData(); //

  userMenu();
   
  });
  //evento de escribir en el buscador
  searchInput.addEventListener('input', function () { 
  const searchText = searchInput.value.toLowerCase();
  const filteredProductos = originalData.filter(item =>
    item.name.toLowerCase().includes(searchText) ||
    item.description.toLowerCase().includes(searchText)
  );
  showData(filteredProductos);
  });
  //evento al hacer click en filtrar
  btnFiltrar.addEventListener("click", () => {
    filtrarPrecio(originalData);
  });
  //evento al hacer click en limpiar
  btnLimpiar.addEventListener("click", () => {
    limpiar();
  });

  //evento al hacer click en "orden descendente"
  btnOrdenDesc.addEventListener("click", () => {
  sortByPrice(originalData, "desc");
});

//evento al hacer click en "orden ascendente"
  btnOrdenAsc.addEventListener("click", () => {
  sortByPrice(originalData, "asc");
});

 //evento al hacer click en Rel. (relevancia)
 btnOrdenRelev.addEventListener("click", () => {
  sortBySoldCount(originalData);
});


