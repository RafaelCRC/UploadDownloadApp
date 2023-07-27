#!/bin/bash

# Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install project dependencies
npm install

# Build the database
npm run dbRebuild

# Start the application
npm start