# Use Node.js LTS
FROM node:22-slim

# Install system dependencies (required for node-llama-cpp)
RUN apt-get update && apt-get install -y \
    python3 \
    cmake \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy model and source code
COPY models/ ./models/
COPY . .

# Run the app
CMD ["node", "index.js"]