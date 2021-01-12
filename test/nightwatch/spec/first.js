const indexPage = require('./pages/index')

module.exports  = {
    '测试登录页相关验证和能否正常登录': function (browser) {
        const loginPage = browser.page
        browser
        .url('http://localhost:8080')
        //页面加载完 
        .waitForElementVisible('#app', 1000)

            
        //测试页面加载完成  直接点击登录按钮
        .click('button[type=submit]')
        //等待验证
        .pause(500)
        browser.expect.element('.login-form').text.to.contain('请输入用户')
        browser.expect.element('.login-form').text.to.contain('请输入密码')

        // 测试输入用户名后 用户名校验是否通过
        browser
        .setValue('input[name=username]', 'ebo')
        .click('button[type=submit]')
        .pause(1000)
        //  .assert 断言在失败后会结束并跳过其他断言    
        //  .verify 断言在失败后会记录失败 并 继续其他断言
        .verify.not.containsText('.ant-col:nth-child(1)' ,'请输入用户名!')
        
        browser
        .pause(1000)

        //测试输入正确的用户名和正确的密码能否正常登录
        .setValue('input[name=password]', '123123')
        .pause(1000)
        .click('button[type=submit]')
        
        //测试能否登录成功后跳转到 列表页
        .pause(1000)
        .assert.urlContains('productList')


        //测试初始数据是否为七条
        browser
        .waitForElementVisible('.list-ul',1000)
        .pause(1000)
        //使用 .count 计数
        browser.expect.elements('.list-li').count.to.equal(7)
        //测试搜索 米 是否能搜索出2条数据
        browser
        .setValue('input.ant-input', '米')
        .click('button.ant-btn')
        .pause(1000)
        browser.expect.elements('.list-li').count.to.equal(2);
        browser.end()
        // .url("http://www.baidu.com")
        // .waitForElementVisible('body', 1000)
        // .setValue('input[name=wd]', 'nightwatch')
        // .waitForElementVisible('button[type=submit]', 1000)
        // .click('button[type=submit]')
        // .pause(1000)
        // .assert.containsText('#head_wrapper', '入门教程')
        // .end();

    }
}
