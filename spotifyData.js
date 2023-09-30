class Spotify {
    constructor(token) {
        this.token = token
    }

    async getRequest(data) {
        if (this[data]) {
            return (await this[data]())
        }
    }

    async getWebAPI(endpoint, method, body) {
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
        return (await this.getWebAPI('v1/me/playlists?limit=50', 'GET')).items;
    }

    async getTopTracks() {
        return (await this.getWebAPI('v1/me/top/tracks?time_range=short_term', 'GET')).items;
    }

    async getProfile(){
        return (await this.getWebAPI(`v1/me`, 'GET'))
    }
}


// let spotifyAPI = new Spotify(``)
//     spotifyAPI.getRequest('getPlaylists').then(playlists => {
//         for(playlist of playlists){
//             console.log(playlist)
//         }
//     })