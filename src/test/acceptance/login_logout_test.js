
module.exports = {
    // TODO: set application address using a global placeholder
    'Step Login with valid credentials' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('input[name=email]',10000)
            .setValue('input[type=text]', 'dummy1@students.zhaw.ch')
            .setValue('input[name=password]', 'dummy1')
            .click('button[type=submit]')
            .waitForElementVisible('#top-menu-logout',10000)
            .end();
    },

    'Step Login with invalid credentials' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('input[name=email]',10000)
            .setValue('input[type=text]', 'someone@somedomain.com')
            .setValue('input[name=password]', 'someone')
            .click('button[type=submit]')
            .pause(10000)
            // TODO: define Login Error Flow
            // assume Login was correct if topMenu Logout Button is not present
            .verify.elementNotPresent('#top-menu-logout')
            .end();
    },

    'Logout' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('input[name=email]',10000)
            .setValue('input[type=text]', 'dummy1@students.zhaw.ch')
            .setValue('input[name=password]', 'dummy1')
            .click('button[type=submit]')
            // assume Login was correct if topMenu Logout Button is visible
            .waitForElementVisible('#top-menu-logout',10000)
            .click('button#logout')
            // check if LoginPage becomes visible after Logout
            .waitForElementVisible('button[type=submit]',10000)
            .end();
    }
};