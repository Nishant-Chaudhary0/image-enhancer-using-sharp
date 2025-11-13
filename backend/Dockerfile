# Use official Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose your backend port (must match your Express app)
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
