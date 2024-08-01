const menuiconcontainer = document.querySelector('.menuiconcontainer');

menuiconcontainer.addEventListener('click', () => {
    menuiconcontainer.classList.toggle("change");
});

document.querySelector('.dropmenu').addEventListener('click', function() {
    this.classList.toggle('active');
});

const navbarlist = document.querySelector(".navbarlist");

menuiconcontainer.addEventListener('click', function() {
    navbarlist.classList.toggle("show");  
});
