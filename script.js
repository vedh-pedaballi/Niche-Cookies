// Cookie data for both classics and outlandish pages
const cookieData = {
    // Classics
    'classic-chocolate-chip': {
        name: 'Classic Chocolate Chip',
        price: '$2.50',
        description: 'Our signature cookie featuring premium dark chocolate chips in a perfectly baked buttery dough. Each bite delivers the perfect balance of crispy edges and chewy center that chocolate chip cookie lovers crave.',
        image: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Chocolate+Chip'
    },
    'oatmeal-raisin': {
        name: 'Oatmeal Raisin',
        price: '$2.25',
        description: 'A wholesome classic made with rolled oats, plump raisins, and warm cinnamon. This cookie offers a satisfying texture and natural sweetness that makes it a perfect choice for any time of day.',
        image: 'https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Oatmeal+Raisin'
    },
    'sugar-cookie': {
        name: 'Vanilla Sugar Cookie',
        price: '$2.00',
        description: 'A simple yet elegant cookie with a delicate vanilla flavor and perfect sweetness. The smooth texture and classic taste make this cookie a timeless favorite for all ages.',
        image: 'https://via.placeholder.com/400x300/F5DEB3/000000?text=Sugar+Cookie'
    },
    'peanut-butter': {
        name: 'Peanut Butter Classic',
        price: '$2.75',
        description: 'Rich and creamy peanut butter cookie with a crisscross pattern on top. Made with premium peanut butter for an authentic, nutty flavor that peanut butter enthusiasts will love.',
        image: 'https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Peanut+Butter'
    },
    'snickerdoodle': {
        name: 'Cinnamon Snickerdoodle',
        price: '$2.25',
        description: 'A soft and chewy cookie rolled in cinnamon sugar, creating a delightful contrast of textures. The warm cinnamon flavor makes this cookie perfect for cozy moments.',
        image: 'https://via.placeholder.com/400x300/DEB887/000000?text=Snickerdoodle'
    },
    'white-chocolate-macadamia': {
        name: 'White Chocolate Macadamia',
        price: '$3.00',
        description: 'A luxurious combination of creamy white chocolate chips and buttery macadamia nuts. This premium cookie offers a sophisticated flavor profile that\'s both rich and indulgent.',
        image: 'https://via.placeholder.com/400x300/F5F5DC/000000?text=White+Chocolate+Macadamia'
    },
    
    // Outlandish
    'bacon-maple': {
        name: 'Bacon Maple Delight',
        price: '$4.50',
        description: 'A bold fusion of crispy bacon bits and sweet maple syrup in a buttery cookie base. This savory-sweet combination creates an unforgettable taste experience that\'s perfect for adventurous food lovers.',
        image: 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Bacon+Maple'
    },
    'lavender-lemon': {
        name: 'Lavender Lemon Zest',
        price: '$3.75',
        description: 'An elegant cookie featuring fragrant lavender and bright lemon zest. The floral and citrus notes create a sophisticated flavor profile that\'s both refreshing and calming.',
        image: 'https://via.placeholder.com/400x300/E6E6FA/000000?text=Lavender+Lemon'
    },
    'sriracha-chocolate': {
        name: 'Sriracha Chocolate Fire',
        price: '$3.50',
        description: 'A spicy twist on the classic chocolate cookie with a kick of sriracha heat. The combination of rich chocolate and fiery spice creates an exciting flavor adventure for those who love bold tastes.',
        image: 'https://via.placeholder.com/400x300/DC143C/FFFFFF?text=Sriracha+Chocolate'
    },
    'blue-cheese-walnut': {
        name: 'Blue Cheese Walnut',
        price: '$4.25',
        description: 'A sophisticated savory cookie featuring tangy blue cheese and crunchy walnuts. This unique combination offers a gourmet experience that pairs perfectly with wine or as an appetizer.',
        image: 'https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Blue+Cheese+Walnut'
    },
    'wasabi-ginger': {
        name: 'Wasabi Ginger Kick',
        price: '$3.75',
        description: 'An Asian-inspired cookie with the heat of wasabi and the warmth of ginger. This bold combination creates a unique flavor profile that\'s both spicy and aromatic.',
        image: 'https://via.placeholder.com/400x300/90EE90/000000?text=Wasabi+Ginger'
    },
    'truffle-sea-salt': {
        name: 'Truffle Sea Salt Luxury',
        price: '$5.00',
        description: 'Our most premium cookie featuring black truffle oil and flaky sea salt. This luxurious combination creates an indulgent experience that\'s perfect for special occasions and gourmet enthusiasts.',
        image: 'https://via.placeholder.com/400x300/2F4F4F/FFFFFF?text=Truffle+Sea+Salt'
    }
};

// Cart functionality
let cart = [];
let currentCookie = null;

// DOM elements
const modal = document.getElementById('cookieModal');
const closeBtn = document.querySelector('.close');
const cartCount = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to cookie panels
    const cookiePanels = document.querySelectorAll('.cookie-panel');
    cookiePanels.forEach(panel => {
        panel.addEventListener('click', function(e) {
            // Don't open modal if clicking on the Add to Cart button
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            const cookieId = this.getAttribute('data-cookie-id');
            openCookieModal(cookieId);
        });
    });

    // Modal close functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Load cart from localStorage
    loadCart();
    updateCartCount();
});

// Open cookie detail modal
function openCookieModal(cookieId) {
    const cookie = cookieData[cookieId];
    if (!cookie) return;

    currentCookie = {
        id: cookieId,
        ...cookie
    };

    // Update modal content
    document.getElementById('modalCookieImage').src = cookie.image;
    document.getElementById('modalCookieImage').alt = cookie.name;
    document.getElementById('modalCookieName').textContent = cookie.name;
    document.getElementById('modalCookieDescription').textContent = cookie.description;
    document.getElementById('modalCookiePrice').textContent = cookie.price;
    
    // Reset quantity
    document.getElementById('quantity').value = 1;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentCookie = null;
}

// Change quantity
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    let newQuantity = currentQuantity + delta;
    
    // Ensure quantity stays within bounds
    newQuantity = Math.max(1, Math.min(20, newQuantity));
    
    quantityInput.value = newQuantity;
}

// Add to cart
function addToCart() {
    if (!currentCookie) return;

    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === currentCookie.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentCookie.id,
            name: currentCookie.name,
            price: currentCookie.price,
            quantity: quantity
        });
    }

    // Save to localStorage
    saveCart();
    updateCartCount();
    
    // Show success message
    showNotification(`${quantity} ${currentCookie.name} added to cart!`);
    
    // Close modal
    closeModal();
}

// Add to cart directly from panel (without modal)
function addToCartDirect(cookieId) {
    const cookie = cookieData[cookieId];
    if (!cookie) return;

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === cookieId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cookieId,
            name: cookie.name,
            price: cookie.price,
            quantity: 1
        });
    }

    // Save to localStorage
    saveCart();
    updateCartCount();
    
    // Show success message
    showNotification(`${cookie.name} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('mokshaCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('mokshaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    // Create notification element
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
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Cart icon click handler - navigate to cart page
document.querySelector('.cart-icon').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Prevent quantity input from going out of bounds
document.addEventListener('input', function(event) {
    if (event.target.id === 'quantity') {
        let value = parseInt(event.target.value);
        if (value < 1) event.target.value = 1;
        if (value > 20) event.target.value = 20;
    }
}); 