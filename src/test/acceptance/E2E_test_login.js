
module.exports = {

    // login using valid credentials
    'Step Login' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            .waitForElementVisible('input[name=email]')
            .setValue('input[type=text]', 'dummy1@students.zhaw.ch')
            .setValue('input[name=password]', 'dummy1')
            .click('button[type=submit]')
            .pause(3000)
            // assume Login was correct if topMenu is visible
            .assert.visible('#top-menu')
            .end();
    },




};

