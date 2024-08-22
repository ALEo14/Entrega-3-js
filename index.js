
let burgers = [];
fetch("burgers.json")
.then(res => res.json())
.then(data => {
    burgers = data;
    cargarProductos(burgers);
});

const contenedorBurgers = document.querySelector(".container");

function cargarProductos(burgerElegida) {
    if (contenedorBurgers){

    
    contenedorBurgers.innerHTML = "";
    burgerElegida.forEach(burger => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${burger.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${burger.name}</h5>
                <p class="card-text">${burger.description}</p>
                <p class="card-text">${burger.price}</p>
                <a href="#" class="eliminarProducto" data-id="${burger.id}">Comprar</a>
            </div>
        `;
        contenedorBurgers.appendChild(div);
    });

    
    document.querySelectorAll('.eliminarProducto').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const burgerId = this.getAttribute('data-id');
            const burger = burgers.find(b => b.id == burgerId);
            saveProduct(burger);
            alert('Producto guardado!');
        });
    });
}else {
    console.log('No se encontro el contenedor de Burgers en el DOM');
}
}

function save(array) {
    localStorage.setItem("burgers", JSON.stringify(array));
}

function get() {
    return JSON.parse(localStorage.getItem('burgers')) || [];
}


function saveProduct(burger) {
    let storedBurgers = get();
    storedBurgers.push(burger);
    save(storedBurgers);
}


const botonescomprar = document.querySelectorAll('.carritoComprar');
botonescomprar.forEach(boton => {
    boton.addEventListener('click', () => {
        console.log('Comprando...');
        Swal.fire({
            title: "PAGADO",
            icon: "success"
          });
    })
})

