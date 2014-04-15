var URL = "/assets/xml/input.xml";
var aquilon = "http://aquilon.gridpp.rl.ac.uk:6901/";

/*


function getTransport(command) {
    var node = $(xml).find('command[name=' + command + ']');
    var transport = $(node[0]).find('transport');
    var method = $(transport[0]).attr("method");
    var path = $(transport[0]).attr("path");
    return {"method" : method, "path" : path}
}
*/


// currently requires the prefix list from pages/commands/az.js ... hmmm
var xml = (function() {
    var instance;

    function init() {
        var rawxml = null;
        var commandlist = {};
        var orderedcommandlist = {};

        $.ajaxSetup({async: false});
        $.get(URL, function(data) {
            rawxml = data;
            $(rawxml).find('command').each(function(){
                var name = $(this).attr('name');
                if (name == "*") {
                    return true;
                }
                addtocommandlist(name);
            });
        });
        $.ajaxSetup({async: true});

        orderedcommandlist = orderobject(commandlist);

        /*
        Something
        */
        function addtocommandlist(command) {
            var prefixmatch = false;
            $.each(prefixlist, function(index, prefix) {
                if (command.indexOf(index) === 0) {
                    var main = command.replace(index + "_", "");
                    if (commandlist[main] == undefined) {
                        commandlist[main] = {};
                    }
                    commandlist[main][index] = command;
                    prefixmatch = true;
                }
            });
        
            if (prefixmatch == false) {
                commandlist[command] = {};
            }
        }
    
        /*
        alphabetically order the keys in an object
        */
        function orderobject(obj) {
            var orderedlist = {};
            var keys = Object.keys(obj);
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                var command = keys[i];
                orderedlist[command] = obj[command];
            }
            return orderedlist;
        }

        return {
            // pubic methods
            getCommandList : function() {
                return commandlist;
            },
            getOrderedCommandList : function() {
                return orderedcommandlist;
            },
            getDescription : function(command) {
                var node = $(rawxml).find('command[name=' + command + ']');
                var description = node.contents().eq(0).text();
                description.replace(/\n\n/g, "<br /><br />");
                return description;
            },
            getOptGroup : function(command) {
                var node = $(rawxml).find('command[name=' + command + ']');
                return $(node[0]).find('optgroup');
            }
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
        return instance;
    }
};
})();
