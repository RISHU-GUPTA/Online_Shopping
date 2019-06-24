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
 else if(key=='color'){
    tr.insertCell(index).appendChild(createColor(product[key]));
    index++;
    continue;
  }
  else{
    tr.insertCell(index).innerText=product[key];
  index++;
  }
  
}
}
var countrecords=0;
function addProduct(){ //gets called when clicked on add button
  
    var product =new Product; //makes empty object with key and value=undefined;
  // console.log(product);
  for(let key in product){
    product[key]=document.getElementById(key).value;  
  }
  

printProduct(product);
countrecords++;
document.getElementById('countrecord').innerText=countrecords;
}