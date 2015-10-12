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

    api.add_files(['oidrc_configure.html', 'oidrc_configure.js'], 'client');
    api.add_files('oidrc_server.js', 'server');
    api.add_files('oidrc_client.js', 'client');
});
