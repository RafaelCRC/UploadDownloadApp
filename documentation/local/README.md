# Running Locally

- [Prerequisite](#prerequisite)
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

# Prerequisite

First things first you need to download the repository.

You can get the UploadDownloadApp code by cloning the GitHub repository using the following command:

```bash
git clone https://github.com/RafaelCRC/UploadDownloadApp.git
```

If you are going to use the scripts to start the application, you wont need to install anything, every requirement will be installed automatically

If you are going to run the application manually, you are going to need the following prerequisites:

1. Node.js
2. npm

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
npm run dbRebuild
```

### WIP Populating the Database (Optional)

Currently this feature is no fully implemented

## Running the Application

To start the UploadDownloadApp, run the following command:

```bash
npm start
```

The application will start, and you will see a message indicating that the server is running.

