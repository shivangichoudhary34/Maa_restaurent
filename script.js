

// ==========================================
// 1. ROYAL MENU DATABASE & STATE MANAGEMENT
// ==========================================
const menuItems = [
    { id: 1, name: "Maa Ki Special Kachori", category: "Starters", price: 90, desc: "Golden-crisp artisanal kachoris stuffed with fine spiced lentils, accompanied by heirloom sour potato gravy.", img: "kachori.jpg" },
    { id: 2, name: "Crispy Paneer Pakoda", category: "Starters", price: 120, desc: "Rich slabs of organic cottage cheese enveloped inside fresh herb paste and crunchy golden gram batter.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80" },
    { id: 8, name: "Malai Chaap", category: "Main Course", price: 260, desc: "Soya chaap marinated in rich fresh cream, cashew paste, and secret spices, grilled in a traditional clay oven.", img: "tandoori Malai chaap.jpg" },
    { id: 3, name: "Maa Ki Daal (Dal Makhani)", category: "Main Course", price: 320, desc: "Velvety black lentils slow-cooked overnight over embers, enriched with hand-churned dairy white butter and cream.", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80" },
    { id: 4, name: "Shahi Paneer Laziz", category: "Main Course", price: 380, desc: "Delicate cubes of fresh paneer poached in a royal silken gravy crafted from vine tomatoes and toasted cashews.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" },
    { id: 5, name: "Premium Tawa Roti (4 Pcs)", category: "Main Course", price: 60, desc: "Pillowy flatbreads made from organic stone-ground wheat, puffed directly over fire and glossed with pure cow ghee.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
    { id: 9, name: "Royal Murgh Makhani (Butter Chicken)", category: "Non-Veg", price: 450, desc: "Tender tandoori chicken pieces simmered in a rich, velvety tomato, butter, and fenugreek gravy.", img: "murgh makhani.jpg" },
    { id: 10, name: "Mutton Rogan Josh", category: "Non-Veg", price: 520, desc: "Slow-cooked Kashmiri mutton delicacy infused with whole spices and a vibrant red chili glaze.", img: "mutton rogan josh.jpg" },
    { id: 6, name: "Saffron Kheer", category: "Desserts", price: 150, desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", img: "saffon kheer.jpg" },
    { id: 7, name: "kaddu ki Kheer", category: "Desserts", price: 150, desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", img: "kaddu ki kheer.jpg" },
    { id: 11, name: "Gulab Jamun", category: "Sweets", price: 90, desc: "Thick, churned yogurt drink served in a royal style, loaded with crushed almonds and fragrant saffron.", img: "gulab jamun.jpg" },
    { id: 12, name: "Malai Kulfi", category: "Sweets", price: 120, desc: "Traditional Indian ice cream dense with reduced milk, rich saffron, pistachio nuts, and rose water.", img: "malai kulfi.jpg" },
    { id: 13, name: "Shahi Kesar Badam Lassi", category: "Drinks", price: 90, desc: "Thick, churned yogurt drink served in a royal style, loaded with crushed almonds and fragrant saffron.", img: "kesar badam lassi.jpg" },
    { id: 14, name: "coke", category: "Drinks", price: 150, desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", img: "coke.jpg" },
    { id: 15, name: "lemon Juice", category: "Drinks", price: 110, desc: "A refreshing blend of fresh mint leaves, zesty lime juice, sugar, and sparkling soda over crushed ice.", img: "lemon juice.jpg" }
];

let cart = [];
let appliedDiscount = 0;
let globalWhatsAppURL = "";

window.onload = () => {
    displayMenu();
    getTableNumberFromURL();
    setupClickEvents();
};

function getTableNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNum = urlParams.get('table'); 
    const tableBadge = document.getElementById("table-number");
    if (tableBadge) {
        tableBadge.innerText = tableNum ? tableNum.padStart(2, '0') : "06";
    }
}

function setupClickEvents() {
    const reviewBtn = document.querySelector(".view-cart-btn");
    if (reviewBtn) {
        reviewBtn.addEventListener("click", openCartModal);
    }
    
    const floatingCart = document.getElementById("cart-view");
    if (floatingCart) {
        document.querySelector(".view-cart-btn").onclick = function () {
    openCartModal();
};
        
    }
}

// ==========================================
// 2. RENDERING ENGINE
// ==========================================
function displayMenu() {
    const menuContainer = document.getElementById("menu-items-container");
    if (!menuContainer) return;
    menuContainer.innerHTML = ""; 

    menuItems.forEach(item => {
        const itemHTML = `
            <div class="menu-item">
                <img src="${item.img}" alt="${item.name}" class="food-img">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-desc">${item.desc}</p>
                    <div class="price-row">
                        <span class="price">₹${item.price}</span>
                        <button class="add-btn" onclick="addToCart(${item.id}); event.stopPropagation();">Add Item +</button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.innerHTML += itemHTML;
    });
}

// ==========================================
// 3. CART CORE MANAGEMENT
// ==========================================
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartTotals();
}

function changeQuantity(id, change) {
    const targetItem = cart.find(item => item.id === id);
    if (!targetItem) return;

    targetItem.quantity += change;
    if (targetItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");
    if (countEl) countEl.innerText = `${totalItems} Gold Plates Selected`;
    if (totalEl) totalEl.innerText = `Grand Total: ₹${subtotal}`;

    const modalSubtotal = document.getElementById("modal-subtotal-price");
    if (modalSubtotal) modalSubtotal.innerText = `₹${subtotal}`;

    const finalTotal = Math.max(0, subtotal - appliedDiscount);
    
    const regGrandTotal = document.getElementById("modal-registration-grand-total");
    if (regGrandTotal) regGrandTotal.innerText = `₹${finalTotal}`;

    const finalPayable = document.getElementById("modal-final-payable-total");
    if (finalPayable) finalPayable.innerText = `₹${finalTotal}`;

    renderCartModalItems();
}

function renderCartModalItems() {
    const container = document.getElementById("cart-items-container-modal");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; padding:20px;">Your basket is empty.</p>`;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <div>
                <h4 style="color:#fff; margin:0; font-size:14px;">👑 ${item.name}</h4>
                <p style="color:var(--gold); margin:4px 0 0 0; font-size:12px;">₹${item.price} x ${item.quantity}</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button onclick="changeQuantity(${item.id}, -1)" style="background:#111; color:#fff; border:1px solid #333; width:26px; height:26px; cursor:pointer; border-radius:4px;">-</button>
                <span style="color:#fff; font-weight:bold;">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" style="background:#111; color:#fff; border:1px solid #333; width:26px; height:26px; cursor:pointer; border-radius:4px;">+</button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 4. STEP CONTROL & PAYMENT GENERATION
// ==========================================
function openCartModal() {
    const modal = document.getElementById("cart-modal");
    if (modal) {
        modal.style.setProperty("display", "block", "important");
        modal.style.visibility = "visible";
modal.style.opacity = "1";
modal.style.pointerEvents = "auto";
        modal.style.setProperty("pointer-events", "auto", "important");
    }
    
    const floatingCart = document.getElementById("cart-view");
    if (floatingCart) {
        floatingCart.style.setProperty("display", "none", "important");
    }
    
    const s1 = document.getElementById("step-1-cart-view");
    const s2 = document.getElementById("step-2-registration-view");
    const s3 = document.getElementById("step-3-payment-view");

    if (s1) s1.style.display = "block";
    if (s2) s2.style.display = "block"; 
    if (s3) s3.style.display = "none";

    setTimeout(() => {
        const fields = ["cust-name", "cust-email", "cust-phone", "cooking-instructions", "coupon-code"];
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.setProperty("pointer-events", "auto", "important");
                el.style.setProperty("cursor", "text", "important");
                el.disabled = false;
            }
        });
    }, 100);

    renderCartModalItems();
}
function closeCartModal() {
    const thankYouModal = document.getElementById("thank-you-modal");

if(thankYouModal){
    thankYouModal.style.display = "flex";
}

    const modal = document.getElementById("cart-modal");
    const paymentView = document.getElementById("step-3-payment-view");

    if(modal){
        modal.style.display = "none";
    }

    if(paymentView){
        paymentView.classList.remove("active");
    }
}

    const floatingCart = document.getElementById("cart-view");

    if (floatingCart) {
        floatingCart.style.display = "flex";
        floatingCart.style.visibility = "visible";
        floatingCart.style.pointerEvents = "auto";
        floatingCart.style.zIndex = "99999";
    }



// ==========================================
// COUPON VALIDATION ENGINE
// ==========================================
function applyRoyalCoupon() {
    const codeInput = document.getElementById("coupon-code");
    const msgEl = document.getElementById("coupon-message");
    
    if (!codeInput) {
        alert("HTML fix kijiye: 'coupon-code' id missing hai!");
        return;
    }

    const code = codeInput.value.trim().toUpperCase();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (code === "ROYAL10") {
        appliedDiscount = Math.round(subtotal * 0.10);
        if (msgEl) {
            msgEl.style.color = "#218c74";
            msgEl.style.display = "block";
            msgEl.innerText = `✨ Success! Royal 10% discount (₹${appliedDiscount}) applied.`;
        } else {
            alert(`✨ Success! Royal 10% discount (₹${appliedDiscount}) applied.`);
        }
    } else {
        appliedDiscount = 0;
        if (msgEl) {
            msgEl.style.color = "#ff4d4d";
            msgEl.style.display = "block";
            msgEl.innerText = "❌ Invalid Coupon Code!";
        } else {
            alert("❌ Invalid Coupon Code!");
        }
    }
    updateCartTotals();
}

// ==========================================
// PROCEED TO DETAILS / PAYMENT SWITCH ENGINE
// ==========================================
// Step 2 par jaane ke liye

    if (thankYouModal) {
        thankYouModal.style.display = "none";
    }
    resetCurrentOrder(); // Order reset karke basket khali karne ke liye
function goToStep2Registration() {
    if (cart.length === 0) {
        alert("Please add some delicacies before ordering!");
        return;
    }
    
    const nameVal = document.getElementById("cust-name") ? document.getElementById("cust-name").value.trim() : "";
    const phoneVal = document.getElementById("cust-phone") ? document.getElementById("cust-phone").value.trim() : "";

    if (!nameVal || !phoneVal) {
        alert("Please enter your Full Name and Phone Number in the ledger fields below!");
        return;
    }
}

    // Direct redirection trigger to step 3 layout
    


function goToStep3Payment() {
    const name = document.getElementById("cust-name")?.value.trim();
    const phone = document.getElementById("cust-phone")?.value.trim();

    if (!name || !phone) {
        alert("Please enter your Full Name and Phone Number in the fields below to proceed!");
        return;
    }

    document.getElementById("step-1-cart-view").style.display = "none";
    document.getElementById("step-2-registration-view").style.display = "none";
    document.getElementById("step-3-payment-view").style.display="block";
    
    // Safety check for blocking bar
    const floatingCart = document.getElementById("cart-view");
    if (floatingCart) {
        floatingCart.style.setProperty("display", "none", "important");
    }
    
    if (document.getElementById("modal-dynamic-title")) {
        document.getElementById("modal-dynamic-title").innerText = "Secure UPI Payment Gateway";
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = Math.max(0, subtotal - appliedDiscount);

    const restaurantUPI = "6305450796@ybl"; 
    const upiString = `upi://pay?pa=${restaurantUPI}&pn=Maa%20Restaurant&am=${finalTotal}&cu=INR`;
    const qrChartURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`;
    
    const qrImg = document.getElementById("upi-qr-display");
    if (qrImg) qrImg.src = qrChartURL;
}


function backToStep1Cart() {
    document.getElementById("step-1-cart-view").style.display = "block";
    document.getElementById("step-2-registration-view").style.display = "block";
    document.getElementById("step-3-payment-view").style.display="none";
    document.getElementById("modal-dynamic-title").innerText = "Your Selected Delicacies";
    
    const floatingCart = document.getElementById("cart-view");
    if (floatingCart) floatingCart.style.setProperty("display", "none", "important");
}

function backToStep2Registration() {
    backToStep1Cart();
}

function resetCurrentOrder() {
    if (confirm("Are you sure you want to clear your royal basket?")) {
        cart = [];
        appliedDiscount = 0;
        updateCartTotals();
        closeCartModal();
    }
}

// ==========================================
// 5. DISPATCH & REDIRECT FINAL SYSTEMS
// ==========================================
function placeFinalOrderWithPayment(event) {
    if(event) event.stopPropagation(); // Click blockage safeguard

    const name = document.getElementById("cust-name")?.value.trim() || "Guest";
    const phone = document.getElementById("cust-phone")?.value.trim() || "0000000000";
    const instructions = document.getElementById("cooking-instructions")?.value.trim() || "None";
    const tableNum = document.getElementById("table-number")?.innerText || "06";

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = Math.max(0, subtotal - appliedDiscount);
    const restaurantWhatsapp = "916305450796"; 

    let itemsText = cart.map(item => `• ${item.name} x ${item.quantity} -> ₹${item.price * item.quantity}`).join('\n');

    const messageText = `👑 *NEW ROYAL ORDER RECEIVED* 👑\n\n` +
                        `📍 *Table Number:* ${tableNum}\n` +
                        `👤 *Guest Name:* ${name}\n` +
                        `📞 *Phone:* ${phone}\n\n` +
                        `📋 *Items Details:*\n${itemsText}\n\n` +
                        `🎯 *Subtotal:* ₹${subtotal}\n` +
                        `🎫 *Discount Applied:* ₹${appliedDiscount}\n` +
                        `💰 *Final Paid Amount:* ₹${finalTotal}\n\n` +
                        `👨‍🍳 *Special Instructions:* ${instructions}\n\n` +
                        `✅ *Payment Status:* Counter Verified / Pending Kitchen\n\n` +
                        `✨ _Maa Ki Rasoi mein khana taiyar karein!_`;

    globalWhatsAppURL = `https://api.whatsapp.com/send?phone=${restaurantWhatsapp}&text=${encodeURIComponent(messageText)}`;

    // 🌟 STEP 1: Pehle payment modal window ko close karo
    
   
    // Cart modal close

    // Close cart modal
closeCartModal();

// Create popup dynamically
const popup = document.createElement("div");

popup.innerHTML = `
    <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.85);
        z-index:999999;
        display:flex;
        justify-content:center;
        align-items:center;
    ">

        <div style="
            background:#111;
            padding:40px;
            border-radius:20px;
            border:2px solid gold;
            text-align:center;
            color:white;
            width:320px;
            box-shadow:0 0 30px rgba(255,215,0,0.4);
        ">

            <h1 style="color:gold;">
                🎉 Order Successful
            </h1>

            <p style="margin-top:15px;">
                Thank You For Ordering From Maa Restaurant 🍽️
            </p>

            <p style="color:#ccc; margin-top:10px;">
                Your order is being prepared...
            </p>

        </div>

    </div>
`;

document.body.appendChild(popup);

// Open WhatsApp after 5 sec
setTimeout(() => {

    redirectToWhatsApp();

    popup.remove();

}, 5000);
}

function redirectToWhatsApp() {
    if(globalWhatsAppURL && globalWhatsAppURL !==""){
        window.open(globalWhatsAppURL, "_blank");
    } else{
        alert("whatsApp order link not generated!");
    }
}
