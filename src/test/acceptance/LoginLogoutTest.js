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
            // assume behavior was correct if user not found
            .verify.elementPresent('#user-not-found')
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