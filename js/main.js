let vegetables = [];

const getData = () => {
 return fetch('../js/data/data.json')
.then(response => response.json())
.then(data => {
   vegetables = data;
   paintGroceries();
  })

}

console.log(vegetables)
const vegetablesList = document.querySelector('.js-vegetables')

const paintGroceries = () => {
 let listCode = ''; 
 for (vegetable of vegetables) {
  console.log(vegetable.name);
   if (vegetable.family === "verduras"){
   listCode += `<li class="vegetables-item">`;
   listCode += '<div class="image-content">'
   listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
   listCode += '</div>'
   listCode += `<h6 class="vegetables-title">${vegetable.name}</h6>`;
   listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
   listCode += `</li>`;
 } 
}
vegetablesList.innerHTML = listCode;
}

getData();