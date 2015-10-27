Package.describe({
    summary: 'OpenID Connect service for an OpenID Connect Op',
    version: '0.1.0',
    name: 'ddxdental:accounts-oidrc'
});

Package.on_use(function(api) {
    api.use('accounts-base@1.2.1', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth@1.1.7', ['client', 'server']);
    api.use('ddxdental:oidrc@0.1.0', ['client', 'server']);

    api.add_files('oidrc.js');
});
