function init() {

    cartodb.createVis('map', 'https://br-data.cartodb.com/api/v2/viz/477bdfc0-8210-11e5-936b-0e787de82d45/viz.json', {
        tiles_loader: true,
        center_lat: 48.6,
        center_lon: 11.4,
        zoom: 7
    })
    .done(function(vis, layers) {

        vis.map.set({
            minZoom: 6,
            maxZoom: 10
        });

        var subLayer = layers[1].getSubLayer(1);

        // Set infowindow from template
        subLayer.infowindow.set('template', $('#template').html())
            .on('error', function (err) {

                console.log(err);
            });

        createSelector(subLayer);
    })
    .error(function (err) {

        console.log(err);
    });

}

function createSelector(layer) {

    // Parent selector container (table)
    var $container = $('#selector');
    var table = $container.attr('data-table');

    // Sections of the parent container
    var $sections = $container.find('ul');

    $sections.each(function (index, section) {

        var $section = $(section);

        var column = $section.attr('data-column');
        var mode = $section.attr('data-mode');
        
        // Elements (filters) of a section
        var $options = $section.find('li');

        $options.click(changeFilter);

        function changeFilter(e) {

            var query;

            // If there is no target create an empty wrapper
            var $li = $(e ? e.target : $());
            var type = $li.attr('data-type');

            // Filter by one type
            if (mode === 'toggle') {

                // Clear selected state for all column
                $sections.find('li').removeClass('selected');

                // Add selected class for current element
                $li.addClass('selected');

                // Set the query
                query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + type + "')";
            }

            // Filter by multiple types
            if (mode === 'select') {

                var selectedTypes = [];

                // Clear selected state for other colums selectors
                $section.siblings().find('li').removeClass('selected');

                // Toggle selected class for current element
                $li.toggleClass('selected');

                // Find all selected types
                $section.find('.selected').each(function (index, li) {

                    selectedTypes.push($(li).attr('data-type'));
                });

                // Format array as string, e.g. ('A','B','C')
                selectedTypes = selectedTypes.join("','");

                // Set the query
                query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + selectedTypes + "')";
            }

            // Apply query
            layer.setSQL(query);
        }

        // Initially set query
        changeFilter();
    });
}

window.onload = init;
