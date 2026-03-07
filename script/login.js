// console.log('I am successfull In  2026 Year In-sa-Alla')

document.getElementById('sign-in-btn').addEventListener("click", function(){
    const inputAdmin = document.getElementById("input-admin");
    const userName = inputAdmin.value;
    // console.log(userName);

    const inputPin = document.getElementById('input-pin');
    const pin = inputPin.value;
    // console.log(pin);

    if(userName === 'admin' && pin === 'admin123'){
        alert('Login success');
        window.location.assign("./main.html")
    }
    else{
        alert('login Failed')
    }
})