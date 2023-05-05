async function forgetPassword() {
    try {
        let pass = document.getElementById('password').value;
        let forgetid = localStorage.getItem('forgetid');
        console.log("forgetid ", forgetid);
        const resetpasswor = {
            forgetid: forgetid,
            password: pass
        }
        const data = await axios.post('http://localhost:3000/password/resetpassword', resetpasswor);
        window.alert("Password Update Successfully. Go to Login");
    } catch (error) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'Error: ' + error.response.data.message;
        console.log(error.response.data.message)
    }
}