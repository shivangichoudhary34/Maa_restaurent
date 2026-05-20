
// Database containing perfectly-matched luxury Indian cuisine images
const menuItems = [
    // --- STARTERS ---
    { 
        id: 1, 
        name: "Maa Ki Special Kachori", 
        category: "Starters", 
        price: 90, 
        desc: "Golden-crisp artisanal kachoris stuffed with fine spiced lentils, accompanied by heirloom sour potato gravy.", 
        img : "kachori.jpg"// Perfect Kachori/Samosa street starter image
    },
    // --- VEG STARTERS & MAIN COURSE ---
{ 
    id: 8, 
    name: " Malai Chaap", 
    category: "Main Course", 
    price: 260, 
    desc: "Soya chaap marinated in rich fresh cream, cashew paste, and secret spices, grilled in a traditional clay oven.", 
    img : "tandoori Malai chaap.jpg" 
},

// --- NON-VEG DISHES ---
{ 
    id: 9, 
    name: "Royal Murgh Makhani (Butter Chicken)", 
    category: "Non-Veg", 
    price: 450, 
    desc: "Tender tandoori chicken pieces simmered in a rich, velvety tomato, butter, and fenugreek gravy.", 
    img: "murgh makhani.jpg" // Perfect Authentic Butter Chicken
},
{ 
    id: 10, 
    name: " Mutton Rogan Josh", 
    category: "Non-Veg", 
    price: 520, 
    desc: "Slow-cooked Kashmiri mutton delicacy infused with whole spices and a vibrant red chili glaze.", 
    img: "mutton rogan josh.jpg" // Premium Indian Mutton Curry
},

// --- SWEETS (DESSERTS) ---
{ id: 11, 
    name: "Gulab Jamun", 
    category: "Sweets", 
    price: 90, 
    desc: "Thick, churned yogurt drink served in a royal style, loaded with crushed almonds and fragrant saffron.", 
    img: "gulab jamun.jpg"
},
{
    id: 12, 
    name: " Malai Kulfi", 
    category: "Sweets", 
    price: 120, 
    desc: "Traditional Indian ice cream dense with reduced milk, rich saffron, pistachio nuts, and rose water.", 
    img: "malai kulfi.jpg" 
},

// --- DRINKS & BEVERAGES ---
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
        name: " coke", 
        category: "Drinks", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "coke.jpg" // Beautiful classic traditional Indian dessert bowl
    },
{ 
    id: 15, 
    name: "lemon Juice", 
    category: "Drinks", 
    price: 110, 
    desc: "A refreshing blend of fresh mint leaves, zesty lime juice, sugar, and sparkling soda over crushed ice.", 
    img: "lemon juice.jpg" // High-End Mocktail/Mojito
},
    { 
        id: 2, 
        name: "Crispy Paneer Pakoda", 
        category: "Starters", 
        price: 120, 
        desc: "Rich slabs of organic cottage cheese enveloped inside fresh herb paste and crunchy golden gram batter.", 
        img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80" // High quality paneer/appetizer cubes
    },
    
    // --- MAIN COURSE ---
    { 
        id: 3, 
        name: "Maa Ki Daal (Dal Makhani)", 
        category: "Main Course", 
        price: 320, 
        desc: "Velvety black lentils slow-cooked overnight over embers, enriched with hand-churned dairy white butter and cream.", 
        img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80" // Authentic slow cooked creamy rich dal makhani bowl
    },
    { 
        id: 4, 
        name: "Shahi Paneer Laziz", 
        category: "Main Course", 
        price: 380, 
        desc: "Delicate cubes of fresh paneer poached in a royal silken gravy crafted from vine tomatoes and toasted cashews.", 
        img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" // Authentic rich Shahi Paneer curry look
    },
    { 
        id: 5, 
        name: "Premium Tawa Roti (4 Pcs)", 
        category: "Main Course", 
        price: 60, 
        desc: "Pillowy flatbreads made from organic stone-ground wheat, puffed directly over fire and glossed with pure cow ghee.", 
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" // Warm Indian flatbreads/rotis layout
    },
    
    // --- DESSERTS ---
    { 
        id: 6, 
        name: " Saffron Kheer", 
        category: "Desserts", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "saffon kheer.jpg" // Beautiful classic traditional Indian dessert bowl
    },
    { 
        id: 7, 
        name: "kaddu ki Kheer", 
        category: "Desserts", 
        price: 150, 
        desc: "Aromatic basmati rice simmered in condensed cardamom milk, jeweled with real Kashmiri saffron lines and almond slivers.", 
        img: "kaddu ki kheer.jpg" // Beautiful classic traditional Indian dessert bowl
    },
];

const categories = ["All", "Starters", "Main Course", "Non-Veg","Desserts","Sweets","Drinks"];
let cart = [];

// Initialize Menu Render
function displayMenu(filterCategory = "All") {
    const menuContainer = document.getElementById("menu-items-container");
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

// Generate Categorized Row Filter Menu
function displayCategories() {
    const catContainer = document.getElementById("category-container");
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

// Push to Cart System
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    cart.push(product);
    
    document.getElementById("cart-count").innerText = `${cart.length} Gold Plates Selected`;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").innerText = `Grand Total: ₹${total}`;
}

// Yeh function URL se table number nikalega
function getTableNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNum = urlParams.get('table'); // URL mein '?table=X' dhoondega
    
    if (tableNum) {
        // Agar URL mein table number mila, toh HTML mein update kar do
        document.getElementById("table-number").innerText = tableNum;
    } else {
        // Agar normal website khuli bina QR ke, toh default "Walk-in" dikhao
        document.getElementById("table-number").innerText = "Online / Takeaway";
    }
}

