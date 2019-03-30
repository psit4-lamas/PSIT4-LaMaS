
module.exports = {


    'TestLogout' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            //.setValue('input[type=text]', 'nightwatch js')
            //.waitForElementVisible('input[name=btnK]')
            //.click('input[name=btnK]')nigh
            .pause(1000)
            //.assert.containsText('.LC20lb', 'Nightwatch.js | Node.js powered End-to-End testing framework')
            .end();
    }
};

