const puppeteer = require('puppeteer');
const toDoAnswer = require('./codes');
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "izzak.boston@ifyourock.com";
const password = "eqtqz2T?";
let browserOpen = puppeteer.launch({
    headless : false,
    args : ['--start-maximized'],
    defaultViewport:null
})
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newtab){
    page = newtab;
    let gotoHackeRank = newtab.goto(loginLink);
    return gotoHackeRank;
}).then(function(){
    let emailTyping = page.type("input[id='input-1']", email, {delay : 50});
    return emailTyping;
}).then(function(){
    let PasswdTyping = page.type("input[type='password']", password, {delay : 50});
    return PasswdTyping;
}).then(function(){
    let pressEnter = page.click("button[data-analytics='LoginPassword']", {delay : 50});
    return pressEnter;
}).then(function(){
    let clickOnAlgo = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return clickOnAlgo;
}).then(function(){
    let clickWarmUp = waitAndClick("input[value='warmup']", page);
    return clickWarmUp;
}).then(function(){
    let waitFor3Seconds = page.waitFor(3000);
    return waitFor3Seconds;
}).then(function(){
    let SolveLink = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 50});
    return SolveLink;
}).then(function(questionArr){
    // console.log(questionArr.length);
    questionSolver(page, questionArr[0], toDoAnswer.answers[0]);
})

function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let ClickSelector = cPage.click(selector);
            return ClickSelector;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let clickQuestion = question.click();
        clickQuestion.then(function(){
            let cursorOnEditor = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return cursorOnEditor;
        }).then(function(){
            return waitAndClick(".checkbox-input", page);
        }).then(function(){
            return waitAndClick(".input.text-area.custominput.auto-width", page);
        }).then(function(){
            return page.type(".input.text-area.custominput.auto-width" , answer , {delay : 5});
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay : 100});
            return AisPressed;
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay : 100});
            return XisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            let editorInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return editorInFocus;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay : 100});
            return AisPressed;
        }).then(function(){
            let VisPressed = page.keyboard.press('V', {delay : 100});
            return VisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled', {delay : 50})
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}