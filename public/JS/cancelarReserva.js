const botones = document.getElementsByClassName('cancelarReserva')

for (const boton of botones) {
  boton.addEventListener('click', cancelar )
}

function cancelar(event) {

  Swal.fire({
  title: '¿Estas seguro?',
  text: "Vas a cancelar una reserva, se te devolvera el dinero",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#ff0000',
  cancelButtonColor: '#DBD000',
  confirmButtonText: 'Cancelar',
  cancelButtonText: 'Salir'

}).then( async (result) => {
  
  if (result.isConfirmed) {
    const id = event.target.dataset.id
    const data = await fetch(`/${id}`)
    const res = await data.json()

    if (res.estado) {

      window.location.href = "/perfil";
      
    }
  }
})}