import { Storage, TransferManager } from '@google-cloud/storage'
//bucketname
const bucketName = 'book-apis-bucket'

const file = './example.pdf'
//Google Service account key
const storage = new Storage({
    keyFilename: './storage.json'
});

const uploadFile = async () => {
    try {
        await storage.bucket(bucketName).upload(file);
        console.log(`${file} uploaded to ${bucketName}`);
    } catch (error) {
        console.log(error);
    }
}

uploadFile()



