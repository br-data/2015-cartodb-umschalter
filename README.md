# CartoDB Umschalter
Ermöglicht es verschiedene Daten in einer CartoDB-Karte umzuschalten. Der Umschalter verändert den SQL-Filter und rendert die Karte neu.

Direktlink: http://web.br.de/interaktiv/fluechtlingsunterkuenfte/
Artikel: http://www.br.de/nachrichten/fluechtlinge-unterbringung-in-bayern-100.html

### Attribute
- `data-table`: Name des CartoDB-Datensatzes, zum Beispiel *superhelden*
- `data-column`: Name der Spalte, die gefiltert werden soll *superkräfte*
- `data-mode`: Daten umschalten (`toggle`) oder auswählen (`select`)
- `data-type`: Nach was soll gefiltert werden *röntgenblick* oder *unsichtbar*

### Verwendung
Link zu CartoDB-Visualisierung in der `main.js` angeben.

```javascript
cartodb.createVis('map', 'https://br-data.cartodb.com/api/v2/viz/477bdfc0-8210-11e5-936b-0e787de82d45/viz.json', {
  tiles_loader: true,
  center_lat: 48.6,
  center_lon: 11.4,
  zoom: 7
})
```

Umschalter in der index.html anpassen

```html
<div id="selector" data-table="superhelden">
  <h3>Superkräfte</h3>
  <ul  data-column="typ_filter" data-mode="select">
    <li data-type="fliegen" class="selected">
      Fliegen
    </li>
    <li data-type="unsichtbar" class="selected">
      Unsichtbar machen
    </li>
    <li data-type="röntgenblick" class="selected">
      Röntgenblick
    </li>
    <li data-type="blitze" class="selected">
      Blitze schießen 
    </li>
  </ul>
  
  <h3>Universum</h3>
  <ul data-column="universum" data-mode="toggle">
    <li data-type="Marvell">Marvell</li>
    <li data-type="DC Comics">DC Comics</li>
  </ul>
<div>
```

### Debugging
Ob die SQL-Anfrage überhaupt Ergebnisse liefert kann man über eine REST-Schnittstelle überprüfen. Dazu einfach die jeweilige Query ausgeben lassen und an die URL anhängen: `https://br-data.cartodb.com/api/v2/sql?q=SELECT * FROM superhelden WHERE superkräfte IN ('Röntgenblick')`
