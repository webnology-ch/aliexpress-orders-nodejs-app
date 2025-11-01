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

## Notes
- The app parses your CSV and displays each order with its image, name, date, price, and links to details.
- If you update your CSV, restart the app to see new orders.

