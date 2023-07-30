const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const sqlite = require('../src/sqlite/sqlite');

describe('Download Controller Tests', () => {
    const pass = "a1e5hs48";
    const fileSample = {
        filenameWithNoPass: 'test-file01.gz',
        filenameWithPass: 'test-file02.gz' 
    };

    const testFileNoPassPath = path.join(__dirname, 'test-files', fileSample.filenameWithNoPass);
    const testFileNoPass = fs.readFileSync(testFileNoPassPath);   

    const testFileWithPassPath = path.join(__dirname, 'test-files', fileSample.filenameWithPass);
    const testFileWithPass = fs.readFileSync(testFileWithPassPath);   

    let link;

    beforeAll(async () => {
        try {
            const response = await request(app)
            .post('/upload')
            .attach("file", testFileNoPass, fileSample.filenameWithNoPass);

            link = response.body.link;

            await request(app)
                .post('/upload')
                .set('Authorization', `Bearer ${pass}`)
                .attach("file", testFileWithPass, fileSample.filenameWithPass);
            } catch (error) {
                console.error('Error in before all: ', error);
            }
    });

    afterAll(async () => {
        const uploadFolderPath = path.join(__dirname, '../uploads');

        const uploadedFiles = fs.readdirSync(uploadFolderPath);
        uploadedFiles.forEach((file) => {
          if (file === fileSample.filenameWithNoPass || file === fileSample.filenameWithPass) {
            fs.unlinkSync(path.join(uploadFolderPath, file));
          }
        });
    });
    
    afterEach(async () => {
        const fileNamesToDelete = [fileSample.filenameWithNoPass, fileSample.filenameWithPass];
        try {
            await sqlite.execute('DELETE FROM files WHERE fileName IN (?);', [fileNamesToDelete]);
        } catch (error) {
            console.log('No files to delete');
        }
    });

    test('Should download a file without authentication', async () => {
        const response = await request(app).get(`/download/${fileSample.filenameWithNoPass}`);
        
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/octet-stream');
        expect(response.header['content-disposition']).toBe(`attachment; filename="${fileSample.filenameWithNoPass}"`);

        const originalFileContent = fs.readFileSync(testFileNoPassPath);
        expect(response.body.equals(originalFileContent)).toBe(true);
    });

    test('Should try to download a file with valid authentication', async () => {
        const response = await request(app)
            .get(`/download/${fileSample.filenameWithPass}`)
            .set('Authorization', `Bearer ${pass}`);

        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/octet-stream');
        expect(response.header['content-disposition']).toBe(`attachment; filename="${fileSample.filenameWithPass}"`);
    });

    test('Should try to download a file without valid authentication', async () => {
        const response = await request(app)
            .get(`/download/${fileSample.filenameWithPass}`)
            .set('Authorization', `Bearer wrong`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid password');
    });

    test('Should return 404 for non-existing file', async () => {
        const nonExistingFile = 'non-existing-file.gz';

        const response = await request(app).get(`/download/${nonExistingFile}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'File not found');
    });

    test('Should try to download a file with a valid link', async () => {
        const linkhash = await sqlite.execute('SELECT fileLinkHash FROM files WHERE fileName = ?;',[fileSample.filenameWithNoPass]);

        const response = await request(app)
            .get(`/download/link/${linkhash[0].fileLinkHash}`);

        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/octet-stream');
        expect(response.header['content-disposition']).toBe(`attachment; filename="${fileSample.filenameWithNoPass}"`);
    });

    test('Should try to download a file without a valid link', async () => {
        const response = await request(app).get('/download/link/wronghash72adgsag73');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Invalid download link');
    });
});