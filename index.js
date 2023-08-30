const { CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider");
const AzureAdAuthentication = require("./azure-ad-authentication.js")
const AzureAdGroups = require("./azure-ad-groups.js")
const CognitoGroups = require("./cognito-groups.js");

exports.handler = async function(event, context, callback) {

    const clientId = "<CLIENT_ID>"
    const clientSecret = "<CLIENT_SECRET>"
    const tenantId = "<CLIENT_TENANT_ID>"

    const azureAdAuthentication = new AzureAdAuthentication(clientId, clientSecret, tenantId);
    const accessToken = await azureAdAuthentication.getAccessToken();

    const email = event.request.userAttributes.email;

    const azureAdGroups = new AzureAdGroups(accessToken, email);
    const userId = await azureAdGroups.getUserId();
    const groups = await azureAdGroups.getUserGroups(userId);

    const cognitoClient = new CognitoIdentityProviderClient({ region: event.region });
    const cognitoGroups = new CognitoGroups(cognitoClient);

    for (const group of groups) {
        await cognitoGroups.createGroup(group, event.userPoolId);
        await cognitoGroups.addUserToGroup(group, event.userPoolId, event.userName);
    }

    return event;
}