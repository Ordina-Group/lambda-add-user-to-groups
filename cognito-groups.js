const { AdminAddUserToGroupCommand, CreateGroupCommand } = require("@aws-sdk/client-cognito-identity-provider");

class CognitoGroups {
    constructor(client) {
        this.client = client;
    }

    async createGroup(group, userPool) {
        var input = {
            GroupName: group,
            UserPoolId: userPool
        };

        const command = new CreateGroupCommand(input);
        try {
            const response = await this.client.send(command);
            console.log('Created new group: ' + group);
        } catch(error) {
            //console.log(error.$metadata);
        }
    }

    async addUserToGroup(group, userPool, user) {
        var input = {
            GroupName: group,
            UserPoolId: userPool,  
            Username: user
        };

        const command = new AdminAddUserToGroupCommand(input);
        const response = await this.client.send(command);

        if (response.$metadata.httpStatusCode == 200) {
            console.log('Added user ' + user + ' to group ' + group);
        } else {
            console.error('Failed to add user ' + user + ' to group ' + group);
        }
    }
}

module.exports = CognitoGroups