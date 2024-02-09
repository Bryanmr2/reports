# Use the Node.js 16 image from Docker Hub as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# The application's default port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
