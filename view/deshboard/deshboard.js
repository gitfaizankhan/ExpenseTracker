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

getExpenseData();

async function getExpenseData() {
    
    const token = localStorage.getItem('token');
    try {
        let expenseData = await axios.get('http://localhost:3000/expense/getExpense', { headers: { 'Authorization': token } });
        const d = expenseData.data.premium
        premiumbtn(d);
        for (let data of expenseData.data.expenseData) {
            // console.log(data);
            showOnWindow(data);
        }
    } catch (error) {
        console.log(error);
    }
}

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

// premium btn
function premiumbtn(data){
    if(data === false){
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
    }else{
        const ispremiumuser = document.getElementById('isPremium');
        const premium = document.createElement('h6');
        premium.innerHTML = 'premium user';
        premium.className = 'mb-4 pb-2 pb-md-0 mb-md-5 text-uppercase';
        premium.style.textAlign = "right";
        // premium.style.marginTop = "10px";
        premium.style.fontWeight = "500"
        premium.style.color = "green";
        ispremiumuser.appendChild(premium);
    }
}