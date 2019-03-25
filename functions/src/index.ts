'use strict';

import {ObjectMetadata} from 'firebase-functions/lib/providers/storage';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const storage = admin.storage();

/**
 * When a file is uploaded in the Storage bucket the information and metadata of that file is saved in the Firestore Database.
 */

exports.metadata = functions.storage.object().onFinalize(async (object: ObjectMetadata) => {
    const filePath = object.name;

    const bucket = storage.bucket(object.bucket);

    const [metadataFromFile] = await bucket.file(filePath).getMetadata();
    let metadata = {
        lecture: metadataFromFile.metadata.lecture,
        name: metadataFromFile.metadata.originalName,
        nameOnStorage: metadataFromFile.name,
        subject: metadataFromFile.metadata.subject,
        type: metadataFromFile.metadata.type,
    };
    console.log(metadata);
    await admin
        .firestore()
        .collection('files')
        .add(metadata);
});
