
document.getElementById('botonActualizar').hidden = true
const botonEditar = document.getElementById('editarcuenta')

botonEditar.addEventListener('click', function() {

    document.getElementById('botonActualizar').hidden = false

    const nombre = document.getElementById('nombre')    
    const apellidos = document.getElementById('apellidos')
    const telefono = document.getElementById('telefono')
    const direccion = document.getElementById('direccion')

    const nombrePadre = document.getElementById('nombrePadre')
    const apellidosPadre = document.getElementById('apellidosPadre')
    const telefonoPadre = document.getElementById('telefonoPadre')
    const direccionPadre = document.getElementById('direccionPadre')

    /* NOMBRE ACTUALIZAR */
    nombre.remove()
    var nombreInput = document.createElement("input");
    nombreInput.type= 'text';
    nombreInput.className = 'form-control'
    nombreInput.name = 'nombreNuevo'
    nombreInput.required = true
    nombreInput.value = nombre.textContent
    nombrePadre.appendChild(nombreInput);

    /* APELLIDOS ACTUALIZAR */
    apellidos.remove()
    var apellidosInput = document.createElement("input");
    apellidosInput.type= 'text';
    apellidosInput.className = 'form-control'
    apellidosInput.name = 'apellidosNuevo'
    apellidosInput.required = true
    apellidosInput.value = apellidos.textContent
    apellidosPadre.appendChild(apellidosInput);

    /* TELEFONO ACTUALIZAR */
    telefono.remove()
    var telefonoInput = document.createElement("input");
    telefonoInput.type= 'text';
    telefonoInput.className = 'form-control'
    telefonoInput.name = 'telefonoNuevo'
    telefonoInput.required = true
    telefonoInput.value = telefono.textContent
    telefonoPadre.appendChild(telefonoInput);

    /* DIRECCION ACTUALIZAR */
    direccion.remove()
    var direccionInput = document.createElement("input");
    direccionInput.type= 'text';
    direccionInput.className = 'form-control'
    direccionInput.name = 'direccionNuevo'
    direccionInput.required = true
    direccionInput.value = direccion.textContent
    direccionPadre.appendChild(direccionInput);

    
})









