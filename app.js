/*eslint linebreak-style: ["error", "windows"]*/

// Client
const { Client, RemoteAuth } = require('./index');
//const qrCode = require('qrcode-terminal');
require('dotenv').config();

// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

// Server app
// const express = require("express");
// const http = require("http");
// const app = express();
// const port = 3001;
// const server = http.createServer(app);

// app.listen(port, () => {
//     console.log("Server listening on the port::${port}");
// })

// Server cors
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// })

// const socket = io.connect("http://localhost:3001", {});

// server.listen(3000, () => {
//     console.log("Listening on *:3000");
// })

// const getWhatsAppSession = (id, socket) =>{
//     const client = new Client({
//         puppeteer: {
//             headles: false
//         },
//         authStrategy: new RemoteAuth({
//             clientId: id,
//             store: store
//         })
//     });

//     client.on("ready", () => {
//         console.log("client is ready");
//         socket.emit("ready", {
//             id,
//             message: "Client is ready"
//         });
//     });

//     client.on("qr", (qr) => {
//         socket.emit("qr", {
//             qr,
//             message: "your got logged out abd here is QR code"
//         });
//     });
// }

// Client
// Load the session data
let store;
mongoose.connect(process.env.MONGODB_URI_LOCAL).then(() => {
    console.log('DB Connected');
    store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        puppeteer: { 
            headless: false
        },
        authStrategy: new RemoteAuth({
            store: store,
            clientId: '996707333033',
            backupSyncIntervalMs: 60000
        })
    });

    // client.on('qr', qr => {
    //     console.log('Get qr and generate');
    //     qrCode.generate(qr, {small: true});
    //     //console.log(qr);
    // });

    client.on('code', code => {
        console.log(code);
    });

    client.on('authenticated',() =>{
        console.log('Authenticated');
    } );

    client.on('ready', async() => {
        console.log('Client is ready');
    });
 
    client.on('remote_session_saved', () =>{
        console.log('Saved session!!');
    });

    client.initialize(1);
});