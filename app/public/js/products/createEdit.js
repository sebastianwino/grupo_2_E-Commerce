let data = {};

window.onload = () => {

    let form = document.getElementById('form');

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

    form.price.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isNumeric(data.price, {min: 0, max: 9999}));
    })

    form.description.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, !validator.isLength(data.description, {min: 20}));
    })

    form.category.addEventListener('change', function (e) {
        save(e.target.name, e.target.value)
        showError(e.target, !validator.isEmpty(data.category))
    })

    form.slices.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isNumeric(data.slices, {min: 0, max: 9999}));
    })
  
    form.stock.addEventListener('blur', function (e) {
        save(e.target.name, e.target.value);
        showError(e.target, validator.isNumeric(data.stock, {min: 0, max: 9999}));
    })
    
    form.submit.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('se envía la siguiente información', data);

        let formContainer = document.getElementById('formulario-registro');

        formContainer.innerHTML = `
            <h1>Producto creado</h1>
            <ul>
                <li>Nombre completo: ${data.name}</li>
                <li>Precio: ${data.price}</li>
                <li>Descripción: ${data.description}</li>
                <li>Categoría: ${data.category}</li>
                <li>Porciones: ${data.slices}</li>
                <li>Stock: ${data.stock}</li>
            </ul>
        `
    })

}