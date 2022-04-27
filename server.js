const express = require('express'); //Line 1
const { status } = require('express/lib/response');
const app = express(); //Line 2
const port = process.env.PORT || 8800; //Line 3
const puppeteer = require("puppeteer");


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
const urls = [
    '/arizona-health/about',
    '/arizona-health/alliance-calendar',
    '/arizona-health/about/contact',
    '/arizona-health/about/creighton-university-arizona-health-education-alliance',
    '/arizona-health/about/creighton-university-arizona-health-education-alliance/staff',
    '/arizona-health/faculty',
    '/arizona-health/about/frequently-asked-questions',
    '/arizona-health/about/graduate-medical-education-office',
    '/arizona-health/about/graduate-medical-education-office/policies-and-procedures',
    '/arizona-health/about/graduate-medical-education-office/single-employer-plan',
    '/arizona-health/about/news',
    '/arizona-health/about/phoenix',
    '/arizona-health/residencies-fellowships',
    '/arizona-health/residencies-fellowships/academic-success',
    '/arizona-health/residencies-fellowships/fellowship-programs',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/affiliations',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/message-director',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/our-fellows',
    '/arizona-health/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/teaching-and-research',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/gastroenterology/message-director',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/message-director',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/our-fellows',
    '/arizona-health/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/our-fellows/recent-fellows',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery-fellowship',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/affiliations',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/message-director',
    '/arizona-health/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/our-fellows',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/affiliations-clinical-sites',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/our-fellows-0',
    '/arizona-health/residencies-fellowships/fellowship-programs/surgical-critical-care/research',
    '/arizona-health/residencies-fellowships/fellowship-programs/womens-imaging',
    '/arizona-health/residencies-fellowships/fellowship-programs/womens-imaging/curriculum',
    '/arizona-health/residencies-fellowships/fellowship-programs/womens-imaging/faculty',
    '/arizona-health/residencies-fellowships/fellowship-programs/womens-imaging/how-apply',
    '/arizona-health/residencies-fellowships/fellowship-programs/womens-imaging/overview',
    '/arizona-health/residencies-fellowships/residency-programs',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/affiliations-clinical-sites',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/message-director',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/our-residents',
    '/arizona-health/residencies-fellowships/residency-programs/emergency-medicine/research',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/message-director',
    '/arizona-health/residencies-fellowships/residency-programs/family-medicine/our-residents#year1',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine-residency-program',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/conferences',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/message-chief-residents',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/message-director',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/our-residents-cloned#year1',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/program-highlights',
    '/arizona-health/residencies-fellowships/residency-programs/internal-medicine/wellness',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/message-director',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/our-residents',
    '/arizona-health/residencies-fellowships/residency-programs/obstetrics-and-gynecology/teaching-and-research',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/podiatry/our-residents',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/message-director-0',
    '/arizona-health/residencies-fellowships/residency-programs/psychiatry/our-residents#year1',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/affiliations',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/our-residents#year3',
    '/arizona-health/residencies-fellowships/residency-programs/radiology-diagnostic/recent-alumni',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/affiliation',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/curriculum',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/faculty',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/graduates-and-fellowships',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-valleywise-health/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/our-residents',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-valleywise-health/how-apply',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-valleywise-health/message-chair',
    '/arizona-health/residencies-fellowships/residency-programs/surgery-st-josephs/our-residents',
    '/arizona-health/about/graduate-medical-education-office/policies-and-procedures',
    '/arizona-health/residencies-fellowships/wellness',
    '/arizona-health/alliance-research/mentorship-program-and-general-research-inquiries',
    '/arizona-health/alliance-research/research-opportunities-publications-and-resources',
    '/arizona-health/alliance-research',
    '/arizona-health/medical-student-rotations'
];
const findAllLinks = async (page, url, index) => {
    await page.goto(url);

    const allLinks = await page.evaluate((index) => {
        const allLinks = [];
        const allDocs = [];
        const invalidUrls = []
        let links = [];

        if (index === 0) {
            links = document.querySelectorAll('a');
        }
        else if (index > 0) {
            links = document.querySelectorAll('#block-creighton-content a');
        }

        const myRegex = new RegExp('^.*(doc|docx|dotx|gif|jpeg|jpg|mp4|pdf|xls|xlsm|xlsx|zip)$');

        links.forEach((link) => {
            if (myRegex.test(link.href)) {
                allDocs.push(link.href);
            }
            else if (link.href.includes('mailto') || link.href.includes('tel') || link.href.includes('#')) {
                invalidUrls.push(link.href)
            }
            else {
                allLinks.push(link.href)
            }
        });
        const documents = document.querySelectorAll('img');
        documents.forEach((doc) => {
            allDocs.push(doc.src);
        });
        let allPageLinks = {
            allLinks,
            documents: allDocs,
            invalidUrls

        }
        return allPageLinks;
    }, index);

    return allLinks;
}

