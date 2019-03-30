/* to be deleted
module.exports = {
    'Demo test Google' : function (browser) {
        browser
            .url('http://www.google.com')
            .waitForElementVisible('body')
            .setValue('input[type=text]', 'nightwatch js')
            .waitForElementVisible('input[name=btnK]')
            .click('input[name=btnK]')
            .pause(1000)
            .assert.containsText('.LC20lb', 'Nightwatch.js | Node.js powered End-to-End testing framework')
            .end();
    }
};

*/