const cart = () =>{
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.close');
    let body = document.querySelector('body');
    let carte=[];
    iconCart.addEventListener('click', ()=>{
        body.classList.toggle('activeTabCart');
    })
    
    closeBtn.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    
    const setProductInCart=(idProduct,quantity,position)=>{
        if(quantity > 0){
            if(position < 0){
                carte.push({
                    product_id: idProduct,
                    quantity:quantity
                });
            }else{
                carte[position].quantity=quantity;
            }
        }
        else{
            carte.splice(position,1)
        }
        localStorage.setItem('carte', JSON.stringify(carte));
        refreshQartHtml();
    }

    const refreshQartHtml = () =>{
        let listHtml = document.querySelector('.listCart');
        let totalHTML =document.querySelector('.icon-cart span');
        let totalQantity =0;
        listHtml.innerHTML=null;
        carte.forEach(item =>{
            totalQantity = totalQantity + item .quantity;
            let position = products.findIndex((value)=>value.id==item.product_id);
            let info=products[position];
            totalHTML.innerHTML=totalQantity;
            let newITem =document.createElement('div')
            newITem.classList.add('item')
            newITem.innerHTML=`

        <div class="image">
        <img src="${info.image}" alt="">
        </div>
        <div class="name">Name</div>
        <div class="totalPrice">${info.price*item.quantity}</div>
        <div class="quantity">
        <span class="minus" data-id="${info.id}" >-</span>
        <span >${item.quantity}</span>
        <span class="plus" data-id="${info.id}">+</span>
        </div>
        `;
           listHtml.appendChild(newITem)
        })
        totalHTML.innerText=totalQantity;
    }
    //event click
    document.addEventListener('click',(event)=>{
        let buttonClick =event.target;
        let idProduct=buttonClick.dataset.id;
        let position=carte.findIndex((value)=>value.product_id==idProduct);
        let quantity = position < 0 ? 0 :carte[position].quantity;
        if(buttonClick.classList.contains('addCart') ||buttonClick.classList.contains('plus')){
            quantity++;
            setProductInCart(idProduct,quantity,position);
            
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct,quantity,position);
        }
      
    })
    
    /*const initApp=()=>{
if (localStorage.getItem('carte')){
     cart = JSON.parse(localStorage.getItem('carte'));  
}
refreshQartHtml();
    };
   initApp();*/
    
}
export const products = [
    {
        "id":1,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im1.jpg"
    },
    {
        "id":2,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im2.jpg"
    },
    {
        "id":3,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im3.jpg"
    },

    {
        "id":4,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im4.jpg"
    },{
        "id":5,
        "name":"triko1",
        "price":6,
        "description":"kda kda kda",
        "image":"./img/im5.jpg"
    },{
        "id":7,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im6.jpg"
    },{
        "id":8,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im7.jpg"
    },{
        "id":9,
        "name":"triko1",
        "price":200,
        "description":"kda kda kda",
        "image":"./img/im8.jpg"
    }
    
];
let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');
//load template

const loadTemplate = () => {
    fetch('./tmplate.html')
    .then(response => response.text())
    .then(html => {
         app.innerHTML=html;
         let contentTab = document.getElementById('contentTab');
         contentTab.innerHTML = temporaryContent.innerHTML;
         temporaryContent.innerHTML=null;
        cart();
        initApp();
    }) 
      
    }   
   
    loadTemplate();
  