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


window.onload = () => {


    function test(vari){
        
        if (err.length>0) {
            vari = true;
            err = [];
            return vari
        } else {
            vari = false;
            return vari
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
        showError(e.target, validator.isLength(e.target.value, {min: 2}));
        dato.name = test(dato.name)
        
    })

    form.lastname.addEventListener('blur', function (e) {
        showError(e.target, validator.isLength(e.target.value, {min: 2}));
        dato.lastName = test(dato.lastName)
    })

    form.email.addEventListener('blur', function (e) {
        showError(e.target, validator.isEmail(e.target.value));
        dato.email = test(dato.email)

    })


    form.password.addEventListener('blur', function (e) {
        showError(e.target, validator.isLength(e.target.value, {min: 8, max: 99}));
        pass = e.target.value.toString()
        if(rePass){
        showError(rePass, validator.equals(pass, rePass.value));
        }
        dato.pass = test(dato.pass)

        
    })

    form.passwordConfirmation.addEventListener('blur', function (e) {
        showError(e.target, validator.equals(pass, e.target.value));
        rePass = e.target
        console.log(pass)
        dato.rePass = test(dato.rePass)

    })

    form.cell_phone.addEventListener('blur', function (e) {
        showError(e.target, validator.isNumeric(e.target.value));
        dato.email = test(dato.email)
    })

    
    
    form.submit.addEventListener('click', function (e) {
        
        for(let v in dato){
            if(dato[v]==true){
                e.preventDefault();
            }
        }
        
    })

}