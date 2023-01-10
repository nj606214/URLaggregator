//import all necessary functions and files for app to run
import { 
    getAppleMusicTrackIDFromURL,
    getAppleMusicTrackInfoByID
} from './fetchFunctions/appleMusicFetch.js';

import { 
    getSpotifyAccessToken,
    getSpotifyTrackIDFromURL,
    getSpotifyTrackInfoByID,
    getSpotifyURLFromTrackInfo
} from './fetchFunctions/spotifyFetch.js';

//first need to set up CLIENT_ID and CLIENT_SECRET, these are required for authentication when fetching the api
//eventually will move these to a .env file
const CLIENT_ID = "2307ab2254824b5fb3be6e4fb7cbd63d";
const CLIENT_SECRET = "720ae1646c844ecfaded4ac0203614cc";



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





//Create master function that handles the input and returns track name, artist, and other platforms url to that track

//first we store the url string in a variable inputURL
//then see where it came from and save that in a variable inputPlatform

//if inputPlatform = spotify, getSpotifyTrackIDFromURL(inputURL), if inputPlatform = apple, getAppleMusicTrackIdFromUrl(inputURL)
//save trackID in variable trackID

//if inputPlatform = spotify, getSpotifyTrackInfoByID(trackID), if apple, getAppleMusicTrackInfoByID(trackID)
//save that track info in an object trackInfo {name: coolTrack, artist: coolArtist, trackURLs: []}

//if inputPlatform = spotify, getAppleMusicURLFromTrackInfo(trackInfo), if apple, getSpotifyURLFromTrackInfo(trackInfo)
//save that url in an object {platform: 'spotify/appleMusic', trackURL: 'http://streamingplatform.com/song'} 
//and push it to the trackURLs array in the trackInfo object 

//return trackInfo 




const getTrackURLs = async (URL) => {
    const inputURL = URL
    const inputPlatform = determinePlatform(inputURL) /*need function to return string 'Apple Music' or 'Spotify'*/
    var trackID;
    var trackInfo = {trackName: '', artistName: '', trackURLs: [{platform: inputPlatform, URL: inputURL}]}
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
        newURL = await getSpotifyURLFromTrackInfo(trackInfo)
        trackInfo.trackURLs.push(newURL)
    }
    console.log(trackInfo)
    return trackInfo;
}

getTrackURLs('https://music.apple.com/us/album/pretty-peggy-o/159476000?i=159476071')

