import { Storage, TransferManager } from '@google-cloud/storage'
//bucketname
const bucketName = 'book-apis-cloud'

const file = './example.pdf'
//Google Service account key
const storage = new Storage({
    keyFilename: './storage.json'
});

const transfer = new TransferManager(storage.bucket(bucketName))

uploadFileInChunksWithTransferManager = async () => {
    await transfer.uploadFileInChunks(file, {
        chunkSizeBytes: 32 * 1024 * 1024
    });
    console.log(`${file} uploaded to ${bucketName}`);
}

uploadFileInChunksWithTransferManager().catch(console.error)



