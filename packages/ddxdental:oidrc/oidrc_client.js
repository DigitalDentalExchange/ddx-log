Oidrc = {};

// Request credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on error.
Oidrc.requestCredential = function (options, credentialRequestCompleteCallback) {

    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });

    if (!config) {
        credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError('Service not configured.'));
        return;
    }

    var credentialToken = Random.secret();
    var loginStyle = OAuth._loginStyle('oidrc', config, options);

    options = options || {};
    options.response_type = options.response_type || 'code';
    options.client_id = config.clientId;
    options.redirect_uri = OAuth._redirectUri('oidrc', config);
    options.state = OAuth._stateParam(loginStyle, credentialToken, options.redirectUrl);

    var scope = config.requestPermissions || ['openid', 'profile', 'offline_access'];

    options.scope = scope.join(' ');

    if (config.loginStyle && config.loginStyle == 'popup') {
        options.display = 'popup';
    }

    var loginUrl = 'https://' + config.domain + config.authorizationEndpoint + '?';

    for (var k in options) {
        loginUrl += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(options[k]);
    }

    options.popupOptions = options.popupOptions || {};
    var popupOptions = {
        width:  options.popupOptions.width || 320,
        height: options.popupOptions.height || 450
    };

    Oauth.launchLogin({
        loginService: 'oidrc',
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: popupOptions
    });
};

Meteor.subscribe('oidrcSessionState');
