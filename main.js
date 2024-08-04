// main.js

const MAX_CLIENTES = 10;
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

// Función para registrar un cliente
function registrarCliente() {
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;

    if (nombre === '' || edad === '') {
        alert('Por favor, complete todos los campos');
        return;
    }

    if (clientes.length >= MAX_CLIENTES) {
        alert('No se pueden registrar más clientes');
        return;
    }

    const cliente = {
        nombre: nombre,
        edad: parseInt(edad),
    };

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente registrado exitosamente');
    limpiarCampos();
    mostrarClientes();
}

// Función para mostrar los clientes registrados
function mostrarClientes() {
    const clientesList = document.getElementById('clientesList');
    clientesList.innerHTML = '';

    if (clientes.length === 0) {
        clientesList.innerHTML = '<p>No hay clientes registrados.</p>';
        return;
    }

    clientes.forEach((cliente, index) => {
        const clienteItem = document.createElement('div');
        clienteItem.classList.add('cliente-item');
        clienteItem.innerHTML = `<strong>${cliente.nombre}</strong> - Edad: ${cliente.edad}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarCliente(index);

        clienteItem.appendChild(deleteButton);
        clientesList.appendChild(clienteItem);
    });
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        mostrarClientes();
    }
}

// Función para limpiar los campos de entrada
function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
}

// Función para verificar si existe algún cliente mayor de edad
function verificarMayorDeEdad() {
    const hayMayorDeEdad = clientes.some(cliente => cliente.edad >= 18);
    alert(hayMayorDeEdad ? 'Hay clientes mayores de edad registrados.' : 'No hay clientes mayores de edad registrados.');
}

//LocalStorage
document.getElementById('btnRegistrar').addEventListener('click', registrarCliente);
document.getElementById('btnMostrar').addEventListener('click', mostrarClientes);

// Mostrar clientes al cargar la página
mostrarClientes();
