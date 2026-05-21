
// ==========================================
// 1. ROYAL MENU DATABASE & STATE MANAGEMENT
// ==========================================
const menuItems = [
    { 
        id: 1, 
        name: "Maa Ki Special Kachori", 
        category: "Starters", 
        price: 90, 
        desc: "Golden-crisp artisanal kachoris stuffed with fine spiced lentils, accompanied by heirloom sour potato gravy.", 
        img : "kachori.jpg"
    },
    { 
        id: 2, 
        name: "Crispy Paneer Pakoda", 
        category: "Starters", 
        price: 120, 
        desc: "Rich slabs of organic cottage cheese enveloped inside fresh herb paste and crunchy golden gram batter.", 
        img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80" 
    },
    { 
        id: 8, 
        name: "Malai Chaap", 
        category: "Main Course", 
        price: 260, 
        desc: "Soya chaap marinated in rich fresh cream, cashew paste, and secret spices, grilled in a traditional clay oven.", 
        img : "tandoori Malai chaap.jpg" 
    },
    { 
        id: 3, 
        name: "Maa Ki Daal (Dal Makhani)", 
        category: "Main Course", 
        price: 320, 
        desc: "Velvety black lentils slow-cooked overnight over embers, enriched with hand-churned dairy white butter and cream.", 
        img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80" 
    },
    { 
        id: 4, 
        name: "Shahi Paneer Laziz", 
        category: "Main Course", 
        price: 380, 
        desc: "Delicate cubes of fresh paneer poached in a royal silken gravy crafted from vine tomatoes and toasted cashews.", 
        img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" 
    },
    { 
        id: 5, 
        name: "Premium Tawa Roti (4 Pcs)", 
        category: "Main Course", 
        price: 60, 
        desc: "Pillowy flatbreads made from organic stone-ground wheat, puffed directly over fire and glossed with pure cow ghee.", 
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" 
    },
    { 
        id: 9, 
        name: "Royal Murgh Makhani (Butter Chicken)", 
        category: "Non-Veg", 
        price: 450, 
        desc: "Tender tandoori chicken pieces simmered in a rich, velvety tomato, butter, and fenugreek gravy.", 
        img: "murgh makhani.jpg" 
    },
    { 
        id: 10, 
        name: "Mutton Rogan Josh", 
        category: "Non-Veg", 
        price: 520, 
        desc: "Slow-cooked Kashmiri mutton delicacy infused with whole spices and a vibrant red chili glaze.", 
        img: "mutton rogan josh.jpg" 
    },
    { 
        id: 6, 
        name: "Saffron Kheer", 
        category: "Desserts", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "saffon kheer.jpg" 
    },
    { 
        id: 7, 
        name: "kaddu ki Kheer", 
        category: "Desserts", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "kaddu ki kheer.jpg" 
    },
    { 
        id: 11, 
        name: "Gulab Jamun", 
        category: "Sweets", 
        price: 90, 
        desc: "Thick, churned yogurt drink served in a royal style, loaded with crushed almonds and fragrant saffron.", 
        img: "gulab jamun.jpg"
    },
    {
        id: 12, 
        name: "Malai Kulfi", 
        category: "Sweets", 
        price: 120, 
        desc: "Traditional Indian ice cream dense with reduced milk, rich saffron, pistachio nuts, and rose water.", 
        img: "malai kulfi.jpg" 
    },
    { 
        id: 13, 
        name: "Shahi Kesar Badam Lassi", 
        category: "Drinks", 
        price: 90, 
        desc: "Thick, churned yogurt drink served in a royal style, loaded with crushed almonds and fragrant saffron.", 
        img: "kesar badam lassi.jpg" 
    },
    { 
        id: 14, 
        name: "coke", 
        category: "Drinks", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "coke.jpg" 
    },
    { 
        id: 15, 
        name: "lemon Juice", 
        category: "Drinks", 
        price: 110, 
        desc: "A refreshing blend of fresh mint leaves, zesty lime juice, sugar, and sparkling soda over crushed ice.", 
        img: "lemon juice.jpg" 
    }
];

const categories = ["All", "Starters", "Main Course", "Non-Veg", "Desserts", "Sweets", "Drinks"];
let cart = [];
let appliedDiscount = 0;
let globalWhatsAppURL = "";

// Web Page Initialization Engine
window.onload = () => {
    displayCategories();
    displayMenu();
    getTableNumberFromURL();
    attachGlobalClickListeners(); // Sabse important fix taaki koi bhi button na ruke!
};

