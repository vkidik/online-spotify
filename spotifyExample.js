// https://developer.spotify.com/
// https://developer.spotify.com/documentation/web-api/reference/get-playlist

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQALz7WPUDs69rrCAsGVKp6lIKhqt5gRbT_uaHIFp2Ipl1UhCkVq8NyLmzPW569IoH6USfPyFSWkzTs3nQz3vLkJ1ipUfbmg9j4_kPhi7ZrMwhBKD0UuMK5ZSsBqoiJyOjgmFyUZetBJGT35rwQJwxdDjh4zU7BtqbrOnYsEpWEdJd15ce-751wE7eIghQoLuujfVgGhdaefLg0njZU1_nU_xpmyuKC67zfSnU9u2-awZMjJKEQ4Sauc7gLEhSuNU6JtJulFhyS3JA3jTA5Dqden';
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
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
}

const topTracks = await getTopTracks();
console.log(
    topTracks ? .map(
        ({ name, artists }) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);