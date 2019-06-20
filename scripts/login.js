function doLogin(){
    var userid=document.getElementById('userid').value;
    var password=document.getElementById('password').value;;
    if(userid==password){
        //redirect to dashboard
        location.href="dashboard.html";


    }
    else{
        let message="Invalid username or password";
        //print on screen
        document.getElementById('error').innerHTML=message;
    }
}