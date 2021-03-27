let vegetables = [];
let cartProducts = [];

//traemos información del .json
const getData = () => {
 return fetch('../js/data/data.json')
.then(response => response.json())
.then(data => {
   vegetables = data;
   paintGroceries();
  })

}
const vegetablesList = document.querySelector('.js-vegetables')

//pintamos en pantalla los productos disponibles
const paintGroceries = () => {
 let listCode = ''; 
 for (vegetable of vegetables) {
   if (vegetable.family === "verduras"){
   listCode += `<li id=${vegetable.id} data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${vegetable.id} class="vegetables-item">`;
   listCode += '<div class="image-content">'
   listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
   listCode += '</div>'
   listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
   listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
   listCode += `</li>`;
 } else if (vegetable.family === "frutas"){
  listCode += `<li data-bs-toggle="modal" data-bs-target="#exampleModal" id=${vegetable.id} data-id=${vegetable.id} class="vegetables-item">`;
  listCode += '<div class="image-content">'
  listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
  listCode += '</div>'
  listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
  listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;;
  listCode += `</li>`;
 }
}
vegetablesList.innerHTML = listCode;
showModal();
}

//ventana modal de cada producto
const modalWindow = document.querySelector('.modal-content')
const showModal = () => {
  const modalTriger = document.querySelectorAll('.vegetables-item');
  const handelModal = (ev) => {
    modalCard = '';
    const product = ev.currentTarget.id
    for (const item of vegetables) {
    
      if (product === item.id){
        modalCard += `<div class="modal-header" id=${item.id}>`;
        modalCard += `<h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>`;
        modalCard += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        modalCard += `</div>`;
        modalCard += `<div modal-body> `;
        modalCard += `<img class="modal-img" src=${item.url} alt="Fodo de ${item.name}"`
        modalCard += '</div>';
        modalCard += '<div class="modal-footer">'
        modalCard += `<button type="button" class="btn btn-outline-secondary minusBtn" id=${item.id}><img class="cart-icon" src="../css/icons/menos.svg" alt="Quitar uno de la lista"/></button>`
        modalCard += `<p>0<p>`;
        modalCard += `<button type="button" class="btn btn-outline-secondary plusBtn" id=${item.id}><img class="cart-icon" src="../css/icons/mas.svg" alt="Añadir uno a la lista"/></button>`;
        modalCard += `</div>`;
        modalCard += `</div>`;
      }
    }
    modalWindow.innerHTML = modalCard;
    handleAddProduct();
    handleRestProduct();
  }
  modalTriger.forEach((item) => item.addEventListener('click', handelModal));
  }
//Añadir al carrito


const handleAddProduct = () => {
  const addBtn = document.querySelector('.plusBtn');
  const addProduct = () => {
    console.log('me han clicado', addBtn.id);
    for (const item of vegetables) {
      if (addBtn.id === item.id){
        cartProducts.push(item)
        console.log(cartProducts);
      }
      
    }
  }
  addBtn.addEventListener('click', addProduct);
  
}
const handleRestProduct = () => {
  const minusBtn = document.querySelector('.minusBtn');
  const restProduct = () => {
    console.log('me han clicado', minus.id);
    for (const item of vegetables) {
      if (minusBtn.id === item.id){
        cartProducts.splice(item)
        console.log(cartProducts);
      }
      
    }
  }
 minusBtn.addEventListener('click', restProduct);
  
}

/*
const handleAddProduct = (ev) => {
  console.log('me han clickado')
}
addBtn.addEventListener('click', handleAddProduct); */
//ejecución de eventos
getData();