document.addEventListener('DOMContentLoaded', () => {
    const nodoPadre = document.getElementById("nodoPadre");
    const formRegistrar = document.getElementById('formRegistrar');
    const botonMostrar = document.getElementById('btnMostrar');
    const listaClientes = document.getElementById('clientesList');

    // Clientes preexistentes en clientes.js
    const clientesPreexistentes = [
        { nombre: 'Juan', edad: 30, email: 'juan@hotmail.com', telefono: '123456789' },
        { nombre: 'María', edad: 25, email: 'maria@hotmail.com', telefono: '12345678' },
        { nombre: 'Pedro', edad: 40, email: 'pedro@hotmail.com', telefono: '12345678' },
        { nombre: 'Ana', edad: 22, email: 'ana@hotmail.com', telefono: '12345678' },
        { nombre: 'Luis', edad: 35, email: 'luis@hotmail.com', telefono: '12345678' }
    ];

    // Inicializar clientes
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];


    if (clientes.length === 0) {
        clientes = clientesPreexistentes;
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    // Función para mostrar clientes
    function mostrarClientes() {
        listaClientes.innerHTML = ''; 

        if (clientes.length === 0) {
            listaClientes.innerHTML = '<p>No hay clientes registrados.</p>';
            return;
        }

        clientes.forEach((cliente, index) => {
            const clienteItem = document.createElement('div');
            clienteItem.classList.add('cliente-item');
            clienteItem.innerHTML = `
                <strong>${cliente.nombre}</strong> - 
                Edad: ${cliente.edad}, 
                Email: ${cliente.email}, 
                Teléfono: ${cliente.telefono}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => eliminarCliente(index);

            clienteItem.appendChild(deleteButton);
            listaClientes.appendChild(clienteItem);
        });
    }

    // Función para eliminar clientes
    function eliminarCliente(index) {
        const confirmacion = confirm('¿Está seguro de que desea eliminar este cliente?');
        if (confirmacion) {
            clientes.splice(index, 1);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            mostrarClientes();
        }
    }

    // Función para registrar cliente
    function registrarCliente(e) {
        e.preventDefault(); // Evitar el envío del formulario

        const nombre = document.getElementById('nombre').value.trim();
        const edad = parseInt(document.getElementById('edad').value.trim());
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!nombre || isNaN(edad) || !email || !telefono) {
            // Mostrar un mensaje de error 
            mostrarMensaje("Por favor, complete todos los campos correctamente.", "error");
            return;
        }

        if (clientes.length >= 10) {
            // Mostrar un mensaje de error 
            mostrarMensaje("No se pueden registrar más clientes.", "error");
            return;
        }

        const cliente = {
            nombre: nombre,
            edad: edad,
            email: email,
            telefono: telefono
        };

        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        // Mostrar mensaje de "Agregado correctamente"
        mostrarMensaje("Cliente agregado exitosamente.", "success");
        mostrarClientes();
        formRegistrar.reset(); // Limpiar los campos del formulario
    }

    // Función para mostrar mensajes de éxito o error
    function mostrarMensaje(mensaje, tipo) {
        const mensajeElemento = document.createElement('div');
        mensajeElemento.className = `mensaje ${tipo}`;
        mensajeElemento.textContent = mensaje;

        // Mostrar el mensaje en el nodo padre o en otro lugar 
        nodoPadre.appendChild(mensajeElemento);

        // Desaparecer el mensaje después de unos segundos
        setTimeout(() => {
            mensajeElemento.remove();
        }, 5000);
    }

    // Evento para registrar cliente
    formRegistrar.addEventListener('submit', registrarCliente);

    // Evento para mostrar clientes
    botonMostrar.addEventListener('click', mostrarClientes);

    // Mostrar clientes al cargar la página
    mostrarClientes();
});
