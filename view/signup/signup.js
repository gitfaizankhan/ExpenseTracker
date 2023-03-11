async function signup() {
    try{
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

        const signupData = {
            name: name,
            email: email,
            password: pass
        }
        await axios.post('http://localhost:3000/user/sign-up', signupData);
        window.location.href = "../login/login.html";
    }catch(error){
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.message;
    }
}


