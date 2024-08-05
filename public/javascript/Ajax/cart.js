const cart_btn=document.querySelector("#cart_btn");
const count =document.querySelector("#count");

async function cart()
{
  const data =await fetch("/cart_details");
   const nos=await data.json();
   count.innerHTML=nos.no_prod;
}

cart_btn.addEventListener("click",cart);