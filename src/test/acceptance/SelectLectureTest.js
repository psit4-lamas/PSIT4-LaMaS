/* requires setup of account dummy1@students.zhaw.ch in firebase */
/* istanbul ignore next */
module.exports = {
    // TODO: set application address using a global placeholder
    'Step Login with valid credentials' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('input[name=email]',10000)
            .setValue('input[type=text]', 'dummy1@students.zhaw.ch')
            .setValue('input[name=password]', 'dummy1')
            .click('button[type=submit]')
            .waitForElementVisible('#top-menu-logout',10000);
    },

    'Click on Lecture' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('div[id="top-menu"]',10000)
            .pause(10000)
            .useXpath()     // every selector now must be XPath
            .click("//a[text()='PSIT3']")
            .verify.elementPresent("//main/form/div/div/div/div/a[text()='PSIT3']")
            .end();
    },

};