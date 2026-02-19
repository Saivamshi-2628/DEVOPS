# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Expose both possible ports
EXPOSE 3000
EXPOSE 8080

# Default environment mode
ENV ENV_MODE=development

# Start the app
CMD ["node", "server.js"]