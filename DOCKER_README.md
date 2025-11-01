# Docker Instructions for AliExpress Order List App

## Build the Docker Image

1. Open a terminal in your project directory.
2. Run:
   ```bash
   docker build -t aliexpress-orders-app .
   ```

## Run the App with a Mounted CSV

1. Make sure your `generated.csv` is **not** inside the app source directory (it should not be copied into the image).
2. Run the container, mounting your local CSV file:
   ```bash
   docker run -p 3000:3000 -v /path/to/generated.csv:/app/generated.csv aliexpress-orders-app
   ```
   Replace `/path/to/generated.csv` with the full path to your CSV file.

3. Open [http://localhost:3000/orders](http://localhost:3000/orders) in your browser to view your orders.

## Notes
- Any changes to your CSV file on the host will be reflected in the app after a container restart.
- You can stop the container with `Ctrl+C` or `docker stop <container_id>`.
