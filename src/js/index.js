'use strict'
// <    >  =>

    window.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('form');
        const number = document.getElementById('numeroCuenta');
        const pin = document.getElementById('pin');
        const button = document.getElementById('submit');

        const numberError = document.getElementById('numberError');
        const pinError = document.getElementById('pinError');

        let attempts = 0;
        const maxAttempts = 3;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Quitamos el foco si los ca,pos están llenos
            number.addEventListener('change', resetErrors);
            pin.addEventListener('change', resetErrors);

            if (!number.value.trim()) {
                numberError.textContent = 'Campo requerido';
                errorInputs();
                isValid = false;
            } else if(!isValidNumber(number.value.trim())) {
                numberError.textContent = 'Campo requerido';
                errorInputs();
            } else {
                numberError.textContent = '';
            };

            if (!pin.value.trim()) {
                pinError.textContent = 'Campo requerido';
                errorInputs();
                isValid = false;
            } else if(!isValidPin(pin.value.trim())) {
                pinError.textContent = 'Ingrese el PIN';
                errorInputs();
                isValid = false;
                attempts ++;

                if (attempts >= maxAttempts) {
                    pinError.textContent = 'Cuenta bloqueada';
                    button.disabled = true;
                    number.disabled = true;
                    pin.disabled = true;
                };
            } else {
                pinError.textContent = '';
            };
        });

        // ErrorInputs
        const errorInputs = () => {
            number.style.border = '1px solid red';
            pin.style.border = '1px solid red';
        };

        const resetErrors = () => {
            number.style.border = '';
            pin.style.border = '';
        };

        // Quitamos las expresiones regulares
        function isValidNumber(number) {
            const numberRegex = /^[0-9\s]{16,19}$/;
            return numberRegex.test(number);
        };

        function isValidPin(pin) {
            const pinRegex = /^\d{4}$/; 
            return pinRegex.test(pin)
        };

    });