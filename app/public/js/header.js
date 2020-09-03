window.onload = () => {
    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')
    let detras = document.getElementById('detras')
    let delante = document.getElementById('delante')
    var mediaqueryList = window.matchMedia("(max-width: 992px)");
    let flag = false;
    let flag2 = false;



    mediaqueryList.addListener(function (EventoMediaQueryList) {
        console.log('Ejecutado el listener', EventoMediaQueryList.matches);
        document.addEventListener('scroll', () => {
            const scrolled = scrollY
            console.log(scrolled)
            console.log(EventoMediaQueryList.matches)
            if (EventoMediaQueryList.matches) {
                if (scrolled < 215) {
                    detras.classList.add('d-none')
                    delante.classList.remove('d-none')
                } else {
                    detras.classList.remove('d-none')
                    delante.classList.add('d-none')
                }
            } else {
                if (scrolled < 330) {
                    detras.classList.add('d-none')
                    delante.classList.remove('d-none')
                } else {
                    detras.classList.remove('d-none')
                    delante.classList.add('d-none')
                }
            }
        })
    });

    document.addEventListener('scroll', () => {
        const scrolled = scrollY
        console.log(scrolled)
        if (scrolled < 215) {
                detras.classList.add('d-none')
                delante.classList.remove('d-none')
    } else {
                detras.classList.remove('d-none')
                delante.classList.add('d-none')
            }
        if (scrolled < 330) {
                detras.classList.add('d-none')
                delante.classList.remove('d-none')
        } else {
                detras.classList.remove('d-none')
                delante.classList.add('d-none')
        }
    })



    function close() {
        animation.classList.add('hiddenAnimation')
        animation.classList.remove('playing')
        flag = true;
        animation.style.height = "0"
        animation.style.width = "0"
        flag2 = false

    }

    btn.addEventListener('click', () => {
        if (!flag2) {
            animation.classList.add('playing')
            animation.style.height = "177px"
            animation.style.width = "150px"
            if (flag) {
                animation.classList.remove('hiddenAnimation')
            }
            flag2 = true
        } else {
            close()
        }
    })


    for (let i = 0; i <= body.length; i++) {
        body[i].addEventListener('mouseover', () => {
            if (flag2) {
                close()
            }
        })
    }

}