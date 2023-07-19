const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = '360491804101-eltjjjk0t4ok71cb8str3i2orfks9cm4.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04-FKuI3l_jDoCgYIARAAGAQSNwF-L9IrV8o1Ivyb8iy8Cwa1r9gad5VFEcyx40FLKW4L7CF01bg-IYiFUPHFki4nPtuH5PClU_4';


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


async function sendMail(){

    try {
       const accessToken = await oAuth2Client.getAccessToken()

       const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'omohsam81@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
       })

       const mailOption= {
            from: 'HI Testing Program <omohsam81@gmail.com>',
            to: 'omohsam81@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
       };

        const result = await transport.sendMail(mailOption);
        return result;

    } catch (error) {
        return error
    }
}

sendMail().then((result)=> console.log ('Email sent...', result)).catch((error) => console.log(error.message));
