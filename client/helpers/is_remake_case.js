
Template.registerHelper('isRemakeCase', function() {

    if (this.data.case.return
        && this.data.case.return.type
        && this.data.case.return.case_id
        && this.data.case.return.type == 'remake') {

        return true;
    }

    return false;

});
