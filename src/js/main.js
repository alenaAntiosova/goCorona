const menuButton = document.querySelector('.menu__button');
if (menuButton) {
   const menuBody = document.querySelector('.menu__body')
   menuButton.addEventListener('click', function (e) {
      document.body.classList.toggle('--lock')
      menuBody.classList.toggle('--active')
      menuButton.classList.toggle('--active')
   })
}