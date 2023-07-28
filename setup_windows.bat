@echo off

echo Installing Node.js...
curl -fsSL https://nodejs.org/dist/v16.7.0/node-v16.7.0-x64.msi -o node.msi
msiexec /i node.msi /qn
del node.msi

echo Installing project dependencies...
call npm install

echo Building the database...
call npm run dbBuild

echo Starting the application...
call npm start