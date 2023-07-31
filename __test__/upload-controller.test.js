const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const db = require('../src/database/mysql');

const testFilePath = path.join(__dirname, 'test-files', 'test-file.gz');

describe('Upload Controller Tests', () => {
    const fileSample = {
        fieldname: 'file',
        mimetye: 'application/gzip',
        destination: './uploads/',
        filename: 'test-file.gz',
        path: './uploads/test-file.gz',
        size: 1024 * 1024 * 5, // 5 MB
    }
    
    afterAll(async () => {
        const uploadFolderPath = path.join(__dirname, '../uploads');

        const uploadedFiles = fs.readdirSync(uploadFolderPath);
        uploadedFiles.forEach((file) => {
          if (file === 'test-file.gz') {
            fs.unlinkSync(path.join(uploadFolderPath, file));
          }
        });
    });
    
    afterEach(async () => {
        try {
            await db.execute('DELETE FROM files WHERE fileName = ?;', [fileSample.filename]);
        } catch (error) {
            console.log('No files to delete');
        }
    });

    test('Should upload a new file and get a success response', async () => {
        const testFile = fs.readFileSync(testFilePath);
        const response = await request(app)
            .post('/upload')
            .attach(fileSample.fieldname, testFile, 'test-file.gz');
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'File uploaded successfully');
        expect(response.body).toHaveProperty('link');
        expect(response.body.fileUploaded).toEqual(
            expect.objectContaining({
                fileName: 'test-file.gz',
                requirePassword: false,
                replaced: false,
            })
        );
    });

    test('Should replace an existing file and get a success response', async () => {
        const insertQuery = 'INSERT INTO files (fileName, filePath, fileLinkHash, filePassword) VALUES (?,?,?,?);';
                db.execute(insertQuery, [
                fileSample.filename,
                fileSample.path,
                'some-link-hash',
                null,
            ]);

        const testFile = fs.readFileSync(testFilePath);
        const response = await request(app)
            .post('/upload')
            .attach(fileSample.fieldname, testFile, 'test-file.gz');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Warning: The file with the same name has been replaced.');
        expect(response.body).toHaveProperty('link');
        expect(response.body.fileUploaded).toEqual(
            expect.objectContaining({
                fileName: 'test-file.gz',
                requirePassword: false,
                replaced: true,
            })
        );
    });

    test('Should upload a new file with password and get a success response', async () => {
        const testFile = fs.readFileSync(testFilePath);
        const response = await request(app)
            .post('/upload')
            .set('Authorization', `Bearer any-pass`)
            .attach(fileSample.fieldname, testFile, 'test-file.gz');
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'File uploaded successfully');
        expect(response.body).toHaveProperty('link');
        expect(response.body.fileUploaded).toEqual(
            expect.objectContaining({
                fileName: 'test-file.gz',
                requirePassword: true,
                replaced: false,
            })
        );
    });
});
