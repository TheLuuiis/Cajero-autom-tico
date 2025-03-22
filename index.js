'use strict'
// <    >  =>

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const number = document.getElementById('numeroCuenta');
    const pin = document.getElementById('pin');
    const button = document.getElementById('submit');
    const numberError = document.getElementById('numberError');
    const pinError = document.getElementById('pinError');
    const containerForm = document.querySelector('.container-form');

    const saldoContainer = document.querySelector('.container-saldo');
    const saldoDisplay = document.getElementById('cantidadSaldo');
    const gestionContainer = document.querySelector('.container-gestion');
    const consultarSaldo = document.getElementById('saldo');

    const retirarOpcion = document.getElementById('retirarDinero'); // Botón de menú
    const retirarInput = document.getElementById('inputRetirar'); // Input corregido
    const retirarContainer = document.querySelector('.container-retirar');

    const depositarOpcion = document.getElementById('depositar');
    const depositarInput = document.getElementById('depositarDinero');
    const depositarContainer = document.querySelector('.container-depositar');

    const salir = document.getElementById('salir');
    const botonesRegresar = document.querySelectorAll('.botonRegresar');

    let saldo = 1000; // Saldo inicial

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        autenticarUsuario(number.value, pin.value);
    });

    function autenticarUsuario(numeroCuenta, pinIngresado) {
        const cuentaValida = '1234567890123456';
        const pinValido = '1234';

        if (numeroCuenta === cuentaValida && pinIngresado === pinValido) {
            form.style.display = 'none';
            containerForm.style.display = 'none';
            gestionContainer.style.display = 'flex';
            saldoDisplay.textContent = `$${saldo}`;
        } else {
            pinError.textContent = 'Credenciales incorrectas';
        }
    }

    consultarSaldo.addEventListener('click', () => {
        gestionContainer.style.display = 'none';
        saldoContainer.style.display = 'flex';
        saldoDisplay.textContent = `$${saldo}`;
    });

    retirarOpcion.addEventListener('click', () => {
        gestionContainer.style.display = 'none';
        retirarContainer.style.display = 'flex';
    });

    depositarOpcion.addEventListener('click', () => {
        gestionContainer.style.display = 'none';
        depositarContainer.style.display = 'flex';
    });

    retirarInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let cantidad = parseFloat(retirarInput.value);
            if (!isNaN(cantidad) && cantidad > 0 && cantidad <= saldo) {
                saldo -= cantidad;
                saldoDisplay.textContent = `$${saldo}`;
                retirarInput.value = '';
                alert('Retiro exitoso');
            } else {
                alert('Cantidad inválida o saldo insuficiente');
            }
        }
    });

    depositarInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let cantidad = parseFloat(depositarInput.value);
            if (!isNaN(cantidad) && cantidad > 0) {
                saldo += cantidad;
                saldoDisplay.textContent = `$${saldo}`;
                depositarInput.value = '';
                alert('Depósito exitoso');
            } else {
                alert('Cantidad inválida');
            }
        }
    });

    botonesRegresar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            saldoContainer.style.display = 'none';
            retirarContainer.style.display = 'none';
            depositarContainer.style.display = 'none';
            gestionContainer.style.display = 'flex';
        });
    });

    salir.addEventListener('click', () => {
        location.reload();
    });
});