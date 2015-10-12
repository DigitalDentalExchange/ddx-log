Template._loginButtonsLoggedOutSingleLoginButton.helpers({
    capitalizedName: function () {
        return 'DDX';
    }
});

Meteor.subscribe('log');

Template.body.helpers({
    logItems: function () {
        return Log.find({}, {sort: {created: -1}});
    }
});

Template.logItem.helpers({
    chooseTemplate: function() {

        var user = Meteor.user(),
            template = user.profile.ddx_parent_role.toLowerCase() + this.type;

        return Template[template];
    }
});

Template.registerHelper('ddxUrl', function(lab) {
    var url = 'https://';

    if (lab) {
        if (lab.subdomain) {
            url += lab.subdomain + '.';
        } else {
            url += lab.id + '.';
        }
    } else {
        url += 'www.';
    }

    return url + Meteor.settings.public.domain;
});

Template.registerHelper('hasPatient', function() {

    if (this.data.case && this.data.case.patient && this.data.case.patient.name) {
        return true;
    }

    return false;

});

Template.registerHelper('isRemakeCase', function() {

    if (this.data.case.return
        && this.data.case.return.type
        && this.data.case.return.case_id
        && this.data.case.return.type == 'remake') {

        return true;
    }

    return false;

});

Accounts.onLogin(function() {

    var user = Meteor.user();

    if (user) {
        DDXApi.startPoll();
    } else {
        DDXApi.stopPoll();
    }

});

if (Meteor.user()) {
    DDXApi.startPoll();
} else {
    DDXApi.stopPoll();
}
