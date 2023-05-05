async function signin() {
    try {
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

        const signupData = {
            email: email,
            password: pass
        }
        const data = await axios.post('http://localhost:3000/user/signin', signupData);
        window.alert(data.data.message);
        localStorage.setItem('token', data.data.token);
        window.location.href = "../deshboard/deshboard.html";
    } catch (error) {
        console.log(error)
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error;
    }
}


async function passwordforget(){
    try{
        let email = document.getElementById('registeremail').value;
        console.log("email ", email);
        const forgetdata = {
            email
        }
        const datad = await axios.post('http://localhost:3000/password/forgotpassword', forgetdata);
        window.alert("Go to Email And Click On link");
        localStorage.setItem('forgetid', datad.data._id);
    }catch(error){
        alert("Please Enter Correct Email")
        console.log(error);
    }
}