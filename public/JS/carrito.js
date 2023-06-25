const baseDeDatos = [
    {
        id: 1,
        nombre: 'Standard',
        precio: 10
    },
    {
        id: 2,
        nombre: 'Premium',
        precio: 20
    },
    {
        id: 3,
        nombre: 'VIP',
        precio: 30
    }
];


let carrito = [];
const divisa = '€';
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');

function renderizarProductos() {

    let padre = document.getElementById('padre')

    baseDeDatos.forEach((info) => {


    // Estructura
    const miNodo = document.createElement('div');
    miNodo.classList.add("col-md-4" , "col-12");

    // Titulo
    const miNodoTitle = document.createElement('label');
    miNodoTitle.classList.add("col-4", "col-md-7");
    miNodoTitle.textContent = info.nombre;

    // Boton 
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-danger', 'col-2' , 'col-md-4');
    miNodoBoton.type = 'button';
    miNodoBoton.textContent = '+';
    miNodoBoton.setAttribute('marcador', info.id);
    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

    // Insertamos
    miNodo.appendChild(miNodoTitle);
    miNodo.appendChild(miNodoBoton);
    padre.appendChild(miNodo);

    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
 function anyadirProductoAlCarrito(evento) {
    
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    carrito = carrito.sort()
    // Actualizamos el carrito 
    renderizarCarrito();

}



/**
 * Dibuja todos los productos guardados en el carrito
 */
 function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {

        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);

        // Creamos el nodo del item del carrito
        const padre = document.createElement('li');
        padre.classList.add('list-group-item' ,'d-flex' ,'justify-content-between' ,'align-items-center' ,'lh-sm', 'border', 'border-danger');

        // Body
        const caja = document.createElement('div');
        caja.id = item

        // Cantidad
        const cantidad = document.createElement('h6');
        cantidad.classList.add('my-0');
        cantidad.textContent = `${numeroUnidadesItem} persona/s`;
        cantidad.id = `cantidad${item}`;

        // Calidad
        const calidad = document.createElement('h6');
        calidad.classList.add('my-0');
        calidad.textContent = `Calidad: ${miItem[0].nombre}`;
        cantidad.id = `cantidad${item}`;

        // Precio
        const precio = document.createElement('h6');
        precio.classList.add('my-0');
        precio.textContent = `Precio: ${miItem[0].precio}${divisa}`;
        precio.id = `precio${item}`;

        // Servicio
        const servicio = document.createElement('h6');
        servicio.classList.add('my-0');
        servicio.textContent = `Servicio: ${document.getElementById('servicio').value}`;
        servicio.id = `servicio${item}`;
        // Horario
        const horario = document.createElement('h6');
        horario.classList.add('my-0');
        horario.textContent = `Horario: ${document.getElementById('horario').value}`;
        horario.id = `horario${item}`;

        // Region
        const region = document.createElement('h6');
        region.classList.add('my-0');
        region.textContent = `Región: ${document.getElementById('region').value}`;
        region.id = `region${item}`;

        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'w-100' , 'mt-3');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        // Boton disminuir
        const disminuir = document.createElement('button');
        disminuir.classList.add('btn', 'btn-danger', 'w-100' , 'mt-3');
        disminuir.textContent = '-';
        disminuir.style.marginLeft = '1rem';
        disminuir.dataset.item = item;
        disminuir.addEventListener('click', disminuirCarrito);

        // div botones

        const divBotones = document.createElement('div');
        divBotones.classList.add('d-flex','justify-content-between' ,'align-items-center');

        // Insertamos
        caja.appendChild(cantidad);
        caja.appendChild(calidad);
        caja.appendChild(precio);
        caja.appendChild(servicio);
        caja.appendChild(horario);
        caja.appendChild(region);
        divBotones.appendChild(miBoton);
        divBotones.appendChild(disminuir);
        caja.appendChild(divBotones)
        padre.appendChild(caja);
        DOMcarrito.appendChild(padre)


        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();


        document.getElementById(`personas${miItem[0].id}`).value = numeroUnidadesItem;
        document.getElementById('guardarservicio').value = document.getElementById('servicio').value;
        document.getElementById('guardarhorario').value = document.getElementById('horario').value;
        document.getElementById('guardarregion').value = document.getElementById('region').value;
        document.getElementById('guardarfecha').value = output;
        document.getElementById('comprarBoton').disabled = false;


    });
    
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;

    document.getElementById('personas'+id).value = '';

    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {

        return carritoId !== id;
    });

    carrito = carrito.sort()

    if (carrito.length == 0) {

        document.getElementById('comprarBoton').disabled = true;
        
    }
    // volvemos a renderizar
    renderizarCarrito();
}

function disminuirCarrito(evento) {

    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;

    const personas = document.getElementById('personas'+id).value;
    console.log(personas-1)
    if (personas-1 === 0) {

        document.getElementById('personas'+id).value = '';
        
    }

    carritoNuevo = carrito.filter((carritoId) => {

        return carritoId == id;
    });

    var cortado = carritoNuevo.slice(0, carritoNuevo.length-1);

    carrito = carrito.filter((carritoId) => {

        return carritoId !== id;
    });


    for (let i = 0; i < cortado.length; i++) {
        
        carrito.push(cortado[i])
        
    }

    carrito = carrito.sort()
    
    if (carrito.length == 0) {

        document.getElementById('comprarBoton').disabled = true;
        
    }
    // volvemos a renderizar
    renderizarCarrito();

    
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function getDateHoy() {

    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth()+1;
    var year = hoy.getFullYear();
    var yearMaximo = hoy.getFullYear()+2;
    if(dia<10){
    dia='0'+dia
    } 
    if(mes<10){
    mes='0'+mes
    } 

    hoy = year+'-'+mes+'-'+dia;
    fechaMaxima = yearMaximo+'-'+mes+'-'+dia;
    document.getElementById("fechareserva").setAttribute("min", hoy);
    document.getElementById("fechareserva").setAttribute("max", fechaMaxima);
    
}


// Inicio
renderizarProductos();
getDateHoy()
