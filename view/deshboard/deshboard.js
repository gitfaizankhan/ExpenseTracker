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
        console.log(result.data)
        showOnWindowData(result.data)
    }catch(error){
        console.log(error);
    }
}

function showOnWindowData(data){
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
        deleteB.addEventListener('click', async (e) => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.delete('http://localhost:3000/expense/delete/' + data.id, { headers: { 'Authorization': token } });
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


// Show User Expense
function showOnWindow(dat) {
    let tbody = document.getElementById("items");
    tbody.innerHTML = ''
    for (let data of dat) {
        showOnWindowData(data);    
    }
    
}

function downloadData(premiumResult){
    const diveElement = document.getElementById('downloadE');
    var button = document.createElement("button");
    button.textContent = "Download Expenses";
    diveElement.appendChild(button);
    let isDisabled = false;
    if (premiumResult === false) {
        isDisabled = !isDisabled;
        button.disabled = isDisabled;
    }

    button.addEventListener('click', async (e)=>{
        try{
            const token = localStorage.getItem('token');
            // console.log(token);
            const result = await axios.get('http://localhost:3000/expense/download/',  { headers: { 'Authorization': token } }); 
            const downloadAnchor = document.createElement('a');
            downloadAnchor.href = result.data.fileUrl;
            downloadAnchor.download = 'Expence.txt';
            downloadAnchor.click();
        }catch(error){
            console.log(error);
        }
    })
    
}

// premium leaderboard button action
function leaderboard(data){
    let diveElement = document.getElementById('premiumbtn');
    var leaderboardbtn = document.createElement('input');
    leaderboardbtn.type = 'button'
    leaderboardbtn.value = 'Show Leaderboard'
    leaderboardbtn.id = "leaderboard",
    leaderboardbtn.addEventListener('click', async (e)=>{
        try{
            const data = await axios.get('http://localhost:3000/purchase/showleaderboard');
            // leader board data heading
            const thead = document.getElementById('headingHead');
            const headD = document.createElement('h3');
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
    amount.innerText = `Total Expense: ${data.totalexpense}`;
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
    if(data === false){
        getPremiumButton(data);
    }else{

        // calling leadboard
        leaderboard(data);

        // premium status
        const ispremiumuser = document.getElementById('isPremium');
        const premium = document.createElement('h6');
        premium.innerHTML = 'premium user';
        premium.style.color = "green";
        ispremiumuser.appendChild(premium);
    }
}


// downloaded file url
getdownloadedurl();

async function getdownloadedurl(){
   
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/expense/downloadfileurl', { headers: { 'Authorization': token } });
    response.data.forEach(element => {
        showUrlData(element)
        
    });
    
}


// show url data in able
function showUrlData(element) {
    const table = document.getElementById('fileurl')
    let tr = document.createElement('tr');
    let userId = document.createElement('td');
    let url = document.createElement('td');
    var downloadAnchor = document.createElement('a');
    downloadAnchor.href = `${element.url}`
    var filename = element.url.substring(element.url.lastIndexOf('/') + 1);
    downloadAnchor.textContent = `${filename}`
    url.appendChild(downloadAnchor);
    userId.innerText = `${element.userId}`;
    tr.append(url);
    tr.append(userId);
    table.append(tr);
}


// pagination

function showPagination(paginationDetails){
    const { currentPage, hasNextPage, hasPreviousPage, lastPage, nextPage, previousPage }  = paginationDetails;
    pagination.innerHTML = '';

    if(hasPreviousPage){
        const btn2 = document.createElement('button')
        btn2.innerHTML = previousPage
        btn2.addEventListener('click', () => getProducts(previousPage))
        pagination.appendChild(btn2)
    }

    const btn1 = document.createElement('button')
    btn1.innerHTML = `<h3>${currentPage}</h3>`
    btn1.addEventListener('click', () => getProducts(currentPage))
    pagination.appendChild(btn1);

    if(hasNextPage){
        const btn3 = document.createElement('button')
        btn3.innerHTML = nextPage
        btn3.addEventListener('click', () => getProducts(nextPage))
        pagination.appendChild(btn3)
    }
}


async function getProducts(page){
    const token = localStorage.getItem('token');
    const expenseData = await axios.get(`http://localhost:3000/expense/getExpense?page=${page}`, { headers: { 'Authorization': token } });
    showOnWindow(expenseData.data.expense);
    showPagination(expenseData.data.paginationDetails)
    return expenseData;
}
window.addEventListener('DOMContentLoaded', async () => {
    const page = 1;
    const dara = await getProducts(page);
    const { premium, paginationDetails } = dara;
    downloadData(paginationDetails);
    premiumbtn(premium);
})