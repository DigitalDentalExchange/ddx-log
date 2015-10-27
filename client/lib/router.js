Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {

    }
});

Router.route('/', {name: 'logList'});
