async function signup(){
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
        window.location.href = "signin.html";
    }catch(error){
        console.error(error.message);

        // Display error message on the page
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.message;
    }
}

async function signin() {
    console.log("good");
    try{
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

        const signupData = {
            email: email,
            password: pass
        }
        const data = await axios.post('http://localhost:3000/user/signin', signupData);
        console.log(data.data.message);
        window.alert(data.data.message);
    }catch(error){
        console.error(error.message);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.message;
    }
}

