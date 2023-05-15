let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let category = document.getElementById('category');
let create = document.getElementById('create');
let total = document.getElementById('total');
let count = document.getElementById('count');
let btn = document.getElementById('deleteALL');
let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {

        let totalePrice = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = totalePrice;
        total.style.backgroundColor = '#009f0b'
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#a10505';
    }
}
//---------------------------
let dataPro;
if (localStorage.prodact != null) {
    dataPro = JSON.parse(localStorage.prodact);
} else {
    dataPro = []
}

create.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,
    }
    if (mood == 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }

        localStorage.setItem('prodact', JSON.stringify(dataPro));
    } else {
        dataPro[tmp] = newPro;
    }

    clearData();
    showData();
}
//---------------------------
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = '#a10505';
    count.value = '';
}
//---------------------------
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += ` <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    </tr> `
    }
    document.getElementById('tbody').innerHTML = table;

    if (dataPro.length > 0) {
        btn.innerHTML = ` <button onclick="deleteALL()">DELETE ALL (${dataPro.length})</button> `
    } else {
        btn.innerHTML = '';
    }
}
showData()
//---------------------------
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.prodact = JSON.stringify(dataPro);
    showData();
}
//---------------------------
function deleteALL() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//---------------------------
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = 'none';
    getTotal();
    category.value = dataPro[i].category;
    create.innerHTML = 'Updete';

    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//search ----------------------------------------------------
let searchMood = 'title';
function getsearchMood(id) {
    let search = document.getElementById("search");
    if (id == 'searchByTitle') {
        searchMood = 'title';
        search.placeholder = 'search by title';

    } else {
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value = '';
    // showData();
}
function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length - 1; i++) {
            if (dataPro[i].title.includes(value)) {
                console.log(i);
                table += ` <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr> `
            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                console.log(i);
                table += ` <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}