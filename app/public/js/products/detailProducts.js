window.onload = ()=> {
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


}
// window.onload = ()=> {
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
