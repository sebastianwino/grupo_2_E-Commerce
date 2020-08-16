

window.onload = () => {

    let err = [];
    let email;
    let pass;
    


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



  
    let form = document.getElementById('login-form');

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

    form.email.addEventListener('blur', function (e) {
        showError(e.target, validator.isEmail(e.target.value));
        email = test(email)
        
        
        
    })


    form.password.addEventListener('blur', function (e) {
        showError(e.target, validator.isLength(e.target.value, {min: 6, max: 99}));
        pass = test(pass)
        
        
    })
   
    form.submit.addEventListener('click', function (e) {
       
       console.log(err, email, pass ) 


       if (email||pass){
            e.preventDefault();
        }

    })

}