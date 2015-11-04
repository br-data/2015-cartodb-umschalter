function init() {

    cartodb.createVis('map', 'https://br-data.cartodb.com/api/v2/viz/477bdfc0-8210-11e5-936b-0e787de82d45/viz.json', {
        tiles_loader: true,
        center_lat: 48.6,
        center_lon: 11.4,
        zoom: 7
    })
    .done(function(vis, layers) {

        var subLayer = layers[1].getSubLayer(1);

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

                $sections.find('li').removeClass('selected');
                $li.addClass('selected');

                query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + type + "')";
            }

            if (mode === 'select') {

                var selectedTypes = [];

                $section.siblings().find('li').removeClass('selected');
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
