Oidrc = {};

Oauth.registerService('oidrc', 2, null, function (query) {

    var tokens = getTokens(query);
    var user = getUserProfile(tokens.access_token);

    var username = user.name || user.email;
    var serviceData = {
        id:           user.sub,
        accessToken:  tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope:        tokens.scope,
        id_token:     tokens.id_token,
        name:         username
    };

    _.extend(serviceData, user);

    var profile = {
        name: username
    };

    if (user.address) {
        user.address = JSON.parse(user.address);
    }

    _.extend(profile, user);

    return {
        serviceData: serviceData,
        options: {
            profile: profile
        }
    };
});

var userAgent = 'Meteor';
if (Meteor.release) {
    userAgent += '/' + Meteor.release;
}

var getTokens = function (query) {
    var config = getConfiguration();
    var response;
    try {

        response = HTTP.post(
            'https://' + config.domain + config.tokenEndpoint, {
                headers: {
                    Accept: 'application/json',
                    'User-Agent': userAgent
                },
                params: {
                    code:           query.code,
                    //state:          query.state,
                    client_id:      config.clientId,
                    client_secret:  config.clientSecret,
                    grant_type:     'authorization_code',
                    redirect_uri:   Meteor.absoluteUrl('_oauth/oidrc?close')
                }
            });
    }
    catch (err) {
        throw _.extend(
            new Error('Failed to complete OAuth handshake with OIDOP. ' + err.message), { response: err.response });
    }

    if (response.data.error) { // if the http response was a json object with an error attribute
        throw new Error('Failed to complete OAuth handshake with OIDOP. ' + response.data.error);
    }

    return response.data;
};

var getUserProfile = function (accessToken) {
    var config = getConfiguration();
    var response;
    try {
        response = HTTP.get(
            'https://' + config.domain + config.userinfoEndpoint, {
                headers: {
                    'User-Agent': userAgent
                },
                params: {
                    access_token: accessToken
                }
            });
    }
    catch (err) {
        throw _.extend(
            new Error('Failed to fetch user profile from OIDOP. ' + err.message), { response: err.response });
    }

    return response.data;
};

var getConfiguration = function () {
    var config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });
    if (!config) {
        throw new ServiceConfiguration.ConfigError('Service not configured.');
    }

    return config;
};

Oidrc.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
