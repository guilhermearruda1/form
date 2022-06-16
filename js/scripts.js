class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',

        ]
    }

    validate(form) {

        // pega todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = document.getElementsByTagName('input'); // HTMLCollection

        let inputsArray = [...inputs]; // pegara os elementos encontrados no inputs e transformar em um Array

        // loop nos inputs
        inputsArray.forEach(function (input) {

            // loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                // verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpando a string para virar método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invocar método
                    this[method](input, value);
                }
            }

        }, this);
    }

    // verifica se um input tem o minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            //console.log(errorMessage);
            this.printMessage(input, errorMessage);
        }

    }

    // verifica se um input passou do limite
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            //console.log(errorMessage);
            this.printMessage(input, errorMessage);
        }
    }

    // valida email
    emailvalidate(input) {

        // regex
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um email valido (nome@email.com)`

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    // validar somente letras 
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Insira apenas letras`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }

    }

    // valida senha
    passwordvalidate(input) {

        // string para array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }

    }

    // confirma senha
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo não é igual ao ${inputName} `

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }

    }

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        // verifica qtd de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }

    // verifica se o input é obrigatório
    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = 'Este campo é obrigatório';

            this.printMessage(input, errorMessage);
        }
    }

    // limpa as validações
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

})