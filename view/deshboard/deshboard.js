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
        for (let data of expenseData.data) {
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

