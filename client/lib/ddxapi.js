DDXApi = {
    _timerId: null,
    startPoll: function() {

        if (DDXApi._timerId === null) {

            DDXApi._timerId = Meteor.setInterval(function () {
                Meteor.call('refreshActivityLog');
            }, 300000);
        }
    },
    stopPoll : function() {
        Meteor.clearInterval(DDXApi._timerId);
        DDXApi._timerId = null;
    }
}
