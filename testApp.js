/* apple music function*/
const getAppleMusicTrackIDFromURL = (url) => {
    var stringArray = url.split('i=');

    const trackID = stringArray[1]
    return trackID;
    //get apple music track id from url
    //its the last string of digits in the url
}


const getAppleMusicTrackInfoByID = async (trackID) => {
    //get apple music track info by id
    //make a fetch to itunes api with the track id at the end of fetch url after "term=""
    //store the response in a variable
    const appleMusicFetchResponse = await fetch('https://itunes.apple.com/search?term=' + trackID)
    const trackLookupJSON = await appleMusicFetchResponse.json()
    const trackInfo = {
        trackName: trackLookupJSON.results[0].trackCensoredName,
        artistName: trackLookupJSON.results[0].artistName
    }

    /*console.log(trackInfo);*/
    return trackInfo;
}


/*spotify functions*/
const getSpotifyAccessToken = async (CLIENT_ID, CLIENT_SECRET) => {
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
        /*console.log(accessToken);*/
        return accessToken
    })
}


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



/*
const CLIENT_ID = "2307ab2254824b5fb3be6e4fb7cbd63d";
const CLIENT_SECRET = "720ae1646c844ecfaded4ac0203614cc";
*/


// Capture URL of user-entered song from the command line
const determinePlatform = (originalUrl) => {
    // Define our constant values for different platforms.


    const PLATFORMS = [
        'spotify',
        'apple',
    ]

    for (let platform of PLATFORMS) {
        const result = originalUrl.search(platform);
        if (result !== -1) {
            return platform
        }
    }
};

/*(() => {
    // Make sure there is some input when the program is invoked
    const originalUrl = process.argv[2];
    if (!originalUrl) {
        console.error('No URL entered.')
        process.exit();
    }


    const determinedPlatform = determinePlatform(originalUrl);

    //need to return the platform name either Spotify or Apple Music
})();*/





const getTrackURLs = async (URL) => {
    const inputURL = URL
    const inputPlatform = determinePlatform(inputURL) /*need function to return string 'Apple Music' or 'Spotify'*/
    var trackID;
    var trackInfo = {trackName: '', artistName: '', trackURLs: [{platform: inputPlatform, URL: inputURL}]}
    const CLIENT_ID = "2307ab2254824b5fb3be6e4fb7cbd63d";
    const CLIENT_SECRET = "720ae1646c844ecfaded4ac0203614cc";
    const spotifyAccessToken = await getSpotifyAccessToken(CLIENT_ID, CLIENT_SECRET)
    //if (inputPlatform == 'spotify') {
     //   spotifyAccessToken = await getSpotifyAccessToken()
     //   trackID = await getSpotifyTrackIDFromURL(inputURL) 
      //  trackInfo = await getSpotifyTrackInfoByID(trackID, spotifyAccessToken) /*need this function to return an object*/
    //    newURL = await getAppleMusicUrlFromTrackInfo(trackInfo)
     //   trackInfo.trackURLs.push(newURL)
    //}
 
    if (inputPlatform == 'apple') {
        trackID = await getAppleMusicTrackIDFromURL(inputURL)
        var appleMusicTrackInfo = await getAppleMusicTrackInfoByID(trackID) /*need this function to return an object*/
        trackInfo.artistName = appleMusicTrackInfo.artistName;
        trackInfo.trackName = appleMusicTrackInfo.trackName;
        newURL = await getSpotifyURLFromTrackInfo(trackInfo, spotifyAccessToken)
        trackInfo.trackURLs.push({platform: 'spotify', URL: newURL})
    }
    console.log(trackInfo)
    return trackInfo;
}

/*test function*/
getTrackURLs('https://music.apple.com/us/album/groundscore/1652035160?i=1652035180')

