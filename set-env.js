/*eslint-disable */
const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');

// on production take from HEROKU variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// `environment.ts` file structure
const envConfigFile = `export const environment = {
    production: ${process.env.NODE_ENV === 'production'},
    LNR_API_ENDPOINT: '${process.env.LNR_API_ENDPOINT}',
    LNR_API_KEY_GOOGLE_MAPS: '${process.env.LNR_API_KEY_GOOGLE_MAPS}',
    LNR_API_KEY_GOOGLE_ANALYTICS: '${process.env.LNR_API_KEY_GOOGLE_ANALYTICS}',
    LNR_API_KEY_BRAINTREE: '${process.env.LNR_API_KEY_BRAINTREE}',
    LNR_API_BRAINTREE_ENV: '${process.env.LNR_API_BRAINTREE_ENV}',
    LNR_API_RECAPTCHA_V3_PUBLIC: '${process.env.LNR_API_RECAPTCHA_V3_PUBLIC}',
    LNR_API_KEY_FACEBOOK_PIXEL: '${process.env.LNR_API_KEY_FACEBOOK_PIXEL}',
    LNR_API_KEY_FACEBOOK_PLATFORM: '${process.env.LNR_API_KEY_FACEBOOK_PLATFORM}',
    LNR_API_KEY_COVIEW: '${process.env.LNR_API_KEY_COVIEW}',
    LNR_ADYEN_ENV: '${process.env.LNR_ADYEN_ENV}',
    LNR_ADYEN_ORIGIN_KEY: '${process.env.LNR_ADYEN_ORIGIN_KEY}',
    LNR_ADYEN_ORIGIN_KEY_DE: '${process.env.LNR_ADYEN_ORIGIN_KEY_DE}',
    LNR_ADYEN_ORIGIN_KEY_NL: '${process.env.LNR_ADYEN_ORIGIN_KEY_NL}',
    LNR_ADYEN_ORIGIN_KEY_ES: '${process.env.LNR_ADYEN_ORIGIN_KEY_ES}',
    LNR_ADYEN_ORIGIN_KEY_IT: '${process.env.LNR_ADYEN_ORIGIN_KEY_IT}',
    LNR_ADYEN_ORIGIN_KEY_FR: '${process.env.LNR_ADYEN_ORIGIN_KEY_FR}',
};`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function successWriteCallback (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
