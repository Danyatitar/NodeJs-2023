import fs from "fs";
import https from "https";
function checkFolderExists(folderPath) {
    try {
        fs.accessSync(folderPath);
        return true;
    }
    catch (err) {
        return false;
    }
}
const folder = "list_pages";
if (!checkFolderExists(folder)) {
    fs.mkdir(folder, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`Folder ${folder} created successfully!`);
        }
    });
}
async function getHtmlContentFromUrl(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
            let html = "";
            res.on("data", (chunk) => {
                html += chunk;
            });
            res.on("end", () => {
                resolve(html);
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
// Example usage
// getHtmlContentFromUrl("https://www.example.com")
//   .then((html) => {
//     console.log(html);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
try {
    const data = JSON.parse(fs.readFileSync("../node_basics/list.json", "utf8"));
    data.forEach(async (url, index) => {
        fs.writeFile(`${folder}/page_${index}`, await getHtmlContentFromUrl(url), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=task3.js.map