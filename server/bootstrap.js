process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

ServiceConfiguration.configurations.upsert(
    {
        service: 'oidrc'
    },
    {
        $set: {
            domain: 'www.' + Meteor.settings.public.domain,
            clientId: Meteor.settings.private.clientId,
            clientSecret: Meteor.settings.private.clientSecret,
            authorizationEndpoint: '/authorize',
            tokenEndpoint: '/service/default/token',
            userinfoEndpoint: '/service/default/userinfo',
            requestPermissions: ['openid', 'profile', 'offline_access', 'practice.log.read'],
            loginStyle: (Meteor.isCordova ? 'redirect' : 'popup'),
            checkSessionIframe: Meteor.settings.public.checkSessionIframe
        }
    }
);
