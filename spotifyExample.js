// https://developer.spotify.com/
// https://developer.spotify.com/documentation/web-api/reference/get-playlist

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBLvbgR_5E8Aw9utx4sRI_QEfFnU3lDKdxzZQthdMF7Nax714A6JVn_JF-ThluqnRz--577wU5uIh2ez5isxu6r5-__tAPLtjhu_9UJ70v-tgaoyP2z84yUBpXqGFgoZDNHJMRJMmnP9Vf8EceFvfa-pE1LxlqzzQWqEaTpQYH13nV1z3Dx2JvjHv94wy-dBuokiaQrbu_bZXSQn1YSib9uWxXsqOks8TGmt57prRfQB_SQ52aIrJ5EF81BEmCgO0ihg-aS6gc0kHvESDa_cmBu';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
//   )).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );

const webAPI = async (endpoint, method, body) => {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {Authorization: `Bearer ${token}`},
        method,
        body: JSON.stringify(body)
    })
    return await res.json()
}

const setData = async () => {
    return (await webAPI("v1/me/top/tracks", 'GET')).items
}

const getData = await setData()





// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQDvisS5nbkn9rqhRc4AiWCJ5gwuE1dsnaGYTTXfqMmPnl8ZzJQGDaLFuBCOqJiOuiKQHZIVvSiKvh4t7F1_qwrvy8EvLubOrAbUP0g_1Jl934sm6GPpi53lNWShyS9gCW043DjO-6EtZYtwX-eemHkDQs15RsJT8Mw-6fpRweZA3IVUYj8u1jBbfXJiLycu0GCye507ScOmyDCZRVLiGXxiiWPq282sqThEyHHJz5MW0Mi7n8S6MSYFO00gedgOmZcKhq3gQfzoZZYS0Rw0arlW';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/users/smedjan/playlists', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks
);