const request = require('../request');

describe('Uploading works', function () {
    it('Can upload a file', async function () {
        await request.post('/upload')
            .attach('file', './test/functional/file.txt')
            .expect(302);
    });

    it('Validation error when file is not specified.', async function () {
        await request.post('/upload')
            .expect(400);
    })
});