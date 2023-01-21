import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import jsdom from 'jsdom';
import { writeFile } from 'fs/promises';

const INSTAGRAM_LOGIN_PAGE = 'https://www.instagram.com/accounts/login';
const INSTAGRAM_POST_URLS = ['https://www.instagram.com/motoroctane'];

puppeteer.launch({ headless: false }).then(async (browser) => {
    let page = await browser.newPage();
    await page.goto(INSTAGRAM_LOGIN_PAGE, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', '<username>');
    await page.type('input[name="password"]', '<password>');
    await page.click('button[type="submit"]');
    await page.waitForNetworkIdle();

    INSTAGRAM_POST_URLS.forEach(async (postUrl) => {
        await page.goto(postUrl, { waitUntil: 'networkidle2' }).then(() => {
            const content = page.content();
            content.then(async (data) => {
                const { JSDOM } = jsdom;
                const dom = new JSDOM(data);
                dom.window.document.querySelectorAll('div._aabd > a').forEach(function (d) {
                    console.log(d.getAttribute('href'));
                    
                });

                // const $ = cheerio.load(data);
                // $('div._aabd > a').each((index, el) => {
                //     console.log(index, el);
                // });
            });
        });
        // await page.waitForNetworkIdle();
        // const postsSelector = await page.waitForSelector('body');
        // console.log(postsSelector);
        // // await postsSelector.evaluate(el => {
        // //     console.log(el);
        // // });
        // // const x = await page.$('.x1iyjqo2');
        // // console.log(x);

        // const html = await page.evaluate(body => {
        //     console.log(body.innerHTML);
        //     return body.innerHTML;
        // }, postsSelector);

        // console.log(html)
    });
});
