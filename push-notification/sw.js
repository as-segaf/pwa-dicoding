self.addEventListener('notificationclick', function(event) {
    // menutup notifikasi yang sudah di click
    event.notification.close();

    ///


    if (!event.action) {
        // pengguna menyentuh area notifikasi diluar action
        console.log('Notification clik.');
        return;
    }

    switch (event.action) {
        case 'yes-action':
            console.log('pengguna memilih action yes');
            // buka tab baru
            clients.openWindow('https://google.com');
            break;
        case 'no-action':
            console.log('pengguna memilih action no');
            break;
        default:
            console.log(`action yg di pilih tidak di kenal: '${event.action}'` );
            break;
    }
});