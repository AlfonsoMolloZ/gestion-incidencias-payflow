document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos la referencia del formulario
    const form = document.getElementById("booking-form");

    // Escuchamos el evento de envío (submit)
    form.addEventListener("submit", function(event) {
        // Previene el comportamiento por defecto (recargar la página)
        event.preventDefault(); 

        // Capturamos los datos ingresados
        const name = document.getElementById("name").value;
        const selectElement = document.getElementById("service");
        const serviceText = selectElement.options[selectElement.selectedIndex].text;
        const date = document.getElementById("date").value;

        // Mostramos un mensaje de confirmación interactivo
        alert(`¡Reserva confirmada, ${name}! \nTe esperamos el ${date} para tu ${serviceText}.`);

        // Limpiamos el formulario para una nueva reserva
        form.reset(); 
    });
});