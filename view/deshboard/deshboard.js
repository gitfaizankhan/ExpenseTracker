// Add user Expense
async function addExpense(){
    try{
        const token = localStorage.getItem('token');
        let amount = document.getElementById('expenseAmount').value;
        let description = document.getElementById('expenseDesc').value;
        let category = document.getElementById('expenseCategory').value;
        const expenseData = {
            amount,
            description,
            category
        }
        const result = await axios.post('http://localhost:3000/expense/addExpense/', expenseData, { headers: {'Authorization': token}});
        showOnWindow(result.data);
    }catch(error){
        console.log(error);
    }
}




// get user expense
getExpenseData();

async function getExpenseData() {
    const token = localStorage.getItem('token');
    try {
        let expenseData = await axios.get('http://localhost:3000/expense/getExpense', { headers: { 'Authorization': token } });
        const premiumData = expenseData.data.premium
        premiumbtn(premiumData);
        for (let data of expenseData.data.expenseData) {
            showOnWindow(data);
        }
    } catch (error) {
        console.log(error);
    }
}



// Show User Expense
function showOnWindow(data) {
    let tbody = document.getElementById("items");
    let tr = document.createElement('tr');

    let am = document.createElement('td');
    let desc = document.createElement('td');
    let cate = document.createElement('td');
    let btnD = document.createElement('td');
    am.innerText = data.amount;
    desc.innerText = data.description;
    cate.innerText = data.category;
    var deleteB = document.createElement('input');
    
    deleteB.type = 'button'
    deleteB.value = 'Delete'
    deleteB.className = "btn btn-primary"
    deleteB.addEventListener('click', async (e) => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.delete('http://localhost:3000/expense/delete/' + data.id, { headers: {'Authorization': token}});
            tr.remove();
        } catch (error) {
            console.log(error);
        }
    });
    btnD = tr.insertCell(btnD);
    btnD.appendChild(deleteB);
    tr.append(am);
    tr.append(desc);
    tr.append(cate);
    tr.append(btnD);
    tbody.append(tr);
}









// premium leaderboard button action
function leaderboard(data){
    // disable ==>  one time click button
    // let isDisabled = false; 
    // isDisabled = !isDisabled;
    // leaderboardbtn.disabled = isDisabled;
    
    let diveElement = document.getElementById('premiumbtn');
    var leaderboardbtn = document.createElement('input');
    leaderboardbtn.type = 'button'
    leaderboardbtn.value = 'Show Leaderboard'
    leaderboardbtn.id = "leaderboard",
    leaderboardbtn.className = "btn btn-info btn-lg ms-2"
    leaderboardbtn.addEventListener('click', async (e)=>{
        try{
            const data = await axios.get('http://localhost:3000/purchase/showleaderboard');

            // leader board data heading
            const thead = document.getElementById('headingHead');
            const headD = document.createElement('h3');
            headD.className = 'mb-4 pt-3';
            headD.style.textAlign = 'center'
            headD.textContent = 'Leader Board'
            thead.append(headD);

            for(let d in data.data){
                showleaderboardData(data.data[d]);
            }
            
        }catch(error){
            throw new Error(error);
        }
    });
    diveElement.appendChild(leaderboardbtn);
}





// leaderboard table data 
function showleaderboardData(data){

    const datatable = document.getElementById('leaderboarditem');
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let amount = document.createElement('td');
    name.innerText = `Name: ${data.name}`,
    amount.innerText = `Total Expense: ${data.amount}`;

    tr.append(name);
    tr.append(amount);
    datatable.append(tr);
}




// Premium Button Details
function getPremiumButton(data){
    let diveElement = document.getElementById("premiumbtn");
    var button = document.createElement('input');
    button.type = 'button'
    button.value = 'Buy Premium'
    button.id = 'payment_button'
    button.className = "btn btn-warning btn-lg ms-2"
    button.addEventListener('click', async (e) => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/purchase/premium_member', { headers: { 'Authorization': token } });
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,

            "handler": async function (response) {
                const premiumresult = await axios.post('http://localhost:3000/purchase/update_transaction_status', {
                    order_id: options.order_id,
                    payment_id: response.rozarpay_payment_id,
                }, {
                    headers: { 'Authorization': token }
                });
                alert('You are a Premium User Now');
                localStorage.setItem('token', premiumresult.data.token);
                window.location.href = "../deshboard/deshboard.html";
            }
        };
        console.log("Options ", options);
        var Rozarpay = new Razorpay(options);
        Rozarpay.open();
        e.preventDefault();

        Rozarpay.on('payment.failed', function (response) {
            alert('Something Went Wrong');
        });
    });

    diveElement.appendChild(button);
}


// premium Features Action
function premiumbtn(data){
    console.log("called");
    if(data === false){
        getPremiumButton(data);
    }else{

        // calling leadboard
        leaderboard(data);

        // premium status
        const ispremiumuser = document.getElementById('isPremium');
        const premium = document.createElement('h6');
        premium.innerHTML = 'premium user';
        premium.className = 'mb-4 pb-2 pb-md-0 mb-md-5 text-uppercase';
        premium.style.textAlign = "right";
        premium.style.fontWeight = "500"
        premium.style.color = "green";
        ispremiumuser.appendChild(premium);
    }
}