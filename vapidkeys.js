import webPush from 'web-push';
const vapidKeys = webPush.generateVAPIDKeys();
console.log(vapidKeys); // You'll use these in the next steps
