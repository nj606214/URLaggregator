//get authentication token



//link to auth api 'https://api.amazon.com/auth/o2/token'
//need to pass this authParameters in requests to the auth api
const getAmazonAuthorizationToken = async () => {
    /*set up object that will be encoded and passed as the form body*/
    var details = {
        'grant_type': 'client_credentials',
        'client_id': 'amzn1.application-oa2-client.e43200eb54244b039b964edd5914be0e',
        'client_secret': 'ca8de8b6db897425af14df479945f6b3b8a30750d23d1652c5ec060ad832a8b2',
        'scope': 'appstore::apps:readwrite'
    };
    /*loop through the details object, encoding each key and value and adding it
    to the formBody array*/
    var formBody = [];
    for (const property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue);
    }
    /*turn formBody into a string*/
    /*for some reason we pass the body as a string, probably something to do with encoding*/
    formBody = formBody.join("&");
    // console.log(formBody)
    const authParameters = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'     
        },
        method: "POST",
        body: formBody
    }

    const fetchResponse = await fetch('https://api.amazon.com/auth/o2/token', authParameters)
    const fetchResponseJSON =  await fetchResponse.json();
    // console.log(fetchResponseJSON);
    const accessToken = fetchResponseJSON.access_token;
    return accessToken;
}

/*getAmazonAuthorizationToken();*/

/*const amazonAuthToken = 'Atc|MQEBIBLa9H3IYn5ghXns0HFnMGAXbETJTQdcw0mY7D_Fb39OLnf6jTWYiMe0L6nwgrEMAhsRngSxqspXJSVwm5EZWXej85dwG_unEJCLUwyQfH9EHSe46J-69Nqt3IeOqNcz5lZnMsGQlYLdhUHhINVZnrTRuIV9s2HNI0o2UvqUG7hRF3mw-RugGPYPfi9hTR2DYtg2N-RaMMugg_xcW5wSTOfo4Za9zcXadkqz_yp-sk3C8tcUN6KbrreKk1COYOs0JU8';*/
const clientID = 'amzn1.application-oa2-client.e43200eb54244b039b964edd5914be0e';
const baseUrl = 'https://api.music.amazon.dev/'
//search amazon music API with song object and pull url
const getAmazonMusicLinkFromSongInfo = async (clientID, authorizationToken) => {
    const searchQuery = {
        searchFilters: [
            {
                field: 'name',
                query: 'soja'
            }
        ]
    }
    
    
    const searchParameters = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + authorizationToken,
            'x-api-key': clientID,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchQuery)
    }
    console.log(searchParameters)

    const amazonMusicFetchResponse = await fetch('https://api.music.amazon.dev/v1/search/tracks', searchParameters)
    const amazonMusicFetchResponseJson = await amazonMusicFetchResponse.json()
    // console.log('Amazon fetch response json: \n')
    // console.log(amazonMusicFetchResponseJson)
    return amazonMusicFetchResponseJson;
}



// getAmazonMusicLinkFromSongInfo(clientID);
const authorizationToken = await getAmazonAuthorizationToken();
const results = await getAmazonMusicLinkFromSongInfo(clientID, authorizationToken);
console.log(results);










