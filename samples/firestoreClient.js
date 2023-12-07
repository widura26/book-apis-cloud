import { Firestore } from "@google-cloud/firestore";
const firestore = new Firestore({
    projectId: "trial-project-406012",
    keyFilename: './keyfile.json'
});

export default firestore;
