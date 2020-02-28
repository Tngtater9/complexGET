const APIkey = 'hr2If57fo9ztiehpolNKVstIybyRB6xXQBhhyqI4';
// const options = {headers new Header    'X-Api-Key': APIkey};
const url = 'https://developer.nps.gov/api/v1/parks'

function getQueryString (params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(parks){
    let results = '';
    for (let i = 0; i < parks.length; i++){
        let parkInfo = `<li><h4>${parks[i].fullName}</h4><h6>${parks[i].designation}</h6><a href="${parks[i].url}" target="_blank">${parks[i].url}</a><p>${parks[i].description}</p><a href="${parks[i].directionsUrl}" target="_blank">Directions to ${parks[i].fullName}</a></li>`;
        console.log(parkInfo);
        results += parkInfo;
        console.log(results);
    }
    $('#results').html(results);
    $('#result-section').show();

}

function getParks (query, maxResults){
    let params = {
        stateCode : query,
        limit: maxResults,
        api_key: APIkey
    }
    let queryString = getQueryString(params);

    let lookupURL = url + '?' + queryString;

    fetch(lookupURL)
        .then(response => {
            if(response.ok){
               return response.json();
            }else{
                throw new Error(response.statusText);
            }
        })
        .then(responseJSON => displayResults(responseJSON.data))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`)
        });
}

function watchForm (){
    $('#result-section').hide();
    $('button').click(function(event){
        const searchTerm = $('#search-term').val();
        let maxResults = $('#result-quantity').val();
        
        if (maxResults === ""){
            maxResults = 10;
        }
        console.log(maxResults);
        getParks(searchTerm, maxResults);
    })
}

$(watchForm());