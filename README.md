# AliExpress Order List App

This app displays your AliExpress orders (with images and details) from a CSV export in a web interface.

## How to Use

1. **Export your orders from AliExpress:**
    - Install the browser extension "Aliexpress CSV Export" (Chrome Web Store).
    - Use it to download your orders as a CSV file (e.g., `generated.csv`).

2. **Place the CSV file:**
    - Move your exported CSV file (`generated.csv`) into the main project directory (where `package.json` is located).

3. **Install Node.js modules:**
    - Open a terminal in the project directory.
    - Run:
      ```bash
      npm install
      ```


4. **Start the app:**
     - Run:
         ```bash
         node src/app.js
         ```
     - Or, for automatic restarts on code changes (requires nodemon):
         ```bash
         npm run dev
         ```
     - Open [http://localhost:3000/orders](http://localhost:3000/orders) in your browser.


## Search Functionality

The app supports advanced fuzzy search for product names, store names, attributes, and product links. The search is typo-tolerant and works in both the order list and image gallery views.

- **Search fields:** Enter your query in the search box at the top of the orders or images view.
- **Fuzzy matching:** The app uses [Fuse.js](https://fusejs.io/) to allow for partial matches and spelling mistakes.
- **Fields searched:** Product name, store name, item attributes, and product link.

### Fine-tuning Search Sensitivity

You can adjust the search sensitivity by changing the `threshold` value in the Fuse.js configuration. Lower values make the search stricter (fewer results, more exact matches), higher values make it more permissive (more results, more typos allowed).

**Location:**

- `src/controllers/ordersController.js` (see the `threshold` property in the Fuse.js options)

Example:

```js
const fuse = new Fuse(orders, {
    keys: ['name', 'Item attributes', 'Item product link', 'storeName'],
    threshold: 0.2, // <-- Adjust this value (0.0 = exact, 1.0 = very fuzzy)
    ignoreLocation: true,
    minMatchCharLength: 2
});
```

**Recommended values:**
- `0.2` (default): Good balance for typo-tolerance and relevance
- Lower for stricter search, higher for more permissive

## Notes
- The app parses your CSV and displays each order with its image, name, date, price, and links to details.
- If you update your CSV, restart the app to see new orders.

