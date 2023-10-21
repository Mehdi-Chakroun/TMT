# Use an official Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your backend application code to the container
COPY . .

# Expose the port your backend will listen on (replace 3000 with your app's port)
EXPOSE 4000

# Start your Node.js application
CMD ["npm", "start"]
