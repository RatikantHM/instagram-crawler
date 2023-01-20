import chromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { writeFile } from 'fs/promises';

chromeLauncher.launch({ port: 9222, chromeFlags: [ '--headless' ] }).then(function(chrome) {
  CDP(async (client) => {
    const {Network, Page, Runtime} = client;
    await Page.enable();
    await Page.navigate({url: 'https://www.instagram.com/motoroctane'});
    await Page.loadEventFired();
    
    const result = await Runtime.evaluate({ expression: 'document.documentElement.outerHTML' });
    const html = result.result.value;
    console.log(html);
    await writeFile('src/temp/body2.txt', html);
    await client.close();
    chrome.kill();
  });
});
