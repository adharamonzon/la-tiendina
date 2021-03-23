const vegetables = [];

const getData = () => {
 return fetch('../js/data/data.json')
.then(response => response.json())
.then(data => {return vegetables.push(data)
  })

}

console.log(vegetables)

const vegetablesList = document.querySelector('.js-vegetables')

const paintVegetables = () => {
 let listCode = ''; 
 for (vegetable of vegetables) {
   console.log(vegetable.name)
   if (vegetable.family === "verduras"){
   listCode += `<li><h4>${vegetable.name}</h4>`;
   listCode += `<img src=${vegetable.url} />}`;
   listCode += `</li>`
 }
}
vegetablesList.innerHTML = listCode;
}

getData();
paintVegetables()