## Setup your own Firebase and React project
If you want to try/have your own firebase and react project:
1. Check out this tutorial and stop right before doing `firebase init`: https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf
2. Run the following commands on a command line (ensure to be inside your react project folder):
     - `firebase login`
     - in browser, go to: console.firebase.google.com
     - create your firebase account and copy the _project ID_
     - back on command line: `firebase init --project <project ID>`
     - select: all except _database_
     - enter: _firebase.rules_
     - enter: _firestore.indexes.json_
     - select: _TypeScript_
     - select: _y_ (to use TSLinst)
     - select: _y_ (to install npm dependencies)
     - type: _build_ (define where to find your public directory)
     - select: _y_ (it is a single-page app)
     - enter: _storage.rules_
3. open IntelliJ, double press `shift`, type `functions/src/index.ts`, press `enter`
4. decomment each line of the `index.ts` content
5. in browser, go to: console.firebase.google.com
     - enable Firestore (Database tab), selecting `test mode`
     - enable Storage
     - enable Functions
6. Run the following commands on a command line to (ensure to be inside your react project folder):
     - `firebase deploy`
     - `firebase login:ci`
7. ... ?

## Setup your own Firebase into LaMaS project(for dev)
If you want to contribute on LaMaS project, but having/using your own firebase server (for testing):
1. clone repo: https://github.com/psit4-lamas/PSIT4-LaMaS
2. in command line, go to the folder where you saved LaMaS repo
OR open IntelliJ, open Terminal (at the bottom of the IDE, if you don't see it, click on _View > Tool Buttons_)
3. Ensure to have `node` (version: v10.15.2), `npm` (version: 6.4.1) installed
4. run (on command line or IntelliJ Terminal): `npm i` (= npm install)
5. in IntelliJ, double press `shift`, type `./package.json`
6. click the **play** button next to _start_ to start the client app: you should be redirected to your browser
to http://localhost:3000, where you can find the React app UI;
when you edit something in the code and save it, your React UI will automatically refresh, and renders the new changes

7. Run the following commands on a command line (ensure to be inside your react project folder):
  - `firebase login`
  - in browser, go to: console.firebase.google.com, then DO WHAT FOLLOWS IF YOU HAVEN'T DONE IT YET
  - create your firebase account
  - enable Firestore (Database tab), selecting `test mode`
  - enable Storage
  - enable Functions

8. in browser, in your console.firebase.google.com go to:
  - click on the _gear icon_ (next to _Project Overview_) > _Project settings_
  - scroll down to _Your app_ section, click on _HTML icon_
  - only copy the **config** object content
  - in IntelliJ, double press `src/firebase/firebase-config.dev.js`
  - replace `config` object with your own firebase config object, so that you will use your own firebase server during development/testing
  - please do not commit your `firebase-config.dev.js` changes ... I'm not sure yet how to avoid this step...

## React - some first project code guide style (my personal wish (tduong992))
- when you want to create a new component to show on a page that includes certain behaviour in its own,
please create a new folder under `src/main/` (e.g. _Comment_), and a file _Comment.jsx_
(`.jsx` (instead of `.js`) makes your IDE environment understand that the file content must be a REACT JS code
and will guide you to properly code as React style) (see commit f015118)
- in this way we will have an encapsuled folder for each reusable component with its behaviour, CSS rules, ...
- [_add here additional code guidelines_ ...]
