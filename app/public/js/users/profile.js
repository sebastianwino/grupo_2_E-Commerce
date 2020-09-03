window.onload = () => {

    
    let firstMenu = document.querySelector('.first-menu');
    let secondMenu = document.querySelector('.second-menu');
    let thirdMenu = document.querySelector('.third-menu');
    let fourthMenu = document.querySelector('.fourth-menu');

    let mainPanel = document.querySelector('div.main-panel');
    let firstPanel = document.querySelector('.first-panel');
    let secondPanel = document.querySelector('.second-panel');
    let thirdPanel = document.querySelector('.third-panel');
    let fourthPanel = document.querySelector('.fourth-panel');
    console.log(fourthPanel)
    let flag = 0;

    function swicheando(flag) {
        switch (flag) {
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

    function forEvent(menuClass, panelClass, num) {
        document.querySelector(menuClass).classList.add('selectedMenu')
        document.querySelector(panelClass).classList.remove('d-none')
        flag = num
    }

    if (flag != 1) {
        firstMenu.addEventListener('click', () => {
            swicheando(flag)
            forEvent('.first-menu', '.first-panel', 1);
        })
    }

    if (flag != 2) {
        secondMenu.addEventListener('click', () => {
            swicheando(flag)
            forEvent('.second-menu', '.second-panel', 2);
        })
    }

    if (flag != 3) {
        thirdMenu.addEventListener('click', () => {
            swicheando(flag)
            forEvent('.third-menu', '.third-panel', 3);
        })
    }

    if (flag != 4) {
        fourthMenu.addEventListener('click', () => {
            swicheando(flag)
            forEvent('.fourth-menu', '.fourth-panel', 4);
        })
    }

}