// Auto Fetch Table ID from current active Address Bar URL
function getTableNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNum = urlParams.get('table'); 
    const tableBadge = document.getElementById("table-number");
    
    if (tableBadge) {
        tableBadge.innerText = tableNum ? tableNum.padStart(2, '0') : "06";
    }
}

// Global click safety backup catchers
function attachGlobalClickListeners() {
    document.addEventListener("click", function(e) {
        if (e.target && (e.target.classList.contains("view-cart-btn") || e.target.innerText.includes("Review Order"))) {
            openCartModal();
        }
    });
}

// ==========================================
// 2. CATEGORIES & MENU GRID RENDERING
// ==========================================
function displayCategories() {
    const catContainer = document.getElementById("category-container");
    if (!catContainer) return;
    catContainer.innerHTML = "";

    categories.forEach((cat, index) => {
        const btn = document.createElement("button");
        btn.classList.add("cat-btn");
        if(index === 0) btn.classList.add("active");
        btn.innerText = cat;
        
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            displayMenu(cat);
        });
        
        catContainer.appendChild(btn);
    });
}

function displayMenu(filterCategory = "All") {
    const menuContainer = document.getElementById("menu-items-container");
    if (!menuContainer) return;
    menuContainer.innerHTML = ""; 

    const filteredItems = filterCategory === "All" 
        ? menuItems 
        : menuItems.filter(item => item.category === filterCategory);

    filteredItems.forEach(item => {
        const itemHTML = `
            <div class="menu-item">
                <img src="${item.img}" alt="${item.name}" class="food-img">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-desc">${item.desc}</p>
                    <div class="price-row">
                        <span class="price">₹${item.price}</span>
                        <button class="add-btn" onclick="addToCart(${item.id})">Add Item +</button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.innerHTML += itemHTML;
    });
}

// ==========================================
// 3. BASKET ENGINE WITH PROPER STRUCTURING
// ==========================================
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateFloatingCartDisplay();
}

function changeQuantity(id, change) {
    const targetItem = cart.find(item => item.id === id);
    if (!targetItem) return;

    targetItem.quantity += change;
    if (targetItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    
    updateFloatingCartDisplay();
    renderCartModalItems();
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateFloatingCartDisplay() {
    const subtotal = calculateSubtotal();
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");

    if (countEl) countEl.innerText = `${totalItemsCount} Gold Plates Selected`;
    if (totalEl) totalEl.innerText = `Grand Total: ₹${subtotal}`;
}

// ==========================================
// 4. STEP CONTROL ENGINE (BY SHIVANGI) - COMPATIBLE
// ==========================================

// 🛒 STEP 1: REVIEW THE BASKET LIST
function openCartModal() {
    const modal = document.getElementById("cart-modal");
    if (!modal) {
        alert("Error: HTML mein 'cart-modal' ID nahi mili!");
        return;
    }

    // CSS blocks ko override karne ke liye direct priority injection
    modal.style.setProperty("display", "block", "important");
    
    // Steps visibility layers reset
    document.getElementById("step-1-cart-view").style.display = "block";
    document.getElementById("step-2-registration-view").style.display = "none";
    document.getElementById("step-3-payment-view").style.display = "none";
    
    document.getElementById("modal-dynamic-title").innerText = "Your Selected Delicacies";
    renderCartModalItems();
}

function closeCartModal() {
    const modal = document.getElementById("cart-modal");
    if (modal) {
        modal.style.setProperty("display", "none", "important");
    }
}

function renderCartModalItems() {
    const container = document.getElementById("cart-items-container-modal");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; padding:20px; font-size:14px;">Your luxury basket is empty.</p>`;
        document.getElementById("modal-subtotal-price").innerText = "₹0";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <div>
                <h4 style="color:#fff; margin:0; font-size:14px;">👑 ${item.name}</h4>
                <p style="color:var(--gold); margin:4px 0 0 0; font-size:12px;">₹${item.price} x ${item.quantity}</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button onclick="changeQuantity(${item.id}, -1)" style="background:#111; color:#fff; border:1px solid #333; width:26px; height:26px; cursor:pointer; border-radius:4px; font-weight:bold;">-</button>
                <span style="color:#fff; font-weight:bold; min-width:15px; text-align:center;">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" style="background:#111; color:#fff; border:1px solid #333; width:26px; height:26px; cursor:pointer; border-radius:4px; font-weight:bold;">+</button>
            </div>
        </div>
    `).join('');

    const subtotal = calculateSubtotal();
    document.getElementById("modal-subtotal-price").innerText = `₹${subtotal}`;
}

// 📝 STEP 2: DETAILS ENTRY PANELS
function goToStep2Registration() {
    if (cart.length === 0) {
        alert("Please add some delicacies before ordering!");
        return;
    }
    document.getElementById("step-1-cart-view").style.display = "none";
    document.getElementById("step-2-registration-view").style.display = "block";
    document.getElementById("step-3-payment-view").style.display = "none";
    
    document.getElementById("modal-dynamic-title").innerText = "Guest Ledger & Preferences";
    
    appliedDiscount = 0;
    const msg = document.getElementById("coupon-message");
    if(msg) msg.style.display = "none";
    
    updateStep2RegistrationGrandTotal();
}

function updateStep2RegistrationGrandTotal() {
    const subtotal = calculateSubtotal();
    const finalTotal = Math.max(0, subtotal - appliedDiscount);
    document.getElementById("modal-registration-grand-total").innerText = `₹${finalTotal}`;
}

function applyRoyalCoupon() {
    const codeInput = document.getElementById("coupon-code");
    const msgEl = document.getElementById("coupon-message");
    if (!codeInput || !msgEl) return;

    const code = codeInput.value.trim().toUpperCase();
    const subtotal = calculateSubtotal();

    if (code === "ROYAL10") {
        appliedDiscount = Math.round(subtotal * 0.10);
        msgEl.style.color = "#218c74";
        msgEl.style.display = "block";
        msgEl.innerText = `✨ Success! Royal 10% discount (₹${appliedDiscount}) applied successfully.`;
    } else {
        appliedDiscount = 0;
        msgEl.style.color = "#ff4d4d";
        msgEl.style.display = "block";
        msgEl.innerText = "❌ Invalid Coupon Code!";
    }
    updateStep2RegistrationGrandTotal();
}

// 💳 STEP 3: TRANSACTIONAL INTELLIGENCE
function goToStep3Payment() {
    const name = document.getElementById("cust-name").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();

    if (!name || !phone) {
        alert("Please enter your Full Name and Phone Number to proceed!");
        return;
    }

    document.getElementById("step-1-cart-view").style.display = "none";
    document.getElementById("step-2-registration-view").style.display = "none";
    document.getElementById("step-3-payment-view").style.display = "block";
    
    document.getElementById("modal-dynamic-title").innerText = "Secure UPI Payment Gateway";

    const subtotal = calculateSubtotal();
    const finalTotal = Math.max(0, subtotal - appliedDiscount);
    document.getElementById("modal-final-payable-total").innerText = `₹${finalTotal}`;

    // Official Vendor Configs
    const restaurantUPI = "6305450796@ybl"; 
    const restaurantName = "Maa Restaurant";

    const upiString = `upi://pay?pa=${restaurantUPI}&pn=${encodeURIComponent(restaurantName)}&am=${finalTotal}&cu=INR`;
    const qrChartURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`;
    
    document.getElementById("upi-qr-display").src = qrChartURL;
}

// STEP BACK LOGIC PIPELINES
function backToStep1Cart() {
    document.getElementById("step-1-cart-view").style.display = "block";
    document.getElementById("step-2-registration-view").style.display = "none";
    document.getElementById("modal-dynamic-title").innerText = "Your Selected Delicacies";
}

function backToStep2Registration() {
    document.getElementById("step-2-registration-view").style.display = "block";
    document.getElementById("step-3-payment-view").style.display = "none";
    document.getElementById("modal-dynamic-title").innerText = "Guest Ledger & Preferences";
}

function resetCurrentOrder() {
    if (confirm("Are you sure you want to clear your royal basket?")) {
        cart = [];
        appliedDiscount = 0;
        updateFloatingCartDisplay();
        closeCartModal();
    }
}

// ==========================================
// 5. SUCCESS POPUP & WHATSAPP ENGINE DISPATCH
// ==========================================
function placeFinalOrderWithPayment() {
    const name = document.getElementById("cust-name").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const instructions = document.getElementById("cooking-instructions").value.trim() || "None";
    const tableNum = document.getElementById("table-number").innerText;

    const subtotal = calculateSubtotal();
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
                        `✅ *Payment Status:* Success via PhonePe QR\n\n` +
                        `✨ _Maa Ki Rasoi mein khana taiyar karein!_`;

    globalWhatsAppURL = `https://api.whatsapp.com/send?phone=${restaurantWhatsapp}&text=${encodeURIComponent(messageText)}`;

    closeCartModal();
    document.getElementById("thank-you-modal").style.display = "block";
}

function redirectToWhatsApp() {
    if(globalWhatsAppURL !== "") {
        window.open(globalWhatsAppURL, '_blank');
    }
}

function closeThankYouModal() {
    document.getElementById("thank-you-modal").style.display = "none";
    cart = [];
    appliedDiscount = 0;
    updateFloatingCartDisplay();
}