const evaluatePage = async (page, link) => {

    let status = await page.evaluate(() => {
        let pageStatus = document.querySelector('div> .sos h1')?.innerText
        console.log(pageStatus)
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
    let urlStatus = {}
    try {
        const response = await page.goto(link);
        if (response.status() !== 200) {

            let status = await evaluatePage(page, link);
            console.log(status)
            if (response.status() === 404) {
                urlStatus = {
                    mainLink: mainLink,
                    link: link,
                    status: response.status(),
                    pass: status,
                }
            }
        } else if (link.match(('^http:'))) {
            urlStatus = {
                mainLink: mainLink,
                link: link,
                status: response.status(),
                pass: 'Passed'
            }
        }
        else if (response.status() === 200) {
            urlStatus = {
                link: link,
                status: response.status(),
                pass: 'Passed'
            }
        }
    } catch (err) {
        // let status = await evaluatePage(page, link);
        // urlStatus = {
        //     mainLink,
        //     link,
        //     invalidUrl: true,
        //     status
        // }
        console.log(link + ' invalid url located at' + mainLink)
        console.log(err)
    }
    return urlStatus;
}

const scrapePage = async () => {
    let serverErrors = [];
    let httpChanges = [];
    const xlsx = require('xlsx');

    for (let [index, mainLink] of urls.entries()) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const allLinks = await findAllLinks(page, ('https://migration-creighton-www-primary.pantheonsite.io' + mainLink), index);
        let scrapedData = [];

        const isEmpty = (obj) => Object.keys(obj).length === 0;

        for (let link of allLinks.allLinks) {
            const data = await getPageData(link, mainLink, page);
            if (!isEmpty(data)) {
                if (data.status === 404) {
                    serverErrors.push(data);
                    if (data.link.match(('^http:'))) {
                        httpChanges.push(data)
                    }
                } else if (data.link.match((('^http:')))) {
                    httpChanges.push(data)
                }
                else {
                    scrapedData.push(data);
                }
            }
        }
        let scrapedDocs = allLinks.documents.map((doc) => [doc])
        let invalidUrls = allLinks.invalidUrls.map((invalidUrl) => [invalidUrl])
        const xlsx = require('xlsx');
        var Heading = [
            ["URL", "STATUS", "PASS/FAIL"],
        ];

        await browser.close();
        const workBook = xlsx.utils.book_new()
        const worksheet = xlsx.utils.json_to_sheet(scrapedData);
        const worksheet2 = xlsx.utils.aoa_to_sheet(scrapedDocs);
        const worksheet3 = xlsx.utils.aoa_to_sheet(invalidUrls);

        xlsx.utils.sheet_add_json(worksheet, Heading);

        xlsx.utils.book_append_sheet(workBook, worksheet);
        xlsx.utils.book_append_sheet(workBook, worksheet2, 'All Documents');
        xlsx.utils.book_append_sheet(workBook, worksheet3, 'Invalid Urls');



        const fileName = mainLink.replaceAll('/', '-')
        xlsx.writeFile(workBook, `${fileName}.xlsx`)
    }
    const workBook2 = xlsx.utils.book_new()
    const workBook3 = xlsx.utils.book_new()
    var mainLinkHeader = [
        ["Main page", "Link", "Status", "PASS/FAIL"],
    ];

    const worksheet3 = xlsx.utils.json_to_sheet(serverErrors);
    const worksheet4 = xlsx.utils.json_to_sheet(httpChanges);


    xlsx.utils.sheet_add_json(worksheet3, mainLinkHeader);
    xlsx.utils.sheet_add_json(worksheet4, mainLinkHeader);

    xlsx.utils.book_append_sheet(workBook2, worksheet3, '404 Errors');
    xlsx.utils.book_append_sheet(workBook3, worksheet4, 'Http');

    xlsx.writeFile(workBook2, `404Errors.xlsx`)
    xlsx.writeFile(workBook3, `HttpErrors.xlsx`)
}

scrapePage(); 
