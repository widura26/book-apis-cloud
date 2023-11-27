import { Storage } from '@google-cloud/storage';


const authenticateImplicitWithAdc = async () => {
    const storage = new Storage({
        projectId: 'trial-project-406012'
    });

    const [buckets] = await storage.getBuckets();
    console.log('Buckets: ');

    for ( const bucket of buckets ){
        console.log(`- ${bucket.name}`);
    }

    console.log('Listed all storage buckets');
}

authenticateImplicitWithAdc();