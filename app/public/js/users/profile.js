let data = {};
let err = [];
let dato = {
    name: false,
    lastName: false,
    cell: false
}

let firstTime = {
    name: false,
    lastName: false,
    cell: false
}

window.onload = () => {

//Asigna clases del ejs. a las distintas variables creadas    
    let firstMenu = document.querySelector('.first-menu');
    let secondMenu = document.querySelector('.second-menu');
    let thirdMenu = document.querySelector('.third-menu');
    let fourthMenu = document.querySelector('.fourth-menu');

    let mainPanel = document.querySelector('div.main-panel');
    let firstPanel = document.querySelector('.first-panel');
    let secondPanel = document.querySelector('.second-panel');
    let thirdPanel = document.querySelector('.third-panel');
    let fourthPanel = document.querySelector('.fourth-panel');
    let flag1 = 0;


    
// Funcion para ocultar menu y panel no seleccionado
    function switch1(flag1) {
        switch (flag1) {
            case 1:
                firstMenu.classList.remove('selectedMenu');
                firstPanel.classList.add('d-none');
                break;
            case 2:
                secondMenu.classList.remove('selectedMenu');
                secondPanel.classList.add('d-none');
                break;
            case 3:
                thirdMenu.classList.remove('selectedMenu');
                thirdPanel.classList.add('d-none');
                break;
            case 4:
                fourthMenu.classList.remove('selectedMenu');
                fourthPanel.classList.add('d-none');
                break;
            default:
                firstMenu.classList.remove('selectedMenu');
                firstPanel.classList.add('d-none');
        }
    }



// Funcion para mostrar menu y panel no seleccionado    
    function forEvent(menuClass, panelClass, num) {
        document.querySelector(menuClass).classList.add('selectedMenu');
        document.querySelector(panelClass).classList.remove('d-none');
        flag1 = num;
    }


//Ejecuta las funciones anteriores y aparte cambia la bandera    
    if (flag1 != 1) {
        firstMenu.addEventListener('click', (e) => {
            switch1(flag1);
            forEvent('.first-menu', '.first-panel', 1);
        })
    }

    if (flag1 != 2) {
        secondMenu.addEventListener('click', (e) => {
            switch1(flag1);
            forEvent('.second-menu', '.second-panel', 2);
        })
    }

    if (flag1 != 3) {
        thirdMenu.addEventListener('click', (e) => {
            switch1(flag1);
            forEvent('.third-menu', '.third-panel', 3);
        })
    }

    if (flag1 != 4) {
        fourthMenu.addEventListener('click', (e) => {
            switch1(flag1);
            forEvent('.fourth-menu', '.fourth-panel', 4);
        })
    }





    
    /* Validación de formulario de edición de usuario */
    function test() {
        if (err.length > 0) {
            err = [];
            return true;
        } else {
            return false;
        }
    }

    function switch2(expression, e) {
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

            case 'cell_phone':
                showError(e, validator.isNumeric(e.value));
                dato.cell = test()
                firstTime.cell = true
                break;
            default:
        }
    }

    let form = document.getElementById('edit-profile-form');

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
        if (!firstTime.name) {
            switch2('name', e.target);
        }

    })
    form.name.addEventListener('keyup', function (e) {
        if (firstTime.name) {
            switch2('name', e.target);
        }
    })

    form.lastname.addEventListener('blur', function (e) {
        if (!firstTime.lastName) {
            switch2('lastname', e.target);
        }
    })
    form.lastname.addEventListener('keyup', function (e) {
        if (firstTime.lastName) {
            switch2('lastname', e.target);
        }
    })
 
    form.cell_phone.addEventListener('blur', function (e) {
        if (!firstTime.cell) {
            switch2('cell_phone', e.target);
        }
    })
    form.cell_phone.addEventListener('keyup', function (e) {
        if (firstTime.cell) {
            switch2('cell_phone', e.target);
        }
    })

    form.submit.addEventListener('click', function (e) {
        switch2('name', form.name);
        switch2('lastname', form.lastname)
        switch2('cell_phone', form.cell_phone);

        for (let v in dato) {
            if (dato[v] == true) {
                flag2 = true
            }
        }
        if (flag2) {
            e.preventDefault();
        }
    })

}