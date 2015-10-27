Package.describe({
    summary: 'OpenID Connect Login flow',
    internal: true
});

Package.on_use(function(api) {
    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'client');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

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
