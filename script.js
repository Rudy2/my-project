// Product data
const products = [
    {
        id: 1,
        name: "Neon Wave Tee",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Urban Explorer",
        price: 34.99,
        image: "images/urban-explorer.jpg"
    },
    {
        id: 3,
        name: "Minimalist Monochrome",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Retro Gaming",
        price: 32.99,
        image: "images/retro-gaming.jpg"
    },
    {
        id: 5,
        name: "Nature Lover",
        price: 27.99,
        image: "images/nature-lover.jpg"
    },
    {
        id: 6,
        name: "Abstract Art",
        price: 36.99,
        image: "images/abstract-art.jpg"
    },
    {
        id: 7,
        name: "half MoonCustom Design",
        price: 39.99,
        image: "images/images1.jpg"
    },
    {
        id: 8,
        name: "Fun Symbols Design",
        price: 39.99,
        image: "images/images2.jpg"
    },
    {
        id: 9,
        name: "Girl Power Design",
        price: 39.99,
        image: "images/image3.jpg"
    }
];

// Cart array
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.querySelector('.close-checkout');
const deliveryModal = document.getElementById('delivery-modal');
const closeDelivery = document.querySelector('.close-delivery');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    
    // Event listeners
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    
    // Hamburger menu for mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactForm);
    
    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    if (closeCheckout) {
        closeCheckout.addEventListener('click', closeCheckoutModal);
    }
    
    if (closeDelivery) {
        closeDelivery.addEventListener('click', closeDeliveryModal);
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeDeliveryModal);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (checkoutModal && e.target === checkoutModal) {
            closeCheckoutModal();
        }
        if (deliveryModal && e.target === deliveryModal) {
            closeDeliveryModal();
        }
    });
    
    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    if (checkoutModal) {
        checkoutModal.style.display = 'block';
    }
}

// Close checkout modal
function closeCheckoutModal() {
    if (checkoutModal) {
        checkoutModal.style.display = 'none';
    }
}

// Close delivery modal
function closeDeliveryModal() {
    if (deliveryModal) {
        deliveryModal.style.display = 'none';
    }
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip-code').value;
    const phone = document.getElementById('phone').value;
    
    // Basic validation
    if (!name || !email || !address || !city || !zip || !phone) {
        showNotification('Please fill in all fields!');
        return;
    }
    
    // Process the order (in a real app, you would send this to a server)
    processOrder(name, email, address, city, zip);
}

// Process the order and show delivery confirmation
function processOrder(name, email, address, city, zip) {
    // Close checkout modal
    closeCheckoutModal();
    
    // Display delivery confirmation
    const deliveryAddress = document.getElementById('delivery-address');
    if (deliveryAddress) {
        deliveryAddress.textContent = `${address}, ${city}, ${zip}`;
    }
    
    if (deliveryModal) {
        deliveryModal.style.display = 'block';
    }
    
    // Clear cart
    cart = [];
    updateCartCount();
    renderCartItems();
}


// Render products to the page
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <a href="#" class="view-details">View Details</a>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        renderCartItems();
        openCart();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count in navbar
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = total.toFixed(2);
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            renderCartItems();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('active');
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ff2a6d',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '30px',
        boxShadow: '0 4px 15px rgba(255, 42, 109, 0.3)',
        zIndex: '1000',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});