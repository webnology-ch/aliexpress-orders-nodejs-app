# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "src/app.js"]
