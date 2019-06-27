const productOperations = {
    products :[],
    add(product){
        this.products.push(product);
        console.log("Added ",this.products);
    },
    remove(){
        this.products = this.products.filter(product=>!product.markForDelete);
    },
    toggleMark(id){
        var mark = this.products.find(product=>product.id==id);    
        mark.markForDelete= !mark.markForDelete;

    },
    edit(id){
        var pedit=this.products.find(product=>product.id==id);
        return pedit;
    },
    search(option,val){
        if(!val){
            return this.products;
        }
        return this.products.filter(thing=>thing[option]==val); //if string put []
    
    },
    update(){
    
    },
    sort(){
    
    }
}
//to prevent it from global functions we make object