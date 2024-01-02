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
        "name":"Fleur Stéréo",
        "price":240,
        "description":"kda kda kda",
        "image":"./im10.jpg"
    },
    {
        "id":2,
        "name":"Fleuri Cardigan",
        "price":250,
        "description":"kda kda kda",
        "image":"./im2.jpg"
    },
    {
        "id":3,
        "name":"Cardigan bordé",
        "price":250,
        "description":"kda kda kda",
        "image":"./im3.jpg"
    },

    {
        "id":4,
        "name":"Cutenew Fraise",
        "price":250,
        "description":"kda kda kda",
        "image":"./im4.jpg"
    },{
        "id":5,
        "name":"Fleur Stéréo",
        "price":250,
        "description":"kda kda kda",
        "image":"./im5.jpg"
    },{
        "id":7,
        "name":"Cardigan bordé",
        "price":250,
        "description":"kda kda kda",
        "image":"./im6.jpg"
    },{
        "id":8,
        "name":"Fleur Stéréo",
        "price":250,
        "description":"kda kda kda",
        "image":"./im7.jpg"
    },{
        "id":9,
        "name":"Cardigan bordé",
        "price":250,
        "description":"kda kda kda",
        "image":"./im8.jpg"
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
  
    const initApp=()=>{
        //load list product
       
       let idProduct = new URLSearchParams(window.location.search).get('id');
       let info =products.filter((value)=>value.id == idProduct)[0];
       
       if(!info)
       {
        window.location.href='/';
       }
       let detail = Document.querySelector('.detail');
       detail.querySelector('.image img').src=info.image;
       detail.querySelector('.name').innerText=info.name;
       detail.querySelector('.price').innerText='$'+info.price;
       detail.querySelector('.description').innerText=info.description;
       detail.querySelector('.addCart').dataset.id=idProduct;
       
       //similaire products:
        //load list product
        let listProduct =document.querySelector('.listProduct')
        listProduct.innerHTML=null;
        products.forEach(product=>{
         let newProduct = document.createElement('div');
         newProduct.classList.add('item')
         newProduct.innerHTML=
         `
         <a href="/lexela.html?id=${product.id}">
         <img src="${product.image}" alt="">
         </a>
         <h2>${product.name}</h2>
         <div class="price">${product.price}</div>
         <button class="addCart" data-id=${product.id} >Add To Cart</button>
         
         `
         listProduct.appendChild(newProduct)
        })

    }
