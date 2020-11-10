<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress color="rgba(236, 88, 0, 1)" ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav class="navbar ebl-bg" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
      {{page.title}}
    </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a @click.default="_LAUDIT
(L.handle)" v-for="L in layers" class="navbar-item mr-3">
            <i :class="[`icon-${L.klass}`,L.on?'ebl-nav-on':'']"><span class="pl-2">{{L.abbrev}}</span></i>
            <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-text-light">
            <span v-if="meta.historyLength">{{Number(Math.round(meta.historyLength+'e'+1)+'e-'+1)}}km down of </span>&nbsp;
            <span v-if="meta.centerlinesLength">{{`${Number(Math.round(meta.centerlinesLength+'e'+1)+'e-'+1)}`}}km total</span>
            <span v-if="meta.proposedLength">&nbsp;({{`${Number(Math.round(meta.proposedLength+'e'+1)+'e-'+1)}`}}km proposed)</span>
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
    <div id="ebl-modal-dropzone" :class="['modal','has-text-weight-bold',modals.dropzone?'is-active':'']">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h3 class="is-size-3 has-text-centered">{{dropzone.msg}}</h3>
        <div class="columns">
          <div class="pt-6 pr-2 column is-one-half">
            <div v-if="dropzone.state=='dropped' && tracks.incoming" class="">
              <div v-for="track in tracks.incoming.features">
                <p class="title is-4"><i class="fa fa-bezier-curve" :style="`color:${_STILE('incomingDefault').color}`"></i> {{track.properties.name}}</p>
                <p v-html="`~${Math.round($TURFLENGTH(track.geometry,{units:'miles'}))}mi on ${$MOMENT(track.properties.time).format('YYYY.MMM.Do')}`" class="subtitle is-6"></p>
                <span @click="_DROPSTORE()" class="ebl-button icon is-medium">
      <i class="fas fa-check-double fa-2x"></i>
    </span>
                <span @click="tracks.incoming=null;modals.dropzone=null" class="ebl-button icon is-medium">
      <i class="fas fa-eject fa-2x"></i>
    </span>
              </div>
            </div>
          </div NB="/.kahlum">
          <div class="column is-one-half">
            <div id="vap"></div>
          </div NB="/.one-half">
        </div NB="/.kahlumz">
        <!-- 
      <div id="vap-copy">
        <div class="pb-3" v-if="dropzone.state=='dropped' && tracks.incoming">
          <div v-for="track in tracks.incoming.features" class="columns pt-3">
            <div class="column is-full has-text-centered">
              <p>{{track.properties.name}} <i class="fa fa-bezier-curve" :style="`color:${_STILE('incomingDefault').color}`"></i></p>
              <p class="has-text-grey-light">{{$MOMENT(track.properties.time).format('YYYY.MMM.Do')}}</p>
              <button @click="tracks.incoming=$_.with(tracks.incoming,$_.last(tracks.incoming))" :class="['button','is-small','is-pulled-right']">Cancel</button>
              <button @click="_DROPSTORE()" :class="['button','is-small','is-pulled-right',loadings.submit?'is-loading':'']">Accept</button>
            </div NB="/.kollum">
            <div class="column is-full has-text-centered">
                  <button @click="tracks.incoming=$_.with(tracks.incoming,$_.last(tracks.incoming))" :class="['button','is-small','is-pulled-right']">Cancel</button>
                  <button @click="_DROPSTORE()" :class="['button','is-small','is-pulled-right',loadings.submit?'is-loading':'']">Accept</button>
                </div NB="/.kollum">
          </div Nb="/.cahloomz">
        </div>
      </pzone.msg}}</h3>
       -->
      </div NB="/.modal-content">
      <button @click="modals.dropzone=false" class="modal-close is-large" aria-label="close"></button>
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
    <div :class="['modal',modals.credits?'is-active':'']" id="modal-credits">
      <div class="modal-background"></div>
      <div class="modal-content">
        <ul>
          <li v-for="credit in credits">{{credit}}</li>
        </ul>
      </div>
      <button @click="modals.credits=false" class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- 🦶🦶🦶🦶🦶🦶🦶🦶 FOOTER -->
    <footer class="footer p-1">
      <nav class="level pt-1 pl-2 pr-2">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="">
              <a @click.default="modals.credits=true" class="mr-3">
                <i class="fas fa-info-circle"></i>
              </a>
              <a @click.default="_RANDOFINISHLINE()" class="mr-3">
                <i class="fas fa-random"></i>
              </a>
              <a @click.default="avoid=!avoid" :class="[avoid?'ebl-footer-on':'','mr-3']">
                <i class="fas fa-frog"></i>
              </a>
              <a @click.default="_GETRETURN
