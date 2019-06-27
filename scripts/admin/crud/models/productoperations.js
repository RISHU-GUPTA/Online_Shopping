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
        // console.log("pedit is",pedit);
        // for(let key in pedit){
        //     if(key=='markForDelete'){
        //         continue;
        //     }
        //     if(key=='price'){
        //         continue;
        //     }
        //     // if(key=='color'){
        //     //     continue;
        //     // }
        // document.getElementById(key).innerText=pedit[key];
        // }
    },
    search(){
    
    },
    update(){
    
    },
    sort(){
    
    }
}
//to prevent it from global functions we make object