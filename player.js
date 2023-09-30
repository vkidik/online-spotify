// // Подключение Spotify Web Playback SDK
// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'ВАШ_ACCESS_TOKEN'; // Замените на ваш доступный токен
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
//         'Authorization': 'Bearer ВАШ_ACCESS_TOKEN', // Замените на ваш доступный токен
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         uris: ['spotify:track:ВАШ_ИДЕНТИФИКАТОР_ТРЕКА'], // Замените на URI трека, который вы хотите воспроизвести
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