Template.checkSessionIframe.helpers({
    checkSession: function() {

        var user = Meteor.user();

        if (user && user.services && user.services.oidrc && user.services.oidrc.sessionState) {

            var config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });

            if (config && config.checkSessionIframe) {
                return true;
            }

        }

        return false;
    },
    rpPath: function() {
        var url = '',
            user = Meteor.user(),
            config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });

        url = Meteor.absoluteUrl('packages/oidrc/oidrc_rpframe.html?');

        var parser = document.createElement('a');
        parser.href = config.checkSessionIframe;

        url += 'session_state=' + encodeURIComponent(user.services.oidrc.sessionState);
        url += '&client_id=' + encodeURIComponent(config.clientId);
        url += '&target=' + encodeURIComponent(parser.protocol + '//' + parser.host);


        return url;
    },
    opPath: function() {
        var config = ServiceConfiguration.configurations.findOne({ service: 'oidrc' });

        if (!config) {
            return;
        }

        return config.checkSessionIframe;
    },
    setOrder: function() {
        Meteor.defer(function() {
           $('iframe.oidrc').appendTo('body');
        });
    }
});

var oidrcLogout = function() {

    Meteor.logout();
};

window.oidrcLogout = oidrcLogout;
