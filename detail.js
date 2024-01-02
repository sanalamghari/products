
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

    const cart = () =>{
        let iconCart = document.querySelector('.icon-cart');
        let closeBtn = document.querySelector('.close');
        let body = document.querySelector('body');
       
        iconCart.addEventListener('click', ()=>{
            body.classList.toggle('activeTabCart');
        })
        
        closeBtn.addEventListener('click', () => {
            body.classList.toggle('activeTabCart');
        })
        
    }


