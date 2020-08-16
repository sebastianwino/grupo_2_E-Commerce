let data = {};

window.onload = () => {

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
        }
    }

    function save (k,v) {
        data[k] = v;
    }

    form.name.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, !validator.isLength(data.name, {min: 2}));
    })

    form.lastname.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, !validator.isLength(data.lastname, {min: 2}));
    })

    form.email.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isEmail(data.email));
    })


    form.password.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isLength(data.password, {min: 8, max: 99}));
    })

    form.rePassword.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.equals(e.target, data.password));
    })

    form.cell_phone.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isNumeric(data.cell_phone));
    })
    
    form.submit.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('se envía la siguiente información', data);

        let formContainer = document.getElementById('formulario-registro');

        formContainer.innerHTML = `
            <h1>Te has registrado correctamente</h1>
            <ul>
                <li>Nombre completo: ${data.name}</li>
                <li>Nombre completo: ${data.lastname}</li>
                <li>Email: ${data.email}</li>
                <li>Teléfono: ${data.cell_phone}</li>
                <li>País de nacimiento: ${data.country}</li>
            </ul>
        `
    })

}