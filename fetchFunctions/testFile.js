const getSpotifyTrackIDFromURL = (url) => {
    //take url, and pull the string between the 'track/' and the '?'
    var mySubString = str.substring(
        str.indexOf("track/") + 1, 
        str.lastIndexOf("?")
    );

    return mySubString;
}

console.log(getSpotifyTrackIDFromURL('https://open.spotify.com/track/6l5GI26uIIYjil7WtHaXkC?si=f854574d61b84c34'));