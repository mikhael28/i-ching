const fs = require('fs');
const requireText = require('require-text');
let arrayOfCommentary = [];
function txt2Json(id) {
  let index = requireText(`../app/judgements/${id}.txt`, require);
  // Prints contents of ./index.html file, which resides
  // in the same directory as this source code file.

  // this is a great start, it removes quite a lot of the noise.
  let splitByDiv = index.split(`\r\r`);

  let initialMap = splitByDiv.map((str, idx) => {
    return str.replace('</div>', '');
  });

  let firstMap = initialMap.map((str1, idx) => {
    return str1.replace(`<div class="line-number-1">`, '');
  });

  let secondMap = firstMap.map((str2, idx) => {
    return str2.replace(`<div class="line-number-2">`, '');
  });

  let thirdMap = secondMap.map((str3, idx) => {
    return str3.replace(`<div class="line-number-3">`, '');
  });

  let fourthMap = thirdMap.map((str4, idx) => {
    return str4.replace(`<div class="line-number-4">`, '');
  });

  let fifthMap = fourthMap.map((str5, idx) => {
    return str5.replace(`<div class="line-number-5">`, '');
  });

  let sixthMap = fifthMap.map((str6, idx) => {
    return str6.replace(`<div class="line-number-6">`, '');
  });

  // At this point, I have stripped out all of the div markings, and now have an impressive array of strings.
  // What I want to do now, is to separate the title, the above below, the summary,
  // the JUDGEMENT
  // the IMAGE
  // THE LINES

  let hexNum = sixthMap[0].split('.');

  let hexagram = {
    num: parseInt(hexNum[0], 10),
    title: sixthMap[0],
    heaven: sixthMap[1],
    summary: sixthMap[2],
    judgement: [],
    image: [],
    lines: [],
  };

  let tempBeginningJIndex;
  let tempEndJIndex;

  let tempBeginningImageIndex;
  let tempEndImageIndex;

  let tempBeginningLIndex;
  let tempEndLIndex;

  for (let j = 0; j < sixthMap.length; j++) {
    if (sixthMap[j] === 'THE JUDGMENT') {
      tempBeginningJIndex = j + 1;
    }
    if (sixthMap[j] === 'THE IMAGE') {
      tempEndJIndex = j - 1;
      tempBeginningImageIndex = j + 1;
    }

    if (sixthMap[j] === 'THE LINES') {
      tempBeginningLIndex = j + 1;
      tempEndImageIndex = j - 1;
      tempEndLIndex = sixthMap.length - 1;
    }
  }

  let judgementArray = sixthMap.slice(tempBeginningJIndex, tempEndJIndex);
  let imageArray = sixthMap.slice(tempBeginningImageIndex, tempEndImageIndex);
  let linesArray = sixthMap.slice(tempBeginningLIndex, tempEndLIndex);

  hexagram.judgement = judgementArray;
  hexagram.image = imageArray;
  hexagram.lines = linesArray;

  console.log(JSON.stringify(hexagram, null, 4));

  arrayOfCommentary.push(hexagram);
}

async function ls(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    let splitDirectoryName = dirent.name.split('.');
    txt2Json(splitDirectoryName[0]);
  }
  fs.writeFile('commentary.json', JSON.stringify(arrayOfCommentary), err => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved.');
  });
}

ls('../app/judgements').catch(console.error);
