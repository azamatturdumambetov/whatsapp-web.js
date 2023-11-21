// *** LOCAL AUTH ***
const { Client, LocalAuth } = require('./index');
const qrCode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({clientId: "996707333033"}),
    puppeteer: { 
           headless: false
        },
    session: {}
});

client.on('qr', qr => {
    console.log('Get qr and generate');
    qrCode.generate(qr, {small: true})
});

client.on('ready', async() => {
    console.log('Client is ready');
});
 
client.on('remote_session_saved', () =>{
    console.log('Saved session!!');
});

client.initialize(2); 