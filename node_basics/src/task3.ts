// Завдання 3
// Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків - посилань,
// читає та аналізує його вміст. Скрипт має створити папку «<JSON_filename>_pages» і для кожного посилання із
// <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі в новоствореній папці

// Після внесення змін треба зробити команду npm run build а щоб запустити код npm run task3

import fs from "fs";
import https from "https";

function checkFolderExists(folderPath: string): boolean {
  try {
    fs.accessSync(folderPath);
    return true;
  } catch (err) {
    return false;
  }
}

const folder = "list_pages";
if (!checkFolderExists(folder)) {
  fs.mkdir(folder, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Folder ${folder} created successfully!`);
    }
  });
}

async function getHtmlContentFromUrl(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
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
  const data: string[] = JSON.parse(
    fs.readFileSync("../node_basics/list.json", "utf8")
  );
  data.forEach(async (url, index) => {
    fs.writeFile(
      `${folder}/page_${index}`,
      await getHtmlContentFromUrl(url),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
} catch (err) {
  console.error(err);
}
