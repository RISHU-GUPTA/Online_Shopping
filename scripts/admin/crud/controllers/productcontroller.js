window.addEventListener("load",init); // loads when window ready
//registerEvents();
var auto;
function init(){
  showToUsers();
  registerEvents();
   auto= autoGen();
   console.log(auto);
   printCounter();
   
}

function printCounter(){
  document.querySelector('#id').innerText=auto.next().value;
}

function printProducts(products){
  document.querySelector('#products').innerHTML = '';
  products.forEach(printProduct);
}


function deleteProduct(){
  productOperations.remove();
  printProducts(productOperations.products);
 
  }

  function showHide(){
    document.querySelector('#searchbox').classList.toggle('tooglebox');
  }

function searchThings(){
  var val=document.querySelector('#searchValue').value;
  console.log(val);
  var option=document.querySelector('#searchby').value;
  console.log(option);
  if(option!=-1){
    var subarray=productOperations.search(option,val);
    console.log(subarray);
    printProducts(subarray);
  }
 }

 function saveProduct(){
  if(localStorage){
    localStorage.products = JSON.stringify(productOperations.products);
    alert("Record Saved...");
}
else{
    alert("Ur Browser is Outdated....");
}
 }

 function loadProduct(){
  if(localStorage){
    if(localStorage.products){
        productOperations.products = JSON.parse(localStorage.products);
        printProducts( productOperations.products);
      //  showRecordCounts();
    }
    else{
        alert("No Data to Load");
    }
}
else{
    alert("Ur Browser is Outdated....");
}
 }

function clearAll(){
  document.querySelector('#name').value="";
  document.querySelector('#desc').value="";
  document.querySelector('#url').value="";
  document.querySelector('#color').value="#ffff";
  document.querySelector('#price').value=100;
  document.getElementById("name").focus();

}

function sortProduct(){
  productOperations.sort();
  printProducts(productOperations.products);
}

function saveToServer(){
  var productarray=productOperations.products;
  for(let product of productarray){
    firebase.database().ref('/products/'+product.id).set(product);
  }
}

function clone(fireBaseObject){
  var productObject = new Product(fireBaseObject.id,fireBaseObject.name,fireBaseObject.desc,fireBaseObject.price, fireBaseObject.url, fireBaseObject.color);
  productOperations.add(productObject);
}

function loadFromServer(){
  productOperations.products=[];
  var products=firebase.database().ref('/products');
  products.on('value',(snapshot)=>{
    let prods=snapshot.val();
    for(let key in prods){
      let fireBaseProductObject =  prods[key];
      clone(fireBaseProductObject);
    }
    printProducts(productOperations.products);
  })
}

function showToUsers() {
  productOperations.products=[];
  var products=firebase.database().ref('/products');
  products.on('value',(snapshot)=>{
    let prods=snapshot.val();
    for(let key in prods){
      let fireBaseProductObject =  prods[key];
      clone(fireBaseProductObject);
    }
    showProducts(productOperations.products);
  })
  
}

function showProducts(products){
  products.forEach(showProduct);
}
function showProduct(product){
  console.log(product);
  var div=document.querySelector('#producttousers');
    var div1=document.createElement('div');
    var img=document.createElement('img');
    img.src=product.url;
    img.classList='size';
    div1.appendChild(img);
     var name=document.createElement('span');
     name.innerHTML= product.name;
    var desc=document.createElement('span');
    desc.innerText=product.desc;
     var price=document.createElement('span');
     price.innerText=product.price;
     var color=document.createElement('div');
     color.classList='sizecolor1';
     color.style.backgroundColor=product.color;
     //color.style.display='inline';
     var but=document.createElement('button');
     but.innerText="Add To Cart";
     but.setAttribute("id","addtocart");
     div1.appendChild(name);
    div1.appendChild(desc);
     div1.appendChild(price);
     div1.appendChild(color);
     div1.appendChild(but);
    div.appendChild(div1);
  
}
var cartcount=0;
function addCart() {
  
  ++cartcount;
  console.log(cartcount);
  document.querySelector('#cartcount').value=cartcount;
}

function registerEvents(){
document.getElementById('addtocart').addEventListener('click',addCart);
document.getElementById('savetoserver').addEventListener('click',saveToServer);
document.getElementById('loadfromserver').addEventListener('click',loadFromServer);
document.getElementById('add').addEventListener('click',addProduct);
document.getElementById('delete').addEventListener('click',deleteProduct);
document.getElementById('update').addEventListener('click',update);
document.getElementById('search').addEventListener('click',showHide);
document.getElementById('searchValue').addEventListener('change',searchThings);
document.getElementById('save').addEventListener('click',saveProduct);
document.getElementById('load').addEventListener('click',loadProduct);
document.getElementById('clear').addEventListener('click',clearAll);
document.getElementById('sort').addEventListener('click',sortProduct);
}

function createImage(url){
  var image=document.createElement('img');
  image.src=url;
  image.className='size';
  return image;
}

function createColor(color){
  var circle=document.createElement('div');
   circle.style.backgroundColor = color;
   circle.className='sizecolor';
  return circle;
}

function toggleMark(){
 // var icon=this;
var id=this.getAttribute('pid');
var tr = this.parentNode.parentNode;
tr.classList.toggle('alert-danger');
productOperations.toggleMark(id);
}

var productObject;

function edit(){
console.log("edit is ",this);
var productid=this.getAttribute('pid');
productObject=productOperations.edit(productid);
fillInputs(productObject); 
}

function fillInputs(productObject){
  for(let key  in productObject){
      if(key=='id'){
          document.querySelector("#"+key).innerText = productObject[key];
      continue;
      }
      if(key=='markForDelete'){
          continue;
      }
      document.querySelector("#"+key).value = productObject[key];
  }
}

function update(){
  for(let key  in productObject){
      // if(key=='id'){
      //     productObject[key] =  document.querySelector("#"+key).innerText;
      // continue;
      // }
      if(key=='markForDelete' || key=='id'){
          continue;
      }
      productObject[key] = document.querySelector("#"+key).value;
  }
  printProducts(productOperations.products);
}

function createIcon(Name,fn,id){
  var icon=document.createElement('i');
  icon.className = Name;
  icon.classList.add('mr-2');
  icon.classList.add('hand');
  icon.setAttribute("pid",id);
  icon.addEventListener('click',fn);
  return icon;
}

function printProduct(product){
var tbody= document.getElementById('products');
var tr=tbody.insertRow();
var index=0;
for(let key in product){
  if(key=='markForDelete'){
    continue;
}
  if(key=='url'){
    tr.insertCell(index).appendChild(createImage(product[key]));
    index++;
    continue;
  }
 if(key=='color'){
    tr.insertCell(index).appendChild(createColor(product[key]));
    index++;
    continue;
  }
    tr.insertCell(index).innerText=product[key];
  index++;
}
var td=tr.insertCell(index);
td.appendChild(createIcon('fas fa-trash',toggleMark,product.id));
td.appendChild(createIcon('fas fa-edit',edit,product.id));
}
var countrecords=0;


function addProduct(){ //gets called when clicked on add button
  
    var product =new Product; //makes empty object with key and value=undefined;
  for(let key in product){
    if(key=='markForDelete'){
      continue;
    }
    if(key=='id'){
      product[key] = document.getElementById(key).innerText;
      continue;  
     }
    product[key]=document.getElementById(key).value;  
  }
productOperations.add(product);
printProduct(product);
printCounter();
countrecords++;
document.getElementById('countrecord').innerText=countrecords;
}