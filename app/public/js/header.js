
window.onload = ()=> {
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