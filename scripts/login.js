function doLogin(){
    var userid=document.getElementById('userid').value;
    var password=document.getElementById('password').value;;
    if(userid==password){
        var users=firebase.database().ref('online-shopping-f3553/users');
        console.log(users);
        users.on('value',(snapshot)=>{
            let prods=snapshot.val();
        console.log(prods);
        })
        //redirect to dashboard
        location.href="dashboard.html";


    }
    else{
        let message="Invalid username or password";
        //print on screen
        document.getElementById('error').innerHTML=message;
    }
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
    useroperation.add(user);
    var userarray=useroperation.user;
    for(let user of userarray){
        firebase.database().ref('/users/user '+user.id).set(user);
    }
   }
