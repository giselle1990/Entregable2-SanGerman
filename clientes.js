document.addEventListener('DOMContentLoaded', () => {
    const clientesPreexistentes = [
        { nombre: 'Juan', edad: 30, email: 'juan@hotmail.com', telefono: '123456789' },
        { nombre: 'María', edad: 25, email: 'maria@hotmail.com', telefono: '12345678' },
        { nombre: 'Pedro', edad: 40, email: 'pedro@hotmail.com', telefono: '12345678' },
        { nombre: 'Ana', edad: 22, email: 'ana@hotmail.com', telefono: '12345678' },
        { nombre: 'Luis', edad: 35, email: 'luis@hotmail.com', telefono: '12345678' }
    ];

    if (!localStorage.getItem('clientes')) {
        localStorage.setItem('clientes', JSON.stringify(clientesPreexistentes));
    }
});
