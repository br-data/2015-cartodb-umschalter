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

            var $li = $(e.target);
            var type = $li.attr('data-type');

            if (mode === 'toggle') {

                $options.removeClass('selected');
                $li.addClass('selected');

                var query = "SELECT * FROM " + table + " WHERE " + column + " IN ('" + type + "')";

                layer.setSQL(query);
            }

            if (mode === 'select') {

                $li.toggleClass('selected');
            }
        });
    });
}

window.onload = init;
