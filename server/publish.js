Meteor.publish('log', function(){
    return Log.find(
        { user_id: this.userId },
        {sort: {created: -1}}
    );
});
