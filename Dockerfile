# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Compile TypeScript code
RUN npm run build

# Step 6: Expose the port on which the app will run
EXPOSE 3000

# Step 7: Define the command to run the app
CMD ["node", "dist/app.js"]
