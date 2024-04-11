import fs from 'fs';
import qr from 'qr-image';

async function promptForURL() {
  const inquirer = await import('inquirer');
  const answers = await inquirer.default.prompt([{
    type: 'input',
    name: 'url',
    message: 'Enter the URL you want to generate a QR code for:',
    validate: function(value) {
      return value.startsWith('http://') || value.startsWith('https://') ? true : 'Please enter a valid URL.';
    }
  }]);
  return answers.url;
}

function generateQRCode(url) {
  const qrSVG = qr.image(url, { type: 'png' });
  qrSVG.pipe(fs.createWriteStream('qr_img.png'));
  console.log('QR code generated successfully and saved as qr_img.png!');
}

function saveURLToFile(url) {
  fs.writeFile('URL.txt', url, (err) => {
    if (err) throw err;
    console.log('URL saved to URL.txt');
  });
}

async function main() {
  try {
    const url = await promptForURL();
    generateQRCode(url);
    saveURLToFile(url);
  } catch (error) {
    console.error(error);
  }
}

main();
