Template.registerHelper('hasPatient', function() {

    if (this.data.case && this.data.case.patient && this.data.case.patient.name) {
        return true;
    }

    return false;

});
