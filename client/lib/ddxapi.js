DDXApi = {
    _timerId: null,
    _notify: false,
    startPoll: function() {

        if (DDXApi._timerId === null) {

            DDXApi._timerId = Meteor.setInterval(DDXApi.runPoll, 300000);
        }
    },
    stopPoll : function() {
        Meteor.clearInterval(DDXApi._timerId);
        DDXApi._timerId = null;
    },
    runPoll : function() {
        DDXApi._notify = true;
        DDXApi.refreshActivityLog();
    },
    refreshActivityLog: function () {
        Meteor.call('refreshActivityLog', function (error, logData) {
            if (logData && logData.items) {

                for (var i = logData.items.length, c = 0; c < i; ++c) {

                    var count = Log.find({
                        id: logData.items[c].id
                    }).count();

                    if (count === 0) {

                        Log.insert(
                            {
                                id: logData.items[c].id,
                                created: logData.items[c].created,
                                type: logData.items[c].type,
                                data: logData.items[c].data,
                                target_type: logData.items[c].target_type,
                                target_id: logData.items[c].target_id,
                                target_parent: logData.items[c].target_parent,
                                target_parent_role: logData.items[c].target_role,
                                originator_id: logData.items[c].originator_id,
                                originator_role: logData.items[c].originator_role
                            }
                        );
                    }
                }
            }
        });

    },
    spawnNotification: function(title, body) {

        var notification = window.Notification || window.mozNotification || window.webkitNotification;

        if (DDXApi._notify && 'undefined' !== typeof notification && notification.permission === 'granted') {
            new Notification(
                title,
                {
                    body: body,
                    icon: Meteor.absoluteUrl('icon.png')
                }
            );
        }
    }
};
