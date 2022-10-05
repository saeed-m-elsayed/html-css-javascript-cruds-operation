let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let totalContainer = document.getElementById("total-container");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deletes = document.getElementById("delete");
let searchs = document.getElementById("searchs");
let searchTitle = document.getElementById("s-title");
let searchCategory = document.getElementById("s-category");
let tBody = document.getElementById("tBody")
let mainCss = document.getElementById("main-css")
let morning = document.getElementById("morning")
let night = document.getElementById("night")
let up = document.getElementById("up")
let totalPrice
let i = 0;

// localStorage.clear()
let mode = function (mode) {
    localStorage.mode = mode;
    mainCss.href = mode;
    };

    if (localStorage.length > 0)
    mainCss.href = localStorage.mode;

window.onscroll = function(){
    if(scrollY >= 300){
        up.style.visibility = 'visible'
        up.style.opacity = '1'
    }else{
        up.style.visibility = 'hidden'
        up.style.opacity = '0'
    }
}
up.onclick = function(){
    window.scrollTo({top:0,behavior:"smooth"})
}

night.onclick = function(){
    mainCss.href = 'css/dark-mode.css'
}
morning.onclick = function(){
    mainCss.href = 'css/master.css'
}

function getPrice(){
    if(price.value.length != "" && price.value != 0){
        totalPrice = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = totalPrice;
    }
    if(total.innerHTML != "" && total.innerHTML != 0 && price.value.length && price.value > "0"){
        totalContainer.style.background = "green"
    }
    else{
        totalContainer.style.background = "red"
        total.innerHTML = "Enter Price";
        taxes.value = ""
        ads.value = ""
        discount.value = ""
        price.value = ""
    }
    if(taxes.value < "0"){
        taxes.value = "";
    }
    else if(ads.value < "0"){
        ads.value = "";
    }
    else if(discount.value < "0"){
        discount.value = "";
    }
    if(count.value < "0"){
        count.value = ''
    }
}


let dataProduct;
if(localStorage.product != null){
    dataProduct =  JSON.parse(localStorage.product)
}else{
    dataProduct = []
}


submit.onclick = function(){
    if(price.value.length != 0 && title.value.length != 0 && category.value.length != 0){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:totalPrice,
        count:count.value,
        category:category.value
    }
    if (newProduct.count > 1){
        for(let i= 0 ; i < newProduct.count ; i++)
    dataProduct.push(newProduct)
    }else dataProduct.push(newProduct)
    localStorage.setItem("product", JSON.stringify(dataProduct))
    // console.log(dataProduct)
    clearData()
    readData()
    deleteButton()
}
}
// console.log(JSON.parse(localStorage.product))

// start clear inputs

function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = 'Enter Price'
    totalContainer.style.background = "red"
    count.value = ''
    category.value = ''
}

// end clear inputs

let table
// start read data
function readData(){
    table = ''
    for(let i = 0 ; i < dataProduct.length ; i++){
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].category}</td>
    <td>${dataProduct[i].total}</td>
    <td><button id="update-item">update</button></td>
    <td><button onclick="deleteItem(${i})" id= "delete-item">delete</button></td>
</tr>
    `;
}
    tBody.innerHTML = table;
}
// end read data

readData()
deleteButton()

function deleteItem(i){
    dataProduct.splice(i,1)
    localStorage.product = JSON.stringify(dataProduct)
    readData()
    deleteButton()
}

function deleteButton(){
    if(tBody.innerHTML.length > 0){
        deletes.classList.remove("hide")
    deletes.innerHTML = `DELETE ALL (${dataProduct.length})`
}
else
deletes.classList.add("hide")
}

function deleteAll(){
    localStorage.removeItem("product");
    deletes.classList.add("hide")
    dataProduct = []
    readData()
}