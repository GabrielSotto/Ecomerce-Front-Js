//DARK MODE

// let darkMode = document.getElementById("darkMode");
// let body = document.getElementById("body");

// function cambiarModo() {
//   if (body.classList.contains("dark")) {
//     darkMode.innerText = "Dark";
//     darkMode.classList.remove("btn-light");
//     darkMode.classList.add("btn-dark");
//   } else {
//     darkMode.innerText = "Light";
//     darkMode.classList.remove("btn-dark");
//     darkMode.classList.add("btn-light");
//   }
//   body.classList.toggle("dark");
// }

//PRODUCTS

let products = [];

let getProduct = async () => {
  try {
    let response = await fetch('https://fakestoreapi.com/products')
    let data = await response.json();
    showProducts(data);
    products.push(...data);

    let btnCompra = document.querySelectorAll(".botonCompra");

    for (let boton of btnCompra) {
      boton.addEventListener("click", addCart);
    }
  } catch (error) {
    console.log(error)
  }
}
getProduct();

//CARDS

let cards = document.getElementById("cardsContainer");

function showProducts(products) {
  products.forEach(element => {
    cards.innerHTML += `
    <div class="col">
      <div class="card h-100">
         <img src="${element.image}" class="card-img-top" alt="${element.description}">
        <div class="card-body">
        <h3>${element.price}$</h3>
          <h4 class="card-title">${element.title}</h4>
          <button class="btn btn-primary botonCompra">Agregar al carrito</button>
        </div>
      </div>
    </div>
    `;
  });
}

showProducts(products);

//CART

let carrito = [];

function addCart(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;
  let abuelo = padre.parentNode;

  let nombreProducto = padre.querySelector("h4").textContent;

  let precio = padre.querySelector("h3").textContent;

  let img = abuelo.querySelector("img").src;

  let producto = {
    nombre: nombreProducto,
    img: img,
    precio: precio
  };

  carrito.push(producto);

  let arregloJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", arregloJSON);

  Toastify({
    text: "Agregado al carrito",
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}

function mostrarCarrito() {
  console.log(carrito)
  for (let producto of carrito)
  {
    let fila = document.createElement("tr");
    // fila.setAttribute("class", "fila")
    fila.innerHTML = `<td><img src="${producto.img}"></td>
                        <td>${producto.precio}</td>
                        <td>${producto.nombre}</td>
                        <td><button class="btn-danger borrarElemento">Borrar</button></td>`;
    let tabla = document.getElementById("tbody");

    tabla.append(fila);
  }

  let botonesBorrar = document.querySelectorAll(".borrarElemento");

  for (let boton of botonesBorrar) {
    boton.addEventListener("click", borrarProducto);
  }
}

function borrarProducto(e) {
  let abuelo = e.target.parentNode.parentNode;
  abuelo.remove();
  Toastify({
    text: "Producto eliminado",
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #fc1900, #fa7c46)",
    }
  }).showToast();
}


let icon=document.querySelector("#iconCart");
icon.addEventListener("click", mostrarCarrito);



//SEARCH FILTERS
let search = document.querySelector("#input");

search.addEventListener("keyup", (e)=>{
  let productFilter = products.filter(product => product.title.toLowerCase().includes(e.target.value))||(product => product.category.toLowerCase().includes(e.target.value));
  console.log(productFilter);
})

//CATEGORY FILTERS
// let mens = document.querySelector(".men")
// mens.addEventListener("click", showCategory);

// function showCategory(products){

// }
