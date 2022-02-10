const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 8000; //Line 3
const puppeteer = require("puppeteer");


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/url', async (req, res) => { //Line 9
    const findAllLinks = async (page) => {
        await page.goto(req.query.url);
        const allLinks = await page.evaluate(() => {
            const allLinks = [];
            const links = document.querySelectorAll('a');
            links.forEach((link) => {
                allLinks.push(link.href);
            })

            return allLinks;
        })
        return allLinks;
    }

    const evaluatePage = async (page) => {
        let status = await page.evaluate(() => {
            let status = document.querySelector('h1').innerText
            if (status !== "Page not Found") {
                return 'passed'
            } else {
                return 'Failed'
            }
        })
        return status
    }

    const getPageData = async (link, page) => {
        let urlStatus = {}
        try {
            const response = await page.goto(link);
            if (response.status() === 304 || response.status() === 404) {
                let status = await evaluatePage(page);
                urlStatus = {
                    link: link,
                    status: response.status(),
                    pass: status
                }
            } else if (response.status() === 200) {
                urlStatus = {
                    link: link,
                    status: response.status(),
                    pass: 'pass'
                }
            }
        } catch (err) {
            console.log(err)
        }
        return urlStatus;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const allLinks = await findAllLinks(page);
    let scrapedData = []

    for (let link of allLinks) {
        const data = await getPageData(link, page);
        scrapedData.push(data);
    }
    console.log(scrapedData)
    const xlsx = require('xlsx');
    var Heading = [
        ["URL", "STATUS", "PASS/FAIL"],
    ];

    await browser.close();
    const workBook = xlsx.utils.book_new()
    const worksheet = xlsx.utils.json_to_sheet(scrapedData);
    xlsx.utils.sheet_add_json(worksheet, Heading);

    xlsx.utils.book_append_sheet(workBook, worksheet);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "linkTests.xlsx");
    xlsx.writeFile(workBook, 'linkTests.xlsx')
    const stream = fs.createReadStream('linkTests.xlsx');         // create read stream
    stream.pipe(res);


}); //Line 11


