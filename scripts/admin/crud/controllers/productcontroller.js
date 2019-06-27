window.addEventListener("load",init); // loads when window ready
//registerEvents();
var auto;
function init(){
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

function registerEvents(){
document.getElementById('add').addEventListener('click',addProduct);
document.getElementById('delete').addEventListener('click',deleteProduct);
document.getElementById('update').addEventListener('click',update);

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
      if(key=='id'){
          productObject[key] =  document.querySelector("#"+key).innerText;
      continue;
      }
      if(key=='markForDelete'){
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