const checkString = (t, e) => {
    if (!(t.split("").length > e)) return t; {
        let r = "";
        t = t.split("");
        for (let l = 0; l < e; l++) r += t[l], l == e - 1 && (r += "...");
        return r
    }
};

const btnLogin = document.querySelector("header nav ul .btn-login .login")
const userLogo = document.querySelector(".li-user-logo")
const songContainer = document.querySelector("main #playlists .playlists")

btnLogin.addEventListener('click', () => {
    const token = prompt("Enter API from your account")
    const spotifyAPI = new Spotify(`${token}`)

    spotifyAPI.getRequest(`getProfile`).then(profile => {
        userLogo.querySelector("a").href = profile.external_urls['spotify']
        if (profile.images.length == 0) {
            userLogo.querySelector('img').src = 'images/user.svg'
            userLogo.querySelector("a").style.width = '24px'
            userLogo.querySelector("a").style.height = '24px'
        } else {
            userLogo.querySelector('img').src = profile.images[0].url
            userLogo.querySelector("a").style.width = '48px'
            userLogo.querySelector("a").style.height = '48px'
        }
    })

    spotifyAPI.getRequest('getPlaylists').then(playlists => {
        while (songContainer.hasChildNodes()) {
            songContainer.childNodes.forEach(child => {
                child.remove()
            })
        }

        console.log(playlists);

        playlists.forEach(playlist => {
            const playlistHref = playlist.external_urls['spotify']
            const playlistImg = () => {
                if (playlist.images.length == 0) {
                    return 'images/img_error.png'
                } else {
                    return playlist.images[0].url
                }
            }
            const playlistName = checkString(playlist.name, 20)

            let aPlaylist = document.createElement("a")
            aPlaylist.href = playlistHref
            aPlaylist.classList += "playlist"

            let imgPlaylist = document.createElement("img")
            imgPlaylist.src = playlistImg()
            imgPlaylist.alt = playlistName
            aPlaylist.appendChild(imgPlaylist)

            let namePlaylist = document.createElement("h3")
            namePlaylist.classList += "name-playlist"
            namePlaylist.innerHTML = playlistName
            aPlaylist.appendChild(namePlaylist)

            songContainer.appendChild(aPlaylist)
        });

        openMusics(document.querySelectorAll("a.playlist"))
    })
})

// const openMusics = playlists => {
//     playlists.forEach(playlist => {
//         playlist.addEventListener('click', event => {
//             event.preventDefault()

//             const newWindow = window.open(playlist.href)
//         })
//     });
// }