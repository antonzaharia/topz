class Fetch {
    static basic(link="http://localhost:3000", callback) {
        fetch(link)
        .then(function(response){
            return response.json();
        })
        .then(function(tops){
            callback(tops)
        })
    }
    // Fetch call with only link and callback as parameters 

    static complex(httpVerb, body={}, link, callback) {
        let configObj = {
            method: `${httpVerb}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(link, configObj)
        .then(response => response.json())
        .then(result => {
            callback(result)
        }).catch(function(err) {
            console.log(err)
            let error = new Error("Please complete all the fields")
            error.show();
        });
    }
}






