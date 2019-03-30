
module.exports = {

    beforeEach(browser) {

        browser
            // login
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
    },


    'TestLogout' : function (browser) {
        browser

            .waitForElementVisible('#top-menu-logout')
            .click('#top-menu-logout')
            .pause(1000)
            // check if LoginPage becomes visible after Logout
            .assert.elementPresent('button[type=submit]')
            .assert.visible('button[type=submit]')
            .end();
    }
};

