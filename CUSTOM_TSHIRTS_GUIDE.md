# How to Add Your Own T-Shirt Images

This guide explains how to add your own custom t-shirt designs to the online store.

## Step 1: Prepare Your Images

1. Make sure your t-shirt images are in a web-friendly format (JPG, PNG, GIF, or WEBP)
2. Resize your images to approximately 800x800 pixels for best display
3. Save your images with descriptive names (e.g., `custom-design-1.jpg`, `logo-tshirt.png`)

## Step 2: Upload Your Images

Place your t-shirt images in the `images/` folder in your project directory. 
If you're hosting your website online, upload the images to your server in the `images/` folder.

## Step 3: Add Your Products to the Store

Edit the `script.js` file to add your custom t-shirts to the products array:

1. Find the `const products = [` section (near the top of the file)
2. Add a new product object to the array following this format:

```javascript
{
    id: 7,  // Use a unique number for each product
    name: "Your Custom T-Shirt Name",
    price: 29.99,  // Set your desired price
    image: "images/your-image-filename.jpg"  // Path to your image
}
```

Make sure each product has a unique ID number.

## Example

Here's a complete example of adding a custom t-shirt:

```javascript
const products = [
    // ... existing products ...
    
    // Your custom t-shirt
    {
        id: 7,
        name: "Retro Vintage Logo",
        price: 24.99,
        image: "images/retro-logo.jpg"
    }
];
```

## Step 4: Test Your Changes

1. Save the `script.js` file
2. Open `index.html` in your web browser
3. Refresh the page to see your new t-shirt in the store

## Tips

- You can mix external images (from URLs) with local images in the same store
- To remove a product, simply delete its object from the products array
- To change the order of products, rearrange the objects in the array
- Make sure the image filenames match exactly (including capitalization)