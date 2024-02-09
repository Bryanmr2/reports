# Use Node.js 16 as the base image to build the React application
FROM node:16 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the codebase into the container
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:stable-alpine AS production-stage

# Copy the build folder from the previous stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
