var webPush = require('web-push');

const vapidKeys = {
    'publicKey':'BDETwfhDxTfBfCr_IsNDQa9Bgv78-Zm_CrkM9_2IMSrpVNornwW6kNGNIcsEbiaSQxOnHBgqO_4vgjdUGVPCWX0',
    'privateKey':'-eCNDwCGoOmdZ7-i7V-yTeDmJVrHLvOLezNGGEVDDCE'
};

webPush.setVapidDetails(
    'mailto:ziyanassegaf20@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    'endpoint':'https://fcm.googleapis.com/fcm/send/e-Q4xri-5dA:APA91bGiZS7uGw9Em-jdxC9Ra11YeL7zYY4R4JBIUN2x5UyUDS0Ni3HWawHAT-BUVsbO9aiqJI3rLRaNGnqNVVzEs9C9cvIohqjZnLa77N__LlGjSCT7eMQOatNwptP2IqH7RUlJxyoP',
    'keys': {
        'p256dh':'BHICBcAlhIcwxV2Y7WhRgZt4S6SnOrYsKO+8LTrrUCZIGPvXQZeedkjNEcCXFu3duiGsVTcTBxtpbR53/jpMgHA=',
        'auth':'rHLNHm3ill6A2xP231eF4w=='
    }
};
var payload = 'Selamat, aplikasi anda sudah dapat menerima push notification';

var options = {
    gcmAPIKey: '286784193057',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);