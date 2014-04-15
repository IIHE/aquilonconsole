function showdialog(command) {
    var icon = '';
// tmp
    var prefixmatch = false;
    $.each(prefixlist, function(prefix, options) {
        if (command.indexOf(prefix) === 0) {
            icon += '<button class="btn btn-xs ' + options[1] + '" onclick="showdialog(\'' + command + '\')">\n';
            icon += '<span class="glyphicon ' + options[0] + '"></span>\n';
            icon += '</button>\n';
            prefixmatch = true;
            return false;
        }
    });

    if (prefixmatch == false) {
        icon += '<button class="btn btn-xs ' + prefixlist["run"][1] + '" onclick="showdialog(\'' + command + '\')">\n';
        icon += '<span class="glyphicon ' + prefixlist["run"][0] + '"></span>\n';
        icon += '</button>\n';
    }
// end tmp


    var title = command.split('_').join(' ');
    var description = xml.getInstance().getDescription(command);
    var form = parseoptgroups(command);
    var submitbutton = '<button type="button" class="btn btn-primary" onclick="submit()">Submit</button>';

    $("#commandform").data("command", command);
    $("#formdialog #modal-icon").html(icon);
    $("#formdialog #modal-title").html(title);
    $("#formdialog #modal-body").empty();
    $("#formdialog #modal-body").append(description);
    $("#formdialog #modal-body").append('<br /><br />');
    $("#formdialog #modal-body").append(form);
    $("#formdialog .modal-footer").html(submitbutton);
    $('#formdialog').modal('show');

    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        container: 'body'
    });
}

function parseoptgroups(command) {
    var html = "";
    var optgroups = xml.getInstance().getOptGroup(command);

    $.each(optgroups, function(key, optgroup) {
        var name = $(optgroup).attr('name').split('_').join(' ');
        var mandatory = $(optgroup).attr('mandatory');
        var fields = $(optgroup).attr('fields');
        var astrix = ''; 

        if (mandatory == "True" && fields == "any") {
            astrix = '<span class="required" data-toggle="popover" data-placement="right" data-content="Please select one or more options below">*</span>';
        }

        html += '<fieldset>\n';
        html += '<legend >' + name + astrix + '</legend>\n';
        html += parseoptions(optgroup, fields);
        html += '</fieldset>\n';
    });

    return html;
}

function parseoptions(optgroup) {
    var html = ""
    var options = $(optgroup).find('option');
    $.each(options, function(k, option) {
        var name = $(option).attr('name').split('_').join(' ');
        var type = $(option).attr('type');
        var formtype = "text";
        if (type == "flag") {
            formtype = "checkbox";
        }

        html += '<div class="form-group">\n';
        html += '<label for="' + name + '" class="col-sm-3 control-label">' + name + '</label>\n';
        html += '<div class="col-sm-8">\n'
        html += '<input type="' + formtype +'" class="form-control" id="' + name + '">\n';
        html += '</div>\n';
        var option_description = $(option).contents().eq(0).text();

        if (type == "flag") {
            html += '<button type="button" class="btn btn-sm btn-danger" data-toggle="popover" data-placement="right" data-container="body" data-content="'+option_description+'">\n';
            html += '<span class="glyphicon glyphicon-remove-sign"></span>\n';
            html += '</button>\n';
        } else if (name == "comments") {
            html += '<button type="button" class="btn btn-sm btn-warning" data-toggle="popover" data-placement="right" data-container="body" data-content="'+option_description+'">\n';
            html += '<span class="glyphicon glyphicon-exclamation-sign"></span>\n';
            html += '</button>\n';
        } else {
            html += '<button type="button" class="btn btn-sm btn-info" data-toggle="popover" data-placement="right" data-container="body" data-content="'+option_description+'">\n';
            html += '<span class="glyphicon glyphicon-info-sign"></span>\n';
            html += '</button>\n';
        }

        html += '</div>\n';
    });

    return html;
}

function submit() {
    var command = $("#commandform").data("command");
    var transport = getTransport(command);
    var url = aquilon + transport.path;
    $.get(url, function(data) {
        alert("sucess");
    });
    //alert($("#testform").serialize());
}