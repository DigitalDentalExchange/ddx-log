Meteor.methods({
    refreshActivityLog: function() {

        var doCall = function() {

            var user = Meteor.user();

            if (!user) {
                return;
            }

            var config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });

            try {
                var logData = HTTP.get(
                    'https://' + config.domain + '/service/practice_portal/activity-log', {
                        params: {
                            access_token: user.services.oidrc.accessToken,
                            format: 'json'
                        }
                    }
                ).data;

                return logData;


            } catch (err) {
                if (err.response.data.error_description == 'expired_token') {

                    try {
                        refreshToken();
                        return doCall();
                    } catch (err) {
                        throw err;
                    }
                }

                return err.toString();
            }
        };

        var refreshToken = function() {
            var user = Meteor.user();

            if (!user) {
                return;
            }

            var config = ServiceConfiguration.configurations.findOne({service: 'oidrc'});

            try {

                var response = HTTP.post(
                    'https://' + config.domain + config.tokenEndpoint, {
                        headers: {
                            Accept: 'application/json'
                        },
                        params: {
                            client_id:      config.clientId,
                            client_secret:  config.clientSecret,
                            grant_type:     'refresh_token',
                            refresh_token:  user.services.oidrc.refreshToken
                        }
                    });

            } catch (err) {
                var code = err.response ? err.response.statusCode : 500;
                throw new Meteor.Error(code, 'Unable to exchange DDX refresh token.', err.response)

            }

            if (response.statusCode === 200) {

                Meteor.users.update(user._id, {
                    '$set': {
                        'services.oidrc.accessToken': response.data.access_token,
                        'services.oidrc.refreshToken': response.data.refresh_token
                    }
                });

                return response.data;

            } else {
                throw new Meteor.Error(result.statusCode, 'Unable to exchange DDX refresh token.', result);
            }
        };

        return doCall();
    }
});
