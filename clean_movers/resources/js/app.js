const mobileMenuButton = document.getElementById('display-mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMobileMenuButton = document.getElementById('hide-mobile-menu');

mobileMenuButton.addEventListener('click',()=>{
    mobileNav.classList.remove('hide-mobile-nav');
    mobileNav.classList.add('show-mobile-nav');
});

closeMobileMenuButton.addEventListener('click',()=> {
    mobileNav.classList.add('hide-mobile-nav');
    mobileNav.classList.remove('show-mobile-nav');
})