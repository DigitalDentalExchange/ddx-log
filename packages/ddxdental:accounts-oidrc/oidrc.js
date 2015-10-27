Accounts.oauth.registerService('oidrc');

if (Meteor.isClient) {
    Meteor.loginWithOidrc = function (options, callback) {

        if (! callback && typeof options === 'function') {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Oidrc.requestCredential(options, credentialRequestCompleteCallback);
    };
}
else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.oidrc'],
        forOtherUsers: ['services.oidrc.id']
    });
}
