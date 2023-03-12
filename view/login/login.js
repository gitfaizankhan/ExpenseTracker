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
        window.location.href = "../deshboard/deshboard.html";
    } catch (error) {

        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.message;
    }
}