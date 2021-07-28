<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress color="rgba(236, 88, 0, 1)" ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <nav class="level is-mobile" id="ebl-brand">
        <div class="level-item has-text-left">
          <div>
            <!-- <p class="">{{$_.map(page.title,ltr=>{ return Math.floor(Math.random()*10) % 2 == 0?ltr.toUpperCase():ltr; }).join('') }} -->
            <p class="">{{page.title}}
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">
              <div :class="['is-pulled-right','is-size-5',(CONFIG.mode=='1616' && 'is-hidden')]">mode: {{CONFIG.mode}}</div>
              <!-- <a @click.default="page.splayed=!page.splayed" class="navbar-item is-pulled-left">
                <i :class="['fas',page.splayed?'fa-star-half-alt':'fa-star-half',page.splayed?'ebl-nav-off':'ebl-nav-on']"></i>
              </a> -->
              <!-- <a @click.default="page.paneledatall=!page.paneledatall" class="navbar-item">
                <i :class="[page.paneledatall?'far fa-map':'fas fa-map',(page.paneledatall)?'ebl-nav-off':'ebl-nav-on']"></i>
              </a> -->
            </p>
            <!-- <p class="heading ebl-dash-heading">wstd.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('donePrior')]">{{meta.historyLengthInvalid.toFixed(1)}}</p> -->
          </div>
        </div>
        <div class="level-item has-text-right">
          <!-- 
             _
 ___ ___ ___|_|___ ___
|  _| -_| . | | . |   |
|_| |___|_  |_|___|_|_|
        |___| -->
          <div id="menu-region" class="is-size-7 ml-6">
            <div @click="actives.region=region" v-for="(region,i) in CONFIG.regions" :class="['app-faux-target','is-pulled-left',actives.region==region?'ebl-generic-on':'']">&nbsp;{{region}} <span class="ebl-generic-off" v-if="i<CONFIG.regions.length-1">|</span> </div>
          </div>
          <!-- #menu-region -->
        </div>
        <!-- /.level-item -->
      </nav>
    </nav>
    <div class="columns p-0 m-0 is-relative" id="konsole-wrapper">
      <div v-if="konsole.length>0" id="konsole" class="column is-full is-size-7 p-2">
        <div v-for="M in konsole" id="konsole-copy" :class="['level-item','has-text-centered',M.klass,`faded${M.timeout}`]">
          <div>
            <p>{{M.msg}}</p>
          </div>
        </div>
      </div>
    </div nb="/.columns.parentOf.konsole">
    <!-- FOOTER -->
    <footer class="footer pt-1 pb-1 has-text-centered">
      <div id="ebl-layers" class="level is-mobile pl-2 pr-2 is-family-monospace">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <!-- <p>Lorem ipsum dolor sit amet, <span class="has-tooltip-arrow" data-tooltip="Tooltip content">consectetur adipisicing elit</span>. Ipsa fugit dolores earum quod distinctio ducimus non dignissimos molestias amet corrupti voluptatum assumenda impedit beatae veritatis nemo veniam error, hic cumque.</p> -->
            <a @click.default="$_.findWhere(layers,{group:L.group}).on=!$_.findWhere(layers,{group:L.group}).on" v-for="L in $_.filter(layers,l=>{return l.menued})" :class="['pr-5',L.on?'ebl-nav-on':'ebl-nav',(L.abbrev=='strt' && !streetIso)?'is-disabled':'',(L.abbrev=='iso' && !rideIso)?'is-disabled':'']">
              <i :class="[`${L.klass}`]"></i><span :class="[L.klass=='icon-noun_binoculars'?'ml-3':'ml-1',L.on?'ebl-nav-on':'']">{{L.abbrev}}</span>
              <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
            </a>
          </div>
        </div>
        <div class="level-right pb-2">
          <figure :data-tooltip="bm.name" v-for="bm in this.CONFIG.baseMaps" class="image is-24x24 mr-2 has-tooltip-arrow">
            <img @click="actives.basemap=bm.handle" :class="['bt_baseMap','is-rounded',bm.handle==actives.basemap? 'active': '']" :src="bm.thmb">
          </figure>
        </div>
      </div>
    </footer>
  </div nb="app root">
