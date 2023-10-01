import { spotifyAPI } from '/spotifyData.js'

const checkString = (t, e) => {
    if (!(t.split("").length > e)) return t; {
        let r = "";
        t = t.split("");
        for (let l = 0; l < e; l++) r += t[l], l == e - 1 && (r += "...");
        return r
    }
};

class MainApp{
    constructor(){
        this.token
        this.spotifyAPI
        this.playlists = []
        this.user = null

        this.btnLogin = document.querySelector('header nav ul .btn-login .login')
        this.userLogo = document.querySelector('.li-user-logo')
        this.songContainer = document.querySelector('main #playlists .playlists')

        this.checkLogin()
        this.btnLogin.addEventListener('click', ()=> {this.loginClick()})
    }

    checkLogin(){
        chrome.storage.local.get(["token"]).then(tokenResult => {
            if(tokenResult.token != ""){
                this.token = tokenResult.token
                this.getDataAPI(this.token)
            }
        })
    }

    loginClick(){
        this.token = prompt("Enter API from your account")
        this.getDataAPI(this.token)
    }

    getDataAPI(token){
        chrome.storage.local.set({ token: token }).then(() => {
            console.log("Token is set");
        });
        console.log(token);
        this.spotifyAPI = new spotifyAPI(token)
        this.getProfile(this.spotifyAPI)
        this.getPlaylists(this.spotifyAPI)
    }

    getProfile(api){
        api.getRequest(`getProfile`).then(profile => {
            this.user = profile
            console.log(this.user)

            this.userLogo.querySelector("a").href = profile.external_urls['spotify']
            if (profile.images.length == 0) {
                this.userLogo.querySelector('img').src = 'images/user.svg'
                this.userLogo.querySelector("a").style.width = '24px'
                this.userLogo.querySelector("a").style.height = '24px'
            } else {
                this.userLogo.querySelector('img').src = profile.images[0].url
                this.userLogo.querySelector("a").style.width = '48px'
                this.userLogo.querySelector("a").style.height = '48px'
            }
        })
    }
    getPlaylists(api){
        api.getRequest('getPlaylists').then(playlists => {
            this.playlists = playlists
            console.log(this.playlists);

            while (this.songContainer.hasChildNodes()) {
                this.songContainer.childNodes.forEach(child => {
                    child.remove()
                })
            }
    
            playlists.forEach(playlist => {
                const playlistHref = playlist.external_urls['spotify']
                const playlistImg = () => {
                    if (playlist.images.length == 0) {
                        return 'images/img_error.png'
                    } else {
                        return playlist.images[0].url
                    }
                }
                const playlistName = checkString(playlist.name, 17)
                const playlistId = playlist.id
                const totalTracks = playlist.tracks.total
    
                let aPlaylist = document.createElement("a")
                aPlaylist.href = playlistHref
                // aPlaylist.playlistId = playlistId
                aPlaylist.setAttribute('playlistId', playlistId)
                aPlaylist.setAttribute('totaltracks', totalTracks)
                aPlaylist.classList += "playlist"
    
                let imgPlaylist = document.createElement("img")
                imgPlaylist.src = playlistImg()
                imgPlaylist.alt = playlistName
                aPlaylist.appendChild(imgPlaylist)
    
                let namePlaylist = document.createElement("h3")
                namePlaylist.classList += "name-playlist"
                namePlaylist.innerHTML = playlistName
                aPlaylist.appendChild(namePlaylist)
    
                this.songContainer.appendChild(aPlaylist)
            });

            const openMusics = (playlists) => {
                playlists.forEach(playlist => {
                    playlist.addEventListener('click', event => {
                        event.preventDefault()
                        this.getPlaylistItems(api, playlist)
                    })
                });
            }
    
            openMusics(document.querySelectorAll("a.playlist"))
        })
    }
    getPlaylistItems(api, playlist){
        const playlistId = `${playlist.getAttribute('playlistid')}`
        const totalTracks = `${playlist.getAttribute('totaltracks')}`
        let playlistTracks = [] 
        console.log(playlistId);

        for(let i = 0; i < Math.ceil(totalTracks / 50); i)

        api.getRequest(`getPlaylistItems`, playlistId, totalTracks).then(items => {
            if(items){
                items.forEach(items => {
                    playlistTracks.push(items.track)
                })
            }
            console.log(playlistTracks);
        })
    }
}


// for(let i = 1; i < Math.ceil(230/50); i++){
//     let a = 230
//     a - (a - i * 50)
//     console.log(a)
// }

// let count = 230
// let limitCount = 50

// for(let i = 0; i < Math.ceil(count/limitCount); i++){
//     if(i != Math.floor(count/limitCount)){
//         console.log(limitCount)
//     } else{
//         console.log(count%limitCount)
//     }
// }

window.MainClass = new MainApp()
console.log(MainClass);