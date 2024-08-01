
function chnagelist(tab)
{
    const content =document.querySelectorAll('.content');

   content.forEach( (div) => {
    div.style.display = 'none';

   });
   
   const tabs = document.querySelectorAll('.tab');
   tabs.forEach((tabElement) => {
       tabElement.classList.remove('selected');
   });

   const selectedTab = document.getElementById(tab + 'Tab');
   selectedTab.classList.add('selected');
   
    document.getElementById(tab).style.display='block';


}
chnagelist('live');
