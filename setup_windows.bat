@echo off

REM Download and install Node.js LTS
curl -fsSL https://nodejs.org/dist/v16.7.0/node-v16.7.0-x64.msi -o node.msi
msiexec /i node.msi /qn
del node.msi

REM Install project dependencies
npm install

REM Build the database
npm run dbRebuild

REM Start the application
npm start