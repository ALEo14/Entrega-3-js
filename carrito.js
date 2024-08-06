
function cargarCarrito() {
    const carritoProductos = document.querySelector(".carritoProductos");
    const carritoVacio = document.querySelector(".carritoVacio");
    const totalElemento = document.getElementById("total");


    const productosCarrito = get();

  
    if (productosCarrito.length === 0) {
        carritoVacio.style.display = "block";
        carritoProductos.style.display = "none";
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
                    <p class="">${producto.price}</p>
                </div>
            `;
            carritoProductos.appendChild(div);
        });

   
        const total = productosCarrito.reduce((acc, producto) => acc + parseFloat(producto.price), 0);
        totalElemento.textContent = `$${total.toFixed(2)}`;
    }
}


function vaciarCarrito() {
    localStorage.removeItem("burgers");
    cargarCarrito(); 
}
document.querySelector(".vaciarCarrito").addEventListener("click", vaciarCarrito);


document.addEventListener("DOMContentLoaded", cargarCarrito);