'use strict';

import {ObjectMetadata} from 'firebase-functions/lib/providers/storage';
import {CallableContext} from 'firebase-functions/lib/providers/https';

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

//example for data:
//  {subjectName: subjectName, assignedTutor: ["tutor_1","tutor_2"]}
exports.addSubject = functions.https.onCall((data: any, context: CallableContext) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
    }

    if (
        typeof data === 'undefined' ||
        typeof data.subjectName === 'undefined' ||
        typeof data.assignedTutor === 'undefined' ||
        !Array.isArray(data.assignedTutor) ||
        data.assignedTutor.length === 0
    ) {
        throw new functions.https.HttpsError('failed-precondition', 'Please provide a subjectName and a assignedTutor array with at least length 1.');
    }
    const grades = {};
    const videos = {};
    const lecture_materials = {};
    const exercises = {};
    const comments = {};

    const lectures = {};
    for (let i = 1; i <= 14; i++) {
        let lectureName = 'lecture_' + ('0' + i).slice(-2);
        Object.assign(lectures, {
            [lectureName]: {
                is_public: false,
                name: 'this is lecture ' + i,
                videos,
                lecture_materials,
                exercises,
                comments,
            },
        });
    }

    const savable = {
        subject_name: data.subjectName,
        assigned_tutor: data.assignedTutor,
        lectures,
        grades,
        subject_rates: [],
    };

    return admin
        .firestore()
        .collection('subjects')
        .add(savable)
        .then((docRef: any) => {
            return {subjectId: docRef.id};
        })
        .catch((error: any) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
});
