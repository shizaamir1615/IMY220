# Backend Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 1337
EXPOSE 1337

# Command to run your app
CMD ["node", "start"] # Adjust if your entry point is different
