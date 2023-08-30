const fetch = require("node-fetch");

class AzureAdAuthentication {

    constructor(clientId, clientSecret, tenantId) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tenantId = tenantId;
    }

    async getAccessToken() {
        var body = {
            'client_id': this.clientId,
            'scope': 'https://graph.microsoft.com/.default',
            'client_secret': this.clientSecret,
            'grant_type': 'client_credentials'
        }

        var formBody = [];
        for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = await fetch('https://login.microsoftonline.com/' + this.tenantId + '/oauth2/v2.0/token', {
            method: 'POST',
            body: formBody,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const jsonResponse = await response.json();
        return jsonResponse.access_token;
    }
    
}

module.exports = AzureAdAuthentication