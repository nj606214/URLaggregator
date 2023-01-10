//FETCH REQUESTS TO SPOTIFY
//pull track name and artist from url getSpotifyUrlFromTrack
//pull url from track name and artist getSpotifyTrackFromUrl


//first need to set up CLIENT_ID and CLIENT_SECRET, these are required for authentication when fetching the api
//eventually will move these to a .env file
const CLIENT_ID = "2307ab2254824b5fb3be6e4fb7cbd63d";
const CLIENT_SECRET = "720ae1646c844ecfaded4ac0203614cc";


//need to add api Search Parameters to a global variable probably in the app.js file itself




//RETRIEVE AUTHORIZATION TOKEN//

const getSpotifyAccessToken = async () => {
    var authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    
    let accessToken;

    return fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => {
        accessToken = data.access_token;
        console.log(accessToken);
        return accessToken
    })
}

/*test function*/
/*getSpotifyAccessToken()*/








//DESCTRUCTURE SPOTIFY LINK TO PULL TRACK ID
//use this function when user passes a spotify url

const getSpotifyTrackIDFromURL = (url) => {
    //take url, and pull the string between the 'track/' and the '?'
    var stringArray = url.split('track/');

    const newString = stringArray[1].split('?');
    const trackID = newString[0];
    return trackID;
}





//GET TRACK INFO WITH SONGID//
//use this function when user passes spotify url 
const getSpotifyTrackInfoByID = async (token) => {
    const songID = '1bDbXMyjaUIooNwFE9wn0N';
    //should put these search parameters in a global variable and pass it in as a function parameter
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const trackLookupResults = await fetch('https://api.spotify.com/v1/tracks/' + songID/* + '&type=track'*/, searchParameters)
    if (trackLookupResults.status !== 200) {
        console.error("Something went wrong")
        console.log(trackLookupResults)
    }
    const trackLookupJson = await trackLookupResults.json()
    const trackInfo = {
        trackName: trackLookupJson.name,
        artistName: trackLookupJson.album.artists[0].name
    }
    return trackInfo;
        // .then(data => console.log(data))
        //need to destructure the response to return track name, artist name, 
}

/*test function*/
getSpotifyTrackInfoByID('BQCXl79Cl0OHbSza--CyGBPpMRl5TUt8Frqi2alm3Mi6hQO0H5fsNYZS3ufS2M8sAELesA-BjQwOqLtvk_tJ_H3PsR49vVP6ci6GMlX3xKx8d-M0qbM')





//GET SPOTIFY URL WITH TRACK INFO//
//Use this function after we get the track info when users pass a url from a non-spotify streaming platform
const getSpotifyURLFromTrackInfo = async (trackInfo, token) => {
    const trackName = trackInfo.trackName
    const artistName = trackInfo.artistName
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const trackLookupResults = await fetch('https://api.spotify.com/v1/search?q=track:"' + trackName + '"%20artist:"' + artistName + '"&type=track', searchParameters)
    if (trackLookupResults.status !== 200) {
        console.error("Something went wrong")
        console.log(trackLookupResults)
    }
    const trackLookupJson = await trackLookupResults.json()
    const trackURL = trackLookupJson.tracks.items[0].external_urls.spotify
    
    return trackURL;
    //search track name and artist in spotify api search 'https://api.spotify.com/v1/search' 
    //pull externalURL from search result
}

/*test function*/
console.log(getSpotifyURLFromTrackInfo({trackName: 'Pretty Peggy-O', artistName: 'Bob Dylan'}, 'BQCXl79Cl0OHbSza--CyGBPpMRl5TUt8Frqi2alm3Mi6hQO0H5fsNYZS3ufS2M8sAELesA-BjQwOqLtvk_tJ_H3PsR49vVP6ci6GMlX3xKx8d-M0qbM'))



/*export functions*/
export { 
        getSpotifyAccessToken,
        getSpotifyTrackIDFromURL,
        getSpotifyTrackInfoByID,
        getSpotifyURLFromTrackInfo
}



