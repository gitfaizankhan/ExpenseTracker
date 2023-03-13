async function addExpense(){
    try{
        let amount = document.getElementById('expenseAmount').value;
        let description = document.getElementById('expenseDesc').value;
        let category = document.getElementById('expenseCategory').value;
        const expenseData = {
            amount,
            description,
            category
        }
        const result = await axios.post('http://localhost:3000/user/addExpense/', expenseData);
        // console.log("hekasfl ", d.data);
        showOnWindow(result.data);
    }catch(error){
        console.log(error);
    }
}

getExpenseData();

async function getExpenseData() {
    try {
        let expenseData = await axios.get('http://localhost:3000/user/getExpense');
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
            await axios.delete('http://localhost:3000/user/delete/' + data.id);
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

