<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
      {{page.title}}
    </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a @click.default="_LAUDIT(L.handle)" v-for="L in layers" class="navbar-item">
        {{L.handle}}:{{L.on}}
      </a>
          <a @click.default="_RANDOFINISHLINE()" class="navbar-item">
            <i class="fas fa-random"></i>
          </a>
          <a @click.default="avoid=!avoid" class="navbar-item">
            <i class="fas fa-frog"></i>
          </a>
          <p v-if="meta.historyLength">{{Number(Math.round(meta.historyLength+'e'+1)+'e-'+1)}}km</p>&nbsp;
          <p v-if="meta.centerlinesLength">{{` of ${Number(Math.round(meta.centerlinesLength+'e'+1)+'e-'+1)}`}}km</p>
          <p v-if="meta.proposedLength">{{`${Number(Math.round(meta.proposedLength+'e'+1)+'e-'+1)}`}}km proposed</p>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
          </div>
        </div>
      </div>
    </nav>
    <!-- 
  _____    _____                 __   _____
 (_____)  (_____)  _       ____ (__) (_____)
 (_)__(_)(_)___(_)(_)__   (____) (_)(_)___
 (_____) (_______)(____) (_)_(_) (_)  (___)_
 (_)     (_)   (_)(_) (_)(__)__  (_)  ____(_)
 (_)     (_)   (_)(_) (_) (____)(___)(_____)
 
 -->
    <div :class="['ebl-panel','is-overlay','is-pulled-right','has-text-weight-bold',dropzone.state?'':'is-hidden']">
      <h3 class="is-size-3 has-text-centered">{{dropzone.msg}}</h3>
      <div v-if="dropzone.state=='dropped' && tracks.incoming" class="columns pt-3">
        <div v-for="track in tracks.incoming.features" class="column is-full">
          <p>{{track.properties.name}}
            <i class="fa fa-bezier-curve" :style="`color:${_STYLE('incomingDefault').color}`"></i>
            <button @click="tracks.incoming=null" :class="['button','is-small','is-pulled-right']">Cancel</button>
            <button @click="_DROPSTORE()" :class="['button','is-small','is-pulled-right',loadings.submit?'is-loading':'']">Accept</button>
          </p>
          <p class="has-text-grey-light">{{$MOMENT(track.properties.time).format('YYYY.MMM.Do')}}</p>
        </div NB="/.kollum">
      </div Nb="/.cahloomz">
    </div nb="/.ebl-panel dRAHppzoAN">
    <!--                                                                               __      __
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals        ____ ___  ____  ____/ /___ _/ /____
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals       / __ `__ \/ __ \/ __  / __ `/ / ___/
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals      / / / / / / /_/ / /_/ / /_/ / (__  )
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals     /_/ /_/ /_/\____/\__,_/\__,_/_/____/
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals      
-->
    <div :class="['modal']" id="modal-file-drop">
      <div class="modal-background"></div>
      <div class="modal-content">
        {{dropzone.state}} {{dropzone.msg}}
      </div>
      <button @click="modals.dropzone=false" class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- 🦶🦶🦶🦶🦶🦶🦶🦶 FOOTER -->
    <footer class="footer is-size-7">
      <div class="content has-text-centered">
        <div id="konsole">
          <!-- <p v-for="M in konsole" id="konsole-copy" :class="M.klass">{{M.msg}}</p> -->
          <nav class="level">
            <div v-for="M in konsole" id="konsole-copy" :class="['level-item','has-text-centered',M.klass,`faded${M.timeout}`]">
              <div>
                <p>{{M.msg}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p>{{googleReview }}
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p><a target="_blank" :href="googleReview"><i class="fab fa-google"></i></a></p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  </div nb="app root">
</template>

<script>
export default {
  name: "evERyBlINE",
  created: function() {
    var mess = "Every Brookline Line";
    this.msg = mess.toUpperCase();

  },
  mounted: function() {
    this.loadings.map = true;
    this.konsole.push({ msg: new Date(), klass: 'is-info', timeout: 20, timeout: 20 })


    this.MAP = new L.Map("map", {
      editable: true,
      zoomControl: false,
      center: [42, -72],
      attributionControl: false,
      zoom: 11
    });

    this.MAP.createPane('pAdmin')
      .style.zIndex = 410;
    this.MAP.createPane('pTracks')
      .style.zIndex = 411;
    this.MAP.createPane('pProposed')
      .style.zIndex = 412;
    this.MAP.createPane('pStartfinish')
      .style.zIndex = 413;
    this.MAP.createPane('pDebug')
      .style.zIndex = 450;

    this.MAP.fitBounds(
      [
        [42.31566161628652, -71.19664326310159],
        [42.36102434112847, -71.06506481766702]
      ]
    )

    let tl = "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"

    const baseLayer = new L.TileLayer(
      this.$CONFIG.mode == '1616' ? tl : "http://localhost:8000/tile-T.png"
    );

    this.MAP.addLayer(baseLayer);

    if (!this.grpAdmin) {
      this.grpAdmin = new L.featureGroup({ pane: 'pAdmin' }).addTo(this.MAP)
    }
    if (!this.grpCenterlines) {
      this.grpCenterlines = new L.featureGroup({ pane: 'pAdmin' }).addTo(this.MAP)
    }


    if (!this.grpBuffered) {
      this.grpBuffered = new L.featureGroup({ pane: 'pTracks' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpBuffered', on: false })
    }

    if (!this.grpHistory) {
      this.grpHistory = new L.featureGroup({ pane: 'pTracks' }).addTo(this.MAP);
      this.layers.push({ handle: 'grpHistory', on: false })
    }
    if (!this.grpTracks) {
      this.grpTracks = new L.featureGroup({ pane: "pTracks" }).addTo(this.MAP)
        // .bringToFront()
      this.layers.push({ handle: 'grpTracks', on: false })
    }

    if (!this.grpProposed) {
      this.grpProposed = new L.featureGroup({ pane: 'pProposed' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpProposed', on: false })
    }
    if (!this.grpStartfinish) {
      this.grpStartfinish = new L.layerGroup({ pane: 'pStartfinish' }).addTo(this.MAP)
    }
    if (!this.grpDebug) {
      this.grpDebug = new L.layerGroup({ pane: 'pDebug' }).addTo(this.MAP)
    }

    /* brookline boundary
        __                     __   ___
       / /_  _________  ____  / /__/ (_)___  ___
      / __ \/ ___/ __ \/ __ \/ //_/ / / __ \/ _ \
     / /_/ / /  / /_/ / /_/ / ,< / / / / / /  __/
    /_.___/_/   \____/\____/_/|_/_/_/_/ /_/\___/
    */
    axios
      .get('http://milleria.org:3030/geocode/brookline,%20ma')
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STYLE('brookline'),
            snapIgnore: true
          })
          .addTo(this.grpAdmin);

      }) //axios.then
      .catch(e => {
        this.konsole.push({ msg: e, klass: "error", timeout: 20 })
      }) //axios.catch
      .then(r => {
        this._RANDOFINISHLINE()

      })

    // axios
    //   .get('http://localhost:3030/ebl/centerlines')
    //   .then(response => {

    //     L.geoJSON(response.data.payload, {
    //         style: this._STYLE('centerlines')
    //       })
    //       .addTo(this.grpCenterlines);

    //   }) //axios.then
    //   .catch(e => {
    //     this.konsole.push({ msg: e, klass: "error", timeout: 20 })
    //   }) //axios.catch
    //   .then(r => {
    //     this._META('centerlines')
    //   })


    /* ++++++++++++++++++++++++++++++++++++++++++ dropzone */
    window.addEventListener("dragenter", e => {
      e.preventDefault();
      this.dropzone.state = "drag";
      this.dropzone.msg = "DROP ANYWHERE";
      this.modals.dropzone = true;
    });

    window.addEventListener("dragleave", e => {
      e.preventDefault();
      this.dropzone.state = "idle";
      this.dropzone.msg = "DROP ANYWHERE";
    });

    window.addEventListener("dragover", e => {
      e.preventDefault();
      this.dropzone.msg = "DROP ANYWHERE";
    });

    window.addEventListener("drop", e => {
      e.preventDefault();
      this.dropzone.state = "dropped";
      this.dropzone.msg = "REVIEW...";
      // this.modals.dropzone=false;

      let fil = e.dataTransfer.files;
      this._DROPACCEPT(fil);
    });

    /* +++++++++++++++++++ /dropzone */

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        alert('cancdel modal')
          // this.modals.result=false
          // this.modals.edit=false
      }
    })

    this.loadings.map = false;

    this._GETHISTORY();

  },
  computed: {
    googleReview: function() {

        let vias = `/`

        if (this.grpProposed && this.grpProposed.toGeoJSON().features.length > 0) {

          let fc = this.$TURFH.featureCollection(
            this.$_.map(this.grpProposed.toGeoJSON().features[0].geometry.coordinates, (c, i) => {
              return this.$TURFH.point(c, { name: i })
            })
          )

          // let sa = this.$TURFSAMPLE(fc, 3)
          let sa = this.$_.map(this.$TURFSAMPLE(fc, 3).features, fea => {

            return [fea.geometry.coordinates[1], fea.geometry.coordinates[0]]
          })

          console.log("sa", sa);

          vias = sa.length > 0 ? `/${sa.join('/')}/` : `/`

          let STYLS = this._STYLE('debug')
          this.$_.each(sa, (s, i, l) => {

              console.log(`${i} of ${l.length}:`)
              console.log(`${s}`)
              let S = L.circle(s, { fillColor: STYLS.fillColor, color: STYLS.color, radius: 100, draggable: true, fillOpacity: .2 })
                .bindPopup(layer => {
                  return `<h5 class="is-size-5">${i} of ${l.length}</h5>`;
                })
                .addTo(this.grpDebug);
            })
            // L.geoJSON(sa, { style: this._STYLE('debug') }).addTo(this.grpDebug)

        }

        // https://www.google.com/maps/dir/42.34836,-71.127856/42.33970416931516,-71.13106727600099/42.33216480363725,-71.13006775510667
        // return `https://www.google.com/maps/dir/42.34836,-71.127856/42.33970416931516,-71.13106727600099/42.33216480363725,-71.13006775510667
        return this.startfinish ? `https://www.google.com/maps/dir/${this.startfinish.start[1]},${this.startfinish.start[0]}${vias}${this.startfinish.finish[1]},${this.startfinish.finish[0]}` : null

      } //gugulruvyew
  },
  data() {
    return {
      MAP: null,
      avoid: false,
      layers: [],
      midPoints: [],
      meta: { centerlinesLength: null, historyLength: null, proposedLength: null },
      startfinish: { start: [-71.127856, 42.348360], finish: [] },
      konsole: [],
      dropzone: { state: null, msg: null },
      page: { title: "evERyBlINE", splayed: false },
      modals: { dropzone: false },
      loadings: { map: false, drop: false, tracks: false, proposed: false },
      console: { state: null, msgs: [] },
      tracks: { incoming: null, history: [], proposed: [], buffered: null }
    };
  },
  methods: {

    _RANDOFINISHLINE: function() {

        /*
    _____       _      __
   / __(_)___  (_)____/ /_
  / /_/ / __ \/ / ___/ __ \
 / __/ / / / / (__  ) / / /
/_/ /_/_/ /_/_/____/_/ /_/

gen a random finish point

*/
        let extent = this.$_.map(this.grpAdmin.getBounds().toBBoxString().split(","), c => {
          return parseFloat(c)
        })
        let cellSide = 1;
        let options = { units: 'kilometers', mask: this.grpAdmin.toGeoJSON().features[0] };
        let grid = this.$TURFPTGRID(extent, cellSide, options);

        grid.features = [grid.features[this.$_.random(0, grid.features.length - 1)]]
        let sample = this.$TURFSAMPLE(grid, 1)
          // console.log("sample", sample);
          // this.startfinish.finish = this.$_.first(grid.features).geometry.coordinates
        this.startfinish.finish = this.$_.first(sample.features).geometry.coordinates

      } //
      ,
    _UTIL: function() {

      const uri = `mongodb+srv://${this.$CONFIG.monguU}:${this.$CONFIG.monguP}@cluster0.dosp5.azure.mongodb.net/${this.$CONFIG.monguD}?retryWrites=true&w=majority`;
      const client = new this.$MONGO(uri, { useNewUrlParser: true });
      client.connect(err => {
        console.log("err", err);
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });

    },
    _META: function(w) {

      switch (w) {
        case 'centerlines':
          this.meta.centerlinesLength = this.$TURFLENGTH(this.grpCenterlines.toGeoJSON())
          break;
        case 'history':
          this.meta.historyLength = this.$TURFLENGTH(this.grpHistory.toGeoJSON())
          break;
        case 'proposed':
          this.meta.proposedLength = this.$TURFLENGTH(this.grpProposed.toGeoJSON())
          break;
        default:
          this.meta.centerlinesLength = this.$TURFLENGTH(this.grpCenterlines.toGeoJSON())
          this.meta.historyLength = this.$TURFLENGTH(this.grpHistory.toGeoJSON())
          this.meta.proposedLength = this.$TURFLENGTH(this.grpProposed.toGeoJSON())
          break;
      }



    },
    _STYLE: function(w) {

      switch (w) {
        case 'brookline':
          return { weight: 5, opacity: .3, color: `rgb(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)})`, fill: false, fillOpacity: .1 }
          break;
        case 'incomingDefault':
          return { color: `#48311e`, fill: false }
          break;
        case 'centerlines':
          return { color: `#a4a`, fill: false, width: 1, opacity: 0 }
          break;
        case 'incomingProposed':
          return { color: `#4CC3E8`, fill: false, dashArray: "4" }
          break;
        case 'buffer':
          return { color: `rgb(${Math.floor(Math.random() * (20 - 1) + 1)},${Math.floor(Math.random() * (20 - 1) + 1)},${Math.floor(Math.random() * (20 - 1) + 1)})`, fill: true, fillOpacity: .2, opacity: .5 }
          break;
        case 'incomingDefault':
          return { color: `#48311e`, fill: false }
          break;
        case 'incomingHistory':
          return { color: `rgb(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)})`, fill: false, opacity: 0 }
          break;
        case 'start':
          return {
            radius: 8,
            fillColor: `rgb(${Math.floor(Math.random() * (90 - 70) + 70)}, ${Math.floor(Math.random() * (200 - 180) + 180)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            color: `rgb(${Math.floor(Math.random() * (90 - 70) + 70)}, ${Math.floor(Math.random() * (200 - 180) + 180)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          }
          break;
        case 'finish':
          return {
            radius: 8,
            fillColor: `rgb(${Math.floor(Math.random() * (200 - 240) + 240)}, ${Math.floor(Math.random() * (10 - 1) + 1)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            color: `rgb(${Math.floor(Math.random() * (200 - 240) + 240)}, ${Math.floor(Math.random() * (10 - 1) + 1)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          }
          break;
        case 'debug':
          return {
            radius: 18,
            fillColor: `rgb(${Math.floor(Math.random() * (200 - 240) + 240)}, ${Math.floor(Math.random() * (10 - 1) + 1)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            color: `rgb(${Math.floor(Math.random() * (200 - 240) + 240)}, ${Math.floor(Math.random() * (10 - 1) + 1)}, ${Math.floor(Math.random() * (60 - 45) + 45)})`,
            weight: 1,
            opacity: 1,
            fillOpacity: .7
          }
          break;
        default:
          return { color: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fillColor: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fill: true, fillOpacity: Math.random() }
          break;
      }

    },
    _MAPSTARTFINISH: function() {

      this.grpStartfinish.clearLayers()

      this.loadings.map = true;


      let STYLS = this._STYLE('start');

      /*let S=L.geoJSON({
          "type": "Feature",
          "properties": {
              "name": "Start",
              "popupContent": "Start"
          },
          "geometry": {
              "type": "Point",
              "coordinates": this.startfinish.start
          }
      }, {
        onEachFeature: function(feature, layer){
                      layer
                          .on('dblclick', L.DomEvent.stop)
                          .on('dblclick', layer.toggleEdit);
                  },
                  style:STYLS,pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng);
          }
                })

                  S.bindPopup(layer => {
                    
                    return `<h5 class="is-size-5">${layer.feature.properties.popupContent}</h5>`;
                  })
                  .addTo(this.grpStartfinish)*/

      let S = L.circle([this.startfinish.start[1], this.startfinish.start[0]], { addClass: 'leaflet-vertex-icon-big', fillColor: STYLS.fillColor, color: STYLS.color, radius: 100, draggable: true }).addTo(this.grpStartfinish);
      S.enableEdit();

      S.on('dragstart', (e) => {
        e.layer.setStyle({ color: 'Gray' });
      });

      S.on('dragend', e => {
          this.startfinish.start = [e.layer.getLatLng().lng, e.layer.getLatLng().lat]
          e.layer.setStyle({ color: STYLS.color, fillColor: STYLS.fillColor })
        }) //dragend



      S.on('editable:vertex:dragstart', (e) => {
        e.layer.setStyle({ color: 'Gray' });
      });


      S.on('editable:vertex:dragend', (e) => {
        this.startfinish.start = [e.vertex.latlng.lng, e.vertex.latlng.lat]
        e.layer.setStyle({ color: STYLF.color, fillColor: STYLF.fillColor })
      });


      let STYLF = this._STYLE('finish');
      /*
let F=L.geoJSON({
    "type": "Feature",
    "properties": {
        "name": "Finish",
        "popupContent": "Finish"
    },
    "geometry": {
        "type": "Point",
        "coordinates": this.startfinish.finish
    }
}, {
  onEachFeature: function(feature, layer){
                layer
                    .on('dblclick', L.DomEvent.stop)
                    .on('dblclick', layer.toggleEdit);
            },
            style:STYLF,pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    }
          })
            
            F.bindPopup(layer => {
              
              return `<h5 class="is-size-5">${layer.feature.properties.popupContent}</h5>`;
            })
            .addTo(this.grpStartfinish)*/


      let F = L.circle([this.startfinish.finish[1], this.startfinish.finish[0]], { fillColor: STYLF.fillColor, color: STYLF.color, radius: 100 }).addTo(this.grpStartfinish);
      F.enableEdit();
      // F.on('dblclick', L.DomEvent.stop).on('dblclick', S.toggleEdit);

      //             .pm.enable({
      //   allowSelfIntersection: false,
      // })    


      F.on('dragstart', (e) => {
        e.layer.setStyle({ color: 'Gray' });
      });

      F.on('dragend', e => {
          this.startfinish.finish = [e.layer.getLatLng().lng, e.layer.getLatLng().lat]
          e.layer.setStyle({ color: STYLF.color, fillColor: STYLF.fillColor })
        }) //dragend

      F.on('editable:vertex:dragstart', (e) => {

        e.layer.setStyle({ color: 'Gray' });

      });

      F.on('editable:vertex:dragend', (e) => {

        this.startfinish.finish = [e.vertex.latlng.lng, e.vertex.latlng.lat]
        e.layer.setStyle({ color: STYLF.color, fillColor: STYLF.fillColor })

      });

      this.loadings.map = false;
      // this.grpStartfinish.bringToFront();

      this._PROPOSEDGET()

    },
    _MAPDROP: function() {

      this.grpTracks.clearLayers()

      this.loadings.map = true;
      L.geoJSON(this.tracks.incoming, {
          style: this._STYLE('incomingDefault')
        })
        .bindPopup(layer => {

          return `<h5 class="is-size-5">${layer.feature.properties.name}</h5><div class="is-size-7 has-text-grey-lighter">(${layer.feature.properties.time})</div>`;
        })
        .addTo(this.grpTracks);

      this.MAP.fitBounds(this.grpTracks.getBounds())
      this.loadings.map = false;
      this.grpTracks.bringToFront();
      this._LAUDIT('grpTracks')

    },
    _MAPHISTORY: function() {

      this.grpHistory.clearLayers()

      if (this.tracks.history && this.tracks.history.length > 0) {
        this.loadings.map = true;
        L.geoJSON(this.tracks.history, {

            style: this._STYLE('incomingHistory')
          })
          .bindPopup(layer => {
            return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
          })
          .addTo(this.grpHistory);

        this.MAP.fitBounds(this.grpHistory.getBounds())
        this.loadings.map = false;

        this._BUFFERTRACKS()
          // this._LAUDIT('grpHistory')
      } //if history
      this._META()
    },
    _MAPPROPOSED: function() {

      this.grpProposed.clearLayers()

      this.loadings.map = true;

      // var plottedPolyline = L.Polyline.Plotter(this.tracks.proposed.features[0].geometry.coordinates,{
      //     weight: 9
      // })
      // .addTo(this.grpProposed)

      // console.log("plottedPolyline", plottedPolyline);

      let K = L.geoJSON(this.tracks.proposed, {

          style: this._STYLE('incomingProposed'),
          onEachFeature: (feature, layer) => {
            layer.enableEdit(this.MAP)
            layer
              .on('dblclick', L.DomEvent.stop)
              .on('dblclick', layer.toggleEdit);

            layer.on('editable:editing', function(e) {
              e.layer.setStyle({ color: 'DarkRed' });
            });

            layer.on('editable:vertex:dragend', (e) => {

              e.layer.setStyle({ color: 'Green' });
              this.midPoints.push(L.latLng(e.vertex.latlng.lat, e.vertex.latlng.lng))

            });

          }
        })
        .addTo(this.grpProposed);

      this.MAP.fitBounds(this.grpProposed.getBounds())
      this.loadings.map = false;
      // this.grpProposed.bringToBack();
      // this._LAUDIT('grpHistory')
      this._META()
    },
    _GETHISTORY: function() {

        this.loadings.tracks = true

        axios.get('http://localhost:3030/ebl/tracks')
          .then(resp => {
            this.konsole.push({ timeout: 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
            this.loadings.tracks = false;
            this.tracks.history = resp.data.payload
          })
      } //traxgeht
      ,
    _PROPOSEDGET: function() {

      this.loadings.proposed = true

      let route = []
      route.push(this.startfinish.start)
      route.push(this.midPoints.length > 0 ? this.$_.first(this.$_.map(this.midPoints, llo => {
        return (llo.lat && llo.lng) ? [llo.lng, llo.lat] : null
      })) : null)
      route.push(this.startfinish.finish)
        // let proposal = this._TRACKSBUFFERED() && this.avoid ? { "coordinates": this.$_.compact(route), "instructions": "false", "options": { "avoid_polygons": this._TRACKSBUFFERED() }, "preference": "shortest", "roundabout_exits": "true", "suppress_warnings": "true" } : { "coordinates": this.$_.compact(route), "instructions": "false", "preference": "shortest", "roundabout_exits": "true", "suppress_warnings": "true" }

      // this.tracks.buffered = this.$TURFDIFF(this.$TURFCMBINE(this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' })).features[0].geometry, lawton60r).geometry

      // let tracksbufferedboxedclipped = // this.$TURFDIFF(this.$TURFBUFFER(this.$TURFENVELOPE(this.grpStartfinish // .toGeoJSON()), 300, { units: 'meters' }), this.tracks.buffered)

      // L.geoJSON(tracksbufferedboxedclipped) .addTo(this.grpAdmin)




      let proposal = this.tracks.buffered && this.avoid ? { "elevation": true, "coordinates": this.$_.compact(route), "instructions": "false", "options": { "avoid_polygons": tracksbufferedboxedclipped.geometry }, "preference": "recommended", "roundabout_exits": "true", "suppress_warnings": "true" } : { "elevation": true, "coordinates": this.$_.compact(route), "instructions": "false", "preference": "recommended", "roundabout_exits": "true", "suppress_warnings": "true" }


      // axios.post('http://api.openrouteservice.org/v2/directions/driving-car/geojson', proposal, {
      //     headers: {
      //       'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      //       'Authorization': `${this.$CONFIG.ORSKey}`,
      //       'Content-Type': 'application/json; charset=utf-8'
      //     }
      //   })
      //   .then(resp => {

      //     this.loadings.proposed = false;
      //     this.tracks.proposed = resp.data
      //   })

      axios.get('http://localhost:3030/ebl/ors').then(resp => {
        this.tracks.proposed = resp.data;
        this.loadings.proposed = false;
      })





      this._META()
    }, //pruhpowsedget
    _DROPSTORE: function() {

      this.loadings.submit = true

      axios.post('http://localhost:3030/ebl/submit', this.tracks.incoming)
        .then(resp => {
          this.konsole.push({ timeout: resp.data.success ? 12 : 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
          this.loadings.submit = false;
        })
        .then(x => {
          this.tracks.incoming = null;
        })
        .then(r => { this._GETHISTORY() })
        .finally(r => { this._PROPOSEDGET() })


    }, //drahpstowr
    _DROPACCEPT: function(F) {

      this.loadings.drop = true;

      const reader = new FileReader();
      reader.loadend = e => {
        delete e.target.result;
      };

      reader.onload = D => {

          this.tracks.incoming = this.$TOGEOJSON.gpx((new DOMParser()).parseFromString(D.target.result, 'text/xml'))

          this.loadings.drop = false

        } //reader.onload

      // we'll only take one file for now
      reader.readAsText(F[0], "UTF-8");
    },
    _BUFFERTRACKS: function(F) {


        // if (this.grpHistory.getLayers().length > 0) {
        this.grpBuffered.clearLayers()

        // if we never cut out an area around Lawton we'll pen ourselves in pretty quickly
        let lawton60r = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 500, { units: "meters" });

        // buffer the centerlines
        // this.tracks.buffered = this.$TURFDIFF(this.$TURFCMBINE(this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' })).features[0].geometry, lawton60r).geometry
        this.tracks.buffered = this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' });
        // } //if.grpHistory
      } //traxbuhfrd
      ,
    _MAPBUFFEREDTRACKS: function(F) {


        L.geoJSON(this.tracks.buffered, {
            style: this._STYLE('buffer')
          })
          .addTo(this.grpBuffered);

        this.grpHistory.bringToFront();
        this._LAUDIT('grpBuffered')
          // return buffered.geometry;

      } //traxbuhfrd
      ,
    _LAUDIT: function(H) {


        let c = null;

        switch (H) {
          case 'grpHistory':
            // current state is?
            c = this.$_.findWhere(this.layers, { handle: H }).on
              // flip it on the map
            c ? this.MAP.removeLayer(this.grpHistory) : this.MAP.addLayer(this.grpHistory);
            // flip it in layers meta
            this.$_.findWhere(this.layers, { handle: H }).on = !c
            break;
          case 'grpBuffered':
            // current state is?
            c = this.$_.findWhere(this.layers, { handle: H }).on
              // flip it on the map
            c ? this.MAP.removeLayer(this.grpBuffered) : this.MAP.addLayer(this.grpBuffered);
            // flip it in layers meta
            this.$_.findWhere(this.layers, { handle: H }).on = !c
            break;
          case 'grpTracks':
            // current state is?
            c = this.$_.findWhere(this.layers, { handle: H }).on
              // flip it on the map
            c ? this.MAP.removeLayer(this.grpTracks) : this.MAP.addLayer(this.grpTracks);
            // flip it in layers meta
            this.$_.findWhere(this.layers, { handle: H }).on = !c
            break;
          case 'grpProposed':
            // current state is?
            c = this.$_.findWhere(this.layers, { handle: H }).on
              // flip it on the map
            c ? this.MAP.removeLayer(this.grpProposed) : this.MAP.addLayer(this.grpProposed);
            // flip it in layers meta
            this.$_.findWhere(this.layers, { handle: H }).on = !c
            break;
          case 'grpCenterlines':
            // current state is?
            c = this.$_.findWhere(this.layers, { handle: H }).on
              // flip it on the map
            c ? this.MAP.removeLayer(this.grpCenterlines) : this.MAP.addLayer(this.grpCenterlines);
            // flip it in layers meta
            this.$_.findWhere(this.layers, { handle: H }).on = !c
            break;
        } //sweetch
      } //LODDIT

  } //methods
  ,
  watch: {
    avoid: {
      handler: function(vnew, vold) {
          console.log("avoid.vold", vold);
          console.log("avoid.vnew", vnew);
          // console.log("vnew", vnew);
          // this._MAPSTARTFINISH()
          this._PROPOSEDGET()
        } //handler
    } //midpoints
    ,
    "midPoints": {
      handler: function(vnew, vold) {
          // console.log("vnew", vnew);
          // this._MAPSTARTFINISH()
          this._PROPOSEDGET()
        } //handler
    } //midpoints
    ,
    "startfinish": {
      deep: true,
      handler: function(vnew, vold) {
          this._MAPSTARTFINISH()
            // this._PROPOSEDGET()
        } //handler
    } //startfinish
    ,
    "loadings": {
      deep: true,
      handler: function(vnew, vold) {
          this.$_.contains(this.$_.values(this.loadings), true) ? this.$refs.topProgress.start() : this.$refs.topProgress.done()
        } //handler
    } //loadings
    ,
    // "konsole.timeout": {
    //   handler: function(vnew, vold) {

    //       $('#konsole-copy').fadeIn();
    //       vnew ? $('#konsole-copy').fadeOut(vnew) : $('#konsole-copy').fadeOut(6000)

    //     } //handler
    // } //loadings
    // ,
    // "konsole": {
    //   deep: true,
    //   handler: function(vnew, vold) {
    //       console.log("vold", vold);
    //       console.log("vnew", vnew);
    //       this.konsole = this.$_.without(this.konsole, vnew)
    //         // $('#konsole-copy').fadeIn();
    //         // vnew ? $('#konsole-copy').fadeOut(vnew) : $('#konsole-copy').fadeOut(6000)

    //     } //handler
    // } //loadings
    // ,
    "tracks.proposed": {
      handler: function(vnew, vold) {

          this._MAPPROPOSED()

        } //handler
    } //loadings
    ,
    "tracks.buffered": {
      handler: function(vnew, vold) {

          this._MAPBUFFEREDTRACKS()

        } //handler
    } //loadings
    ,
    "tracks.incoming": {

      handler: function(vnew, vold) {
          if (vnew) { this._MAPDROP() } else {
            this.grpTracks.clearLayers();
            this.dropzone = { state: null, msg: null }
            this._LAUDIT('grpTracks')
          }

        } //handler
    } //tracks.incoming
    ,
    "tracks.history": {
      deep: true,
      handler: function(vnew, vold) {
          // vnew ? this._MAPHISTORY() : null;
          vnew ? this._MAPHISTORY() : null;
        } //handler
    } //tracks.HISTORY
  } //watch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.leaflet-vertex-icon {
  border-radius: 50%;
}

.leaflet-vertex-icon-big {
  border: 10px solid red;
}
</style>
