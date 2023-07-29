# Using the Application

This section is a quick guide of how to use the application.

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
