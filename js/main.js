function init() {

    cartodb.createVis('map', 'https://br-data.cartodb.com/api/v2/viz/477bdfc0-8210-11e5-936b-0e787de82d45/viz.json', {
        tiles_loader: true,
        center_lat: 50,
        center_lon: 10,
        zoom: 5
    })
    .done(function(vis, layers) {

        var subLayer = layers[1].getSubLayer(0);

        createSelector(subLayer);
    })
    .error(function(err) {

        console.log(err);
    });

}

function createSelector(layer) {

    var $container = $('#selector');
    var $sections = $container.find('ul');

    var table = $container.attr('data-table');

    $sections.each(function (index, section) {

        var $section = $(section);

        var column = $section.attr('data-column');
        var mode = $section.attr('data-mode');
        
        var $options = $section.find('li');

        $options.click(function(e) {

            var query;

            var $li = $(e.target);
            var type = $li.attr('data-type');

            if (mode === 'toggle') {

                $options.removeClass('selected');
                $li.addClass('selected');

                query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + type + "')";
            }

            if (mode === 'select') {

                var selectedTypes = [];

                $li.toggleClass('selected');

                // Find all selected types
                $section.find('.selected').each(function (index, li) {

                    selectedTypes.push($(li).attr('data-type'));
                });

                // Format array as string, e.g. ('A','B','C')
                selectedTypes = selectedTypes.join("','");

                query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + selectedTypes + "')";
            }

            console.log(query);

            // Apply query
            layer.setSQL(query);
        });
    });
}

window.onload = init;
