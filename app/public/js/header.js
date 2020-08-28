window.onload = ()=> {
    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelector('body')
    let flag = false;
    
    btn.addEventListener('mouseover', ()=>{
        animation.classList.add('playing')
        animation.style.height = "72px"
        animation.style.width = "150px"
        if (flag) {
            animation.classList.remove('hiddenAnimation')
        }
    })

    body.addEventListener('click', () => {
        animation.classList.add('hiddenAnimation')
        animation.classList.remove('playing')
        flag = true;
        animation.style.height = "0"
        animation.style.width = "0"
    })
    

}