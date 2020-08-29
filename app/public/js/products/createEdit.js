let data = {};
let pass;
let rePass;
let err = [];
let product = {
    name: false,
    price: false,
    description: false,
    category: false,
    slices: false,
    stock: false
}

window.onload = () => {

    function test(){
        let vari
        if (err.length>0) {
            vari = true;
            err = [];
            return vari
        } else {
            vari = false;
            return vari
        }
    }

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
            err.push('error');
        }
    }

    form.name.addEventListener('blur', function (e) {
        showError(e.target, validator.isLength(e.target.value, {min: 2}));
        product.name = test()
    })

    form.price.addEventListener('blur', function (e) {
        showError(e.target, validator.isNumeric(e.target.value, {min: 0, max: 9999}));
        product.price = test()
    })

    form.description.addEventListener('blur', function (e) {
        showError(e.target, validator.isLength(e.target.value, {min: 20}));
        product.description = test()
    })

    form.category.addEventListener('change', function (e) {
        showError(e.target, !validator.isEmpty(e.target.value))
        product.category = test()
    })

    form.slices.addEventListener('blur', function (e) {
        showError(e.target, validator.isNumeric(e.target.value, {min: 0, max: 9999}));
        product.slices = test()
    })
  
    form.stock.addEventListener('blur', function (e) {
        showError(e.target, validator.isNumeric(e.target.value, {min: 0, max: 9999}));
        product.stock = test()
    })
    
    form.submit.addEventListener('click', function (e) {
        let flag = false
        for(let v in product){
            if(product[v]==true){
                flag = true
            }
        }
        if(flag){
            e.preventDefault();
        }
    })

    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')
    let flag = false;
    let flag2 = false;
    console.log('llega')

    function close () {
            animation.classList.add('hiddenAnimation')
            animation.classList.remove('playing')
            flag = true;
            animation.style.height = "0"
            animation.style.width = "0"
            flag2=false
    }
   
        btn.addEventListener('click', ()=>{
        if (!flag2){
        animation.classList.add('playing')
        animation.style.height = "140px"
        animation.style.width = "150px"
            if (flag) {
                animation.classList.remove('hiddenAnimation')
            }
           flag2=true
        } else {
            close ()
        } 
        })
   

        for (let i=0; i<=body.length;i++){
        body[i].addEventListener('mouseover', ()=>{
            if(flag2){
              close() 
            }
        })
    }
    
}