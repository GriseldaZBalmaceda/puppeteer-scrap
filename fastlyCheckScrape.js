const express = require('express'); //Line 1
const { status } = require('express/lib/response');
const app = express(); //Line 2
const port = process.env.PORT || 8800; //Line 3
const puppeteer = require("puppeteer");


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
const urls = ['https://www.creighton.edu/geo/creightonglobalinitiative/thecommonhomeproject/ourhubs/india/'];


const externalCheck = async () => {
  let myUrls = []

  for (let link of urls) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(link)
    const url = response._url;
    console.log(url)
    if (url.includes('my.')) {
      myUrls.push(link)
    }
  }
  const xlsx = require('xlsx');
  const fastlyLinks = myUrls.map((url) => [url])
  console.log(fastlyLinks)
  const workBook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet(fastlyLinks);
  xlsx.utils.book_append_sheet(workBook, worksheet);
  xlsx.writeFile(workBook, 'failedRedirects.xlsx')
}

externalCheck(); 
