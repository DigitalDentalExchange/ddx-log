Package.describe({
    summary: 'OpenID Connect Login flow',
    version: '0.1.0',
    name: 'ddxdental:oidrc'
});

Package.on_use(function(api) {
    api.use('oauth2@1.1.5', ['client', 'server']);
    api.use('oauth@1.1.6', ['client', 'server']);
    api.use('http@1.1.1', ['server']);
    api.use('underscore@1.0.4', 'client');
    api.use('templating@1.1.4', 'client');
    api.use('random@1.0.4', 'client');
    api.use('service-configuration@1.0.5', ['client', 'server']);

    api.export('Oidrc');

    api.add_files(
        [
            'oidrc_configure.html',
            'oidrc_configure.js',
            'oidrc_check_session.html',
            'oidrc_check_session.js',
            'oidrc_client.js'
        ],
        'client'
    );
    api.add_files('oidrc_server.js', 'server');
    api.addAssets('oidrc_rpframe.html', 'client');
});
