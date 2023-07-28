#!/bin/bash

echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing project dependencies..."
npm install

echo "Building the database..."
npm run dbRebuild

echo "Starting the application..."
npm start