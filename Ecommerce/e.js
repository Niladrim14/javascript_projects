document.addEventListener('DOMContentLoaded',()=>{
    const products =[
        {id:1, name:"Product1",price:29.99},
        {id:4, name:"Product2",price:19.99},
        {id:3, name:"Product3",price:20.999},
    ];

    const cart =[];

    const productlist = document.getElementById("product-list");
    const cartitems = document.getElementById("cart-items");
    const emptycart = document.getElementById("empty-cart");
    const carttotal = document.getElementById("card-total");
    const total = document.getElementById("total-price");
    const coutbtn = document.getElementById("checkout-btn");
    const backbtn = document.getElementById("remove-btn");



      products.forEach(product =>{
         const productdiv = document.createElement('div');
         productdiv.classList.add('product');
         productdiv.innerHTML = `
         <span>${product.name}- $${product.price.toFixed(2)}</span>
         <h1></h1>
         <button data-id ='${product.id}' > Add to cart</button>
         `;
         productlist.appendChild(productdiv);
      });

      productlist.addEventListener('click',(e)=>{
        if(e.target.tagName === "BUTTON"){
             const productid = parseInt(e.target.getAttribute("data-id"));
          const product = products.find(p => p.id === productid)
          
             addtocart(product);
                  }
      })


function addtocart(product){
    cart.push(product);
    rendercart();
    
    
}

function rendercart (){
    cartitems.innerText ="";
    let totalprice = 0;
    if(cart.length > 0){
        emptycart.classList.add("hidden");
    carttotal.classList.remove("hidden");
        cart.forEach((item,index)=>{
            totalprice += item.price;
            
            const cartitem = document.createElement('div');
            cartitem.innerHTML =`
            ${item.name} -$${item.price.toFixed(2)}`;
            cartitems.appendChild(cartitem);
            total.textContent = `${totalprice.toFixed(2)}`;
        })
    }
    else{
        emptycart.classList.remove("hidden");
    
    }
}
 
    coutbtn.addEventListener('click',()=>{
        alert ('Checkout ho gaya jii');
        cart.length = 0;
        rendercart();
        total.textContent = `$ 0.00`;
    }) 


backbtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (cart.length > 0) {
        let currentTotal = parseFloat(total.textContent.trim());
        total.textContent = `${currentTotal.toFixed(2)}`;
        cart.pop(); 
        rendercart();
    }
})
function savecart (){
    localStorage.setItem("cart",JSON.stringify(cart));
 }


})

