// const { response } = require('express');
const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 8000; //Line 3
const puppeteer = require("puppeteer");


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const findSiteIndexUrls = async (page, url) => {

  await page.goto(url);

  let foundUrlMatches = await page.evaluate(() => {
    const allUrls = [];
    const foundMatches = [];
    const urls = [
      'alliance.creighton.edu/about',
      'alliance.creighton.edu/about/calendar',
      'alliance.creighton.edu/about/contact',
      'alliance.creighton.edu/about/creighton-university-arizona-health-education-alliance',
      'alliance.creighton.edu/about/creighton-university-arizona-health-education-alliance/staff',
      'alliance.creighton.edu/about/faculty',
      'alliance.creighton.edu/about/frequently-asked-questions',
      'alliance.creighton.edu/about/graduate-medical-education-office',
      'alliance.creighton.edu/about/graduate-medical-education-office/policies-and-procedures',
      'alliance.creighton.edu/about/graduate-medical-education-office/single-employer-plan',
      'alliance.creighton.edu/about/news',
      'alliance.creighton.edu/about/phoenix',
      'alliance.creighton.edu/residencies-fellowships',
      'alliance.creighton.edu/residencies-fellowships/academic-success',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/affiliations',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/message-director',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/our-fellows',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/child-and-adolescent-psychiatry/teaching-and-research',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology/fellows',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/gastroenterology/message-director',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/message-director',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/our-fellows',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/hospice-and-palliative-medicine/recent-fellows',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery-fellowship',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/affiliations',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/message-director',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/minimally-invasive-gynecologic-surgery/our-fellows',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/affiliations-clinical-sites',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/our-fellows-0',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/surgical-critical-care/research',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/womens-imaging',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/womens-imaging/curriculum',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/womens-imaging/faculty',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/womens-imaging/how-apply',
      'alliance.creighton.edu/residencies-fellowships/fellowship-programs/womens-imaging/overview',
      'alliance.creighton.edu/residencies-fellowships/residency-programs',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/affiliations-clinical-sites',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/message-director',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/emergency-medicine/research',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/message-director',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/family-medicine/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine-residency-program',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/conferences',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/message-chief-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/message-director',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/our-residents-cloned',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/program-highlights',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/internal-medicine/wellness',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/message-director',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/obstetrics-and-gynecology/teaching-and-research',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/podiatry/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/message-director-0',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/psychiatry/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/affiliations',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/radiology-diagnostic/recent-alumni',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/affiliation',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/curriculum',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/faculty',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/graduates-and-fellowships',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-st-josephs/our-residents',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-valleywise-health/how-apply',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-valleywise-health/message-chair',
      'alliance.creighton.edu/residencies-fellowships/residency-programs/surgery-valleywise-health/our-residents',
      'alliance.creighton.edu/residencies-fellowships/salaries-and-benefits',
      'alliance.creighton.edu/residencies-fellowships/wellness',
      'alliance.creighton.edu/research/mentorship-program-and-general-research-inquiries',
      'alliance.creighton.edu/research/research-opportunities-publications-and-resources',
      'alliance.creighton.edu/alliance-research',
    ]


    links = document.querySelectorAll('#block-creighton-content a');

    console.log(links)

    links.forEach((link) => {
      console.log(link.innerText)
      allUrls.push(link.href);
    });
    console.log(allUrls)
    allUrls.map((fullUrl) => {
      for (let url of urls) {
        let newTestUrl = url.replace('/', '\/')
        const myRegex = new RegExp(newTestUrl);
        if (myRegex.test(fullUrl)) {
          foundMatches.push(fullUrl)
        } else {
          console.log('no changes for this')
        }
      }
    })
    return foundMatches
  })
  return foundUrlMatches
}





const scrapePage = async () => {
  const xlsx = require('xlsx');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const foundUrlMatches = await findSiteIndexUrls(page, 'https://migration-creighton-www-primary.pantheonsite.io/site-index');
  console.log(foundUrlMatches);
  let urlsToChange = foundUrlMatches.map((url) => [url])



  const workBook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet(urlsToChange);
  xlsx.utils.book_append_sheet(workBook, worksheet);
  xlsx.writeFile(workBook, 'urlChanges.xlsx')

  await browser.close();
}

scrapePage();


