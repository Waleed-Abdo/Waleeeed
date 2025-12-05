let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// إضافة للسلة
function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    if(item) item.qty++;
    else cart.push({name, price, qty:1});
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("تمت إضافة المنتج!");
}

// زيادة كمية
function increase(name){
    let item = cart.find(p=>p.name===name);
    item.qty++;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// نقص كمية
function decrease(name){
    let item = cart.find(p=>p.name===name);
    if(item.qty>1) item.qty--;
    else cart = cart.filter(p=>p.name!==name);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// حذف المنتج
function removeItem(name){
    cart = cart.filter(p=>p.name!==name);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// عرض السلة
function displayCart(){
    let tableBody = document.querySelector("#cartTable tbody");
    if(!tableBody) return;
    tableBody.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
        let totalItem = item.qty*item.price;
        total += totalItem;
        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}$</td>
                <td>
                    <button class="btn" onclick="increase('${item.name}')">+</button>
                    ${item.qty}
                    <button class="btn" onclick="decrease('${item.name}')">-</button>
                </td>
                <td>${totalItem}$</td>
                <td><button class="delete-btn" onclick="removeItem('${item.name}')">حذف</button></td>
            </tr>
        `;
    });
    let totalEl = document.getElementById("totalPrice");
    if(totalEl) totalEl.textContent = `الإجمالي: ${total}$`;
}

displayCart();
