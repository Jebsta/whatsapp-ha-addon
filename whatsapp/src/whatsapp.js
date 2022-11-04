const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--unhandled-rejections=strict'
    ]}
});

module.exports.is_authenticated = false;

client.initialize();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', async(session) => {
    console.log('AUTHENTICATED');
    module.exports.is_authenticated = true;
});

client.on('disconnected', async(session) => {
    console.log('AUTH_FAILURE');
    module.exports.is_authenticated = false;
    client.destroy();
    client.initialize();
});

// client.on('message', (message) => {
//     console.log(message);
// });

module.exports.client = client;
