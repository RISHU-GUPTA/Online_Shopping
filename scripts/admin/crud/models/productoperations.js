const productOperations = {
    products :[],
    add(product){
        this.products.push(product);
        console.log("Added ",this.products);
    },
    remove(){
    
    },
    search(){
    
    },
    update(){
    
    },
    sort(){
    
    }
}
//to prevent it from global functions we make object