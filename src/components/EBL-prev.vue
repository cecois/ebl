<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress color="rgba(236, 88, 0, 1)" ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav :class="['navbar',meta.within?'ebl-bg-within':'ebl-bg-without']" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
      {{page.title}}
    </a>
      </div>
      <div class="navbar-item is-pulled-right">
        <span v-if="meta.been">(you've probably been here already)</span>
        <span v-if="meta.distanceToBorder">&nbsp;({{`${Number(Math.round(meta.distanceToBorder+'e'+1)+'e-'+1)}`}}km from border)</span>
      </div>
    </nav>
    <div class="columns p-0 m-0 is-relative" id="konsole-wrapper">
      <div v-if="this.$CONFIG.debug" class="column is-full p-2" id="ddebug">
        {{ JSON.stringify(debug) }}
      </div nb="/#ddebug">
      <div v-if="konsole.length>0" id="konsole" class="column is-full is-size-7 p-2">
        <div v-for="M in konsole" id="konsole-copy" :class="['level-item','has-text-centered',M.klass,`faded${M.timeout}`]">
          <div>
            <p>{{M.msg}}</p>
          </div>
        </div>
      </div>
    </div nb="/.columns.parentOf.DdEBUG">
    <!--                                                                               __      __
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals        ____ ___  ____  ____/ /___ _/ /____
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals       / __ `__ \/ __ \/ __  / __ `/ / ___/
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals      / / / / / / /_/ / /_/ / /_/ / (__  )
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals     /_/ /_/ /_/\____/\__,_/\__,_/_/____/
modalsmodalsmodalsmodalsmodalsmodalsmodalsmodalsmodals      
-->
    <div id="ebl-modal-dropzone" :class="['modal','has-text-weight-bold',modals.dropzone?'is-active':'']">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h3 class="is-size-3 has-text-centered">{{dropzone.msg}}</h3>
        <div class="columns">
          <div class="pt-6 pr-2 column is-one-third">
            <div v-if="dropzone.state=='dropped' && tracks.incoming" class="">
              <div v-for="track in tracks.incoming">
                <p class="title is-4"><i class="fa fa-bezier-curve" :style="`color:${_STILE('incomingDefault').color}`"></i> {{track.features[0].properties.name}}</p>
                <p v-html="`~${Math.round($TURFLENGTH(track.features[0].geometry,{units:'miles'}))}mi on ${$MOMENT(track.features[0].properties.time).format('YYYY.MMM.Do')}`" class="subtitle is-6"></p>
                <!-- <span @click="tracks.incoming=null;modals.dropzone=null" class="ebl-button icon is-medium">
      <i class="fas fa-eject fa-2x"></i>
    </span> -->
              </div>
              <span @click="_DROPSTORE()" class="ebl-button icon is-medium">
      <i class="fas fa-check-double fa-2x"></i>
    </span>
            </div>
          </div NB="/.kahlum">
          <!-- <div class="column is-one-half">
            <div id="vap"></div>
          </div NB="/.one-half"> -->
        </div NB="/.kahlumz">
      </div NB="/.modal-content">
      <button @click="modals.dropzone=false" class="modal-close is-large" aria-label="close"></button>
    </div nb="/.ebl-panel dRAHppzoAN">
    <!-- miso
    _
   (_)________
  / / ___/ __ \
 / (__  ) /_/ /
/_/____/\____/
 -->
    <div :class="['mt-6','modal',modals.trackIso?'is-active':'']" id="modal-track-iso">
      <div class="modal-background"></div>
      <div class="modal-content">
        <nav class="level">
          <!-- total distance, distance outside of bline, time, avg heartrate 

isoTrackStates.name
isoTrackStates.distance
isoTrackStates.distanceDisqual
isoTrackStates.date
isoTrackStates.heartAvg
-->
          <div v-if="isoTrack" class="level-item has-text-centered">
            <div>
              <button @click="actives.rideKey=null" class="modal-close"></button>
              <p class="heading">Name</p>
              <p class="title">{{isoTrackStats.name}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Distance</p>
              <p class="title">{{isoTrackStats.distance}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Distance Disqual.</p>
              <p class="title">{{isoTrackStats.distanceDisqual}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Date</p>
              <p class="title">{{isoTrackStats.date}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">🖤 (avg.)</p>
              <p class="title">{{isoTrackStats.heartAvg}}</p>
            </div>
          </div>
        </nav>
      </div nb="/.modal-content">
    </div nb="/#modal-track-iso">
    <div :class="['modal',modals.trackMenu?'is-active':'']" id="modal-track-menu">
      <div class="modal-background"></div>
      <div class="modal-content">
        <button @click="modals.trackMenu=false" class="modal-close is-large" aria-label="close"></button>
        <div class="columns">
          <div class="column is-full has-text-centered">
            <nav id="trackHistoryPanel" class="panel">
              <p class="panel-heading">
                Tracks
              </p>
              <div class="panel-block">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="" v-model="liveFilter.string">
                  <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
                </p>
              </div>
              <p class="panel-tabs">
                temporal ctrl goes here
              </p>
              <a @click.prevent="actives.rideKey=trk.name" v-for="trk in trackHistoryMenu" class="panel-block is-ac,waye">
                <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span> {{trk.name}}
              </a>
            </nav>
          </div nb="/.column (trackHistoryPanel's parent)">
          <div class="column is-one-third">
            <!-- <div class="column is-full has-text-centered">
              <div id="hap"></div>
            </div nb="/.column"> -->
          </div nb="/.column (hap's parent)">
        </div nb="/.columns">
      </div nb="/.modal-content">
    </div nb="/#modal-track-menu">
    <div :class="['modal']" id="modal-file-drop">
      <div class="modal-background"></div>
      <div class="modal-content">
        {{dropzone.state}} {{dropzone.msg}}
      </div>
      <button @click="modals.dropzone=false" class="modal-close is-large" aria-label="close"></button>
    </div>
    <div :class="['modal',modals.credits?'is-active':'','has-text-centered']" id="modal-credits">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="navbar-item has-text-light">
          <span v-if="meta.historyLength">{{Number(Math.round(meta.historyLength+'e'+1)+'e-'+1)}}km down of </span>&nbsp;
          <span v-if="meta.centerlinesLength">{{`${Number(Math.round(meta.centerlinesLength+'e'+1)+'e-'+1)}`}}km total</span>
          <span v-if="meta.proposedLength">&nbsp;({{`${Number(Math.round(meta.proposedLength+'e'+1)+'e-'+1)}`}}km proposed)</span>
        </div>
        <ul class="is-size-7">
          <li v-for="credit in credits">{{credit}}</li>
        </ul>
      </div>
      <button @click="modals.credits=false" class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- 🦶🦶🦶🦶🦶🦶🦶🦶 FOOTER -->
    <footer class="footer pt-1 pb-1 has-text-centered">
      <nav id="ebl-layers" class="level is-mobile pl-2 pr-2">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <a @click.default="modals.credits=true" class="mr-1">
              <i class="fas fa-info-circle"></i>
            </a>
            <a @click.default="modals.trackMenu=true" class="mr-3">
              <i class="fas fa-history"></i>
            </a>
            <!-- <div class="navbar-menu"> -->
            <!-- <div class="navbar-start"> -->
            <a @click.default="_LAUDIT
(L.handle)" v-for="L in layers" class="navbar-item">
              <i :class="[`${L.klass}`,L.on?'ebl-nav-on':'']"><span class="pl-2">{{L.abbrev}}</span></i>
              <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
            </a>
          </div>
        </div>
        <div class="level-right pb-2">
          <span class="is-family-code is-size-7 has-text-grey-lighter pr-2" v-html="`{basemap:${$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).name}}`"></span>
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

    /*navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("pos", pos);

          this.debug = pos.coords.latitude;
        }
      )*/

    // here we do some intercepting of our colloquial router null, the '$'
    this.actives = {
      rideKey: (!this.$route.params.ridekey || this.$route.params.ridekey == '$') ? null : this.$route.params.ridekey,
      baseMap: (!this.$route.params.basemap || this.$route.params.basemap == '$') ? 'stamen_toner_lite' : this.$route.params.basemap,
      queryString: (!this.$route.params.query || this.$route.params.query == '$') ? null : this.$route.params.query,
      bboxString: (!this.$route.params.bbox || this.$route.params.bbox == '$') ? null : this.$route.params.bbox
    }

  },
  mounted: function() {
    this.loadings.app = true;

    this.konsole = [{ msg: new Date(), klass: 'is-info', timeout: 20, timeout: 20 }]

    this.MAP = new L.Map("map", {
        editable: true,
        zoomControl: false,
        center: [42, -72],
        attributionControl: false,
        zoom: 11
      })
      .on('moveend', e => {
        this.actives.bboxString = this.MAP.getBounds().toBBoxString()
      })

    if (this.actives.bboxString) {

      let bba = this.actives.bboxString.split(',')

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

    /*this.VAP = new L.Map("vap", {
      editable: true,
      zoomControl: false,
      center: [42, -72],
      attributionControl: false,
      zoom: 11
    });*/

    /*this.HAP = new L.Map("hap", {
      editable: true,
      zoomControl: false,
      center: [42, -72],
      attributionControl: false,
      zoom: 11
    });*/

    // this.modals = this.$_.clone(this.modalsRestore);

    let p = 408;
    // this._CONSEOUL("p", p);
    // this._CONSEOUL("p + 6", p + 6);


    this.MAP.createPane('pnBasemaps')
      .style.zIndex = (p - 1);
    this.MAP.createPane('pnAdmin')
      .style.zIndex = (p + 0);
    this.MAP.createPane('pnBuffered')
      .style.zIndex = (p + 2);
    this.MAP.createPane('pnBufferedProposal')
      .style.zIndex = (p + 3);
    this.MAP.createPane('pnTracks')
      .style.zIndex = (p + 4);
    this.MAP.createPane('pnProposed')
      .style.zIndex = (p + 5);
    this.MAP.createPane('pnStartfinish')
      .style.zIndex = (p + 6);
    this.MAP.createPane('pnDebug')
      .style.zIndex = (p + 1);
    this.MAP.createPane('pnTraceCenterlines')
      .style.zIndex = (p + 7);
    this.MAP.createPane('pnIso')
      .style.zIndex = (p + 8);
    this.MAP.createPane('pnTrace')
      .style.zIndex = (p + 9);

    /*this.MAP.fitBounds(
      [
        [42.31566161628652, -71.19664326310159],
        [42.36102434112847, -71.06506481766702]
      ]
    )*/


    // console.log("buri", buri);
    /*let tl = "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"

    const baseLayer = new L.TileLayer(
      // this.$CONFIG.mode == '1616' ? tl : "http://localhost:8000/tile-T.png"
      tl
    );

    this.MAP.addLayer(baseLayer);
    */

    if (!this.grpbasemaps) {
      this.grpbasemaps = new L.featureGroup({ pane: 'pnBasemaps' }).addTo(this.MAP)
    }

    if (!this.grpAdminGhost) {
      this.grpAdminGhost = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }
    if (!this.grptrace) {
      this.grptrace = new L.featureGroup({ pane: 'pnTrace' }).addTo(this.MAP)
    }
    if (!this.grptracecenterlines) {
      this.grptracecenterlines = new L.featureGroup({ pane: 'pnTraceCenterlines' }).addTo(this.MAP)
    }
    if (!this.grpAdmin) {
      this.grpAdmin = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }
    if (!this.grpCenterlines) {
      this.grpCenterlines = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }


    let buri = this.$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).urii
    this.grpbasemaps.addLayer(new L.TileLayer(buri));
    // this.HAP.addLayer(new L.TileLayer(buri));

    if (!this.grpBuffered) {
      this.grpBuffered = new L.featureGroup({ pane: 'pnBuffered' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpBuffered', on: false, abbrev: "hstb", klass: 'icon-noun_buffer' })
    }
    if (!this.grpBufferedProposal) {
      this.grpBufferedProposal = new L.featureGroup({ pane: 'pnBufferedProposal' }).addTo(this.MAP)
        // this.layers.push({ handle: 'grpBufferedProposal', on: false, abbrev: "hstb", klass: 'noun_buffer' })
    }

    if (!this.grpHistory) {
      this.grpHistory = new L.featureGroup({ pane: 'pnTracks' }).addTo(this.MAP);
      this.layers.push({ handle: 'grpHistory', on: false, abbrev: "hst", klass: 'icon-noun_history' })
    }
    /*if (!this.grpPreview) {
      this.grpPreview = new L.featureGroup({ pane: "pTracks" }).addTo(this.VAP)
    }*/

    if (!this.grpProposed) {
      this.grpProposed = new L.featureGroup({ pane: 'pnProposed' }).addTo(this.MAP)
        // this.layers.push({ handle: 'grpProposed', on: false, abbrev: "prpsl", klass: 'noun_proposed' })
    }
    if (!this.grpStartfinish) {
      this.grpStartfinish = new L.layerGroup({ pane: 'pnStartfinish' }).addTo(this.MAP)
    }
    if (!this.grpDebug) {
      this.grpDebug = new L.layerGroup({ pane: 'pnDebug' }).addTo(this.MAP)
        // this.layers.push({ handle: 'grpDebug', on: false, abbrev: "dbg", klass: 'bug' })
    }

    if (!this.grpisotracks) {
      this.grpisotracks = new L.featureGroup({ pane: 'pnIso' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpisotracks', on: false, abbrev: "iso", klass: 'icon-noun_binoculars' })
    }


    /* brookline boundary
        __                     __   ___
       / /_  _________  ____  / /__/ (_)___  ___
      / __ \/ ___/ __ \/ __ \/ //_/ / / __ \/ _ \
     / /_/ / /  / /_/ / /_/ / ,< / / / / / /  __/
    /_.___/_/   \____/\____/_/|_/_/_/_/ /_/\___/
    */
    axios
    // .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/brookline`)
    // .get(`https://raw.githubusercontent.com/cecois/milleria-api-v3/master/static/brookline-outline-buffer.geojson`)
      .get(`static/brookline-outline-buffer.geojson`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('brookline'),
            snapIgnore: true
          })
          .addTo(this.grpAdmin);

      }) //axios.then
      .catch(e => {
        // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
        this.konsole = [{ msg: e, klass: "error", timeout: 20 }]
      }) //axios.catch

    axios
    // .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/brookline-outline`)
    // .get(`https://raw.githubusercontent.com/cecois/milleria-api-v3/master/static/brookline-outline.geojson`)
      .get(`static/brookline-outline.geojson`)
      .then(response => {
        this.townOutline = response.data
          // L.geoJSON(response.data, {
          //     style: this._STILE('brookline'),
          //     snapIgnore: true
          //   })
          //   .addTo(this.grpAdmin);

      }) //axios.then
      .catch(e => {
        // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
        this.konsole = [{ msg: e, klass: "error", timeout: 20 }]
      }) //axios.catch


    axios
    // .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/brooklinesghost`)
    // .get(`https://raw.githubusercontent.com/cecois/milleria-api-v3/master/static/brookline.geojson`)
      .get(`static/brookline.geojson`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('ghost'),
            snapIgnore: true
          })
          .addTo(this.grpAdminGhost);


        // let border = this.$TURF_polygontoline(this.grpAdminGhost.toGeoJSON())
        // console.log("this.border", border);

        // this.border = border
        this.border = this.$TURF_polygontoline(this.grpAdminGhost.toGeoJSON().features[0])

        // L.geoJSON(this.border, {
        //     style: { color: `#4aa`, fill: false, width: 5, opacity: 1 },
        //     snapIgnore: true
        //   })
        // .addTo(this.grpAdminGhost);

      }) //axios.then
      // .then(r => {
      // this._RANDOFINISHLINE()
      // this.startfinish = { s: { longitude: -71.127856, latitude: 42.348360 }, f: this._RANDOFINISHLINE() }
      // this.startfinish = { s: this._STARTGET(true), f: this._RANDOFINISHLINE() }

    // })
    .catch(e => {
        // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
        this.konsole = [{ msg: e, klass: "error", timeout: 20 }]
      }) //axios.catch

    // axios
    // .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/centerlines`)
    // https://github.com/cecois/milleria-api-v3/blob/master/static/brookline-osm-centerlines.geojson
    // .get(`https://raw.githubusercontent.com/cecois/milleria-api-v3/master/static/brookline-osm-centerlines.geojson`)
    // .then(response => { L.geoJSON(response.data.payload, { style: this._STILE('centerlines') }).addTo(this.grpCenterlines); }) //axios.then
    // .catch(e => {
    // this.konsole.push({ msg: e, klass: "error", timeout: 20 }) 
    // this.konsole = [{ msg: e, klass: "error", timeout: 20 }]
    // }) //axios.catch 
    // .then(r => { this._META('centerlines') })

    $.getJSON('static/brookline-osm-centerlines.geojson', G => {
      L.geoJSON(G, { style: this._STILE('centerlines') }).addTo(this.grpCenterlines);
      this._META('centerlines')
    });



    this._GETHISTORY()


    /* ++++++++++++++++++++++++++++++++++++++++++ dropzone */
    window.addEventListener("dragenter", e => {
      e.preventDefault();
      this.dropzone.state = "drag";
      this.modals.dropzone = true;
      this.dropzone.msg = "DROP ANYWHERE";
      this.modals.dropzone = true;
    });

    window.addEventListener("dragleave", e => {
      e.preventDefault();
      this.dropzone.state = "idle";
      this.modals.dropzone = true;
      this.dropzone.msg = "DROP ANYWHERE";
    });

    window.addEventListener("dragover", e => {
      e.preventDefault();
      this.modals.dropzone = true;
      this.dropzone.msg = "DROP ANYWHERE";
    });

    window.addEventListener("drop", e => {
      e.preventDefault();

      this.dropzone.state = "dropped";
      this.dropzone.msg = "PLZ REVIEW...";
      // this.modals.dropzone=false;

      //drop.do
      let filz = e.dataTransfer.files;
      // this.loadings.app = true

      this.$_.each(filz, (fil, fili, fill) => {

          this._DROPACCEPT(fil);

        }) //each.filz
    });

    /* +++++++++++++++++++ /dropzone */

    document.addEventListener("keydown", (e) => {

      // if (e.key.toLowerCase() == 'alt') {
      //   this.modalKick = !this.modalKick;
      // }
      if (e.key.toLowerCase() == 'escape') {

        this.$_.each(this.$_.allKeys(this.modals), mok => {
          this.modals[mok] = false;
        })

        // this.modals.result=false
        // this.modals.edit=false
      }
    })

    this.loadings.app = false;

    // this._GETHISTORY();
    if (window.location.hostname == 'localhost') {
      this.konsole = [{ msg: "not tracing on localhost", klass: "info", timeout: 6 }]
    } else {
      this._TRACE()
    }

  },
  computed: {
    isoTrackStats: function() {

      let its = {
        name: null,
        distance: null,
        distanceDisqual: null,
        date: null,
        heartAvg: null
      }
      return !this.isoTrack ? its : {
        name: this.isoTrack.features[0].properties.name,
        distance: `${this.$TURFLENGTH(this.grpisotracks.toGeoJSON(), { units: "kilometers" }).toFixed(2)}km`,
        distanceDisqual: 'fcmng',
        date: this.$MOMENT(this.isoTrack.features[0].properties.time).format('YY.MMM.Do'),
        heartAvg: Math.round(this.$_.reduce(this.isoTrack.features[0].properties.heartRates, (memo, num) => {
          return memo + num;
        }, 0) / this.isoTrack.features[0].properties.heartRates.length)
      }

    },
    trackHistoryMenu: function() {

      let propArray = this.$_.map(this.tracks.history, T => {
        return T.features[0].properties
      })


      return !this.liveFilter.string ? propArray : this.$_.filter(propArray, prop => {
        return prop.name.toLowerCase().indexOf(this.liveFilter.string) >= 0
      })

    },
    googleReviewOut: function() {

        let vias = this.viasOut.length > 0 ? `/${this.viasOut.join('/')}/` : `/`

        return this.startfinish ? `https://www.google.com/maps/dir/${this.startfinish.s.latitude},${this.startfinish.s.longitude}${vias}${this.startfinish.f.latitude},${this.startfinish.f.longitude}/data=!3m1!4b1!4m2!4m1!3e1` : null

      } //gugulruvyew
      ,
    googleReviewBack: function() {

        let vias = this.viasBack.length > 0 ? `/${this.viasBack.join('/')}/` : `/`

        return this.startfinish && this.tracks.reetern ? `https://www.google.com/maps/dir/${this.startfinish.f.latitude},${this.startfinish.f.longitude}${vias}42.348340,-71.128191/data=!3m1!4b1!4m2!4m1!3e1` : null

      } //gugulruvyew
  },
  data() {
    return {
      MAP: null,
      debug: {},
      isoTrack: null,
      liveFilter: { string: null },
      actives: {
        rideKey: null,
        baseMap: null,
        queryString: null,
        bboxString: null
      },
      border: null,
      HERE: null,
      baseMaps: [{
        name: "Stamen Toner Lite",
        handle: "stamen_toner_lite",
        urii: "http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png",
        thmb: "http://c.tile.stamen.com/toner-lite/18/79279/96968@2x.png",
        hue: "light"
      }, {
        name: "Google Hybrid",
        handle: "google_hybrid",
        urii: "http://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        thmb: "http://mt3.google.com/vt/lyrs=y&x=79279&y=96968&z=18",
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
      traceFakeLIM: [
        { lng: -71.12760288455770308, lat: 42.34877616006091472, order: 0 }

      ],
      trace: [],
      avoid: true,
      modalKick: false,
      layers: [],
      midPointsOut: [],
      midPointsBack: [],
      viasOut: [],
      viasBack: [],
      meta: {
        within: true,
        been: false,
        distanceToBorder: null,
        centerlinesLength: null,
        historyLength: null,
        proposedLength: null
      },
      startfinish: { s: { longitude: null, latitude: null }, f: { longitude: null, latitude: null } }, //og [long,lat]
      konsole: [],
      dropzone: { state: null, msg: null },
      page: { title: "evERyBlINelINE:dAshboarD", splayed: false },
      modals: { dropzone: false, credits: false, trackMenu: false, trackIso: false },
      loadings: { app: false },
      console: { state: null, msgs: [] },
      tracks: { incoming: [], history: [], proposed: [], buffered: null, bufferedProposal: null, reetern: null },
      credits: [
        "routing: openrouteservice.org | OpenStreetMap contributors",
        "buffered tracks icon: outline by Jellycons from the Noun Project", "tracks icon: route by Andrejs Kirma from the Noun Project", "tracks review icon: Test Tube by Icon Island from the Noun Project", "proposed route icon: Vector by logan from the Noun Project",
        "isolated track icon: Binoculars by praveen patchu from the Noun Project"
      ]
    };
  },
  methods: {

    _TI: function() {

      // let tracksinside = 
      // var line = this.$TURFH.lineString(this.tracks.history);
      var splitter = this.$TURFH.lineString(this.townOutline);

      var split = this.$TURF_linesplit(this.tracks.history, splitter);

      // console.log("split", split);

    },
    _SETVIAS: function() {


        if (this.grpProposed && this.grpProposed.toGeoJSON().features) {


          if (this.grpProposed.toGeoJSON().features.length > 0) {
            // sample only works w/ a featurecollection made from the vertices
            let fco = this.$TURFH.featureCollection(
              this.$_.map(this.grpProposed.toGeoJSON().features[0].geometry.coordinates, (c, i) => {
                return this.$TURFH.point(c, { name: i })
              })
            )


            let fcb = this.$TURFH.featureCollection(
              this.$_.map(this.grpProposed.toGeoJSON().features[1].geometry.coordinates, (c, i) => {
                return this.$TURFH.point(c, { name: i })
              })
            )

            // draw the samples here
            let sao = this.$_.map(this.$TURFSAMPLE(fco, 10).features, fea => {
              return [fea.geometry.coordinates[1], fea.geometry.coordinates[0]]
            })

            let sab = this.$_.map(this.$TURFSAMPLE(fcb, 10).features, fea => {
              return [fea.geometry.coordinates[1], fea.geometry.coordinates[0]]
            })

            //but it comes in random order, so we reassociate an i using the vertex from which the sample wz drawn and order by it
            let sto = this.$_.map(this.$_.sortBy(this.$_.map(sao, s => {
              let iv = this.$_.find(fco.features, fcfea => {
                return (fcfea.geometry.coordinates[0] == s[1] && fcfea.geometry.coordinates[1] == s[0])

              })
              return { lat: s[0], lng: s[1], iv: iv.properties.name }
            }), 'iv'), iv => {
              return [iv.lat, iv.lng]
            })

            let stb = this.$_.map(this.$_.sortBy(this.$_.map(sab, s => {
              let iv = this.$_.find(fcb.features, fcfea => {
                return (fcfea.geometry.coordinates[0] == s[1] && fcfea.geometry.coordinates[1] == s[0])

              })
              return { lat: s[0], lng: s[1], iv: iv.properties.name }
            }), 'iv'), iv => {
              return [iv.lat, iv.lng]
            })

            // finally we store them for others to use
            this.viasOut = sto;
            this.viasBack = stb;
          } //features is only 1 long


          /*        _       _____ ____  ___        __
           _   __(_)___ _/ ___// __ )/   | _____/ /__
          | | / / / __ `/\__ \/ __  / /| |/ ___/ //_/
          | |/ / / /_/ /___/ / /_/ / ___ / /__/ ,<
          |___/_/\__,_//____/_____/_/  |_\___/_/|_|
          */
          /*
                    if (this.grpProposed.toGeoJSON().features.length == 2) {
                      // sample only works w/ a featurecollection made from the vertices
                      let bfc = this.$TURFH.featureCollection(
                        this.$_.map(this.grpProposed.toGeoJSON().features[1].geometry.coordinates, (c, i) => {
                          return this.$TURFH.point(c, { name: i })
                        })
                      )

                      // draw the sample here
                      let bsa = this.$_.map(this.$TURFSAMPLE(bfc, 15).features, fea => {
                        return [fea.geometry.coordinates[1], fea.geometry.coordinates[0]]
                      })

                      //but it comes in random order, so we reassociate an i using the vertex from which the sample wz drawn and order by it
                      let bst = this.$_.map(this.$_.sortBy(this.$_.map(bsa, s => {
                        let iv = this.$_.find(bfc.features, fcfea => {
                          return (fcfea.geometry.coordinates[0] == s[1] && fcfea.geometry.coordinates[1] == s[0])

                        })
                        return { lat: s[0], lng: s[1], iv: iv.properties.name }
                      }), 'iv'), iv => {
                        return [iv.lat, iv.lng]
                      })

                      // finally we store them for others to use
                      this.viasBack = bst;
                    }*/
        } //features is two long (out and back)

      } //setveeahz
      ,
    _STARTGET: function(S) {



      // geoloc stuff can go here #returnto: navigator.geolocation.getCurrentPosition(success, error, options);

      /*navigator.geolocation.getCurrentPosition((p) => {
        console.log('ploc:', p);
        return p;
      }, (err) => { console.error(err) }, {
        enableHighAccuracy: true
      })*/

      return { longitude: -71.135404, latitude: 42.339326 }

    }, //störtgit
    _RANDOFINISHLINE: function() {

        /*
    _____       _      __
   / __(_)___  (_)____/ /_
  / /_/ / __ \/ / ___/ __ \
 / __/ / / / / (__  ) / / /
/_/ /_/_/ /_/_/____/_/ /_/

gen a random finish point

*/

        let extent = this.$_.map(this.grpAdminGhost.getBounds().toBBoxString().split(","), c => {
          return parseFloat(c)
        })
        let cellSide = 1;

        let blp = this.grpAdminGhost.toGeoJSON().features[0].geometry
          // console.log("blp", blp);
          // let bl2l = this.$TURFPOLYGONIZE(blp)
          // console.log("bl2l", bl2l);
          // let G = L.geoJSON(bl2l, { style: this._STILE('debug') }).addTo(this.grpDebug)
          // let linedFilled = this.$TURFH.polygon(bl2l)
          // console.log("linedFilled", linedFilled);

        let options = { units: 'kilometers', mask: blp };
        let grid = this.$TURFPTGRID(extent, cellSide, options);

        /*       ____________        ______
          ____/ / ____/ __ )__  __/ ____/
         / __  / __/ / __  / / / / / __
        / /_/ / /___/ /_/ / /_/ / /_/ /
        \__,_/_____/_____/\__,_/\____/
        */
        // let G = L.geoJSON(grid, { style: this._STILE('debug') }).addTo(this.grpDebug)

        grid.features = [grid.features[this.$_.random(0, grid.features.length - 1)]]
        let sample = this.$TURFSAMPLE(grid, 1)
          // return this.$_.first(sample.features).geometry.coordinates
        let coords = this.$_.first(sample.features).geometry.coordinates
        return { latitude: coords[1], longitude: coords[0] }

      } //
      ,
    _TRACKMENUOP: function(trkName) {

      this.grpisotracks.clearLayers()
      if (!trkName) {
        this.isoTrack = null;
        this.modals.trackIso = false;
      } else {

        // jic the track menu caused this
        this.modals.trackMenu = false;

        // find the track to isolate
        this.isoTrack = this.$_.find(this.tracks.history, T => {
          // console.log("T", T);
          // console.log("trkName.toLowerCase()", trkName.toLowerCase());
          return (T.features[0].properties.name.toLowerCase() == trkName.toLowerCase())
        })

        // light it up (so to speak)
        L.geoJSON(this.isoTrack.features[0], { style: this._STILE('iso') }).addTo(this.grpisotracks)
          // this.MAP.fitBounds(this.grpisotracks.getBounds())
        this._LAUDIT('grpisotracks', true)
          // pull the panel
        this.modals.trackIso = true
      }

      this.grpisotracks.bringToFront()

    },
    _UTIL: function() {

      const uri = `mongodb+srv://${this.$CONFIG.monguU}:${this.$CONFIG.monguP}@cluster0.dosp5.azure.mongodb.net/${this.$CONFIG.monguD}?retryWrites=true&w=majority`;
      const client = new this.$MONGO(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });

    },
    _META: function(w) {
      // console.log("_META");
      let histories = null
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


          // var splitter = turf.lineString([[130, -15], [130, -35]]);

          // var split = turf.lineSplit(this.grpHistory.toGeoJSON(), splitter);

          /* #returnto - history length needs to first split segments that were outside of brookline
          this.$_.each(this.grpHistory.toGeoJSON().features, f => {
                            let splittedonem = this.$TURF_linesplit(f, this.$_.first(this.grpAdminGhost.toGeoJSON().features)); //works but some segments aren't split
                            L.geoJSON(splittedonem, { style: this._STILE() }).addTo(this.grpDebug)
                            this.$_.each(splittedonem.features, seg => {
                              let testable = this.$TURF_booleanwithin(seg, this.$_.first(this.grpAdminGhost.toGeoJSON().features))
                              if (testable) { L.geoJSON(seg, { style: this._STILE('debug') }).addTo(this.grpDebug) }
                            })
                          });*/

          this.meta.centerlinesLength = this.$TURFLENGTH(this.grpCenterlines.toGeoJSON())
          this.meta.historyLength = this.$TURFLENGTH(this.grpHistory.toGeoJSON())


          /* if (this.grpAdmin.toGeoJSON().features) {
             let fea = this.grpHistory.toGeoJSON().features[0].geometry
             console.log("fea", fea);
             console.log("this.grpAdmin.toGeoJSON().features[0]", this.grpAdmin.toGeoJSON().features[0]);
             // let splitter = this.$TURFCOMBINE(this.$TURFPOLYGONTOLINE(this.$TURFCOMBINE(this.grpAdmin.toGeoJSON().features[0]).features[0]))
             let splitter = this.$TURFPOLYGONTOLINE(this.grpAdmin.toGeoJSON().features[0].geometry).features[0].geometry
             console.log("splitter", splitter);
             // console.log("this.tracks.history", this.$TURFCOMBINE(this.grpHistory.toGeoJSON().features[0].geometry));
             let split = this.$TURFLINESPLIT(fea, splitter);
             console.log("split", split);
             // console.log("split", split);
             let G = L.geoJSON(splitter, { style: this._STILE('debug') })
               .bindPopup(l => {
                 return `l`
               })
               .addTo(this.grpDebug)
           }*/

          this.meta.proposedLength = this.$TURFLENGTH(this.grpProposed.toGeoJSON())
          break;
      }



    },
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
          // buffer can take a second param
          // let projectStart = this.$MOMENT('2020-10-12T12:00:11Z').unix()
          //   let today = this.$MOMENT().unix()
          // trackTime = o ? this.$MOMENT(o.properties.time).unix() : this.$MOMENT().unix()

          // norm = trackTime ? (trackTime - projectStart) / (today - projectStart) + .1 : 1
          return { color: "rgb(236, 88, 0)", fill: true, fillOpacity: .3, opacity: .5 }
          break;
        case 'incomingHistory':
          //history can take a second param
          trackTime = o ? this.$MOMENT(o).unix() : this.$MOMENT().unix()

          norm = trackTime ? (trackTime - projectStart) / (today - projectStart) + .3 : 1

          return { color: "rgb(51, 15, 10)", fill: false, opacity: norm }
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
    _CONSEOUL: function(M, K) {

      if (this.$CONFIG.mode !== '1616') {
        return null;
      }
      if (!M) {
        console.warn('no conseoul M');
      }

      const bg = this._STILE('start').color
      const fg = this._STILE('incomingReturn').color

      const style = `padding: 10px; background-color: ${bg}; color: ${fg}; font-size: .8em; font-weight:800;`;
      console.log(`%c${M}:`, style);
      console.log(K);

    }, //konseoul
    _FAKETRACE: function() {


      var iz = 0;
      var timerID = setInterval(() => {
          let tf = this.traceFake[iz];
          iz++;
          this.trace.push(tf ? tf : null)

        },
        5000);

    },
    _TRACE: function() {

      if ('geolocation' in navigator) {
        this.konsole = [{ timeout: 20, klass: 'has-text-info', msg: `tracing...` }]
        navigator.geolocation.watchPosition((watchedPosition => {
          this.konsole = [{ timeout: 6, klass: 'has-text-info', msg: `${watchedPosition.coords.longitude},${watchedPosition.coords.latitude}` }]
          this.trace.push({ lat: watchedPosition.coords.latitude, lng: watchedPosition.coords.longitude })

        }))
      } else {
        this.konsole = [{ timeout: 20, klass: 'has-text-error', msg: `cannot trace` }]
      }




    },
    _MAPTRACE: function() {

      if (this.trace.length > 0) {
        //  that Is, If wE havE A tRaCe ARRAy AT All We...

        //  aXE ANY prEVIOUSLY-rEnDeREd trACe lInEs ANd StreET cANdIdATEs
        this.grptracecenterlines.clearLayers();
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

          //  ANd MAke THe mAp FOlLoW US
          this.MAP.setView(L.latLng(np.geometry.coordinates[1], np.geometry.coordinates[0]), 17, { animate: true })

          // we AlSO WAnT A bUfFER aRoUNd ThE activE TraCE SO WE don't RecomMeND (BelOW) lengths we VeRy ReceNTLY cOvErEd
          L.geoJSON(LSB, {
            style: this._STILE('debug')
          }).addTo(this.grpDebug)

          //  ThIs Is the tOWN BordEr
          let bl = this.$TURF_polygontoline(this.grpAdminGhost.toGeoJSON().features[0])

          //  IF the mosT RECeNT tRacE poinT doEsNt FAlL WITHIN ANY OF THE BuffEreD hIstORy tRACKS...
          if (!this.$TURF_booleanwithin(np, this.$TURFCOMBINE(this.grpBuffered.toGeoJSON()).features[0])) {

            //  ...We look FOr CentERLiNe FeATUreS WHoSE CeNtERPOInts aRe WitHiN our BUfFEed TracePOINT
            this.$_.each(this.grpCenterlines.toGeoJSON().features, fea => {
                let centerPoint = this.$TURF_center(fea)
                  // is tHe FEAtUre'S CentERpoINT WIThin (The BuFfERED vERSion of) our cURReNt tRaCePoINT?
                let w = this.$TURF_booleanwithin(centerPoint, bufferedTracePoint)
                  // hOW aBOut thIs - is The FeATUre'S CeNtERPoInT Also WiThin oUR bUFfErEd trACE lInE?
                let x = this.$TURF_booleanwithin(centerPoint, LSB)
                if (w && !x) {
                  //  if SO WE ligHt eM up bY AdDiNg thEm tO GrPtrACEceNTerlINeS
                  L.geoJSON(this.$TURFBUFFER(this.$TURFH.lineString(fea.geometry.coordinates[0]), 50, { units: "feet" }), { style: this._STILE('untraversed') }).addTo(this.grptracecenterlines)
                }
              }) //EETch.grpceNTeRLiNes
          } //IF.NP.WiThIn.hisTOrY


          //  thIs aDdS A renDerIng OF ThE buffERedTRaCePOiNT For dEBug fuN
          //  l.gEOjSon(buFFErEdtracePoinT, { sTYle: This._STilE('DebuG') }).ADdto(THIs.GRpDEBUG)

          //  NoW LEt'S seT A FLAg For wHeTHeR We'rE sTilL iN ToWn Or not
          this.meta.within = this.$TURF_booleanwithin(np, this.grpAdminGhost.toGeoJSON().features[0]);

          //  And A flag fOR WHETHer wE ThiNk WE'Ve bEEn hERE befORe or NoT
          this.meta.been = this.$_.some(this.tracks.buffered.features, fea => {
            return this.$TURF_booleanwithin(np, fea);
          });

          //  AnD alSO leT'S upDAte ourSelvES ABoUT hOW cLOse WE Are TO ToWN bORDer (comINg Or GOiNg)
          this.meta.distanceToBorder = this.$TURF_pointtolinedistance(np, bl.features[0], { units: 'kilometers' })

        } //if.trace.length>1


      }



      // this._CONSEOUL()

    },
    _MAPSTARTFINISH: function() {

      this._CONSEOUL('MAPSTARTFINISH', 'running')

      this.grpStartfinish.clearLayers()
      this.grpDebug.clearLayers()

      this.loadings.app = true;


      let STYLS = this._STILE('start');
      this._CONSEOUL('MAPSTARTFINISH.start', this.startfinish.s)

      let S = L.circle([this.startfinish.s.latitude, this.startfinish.s.longitude], { addClass: 'leaflet-vertex-icon-hidden', fillColor: STYLS.fillColor, color: STYLS.color, radius: 100 }).addTo(this.grpStartfinish);
      S.enableEdit();

      S.on('dragstart', (e) => {
        e.layer.setStyle({ color: 'Gray' });
      });

      S.on('dragend', e => {
          this.startfinish.s = { longitude: e.layer.getLatLng().lng, latitude: e.layer.getLatLng().lat }
          e.layer.setStyle({ color: STYLS.color, fillColor: STYLS.fillColor })
            // this._GETPROPOSED()
        }) //dragend


      let STYLF = this._STILE('finish');
      this._CONSEOUL('MAPSTARTFINISH.finish', this.startfinish.finish)

      let F = L.circle([this.startfinish.f.latitude, this.startfinish.f.longitude], { addClass: 'leaflet-vertex-icon-hidden', fillColor: STYLF.fillColor, color: STYLF.color, radius: 100 }).addTo(this.grpStartfinish);
      F.enableEdit();

      F.on('dragstart', (e) => {
        e.layer.setStyle({ color: 'Gray' });
      });
      F.on('dragend', e => {
          // this.startfinish.finish = [e.layer.getLatLng().lng, e.layer.getLatLng().lat]
          this.startfinish.f = { longitude: e.layer.getLatLng().lng, latitude: e.layer.getLatLng().lat }
          e.layer.setStyle({ color: STYLF.color, fillColor: STYLF.fillColor })
            // this._GETPROPOSED()
        }) //dragend

      this.loadings.app = false;
      // this.grpStartfinish.bringToFront();

      this._CONSEOUL()

    },
    _BUFFERFINISH: function() {

      // some feedback
      this.loadings.app = true

      // 500m radius around the finishpoint
      let bufferedFinishPoint = this.$TURFBUFFER(this.$TURFH.point([this.startfinish.f.longitude, this.startfinish.f.latitude]), 500, { units: "meters" });

      // town poly
      let brookline = this.grpAdminGhost.toGeoJSON().features[0];


      let finishr = this.$TURFINTERSECT(bufferedFinishPoint, brookline);

      // let finishl = this.$TURFCOMBINE(this.$TURFBUFFER(this.grpCenterlines.toGeoJSON(), 6, { units: "meters" })).features[0]; //works
      // let finishl = this.$TURFBUFFER(this.grpCenterlines.toGeoJSON(), 6, { units: "meters" }).features[0];

      // let centerlinesUnderThere = this.$TURFINTERSECT(finishl, finishr) //WORKS
      // let centerlinesUnderThereb = this.$TURFINTERSECT(this.grpCenterlines.toGeoJSON(), finishr)
      // console.log("centerlinesUnderTherea", centerlinesUnderThere);
      // console.log("centerlinesUnderThereb", centerlinesUnderThereb);

      // console.log("centerlinesUnderThere", centerlinesUnderThere)

      // let cp = this.$TURF_lineintersect(centerlinesUnderThere, finishl)

      /*let ctrs = []
      this.$TURFM.featureEach(this.grpCenterlines.toGeoJSON(), (currentFeature, fi) => {
        let ctr = this.$TURF_center(currentFeature);
        if (this.$TURF_booleanwithin(ctr, finishr)) {
          ctr.properties.fi = fi
          ctrs.push(ctr)
        }
      })*/

      let extent = this.$TURF_bbox(finishr)

      let cellSide = 100;

      // let blp = this.grpAdminGhost.toGeoJSON().features[0].geometry
      // console.log("blp", blp);
      // let bl2l = this.$TURFPOLYGONIZE(blp)
      // console.log("bl2l", bl2l);
      // let G = L.geoJSON(bl2l, { style: this._STILE('debug') }).addTo(this.grpDebug)
      // let linedFilled = this.$TURFH.polygon(bl2l)
      // console.log("linedFilled", linedFilled);

      let grid = this.$TURFPTGRID(extent, cellSide, { units: 'meters' });

      let nearests = []

      this.$_.each(grid.features, gp => {


          let pt = gp.geometry.coordinates
          let np = this.$TURF_nearestpointonline(this.grpCenterlines.toGeoJSON(), pt, { units: "meters" })
          nearests.push(np)

        }) //each.grid

      // L.geoJSON(nearests).addTo(this.grpDebug)
      // grid.featureEach(f => {
      // })

      // let M = L.geoJSON(extent, { style: this._STILE('debug') }).addTo(this.grpDebug)
      // let G = L.geoJSON(grid, { style: this._STILE('debug') }).addTo(this.grpDebug)
      // this.viasOut = nearests;
      // console.log("nearests", nearests);
      this.viasOut = this.$_.map(nearests, n => {
        return n.geometry.coordinates
      });

      this.$_.each(nearests, c => {
        L.geoJSON(c, {
            style: this._STILE(),
            pointToLayer: function(feature, latlng) {
              return new L.CircleMarker([latlng.lat, latlng.lng], { radius: 12 })
                .bindPopup(`${feature.properties.fi}`)
            }
          })
          .addTo(this.grpDebug)
      })

      // let center = this.$TURFH.multiPolygon(centerlinesUnderThere.geometry)
      // console.log("center", center);

      // L.geoJSON(center, { style: this._STILE() }).addTo(this.grpDebug)

      // let Y = L.geoJSON(centerlinesUnderThere, {
      //     style: this._STILE('debug')
      //   })
      //   .addTo(this.grpDebug)
      // let X = L.geoJSON(cp, {
      //     style: this._STILE('debug')
      //   })
      //   .addTo(this.grpDebug)

      this._LAUDIT('grpDebug', false)
      this.loadings.app = false

      /*+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+
      |d|e|b|u|g|
      +-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+*/


    }, //buphrphinnish
    _MAPDROP: function() {

      // this.grpTracks.clearLayers()
      // this.grpPreview.clearLayers()

      this.loadings.app = true;
      L.geoJSON(this.tracks.incoming, {
          style: this._STILE('incomingDefault')
        })
        .bindPopup(layer => {

          return `<h5 class="is-size-5">${layer.feature.properties.name}</h5><div class="is-size-7 has-text-grey-lighter">(${layer.feature.properties.time})</div>`;
        })
        .addTo(this.grpPreview);

      // this.VAP.fitBounds(this.grpPreview.getBounds())

      this.loadings.app = false;
      this.grpPreview.bringToFront();

    },
    _MAPHISTORY: function() {

      this.grpHistory.clearLayers()

      if (this.tracks.history && this.tracks.history.length > 0) {
        this.loadings.app = true;

        this.$_.each(this.tracks.history, track => {


            L.geoJSON(track, {

                style: this._STILE('incomingHistory', track.features[0].properties.time)
              })
              .bindPopup(layer => {
                return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
              })
              .addTo(this.grpHistory);

          }) //eetch.history

        if (!this.actives.bboxString) {
          this.MAP.fitBounds(this.grpHistory.getBounds())
        }

        this.loadings.app = false;

        this._BUFFERTRACKS()
        this._LAUDIT('grpHistory', false)
      } //if history
      this._META()
    },
    _MAPPROPOSED: function() {

      this.grpProposed.clearLayers()

      this.loadings.app = true;

      let KO = L.geoJSON(this.tracks.proposed, {

          style: this._STILE('incomingProposed'),
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
              this.midPointsOut.push(L.latLng(e.vertex.latlng.lat, e.vertex.latlng.lng))

            });

          }
        })
        .addTo(this.grpProposed);

      let KR = this.tracks.reetern ? L.geoJSON(this.tracks.reetern, {

          style: this._STILE('incomingReturn'),
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
              this.midPointsBack.push(L.latLng(e.vertex.latlng.lat, e.vertex.latlng.lng))

            });

          }
        })
        .addTo(this.grpProposed) : null;

      if (!this.actives.bboxString) {
        this.MAP.fitBounds(this.grpProposed.getBounds())
      }
      this.loadings.app = false;
      // this._BUFFERPROPOSAL()
      this._LAUDIT('grpProposed', true)
        // this._SETVIAS()
      this._META()
    },
    _GETHISTORY: function() {
        // console.log("_GETHISTORY");

        this.loadings.app = true

        // temporary
        let trks = [
          '2020-11-28T12-59-24Z_EBL-009.geojson',
          '2020-10-12T12-00-11Z_EBL-001.geojson',
          '2020-10-17T12-00-31Z_EBL-002.geojson',
          '2020-10-24T11-42-59Z_EBL-003.geojson',
          '2020-11-07T12-39-22Z_EBL-004.geojson',
          '2020-11-08T12-52-27Z_EBL-005.geojson',
          '2020-11-14T13-05-57Z_EBL-006.geojson',
          '2020-11-21T12-46-39Z_EBL-007.geojson',
          '2020-11-22T12-38-04Z_EBL-008.geojson'
        ]

        let pz = []

        this.$_.each(trks, (t, ti, tl) => {
            $.getJSON(`static/${t}`, G => {
              pz.push(G)
              if (pz.length == tl.length) {
                this.tracks.history = pz;
                this._META('centerlines')
                if (this.actives.rideKey) {
                  this._TRACKMENUOP(this.actives.rideKey)
                }
              }
            });
          })
          // const _I = async(u) => {

        //   let traks = await axios.get(u).catch(e => {
        //     console.log("e", e);
        //   })

        //   let all = __.map(trks, async t => {
        //     // console.log(`adding/getting ${u}...`)
        //     let wl = window.location;
        //     return axios.get(`static/${t}`)
        //   })

        //   let alla = await axios.all(all)
        //   console.log("alla", all);
        //   let p = this.$_.pluck(this.$_.pluck(all, 'value'), 'data');
        //   console.log("alla", p);
        //   this.tracks.history = p;

        // }


        // _I();

        // const _git = (u)

        // axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/tracks`)
        /*        axios.get(`https://api.github.com/repos/cecois/milleria-api-v3/contents/static/ebltracks`)
                  .then(resp => {
                    // this.konsole.push({ timeout: 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
                    this.konsole = [{ timeout: 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg }]
                    this.loadings.app = false;
                    this.tracks.history = resp.data
                  })
                  .finally(x => {
                    if (this.actives.rideKey) {
                      this.loadings.app = false;
                      this._TRACKMENUOP(this.actives.rideKey)
                    }
                  }) //finally*/
      } //traxgeht
      ,
    _GETHERE: function() {
      /*
      axios.get('https://router.hereapi.com/v8/routes?apiKey=P5Mhg-TNACXQ9g1bJwa64E-Pk6_aS79pwuQ6mMm7HZA&transportMode=car&origin=42.339326,-71.135404&destination=42.30518452583631,-71.16656392721339&return=polyline')
      .then(resp=>{
        this.HERE=resp.data
      })
      */
      // let uri = 'https://router.hereapi.com/v8/routes?apiKey=P5Mhg-TNACXQ9g1bJwa64E-Pk6_aS79pwuQ6mMm7HZA&transportMode=car&origin=42.339326,-71.135404&destination=42.30518452583631,-71.16656392721339&return=polyline'
      // let uri = `http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/here`
      let uri = 'https://router.hereapi.com/v8/routes?apiKey=P5Mhg-TNACXQ9g1bJwa64E-Pk6_aS79pwuQ6mMm7HZA&transportMode=car&origin=42.31977991129439,-71.12351417541505&destination=42.33780085046662,-71.1551856994629&return=polyline&avoid[areas]=bbox:-71.14754676818849,42.328537209663565,-71.13492965698244,42.32536441628998'

      axios.get(uri).then(resp => {
        // console.log("resp", resp);
        this.HERE = {
          raw: resp.data,
          decodedmb: this.$MBFLEXPOLY.decode(resp.data.routes[0].sections[0].polyline),
          decodedhere: this.$HEREFLEX.decode(resp.data.routes[0].sections[0].polyline),
          asGeo: this.$TURFH.lineString(this.$_.map(this.$HEREFLEX.decode(resp.data.routes[0].sections[0].polyline).polyline, c => {
            return [c[1], c[0]]
          })),
          asGeoL: L.PolylineUtil.decode(resp.data.routes[0].sections[0].polyline),
          decodedmbgeo: this.$MBFLEXPOLY.toGeoJSON(resp.data.routes[0].sections[0].polyline)
        }
      })



    },
    _GETPROPOSED: function() {

      this.loadings.app = true

      let route = []

      route.push([this.startfinish.s.longitude, this.startfinish.s.latitude])

      if (this.midPointsOut.length > 0) {
        this.$_.each(this.midPointsOut, pair => {
          route.push([pair.lng, pair.lat])
        })
      }

      route.push([this.startfinish.f.longitude, this.startfinish.f.latitude])

      let tracksBufferedAsPoly = this.$TURFCOMBINE(this.tracks.buffered).features[0]
      let brooklineBndryAsPoly = this.grpAdmin.toGeoJSON().features[0]
        // let lawtonr = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 200, { units: "meters" });
        // let tracksBufferedAsPolyLawtoned = this.$TURFDIFF(tracksBufferedAsPoly, lawtonr)

      let allPoly = brooklineBndryAsPoly
        // this.$TURFUNION(tracksBufferedAsPolyLawtoned, brooklineBndryAsPoly)

      // this one intersects the SF envelope with the all-poly
      // let tracksbufferedboxedclipped = this.$TURFINTERSECT(envelopedStartFinish, allPoly)
      // let avoidPoly = allPoly
      // let avoidPoly = this.$TURFDIFF(allPoly, lawtonr)
      let avoidPoly = allPoly


      let proposal = this.tracks.buffered && this.avoid ? {
        "elevation": true,
        "coordinates": this.$_.compact(route),
        "instructions": "false",
        "options": {
          "avoid_polygons": avoidPoly.geometry
        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      } : {
        "elevation": true,
        "coordinates": this.$_.compact(route),
        "instructions": "false",
        "options": {
          "avoid_polygons": avoidPoly.geometry

        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      }


      console.log("proposal", proposal);

      if (this.$CONFIG.mode == "1616") {
        axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/ors/out`).then(resp => {
          this.tracks.proposed = resp.data;
          this.loadings.app = false;
        })
      } else {
        axios.post('http://api.openrouteservice.org/v2/directions/driving-car/geojson', proposal, {
            headers: {
              'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
              'Authorization': `${this.$CONFIG.ORSKey}`,
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          .then(resp => {

            this.loadings.app = false;
            this.tracks.proposed = resp.data
              // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` }]

          })
          .catch(error => {
            console.log("error", error.toJSON());

            // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: error.message })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: error.message }]


          })
      }
    }, //pruhpowsedget

    _RESETRETURN: function() {

      this.midPointsBack = [];
      this.tracks.reetern = null;

    }, //reesedreedurn
    _RESETPROPOSED: function() {

      this.midPointsOut = [];
      this.tracks.proposed = null;

    }, //reesettprupowzed
    _GETRETURN: function() {

      // this.loadings.app = true

      let route = []

      route.push([this.startfinish.f.longitude, this.startfinish.f.latitude])

      if (this.midPointsBack.length > 0) {
        this.$_.each(this.midPointsBack, pair => {
          route.push([pair.lng, pair.lat])
        })
      }

      route.push([-71.128191, 42.348340])

      let tracksBufferedAsPoly = this.$TURFCOMBINE(this.tracks.buffered).features[0]

      let brooklineBndryAsPoly = this.grpAdmin.toGeoJSON().features[0]
      console.log("this.tracks.bufferedProposal", this.tracks.bufferedProposal);
      let trackOut = this.$TURFCOMBINE(this.tracks.bufferedProposal).features[0];
      console.log("trackOut", trackOut);

      // let lawtonr = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 200, { units: "meters" });
      // let tracksBufferedAsPolyLawtoned = this.$TURFDIFF(tracksBufferedAsPoly, lawtonr)

      // let allPoly = brooklineBndryAsPoly
      let allPoly = trackOut
        // this.$TURFUNION(brooklineBndryAsPoly)

      // this.$TURFUNION(tracksBufferedAsPolyLawtoned, brooklineBndryAsPoly)

      // this one intersects the SF envelope with the all-poly
      // let tracksbufferedboxedclipped = this.$TURFINTERSECT(envelopedStartFinish, allPoly)
      // let avoidPoly = allPoly
      // let avoidPoly = this.$TURFDIFF(allPoly, lawtonr)
      let avoidPoly = allPoly
      console.log("avoidPoly", avoidPoly);
      console.log("avoidPoly", avoidPoly.geometry);


      let proposal = this.tracks.buffered && this.avoid ? {
        "elevation": true,
        "coordinates": this.$_.compact(route),
        "instructions": "false",
        "options": {
          "avoid_polygons": avoidPoly.geometry
        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      } : {
        "elevation": true,
        "coordinates": this.$_.compact(route),
        "instructions": "false",
        "options": {
          "avoid_polygons": avoidPoly.geometry

        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      }


      if (this.$CONFIG.mode == "1616") {
        axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/ors/back`).then(resp => {
          this.tracks.reetern = resp.data;
          this.loadings.app = false;
        })
      } else {
        axios.post('http://api.openrouteservice.org/v2/directions/driving-car/geojson', proposal, {
            headers: {
              'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
              'Authorization': `${this.$CONFIG.ORSKey}`,
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          .then(resp => {

            this.loadings.app = false;
            this.tracks.reetern = resp.data
              // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` }]

          })
          .catch(error => {
            console.log("error", error.toJSON());

            // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: error.message })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: error.message }]


          })
      }
    }, //pruhpowsedget
    _GETRETURNOG: function() {

      this.loadings.app = true


      let route = []

      let bfc = this.$TURFH.featureCollection(this.$_.map(this.viasBack, vb => {
        console.log("vb", vb);
        let pt = this.$TURFH.point([vb[0], vb[1]])
        console.log("pt", pt);
        return pt;
      }));

      console.log("bfc", bfc);
      // L.geoJSON(bfc, { style: this._STILE('debug') }).addTo(this.grpDebug)
      // route.push([this.startfinish.s.longitude, this.startfinish.s.latitude])

      let st = this.$TURFH.point([this.startfinish.s.longitude, this.startfinish.s.latitude])
      console.log("st", st);

      let newFinish = this.$TURF_nearestpoint(
        // this.viasBack
        st, bfc)

      console.log("newFinish", newFinish);
      L.geoJSON(newFinish).addTo(this.grpDebug)


      let radiuses = [350]

      if (this.midPointsBack.length > 0) {
        this.$_.each(this.midPointsBack, pair => {
          radiuses.push(350)
          route.push([pair.lng, pair.lat])
        })
      }

      radiuses.push(350)

      // lawton
      route.push([-71.127982, 42.348306])

      let envelopedStartFinish = this.$TURFENVELOPE(this.grpStartfinish.toGeoJSON())
      let tracksBufferedAsPoly = this.$TURFCOMBINE(this.tracks.buffered).features[0]
      let brooklineBndryAsPoly = this.grpAdmin.toGeoJSON().features[0]
      let trackOut = this.$TURFCOMBINE(this.tracks.bufferedProposal).features[0];

      // let trackOutSansFinish = this.$TURFDIFF(this.$TURFCOMBINE(this.tracks.bufferedProposal).features[0], this.$TURFBUFFER(this.$TURFH.point(this.startfinish.finish), 150, { units: "meters" }));

      // let trackOutSans = this.$TURFDIFF(trackOutSansFinish, this.$TURFBUFFER(this.$TURFH.point(this.startfinish.start), 150, { units: "meters" }));

      // L.geoJSON(trackOutSans, {
      //     style: this._STILE('debug')
      //   })
      //   .addTo(this.grpDebug);

      // console.log("trackOutSans", trackOutSans);

      let allTracks = this.avoid ? this.$TURFUNION(tracksBufferedAsPoly, trackOut) : trackOut;
      // let lawtonr = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 500, { units: "meters" });
      // let tracksBufferedAsPolyLawtoned = this.$TURFDIFF(tracksBufferedAsPoly, lawtonr)

      let allPoly = this.$TURFUNION(allTracks, brooklineBndryAsPoly)

      // this one intersects the SF envelope with the all-poly
      // let tracksbufferedboxedclipped = this.$TURFINTERSECT(envelopedStartFinish, allPoly)
      // let avoidPoly = allPoly
      // let avoidPoly = this.$TURFDIFF(allPoly, lawtonr)
      let avoidPoly = allPoly


      /*+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+
      |d|e|b|u|g|
      +-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+*/


      /*+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+
      let X = L.geoJSON(avoidPoly, {
          style: this._STILE('debug')
        })
        .addTo(this.grpDebug)
      this._LAUDIT('grpDebug', true)
      |d|e|b|u|g|
      +-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+*/

      // let radiuses = this.midPointsBack.lenght > 0 ? [100, this.$_.map(this.midPointsBack, p => {
      //   return 350
      // }), 350] : [100, 350];

      let proposal = this.tracks.buffered && this.avoid ? {
        "elevation": true,
        "coordinates": this.$_.compact(route),
        "instructions": "false",
        "radiuses": radiuses,
        "options": {
          "avoid_polygons": avoidPoly.geometry
        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      } : {
        "elevation": true,
        "coordinates": this.$_.compact(route),

        "instructions": "false",
        "options": {
          "avoid_polygons": this.tracks.bufferedProposal.features[0].geometry
        },
        "preference": "recommended",
        "roundabout_exits": "true",
        "suppress_warnings": "true"
      }


      console.log("proposal", proposal);
      // return null;

      if (this.$CONFIG.mode == "1616") {
        axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/ors/back`).then(resp => {
          this.tracks.reetern = resp.data;
          this.loadings.app = false;
        })
      } else {
        axios.post('http://api.openrouteservice.org/v2/directions/driving-car/geojson', proposal, {
            headers: {
              'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
              'Authorization': `${this.$CONFIG.ORSKey}`,
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          .then(resp => {
            console.log("resp", resp);

            this.loadings.app = false;
            this.tracks.reetern = resp.data
              // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` }]


          })
          .catch(error => {
            console.log("error", error.toJSON());

            // this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: error.message })
            this.konsole = [{ timeout: 20, klass: 'has-text-danger', msg: error.message }]


          })
      }



      this._META()
    }, //pruhpowsedget
    _DROPSTORE: function() {

      this.loadings.app = true
      this.modals.dropzone = false

      // this.grpPreview.clearLayers()

      axios.post(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/submit`, this.tracks.incoming)
        .then(resp => {
          // this.konsole.push({ timeout: resp.data.success ? 12 : 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
          // this.konsole.push({ timeout: resp.data.success ? 12 : 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
          this.loadings.app = false;
        })
        // .then(x => {
        //   this.tracks.incoming = [];
        // })
        .finally(r => {
          this.loadings.app = false;
          this._GETHISTORY()
        })

    }, //drahpstowr
    _DROPACCEPT: function(F) {

      this.loadings.app = true;

      const reader = new FileReader();
      reader.onloadend = e => {
        delete e.target.result;
        this.loadings.app = false;
      };

      this.konsole.push = { msg: `hearing ${F.length} drops`, klass: "info", timeout: 6 }

      reader.onload = D => {

          // this.tracks.incoming = this.$TOGEOJSON.gpx((new DOMParser()).parseFromString(D.target.result, 'text/xml'))
          this.tracks.incoming.push(this.$TOGEOJSON.gpx((new DOMParser()).parseFromString(D.target.result, 'text/xml')))

        } //reader.onload

      // we'll only take one file for now
      // reader.readAsText(F[0], "UTF-8");

      reader.readAsText(F, "UTF-8");
    },
    _BUFFERTRACKS: function(F) {


        this.grpBuffered.clearLayers()

        // if we never cut out an area around Lawton we'll pen ourselves in pretty quickly
        // let lawton60r = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 500, { units: "meters" });
        // this.tracks.buffered = null
        // buffer the centerlines
        // this.tracks.buffered = this.$TURFDIFF(this.$TURFCOMBINE(this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' })).features[0].geometry, lawton60r).geometry
        // this.tracks.buffered = this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' });


        /*        this.tracks.buffered = this.$TURFDIFF(this.$TURFSIMPLE(this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' }), {
                    mutate: true,
                    tolerance: .0001,
                    highQuality: true
                  }).features[0].geometry, lawton60r).geometry*/

        // this buffer works beautifully but doesn't cut Lawton out
        this.tracks.buffered =
          // this.$TURFSIMPLE(
          this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' })
          // , { mutate: true, tolerance: .0001, highQuality: true });


      } //traxbuhfrd
      ,
    _BUFFERPROPOSAL: function(F) {

        // this.grpBufferedProposal.clearLayers()
        this.grpDebug.clearLayers()
        this.viasOut = []
        this.viasBack = []

        // check length of proposal - longer means a more narrow buffer
        let pl = this.$TURFLENGTH(this.grpProposed.toGeoJSON())
        console.log("pl", pl);


        this.tracks.bufferedProposal = this.$TURFSIMPLE(this.$TURFBUFFER(this.grpProposed.toGeoJSON(), 10, { units: 'meters' }), {
          mutate: true,
          tolerance: .0001,
          highQuality: true
        });

        let bpGhost = this.$TURFSIMPLE(this.$TURFBUFFER(this.grpProposed.toGeoJSON(), 150, { units: 'meters' }), {
          mutate: true,
          tolerance: .0001,
          highQuality: true
        });
        L.geoJSON(bpGhost, { style: this._STILE('debug') }).addTo(this.grpDebug)

        // taking that buffered proposed route, find where it intersects other streets
        let l = this.$TURF_lineintersect(this.grpCenterlines.toGeoJSON(), bpGhost)

        // get rid of any of those intersections that also fall within a track history('s buffer)
        let ll = this.$_.compact(this.$_.reject(l.features, fea => {
          return this.$_.some(this.tracks.buffered.features, bf => {
            let isin = this.$TURF_booleanwithin(fea, bf.geometry);
            return isin ? bf : null;
          })
        }));


        // dummy fc for distance testing
        // let clx = this.$TURFH.featureCollection(this.$_.map(ll, l => {
        //   return this.$TURFH.point(l.geometry.coordinates)
        // }));

        this.$_.each(ll, l => {
          /* this just turned out to be a great way for a point to find out it was 0 kilometers away FROM ITSELF
          let nearestPoint = this.$_.first(this.$TURF_nearestpoint(l, clx).features).geometry.coordinates[0];
          let ln = this.$TURFH.lineString([l.geometry.coordinates, nearestPoint], { name: 'lineforlength' });
          L.geoJSON(ln, { style: this._STILE() }).addTo(this.grpDebug)
          let dist = this.$TURFLENGTH(ln, { units: "kilometers" })
          */
          this.viasOut.push([l.geometry.coordinates[1], l.geometry.coordinates[0]])
        })

        L.geoJSON(ll, {
          style: this._STILE(),
          pointToLayer: function(feature, latlng) {
            return new L.CircleMarker([latlng.lat, latlng.lng], { radius: 12 })
          }
        }).addTo(this.grpDebug)


      } //buphrprapozl
      ,
    _MAPBUFFEREDTRACKS: function(F) {


        L.geoJSON(this.tracks.buffered, {
            style: (feature) => {
              return this._STILE('buffer', feature)
            }
          })
          .addTo(this.grpBuffered);

        this.grpHistory.bringToFront();
        this._LAUDIT('grpBuffered', true)

      } //traxbuhfrd
      ,
    _MAPBUFFEREDPROPOSAL: function(F) {

        L.geoJSON(this.tracks.bufferedProposal, {
            style: (feature) => {
              return this._STILE('proposalBuffer', feature)
            }
          })
          .addTo(this.grpBufferedProposal);

        this._LAUDIT('grpBufferedProposal', true)

      } //traxbuhfrd
      ,
    _SETROUTE: function() {
        // console.log("_SETROUTE");


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
          case 'grpHistory':
            if (T) {
              this.MAP.addLayer(this.grpHistory)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpHistory) : this.MAP.addLayer(this.grpHistory);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpBuffered':
            if (T) {
              this.MAP.addLayer(this.grpBuffered)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpBuffered) : this.MAP.addLayer(this.grpBuffered);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpTracks':
            if (T) {
              this.MAP.addLayer(this.grpTracks)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpTracks) : this.MAP.addLayer(this.grpTracks);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpisotracks':
            if (T) {
              this.MAP.addLayer(this.grpisotracks)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpisotracks) : this.MAP.addLayer(this.grpisotracks);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;

          case 'grpProposed':
            if (T) {
              this.MAP.addLayer(this.grpProposed)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpProposed) : this.MAP.addLayer(this.grpProposed);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpCenterlines':
            if (T) {
              this.MAP.addLayer(this.grpCenterlines)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpCenterlines) : this.MAP.addLayer(this.grpCenterlines);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
          case 'grpDebug':
            if (T) {
              this.MAP.addLayer(this.grpDebug)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grpDebug) : this.MAP.addLayer(this.grpDebug);
              // flip it in layers meta
              this.$_.findWhere(this.layers, { handle: H }).on = !c
            }
            break;
        } //sweetch
      } //LODDIT

  } //methods
  ,
  watch: {
    /*"actives": {
      deep: true,
      handler: function(vnew, vold) {
          console.log("vold", vold.rideKey);
          console.log("vnew", vnew.rideKey);
          if (vnew.rideKey !== vold.rideKey) {
            console.log("watch.actives.vnew.rideKey", vnew.rideKey);
            // this._TRACKMENUOP(vnew.rideKey)
          }
          this._SETROUTE()
        } //handler
    } //midpoints
    ,*/
    "actives.rideKey": {
      handler: function(vnew, vold) {
          if (!vold || (vnew !== vold)) {
            this._TRACKMENUOP(vnew)
          }
          this._SETROUTE()
        } //handler
    } //midpoints
    ,
    "HERE.asGeo": {
      handler: function(vnew, vold) {
          L.geoJSON(this.HERE.asGeo, { style: this._STILE('debug') }).addTo(this.grpDebug)
        } //handler
    } //midpoints
    ,
    avoid: {
      handler: function(vnew, vold) {
          this._GETPROPOSED()
        } //handler
    } //midpoints
    ,
    "midPointsOut": {
      handler: function(vnew, vold) {
          // console.log("vnew", vnew);
          // this._MAPSTARTFINISH()
          if (vnew.length >= vold.length) {
            this._GETPROPOSED()
          } else {
            console.log(`midpoints out likely cleared`)
          }
        } //handler
    } //midpoints
    ,
    "midPointsBack": {
      handler: function(vnew, vold) {
          // console.log("vnew", vnew);
          // this._MAPSTARTFINISH()
          if (vnew.length >= vold.length) {
            this._GETRETURN()
          } else {
            console.log(`midpoints back likely cleared`)
          }
        } //handler
    } //midpoints
    ,
    "startfinish": {
      deep: true,
      handler: function(vnew, vold) {
          this._MAPSTARTFINISH()
            // this._BUFFERFINISH()
            // this._GETPROPOSED()
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
    "tracks.proposed": {
      // deep: true,
      handler: function(vnew, vold) {

          this._MAPPROPOSED()
          this._BUFFERPROPOSAL()


        } //handler
    } //loadings
    ,
    "tracks.reetern": {
      handler: function(vnew, vold) {

          this._MAPPROPOSED()
          this._BUFFERPROPOSAL()

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
    "tracks.bufferedProposal": {
      handler: function(vnew, vold) {
          if (vnew.features) {
            this._MAPBUFFEREDPROPOSAL()
          }
        } //handler 
    } //loadings 
    ,
    /*"tracks.incoming": {

      handler: function(vnew, vold) {
          if (vnew.features) {
            this._MAPDROP()
          }

        } //handler
    } //tracks.incoming
    ,*/
    "tracks.history": {
      handler: function(vnew, vold) {
          this._MAPHISTORY()
        } //handler
    } //tracks.HISTORY
    ,
    trace: {
      handler: function(vnew, vold) {
          this._MAPTRACE()
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
            this.konsole = [{ timeout: 6, klass: 'has-text-danger', msg: "YOU JUST LEFT BROOKLINE" }]
          }
          if (vnew && !vold) {
            // this.konsole.push({ timeout: 6, klass: 'has-text-info', msg: "ur back in brooklinline :-)" })
            this.konsole = [{ timeout: 6, klass: 'has-text-info', msg: "ur back in brooklinline :-)" }]
          }
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

.leaflet-vertex-icon-hidden {
  display: none;
}
</style>