</template>

<script>
export default {
  name: "evERyBlINE",
  created: function() {

    this.actives = {
      basemap: (!this.$route.params.basemap || this.$route.params.basemap == '$') ? 'mapbox_blueprint' : this.$route.params.basemap,
      bboxstring: (!this.$route.params.bbox || this.$route.params.bbox == '$') ? null : this.$route.params.bbox,
      region: (!this.$route.params.region || this.$route.params.region == '$') ? 'brookline' : this.$route.params.region,
      splayed: this.$route.params.splayed == 'S' ? true : false,
    }

    window.addEventListener('keydown', this.keyMonitor)


  },
  beforeDestroy: function() {
    window.removeEventListener('keydown', this.keyMonitor)
  },
  mounted: function() {



    // this.CONFIG = CONFIG
    this.loadings.app = true;

    this.konsole = [{ msg: new Date(), klass: 'is-info', timeout: 20, timeout: 20 }]

    this.MAP = new L.Map("map", {
        // editable: true,
        zoomControl: false,
        center: [42.34950534904681, -71.15582942962648],
        attributionControl: false,
        zoom: 14,
        preferCanvas: false
      })
      .on('moveend', e => {
        this.actives.bboxstring = this.MAP.getBounds().toBBoxString()
      })



    /*let p = 408;
    this.MAP.createPane('pnBasemaps')
      .style.zIndex = (p - 1);
    this.MAP.createPane('pnAdmin')
      .style.zIndex = (p + 0);
    this.MAP.createPane('pnBuffered')
      .style.zIndex = (p + 2);
    this.MAP.createPane('pnTracksValid')
      .style.zIndex = (p + 4);
    this.MAP.createPane('pnTracksInvalid')
      .style.zIndex = (p + 3);
    this.MAP.createPane('pnDebug')
      .style.zIndex = (p + 1);
    this.MAP.createPane('pnCenterlines')
      .style.zIndex = (p + 7);
    this.MAP.createPane('pnStreetIso')
      .style.zIndex = (p + 8);
    this.MAP.createPane('pnIso')
      .style.zIndex = (p + 9);
    this.MAP.createPane('pnRemain')
      .style.zIndex = (p + 10);*/

    /*
        // groops
                    _  .-')                               _ (`-.   .-')
                   ( \( -O )                             ( (OO  ) ( OO ).
          ,----.    ,------.  .-'),-----.  .-'),-----.  _.`     \(_)---\_)
         '  .-./-') |   /`. '( OO'  .-.  '( OO'  .-.  '(__...--''/    _ |
         |  |_( O- )|  /  | |/   |  | |  |/   |  | |  | |  /  | |\  :` `.
         |  | .--, \|  |_.' |\_) |  |\|  |\_) |  |\|  | |  |_.' | '..`''.)
        (|  | '. (_/|  .  '.'  \ |  | |  |  \ |  | |  | |  .___.'.-._)   \
         |  '--'  | |  |\  \    `'  '-'  '   `'  '-'  ' |  |     \       /
          `------'  `--' '--'     `-----'      `-----'  `--'      `-----'
    */

    if (!this.grpbasemaps) {
      this.grpbasemaps = new L.featureGroup()
        .addTo(this.MAP)
    }

    /*if (!this.grpadminghost) {
      this.grpadminghost = new L.featureGroup()
        .addTo(this.MAP)
    }
    if (!this.grphistorytracksValid) {
      this.grphistorytracksValid = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: true, group: "grphistorytracksValid", handle: 'grphistorytracksvalid', on: true, abbrev: "trksvlid", klass: 'icon-noun_buffer', fz: 1 })
    }
    if (!this.grphistorytracksInvalid) {
      this.grphistorytracksInvalid = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: false, group: "grphistorytracksInvalid", handle: 'grphistorytracksinvalid', on: true, abbrev: "grphistorytracksInvalid", klass: 'icon-noun_buffer', fz: 2 })
    }
    if (!this.grpcenterlines) {
      this.grpcenterlines = new L.featureGroup().addTo(this.MAP)
    }

    if (!this.grpadmin) {
      this.grpadmin = new L.featureGroup().addTo(this.MAP)
    }

    let buri = this.$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).urii
    this.grpbasemaps.addLayer(new L.TileLayer(buri));

    if (!this.grpbuffered) {
      this.grpbuffered = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: true, group: "grpbuffered", handle: 'grpbuffered', on: false, abbrev: "hstb", klass: 'icon-noun_buffer', fz: 0 })
    }

    if (!this.grpdebug) {
      this.grpdebug = new L.featureGroup().addTo(this.MAP)
        // this.layers.push({menued:true, handle: 'grpdebug', on: false, abbrev: "dbg", klass: 'bug' })
    }

    if (!this.grpisotracks) {
      this.grpisotracks = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: true, group: "grpisotracks", handle: 'grpisotracks', on: false, abbrev: "iso", klass: 'icon-noun_binoculars', fz: 3 })
    }
    if (!this.grpstreetiso) {
      this.grpstreetiso = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: true, group: "grpstreetiso", handle: 'grpstreetiso', on: false, abbrev: "strt", klass: 'fa fa-road', fz: 4 })
    }

    if (!this.grpahead) {
      this.grpahead = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: true, group: "grpahead", handle: 'grpahead', on: false, abbrev: "ahd", klass: 'fa fa-binoculars', fz: 4 })
    }

    */


    /* brookline boundary
        __                     __   ___
       / /_  _________  ____  / /__/ (_)___  ___
      / __ \/ ___/ __ \/ __ \/ //_/ / / __ \/ _ \
     / /_/ / /  / /_/ / /_/ / ,< / / / / / /  __/
    /_.___/_/   \____/\____/_/|_/_/_/_/ /_/\___/
    */
    /*    $.getJSON('static/ebl-buffered.geojson', G => {
          L.geoJSON(G, {
            style: this._STILE('buffer')
          }).addTo(this.grpbuffered);
          this.loadings.app = false;
        });
    */
    /*    $.getJSON('static/streets-hit-master.json', H => {
          this.tracks.streetsLog = H;
        });*/

    /*axios
      .get(`static/brookline-outline.geojson`)
      .then(response => {

        this.border = response.data
      }) //axios.then
      .catch(e => {
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.outline" }]
      }) //axios.catch*/

    /*    axios
          .get(`static/brookline.geojson`)
          .then(response => {

            L.geoJSON(response.data, {
                style: this._STILE('ghost'),
                snapIgnore: true
              })
              .addTo(this.grpadminghost);
          }) //axios.then
          .catch(e => {
            // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
            this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.brookline" }]
          }) //axios.catch*/

    /*
        $.getJSON('static/brookline-osm-centerlines.geojson', G => {
          L.geoJSON(G, {
            style: this._STILE('centerlines')
          }).addTo(this.grpcenterlines);
          this.meta.centerlinesLength = this.$TURFLENGTH(this.grpcenterlines.toGeoJSON())
            // could be there's a streetiso waiting on this
          if (this.actives.streetIso) {
            this._SETSTREETISO()
          }
        });*/


    /*  axios
      .get(`static/ebl-remaining.geojson`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('remaining'),
            snapIgnore: true
          })
          .addTo(this.grpahead)
          .on('click', e => {
            this.actives.streetIso = e.layer.feature.properties.name
          })
      }) //axios.then
      .catch(e => {
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.remaining" }]
      }) //axios.catch
*/
    this.loadings.app = false;

    /*this.$nextTick(() => {
      this._GETHISTORY()
    })*/

    if (this.actives.bboxstring) {

      let bba = this.actives.bboxstring.split(',')

      let bb = {
        west: bba[0],
        south: bba[1],
        east: bba[2],
        north: bba[3]
      }
      this.MAP.fitBounds([
        [bb.south, bb.west],
        [bb.north, bb.east]
      ])
    }

    window.V = this;
    console.log(window.V);

  },
  computed: {},
  data() {
    return {
      MAP: null,
      meta: {
        centerlineslength: 0,
        historylengthvalid: 0,
        historylengthinvalid: 0
      },
      menus: { tracks: [] },
      geo: [{ regionborder: null }],
      actives: {
        basemap: null,
        region: null,
        bboxstring: null,
        splayed: null
      },
      layers: [],

      konsole: [],
      page: { title: "ebl.dshbrd", splayed: false, paneledatall: true },
      modals: { credits: false },
      loadings: { app: false },
      tracks: { history: [], buffered: null, streetsLog: null, streetsAhead: null },
      credits: [
        "buffered tracks icon: outline by Jellycons from the Noun Project", "tracks icon: route by Andrejs Kirma from the Noun Project", "tracks review icon: Test Tube by Icon Island from the Noun Project", "proposed route icon: Vector by logan from the Noun Project",
        "isolated track icon: Binoculars by praveen patchu from the Noun Project",
        "app icon: (altered from 'Bicycle' by) ibrandify, PK - https://thenounproject.com/search/?q=bicycle&i=2667656"
      ]
    }
  },
  methods: {

    _SETSTREETISO: function() {},
    _SETRIDEISO: function() {},
    _MAPRIDEISO: function() {},
    _MAPSTREETISO: function() {},
    _STREETSAHEAD: function() {},
    _GETACTIVERIDEKEYOB: function() {},
    _STILE: function(w, o) {

      let norm = null;
      let projectStart = this.$MOMENT('2020-10-12T12:00:11Z').unix()
      let today = this.$MOMENT().unix()
      let trackTime = null;

      switch (w) {
        case 'brookline':
          return { weight: 5, opacity: .7, color: `rgba(239, 221, 141, 1)`, fill: false, fillOpacity: .6 }
          break;
        case 'incomingDefault':
          return { color: `rgba(236, 88, 0, 1)`, fill: false }
          break;
        case 'centerlines':
          return { color: `#4aa`, fill: false, width: 1, opacity: 0 }
          break;
        case 'streetiso':
          return { dashArray: "2 5 10", color: `#F72585`, fill: false, weight: 12, opacity: .8 }
          break;
        case 'untraversed':
          return { color: "#0D7CD6", fillColor: "#0D7CD6", fill: true, weight: 2, opacity: .88 }
          break;
        case 'incomingReturn':
          return { color: `rgba(120, 227, 253, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 5, weight: 8 }
          break;
        case 'iso':
          return { color: `rgba(120, 227, 253, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 4, weight: 8 }
          break;
        case 'incomingProposed':
          return { color: `rgba(36, 123, 160, 1)`, fill: false, dashArray: "5 10 2", opacity: .9, width: 5, weight: 8 }
          break;
        case 'proposalBuffer':
          return { color: `rgba(36, 123, 160, 1)`, fill: true, opacity: .2 }
          break;
        case 'remaining':
          return { width: 6, color: "rgba(236, 88, 0, 1)", fill: false, fillOpacity: .3, opacity: 1 }
          break;
        case 'buffer':
          return { color: "rgb(236, 88, 0)", fill: true, fillOpacity: .3, opacity: .5 }
          break;
        case 'trackvalid':
          return { width: 5, color: "rgba(36, 123, 160, 1)", fill: false, opacity: .9 }
          break;
        case 'trackinvalid':
          return { width: 5, color: "rgba(111, 26, 7, 1)", fill: false, opacity: .1 }
          break;
        case 'incomingHistory':

          return { color: "rgb(51, 15, 10)", fill: false, opacity: .1 }
          break;
        case 'incomingDefault':
          return { color: `rgb(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)})`, fill: false, opacity: .6 }
          break;
        case 'start':
          return {
            radius: 8,
            fillColor: `rgba(75, 83, 32, 1)`,
            color: `rgba(75, 83, 32, 1)`,
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          }
          break;
        case 'finish':
          return {
            radius: 8,
            fillColor: `rgba(111, 26, 7, 1)`,
            color: `rgba(111, 26, 7, 1)`,
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          }
          break;
        case 'debug':
          return {
            radius: 18,
            fillColor: `rgb(44,44,44)`,
            color: `rgb(11,11,11)`,
            weight: 5,
            opacity: 1,
            fillOpacity: .5
          }
          break;

        case 'ghost':
          return {
            radius: 1,
            fillColor: `rgb(44,44,44)`,
            color: `rgb(55,11,55)`,
            weight: 2,
            opacity: .3,
            fillOpacity: .1
          }
          break;
        case 'via':
          return {
            radius: 6,
            fillColor: `rgb(233,233,233)`,
            color: `rgb(11,11,11)`,
            weight: 5,
            opacity: 1,
            fillOpacity: 1
          }
          break;
        case 'online':
          return {
            width: 6,
            color: '#93E600',
            weight: 5,
            opacity: 1,
            fill: false
          }
          break;
        case 'linz':
          return { color: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},1)`, fillColor: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},1)`, fill: false }
          break;
        default:
          return { color: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fillColor: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fill: true, fillOpacity: Math.random() }
          break;
      }

    },
    _GETFILTEREDTRACKS: function() {},
    // _CHARTPIECOMPLETE: function(w) {

    //   let k = null;

    //   let D = { 'done (excluding disqualifieds)': (this.meta.centerlineslength - this.meta.remaining), 'remaining': this.meta.remaining }

    //   switch (w) {
    //     case 'data':
    //       k = D
    //       break;
    //     case 'colors':
    //       k = [this.classes.persimmon, 'rgba(75, 83, 32, .5)']
    //       break;
    //     default:
    //       k = D
    //       break;
    //   }

    //   return k

    // }, //piechart
    _BANNERCO: function(w) {},
    _GETHISTORY: function() {

        this.loadings.app = true

        /*$.getJSON(`static/ebl.geojson`, G => {
          this.loadings.app = false
          this.tracks.history = G;
        });*/


      } //githizterrie
      ,
    // _MAPHISTORY: function() {

    //   this.grphistorytracksValid.clearLayers()
    //   this.grphistorytracksInvalid.clearLayers()

    //   // if (this.tracks.history && this.tracks.history.length > 0) {
    //   // if (this.tracks.history && this._GETFILTEREDTRACKS().features.length > 0) {
    //   if (this._GETFILTEREDTRACKS() && this._GETFILTEREDTRACKS().features && this._GETFILTEREDTRACKS().features.length > 0) {
    //     this.loadings.app = true;

    //     /*let ar = this.$_.find(this.tracks.history, t => {
    //       return this.$_.first(t.features).properties.name == this.actives.rideKey
    //     })*/

    //     /*let th = this.actives.rideKey ?
    //       this.$_.reject(this.tracks.history, trak => {

    //         return this.$_.first(trak.features).properties.time > this.$_.first(ar.features).properties.time
    //       }) : this.tracks.history*/

    //     this.$_.each(this._GETFILTEREDTRACKS().features, trackFeature => {

    //         if (trackFeature.properties.winout == 'winn') {

    //           L.geoJSON(trackFeature, {
    //               style: this._STILE('trackvalid', trackFeature.properties.time)
    //             })
    //             .bindPopup(layer => {
    //               return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
    //             })
    //             .addTo(this.grphistorytracksValid)
    //             .on("click", (e) => {

    //               this.actives.rideKey = e.layer.feature.properties.name

    //             })
    //         } //if.winn
    //         else {
    //           L.geoJSON(trackFeature, {
    //               style: this._STILE('trackinvalid', trackFeature.properties.time)
    //             })
    //             .bindPopup(layer => {
    //               return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
    //             })
    //             .addTo(this.grphistorytracksInvalid)
    //             .on("click", (e) => {

    //               this.actives.rideKey = e.layer.feature.properties.name

    //             })
    //         } //if.else (wout)

    //       }) //eetch.history

    //     if (!this.actives.bboxString) {
    //       this.MAP.fitBounds(this.grphistorytracksValid.getBounds())
    //     }

    //     this.loadings.app = false;

    //     // this._BUFFERTRACKS()
    //     // this._LAUDIT('grphistorytracks', false)
    //   } //if history

    //   this.$nextTick(() => {

    //     this._META('history')
    //       // if (this.actives.rideIso) { this._SETRIDEISO() }
    //     this._SETRIDEISO()
    //   })
    // },
    keyMonitor: function(e) {

      if (e.key == "\`") { this.page.splayed = !this.page.splayed }
      if (e.altKey) { this.page.splayed = !this.page.splayed }

    },
    _SETMENUS: function() {},
    _META: function(w) {

      this.meta.historylengthvalid = this.$TURFLENGTH(this.grphistorytracksValid.toGeoJSON())
      this.meta.historylengthinvalid = this.$TURFLENGTH(this.grphistorytracksInvalid.toGeoJSON())
      this.meta.isolength = this.$TURFLENGTH(this.grpisotracks.toGeoJSON(), { units: "kilometers" })

      this.meta.remaining = this.$TURFLENGTH(this.grpahead.toGeoJSON(), { units: "kilometers" })

      this.meta.streetsperiso = this._GETACTIVERIDEKEYOB() ?
        this.$_.sortBy(this.$_.groupBy(this.$_.filter(this.tracks.streetsLog, s => {
          return s.rideKey == this._GETACTIVERIDEKEYOB().properties.name.replace(' #', '_')
        }), 'streetName'), so => {
          return so.length * -1
        }) : []

    },
    _GROUPGET: function(g) {

      switch (g) {
        case 'grphistorytracksValid':
          return this.grphistorytracksValid
          break;
        case 'grphistorytracksInvalid':
          return this.grphistorytracksInvalid
          break;
        case 'grpisotracks':
          return this.grpisotracks
          break;
        case 'grpbuffered':
          return this.grpbuffered
          break;
        case 'grpstreetiso':
          return this.grpbuffered
          break;
        case 'grpahead':
          return this.grpahead
          break;
      } //switch



    }, //groupget
    _SETROUTE: function() {

        let P = {
          basemap: this.actives.basemap ? this.actives.basemap : '$',
          splayed: this.page.splayed ? 's' : '$',
          bbox: this.actives.bboxstring ? this.actives.bboxstring : '$',
          region: this.actives.region ? this.actives.region : '$'
        }
        this.$router.push({
          params: P
        });
      } //SetroUtE
      ,
    _LAUDIT: function() {}, //laudit

  } //methods
  ,
  watch: {
    "actives.basemap": {
      handler: function(vnew, vold) {

        let buri = this.$_.findWhere(this.CONFIG.baseMaps, { handle: this.actives.basemap }).urii
        if (buri) {
          this.grpbasemaps.clearLayers()
          this.grpbasemaps.addLayer(new L.TileLayer(buri));
        }
        this._SETROUTE()
      }
    } //acTIVes.BasEMAP
    ,
    "actives.region": {
      handler: function(vnew, vold) {

        // tHis cHANGeS:
        // border
        // buffered track
        // streets (tagged done, missing)
        // zoomfit

        this._SETROUTE()
      }
    } //ACtIVeS.rEgioN
  } //WAtch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
</style>
