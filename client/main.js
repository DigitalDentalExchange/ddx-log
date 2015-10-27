Template._loginButtonsLoggedOutSingleLoginButton.helpers({
    capitalizedName: function () {
        return 'DDX';
    }
});

Accounts.onLogin(function() {

    var user = Meteor.user();

    if (user) {
        DDXApi.refreshActivityLog();
        DDXApi.startPoll();
    } else {
        DDXApi.stopPoll();
    }

});

if (Meteor.user()) {
    DDXApi.refreshActivityLog();
    DDXApi.startPoll();
} else {
    DDXApi.stopPoll();
}

var notification = window.Notification || window.mozNotification || window.webkitNotification;

if ('undefined' !== typeof notification) {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        notification.requestPermission(function (permission) {});
    }
}
