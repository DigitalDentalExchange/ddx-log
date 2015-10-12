Package.describe({
    summary: 'OpenID Connect service for an OpenID Connect Op'
});

Package.on_use(function(api) {
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('oidrc', ['client', 'server']);

    api.add_files('oidrc.js');
});
