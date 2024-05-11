let shop = document.getElementById('shop');

let shopItemsData =[
    {
        id:'1',
        name:"casual shirt",
        price:45,
        desc:"shop it now, the best product in the market with such a low range",   
        img:"img-1.jpg"   
     } , 
     {
        id:'2',
        name:"Office shirt",
        price:100,
        desc:"shop it now, the best product in the market with such a low range",   
        img:"img-2.jpg"   
     },
     {
        id:'3',
        name:"T-shirt",
        price:25,
        desc:"shop it now, the best product in the market with such a low range",   
        img:"img-2.jpg"   
     },
     {
        id:'4',
        name:"Men Suit",
        price:345,
        desc:"shop it now, the best product in the market with such a low range",   
        img:"img-4.jpg"   
     }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

// 0: {id: 2, item: 15}
// 1: {id: 1, item: 6}

let cartAmount = document.querySelector('.cartAmount');
cartAmount.innerHTML = basket.reduce((acc , obj)=>{
    return acc + obj.item;
},0) ;

let generateShop = ()=>{
    return (shop.innerHTML= 
        shopItemsData.map((x)=>{
           let {id,name,price,desc,img}=x;
            
           let val = 0;
            basket.forEach(element => {
                 if(x.id == element.id){
                    val = element.item;
            }
 });

            return `
            <div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onClick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id="${id}" class="quantity">${val}</div>
                    <i onClick="increment(${id})" class="bi bi-plus-lg"></i>
         </div>
            </div>
            </div>
        </div>`
        }).join("")
        )
}

generateShop();

let increment = (id)=>{
    let selectedItem =id;
        let search = basket.find((x)=>{
       return selectedItem === x.id;
    })
    if(search === undefined){
        basket.push({
            id:selectedItem,
            item:1
            
        })
    }
    else{
           search.item+=1;
    } 
 
localStorage.setItem("data",JSON.stringify (basket));
    
    update(selectedItem);
}

let decrement = (id)=>{
    let selectedItem =id;
    let search = basket.find((x)=>{
   return selectedItem === x.id;
}) 
if (search === undefined) return;

else if(search.item === 0 ) return;

else search.item-=1;

update(selectedItem);

basket = basket.filter((x)=> x.item !== 0);

localStorage.setItem("data",JSON.stringify(basket))

}

let update =(id)=>{
  let search = basket.find((x)=>{
    return x.id === id
  })
  document.getElementById(id).innerHTML=`${search.item}`
   
   if(basket.length === 0){
    console.log("empty"); 
    } 
 console.log(basket);     
if(basket.length !== 0){
    var total = basket.reduce((acc, x)=> acc + x.item,0) 
     }
console.log(total); 
 cartAmount.innerHTML=total;
    }
     