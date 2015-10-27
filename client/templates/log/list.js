Template.logList.helpers({
    logItems: function () {
        return Log.find({}, {sort: {created: -1}});
    }
});
