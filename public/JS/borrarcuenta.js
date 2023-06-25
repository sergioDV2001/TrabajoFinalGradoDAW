document.getElementById('borrarcuenta').addEventListener("click",borrar)
    

function borrar() {

  Swal.fire({
  title: '¿Estas seguro?',
  text: "Vas a borrar tu cuenta, perderas todas tus reservas y datos de la cuenta",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#ff0000',
  cancelButtonColor: '#DBD000',
  confirmButtonText: 'Borrar',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    
    window.location.href = '/borrarcuenta';

  }
})
}