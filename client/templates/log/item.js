Template.logItem.helpers({
    chooseTemplate: function() {

        var user = Meteor.user(),
            template = user.profile.ddx_parent_role.toLowerCase() + this.type;

        return Template[template];
    }
});

Template.logItem.onRendered(function () {

    DDXApi.spawnNotification(
        'DDX Activity Log',
        this.$('li')
            .text()
            .replace(/(\r\n|\n|\r)/gm,"")
            .replace(/\s+/g," ")
    );

});
