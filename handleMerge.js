const data1 = require('./finalWebsiteFiles.js');
const data2 = require("./allFilesIds.js")
dict = {}
err = []

matched = []
todelete = []
m = 0
let firstOp = "file%20library"
let secondOp = "file library"
use = []
for (let i = 0; i < data1.arr.length; i++) {
    let url = data1.arr[i].toLowerCase()
    if (url.includes(firstOp)) {
        url = url.substring(url.lastIndexOf(firstOp) + firstOp.length);
    } else {
        url = url.substring(url.lastIndexOf(secondOp) + secondOp.length);
    }
    url = url.trim()
    url = url.replaceAll("%20", " ")
    use.push(url)
    let hit = true
    for (let k = 0; k < data2.arr.length; k++) {
        if (data2.arr[k].url.toLowerCase().substring(13) == url) {
            hit = true
            matched.push(data2.arr[k].url.toLowerCase().substring(13))
            break
        } else {
            hit = false
        }
    }
    if (hit == false) {
        err.push(url)
    }

}

check = []
data2.arr.forEach(data => {
    url = data.url.toLowerCase().substring(13)
    if (!matched.includes(url)) {
        todelete.push(data);
    } else {
        check.push(url)
    }
});
setter = new Set(use)
const linkWeb = setter.size
toDelete = data2.arr.length - linkWeb

arra = []
// Diff between check and data1.arr
setter.forEach(item => {
    url = item
    url = url.trim()
    url = url.replace("%20", " ")
    if (check.indexOf(url) === -1) {
        arra.push(item)
    }
})
console.log(arra)

console.log(data2.arr.length - matched.length)
console.log(todelete.length) // These two console log statements should be the same with a 34 difference - there were 24 files on the website NOT in the file library (broken links) and 8 foundation links not in the file library.
console.log(data2.arr.length - todelete.length)
console.log(data1.arr.length)

