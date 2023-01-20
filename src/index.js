import Crawler from 'crawler';
import jsdom from 'jsdom';

const crawler = new Crawler({
    maxConnections: 10,
    rateLimit: 10000,
    // jQuery: {
    //     name: 'cheerio',
    //     options: {
    //         normalizeWhitespace: true,
    //         xmlMode: true
    //     }
    // },
    jQuery: jsdom,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            // const $ = res.$;
            // // $ is Cheerio by default
            // //a lean implementation of core jQuery designed specifically for the server
            // // console.log($('title').text());
            // console.log($('._aabd').children());
            // // $('._aabd').forEach((post) => {
            // //     console.log(post);
            // // });
            const { JSDOM } = jsdom;
            const dom = new JSDOM(res.body);

           console.log(res.body);

            // Posts
            dom.window.document.querySelectorAll('input').forEach(function (d) {
                console.log(d);
                // const aTag = d.children('a').getAttribute('src');
                // console.log('aTag:', aTag);
            });
        }
        done();
    }
});

crawler.on('request', (options) => {
    console.log('Crawling started at:', new Date());
    // console.log(options);
});

crawler.queue('https://www.instagram.com/motoroctane');
