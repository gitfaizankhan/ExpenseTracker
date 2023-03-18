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

        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.message;
    }
}


async function passwordforget(){
    // const token = localStorage.getItem('token');

    try{
        let email = document.getElementById('registeremail').value;
        const forgetdata = {
            email
        }
        const data = await axios.post('http://localhost:3000/password/forgotpassword', forgetdata);
        // console.log(token);
    }catch(error){
        console.log(error);
    }
}