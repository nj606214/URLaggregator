//setup  authorization

//GET SONG ID FROM APPLE MUSIC LINK
//use this when user passes apple music link
const getAppleMusicTrackIDFromURL = (url) => {
    var stringArray = url.split('i=');

    const trackID = stringArray[1]
    return trackID;
    //get apple music track id from url
    //its the last string of digits in the url
}




//GET TRACK INFO FROM APPLE MUSIC SONG ID
//use this function when user passes apple music link

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

    console.log(trackInfo);
    return trackInfo;
}

/*test function*/






//GET APPLE MUSIC URL FROM TRACK INFO
const getAppleMusicUrlFromTrackInfo = (trackInfo) => {
    //search track info in applemusic api and pull url 
}
//use this function when user passes non-apple music link






export {
    getAppleMusicTrackIDFromURL,
    getAppleMusicTrackInfoByID,
}


