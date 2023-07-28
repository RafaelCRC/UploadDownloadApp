@echo off

echo Building Docker image...
docker build -t rafaelcrc/upload-download-app:v1.0 .

echo Running Docker container...
docker run -p 3000:3000 -e SECRET=your_secret_key -e URL_API=http://localhost:3000/ rafaelcrc/upload-download-app:v1.0