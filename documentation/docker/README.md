# Running With Docker

This section will teach you how to create a image and setting up a container with the application.

The Docker image for the application is publicly available on Docker Hub at the following link: [rafaelcrc/upload-download-app](https://hub.docker.com/repository/docker/rafaelcrc/upload-download-app/general).

#

- [Prerequisite](#prerequisite)
- [Using the Scripts](#using-the-scripts)
- [Manual Steps to Build and Run the Application on Docker](#manual-steps-to-build-and-run-the-application-on-docker)

#

# Prerequisite

First things first you need to download the repository.

You can get the UploadDownloadApp code by cloning the GitHub repository using the following command:

```bash
git clone https://github.com/RafaelCRC/UploadDownloadApp.git
```

For this section you will need to have docker installed in your machine 

[Get Docker](https://docs.docker.com/get-docker/)

## Using the Scripts

1. Ensure that you have Docker installed on your system.
2. Download or clone the repository.
3. Before running the script, if you want, you can modify the script's environment variables as needed. Open the script file in a text editor and update the following values:
   - SECRET: Replace with your desired secret key (used for hashing links).
   - URL_API: Replace with the base URL for your API.
4. Run the appropriate script using the following commands:
   - For Unix-based systems:
     ```bash
      ./docker-build-run.sh
      ```
   - For Windows:
     ```bash
      docker-build-run.bat
      ```

The script will build the Docker image and run the application container. The application will be accessible at http://localhost:3000/.
   
## Manual Steps to Build and Run the Application on Docker:

1. Ensure that you have Docker installed on your system.
2. Download or clone the repository.
3. Open a terminal or command prompt.
4. Navigate to the root directory of your Upload and Download Application project.
5. Build the Docker image using the following command (including the dot):
   ```bash
   docker build -t rafaelcrc/upload-download-app:v1.0 .
   ```
6. Run the Docker container using the following command:
   ```bash
   docker run -p 3000:3000 -e SECRET=your_secret_key -e URL_API=http://localhost:3000/ rafaelcrc/upload-download-app:v1.0
   ```
   
   Replace your_secret_key with your desired secret key.

7. The application will be accessible at http://localhost:3000/.