async function handleReq2(items) {
    try {
        const promises = items.map(async (item) => {
            const res = await fetch(`https://www.irem.org/admin/api/assetfile/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": '.ASPXANONYMOUS{CONFIDENTIAL}'
                },
                body: JSON.stringify({
                    metaData: {},
                    item: {
                        id: `${item.id}`,
                        fileName: `${item.fileName}`,
                        title: `${item.title}`,
                        excludeFromExternalSearch: true
                    }
                })
            });
            return res;
        });

        const results = await Promise.all(promises);
        results.forEach((res, index) => {
            console.log(`Response for item ${index} finished`);
        });

    } catch (e) {
        console.log('Error:', e);
    }
}
const halfIndex = Math.ceil(todelete.length / 2);
const firstHalf = todelete.slice(0, halfIndex);
const secondHalf = todelete.slice(halfIndex);
handleReq2(secondHalf);


/*
async function handleReq() {
    try {
        const res = await fetch(`https://www.irem.org/admin/api/assetfile/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Cookie": 'Hidden'
            },
            body: {
                "metaData": {},
                "item": {
                    "fileName": "IREM_Career-Roadmap.pdf",
                    "title": "111",
                    "id": "193ff9b8-2715-4cb9-9089-d73312a44d7d",
                    "excludeFromExternalSearch": true,
                }
            },
        });
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
    ===================

Title: IREM_Career Roadmap.pdf
File Name: IREM_Career-Roadmap.pdf
URL: https://www.irem.org/File Library/GlobalNavigation/Membership/Associate/IREM_Career-Roadmap.pdf
Created By: McCormick, Kyle
Created Date: 03/22/2023 11:35 AM
Modified By: McCormick, Kyle
Modified Date: 03/22/2023 11:35 AM

todelete.forEach(item => async function handleReq2() {
    try {
        const res = await fetch(`https://www.irem.org/admin/api/assetfile/`, {
            method: 'PUT',
            headers: {
                "authority": "www.irem.org",
                "scheme": "https",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Cookie": '
                "pragma": "no-cache",
                "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-owasp-csrf-token": "a9c84c25-1b99-4547-b857-0a31b360d8f9"
            },
            body: {
                "metaData": {},
                "item": {
                    "description": "",
                    "mimeType": `${item.mimeType}`,
                    "altText": "",
                    "parentId": `${item.parentId}`,
                    "status": `${item.status}`,
                    "id": `${item.Id}`,
                    "title": `${item.title}`,
                    "fileName": `${item.fileName}`,
                    "fileSize": `${item.fileSize}`,
                    "sourceContentId": `${item.sourceContentId}`,
                    "orderNo": `${item.orderNo}`,
                    "relativePath": `${item.relativePath}`,
                    "extension": `${item.extension}`,
                    "url": `${item.url}`,
                    "excludeFromExternalSearch": true,
                    "rowNumber": `${item.rowNumber}`,
                    "siteId": `${item.siteId}`,
                    "productId": `${item.productId}`,
                    "createdDate": `${item.createdDate}`,
                    "createdBy": {
                        "id": `${item.createdBy.id}`,
                        "fullName": `${item.createdBy.fullName}`,
                        "firstName": `${item.createdBy.firstName}`,
                        "lastName": `${item.createdBy.lastName}`
                    },
                    "modifiedDate": `${item.modifiedDate}`,
                    "modifiedBy": {
                        "id": `${item.modifiedBy.id}`,
                        "fullName": `${item.modifiedBy.fullName}`,
                        "firstName": `${item.modifiedBy.firstName}`,
                        "lastName": `${item.modifiedBy.lastName}`
                    }
                }
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})
*/
//handleReq()

/*DANGER, DO NOT RUN. Besides, it needs to pass authorization into the header...

todelete.forEach(item => async function(item) {
    await fetch(`https://www.irem.org/admin/api/assetfile/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({excludeFromExternalSearch: "true"})
    })
})
/*
Considerations: Redirects acte weird for the web scraper on files, as well as if there is a file that is dynamically loaded onto the page (hidden/ notvisible is find, as it will still be in the DOM)* might be deleted if it wasnt  found anywhere else on the site./

// Make a DELETE request at this URL: https://www.irem.org/admin/api/assetfile/{item.id}
// Behavior weird for some as some of the file urls are redirects. Thats why length of 
// to delete is different from data2.arr.length - matched.length. Possible disconnect
// between urls that live on the website but not in the file library (because they have been deleted)
/*
[for (const item of todelete) {
    await fetch(`https://www.irem.org/admin/api/assetfile/${item.id}`, {
        method: 'DELETE'
    });
}
FOR OF

  "/globalnavigation/certifications/forindividuals/cpm/irem-cpm-handbook.pdf",
  "/audiencebarnavigation/chapterservices/marketingresources/brandtraining2019.mp4",
  "/international/2019iremjapanannualmeeting.pdf",
  "/audiencebarnavigation/chapterservices/studentacademicoutreach/irem-careers.zip",
  "/globalnavigation/advocacy/aid/orientation-manual.pdf",
  "/membership-join irem/acomchecklist.pdf",
  "/globalnavigation/advocacy/governmentaffairsdigest/govaffairsadvocacyresources.pdf",
  "/instructor/fo/coursematerials/eth800facilitatorguide.zip",
  "/audiencebarnavigation/chapterservices/studentacademicoutreach/hbcu-outreach-resources(1).zip",
  "/globalnavigation/certifications/forindividuals/cpm/cpmexperiencerequirement.pdf",
  "/globalnavigation/myirem/mycommittees/instructor/eth800facilitatorguide.zip",
  "/globalnavigation/advocacy/congressionalbriefing/2021iremcongressionalbriefinghandouts.pdf",
  "/globalnavigation/certifications/forindividuals/cpm/cpmfast-track.pdf",
  "/international/2019iremjapanannualmeetingregistration.xlsx",
  "/globalnavigation/certifications/forcompanies/amo/amohandbook.pdf",
  "/globalnavigation/certifications/forindividuals/cpm/cpm-checklist.pdf",
  "/globalnavigation/learning/covid19/pandemicreopeningguide.pdf#page=9",
  "/chapterservices/2018instructionsandpoliciesforchapterduescollections.pdf",
  "/globalnavigation/certifications/forindividuals/arm/arm-checklist.pdf",
  "/globalnavigation/myirem/fillin/amo-exec.-cpm-change.pdf",
  "/globalnavigation/learning/covid19/irempandemicguide.pdf#page=14",
  "/globalnavigation/certifications/forcompanies/amo/amo-reaccreditation.pdf",
]
*/