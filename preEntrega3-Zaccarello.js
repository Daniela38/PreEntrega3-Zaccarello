
let carrito = [];

let btn_carrito = document.getElementById("mostrar_carrito");
btn_carrito.addEventListener("click", function(){
    let carrito = document.getElementById("carrito");
    
    if(carrito.style.display != "none"){
        carrito.style.display = "none";
    }
    else{
        carrito.style.display = "block";
    }
})

function agregar_carrito(e){
    let plan = e.target.parentNode.querySelector("h5").textContent;
    let precio = e.target.parentNode.parentNode.querySelector("span").textContent;
    let cantidad = document.getElementById("cantidad").value;
    let descripcion = e.target.parentNode.querySelector("p").textContent;
    let total = 2500 * cantidad;

    let consulta = {
        plan_consulta: plan,
        precio_plan: precio,
        cantidad_plan: cantidad,
        descripcion_plan: descripcion,
        precio_total: total
    };

    mostrar_carrito(consulta);
}


function set_data(){
    let plan_consulta = document.getElementById("plan_a");
    console.log(plan_consulta);

    let cantidad_plan = document.getElementById("cantidad");
    let compra = {plan:plan_consulta.innerText, cantidad:cantidad_plan.value};
    carrito.push(compra);

    let carrito_json = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito_json);
    let recuperando_carrito = localStorage.getItem("carrito");
    console.log(recuperando_carrito);
}

function mostrar_carrito(consulta){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${consulta.plan_consulta}</td>
                        <td>${consulta.precio_plan}</td>
                        <td>${consulta.cantidad_plan}</td>
                        <td>${consulta.descripcion_plan}</td>
                        <td>${consulta.precio_total}</td>
                        
                        <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                        `;
    let tabla = document.getElementById("tbody");
    tabla.append(fila);

    let btn_borrar = document.querySelectorAll(".borrar_elemento");
    function borrar_plan(e){
        e.target.parentNode.parentNode.remove();
    }
    for(let boton of btn_borrar){
        boton.addEventListener("click", borrar_plan)
    }

    let btn_agregar = document.querySelectorAll(".agregar_elemento");
    function agregar_elemento(e){
        e.target.parentNode.parentNode
    }
}

function recuperar_carrito(){
    let plan_consulta = document.getElementById("plan_a");
    let cantidad_plan = document.getElementById("cantidad");
    let recuperando_carrito = localStorage.getItem("carrito");
    recuperando_carrito = JSON.parse(recuperando_carrito);

    let compra = {plan:plan_consulta.innerText, cantidad:cantidad_plan.value};

    let fila = document.createElement("tr");
    fila.innerHTML = `<h1>Traigo ${compra.plan}</h1>`;
    let tabla = document.getElementById("tbody");
    tabla.append(fila);
}




let btn_compras = document.getElementById("btn_compras");

btn_compras.addEventListener("click", set_data);

let btn_comprasA = document.getElementById("btn_comprasA");

btn_comprasA.addEventListener("click", recuperar_carrito);





let btn_compra = document.querySelectorAll(".botonCompra");
for(let boton of btn_compra){
    boton.addEventListener("click", agregar_carrito);
}