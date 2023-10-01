export class spotifyAPI {
    constructor(token) {
        this.token = token
    }

    async getRequest(data, ...args) {
        if (this[data]) {
            // return (await this[data]())
            return (await this[data].apply(this, args))
        }
    }

    async getWebAPI(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    async getPlaylists() {
        return (await this.getWebAPI('v1/me/playlists?limit=50', 'GET')).items;
    }

    async getPlaylistItems(playlistId, count) {
        return (await this.getWebAPI(`v1/playlists/${playlistId}/tracks?limit=${count}`, 'GET')).items;
    }

    async getTopTracks() {
        return (await this.getWebAPI('v1/me/top/tracks?time_range=short_term', 'GET')).items;
    }

    async getProfile() {
        return (await this.getWebAPI(`v1/me`, 'GET'))
    }

    // async getPlayer(data) {
    //     const res = await fetch('https://api.spotify.com/v1/me/player/play', {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `Bearer ${this.token}`,
    //             'Content-Type': 'application/json' 
    //         },
    //         body: JSON.stringify(
    //             {
    //                 urls: ['spotify:track']
    //             }
    //         ) 
    //     })
    // }
}