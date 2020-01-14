const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');

// on production take from HEROKU variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   googleMaps: '${process.env.LNR_API_KEY_GOOGLE_MAPS}',
   apiUrl: '${process.env.LNR_API_ENDPOINT}',
   LNR_API_KEY_FACEBOOK_PLATFORM: '${process.env.LNR_API_KEY_FACEBOOK_PLATFORM}',
   LNR_API_RECAPTCHA_V3_PUBLIC: '${process.env.LNR_API_RECAPTCHA_V3_PUBLIC}',
   production: ${process.env.NODE_ENV == 'production'}
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
