const user_token = 'BQB5xIulvWDyh0S0A3e3JU_6Qf48QIuQ84DXvrx5USlOoq043UOFrzGgbWekEHEgteAG8mcpr2SjlzHheDtYZQ2sIolILOL5SahIOVEPTK3FBlcxlVZmQO954Mmp8PMs3hHe-vRrGRPt88xmsBsHiWvUkZm4DvufqUA0-uhVpmEQi6GwXmy9BayAisjiRY1StVydFyOVLBkDSUWyhMRx0eRR_pn1Bxin77wMONa3Guf_J4MejrUyQw06zHgrFqaXvW2yTSQOY3nVNgZEmK_KS3hL'
class APISpotify {
    constructor(token, data) {
        this.token = token
        this.getFromAPI(data)
    }

    async spotifyWebAPI(endpoint, method, body) {
        let ref = this;
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            Authorization: `Bearer ${ref.token}`,
            method,
            body: JSON.stringify(body)
        })
        return await res.json()
    }

    async getTopTracks() {
        return (await this.spotifyWebAPI('v1/me/top/tracks?time_range=short_term', 'GET')).items;
    }

    async getPlaylists() {
        return (await this.spotifyWebAPI('v1/me/playlists', 'GET')).items;
    }

    async getFromAPI(data) {
        let getData = null
        if (this[data]) {
            await this[data]();
        }
        console.log(getData);
    }
}

new APISpotify(user_token, 'getPlaylists')


class Spotify {
    constructor(token) {
        this.token = token
    }

    async getRequest(data) {
        if (this[data]) {
            return (await this[data]())
        }
    }

    async fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    async getPlaylists() {
        return (await this.fetchWebApi('v1/me/playlists?limit=5', 'GET')).items;
    }
}

let spo = new Spotify('BQByjqpFGiTb4x69U3CUQD7ZyUOAK5QqYDn3sk4X6Ay05ofbEHDK6-DkMNh472abS7J21PuKFiXnCWBexyxGSxiRwCfE--jwCAtswfNR9ZUvhbjK87SiKw5xbK41nCVg18qMdX3YkrynYBu7Qs8aNXnTLvVWE4hElLDBYZ2VSDf7Y5VFItbUJ3FEwMSJIztfGPlIy36B8I-eIDjWlIDxGnFKG-TQV9NB3LrdZ1iusY4ogfuAQDWekjNpBzM3Ce4Sym4Mgxy8ygKrO7pCGzAz1qro')
spo.getRequest('getPlaylists').then((tracks) => {
    console.log(tracks);
})

const token = 'BQCBDhCzbmE6KUAZA14KY7D3ixSGdcy6WylaghakXWcMNuq2oQd_jdYXWE8aFMbxNlHSGo3PmH0KkoFYiH8V0Q_OHlh0i5MTezshYeZir5Z0x7XW-_OrojGMquU4tTyL9h0x0wT7-KrApINVzyS2jLgtm--U7Tj6UeCJYzpFkGld5km58RKyoZxD2ZCzGrjfemzqn5SRHyCbjtnvxB1PQpnl8GVYFcD2ZOzIMivuBK51IwdLmlAA0ZiItdNEQLlRCloPvEIbmFCFBr2nUcYR6f_U';
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
        'v1/me/playlists', 'GET'
    )).items;
}

const topTracks = await getTopTracks();
console.log(topTracks);



// const token = 'BQCBDhCzbmE6KUAZA14KY7D3ixSGdcy6WylaghakXWcMNuq2oQd_jdYXWE8aFMbxNlHSGo3PmH0KkoFYiH8V0Q_OHlh0i5MTezshYeZir5Z0x7XW-_OrojGMquU4tTyL9h0x0wT7-KrApINVzyS2jLgtm--U7Tj6UeCJYzpFkGld5km58RKyoZxD2ZCzGrjfemzqn5SRHyCbjtnvxB1PQpnl8GVYFcD2ZOzIMivuBK51IwdLmlAA0ZiItdNEQLlRCloPvEIbmFCFBr2nUcYR6f_U';
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