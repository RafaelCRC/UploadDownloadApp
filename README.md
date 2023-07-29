# UploadDownloadApp Documentation

The UploadDownloadApp is an application that allows users to upload and download .gz files securely. This documentation will guide you through the installation, setup, and usage of the application.

The Docker image for the application is publicly available on Docker Hub at the following link: [rafaelcrc/upload-download-app](https://hub.docker.com/repository/docker/rafaelcrc/upload-download-app/general).

1. [Running Locally](documentation/local)

## Table of Contents
### Running Locally
- [Setup on Unix](#setup-on-unix)
   - [Running Setup Script on Unix](#running-setup-script-on-unix)
- [Setup on Windows](#setup-on-windows)
   - [Running Setup Script on Windows](#running-setup-script-on-windows)

#

- [Manual Installation](#manual-installation)
   - [Prerequisites](#prerequisites)
   - [Getting the Code](#getting-the-code)
   - [Installing Dependencies](#installing-dependencies)
- [Database Setup](#database-setup)
   - [Building the Database](#rebuilding-the-database)
   - [Rebuilding the Database](#rebuilding-the-database)
   - [WIP Populating the Database (Optional)](#wip-populating-the-database-optional)
- [Running the Application](#running-the-application)

#

- [Using the Application](#using-the-application)
   - [Uploading Files](#uploading-files)
   - [Downloading Files](#downloading-files)
   - [Ambient Variables](#ambient-variables)
- [Stopping the Application](#stopping-the-application)

#

- [Running Tests](#running-tests)

#

### Running on Docker

- [Using the Scripts](#using-the-scripts)
- [Manual Steps to Build and Run the Application on Docker](#manual-steps-to-build-and-run-the-application-on-docker)

# Running Locally

You can get the UploadDownloadApp code by cloning the GitHub repository using the following command:

```bash
git clone https://github.com/RafaelCRC/UploadDownloadApp.git
```

## Setup on Unix

### Running Setup Script on Unix

1. Open a terminal window.
2. Navigate to the directory where you cloned the UploadDownloadApp repository.
3. Run the setup script using the following command:

```bash
sh setup_unix.sh
```

The script will perform the following tasks:

- Install Node.js (if not already installed)
- Install project dependencies using npm
- Build the database with necessary tables
- Start application

## Setup on Windows

### Running Setup Script on Windows

1. Open a Command Prompt or PowerShell window.
2. Navigate to the directory where you cloned the UploadDownloadApp repository.
3. Run the setup script using the following command:

```bash
setup_windows.bat
```

The script will perform the following tasks:

- Install Node.js (if not already installed)
- Install project dependencies using npm
- Build the database with necessary tables
- Start application

#

# Manual Installation

## Prerequisites

Before installing the UploadDownloadApp, make sure you have the following prerequisites installed on your system:

1. Node.js
2. npm
3. SQLite3

## Getting the Code

You can get the UploadDownloadApp code by cloning the GitHub repository using the following command:

```bash
git clone https://github.com/RafaelCRC/UploadDownloadApp.git
```

## Installing Dependencies

After cloning the repository, navigate to the project directory and install the required dependencies using npm:

```bash
cd UploadDownloadApp
npm install
```

## Database Setup

The UploadDownloadApp uses SQLite as its database. Before running the application, you need to set up the database and create the necessary tables.

### Building the Database

To build or update the database and create the required tables, run the following command:

```bash
npm run dbBuild
```

### Rebuilding the Database

BEWARE: this command completely wipes any data already inserted in database, use with caution.

To rebuild the database and create the required tables, run the following command:

```bash
npm run dbBuild
```

### WIP Populating the Database (Optional)

Currently this feature is no fully implemented

## Running the Application

To start the UploadDownloadApp, run the following command:

```bash
npm start
```

The application will start, and you will see a message indicating that the server is running.

#

# Using the Application

## Uploading Files

To upload a .gz file, you can use any API client (e.g., Postman, or a custom front-end application). Send a POST request to the /upload endpoint with the file attached as a form field named file. If the file requires a password for download, you can provide the password in the request's Authorization header Bearer.

Each upload will generate a link only to the uploader (e.g., http://localhost:3000/download/link/$2b$05$lkayPIwP7vgCyio4iKYTTepGmo6jogk2QZCmc7xpXladqoG1svh3u)

If a file with the same name already exists, that file will be replaced with a warning.

## Downloading Files

To download a file, send a GET request to the /download endpoint with the filename in the URL. If the file requires a password for download, provide the password in the request's Authorization header Bearer.

If the file requires a password and you provide an incorrect password, the server will return a 401 Unauthorized response.

You can also download files if you have access to the link generated on upload.

## Ambient Variables

Keep in mind that the application uses 2 ambient variables in nodemon.json file for development purposes, that being:

1. SECRET => a keyword uses for hashing links.
2. URL_API => The basic API url used, for development purposes the localhost is sufficient. 

# Stopping the Application

To stop the UploadDownloadApp, press Ctrl + C in the terminal or command prompt where the server is running.

# Running Tests

To run the test suite and check the application's test coverage, use the following command:

```bash
npm test
```

The tests will be executed, and the test coverage report will be displayed in the terminal.

# Running on Docker

## Using the Scripts

1. Ensure that you have Docker installed on your system.
2. Download or clone the repository.
3. Before running the script, make sure to modify the script's environment variables as needed. Open the script file in a text editor and update the following values:
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
   
