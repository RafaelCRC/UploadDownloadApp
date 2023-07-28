# UploadDownloadApp Documentation

The UploadDownloadApp is an application that allows users to upload and download .gz files securely. This documentation will guide you through the installation, setup, and usage of the application.

## Table of Contents

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
