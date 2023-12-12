
//----------------

let articulosCarrito = []

const listaProductos = document.querySelector("#lista-productos");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const borrarCarrito = document.querySelector("#vaciar-carrito");

const carrito = document.querySelector("#carrito");

const comprarCarritoBtn = document.querySelector("#comprar-carrito")


// -------------- funciones ----------

function agregarProducto(evt) {
    evt.preventDefault()
    if (evt.target.classList.contains("agregar-carrito")) {

        const producto = evt.target.parentElement.parentElement;
        datosProducto(producto)
    }
}


function datosProducto(item) {
    const informacionProducto = {
        imagen: item.querySelector("img").src,
        titulo: item.querySelector("h5").textContent,
        precio: item.querySelector(".precio").textContent,
        id: item.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    if (articulosCarrito.some(prod => prod.id === informacionProducto.id)) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === informacionProducto.id) {
                let cantidad = parseInt(producto.cantidad);
                cantidad += 1;
                producto.cantidad = cantidad;
                return producto
            } else {
                return producto;
            }
        })
        articulosCarrito = productos.slice()
    } else {
        articulosCarrito.push(informacionProducto);
    }
    dibujarCarrito();
}

function limpiarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function dibujarCarrito() {
    limpiarCarrito();

    let totalItems = 0;
    articulosCarrito.forEach(producto => {

        totalItems += producto.cantidad;
        const fila = document.createElement("tr")
        fila.innerHTML = `
        <td> <img src= "${producto.imagen}" width= "125" /></td>
        <td> ${producto.titulo} </td>
        <td> / ${producto.precio} </td>
        <td>  / ${producto.cantidad} </td>
        <td> <a href="#" data-id="${producto.id}"> <img src="../img/tacho.png" width= "2" class="borrar-producto" /> </a> </td>`;
        contenedorCarrito.appendChild(fila);
    });
    document.getElementById("cantidad-carrito").textContent = totalItems;
    sinStorage();
}


function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    document.getElementById("cantidad-carrito").textContent = 0;
    sinStorage();
}

function borrarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("borrar-producto")) {
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector("a").getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId);

        dibujarCarrito();
    }
}

function sinStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))

}



//-----



//--------------eventos--------------------- 

comprarCarritoBtn.addEventListener("click", () => {
    if (articulosCarrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "El carrito está vacío.",
            text: "Agrega productos antes de comprar.",
        });

    } else {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Compra exitosa. Gracias por tu compra.",
            showConfirmButton: false,
            timer: 1500
        });
        
        vaciarCarrito();
    }
})

window.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    dibujarCarrito();
});

carrito.addEventListener("click", borrarProducto);
listaProductos.addEventListener("click", agregarProducto);
borrarCarrito.addEventListener("click", vaciarCarrito);