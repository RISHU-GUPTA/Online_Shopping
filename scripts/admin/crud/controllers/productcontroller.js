window.addEventListener("load",registerEvents); // loads when window ready
//registerEvents();
function registerEvents(){
document.getElementById('add').addEventListener('click',addProduct);
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
function createIcon(Name){
  var icon=document.createElement('i');
  icon.className = Name;
  icon.classList.add('mr-2');
  icon.classList.add('hand');
   return icon;
}
//Autogenerate function starts
function* autoGen(){
  var counter = 1;
  while(true){
  yield counter;
  counter++;
  }
  }
  var g=autoGen();
//Autogenerates ends

function printProduct(product){
var tbody= document.getElementById('products');
var tr=tbody.insertRow();
var index=0;
for(let key in product){
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
td.appendChild(createIcon('fas fa-trash'));
td.appendChild(createIcon('fas fa-edit'));
}
var countrecords=0;
function addProduct(){ //gets called when clicked on add button
  
    var product =new Product; //makes empty object with key and value=undefined;
  for(let key in product){
    if(key=='id'){
      product[key]=g.next().value;
      console.log(product[key]);
      continue;
    }
    product[key]=document.getElementById(key).value;  
  }
  
productOperations.add(product);
printProduct(product);
console.log(product);
countrecords++;
document.getElementById('countrecord').innerText=countrecords;
}