# Moksha Cookies Website

A beautiful, responsive website for your cookie-making business with 4 pages: Home, Classics, Outlandish, and About Us.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Cookie Panels**: Click any cookie to view detailed information
- **Shopping Cart**: Add cookies to cart with quantity selection
- **Modal Details**: Beautiful popup windows for cookie information
- **Easy Customization**: Clearly marked CSS sections for easy styling changes

## File Structure

```
MokshaCookies/
├── index.html          # Homepage
├── classics.html       # Classic cookies page
├── outlandish.html     # Outlandish cookies page
├── about.html          # About us page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Pages Overview

### 1. Homepage (index.html)
- Hero section with call-to-action buttons
- Featured cookies showcase
- Navigation to other pages

### 2. Classics Page (classics.html)
- Grid layout with 6 classic cookie varieties
- Each panel shows image, price, and name
- Click to view detailed information and add to cart

### 3. Outlandish Page (outlandish.html)
- Same layout as classics but with unique cookie varieties
- Bold and adventurous flavor combinations
- Interactive panels with detailed descriptions

### 4. About Us Page (about.html)
- Empty panel ready for your business description
- Values section highlighting your business principles
- Placeholder content that you can easily replace

## Customization Guide

### CSS Customization

The `styles.css` file is organized with clear sections for easy customization:

#### Classics Page Aesthetics
```css
/* ========================================
   CLASSICS PAGE SPECIFIC STYLES
   ======================================== */
/* CUSTOMIZE CLASSICS PAGE AESTHETICS HERE */
```

#### Outlandish Page Aesthetics
```css
/* ========================================
   OUTLANDISH PAGE SPECIFIC STYLES
   ======================================== */
/* CUSTOMIZE OUTLANDISH PAGE AESTHETICS HERE */
```

### Color Scheme
Current color scheme uses warm browns and earth tones:
- Primary Brown: `#8B4513`
- Secondary Brown: `#A0522D`
- Accent Red: `#ff6b6b`
- Background: `#f8f9fa`

### Adding Your Content

#### 1. About Us Description
Edit the `about.html` file and replace the placeholder text in the `.description-placeholder` section with your actual business description.

#### 2. Cookie Images
Replace the placeholder images with your actual cookie photos:
- Update image URLs in the HTML files
- Recommended size: 300x250px for panels, 400x300px for modal details

#### 3. Cookie Information
Edit the `script.js` file to update cookie names, prices, and descriptions in the `cookieData` object.

## How to Use

1. **Open the website**: Open `index.html` in your web browser
2. **Navigate pages**: Use the navigation menu at the top
3. **View cookies**: Click on any cookie panel to see details
4. **Add to cart**: Select quantity and click "Add to Cart"
5. **Cart icon**: Click the cart icon in the top right to see cart status

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

The website is designed to be easily expandable. You can add:
- A dedicated cart/checkout page
- Contact form
- Order tracking
- Customer reviews
- Blog section
- Social media integration

## Technical Notes

- Uses vanilla HTML, CSS, and JavaScript (no frameworks)
- Responsive design with CSS Grid and Flexbox
- Local storage for cart persistence
- Font Awesome icons for visual elements
- Placeholder images from placeholder.com (replace with your photos)

## Getting Started

1. Download all files to your computer
2. Open `index.html` in a web browser
3. Customize the content and styling as needed
4. Replace placeholder images with your cookie photos
5. Update the About Us section with your business information

## Support

For customization help or questions, refer to the clearly marked sections in the CSS file. Each major component has its own section with comments explaining its purpose. 