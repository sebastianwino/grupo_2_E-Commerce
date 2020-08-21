let data = {};
let pass;
let rePass;
let err = [];
let dato = {
    name: false,
    lastName: false,
    email: false,
    pass: false,
    rePass: false,
    cell: false
}

let firstTime = {
    name: false,
    lastName: false,
    email: false,
    pass: false,
    rePass: false,
    cell: false
}


window.onload = () => {

    function test() {
        if (err.length > 0) {
            err = [];
            return true
        } else {
            return false
        }
    }

    function switcheando(expression, e) {
        switch (expression) {
            case 'name':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.name = test()
                firstTime.name = true
                break;
            case 'lastname':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.lastName = test()
                firstTime.lastName = true
                break;
            case 'email':
                showError(e, validator.isEmail(e.value));
                dato.email = test()
                firstTime.email = true
                break;
            case 'password':
                showError(e, validator.isLength(e.value, {min: 8, max: 99}));
                pass = e.value.toString()
                dato.pass = test()
                firstTime.pass = true
                break;
            case 'passwordConfirmation':
                showError(e, validator.equals(pass, e.value));
                rePass = e
                dato.rePass = test()
                firstTime.rePass = true
                break;
            case 'cell_phone':
                showError(e, validator.isNumeric(e.value));
                dato.cell = test()
                firstTime.cell = true
                break;
            default:

        }
    }


    let form = document.getElementById('register-form');

    let showError = (el, bool = false) => {
        if (bool) {
            el.classList.remove('is-invalid');
            el.classList.add('text-success');
            el.nextElementSibling.classList.replace('d-inline-block', 'd-none');
        } else {
            el.classList.remove('text-success');
            el.classList.add('is-invalid');
            el.nextElementSibling.classList.replace('d-none', 'd-inline-block');
            err.push('error');
        }
    }

    form.name.addEventListener('blur', function (e) {
        if(!firstTime.name){
        switcheando('name', e.target);
        }
    
    })
    form.name.addEventListener('keyup', function (e) {
        if(firstTime.name){
        switcheando('name', e.target);
        }
    })

    form.lastname.addEventListener('blur', function (e) {
        if(!firstTime.lastName){
        switcheando('lastname', e.target);
        }
    })
    form.lastname.addEventListener('keyup', function (e) {
        if(firstTime.lastName){
        switcheando('lastname', e.target);
        }
    })


    form.email.addEventListener('blur', function (e) {
        if(!firstTime.email){
        switcheando('email', e.target);
        }
    })
    form.email.addEventListener('keyup', function (e) {
        if(firstTime.email){
        switcheando('email', e.target);
        }
    })

    form.password.addEventListener('blur', function (e) {
        if(!firstTime.pass){
        switcheando('password', e.target);
        if (rePass) {
        switcheando('passwordConfirmation', rePass)
        }}
    })
    form.password.addEventListener('keyup', function (e) {
        if(firstTime.pass){
        switcheando('password', e.target);
        if (rePass) {
            switcheando('passwordConfirmation', rePass)
            }}
    })

    form.passwordConfirmation.addEventListener('blur', function (e) {
        if(!firstTime.rePass){
        switcheando('passwordConfirmation', e.target);
        }
    })
    form.passwordConfirmation.addEventListener('keyup', function (e) {
        if(firstTime.rePass){
        switcheando('passwordConfirmation', e.target);
        }
    })

    form.cell_phone.addEventListener('blur', function (e) {
        if(!firstTime.cell){
        switcheando('cell_phone', e.target);
        }
    })
    form.cell_phone.addEventListener('keyup', function (e) {
        if(firstTime.cell){
        switcheando('cell_phone', e.target);
        }
    })

    form.submit.addEventListener('click', function (e) {
        switcheando('name', form.name);
        switcheando('lastname', form.lastname)
        switcheando('email', form.email)
        switcheando('password', form.password)
        switcheando('password', form.passwordConfirmation)
        switcheando('cell_phone', form.cell_phone);
        firstTime.rePass = true



        let flag = false
        for (let v in dato) {
            if (dato[v] == true) {
                flag = true
            }
        }
        if (flag) {
            e.preventDefault();
        }
    })
}