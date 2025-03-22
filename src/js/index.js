'use strict'
// <    >  =>

'use strict'

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

    const retirarInput = document.getElementById('retirarDinero');
    const depositarInput = document.getElementById('depositarDinero');
    const retirarContainer = document.querySelector('.container-retirar');
    const depositarContainer = document.querySelector('.container-depositar');

    const salir = document.getElementById('salir');
    const retirarOpcion = document.getElementById('retirarDinero');
    const depositarOpcion = document.getElementById('depositar');
    const botonesRegresar = document.querySelectorAll('.botonRegresar');

    let attempts = 0;
    const maxAttempts = 3;
    let saldo = 1000;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const errorInputs = () => {
            number.style.border = '1px solid red';
            pin.style.border = '1px solid red';
        };

        if (!number.value.trim()) {
            numberError.textContent = 'Campo requerido';
            errorInputs();
            isValid = false;
        } else {
            numberError.textContent = '';
        }

        if (!pin.value.trim()) {
            pinError.textContent = 'Campo requerido';
            errorInputs();
            isValid = false;
        } else {
            pinError.textContent = '';
        }

        if (isValid) {
            autenticarUsuario(number.value, pin.value);
        }
    });

    function autenticarUsuario(numeroCuenta, pinIngresado) {
        const cuentaValida = '1234567890123456';
        const pinValido = '1234';

        if (numeroCuenta === cuentaValida && pinIngresado === pinValido) {
            containerForm.style.display = 'none';
            gestionContainer.style.display = 'flex';
        } else {
            pinError.textContent = 'Credenciales incorrectas';
            attempts++;
            if (attempts >= maxAttempts) {
                pinError.textContent = 'Cuenta bloqueada';
                button.disabled = true;
                number.disabled = true;
                pin.disabled = true;
            }
        }
    }

    consultarSaldo.addEventListener('click', () => {
        gestionContainer.style.display = 'none';
        saldoContainer.style.display = 'flex';
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
            } else {
                retirarInput.value = '';
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
            } else {
                depositarInput.value = '';
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
