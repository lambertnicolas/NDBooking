import Echo from 'laravel-echo';
export default function Listen() {

    const options = {
        broadcaster: 'pusher',
        key: '5bb8e3c6fde8611ddb69',
        cluster: 'eu',
        forceTLS: 'true',
    };

    const echo = new Echo(options);
    echo.channel(`pending_reservation.{date}.{service}.{table_id}`)
        .listen('TableClick', function(data) {
            return (console.log(data))
        });
}
