const request = require('request');
const fs = require('fs');


const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
const transcribe = function(text, filePath) {
  fs.writeFile(filePath, text, (error) => {
    if (error) {
      console.log("Failed to write to file: error " + error);
      return;
    }

    console.log(`Downloaded and saved ${text.length} bytes to ${filePath}.`);
  });
};

const fetch = function(url, filePath) {

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);

    setTimeout(() => {
      transcribe(body, filePath);
    }, 1);
  });
};

fetch(url, filePath);