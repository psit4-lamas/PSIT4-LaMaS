'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp();
var storage = admin.storage();
/**
 * When a file is uploaded in the Storage bucket the information and metadata of that file is saved in the Firestore Database.
 */
var nodeNameForType = function (type) {
    if (type === 'V') {
        return 'videos';
    }
    else if (type === 'E') {
        return 'exercises';
    }
    else if (type === 'L') {
        return 'lecture_materials';
    }
    else {
        return 'lecture_materials';
    }
};
exports.metadata = functions.storage.object().onFinalize(function (object) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, filePath, bucket, metadataFromFile, dbSubject, subjectRef, lectureName, attachmentSection, lectures, attachmentNumber, attachmentName, published, newAttachment, existingAttachments, updatePath, attachments;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filePath = object.name;
                bucket = storage.bucket(object.bucket);
                return [4 /*yield*/, bucket.file(filePath).getMetadata()];
            case 1:
                metadataFromFile = (_c.sent())[0];
                dbSubject = {};
                return [4 /*yield*/, admin
                    .firestore()
                    .collection('subjects')
                    .doc(metadataFromFile.metadata.subjectId)];
            case 2:
                subjectRef = _c.sent();
                return [4 /*yield*/, subjectRef.get().then(function (doc) {
                    dbSubject = doc.data();
                })];
            case 3:
                _c.sent();
                lectureName = 'lecture_' + ('0' + metadataFromFile.metadata.lecture).slice(-2);
                attachmentSection = nodeNameForType(metadataFromFile.metadata.type);
                lectures = dbSubject['lectures'];
                attachmentNumber = Object.keys(lectures[lectureName][attachmentSection]).length;
                attachmentName = attachmentSection + '_' + ('0' + attachmentNumber).slice(-2);
                published = !(metadataFromFile.metadata.type === 'E');
                newAttachment = (_a = {},
                    _a[attachmentName] = {
                        name: metadataFromFile.metadata.originalName,
                        nameOnStorage: metadataFromFile.name,
                        is_public: published
                    },
                    _a);
                existingAttachments = dbSubject.lectures[lectureName][attachmentSection];
                updatePath = 'lectures.' + lectureName + '.' + attachmentSection;
                attachments = Object.assign(existingAttachments, newAttachment);
                return [4 /*yield*/, subjectRef.update((_b = {},
                    _b[updatePath] = attachments,
                    _b))];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
//example for data:
//  {subjectName: subjectName, assignedTutor: ["tutor_1","tutor_2"]}
exports.addSubject = functions.https.onCall(function (data, context) {
    var _a;
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
    }
    if (typeof data === 'undefined' ||
        typeof data.subject_name === 'undefined' ||
        typeof data.assigned_tutors === 'undefined' ||
        !Array.isArray(data.assigned_tutors) ||
        data.assigned_tutors.length === 0) {
        throw new functions.https.HttpsError('failed-precondition', 'Please provide a subjectName and a assignedTutor array with at least length 1.');
    }
    var grades = {};
    var videos = {};
    var lecture_materials = {};
    var exercises = {};
    var comments = {};
    var lectures = {};
    for (var i = 1; i <= 14; i++) {
        var lectureName = 'lecture_' + ('0' + i).slice(-2);
        Object.assign(lectures, (_a = {},
            _a[lectureName] = {
                is_public: false,
                name: 'this is lecture ' + i,
                videos: videos,
                lecture_materials: lecture_materials,
                exercises: exercises,
                comments: comments
            },
            _a));
    }
    var savable = {
        subject_name: data.subject_name,
        assigned_tutors: data.assigned_tutors,
        lectures: lectures,
        grades: grades,
        subject_rates: {}
    };
    return admin
        .firestore()
        .collection('subjects')
        .add(savable)
        .then(function (docRef) {
            return { subjectId: docRef.id };
        })["catch"](function (error) {
        // Re-throwing the error as an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});
