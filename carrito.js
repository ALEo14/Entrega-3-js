function get() {
    const storedProducts = localStorage.getItem("burgers");
    return storedProducts ? JSON.parse(storedProducts) : [];
} 
function cargarCarrito() {
    const carritoProductos = document.querySelector(".carritoProductos");
    const carritoVacio = document.querySelector(".carritoVacio");
    const totalElemento = document.getElementById("total");


    const productosCarrito = get();

  
    if (productosCarrito.length === 0) {
        carritoVacio.style.display = "block";
        carritoProductos.style.display = "none";
        totalElemento.textContent = "$0.00";
    } else {
        carritoVacio.style.display = "none";
        carritoProductos.style.display = "block";
        
       
        carritoProductos.innerHTML = "";

  
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
            <div class="carritoProducto">
                <img src="${producto.img}" class="carritoImg" alt="...">
                    <h5 class="">${producto.name}</h5>
                    <p class="">${producto.description}</p>
                    <button class="eliminarProducto" data-id="${producto.id}">Eliminar</button>
                    <p class="">$ ${producto.price}</p>
                </div>
            `;
            carritoProductos.appendChild(div);
        });

        document.querySelectorAll(".eliminarProducto").forEach(button => {
            button.addEventListener("click", function() {
                const id = this.getAttribute("data-id");
                console.log(`Producto a eliminar con ID: ${id}`);
                eliminarProducto(id);
            });
        });
        
        const total = productosCarrito.reduce((acc, producto) => acc + parseFloat(producto.price), 0);
        totalElemento.textContent = `$${total.toFixed(2)}`;
    }
}


function eliminarProducto(id) {
    let productosCarrito = get();
    console.log('Carrito antes de eliminar:', productosCarrito);

    
    const index = productosCarrito.findIndex(producto => producto.id === parseInt(id, 10));

    if (index !== -1) { 
        productosCarrito.splice(index, 1); 
    }

    console.log('Carrito después de eliminar:', productosCarrito);
    localStorage.setItem("burgers", JSON.stringify(productosCarrito));
    cargarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("burgers");
    cargarCarrito(); 
}
document.querySelector(".vaciarCarrito").addEventListener("click", vaciarCarrito);
document.addEventListener("DOMContentLoaded", cargarCarrito);