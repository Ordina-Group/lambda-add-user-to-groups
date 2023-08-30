const fetch = require("node-fetch");

class AzureAdGroups {
    
    constructor(accessToken, email) {
        this.accessToken = accessToken;
        this.email = email;
    }

    async getUserId() {
        const response = await fetch("https://graph.microsoft.com/v1.0/users?$filter=mail eq '" + this.email + "'", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.accessToken
            }
        });

        const jsonResponse = await response.json();
        const id = jsonResponse.value[0].id;
        return id;
    }
    
    async getUserGroups(id) {
        const groups = [];
        const response = await fetch('https://graph.microsoft.com/v1.0/users/' + id + '/memberOf', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.accessToken
            }
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        jsonResponse.value.forEach(function (group) {
            const groupName = group.displayName;
            groups.push(groupName.toUpperCase().replaceAll(' ', '_'));
        });

        return groups;
    }
}

module.exports = AzureAdGroups