// Apne puraane window.onload ko isse replace kar do
window.onload = () => {
    displayCategories();
    displayMenu();
    getTableNumberFromURL(); // Website khulte hi table number check karega
};
// Function: Cart Popup ko kholne ke liye aur items list dikhane ke liye
function openCartModal() {
    const modal = document.getElementById("cart-modal");
    const cartItemsList = document.getElementById("cart-items-list");
    const modalGrandTotal = document.getElementById("modal-grand-total");
    
    // Pehle list ko khali karo
    cartItemsList.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p style="text-align:center; color:#666; font-size:14px;">Your luxury basket is empty.</p>`;
        modalGrandTotal.innerText = "₹0";
    } else {
        // Cart ke items ko loop karke popup mein render karo
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-list-item">
                    <span class="cart-item-name">👑 ${item.name}</span>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
            `;
            cartItemsList.innerHTML += itemHTML;
        });
        
        // Total calculate karke dikhao
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        modalGrandTotal.innerText = `₹${total}`;
    }
    
    // Modal ko display karo class add karke
    modal.classList.add("open");
}

// Function: Cart Popup ko band karne ke liye
function closeCartModal() {
    document.getElementById("cart-modal").classList.remove("open");
}

// Function: Final Order karne par kya hoga
function placeFinalOrder() {
    const tableNum = document.getElementById("table-number").innerText;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if(cart.length === 0) {
        alert("Please add some delicacies before ordering!");
        return;
    }
    
    // Real-world representation action
    alert(`✨ Royal Order Placed! ✨\n\nTable: ${tableNum}\nTotal Amount: ₹${total}\n\nYour order has been directly sent to the Maa Kitchen! 👨‍🍳`);
    
    // Order hone ke baad cart khali kar do
    cart = [];
    document.getElementById("cart-count").innerText = "0 Gold Plates Selected";
    document.getElementById("cart-total").innerText = "Grand Total: ₹0";
    closeCartModal();
}
// Step A: Pehle customer ko payment ka QR dikhao
function showPaymentAndOrder() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if(cart.length === 0) {
        alert("Please add some delicacies before ordering!");
        return;
    }

    // --- APNI REAL UPI ID YAHAN DAALEIN ---
    // Jaise aapki shop ya personal UPI id (e.g., maarestaurant@oksbi ya bhim id)
    const restaurantUPI = "yourupiid@okaxis"; 
    const restaurantName = "Maa Restaurant";

    // Standard Digital India UPI String Format
    const upiString = `upi://pay?pa=${restaurantUPI}&pn=${encodeURIComponent(restaurantName)}&am=${total}&cu=INR`;
    
    // Google API use karke instant UPI QR code image link banana
    const qrChartURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`;
    
    // UI par QR code image load karwana
    document.getElementById("upi-qr-display").src = qrChartURL;
    document.getElementById("payment-section").style.display = "block";

    // Main button ka naam aur kaam badal kar final order place karne ka kar dena
    const orderBtn = document.getElementById("main-order-btn");
    orderBtn.innerText = "Paid & Send Order to Kitchen 🍽️";
    orderBtn.style.background = "#218c74"; // Change to safe green
    orderBtn.setAttribute("onclick", "placeFinalOrderWithPayment()");
}

// Global variable to hold URL safely
let globalWhatsAppURL = "";

function placeFinalOrderWithPayment() {
    const tableNum = document.getElementById("table-number").innerText;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if(cart.length === 0) {
        alert("Please add some delicacies before ordering!");
        return;
    }

    const restaurantWhatsapp = "919876543210"; // <--- Put your real number here

    let messageText = `*👑 NEW ORDER - MAA RESTAURANT 👑*\n`;
    messageText += `----------------------------------\n`;
    messageText += `📍 *Table Number:* ${tableNum}\n`;
    messageText += `🕒 *Time:* ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}\n`;
    messageText += `----------------------------------\n`;
    messageText += `📋 *Items Ordered:*\n`;
    
    cart.forEach((item, index) => {
        messageText += `${index + 1}. ${item.name} (x1) - ₹${item.price}\n`;
    });
    
    messageText += `----------------------------------\n`;
    messageText += `💰 *Grand Total:* ₹${total}\n`;
    messageText += `✅ *Payment Status:* Done via UPI\n`;
    messageText += `----------------------------------\n`;
    messageText += `_Maa Ki Rasoi mein khana taiyar karein!_`;

    // Save URL to global variable
    globalWhatsAppURL = `https://api.whatsapp.com/send?phone=${restaurantWhatsapp}&text=${encodeURIComponent(messageText)}`;

    // STEP 1: Pehle Cart band karo aur Direct Thank You Page open karo
    closeCartModal(); 
    document.getElementById("thank-you-modal").classList.add("open"); 
    
    // Background Reset
    cart = [];
    document.getElementById("cart-count").innerText = "0 Gold Plates Selected";
    document.getElementById("cart-total").innerText = "Grand Total: ₹0";
    document.getElementById("payment-section").style.display = "none";
    
    const orderBtn = document.getElementById("main-order-btn");
    orderBtn.innerText = "Proceed to Payment 💳";
    orderBtn.style.background = "var(--gold)";
    orderBtn.setAttribute("onclick", "showPaymentAndOrder()");
}

// Function: Jab user green button dabaye, tab WhatsApp par bhejo
function redirectToWhatsApp() {
    if(globalWhatsAppURL !== "") {
        window.open(globalWhatsAppURL, '_blank');
    }
}

// Function: Thank you modal band karne aur back to menu ke liye
function closeThankYouModal() {
    document.getElementById("thank-you-modal").classList.remove("open");
}
    