var prefixlist = {
    "add"    : ["glyphicon-plus", "btn-success"],
    "show"   : ["glyphicon-eye-open", "btn-info"],
    "update" : ["glyphicon-pencil", "btn-warning"],
    "del"    : ["glyphicon-remove", "btn-danger"],
    "bind"   : ["glyphicon-import", "btn-bind"],
    "unbind" : ["glyphicon-export", "btn-unbind"],
    "rebind" : ["glyphicon-repeat", "btn-rebind"],
    "search" : ["glyphicon-search", "btn-primary"],
    "run"    : ["glyphicon-share-alt", "btn-default"]
};

$(document).ready(function () {
    var commandlist = xml.getInstance().getOrderedCommandList();
    createlegend();
    createlist(commandlist);
});

function createlegend() {
    var html = "";
    $.each(prefixlist, function(prefix, options) {
        html += '<button class="btn btn-xs ' + options[1] + '">';
        html += '<span class="glyphicon ' + options[0] + '"></span>';
        html += '</button>\n';
        html += ' = ' + prefix + '&nbsp;&nbsp;&nbsp;&nbsp;';
    });
    $("#legend").append(html);
}

function createlist(commandlist) {
    var col_count = 0;
    var currentletter = "";
    var html = "";

    $.each(commandlist, function(index, value) {
        if (currentletter != index.substring(0,1)) {
            currentletter = index.substring(0,1);
            if (col_count == 2) {
                html += '</div>\n';
                html += '</div>\n';
                col_count = 0;
            }
            if (col_count == 1) {
                html += '</div>\n';
                html += '<div class="col-md-6">\n';
                html += '<h2>' + currentletter + '</h2>\n';
                col_count = 2;
            }
            if (col_count == 0) {
                html += '<div class="row">\n';
                html += '<div class="col-md-6">\n';
                html += '<h2>' + currentletter + '</h2>\n';
                col_count = 1;
            }
        }

        html += '<span class="commandlabel">' + index + '</span>\n';

        $.each(prefixlist, function(prefix, options) {
            if (value[prefix] != undefined || (prefix == "run" && Object.keys(value).length == 0)) {
                var command = (prefix == "run" ? index : value[prefix]);
                html += '<button class="btn btn-xs ' + options[1] + '" onclick="showdialog(\'' + command + '\')">\n';
                html += '<span class="glyphicon ' + options[0] + '"></span>\n';
                html += '</button>\n';
            } else {
                html += '<button class="btn btn-xs ' + options[1] + '" disabled="disabled">\n';
                html += '<span class="glyphicon ' + options[0] + '" style="visibility:hidden"></span>\n';
                html += '</button>\n';
            }
        });

        html += '<br />\n';
    });
    html += '</div></div>\n';
    $("#commands").append(html);
}