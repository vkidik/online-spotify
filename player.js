// https://developer.spotify.com/documentation/web-playback-sdk
// Подключение Spotify Web Playback SDK
// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'BQBMA3fO5AwyiI_atp_ognfnLg3vbPdSZ-PYeBvTgWAjJtKT-vzu64ovxzfk67SFUuea0ELrMB6ozzBrJnEeDwuCCK-FWaTOa2isFhOx1HfUMHRCzqxtbQpOR6l9WPL8OZvjdY6A7FsAZiVuPV_JZkgpogpG2zCBeVSd-1ZwdyFSvBkx4pnVc06gAV05pHUvlcVlAdaRz6Z6bOkMrcJGgHqE1XV817TmNa2YqqhWJggFWuMxCv82NFup84rHNh0I19is__AlQto8qPhbWDqZO4kB'; // Замените на ваш доступный токен
//     const player = new Spotify.Player({
//       name: 'My Web Player',
//       getOAuthToken: cb => { cb(token); }
//     });

//     // Включение музыки при успешной аутентификации
//     player.addListener('authentication_error', ({ message }) => {
//       console.error('Authentication error:', message);
//     });

//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);

//       // Воспроизвести музыку
//       playMusic(device_id);
//     });

//     // Подключение к серверам Spotify
//     player.connect();
//   };

//   // Функция для воспроизведения музыки
//   function playMusic(device_id) {
//     fetch('https://api.spotify.com/v1/me/player/play', {
//       method: 'PUT',
//       headers: {
//         'Authorization': 'Bearer BQBMA3fO5AwyiI_atp_ognfnLg3vbPdSZ-PYeBvTgWAjJtKT-vzu64ovxzfk67SFUuea0ELrMB6ozzBrJnEeDwuCCK-FWaTOa2isFhOx1HfUMHRCzqxtbQpOR6l9WPL8OZvjdY6A7FsAZiVuPV_JZkgpogpG2zCBeVSd-1ZwdyFSvBkx4pnVc06gAV05pHUvlcVlAdaRz6Z6bOkMrcJGgHqE1XV817TmNa2YqqhWJggFWuMxCv82NFup84rHNh0I19is__AlQto8qPhbWDqZO4kB', // Замените на ваш доступный токен
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         uris: ['spotify:track:spotify:track:2Ja8tnhGNdOleclV5jBxJU'], // Замените на URI трека, который вы хотите воспроизвести
//         device_id: device_id,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Playback started:', data);
//     })
//     .catch(error => {
//       console.error('Error starting playback:', error);
//     });
//   }


// class MusicPLayer{
//   constructor(token, track){
//     this.token = token
//     this.player = null
//     this.track = track

//     this.onMusic(this.token, this.track)
//   }
//   onMusic(token, track){
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       this.player = new Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); }
//       });
//       // this.player.addListener('authentication_error', ({ message }) => {
//       //   console.error('Authentication error:', message);
//       // });
  
//       this.player.connect().then(succes => {
//         if(succes){
//           console.log("succes");
//           this.player.addListener('ready', ({ device_id })=> {
//             console.log("ready");
//             console.log(device_id);
//           })
//         }
//       })
//     }
//   }
// }