Template.configureLoginServiceDialogForOidrc.helpers({
    siteUrl: function () {
        return Meteor.absoluteUrl();
    }
});

Template.configureLoginServiceDialogForOidrc.fields = function () {
    return [
        { property: 'domain', label: 'Domain'},
        { property: 'clientId', label: 'Client ID'},
        { property: 'clientSecret', label: 'Client Secret'},
        { property: 'authorizationEndpoint', label: 'Authorization Endpoint'},
        { property: 'tokenEndpoint', label: 'Token Endpoint'},
        { property: 'userinfoEndpoint', label: 'Userinfo Endpoint'}
    ];
};
