
module.exports = {


    // TODO: set application address using a global placeholder
    // login using valid credentials
    'Step Login with valid credentials' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            .waitForElementVisible('input[name=email]')
            .setValue('input[type=text]', 'dummy1@students.zhaw.ch')
            .setValue('input[name=password]', 'dummy1')
            .click('button[type=submit]')
            .pause(3000)
            // assume Login was correct if topMenu Logout Button is visible
            .assert.elementPresent('#top-menu-logout')
            .assert.visible('#top-menu-logout')
            .end();
    },

    // login using valid credentials, i.e not a ZHAW email address
    'Step Login with invalid credentials' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            .waitForElementVisible('input[name=email]')
            .setValue('input[type=text]', 'someone@somedomain.com')
            .setValue('input[name=password]', 'someone')
            .click('button[type=submit]')
            .pause(3000)
            // TODO: define Login Error Flow
            // assume Login was correct if topMenu Logout Button is not present
            .assert.elementNotPresent('#top-menu-logout')
            .end();
    },


};

