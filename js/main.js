function createSelector(layer) {

    var sql = new cartodb.SQL({ user: 'documentation' });
    var $options = $('#layer_selector li');

    $options.click(function(e) {

        // get the area of the selected layer
        var $li = $(e.target);
        var area = $li.attr('data');
        // deselect all and select the clicked one
        $options.removeClass('selected');
        $li.addClass('selected');
        // create query based on data from the layer
        var query = "select * from european_countries_e";
        if(area !== 'all') {
        query = "select * from european_countries_e where area > " + area;
        }
        // change the query in the layer to update the map
        layer.setSQL(query);
    });
}

function main() {

    cartodb.createVis('map', 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json', {
        tiles_loader: true,
        center_lat: 50,
        center_lon: 20,
        zoom: 3
    })
    .done(function(vis, layers) {
        // layer 0 is the base layer, layer 1 is cartodb layer
        var subLayer = layers[1].getSubLayer(0);
        createSelector(subLayer);
    })
    .error(function(err) {
        console.log(err);
    });
}

window.onload = main;
