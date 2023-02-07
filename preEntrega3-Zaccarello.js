
let carrito = [];

function agregar_producto(e){
    let nombre_producto = e.target.parentNode.querySelector("h5").textContent;
    let precio_producto = e.target.parentNode.querySelector("span").textContent;
    let img_producto = e.target.parentNode.parentNode.querySelector("img").src;
    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,
        cantidad:1
    };
    agregar_carrito(producto);
}

let btn_compra = document.querySelectorAll(".botonCompra");
for(let boton of btn_compra){
    boton.addEventListener("click", agregar_producto);
}

function agregar_carrito(producto){
    
    let cantidad_producto = tbody.getElementsByClassName("cantidad_producto");
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].nombre == producto.nombre){
            carrito[i].cantidad++;
            set_data();
            let valor_cantidad = cantidad_producto[i];
            valor_cantidad.value++;
            return null
            mostrar_carrito();
        }  
    }
    carrito.push(producto);
    set_data();
    mostrar_carrito(producto);    
}

function set_data(){
    let carrito_json = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito_json);
}

function local_storage(producto){
    let recuperando_carrito = localStorage.getItem("carrito");
    recuperando_carrito = JSON.parse(recuperando_carrito);
    if(recuperando_carrito){
        carrito = recuperando_carrito;
        mostrar_carrito(producto);
    }
}

local_storage();

function mostrar_carrito(producto){
    tbody.innerHTML = ''
    carrito.map(producto => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
                      <td>${producto.nombre}</td>
                      <td>
                        <input type="number" value=${producto.cantidad} class="cantidad_producto"
                      </td>
                      <td>${producto.precio}</td>
                      <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                      `;
    let tabla = document.getElementById("tbody");
    tabla.append(fila);
    let btn_borrar = document.querySelectorAll(".borrar_elemento");
    for(let boton of btn_borrar){
        boton.addEventListener("click", borrar_producto);
    }
    });
}

function borrar_producto(e){
    e.target.parentNode.parentNode.remove();
}