import { Firestore } from "@google-cloud/firestore";
import crypto from 'crypto';

const firestore = new Firestore({
    projectId: "trial-project-406012",
    keyFilename: 'D:\\project\\book-apis-cloud\\samples\\keyfile.json'
});

const id = crypto.randomBytes(14).toString('hex')

const quickStart = async () => {
    const document = firestore.doc(`/books/${id}`);
    await document.set({
        alamat: 'Banyuwangi',
        title: 'waduh',
        body: 'hayolo',
    });
}

quickStart();
