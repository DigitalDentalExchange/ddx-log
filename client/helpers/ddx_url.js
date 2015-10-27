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
