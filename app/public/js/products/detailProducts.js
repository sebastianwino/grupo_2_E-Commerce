window.onload = () => {
    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')
    let detras = document.getElementById('detras')
    let delante = document.getElementById('delante')
    /* captura un objeto que establece las medidas de ancho */
    var mediaqueryList = window.matchMedia("(max-width: 992px)");
    let flag = false;
    let flag2 = false;

    //se utiliza el .addListener porque devuelve la llamada del ancho del media query
    mediaqueryList.addListener(function (EventoMediaQueryList) {
        //si estamos en movil (<992px) EventoMediaQueryList.matches va a ser "true" caso contrario false
        console.log('Ejecutado el listener', EventoMediaQueryList.matches);
        
        document.addEventListener('scroll', () => {
            //scrolly (numero en pixeles del scroll)
            const scrolled = scrollY
            console.log(scrolled)
            console.log(EventoMediaQueryList.matches)
            if (EventoMediaQueryList.matches) {
                if (scrolled <= 215) {
                    detras.classList.add('d-none')
                    delante.classList.remove('d-none')
                } else {
                    detras.classList.remove('d-none')
                    delante.classList.add('d-none')
                }
            } else {
                if (scrolled <= 330) {
                    detras.classList.add('d-none')
                    delante.classList.remove('d-none')
                } else {
                    detras.classList.remove('d-none')
                    delante.classList.add('d-none')
                }
            }
        })
    });

   
    /* mediaqueryList.addListener(function (EventoMediaQueryList) {
        console.log('Ejecutado el listener', EventoMediaQueryList.matches);
        
        document.addEventListener('scroll', () => {
            //scrolly (numero en pixeles del scroll)
            const scrolled = scrollY
            console.log(scrolled)
            console.log(EventoMediaQueryList)
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
 */

    const image = document.querySelector('.image');

    image.addEventListener('mousemove', function (e) {
        let width = image.offsetWidth;
        let height = image.offsetHeight;
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;

        let bgPosX = (mouseX / width * 100);
        let bgPosY = (mouseY / height * 100);
      
        image.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    });

    image.addEventListener('mouseleave', function () {
        image.style.backgroundPosition = "center";
    });


    // animacion boton usuario


    function close () {
        animation.classList.add('hiddenAnimation')
        animation.classList.remove('playing')
        flag = true;
        animation.style.height = "0"
        animation.style.width = "0"
        flag2=false

    }

    btn.addEventListener('click', () => {
    if (!flag2) {
    animation.classList.add('playing')
    animation.style.height = "177px"
    animation.style.width = "150px"
        if (flag) {
            animation.classList.remove('hiddenAnimation')
        }
       flag2=true
    } else {
        close ()
    }
    })


    for (let i=0; i<=body.length;i++) {
    body[i].addEventListener('mouseover', () => {
        if (flag2) {
          close()
        }
    })
    }
}
// window.onload = () => {
// let image = document.querySelector('img.image-prince')

// image.addEventListener('click', () => {
//     let index = document.querySelectorAll('.in')

//     index[0].classList.toggle('index-20')
//     index[1].classList.toggle('index-20')
// mediumZoom('.image-prince', {
//     margin: 0,
//     background: '#000',
//   })
// })

// }