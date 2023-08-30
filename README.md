# lambda-add-user-to-groups

## How it works

Example lambda sync Azure AD groups to AWS cognito.

This code can be invoked after an user authenticates or gives account confirmation to AWS Cognito.

First, we authenticate to Azure AD with our client_id, client_secret and tenant_id.
We used the given email address to get the user id for that specific user in Azure AD.
After getting the user id, we will get all user groups for that specific user id from Azure AD.

If the user group doesn't exist on AWS Cognito, this will be automatically created before adding the user.

## Deployment
Run `npm install` before deploying the Lambda.
