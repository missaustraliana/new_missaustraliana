fetch("json/settings.json", {
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
    }).then(response => {
    response.json().then(data => {
        //hide the loading indicator
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('sub').innerHTML = data.subheading;
        switch (data.flags.isMessageEnabled) {
            case true:
                document.getElementById('message').innerHTML = data.messageContents;
                document.getElementById('message').hidden = false;
                break
        }
            

    }).catch((error) => {
          })
          //implement later
    });;