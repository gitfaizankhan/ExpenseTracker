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
        const data = await axios.post('http://localhost:3000/user/sign-up', signupData);
        console.log(data);
    }catch(err){
        console.log(err);
    }
}