()" :class="['mr-3']">
                <i class="fas fa-undo"></i>
              </a>
              <a target="_blank" :href="googleReviewOut"><i :class="['fab','fa-google',googleReviewOut?'':'is-disabled']"><span class="is-italic is-family-sans-serif">o</span></i></a>
              <a target="_blank" :href="googleReviewBack"><i :class="['fab','fa-google',googleReviewBack?'':'is-disabled']"><span class="is-italic is-family-sans-serif">b</span></i></a>
            </p>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <div id="konsole">
              <nav class="level">
                <div v-for="M in konsole" id="konsole-copy" :class="['level-item','has-text-centered',M.klass,`faded${M.timeout}`]">
                  <div>
                    <p>{{M.msg}}</p>
                  </div>
                </div>
              </nav>
            </div>
          </p>
        </div>
      </nav>
    </footer>
    <!-- <footerx class="pl-1 footer is-size-7">
      <div class="content has-text-left">
        <a @click.default="modals.credits=true" class="">
  <i class="fas fa-info-circle"></i>
</a>
<a @click.default="_RANDOFINISHLINE()" class="">
          <i class="fas fa-random"></i>
        </a>
        <div id="konsole">
          <nav class="level">
            <div v-for="M in konsole" id="konsole-copy" :class="['level-item','has-text-centered',M.klass,`faded${M.timeout}`]">
              <div>
                <p>{{M.msg}}</p>
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
    </footerx>
     -->
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


    this.VAP = new L.Map("vap", {
      editable: true,
      zoomControl: false,
      center: [42, -72],
      attributionControl: false,
      zoom: 11
    });

    this.modals = this.$_.clone(this.modalsRestore);

    let p = 408;
    this._CONSEOUL("p", p);
    this._CONSEOUL("p + 6", p + 6);


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

    this.MAP.fitBounds(
      [
        [42.31566161628652, -71.19664326310159],
        [42.36102434112847, -71.06506481766702]
      ]
    )


    let tl = "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"

    const baseLayer = new L.TileLayer(
      // this.$CONFIG.mode == '1616' ? tl : "http://localhost:8000/tile-T.png"
      tl
    );

    this.MAP.addLayer(baseLayer);
    this.VAP.addLayer(new L.TileLayer("https://b.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A"));

    if (!this.grpAdminGhost) {
      this.grpAdminGhost = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }
    if (!this.grpAdmin) {
      this.grpAdmin = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }
    if (!this.grpCenterlines) {
      this.grpCenterlines = new L.featureGroup({ pane: 'pnAdmin' }).addTo(this.MAP)
    }


    if (!this.grpBuffered) {
      this.grpBuffered = new L.featureGroup({ pane: 'pnBuffered' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpBuffered', on: false, abbrev: "hstb", klass: 'noun_buffer' })
    }
    if (!this.grpBufferedProposal) {
      this.grpBufferedProposal = new L.featureGroup({ pane: 'pnBufferedProposal' }).addTo(this.MAP)
        // this.layers.push({ handle: 'grpBufferedProposal', on: false, abbrev: "hstb", klass: 'noun_buffer' })
    }

    if (!this.grpHistory) {
      this.grpHistory = new L.featureGroup({ pane: 'pnTracks' }).addTo(this.MAP);
      this.layers.push({ handle: 'grpHistory', on: false, abbrev: "hst", klass: 'noun_history' })
    }
    if (!this.grpPreview) {
      this.grpPreview = new L.featureGroup({ pane: "pTracks" }).addTo(this.VAP)
    }

    if (!this.grpProposed) {
      this.grpProposed = new L.featureGroup({ pane: 'pnProposed' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpProposed', on: false, abbrev: "prpsl", klass: 'noun_proposed' })
    }
    if (!this.grpStartfinish) {
      this.grpStartfinish = new L.layerGroup({ pane: 'pnStartfinish' }).addTo(this.MAP)
    }
    if (!this.grpDebug) {
      this.grpDebug = new L.layerGroup({ pane: 'pnDebug' }).addTo(this.MAP)
      this.layers.push({ handle: 'grpDebug', on: false, abbrev: "dbg", klass: 'bug' })
    }


    /* brookline boundary
        __                     __   ___
       / /_  _________  ____  / /__/ (_)___  ___
      / __ \/ ___/ __ \/ __ \/ //_/ / / __ \/ _ \
     / /_/ / /  / /_/ / /_/ / ,< / / / / / /  __/
    /_.___/_/   \____/\____/_/|_/_/_/_/ /_/\___/
    */
    axios
      .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/brookline`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('brookline'),
            snapIgnore: true
          })
          .addTo(this.grpAdmin);

      }) //axios.then
      .catch(e => {
        this.konsole.push({ msg: e, klass: "error", timeout: 20 })
      }) //axios.catch


    axios
      .get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/brooklinesghost`)
      .then(response => {

        L.geoJSON(response.data, {
            style: this._STILE('ghost'),
            snapIgnore: true
          })
          .addTo(this.grpAdminGhost);

      }) //axios.then
      .then(r => {
        // this._RANDOFINISHLINE()
        // this.startfinish = { s: { longitude: -71.127856, latitude: 42.348360 }, f: this._RANDOFINISHLINE() }
        this.startfinish = { s: this._STARTGET(true), f: this._RANDOFINISHLINE() }

      })
      .catch(e => {
        this.konsole.push({ msg: e, klass: "error", timeout: 20 })
      }) //axios.catch

    axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/centerlines`).then(response => { L.geoJSON(response.data.payload, { style: this._STILE('centerlines') }).addTo(this.grpCenterlines); }) //axios.then
      .catch(e => { this.konsole.push({ msg: e, klass: "error", timeout: 20 }) }) //axios.catch 
      .then(r => { this._META('centerlines') })



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

      let fil = e.dataTransfer.files;
      this._DROPACCEPT(fil);
    });

    /* +++++++++++++++++++ /dropzone */

    document.addEventListener("keydown", (e) => {

      // if (e.key.toLowerCase() == 'alt') {
      //   this.modalKick = !this.modalKick;
      // }
      if (e.key.toLowerCase() == 'escape') {

        this.modals = this.modalsRestore;

        // this.modals.result=false
        // this.modals.edit=false
      }
    })

    this.loadings.map = false;

    this._GETHISTORY();

  },
  computed: {
    googleReviewOut: function() {

        let vias = this.viasOut.length > 0 ? `/${this.viasOut.join('/')}/` : `/`

        return this.startfinish ? `https://www.google.com/maps/dir/${this.startfinish.s.latitude},${this.startfinish.s.longitude}${vias}${this.startfinish.f.latitude},${this.startfinish.f.longitude}/data=!3m1!4b1!4m2!4m1!3e1` : null

      } //gugulruvyew
      ,
    googleReviewBack: function() {

        let vias = this.viasBack.length > 0 ? `/${this.viasBack.join('/')}/` : `/`

        return this.startfinish && this.tracks.reetern ? `https://www.google.com/maps/dir/${this.startfinish.f.latitude},${this.startfinish.f.longitude}${vias}${this.startfinish.s.latitude},${this.startfinish.s.longitude}/data=!3m1!4b1!4m2!4m1!3e1` : null

      } //gugulruvyew
  },
  data() {
    return {
      MAP: null,
      avoid: true,
      modalKick: false,
      layers: [],
      midPointsOut: [],
      midPointsBack: [],
      viasOut: [],
      viasBack: [],
      meta: { centerlinesLength: null, historyLength: null, proposedLength: null },
      startfinish: { s: { longitude: null, latitude: null }, f: { longitude: null, latitude: null } }, //og [long,lat]
      konsole: [],
      dropzone: { state: null, msg: null },
      page: { title: "evERyBlINE", splayed: false },
      modals: { dropzone: true, credits: false },
      modalsRestore: { dropzone: false, credits: false },
      loadings: { map: false, drop: false, tracks: false, proposed: false, reetern: false },
      console: { state: null, msgs: [] },
      tracks: { incoming: null, history: [], proposed: [], buffered: null, bufferedProposal: null, reetern: null },
      credits: [
        "routing: openrouteservice.org | OpenStreetMap contributors",
        "buffered tracks icon: outline by Jellycons from the Noun Project", "tracks icon: route by Andrejs Kirma from the Noun Project", "tracks review icon: Test Tube by Icon Island from the Noun Project", "proposed route icon: Vector by logan from the Noun Project"
      ]
    };
  },
  methods: {

    _SETVIAS: function() {


        if (this.grpProposed && this.grpProposed.toGeoJSON().features) {

          /*        _______   _____       __  ____
           _   __/  _/   | / ___/____  / / / / /_
          | | / // // /| | \__ \/ __ \/ / / / __/
          | |/ // // ___ |___/ / /_/ / /_/ / /_
          |___/___/_/  |_/____/\____/\____/\__/
*/

          if (this.grpProposed.toGeoJSON().features.length == 1) {
            // sample only works w/ a featurecollection made from the vertices
            let fc = this.$TURFH.featureCollection(
              this.$_.map(this.grpProposed.toGeoJSON().features[0].geometry.coordinates, (c, i) => {
                return this.$TURFH.point(c, { name: i })
              })
            )

            // draw the sample here
            let sa = this.$_.map(this.$TURFSAMPLE(fc, 15).features, fea => {
              return [fea.geometry.coordinates[1], fea.geometry.coordinates[0]]
            })

            //but it comes in random order, so we reassociate an i using the vertex from which the sample wz drawn and order by it
            let st = this.$_.map(this.$_.sortBy(this.$_.map(sa, s => {
              let iv = this.$_.find(fc.features, fcfea => {
                return (fcfea.geometry.coordinates[0] == s[1] && fcfea.geometry.coordinates[1] == s[0])

              })
              return { lat: s[0], lng: s[1], iv: iv.properties.name }
            }), 'iv'), iv => {
              return [iv.lat, iv.lng]
            })

            // finally we store them for others to use
            this.viasOut = st;
          } //features is only 1 long


          /*        _       _____ ____  ___        __
           _   __(_)___ _/ ___// __ )/   | _____/ /__
          | | / / / __ `/\__ \/ __  / /| |/ ___/ //_/
          | |/ / / /_/ /___/ / /_/ / ___ / /__/ ,<
          |___/_/\__,_//____/_____/_/  |_\___/_/|_|
          */

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
          }
        } //features is two long (out and back)

      } //setveeahz
      ,
    _STARTGET: function(S) {



      // geoloc stuff can go here #returnto: navigator.geolocation.getCurrentPosition(success, error, options);

      /*let s = navigator.geolocation.getCurrentPosition((p) => {
        console.log('ploc', p)
        return p;
      }, (err) => { console.error(err) }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
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
      console.log("_META");
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
        case 'incomingReturn':
          return { color: `rgba(120, 227, 253, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 5, weight: 8 }
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

          norm = trackTime ? (trackTime - projectStart) / (today - projectStart) + .1 : 1

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
    _MAPSTARTFINISH: function() {

      this._CONSEOUL('MAPSTARTFINISH', 'running')

      this.grpStartfinish.clearLayers()
      this.grpDebug.clearLayers()

      this.loadings.map = true;


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

      this.loadings.map = false;
      // this.grpStartfinish.bringToFront();

      this._CONSEOUL()

    },
    _BUFFERFINISH: function() {

      // some feedback
      this.loadings.map = true

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

      this._LAUDIT('grpDebug', true)
      this.loadings.map = false

      /*+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+
      |d|e|b|u|g|
      +-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+*/


    }, //buphrphinnish
    _MAPDROP: function() {

      // this.grpTracks.clearLayers()
      this.grpPreview.clearLayers()

      this.loadings.map = true;
      L.geoJSON(this.tracks.incoming, {
          style: this._STILE('incomingDefault')
        })
        .bindPopup(layer => {

          return `<h5 class="is-size-5">${layer.feature.properties.name}</h5><div class="is-size-7 has-text-grey-lighter">(${layer.feature.properties.time})</div>`;
        })
        .addTo(this.grpPreview);

      this.VAP.fitBounds(this.grpPreview.getBounds())

      this.loadings.map = false;
      this.grpPreview.bringToFront();

    },
    _MAPHISTORY: function() {
      console.log("_MAPHISTORY");

      this.grpHistory.clearLayers()

      if (this.tracks.history && this.tracks.history.length > 0) {
        this.loadings.map = true;

        this.$_.each(this.tracks.history, track => {


            L.geoJSON(track, {

                style: this._STILE('incomingHistory', track.features[0].properties.time)
              })
              .bindPopup(layer => {
                return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
              })
              .addTo(this.grpHistory);

          }) //eetch.history

        this.MAP.fitBounds(this.grpHistory.getBounds())
        this.loadings.map = false;

        this._BUFFERTRACKS()
        this._LAUDIT('grpHistory', true)
      } //if history
      this._META()
    },
    _MAPPROPOSED: function() {

      this.grpProposed.clearLayers()

      this.loadings.map = true;

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

      this.MAP.fitBounds(this.grpProposed.getBounds())
      this.loadings.map = false;
      // this._BUFFERPROPOSAL()
      this._LAUDIT('grpProposed', true)
      this._SETVIAS()
      this._META()
    },
    _GETHISTORY: function() {

        this.loadings.tracks = true

        axios.get(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/tracks`)
          .then(resp => {
            this.konsole.push({ timeout: 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
            this.loadings.tracks = false;
            this.tracks.history = resp.data.payload
          })
      } //traxgeht
      ,
    _GETPROPOSED: function() {

      this.loadings.proposed = true

      let route = []
      console.log("route", route);

      route.push([this.startfinish.s.longitude, this.startfinish.s.latitude])
      console.log("route", route);

      if (this.midPointsOut.length > 0) {
        this.$_.each(this.midPointsOut, pair => {
          route.push([pair.lng, pair.lat])
        })
      }

      route.push([this.startfinish.f.longitude, this.startfinish.f.latitude])
      console.log("route", route);

      let tracksBufferedAsPoly = this.$TURFCOMBINE(this.tracks.buffered).features[0]
      console.log("tracksBufferedAsPoly", tracksBufferedAsPoly);
      let brooklineBndryAsPoly = this.grpAdmin.toGeoJSON().features[0]
      console.log("brooklineBndryAsPoly", brooklineBndryAsPoly);
      // let lawtonr = this.$TURFBUFFER(this.$TURFH.point([-71.128191, 42.348340]), 200, { units: "meters" });
      // let tracksBufferedAsPolyLawtoned = this.$TURFDIFF(tracksBufferedAsPoly, lawtonr)

      let allPoly = brooklineBndryAsPoly
      console.log("allPoly", allPoly);
      // this.$TURFUNION(tracksBufferedAsPolyLawtoned, brooklineBndryAsPoly)

      // this one intersects the SF envelope with the all-poly
      // let tracksbufferedboxedclipped = this.$TURFINTERSECT(envelopedStartFinish, allPoly)
      // let avoidPoly = allPoly
      // let avoidPoly = this.$TURFDIFF(allPoly, lawtonr)
      let avoidPoly = allPoly
      console.log("avoidPoly", avoidPoly);


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
          this.loadings.proposed = false;
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

            this.loadings.proposed = false;
            this.tracks.proposed = resp.data
            this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` })

          })
          .catch(error => {
            console.log("error", error.toJSON());

            this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: error.message })


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

      // this.loadings.reetern = true


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
          this.loadings.reetern = false;
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

            this.loadings.reetern = false;
            this.tracks.reetern = resp.data
            this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: `ORS engine ${resp.data.metadata.engine.version} returned a ${resp.data.features.length}-seg route` })


          })
          .catch(error => {
            console.log("error", error.toJSON());

            this.konsole.push({ timeout: 20, klass: 'has-text-danger', msg: error.message })


          })
      }



      this._META()
    }, //pruhpowsedget
    _DROPSTORE: function() {

      this.loadings.submit = true
      this.modals.dropzone = false

      this.grpPreview.clearLayers()

      axios.post(`http://${this.$CONFIG.apiH}:${this.$CONFIG.apiP}/ebl/submit`, this.tracks.incoming)
        .then(resp => {
          this.konsole.push({ timeout: resp.data.success ? 12 : 20, klass: resp.data.success ? '' : 'has-text-danger', msg: resp.data.msg })
          this.loadings.submit = false;
        })
        .then(x => {
          this.tracks.incoming = [];
        })
        .finally(r => {
          this._GETHISTORY()
        })

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
        this.tracks.buffered = this.$TURFSIMPLE(this.$TURFBUFFER(this.grpHistory.toGeoJSON(), 10, { units: 'meters' }), { mutate: true, tolerance: .0001, highQuality: true });


      } //traxbuhfrd
      ,
    _BUFFERPROPOSAL: function(F) {

        this.grpBufferedProposal.clearLayers()

        this.tracks.bufferedProposal = this.$TURFSIMPLE(this.$TURFBUFFER(this.grpProposed.toGeoJSON(), 10, { units: 'meters' }), {
          mutate: true,
          tolerance: .0001,
          highQuality: true
        });

        let bpGhost = this.$TURFSIMPLE(this.$TURFBUFFER(this.grpProposed.toGeoJSON(), 50, { units: 'meters' }), {
          mutate: true,
          tolerance: .0001,
          highQuality: true
        });
        L.geoJSON(bpGhost, { style: this._STILE('debug') }).addTo(this.grpDebug)

        let li = this.$TURF_lineintersect(this.grpCenterlines.toGeoJSON(), bpGhost)
        console.log("li", li);
        L.geoJSON(li, {
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
    "tracks.incoming": {

      handler: function(vnew, vold) {
          if (vnew.features) {
            this._MAPDROP()
          }

        } //handler
    } //tracks.incoming
    ,
    "tracks.history": {
      handler: function(vnew, vold) {
          this._MAPHISTORY()
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
