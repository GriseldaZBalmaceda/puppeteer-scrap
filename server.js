const { response } = require('express');
const express = require('express'); //Line 1
const { status } = require('express/lib/response');
const app = express(); //Line 2
const port = process.env.PORT || 8000; //Line 3
const puppeteer = require("puppeteer");


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
const urls = [
    //add urls here
];
const findAllLinks = async (page, url, index) => {
    await page.goto(url);
    const allLinks = await page.evaluate((index) => {
        const allLinks = [];
        const allDocs = [];
        const invalidUrls = []
        const targetErrors = []

 
            links = document.querySelectorAll('#block-creighton-content a');
      
        const myRegex = new RegExp('^.*(doc|docx|dotx|gif|jpeg|jpg|mp4|xls|xlsm|xlsx|zip)$');
        links.forEach((link) => {
            if (myRegex.test(link.href)) {
                allDocs.push(link.href);
            }
            else if (link.href.includes('mailto') || link.href.includes('tel') || link.href.includes('#')|| link.href.includes('javascript')) {
                invalidUrls.push(link.href)
            } 
            else if(link.href.includes('pdf')){
                if(link.target==="_blank") {
                        allLinks.push(link.href)
                }else {
                        targetErrors.push({
                            link: link.href,
                            name: link.innerText
                        })
                }
                   
            }
            else if((link.href.includes('www.creighton.edu') || link.href.includes('migration-creighton-www-primary.pantheonsite.io'))){
                if(!link.target || link.target === '_self'){
                    allLinks.push(link.href)
                }else{
                    targetErrors.push({
                        link: link.href,
                        name: link.innerText
                    })     
                }
            }  else if (!link.href.includes('www.creighton.edu') || link.href.includes('migration-creighton-www-primary.pantheonsite.io')){
                if(!link.target || link.target !== '_blank'){
                    targetErrors.push({
                        link: link.href,
                        name: link.innerText
                    })    
                }else {
                    allLinks.push(link.href)
                }
            }else {
                targetErrors.push({
                    link: link.href,
                    name: link.innerText
                })           
             }
        });
        const documents = document.querySelectorAll('img');
        documents.forEach((doc) => {
            allDocs.push(doc.src);
        });
        let allPageLinks = {
            allLinks,
            documents: allDocs,
            targetErrors,
            invalidUrls
        }
        return allPageLinks;
    }, index);

    return allLinks;
}

const evaluatePage = async (page) => {

    let status = await page.evaluate(() => {
        let pageStatus = document.querySelector('div> .sos h1')?.innerText
        if (pageStatus === "Page Not Found" || pageStatus === "404" || pageStatus === "Access Denied") {
            return 'Failed'
        } else {
            return 'Passed'
        }
    })
    // const fileName = link.replaceAll('/', '-');
    // await page.screenshot({ path: `./${fileName}.png` });
    return status;
}

const getPageData = async (link, mainLink, page) => {
    console.log('now on link ' + link)
    let urlStatus = {}
    try {
        const response = await page.goto(link);
        if (response.status() !== 200) {
            let status = await evaluatePage(page, link);
            if (response.status() === 404) {
                urlStatus = {
                    mainLink: mainLink,
                    link: link,
                    httpError: 'false',
                    status: response.status(),
                    pass: status,
                }
            }
        } else if (link.match(('^http:'))) {
            urlStatus = {
                mainLink: mainLink,
                link: link,
                httpError: 'true',
                status: response.status(),
                pass: 'Passed'
            }
        }
        else if (response.status() === 200) {
            urlStatus = {
                mainLink: mainLink,
                link: link,
                httpError: 'false',
                status: response.status(),
                pass: 'Passed'
            }
        }
    } catch (err) {
        // let status = await evaluatePage(page);
        // urlStatus = {
        //     mainLink,
        //     link:link,
        //     httpError:'false',
        //     status: status,
        //     pass:'Passed'
        // }
        console.log(link + ' invalid url located at' + mainLink)
        console.log(err)
    }
    return urlStatus;
}

const scrapePage = async () => {
    let serverErrors = [];
    let httpChanges = [];
    let targetErrors = []
    const xlsx = require('xlsx');

    for (let [index, mainLink] of urls.entries()) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const allLinks = await findAllLinks(page, (mainLink), index);
        let scrapedData = [];
        const isEmpty = (obj) => Object.keys(obj).length === 0;

            for(let targetError of allLinks.targetErrors){
                targetErrors.push(
                    {
                        name: targetError.name,
                        link: targetError.link,
                        mainlink: mainLink,
                    })
            }
        for (let link of allLinks.allLinks) {
            if(!link.includes('pdf')){
                const data = await getPageData(link, mainLink, page);
                if (!isEmpty(data)) {
                    if (data.status === 404) {
                        serverErrors.push(data);
                        if (data.httpError === 'true') {
                            httpChanges.push(data)
                        }
                    } else if (data.httpError === 'true') {
                        httpChanges.push(data)
                    }               
                    else {
                        scrapedData.push(data);
                    }
                }
            }  
        }
        await browser.close();
    }

    const workBook2 = xlsx.utils.book_new()
    const workBook3 = xlsx.utils.book_new()
    const workbook4 = xlsx.utils.book_new()
    //figure out why i cant add multiple headers
    // var mainLinkHeader = [
    //     ["Main page", "Link","HTTPERROR", "Status", "PASS/FAIL", "Target Erorr"],
    // ];
    var httpErrorHeader = [
       ["Main Page", "Link", "HTTPERROR", "Status", "PASS/FAIL"]
    ];
    // var targetErrorHeader = [
    //     ["Link", "Main Link"]
    // ]
    console.log(httpChanges);
    console.log(targetErrors)
    const worksheet3 = xlsx.utils.json_to_sheet(serverErrors);
    const worksheet4 = xlsx.utils.json_to_sheet(httpChanges);
    const worksheet5 = xlsx.utils.json_to_sheet(targetErrors)


    // xlsx.utils.sheet_add_json(worksheet3, mainLinkHeader);
    xlsx.utils.sheet_add_json(worksheet4, httpErrorHeader);
    // xlsx.utils.sheet_add_json(worksheet5, targetErrorHeader)

    xlsx.utils.book_append_sheet(workBook2, worksheet3, '404Errors');
    xlsx.utils.book_append_sheet(workBook3, worksheet4, 'HttpErrors');
    xlsx.utils.book_append_sheet(workbook4, worksheet5, 'TargetErrors')

    xlsx.writeFile(workBook2, `404Errors.xlsx`)
    xlsx.writeFile(workBook3, `HttpErrors.xlsx`)
    xlsx.writeFile(workbook4, `TargetErrors.xlsx`)
}

scrapePage(); 
