import scrapy from 'node-scrapy';
import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const url = 'https://www.instagram.com/motoroctane';
const model = 'title'

fetch(url)
  .then((res) => res.text())
  .then( async (body) => {
    // console.log(body);
    await writeFile('src/temp/body.txt', body);
    console.log(scrapy.extract(body, model))
  })
  .catch(console.error)
