<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress color="rgba(236, 88, 0, 1)" ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav :class="['navbar',_BANNERBG]" role="navigation" aria-label="main navigation">
      <!-- <div class="navbar-item ">
        <span v-if="meta.been">(you've probably been here already)</span>
        <span v-if="meta.distanceToBorder">&nbsp;({{`${Number(Math.round(meta.distanceToBorder+'e'+1)+'e-'+1)}`}}km from border)</span>
      </div> -->
      <nav class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">
              <a @click.default="zpause=!zpause" class="navbar-item is-size-1">
                <i :class="[zpause?'fas fa-pause-circle ebl-nav-on':'far fa-pause-circle']"></i>
                <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
              </a>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">Ttl.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('totalCenterlines')]">{{Math.round(meta.centerlinesLength)}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">%Dn.</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('donePrior')]">{{((meta.historyLengthValid/meta.centerlinesLength)*100).toFixed(1)}}</p>
          </div>
        </div>
        <!-- <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">Dn.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('donePrior')]">{{meta.historyLengthValid.toFixed(1)}}</p>
          </div>
        </div> -->
        <!-- <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">wstd.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('donePrior')]">{{meta.historyLengthInvalid.toFixed(1)}}</p>
          </div>
        </div> -->
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">dntdy.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('doneToday')]">{{meta.traceLength}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">#rDNgS.</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('readings')]">{{trace.length}}</p>
          </div>
        </div>
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
      <nav id="ebl-layers" class="level is-mobile pl-2 pr-2">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <a @click.default="_LAUDIT
(L.handle)" v-for="L in layers" class="navbar-item">
              <i :class="[`${L.klass}`,L.on?'ebl-nav-on':'']"><span class="pl-2">{{L.abbrev}}</span></i>
              <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
            </a>
          </div>
        </div>
        <div class="level-right pb-2">
          <!-- <span class="is-family-code is-size-7 has-text-grey-lighter pr-2" v-html="`{basemap:${$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).name}}`"></span> -->
          <figure v-for="bm in baseMaps" class="image is-24x24 mr-2">
            <img @click="actives.baseMap=bm.handle" :class="['bt_baseMap','is-rounded',bm.handle==actives.baseMap? 'active': '']" :src="bm.thmb">
          </figure>
        </div>
      </nav>
    </footer>
  </div nb="app root">
</template>

<script>
export default {
  name: "evERyBlINE",
  created: function() {

    // here we do some intercepting of our colloquial router null, the '$'
    this.actives = {
      baseMap: (!this.$route.params.basemap || this.$route.params.basemap == '$') ? 'stamen_terrain' : this.$route.params.basemap
    }

  },
  mounted: function() {

    navigator.geolocation.getCurrentPosition((currentPosition => {

      this.konsole = [{ timeout: 20, klass: 'has-text-info', msg: currentPosition.coords.latitude, sender: "if.geolocation" }]
        // this.trace.push({ lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude })
        // this.konsole = [{ timeout: 20, klass: 'has-text-info', msg: `tracing...`, sender: "if.geolocation" }]

    }), (err) => {
      this.konsole = [{ timeout: 20, klass: 'has-text-error', msg: `nav.geo failed: ${err.message} (${err.code})`, sender: "if.geolocation.error" }]

    })

    this.loadings.app = true;

    this.konsole = [{ msg: new Date(), klass: 'is-info', timeout: 20, timeout: 20 }]

    this.MAP = new L.Map("map", {
      editable: true,
      zoomControl: false,
      center: [42, -72],
      attributionControl: false,
      zoom: 11
    })

    let p = 408;

    this.MAP.createPane('pnBasemaps')
      .style.zIndex = (p - 1);
    this.MAP.createPane('pnAdmin')
      .style.zIndex = (p + 0);
    this.MAP.createPane('pnBuffered')
      .style.zIndex = (p + 2);
    this.MAP.createPane('pnTracks')
      .style.zIndex = (p + 4);
    this.MAP.createPane('pnDebug')
      .style.zIndex = (p + 1);
    this.MAP.createPane('pnCenterlines')
      .style.zIndex = (p + 7);
    this.MAP.createPane('pnTrace')
      .style.zIndex = (p + 9);


    // groops

    if (!this.grpbasemaps) {
      this.grpbasemaps = new L.featureGroup({ pane: 'pnBasemaps' }).addTo(this.MAP)
    }

    if (!this.grpadminghost) {
      this.grpadminghost = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }
    if (!this.grptrace) {
      this.grptrace = new L.featureGroup({ pane: 'pnTrace' }).addTo(this.MAP)
    }
    if (!this.grphistorytracks) {
      this.grphistorytracks = new L.featureGroup({ pane: 'pnTracks' }).addTo(this.MAP)
    }
    if (!this.grpcenterlines) {
      this.grpcenterlines = new L.featureGroup({ pane: 'pnCenterlines' }).addTo(this.MAP)
    }

    if (!this.grpadmin) {
      this.grpadmin = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }

    let buri = this.$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).urii
    this.grpbasemaps.addLayer(new L.TileLayer(buri));

    if (!this.grpbuffered) {
      this.grpbuffered = new L.featureGroup({ pane: 'pnBuffered' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpbuffered', on: false, abbrev: "hstb", klass: 'icon-noun_buffer' })
    }

    if (!this.grpdebug) {
      this.grpdebug = new L.layerGroup({ pane: 'pnDebug' }).addTo(this.MAP)
        // this.layers.push({ handle: 'grpdebug', on: false, abbrev: "dbg", klass: 'bug' })
    }

    /* brookline boundary
        __                     __   ___
       / /_  _________  ____  / /__/ (_)___  ___
      / __ \/ ___/ __ \/ __ \/ //_/ / / __ \/ _ \
     / /_/ / /  / /_/ / /_/ / ,< / / / / / /  __/
    /_.___/_/   \____/\____/_/|_/_/_/_/ /_/\___/
    */
    /*axios
      .get(`static/brookline-outline-buffer.geojson`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('brookline'),
            snapIgnore: true
          })
          .addTo(this.grpadmin);
        this.MAP.fitBounds(this.grpadmin.getBounds())

      }) //axios.then
      .catch(e => {
        // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.outline-buffer" }]
      }) //axios.catch
      */


    axios
      .get(`static/brookline-outline.geojson`)
      .then(response => {
        this.border = response.data

      }) //axios.then
      .catch(e => {
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.outline" }]
      }) //axios.catch


    axios
      .get(`static/brookline.geojson`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('ghost'),
            snapIgnore: true
          })
          .addTo(this.grpadminghost);

      }) //axios.then
      .catch(e => {
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.brookline" }]
      }) //axios.catch

    $.getJSON('static/brookline-osm-centerlines.geojson', G => {
      L.geoJSON(G, {
        style: this._STILE('centerlines')
      }).addTo(this.grpcenterlines);
      this.meta.centerlinesLength = this.$TURFLENGTH(this.grpcenterlines.toGeoJSON())
    });

    this.loadings.app = false;

    this._TRACE()

    this.$nextTick(() => {
      this._GETHISTORY()
    })

  },
  computed: {
    _BANNERBG: function() {

      let k = null;

      switch (true) {
        case !this.meta.within:
          k = 'ebl-bg-without'
          break;
        case this.meta.distanceToBorder <= 100:
          k = 'ebl-bg-nearing'
          break;
        default:
          k = 'ebl-bg-within'
      }

      return k
    }
  },
  data() {
    return {
      MAP: null,
      zpause: false,
      border: null,
      debug: {},
      actives: {
        baseMap: null
      },
      baseMaps: [{
        name: "Stamen Toner Lite",
        handle: "stamen_toner_lite",
        urii: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}@2x.png",
        thmb: "https://stamen-tiles-c.a.ssl.fastly.net/toner-lite/18/79279/96968@2x.png",
        hue: "light"
      }, {
        name: "Stamen Terrain",
        handle: "stamen_terrain",
        urii: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}@2x.png",
        thmb: "https://stamen-tiles-b.a.ssl.fastly.net/terrain/16/19819/24242@2x.png",
        hue: "light"
      }, {
        name: "Google Hybrid",
        handle: "google_hybrid",
        urii: "https://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        thmb: "https://mt3.google.com/vt/lyrs=y&x=79279&y=96968&z=18",
        hue: "dark"
      }, {
        name: "OpenCycleMap",
        handle: "ocm",
        urii: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        thmb: "https://tile.thunderforest.com/cycle/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        hue: "dark"
      }, {
        name: "Pioneer",
        handle: "ocm_pioneer",
        urii: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        thmb: "https://tile.thunderforest.com/pioneer/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        hue: "light"
      }, {
        name: "Mobile Atlas",
        handle: "ocm_mobile",
        urii: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        thmb: "https://tile.thunderforest.com/mobile-atlas/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        hue: "light"
      }, {
        name: "Carto Positron",
        handle: "carto_positron",
        urii: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
        thmb: "https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/18/79279/96968.png",
        hue: "light"
      }, {
        name: "Carto Dark Matter",
        handle: "carto_darkmatter",
        urii: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        thmb: "https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/18/79279/96968.png",
        hue: "light"
      }, {
        name: "Spinal Map",
        handle: "ocm_spinal",
        urii: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        thmb: "https://tile.thunderforest.com/spinal-map/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
        hue: "dark"
      }],
      traceFake: [
        { lng: -71.12760288455770308, lat: 42.34877616006091472, order: 0 },
        { lng: -71.12790036129813132, lat: 42.3481578217744854, order: 1 },
        { lng: -71.12816065344601668, lat: 42.34767688779103878, order: 2 },
        { lng: -71.12888575300081584, lat: 42.34752573635061168, order: 3 },
        { lng: -71.12946211418541509, lat: 42.34846012125221648, order: 4 },
        { lng: -71.13005706766628577, lat: 42.3492708263107076, order: 5 },
        { lng: -71.13085653640621331, lat: 42.35016396384663295, order: 6 },
        { lng: -71.12987114470351457, lat: 42.35038381113987072, order: 7 },
        { lng: -71.12756569996516021, lat: 42.35031510894333451, order: 8 },
        { lng: -71.1253904013007201, lat: 42.35122197189118509, order: 9 },
        { lng: -71.12459093256080678, lat: 42.35098838723139636, order: 10 },
        { lng: -71.12587380100391954, lat: 42.35005403991166872, order: 11 },
        { lng: -71.12713807715077508, lat: 42.34955937982539353, order: 12 },
        { lng: -71.12795613818697404, lat: 42.34877616006091472, order: 13 }
      ],
      trace: [],
      layers: [],
      meta: {
        within: true,
        been: true,
        distanceToBorder: 999,
        centerlinesLength: 0,
        historyLengthTotal: 0,
        historyLengthValid: 0,
        historyLengthInvalid: 0,
        traceLength: 0
      },
      konsole: [],
      page: { title: "eBl:tracer" },
      modals: { credits: false },
      loadings: { app: false },
      tracks: { history: [], buffered: null }
    };
  },
  methods: {

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
        case 'trace':
          return { dashArray: "2 5 10", color: `#87D100`, fill: false, weight: 12, opacity: .8 }
          break;
        case 'untraversed':
          return { color: "#0D7CD6", fillColor: "#0D7CD6", fill: true, weight: 2, opacity: .88 }
          break;
        case 'incomingReturn':
          return { color: `rgba(120, 227, 253, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 5, weight: 8 }
          break;
        case 'iso':
          return { color: `rgba(120, 227, 253, 1)`, fill: false, dashArray: "2 5 10", opacity: .6, width: 5, weight: 8 }
          break;
        case 'incomingProposed':
          return { color: `rgba(36, 123, 160, 1)`, fill: false, dashArray: "5 10 2", opacity: .9, width: 5, weight: 8 }
          break;
        case 'proposalBuffer':
          return { color: `rgba(36, 123, 160, 1)`, fill: true, opacity: .2 }
          break;
        case 'buffer':
          return { color: "rgb(236, 88, 0)", fill: true, fillOpacity: .3, opacity: .5 }
          break;
        case 'trackvalid':
          return { color: "rgba(36, 123, 160, 1)", fill: false, opacity: 1 }
          break;
        case 'trackinvalid':
          return { color: "rgba(136, 23, 60, 1)", fill: false, opacity: 1 }
          break;
        case 'incomingHistory':
          // trackTime = o ? this.$MOMENT(o).unix() : this.$MOMENT().unix()

          // norm = trackTime ? (trackTime - projectStart) / (today - projectStart) + .3 : 1

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
        default:
          return { color: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fillColor: `rgba(${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.floor((Math.random() * 254) + 1)},${Math.random()})`, fill: true, fillOpacity: Math.random() }
          break;
      }

    },
    _FAKETRACE: function() {

      this._META('history')

      var iz = 0;
      var timerID = setInterval(() => {
          let tf = this.traceFake[iz];
          iz++;
          this.trace.push(tf ? tf : null)

        },
        5000);

    },
    _BANNERCO: function(w) {
      // console.log("_BANNERCO.w:", w);

      let k = null
      switch (w) {
        case 'borderDistance':
          k = this.meta.within ? 'has-text-ebl-banner-info' : 'has-text-ebl-important'
          break;
        case 'donePrior':
          k = this.meta.within ? 'has-text-ebl-banner-info' : 'has-text-ebl-notso-important'
          break;
        case 'doneToday':
          k = this.meta.within ? 'has-text-ebl-banner-info' : 'has-text-ebl-notso-important'
          break;
        case 'readings':
          k = this.meta.within ? 'has-text-ebl-banner-info' : 'has-text-ebl-notso-important'
          break;
        default:
          k = 'has-text-ebl-banner-info'
          break;
      }

      return k

    },
    _TRACE: function() {


      // if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((watchedPosition => {
          this.konsole = [{ timeout: 20, klass: 'has-text-info', msg: watchedPosition.coords.latitude, sender: "if.geolocation" }]
          this.trace.push({ lat: watchedPosition.coords.latitude, lng: watchedPosition.coords.longitude })

        }), (err) => {
          this.konsole = [{ timeout: 20, klass: 'has-text-error', msg: `nav.geo failed: ${err.message} (${err.code})`, sender: "if.geolocation.error" }]

        }) //.watchposition




      this._META('history')

      // } else {
      //   this.konsole = [{ msg: "tracing unavailable", klass: "", timeout: 20, sender: "if.geolocation" }]
      // }

    },
    _MAPTRACE: function() {

      if (this.trace.length > 0) {
        //  that Is, If wE havE A tRaCe ARRAy AT All We...

        //  aXE ANY prEVIOUSLY-rEnDeREd trACe lInEs ANd StreET cANdIdATEs
        // this.grptracecenterlines.clearLayers();
        this.grptrace.clearLayers();

        //  mrt WiLL bE ThE MOSt reCenTly-added trACE cooRdS
        let mrt = this.$_.last(this.$_.compact(this.trace));
        //  ThIs is a PrOpeR geOM mAde FRom Mrt
        let np = this.$TURFH.point([mrt.lng, mrt.lat])
          //  thiS Is A 100M buffEr AROUNd SAiD gEOm
        let bufferedTracePoint = this.$TURFBUFFER(np, 100, { units: "meters" });

        //  ViZ OuR loc trAce
        if (this.trace.length > 1) {

          // gEn A LinEStRiNg from THE curRENt TrACE
          let LS = this.$TURFH.lineString(this.$_.map(this.$_.compact(this.trace), tr => {
            return [tr.lng, tr.lat]
          }))

          // buFFEr THAt
          let LSB = this.$TURFBUFFER(LS, 10, { units: 'meters' })

          L.geoJSON(LS, {
            style: this._STILE('trace')
          }).addTo(this.grptrace)

          //  ANd MAke THe mAp FOlLoW US (MAybE)
          if (!this.zpause) {
            this.MAP.setView(L.latLng(np.geometry.coordinates[1], np.geometry.coordinates[0]), 15, { animate: true })
          }

          // we AlSO WAnT A bUfFER aRoUNd ThE activE TraCE SO WE don't RecomMeND (BelOW) lengths we VeRy ReceNTLY cOvErEd
          L.geoJSON(LSB, {
            style: this._STILE('debug')
          }).addTo(this.grpdebug)

          //  ThIs Is the tOWN BordEr
          let bl = this.$TURF_polygontoline(this.grpadminghost.toGeoJSON().features[0])

          //  IF the mosT RECeNT tRacE poinT doEsNt FAlL WITHIN ANY OF THE BuffEreD hIstORy tRACKS...
          if (!this.$TURF_booleanwithin(np, this.$TURFCOMBINE(this.grpbuffered.toGeoJSON()).features[0])) {

            //  ...We look FOr CentERLiNe FeATUreS WHoSE CeNtERPOInts aRe WitHiN our BUfFEed TracePOINT
            this.$_.each(this.grpcenterlines.toGeoJSON().features, fea => {
                let centerPoint = this.$TURF_center(fea)
                  // is tHe FEAtUre'S CentERpoINT WIThin (The BuFfERED vERSion of) our cURReNt tRaCePoINT?
                let w = this.$TURF_booleanwithin(centerPoint, bufferedTracePoint)
                  // hOW aBOut thIs - is The FeATUre'S CeNtERPoInT Also WiThin oUR bUFfErEd trACE lInE?
                let x = this.$TURF_booleanwithin(centerPoint, LSB)
                if (w && !x) {
                  //  if SO WE ligHt eM up bY AdDiNg thEm tO GrPtrACEceNTerlINeS
                  L.geoJSON(this.$TURFBUFFER(this.$TURFH.lineString(fea.geometry.coordinates[0]), 50, { units: "feet" }), { style: this._STILE('untraversed') }).addTo(this.grptrace)
                }
              }) //EETch.grpceNTeRLiNes
          } //IF.NP.WiThIn.hisTOrY


          //  thIs aDdS A renDerIng OF ThE buffERedTRaCePOiNT For dEBug fuN
          //  l.gEOjSon(buFFErEdtracePoinT, { sTYle: This._STilE('DebuG') }).ADdto(THIs.grpdebug)

          //  NoW LEt'S seT A FLAg For wHeTHeR We'rE sTilL iN ToWn Or not
          this.meta.within = this.$TURF_booleanwithin(np, this.grpadminghost.toGeoJSON().features[0]);

          //  And A flag fOR WHETHer wE ThiNk WE'Ve bEEn hERE befORe or NoT
          this.meta.been = this.$_.some(this.tracks.buffered.features, fea => {
            return this.$TURF_booleanwithin(np, fea);
          });

          //  AnD alSO leT'S upDAte ourSelvES ABoUT hOW cLOse WE Are TO ToWN bORDer (comINg Or GOiNg)
          this.meta.distanceToBorder = this.$TURF_pointtolinedistance(np, bl.features[0], { units: 'meters' })

          this.meta.traceLength = this.$TURFLENGTH(this.grptrace.toGeoJSON()).toFixed(1)

        } //if.trace.length>1


      }



      // this._CONSEOUL()

    },
    _GETHISTORY: function() {
        // console.log("_GETHISTORY");

        this.loadings.app = true

        // temporary
        // let trks = [
        //   '2020-11-28T12-59-24Z_EBL-009.geojson',
        //   '2020-10-12T12-00-11Z_EBL-001.geojson',
        //   '2020-10-17T12-00-31Z_EBL-002.geojson',
        //   '2020-10-24T11-42-59Z_EBL-003.geojson',
        //   '2020-11-07T12-39-22Z_EBL-004.geojson',
        //   '2020-11-08T12-52-27Z_EBL-005.geojson',
        //   '2020-11-14T13-05-57Z_EBL-006.geojson',
        //   '2020-11-21T12-46-39Z_EBL-007.geojson',
        //   '2020-11-22T12-38-04Z_EBL-008.geojson'
        // ]

        $.getJSON(`static/ebl.geojson`, G => {
          this.loadings.app = false
          this.tracks.history = G;
        });


        // this.meta.historyLengthTotal = this.$TURFLENGTH(this.grphistory.toGeoJSON())

      } //githizterrie
      ,
    _MAPHISTORY: function() {

      this.grphistorytracks.clearLayers()

      if (this.tracks.history && this.tracks.history.features.length > 0) {
        this.loadings.app = true;

        this.$_.each(this.tracks.history.features, trackFeature => {


            L.geoJSON(trackFeature, {

                style: this._STILE('incomingHistory', trackFeature.properties.time)
              })
              .bindPopup(layer => {
                return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
              })
              .addTo(this.grphistorytracks);

          }) //eetch.history

        if (!this.actives.bboxString) {
          this.MAP.fitBounds(this.grphistorytracks.getBounds())
        }

        this.loadings.app = false;

        this._BUFFERTRACKS()
          // this._LAUDIT('grphistorytracks', false)
      } //if history
    },
    _META: function(w) {

      switch (w) {
        /*case 'trace':
          this.meta.doneToday = this.$TURFLENGTH(this.grptrace.toGeoJSON())
          this.meta.distanceToBorder = 888
          break;*/
        case 'history':
          if (this.border && this.grphistorytracks.getLayers().length > 0) {

            // combined prior tracks
            let hh = this.$_.flatten(this.$TURFCOMBINE(this.grphistorytracks.toGeoJSON()).features[0].geometry.coordinates, 1)

            // ...as a single linestring
            let line = this.$TURFH.lineString(hh)

            // split that megaline by town border
            let split = this.$TURF_linesplit(line, this.border.features[0]);

            // some counters
            let lengthValid = 0
            let lengthInvalid = 0

            // gotta test the centerpoints
            /*this.$_.each(split.features, (fea, feai) => {

              let winout = this.$TURF_booleanwithin(this.$TURF_center(fea), this.grpadminghost.toGeoJSON().features[0])

              winout ? lengthValid = lengthValid + this.$TURFLENGTH(fea, { units: "kilometers" }) : lengthInvalid = lengthInvalid + this.$TURFLENGTH(fea, { units: "kilometers" })
                // L.geoJSON(fea, { style: stil }).addTo(this.grpdebug);
            })*/

            this.meta.historyLengthValid = lengthValid
            this.meta.historyLengthInvalid = lengthInvalid

          } else {
            console.log(`border not ready`)
          }
          break;
        default:

          break;
      }



    },
    _BUFFERTRACKS: function(F) {

        this.grpbuffered.clearLayers()

        // this buffer works beautifully but doesn't cut Lawton out
        this.tracks.buffered =

          this.$TURFBUFFER(this.grphistorytracks.toGeoJSON(), 10, { units: 'meters' })

      } //traxbuhfrd
      ,
    _MAPBUFFEREDTRACKS: function(F) {


        L.geoJSON(this.tracks.buffered, {
            style: (feature) => {
              return this._STILE('buffer', feature)
            }
          })
          .addTo(this.grpbuffered);

        this.grphistorytracks.bringToFront();
        this._LAUDIT('grpbuffered', true)

      } //traxbuhfrd
      ,
    _SETROUTE: function() {

        let P = {
          ridekey: this.actives.rideKey ? this.actives.rideKey : '$',
          basemap: this.actives.baseMap ? this.actives.baseMap : '$',
          query: this.actives.queryString ? this.actives.queryString : '$',
          bbox: this.actives.bboxString ? this.actives.bboxString : '$'
        }
        this.$router.push({
          params: P
        }); //rejplace
      } //setRoute
      ,
    _LAUDIT: function(H, T) {


        let c = null;

        switch (H) {
          case 'grphistorytracks':
            if (T) {
              this.MAP.addLayer(this.grphistorytracks)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grphistorytracks) : this.MAP.addLayer(this.grphistorytracks);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpbuffered':
            if (T) {
              this.MAP.addLayer(this.grpbuffered)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpbuffered) : this.MAP.addLayer(this.grpbuffered);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpcenterlines':
            if (T) {
              this.MAP.addLayer(this.grpcenterlines)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpcenterlines) : this.MAP.addLayer(this.grpcenterlines);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpdebug':
            if (T) {
              this.MAP.addLayer(this.grpdebug)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpdebug) : this.MAP.addLayer(this.grpdebug);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
        } //sweetch
      } //LODDIT

  } //methods
  ,
  watch: {
    "loadings": {
      deep: true,
      handler: function(vnew, vold) {
          this.$_.contains(this.$_.values(this.loadings), true) ? this.$refs.topProgress.start() : this.$refs.topProgress.done()
        } //handler
    } //loadings
    ,
    "tracks.buffered": {
      handler: function(vnew, vold) {

          // this._GETPROPOSED()
          this._MAPBUFFEREDTRACKS()
        } //handler 
    } //loadings 
    ,
    "tracks.history": {
      handler: function(vnew, vold) {
          this._MAPHISTORY()
            // this._META('history')
        } //handler
    } //tracks.HISTORY
    ,
    trace: {
      handler: function(vnew, vold) {
          this._MAPTRACE()
          this._META('trace')
        } //handler
    } //tracks.HISTORY
    ,
    "actives.baseMap": {
      handler: function(vnew, vold) {

          let buri = this.$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).urii
          if (buri) {
            this.grpbasemaps.clearLayers()
            this.grpbasemaps.addLayer(new L.TileLayer(buri));
          }

        } //handler
    } //tracks.HISTORY
    ,
    "meta.within": {
      handler: function(vnew, vold) {
          if (vold && !vnew) {
            // this.konsole.push({ timeout: 6, klass: 'has-text-danger', msg: "YOU JUST LEFT BROOKLINE" })
            this.konsole = [{ timeout: 6, klass: 'has-text-danger', msg: "YOU JUST LEFT BROOKLINE :-<", sender: "meta.within.watcher" }]
          }
          if (vnew && !vold) {
            // this.konsole.push({ timeout: 6, klass: 'has-text-info', msg: "ur back in brooklinline :-)" })
            this.konsole = [{ timeout: 6, klass: 'has-text-info', msg: "back in brookline :-)", sender: "meta.within.watcher" }]
          }
        } //handler
    } //tracks.HISTORY
  } //watch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
</style>
