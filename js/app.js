let balance = parseFloat(localStorage.getItem("balance")) || 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateUI() {
    if(document.getElementById("userBalance")) document.getElementById("userBalance").innerText = balance.toFixed(2);
    if(document.getElementById("modalBalance")) document.getElementById("modalBalance").innerText = balance.toFixed(2);
}

function toggleBalanceModal() {
    const modal = document.getElementById("balanceModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function addBalance() {
    let amt = parseFloat(document.getElementById("topupAmount").value);
    if(amt > 0) {
        balance += amt;
        saveBalance();
    }
}

function quickAdd(amt) {
    balance += amt;
    saveBalance();
}

function saveBalance() {
    localStorage.setItem("balance", balance);
    updateUI();
    document.getElementById("topupAmount").value = "";
    showToast("Balans artırıldı! ✅");
}

function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    item ? item.qty++ : cart.push({ name, price, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("Səbətə əlavə olundu! 🛒");
}

window.onload = updateUI;