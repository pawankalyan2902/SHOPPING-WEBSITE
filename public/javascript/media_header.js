const menu=document.getElementById("hamberger");
const menu_bar=document.getElementById("menu");
const navigator=document.getElementById("nav")
function main()
{
    menu_bar.classList.add("menu_js");
    navigator.classList.add("nav_js");

}

menu.addEventListener("click",main);