export class Player{
    constructor(token){
        this.token = token
    }

    onMusic(button){
        const token = `${this.token}`
        window.onSpotifyWebPlaybackSDKReady = () => {
            window.player = new Spotify.Player({
                name: 'KOMP Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            console.log("KOMP Player");

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            button.onclick = () => {
              player.togglePlay();
            };

            player.connect();
        }
    }
}