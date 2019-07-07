function doLogin(){
    var userid=document.getElementById('userid').value;
    var password=document.getElementById('password').value;
if(userid=='Admin' && password=='Admin123'){
    location.href="dashboard.html";
}
else{
    var users=firebase.database().ref('/users');
    console.log(users);
    users.on('value',(snapshot)=>{
        let prods=snapshot.val();

const values = Object.values(prods)
console.log(values)

for(let data of values){

 if(data.id==userid && data.pass==password){
     console.log("congrats");
     location.href="shop.html";
 }

}  })
}
    
  
 //   if(userid==password){
       
        //     let prods=snapshot.val();
        // console.log(prods);
        // for(let user in prods){
        //     console.log(user);
        //     if(userid==user.id && password==user.pass){
        //         location.href="dashboard.html";
        //     }
        // }
      //  location.href="dashboard.html";
  
        //redirect to dashboard
     //  location.href="dashboard.html";


  //  }
    // else{
    //     let message="Invalid username or password";
    //     //print on screen
    //     document.getElementById('error').innerHTML=message;
    // }
}
//signout
function signout(){
    location.href="index.html";
}

function doSignup(){
    console.log("do sigup clicked");
    var user=new User();
    console.log("user object formed",user);
    for(let key in user){
        user[key]=document.getElementById(key).value;
    }
    console.log("user object got value",user);
    // useroperation.add(user);
    // var userarray=useroperation.user;
    // for(let user of userarray){
    //  var promise=  firebase.database().ref('/users/'+user.id).set(user);
    //  promise.then(data=>{
    //     alert("Record Added");
    // }).catch(err=>{
    //     alert("NOt Added Error Occur");
    //     console.log(err);
    // })
    // }

    var promise=  firebase.database().ref('/users/'+user.id).set(user);
     promise.then(data=>{
        alert("Record Added");
    }).catch(err=>{
        alert("NOt Added Error Occur");
        console.log(err);
    })
    

   }
