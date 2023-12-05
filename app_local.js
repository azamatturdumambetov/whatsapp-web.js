// *** LOCAL AUTH ***
const { Client, LocalAuth } = require('./index');
const qrCode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "996707333033" }),
    puppeteer: {
        headless: false
    },
    session: {}
});

// client.on('qr', qr => {
//     console.log('Get qr and generate');
//     qrCode.generate(qr, {small: true})
// });

client.on('code', code => {
    console.log(code);
});

client.on('authenticated', () => {
    console.log('Authenticated');
});

client.on('ready', async () => {
    console.log('Client is ready');
});

// client.on('remote_session_saved', () =>{
//     console.log('Saved session!!');
// });

client.on('message', message => {
    console.log(message.body);
});

client.initialize(1);


// // Number where you want to send the message.
// const number = "+996226858502";

// // Your message.
// const text = "Hey john";

// // Getting chatId from the number.
// // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
// const chatId = number.substring(1) + "@c.us";

// // Sending message
// client.sendMessage(chatId, text); 