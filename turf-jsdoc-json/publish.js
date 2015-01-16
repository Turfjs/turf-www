var striptags = require('striptags');

/*eslint no-nested-ternary:0, space-infix-ops: 0 */
function graft(parentNode, childNodes, parentLongname, parentName) {
    childNodes
    .filter(function (element) {
        return (element.memberof === parentLongname);
    })
    .forEach(function (element, index) {
        var i,
            len;

        if (element.kind === 'module') {
            if (!parentNode.functions) {
                parentNode.functions = [];
            }

            var thisFunction = {
                'name': element.name,
                'access': element.access || '',
                'virtual': !!element.virtual,
                'description': striptags(element.description).replace('{@link', '').replace('}', '') || '',
                'parameters': [ ],
                'examples': []
            };

            parentNode.functions.push(thisFunction);

            if (element.returns) {
                thisFunction.returns = {
                    'type': element.returns[0].type? (element.returns[0].type.names.length === 1? element.returns[0].type.names[0] : element.returns[0].type.names) : '',
                    'description': element.returns[0].description || ''
                };
            }

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisFunction.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisFunction.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': element.params[i].defaultvalue || '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }
       }
    });
}

/**
    @param {TAFFY} data
    @param {object} opts
 */
exports.publish = function(data, opts) {
    var root = {},
        docs;

    data({undocumented: true}).remove();
    docs = data().get(); // <-- an array of Doclet objects

    graft(root, docs);

    if (opts.destination === 'console') {
        if (opts.query && opts.query.format === 'xml') {
            var xml = require('js2xmlparser');
            console.log( xml('jsdoc', root) );
        }
        else {
            global.dump(root);
        }
    }
    else {
        console.log('This template only supports output to the console. Use the option "-d console" when you run JSDoc.');
    }
};
