Oidrc = {};

Oauth.registerService('oidrc', 2, null, function (query) {

    var response = getTokens(query);
    var expiresAt = (+new Date) + (1000 * parseInt(response.expires_in, 10));
    var accessToken = response.access_token;
    var identity = getUserProfile(accessToken);

    var username = identity.name || identity.email;
    var serviceData = {
        id:           identity.sub,
        accessToken:  accessToken,
        refreshToken: response.refresh_token,
        scope:        response.scope,
        id_token:     response.id_token,
        expiresAt:    expiresAt,
        sessionState: response.session_state,
        name:         username
    };

    _.extend(serviceData, identity);

    var profile = {
        name: username
    };

    if (identity.address) {
        identity.address = JSON.parse(identity.address);
    }

    _.extend(profile, identity);

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

Oidrc.retrieveCredential = function(credentialToken, credentialSecret) {
    var cred = OAuth.retrieveCredential(credentialToken, credentialSecret);
    console.log(cred);
    return cred;
};

Meteor.publish('oidrcSessionState', function(){
    return Meteor.users.find(
        {
            _id: this.userId
        },
        {
            fields: {
                'services.oidrc.sessionState': 1
            }
        }
    );
});
