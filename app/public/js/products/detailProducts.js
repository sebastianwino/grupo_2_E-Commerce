window.onload = () => {
    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')

    let flag = false;
    let flag2 = false;

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

//     index[0].classList.toggle('index-15')
//     index[1].classList.toggle('index-15')
    // mediumZoom('.image-prince', {
    //     margin: 0,
    //     background: '#000',
    //   })
// })

// }
