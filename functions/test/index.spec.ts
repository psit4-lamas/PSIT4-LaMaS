//import { expect } from 'chai';
import 'mocha';
const test = require('firebase-functions-test')();
//const admin = require('firebase-admin');
//const sinon = require('sinon');

describe('addSubject', () => {
    let func: any;

    beforeEach(() => {
        // [START stubAdminInit]
        // If index.js calls admin.initializeApp at the top of the file,
        // we need to stub it out before requiring index.js. This is because the
        // functions will be executed as a part of the require process.
        // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
        //adminInitStub = sinon.stub(admin, 'initializeApp');
        // Now we can require index.js and save the exports inside a namespace called myFunctions.
        func = require('../src/index');
        // [END stubAdminInit]
    });

    it('should add a subject', () => {
        test.wrap(func.addSubject({ subjectName: 'abc', assignedTutor: ['tutor_1', 'tutor_2'] }, { auth: true }));
        //const result = hello();
        //expect(result).to.equal('Hello world!');
    });
});
