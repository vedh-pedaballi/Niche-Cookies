// Cart page specific functionality
// Use the same cart variable as the main script
let cart = [];

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart page loaded');
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('mokshaCart');
    console.log('Saved cart from localStorage:', savedCart);
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('Parsed cart:', cart);
        } catch (error) {
            console.error('Error parsing cart:', error);
            cart = [];
        }
    } else {
        console.log('No saved cart found');
        cart = [];
    }
    
    console.log('Final cart:', cart);
    displayCart();
    updateCartCount();
});

// Display cart items
function displayCart() {
    console.log('Displaying cart with', cart.length, 'items');
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartContent = document.querySelector('.cart-content');
    
    if (cart.length === 0) {
        // Show empty cart message
        console.log('Cart is empty, showing empty message');
        emptyCartDiv.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    // Show cart content
    console.log('Cart has items, showing cart content');
    emptyCartDiv.style.display = 'none';
    cartContent.style.display = 'flex';
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Add each cart item
    cart.forEach((item, index) => {
        console.log('Adding item to cart display:', item);
        const cartItem = createCartItemElement(item, index);
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update totals
    updateCartTotals();
}

// Create cart item element
function createCartItemElement(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    const price = parseFloat(item.price.replace('$', ''));
    const total = price * item.quantity;
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${getCookieImage(item.id)}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="cart-item-price">${item.price} each</p>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <div class="cart-item-total">
            <span>$${total.toFixed(2)}</span>
        </div>
        <div class="cart-item-remove">
            <button class="remove-btn" onclick="removeFromCart(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    return cartItem;
}

// Get cookie image based on ID
function getCookieImage(cookieId) {
    const cookieData = {
        // Classics
        'classic-chocolate-chip': 'https://via.placeholder.com/100x100/8B4513/FFFFFF?text=Chocolate+Chip',
        'oatmeal-raisin': 'https://via.placeholder.com/100x100/D2691E/FFFFFF?text=Oatmeal+Raisin',
        'sugar-cookie': 'https://via.placeholder.com/100x100/F5DEB3/000000?text=Sugar+Cookie',
        'peanut-butter': 'https://via.placeholder.com/100x100/CD853F/FFFFFF?text=Peanut+Butter',
        'snickerdoodle': 'https://via.placeholder.com/100x100/DEB887/000000?text=Snickerdoodle',
        'white-chocolate-macadamia': 'https://via.placeholder.com/100x100/F5F5DC/000000?text=White+Chocolate+Macadamia',
        
        // Outlandish
        'bacon-maple': 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=Bacon+Maple',
        'lavender-lemon': 'https://via.placeholder.com/100x100/E6E6FA/000000?text=Lavender+Lemon',
        'sriracha-chocolate': 'https://via.placeholder.com/100x100/DC143C/FFFFFF?text=Sriracha+Chocolate',
        'blue-cheese-walnut': 'https://via.placeholder.com/100x100/4682B4/FFFFFF?text=Blue+Cheese+Walnut',
        'wasabi-ginger': 'https://via.placeholder.com/100x100/90EE90/000000?text=Wasabi+Ginger',
        'truffle-sea-salt': 'https://via.placeholder.com/100x100/2F4F4F/FFFFFF?text=Truffle+Sea+Salt'
    };
    
    return cookieData[cookieId] || 'https://via.placeholder.com/100x100/CCCCCC/666666?text=Cookie';
}

// Update quantity for cart item
function updateQuantity(index, delta) {
    const newQuantity = cart[index].quantity + delta;
    
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    if (newQuantity > 20) {
        showNotification('Maximum quantity is 20 per item');
        return;
    }
    
    cart[index].quantity = newQuantity;
    saveCart();
    displayCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
    showNotification(`${removedItem.name} removed from cart`);
}

// Update cart totals
function updateCartTotals() {
    let subtotal = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        subtotal += price * item.quantity;
    });
    
    const tax = subtotal * 0.085; // 8.5% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        displayCart();
        updateCartCount();
        showNotification('Cart cleared successfully');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // For now, just show a success message
    // In a real application, this would redirect to a payment processor
    const total = document.getElementById('total').textContent;
    alert(`Thank you for your order! Total: ${total}\n\nThis is a demo. In a real application, you would be redirected to complete your purchase.`);
    
    // Clear cart after successful checkout
    cart = [];
    saveCart();
    displayCart();
    updateCartCount();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('mokshaCart');
    console.log('Saved cart from localStorage:', savedCart);
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('Parsed cart:', cart);
    } else {
        console.log('No saved cart found in localStorage');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('mokshaCart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    console.log('Cart count updated:', totalItems);
}

// Test function to add sample items to cart (for debugging)
function addTestItems() {
    cart = [
        {
            id: 'classic-chocolate-chip',
            name: 'Classic Chocolate Chip',
            price: '$2.50',
            quantity: 2
        },
        {
            id: 'bacon-maple',
            name: 'Bacon Maple Delight',
            price: '$4.50',
            quantity: 1
        }
    ];
    saveCart();
    displayCart();
    updateCartCount();
    console.log('Test items added to cart');
}

// Debug function to check cart status
function debugCart() {
    console.log('=== CART DEBUG ===');
    console.log('Cart array:', cart);
    console.log('Cart length:', cart.length);
    console.log('localStorage mokshaCart:', localStorage.getItem('mokshaCart'));
    
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartContent = document.querySelector('.cart-content');
    
    console.log('cartItemsContainer:', cartItemsContainer);
    console.log('emptyCartDiv:', emptyCartDiv);
    console.log('cartContent:', cartContent);
    
    if (cartItemsContainer) {
        console.log('cartItemsContainer.innerHTML:', cartItemsContainer.innerHTML);
    }
    
    alert(`Cart Debug Info:\nCart items: ${cart.length}\nlocalStorage: ${localStorage.getItem('mokshaCart') || 'empty'}`);
} 