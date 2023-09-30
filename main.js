const btnLogin = document.querySelector("header nav ul .btn-login .login")
const userLogo = document.querySelector(".li-user-logo")
const songContainer = document.querySelector("main #playlists .playlists")

btnLogin.addEventListener('click', () => {
    let token = prompt("Enter API from your account")
    let spotifyAPI = new Spotify(`${token}`)

    spotifyAPI.getRequest(`getProfile`).then(profile => {
        console.log(profile);
        userLogo.querySelector("a").href = profile.external_urls['spotify']
        if(profile.images.length == 0){
            userLogo.querySelector("a").style.width = '24px'
            userLogo.querySelector("a").style.height = '24px'
            userLogo.querySelector('img').src = 'images/img_error.png'
        } else{
            userLogo.querySelector("a").style.width = '48px'
            userLogo.querySelector("a").style.height = '48px'
            userLogo.querySelector('img').src = profile.images[0].url
        }
    })

    spotifyAPI.getRequest('getPlaylists').then(playlists => {
        while (songContainer.hasChildNodes()) {
            songContainer.childNodes.forEach(child => {
                child.remove()
            })
        }
        playlists.forEach(playlist => {
            // console.log(playlist);
            let aPlaylist = document.createElement("a")
            aPlaylist.href = playlist.external_urls['spotify']
            aPlaylist.classList += "playlist"

            let imgPlaylist = document.createElement("img")
            if(playlist.images.length == 0){
                imgPlaylist.src = 'images/img_error.png'
            } else{
                imgPlaylist.src = playlist.images[0].url
            }
            
            imgPlaylist.alt = playlist.name
            aPlaylist.appendChild(imgPlaylist)

            let namePlaylist = document.createElement("h3")
            namePlaylist.classList += "name-playlist"
            namePlaylist.innerHTML = playlist.name
            aPlaylist.appendChild(namePlaylist)

            songContainer.appendChild(aPlaylist)
        });
    })
})