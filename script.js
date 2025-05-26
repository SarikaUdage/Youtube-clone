var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container= document.querySelector(".container");
let subMenu = document.getElementById("subMenu");

menuIcon.onclick=function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

const toggleBtn = document.querySelector('.toggle-subs-btn');
    const moreSubs = document.querySelector('.more-subs');

    toggleBtn.addEventListener('click', () => {
        const isHidden = moreSubs.style.display === 'none';
        moreSubs.style.display = isHidden ? 'block' : 'none';
        toggleBtn.textContent = isHidden ? 'Show less' : 'Show more';
    });