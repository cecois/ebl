<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <vue-topprogress color="rgba(236, 88, 0, 1)" ref="topProgress"></vue-topprogress>
    <div id="map"></div nb="/#map">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <!-- <div class="navbar-item ">
        <span v-if="meta.been">(you've probably been here already)</span>
        <span v-if="meta.distanceToBorder">&nbsp;({{`${Number(Math.round(meta.distanceToBorder+'e'+1)+'e-'+1)}`}}km from border)</span>
      </div> -->
      <nav class="level is-mobile" id="ebl-brand">
        <div class="level-item has-text-centered">
          <div>
            <p class="">{{$_.map(page.title,ltr=>{ return Math.floor(Math.random()*10) % 2 == 0?ltr.toUpperCase():ltr; }).join('') }}
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading ebl-dash-heading">
              <a @click.default="page.splayed=!page.splayed" class="navbar-item is-size-1">
                <i :class="['fas',page.splayed?'fa-star-half-alt':'fa-star-half',page.splayed?'ebl-nav-off':'ebl-nav-on']"></i>
                <!-- <p class="ml-2 has-text-centered is-size-7">{{L.abbrev}}</p> -->
              </a>
            </p>
            <!-- <p class="heading ebl-dash-heading">wstd.km</p>
            <p :class="['title','ebl-dash-item',_BANNERCO('donePrior')]">{{meta.historyLengthInvalid.toFixed(1)}}</p> -->
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
    <div v-if="!page.splayed" class="container is-fullhd pt-6 pl-2 pr-2" id="ebl-dashboard-wrapper">
      <div class="columns">
        <!-- <div v-if="cmpTrackHistory.length>0" class="column has-text-centered">
          up to (and including) <span :class="[actives.rideKey?'ebl-filter-warning':'']" v-html="$_.last(cmpIncludedTrackNames)"></span> frm {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}
        </div nb="/.column"> -->
        <div class="column is-marginless" id="ebl-isoRide-wrapper">
          <div class="pl-6" v-if="rideIso">
            {{rideIso.name}}: <span v-if="meta.isolength">{{meta.isolength.toFixed(1)}}km</span> on <span v-if="this._GETACTIVERIDEKEYOB()">{{this.$MOMENT(this._GETACTIVERIDEKEYOB().properties.time).format('YYYY.MMM.DD')}}</span>
          </div>
          <div v-else-if="rideIso" class="pl-1 is-size-7">
            {{rideIso.name.replace("Isolated Ride ",'')}}
          </div>
        </div>
      </div nb="/.columns">
      <!--
 888888 88 88     888888 .dP"Y8
  88   88 88     88__   `Ybo."
  88   88 88  .o 88""   o.`Y8b
  88   88 88ood8 888888 8bodP'
   -->
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification has-text-centered">
                <p class="title">total km.</p>
                <p :class="['is-size-1','title','ebl-dash-item']">{{meta.centerlinesLength.toFixed(1)}}</p>
                <p class="has-text-grey-lighter">OSM export 2020.Oct.14</p>
              </article>
              <article class="tile is-child notification has-text-centered">
                <p class="title">km complete</p>
                <p v-if="_GETACTIVERIDEKEYOB()" class="ebl-filter-warning">as of {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</p>
                <p :class="['title','ebl-dash-item']">{{meta.historyLengthValid.toFixed(1)}}</p>
                <p class="has-text-grey-lighter">within town border</p>
              </article>
            </div>
            <div class="tile is-parent pt-3">
              <article class="tile is-child notification has-text-centered pt-6">
                <p class="title mt-3">% complete</p>
                <pie-chart height="200px" :legend=false :donut=true :data="_CHARTPIECOMPLETE('data')" :colors="_CHARTPIECOMPLETE('colors')"></pie-chart>
                <p :class="['mt-2','title','ebl-dash-item']">{{((meta.historyLengthValid/meta.centerlinesLength)*100).toFixed(1)}}</p>
                <p v-if="_GETACTIVERIDEKEYOB()" class="ebl-filter-warning">as of {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</p>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification has-text-centered">
              <p class="title">disqualified</p>
              <div class="content">
                <p :class="['title','ebl-dash-item']">{{meta.historyLengthInvalid.toFixed(1)}}km ({{((meta.historyLengthInvalid/meta.historyLengthValid)*100).toFixed(1)}} % of ttl riddn)</p>
                <p v-if="_GETACTIVERIDEKEYOB()" class="ebl-filter-warning">as of {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</p>
              </div>
              <p class="has-text-grey-lighter">segments determined to be outta town</p>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification has-text-centered">
            <div class="content">
              <p class="title">tracks ({{menus.tracks.length}})</p>
              <div class="content">
                <!-- traks -->
                <!-- 
 ______ ____   ____ __  _  _____
|      |    \ /    |  |/ ]/ ___/
|      |  D  )  o  |  ' /(   \_
|_|  |_|    /|     |    \ \__  |
  |  | |    \|  _  |     \/  \ |
  |  | |  .  \  |  |  .  |\    |
  |__| |__|\_|__|__|__|\_| \___|
 -->
                <nav id="trackHistoryPanel" class="xpanel">
                  <!-- <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="" v-model="liveFilter.string">
                    <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
                    <i @click="actives.rideKey=null" :class="['fas',' fa-slash',' ebl-bt-trackmenu',' mt-2',' mb-0',actives.rideKey?'':'ebl-is-disabled']"></i>
                  </p> -->
                  <a @click.prevent="actives.rideKey==trk.trackName?actives.rideKey=null:actives.rideKey=trk.trackName" v-for="trk in menus.tracks" :class="[$_.contains(cmpIncludedTrackNames,trk.trackName)?'included':'','panel-block','is-ac','waye']">
                    <span class="panel-icon">
      <i :class="['ebl-bt-trackmenu',actives.rideKey==trk.trackName?'fas fa-circle ebl-bt-trackmenu-on':'far fa-circle']" aria-hidden="true"></i>
    </span><span :class="[actives.rideKey==trk.trackName?'ebl-bt-trackmenu-on':'']">{{trk.trackName}}</span> <span class="is-size-7 has-text-grey-lighter">&nbsp;({{$MOMENT(trk.trackTime).format('YY.MMM.DD')}})</span>
                  </a>
                </nav>
              </div nb="/traks">
            </div>
          </article>
        </div>
      </div NB="/.tile.is-ancestor">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <article v-if="_GETACTIVERIDEKEYOB()" class="tile is-child has-text-centered">
            <p class="title">streets touched</p>
            <p class="ebl-filter-warning">*on* {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</p>
            <p v-if="cmpStreetsPerIso.length>0" class="is-size-7">
              <a :class="[actives.streetIso==str.streetName?'street-on':'street']" @click.prevent="actives.streetIso=actives.streetIso==str.streetName?null:str.streetName" v-for="str in cmpStreetsPerIso">{{str.streetName}} ({{str.count}}), </a>
            </p>
            <p v-else class="is-size-7">
              <span>calculated per isolated track, empty otherwise</span>
            </p>
          </article>
          <article class="tile is-child has-text-centered">
            <p class="title">streets ahead</p>
            <!-- <p class="">streets not yet touched</p> -->
            <p class="">
              <!-- <span v-for="str in tracks.streetsAhead">{{str}}, </span> -->
              <a :class="[actives.streetIso==str?'street-on':'street']" @click.prevent="actives.streetIso=str==actives.streetIso?null:str" v-for="str in tracks.streetsAhead">{{str}}, </a>
            </p>
          </article>
        </div>
      </div NB="/.tile.is-ancestor">
    </div NB="/#ebl-dashboard-wrapper">
    <!-- 

  .g8"""bgd                      .g8"""bgd `7MM"""YMM
.dP'     `M                    .dP'     `M   MM    `7
dM'       ``7MM  `7MM   ,6"Yb. dM'       `   MM   d    ,pP"Ybd
MM           MM    MM  8)   MM MM            MMmmMM    8I   `"
MM.    `7MMF'MM    MM   ,pm9MM MM.    `7MMF' MM   Y  , `YMMMa.
`Mb.     MM  MM    MM  8M   MM `Mb.     MM   MM     ,M L.   I8
  `"bmmmdPY  `Mbod"YML.`Moo9^Yo. `"bmmmdPY .JMMmmmmMMM M9mmmP'
ggz
 -->
    <div v-if="page.splayed" class="container is-fullhd pt-6" id="ebl-dashboard-wrapper-splayed">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div class="has-text-centered">
            <p class="has-text-centered" id="">
              <p class="">%</p>
              <p class="title">
                <pie-chart position="relative" height="50px" width="33%" :legend=false :donut=true :data="_CHARTPIECOMPLETE('data')" :colors="_CHARTPIECOMPLETE('colors')"></pie-chart>
              </p>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">km cmplt</p>
            <p class="title">{{meta.historyLengthValid.toFixed(1)}}</p>
          </div>
        </div>
        <div v-if="_GETACTIVERIDEKEYOB()" class="level-item has-text-centered">
          <div>
            <p class="heading">Isltd Rid</p>
            <p class="title">{{_GETACTIVERIDEKEYOB().properties.name}}
              <div class="has-text-grey-light is-size-7">
                {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</div>
            </p>
          </div>
        </div>
        <div v-if="_GETACTIVERIDEKEYOB()" class="level-item has-text-centered">
          <div>
            <p class="heading">IsltdRid.len</p>
            <p class="title">{{meta.isolength.toFixed(1)}}</p>
          </div>
        </div>
      </nav>
      <div class="columns">
        <div class="column has-text-centered is-size-6">
          <p v-if="_GETACTIVERIDEKEYOB()" class="ebl-filter-warning">#s as of {{$MOMENT(_GETACTIVERIDEKEYOB().properties.time).format('YY.MMM.DD')}}</p>
        </div>
      </div>
    </div NB="#/ebl-dashboard-wrapper-splayed">
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
          <!-- <span class="is-family-code is-size-7 has-text-grey-lighter pr-2" v-html="`{basemap:${$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).name}}`"></span> -->
          <figure :data-tooltip="bm.name" v-for="bm in baseMaps" class="image is-24x24 mr-2 has-tooltip-arrow">
            <img @click="actives.baseMap=bm.handle" :class="['bt_baseMap','is-rounded',bm.handle==actives.baseMap? 'active': '']" :src="bm.thmb">
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

    // here we do some intercepting of our colloquial router null, the '$'



  },
  beforeDestroy: function() {
    window.removeEventListener('keydown', this.keyMonitor)
  },
  mounted: function() {

    this.actives = {
      rideKey: (!this.$route.params.ridekey || this.$route.params.ridekey == '$') ? null : this.$route.params.ridekey,
      rideIso: (!this.$route.params.rideiso || this.$route.params.rideiso == '$') ? null : this.$route.params.rideiso,
      streetIso: (!this.$route.params.streetiso || this.$route.params.streetiso == '$') ? null : this.$route.params.streetiso,
      baseMap: (!this.$route.params.basemap || this.$route.params.basemap == '$') ? 'carto_positron' : this.$route.params.basemap,
      queryString: (!this.$route.params.query || this.$route.params.query == '$') ? null : this.$route.params.query,
      bboxString: (!this.$route.params.bbox || this.$route.params.bbox == '$') ? null : this.$route.params.bbox,
      splayed: this.$route.params.splayed == 'S' ? true : false
    }

    // this.CONFIG = CONFIG
    window.addEventListener('keydown', this.keyMonitor)
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



    let p = 408;
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
      this.grpbasemaps = new L.featureGroup().addTo(this.MAP)
    }

    if (!this.grpadminghost) {
      this.grpadminghost = new L.featureGroup().addTo(this.MAP)
    }
    if (!this.grphistorytracksValid) {
      this.grphistorytracksValid = new L.featureGroup().addTo(this.MAP)
      this.layers.push({ menued: false, group: "grphistorytracksValid", handle: 'grphistorytracksvalid', on: true, abbrev: "grphistorytracksValid", klass: 'icon-noun_buffer', fz: 1 })
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
      }) //axios.catch*/

    $.getJSON('static/ebl-buffered.geojson', G => {
      L.geoJSON(G, {
        style: this._STILE('buffer')
      }).addTo(this.grpbuffered);
      this.loadings.app = false;
    });

    // streets-ahead.json
    // streets-hit-master.json
    $.getJSON('static/streets-hit-master.json', H => {
      this.tracks.streetsLog = H;
    });

    $.getJSON('static/streets-ahead.json', H => {
      this.tracks.streetsAhead = H;
    });

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
        // this.konsole.push({ msg: e, klass: "error", timeout: 20 })
        this.konsole = [{ msg: e, klass: "error", timeout: 20, sender: "axios.catch.brookline" }]
      }) //axios.catch


    $.getJSON('static/brookline-osm-centerlines.geojson', G => {
      L.geoJSON(G, {
        style: this._STILE('centerlines')
      }).addTo(this.grpcenterlines);
      this.meta.centerlinesLength = this.$TURFLENGTH(this.grpcenterlines.toGeoJSON())
        // could be there's a streetiso waiting on this
      if (this.actives.streetIso) {
        this._SETSTREETISO()
      }
    });

    this.loadings.app = false;

    this.$nextTick(() => {
      this._GETHISTORY()
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

    window.V = this;
    console.log(window.V);

  },
  computed: {
    // cmpIncludedTracks: function() {

    //   // CoPY tHE HiStorY oB
    //   let o = this.tracks.history;

    //   if (this.actives.rideKey) {
    //     o.features = this.$_.reject(this.tracks.history.features, fea => {
    //       return fea.properties.time <= this._GETACTIVERIDEKEYOB().properties.time;
    //     });

    //   } //if.ridekey

    //   return o;

    //   if (this.actives.rideKey) {
    //     // get the one track that matches ridekey
    //     let itar = this.$_.find(this.tracks.history, t => {
    //       return this.$_.first(t.features).properties.name == this.actives.rideKey
    //     })

    //     // return an array of all the histories up to and including that track's timestamp
    //     return this.$_.map(this.$_.filter(this.tracks.history, itartrk => {

    //       return this.$_.first(itartrk.features).properties.time <= this.$_.first(itar.features).properties.time
    //     }), itarinctrk => {
    //       return itarinctrk
    //     })
    //   } else {
    //     // no ride key we just want a nice clean list of the track keys
    //     return this.tracks.history
    //   }

    // },

    cmpLayerOnns: function() {
      return this.$_.sortBy(this.$_.filter(this.layers, l => {
        return l.on
      }), 'fz')
    }, //cmpLayerOnns
    cmpLayerOffs: function() {
      return this.$_.filter(this.layers, l => {
        return !l.on
      })
    }, //cmpLayerOffs
    cmpStreetsPerIso: function() {

      // return this.$_.map(this.meta.streetsPerIso, spi => {
      //   return {
      //     streetName: this.$_.first(this.$_.uniq(this.$_.pluck(spi, 'streetName'))),
      //     count: spi.length
      //   }
      // })

      return this.$_.map(this.meta.streetsPerIso, spi => {
        return {
          streetName: this.$_.first(this.$_.uniq(this.$_.pluck(spi, 'streetName'))),
          count: spi.length
        }
      })

      // return this.$_.map(this.$_.uniq(this.$_.pluck(this.$_.first(this.meta.streetsPerIso), 'streetName')), uniqStreet => {
      //   return {
      //     streetName: uniqStreet,
      //     count: this.$_.find(this.$_.first(this.meta.streetsPerIso), spi => {
      //       return spi.streetName == uniqStreet
      //     }).length
      //   }
      // })

    },
    cmpIncludedTrackNames: function() {

      return this.actives.rideKey ? this.$_.pluck(this.$_.filter(this.menus.tracks, trk => {
          return new Date(trk.trackTime).valueOf() <= new Date(this._GETACTIVERIDEKEYOB().properties.time).valueOf()
        }), 'trackName') : this.$_.pluck(this.menus.tracks, 'trackName')
        /*if (this.actives.rideKey) {
          // get the one track that matches ridekey
          let itar = this.$_.find(this.tracks.history, t => {
            return this.$_.first(t.features).properties.name == this.actives.rideKey
          })

          // return an array of all the histories up to and including that track's timestamp
          return this.$_.map(this.$_.filter(this.tracks.history, itartrk => {

            return this.$_.first(itartrk.features).properties.time <= this.$_.first(itar.features).properties.time
          }), itarinctrk => {
            return this.$_.first(itarinctrk.features).properties.name
          }).sort()
        } else {
          // no ride key we just want a nice clean list of the track keys
          return this.$_.map(this.tracks.history, th => {
            return this.$_.first(th.features).properties.name
          }).sort()
        }*/

    },
    cmpTrackHistory: function() {
      return []
        /*let propArray = this.$_.sortBy(this.$_.map(this.tracks.history, T => {

          this.meta.trackMeta.push({
            track: this.$_.first(T.features).properties.name,
            length: this.$TURFLENGTH(T)
          })

          return T.features[0].properties
        }), "time")


        return !this.liveFilter.string ? propArray : this.$_.filter(propArray, prop => {
          return prop.name.toLowerCase().indexOf(this.liveFilter.string) >= 0
        })*/

    }
  },
  data() {
    return {
      MAP: null,
      meta: {
        within: true,
        been: true,
        centerlinesLength: 0,
        historyLengthValid: 0,
        historyLengthInvalid: 0,
        traceLength: 0,
        trackMeta: [],
        streetsPerIso: []
      },
      menus: { tracks: [] },
      border: null,
      debug: {},
      streetIso: null,
      rideIso: null,
      liveFilter: { string: null },
      actives: {
        baseMap: null,
        rideKey: null,
        rideIso: null,
        streetIso: null,
        queryString: null,
        bboxString: null,
        splayed: null
      },
      baseMaps: [{
        name: "Stamen Toner Lite",
        handle: "stamen_toner_lite",
        urii: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}@2x.png",
        thmb: "https://stamen-tiles-c.a.ssl.fastly.net/toner-lite/18/79279/96968@2x.png",
        hue: "light"
      }, {
        name: "AllTrails Topo",
        handle: "alltrails_topo",
        urii: "https://us-topo.alltrails.com/{z}/{x}/{y}.png",
        thmb: "https://us-topo.alltrails.com/13/2459/3025.png",
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
        name: "USGS All-Topo",
        handle: "usgs_topo",
        urii: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
        thmb: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/16/24242/19819",
        hue: "light"
      }, {
        name: "USGS Relief",
        handle: "usgs_relief",
        urii: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/tile/{z}/{y}/{x}",
        thmb: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/tile/16/24242/19819",
        hue: "light"
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
      }, {
        name: "Decimal (by Tristen Brown)",

        handle: "mapbox_decimal",
        urii: "https://api.mapbox.com/styles/v1/cecois/cj5mk8bee3i2w2qkg9al5viir/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2Vjb2lzIiwiYSI6ImNqM3B3ZHJ3MzAwc2Qyd3BmNTdqeTlxcmcifQ.gZGEq-kc0KdSNWfh-3wumA",
        thmb: "https://api.mapbox.com/styles/v1/cecois/cj5mk8bee3i2w2qkg9al5viir/tiles/256/18/79279/96968@2x?access_token=pk.eyJ1IjoiY2Vjb2lzIiwiYSI6ImNqM3B3ZHJ3MzAwc2Qyd3BmNTdqeTlxcmcifQ.gZGEq-kc0KdSNWfh-3wumA",
        hue: "dark"
      }, {
        name: "Frank (by Clare Trainor)",

        handle: "mapbox_frank",
        urii: "https://api.mapbox.com/styles/v1/cecois/ckjresd9b3gxp19l7cumbgdpi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2Vjb2lzIiwiYSI6ImNqM3B3ZHJ3MzAwc2Qyd3BmNTdqeTlxcmcifQ.gZGEq-kc0KdSNWfh-3wumA",
        thmb: "https://api.mapbox.com/styles/v1/cecois/ckjresd9b3gxp19l7cumbgdpi/tiles/256/18/79279/96968@2x?access_token=pk.eyJ1IjoiY2Vjb2lzIiwiYSI6ImNqM3B3ZHJ3MzAwc2Qyd3BmNTdqeTlxcmcifQ.gZGEq-kc0KdSNWfh-3wumA",
        hue: "dark"
      }],
      layers: [],

      konsole: [],
      page: { title: "ebl.dshbrd", splayed: false },
      modals: { credits: false },
      loadings: { app: false },
      tracks: { history: [], buffered: null, streetsLog: null, streetsAhead: null },
      credits: [
        "routing: openrouteservice.org | OpenStreetMap contributors",
        "buffered tracks icon: outline by Jellycons from the Noun Project", "tracks icon: route by Andrejs Kirma from the Noun Project", "tracks review icon: Test Tube by Icon Island from the Noun Project", "proposed route icon: Vector by logan from the Noun Project",
        "isolated track icon: Binoculars by praveen patchu from the Noun Project",
        "app icon: (altered from 'Bicycle' by) ibrandify, PK - https://thenounproject.com/search/?q=bicycle&i=2667656"
      ],
      classes: {
        "armygreen": "rgba(75, 83, 32, 1)",
        "persimmon": "rgba(236, 88, 0, 1)",
        "darksienna": "rgba(51, 15, 10, 1)",
        "flax": "rgba(239, 221, 141, 1)",
        "lemonyellowcrayola": "rgba(244, 253, 175, 1)",
        "naplesyellow": "#F8E16C",
        "eblwhite": "rgb(233, 233, 233)",
        "celadonblue": "rgba(36, 123, 160, 1)",
        "skybluecrayola": "rgba(120, 227, 253, 1)",
        "barnred": "rgba(111, 26, 7, 1)"
      }
    }
  },
  methods: {

    _SETSTREETISO: function() {

      console.log("_SETstreetISO");


      if (!this.actives.streetIso) {
        console.log(`no streetiso, setting to null...`)
        this.streetIso = null;
        // this.modals.trackIso = false;
      } else {
        let features = this.$_.flatten(this.$_.filter(this.grpcenterlines.toGeoJSON().features, fea => {
          return fea.properties.name == this.actives.streetIso
        }));

        this.streetIso = {
          "type": "FeatureCollection",
          "name": `Isolated Street ${this.actives.rideKey}`,
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          "features": features
        }

      }

      // this.grpstreetiso.bringToFront()

    },
    _SETRIDEISO: function() {

      console.log("_SETRIDEISO");


      if (!this.actives.rideIso) {
        console.log(`no rideiso, setting to null...`)
        this.rideIso = null;
        // this.modals.trackIso = false;
      } else {
        console.log(`in setride iso, pulling from ${this.tracks.history.features.length} features`)
        let features = this.$_.flatten(this.$_.filter(this.tracks.history.features, fea => {
          return fea.properties.name == this.actives.rideKey
        }));

        console.log("features", features);

        this.rideIso = {
          "type": "FeatureCollection",
          "name": `Isolated Ride ${this.actives.rideKey}`,
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          "features": features
        }

      }

      this.grpisotracks.bringToFront()

    },
    _MAPRIDEISO: function() {

      console.log("_mapRIDEISO's this.rideIso", this.rideIso);

      this.grpisotracks.clearLayers()
      if (this.rideIso) {



        // light it up (so to speak)
        L.geoJSON(this.rideIso, { pane: 'pnIso', style: this._STILE('iso') }).addTo(this.grpisotracks)

        this.grpisotracks.bringToFront()
        this.MAP.fitBounds(this.grpisotracks.getBounds())
        this.$_.findWhere(this.layers, { group: "grpisotracks" }).on = true
          // this._LAUDIT()

        this._META()
          // pull the panel

      }

      this.grpisotracks.bringToFront()

    },
    _MAPSTREETISO: function() {

      console.log("_mapSTREETISO");

      this.grpstreetiso.clearLayers()
      if (this.streetIso) {



        // light it up (so to speak)
        L.geoJSON(this.streetIso, { pane: 'pnStreetIso', style: this._STILE('streetiso') }).addTo(this.grpstreetiso)
          .bindPopup(layer => {
            return `<h5 class="is-size-5">${layer.feature.properties.name} (${this.$TURFLENGTH(this.grpstreetiso.toGeoJSON()).toFixed(1)}km)</h5>`;
          })
          .on("popupclose", () => { this.actives.streetIso = null; })
          .openPopup()

        // this.grpstreetiso.bringToFront()
        this.$_.findWhere(this.layers, { group: "grpstreetiso" }).on = true

        // this._META()
        // pull the panel

        if (this.actives.streetIso && this.grpstreetiso.getBounds().isValid()) {
          this.MAP.fitBounds(this.grpstreetiso.getBounds())
        }
      }

    },
    _GETACTIVERIDEKEYOB: function() {

      if (this.tracks.history) {
        return this.$_.find(this.tracks.history.features, fea => {

          return fea.properties.name == this.actives.rideKey
        })
      }

      /*return this.$_.find(this.tracks.history.features, fea => {
        return fea.properties.name == this.actives.rideKey
      })*/

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
        case 'buffer':
          return { color: "rgb(236, 88, 0)", fill: true, fillOpacity: .3, opacity: .5 }
          break;
        case 'trackvalid':
          return { width: 5, color: "rgba(36, 123, 160, 1)", fill: false, opacity: .9 }
          break;
        case 'trackinvalid':
          return { width: 5, color: "rgba(111, 26, 7, 1)", fill: false, opacity: .9 }
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
    _GETFILTEREDTRACKS: function() {

      // CoPY tHE HiStorY oB
      let o = this.$_.clone(this.tracks.history)

      if (this._GETACTIVERIDEKEYOB()) {
        o.features = this.$_.filter(o.features, fea => {
          return new Date(fea.properties.time).valueOf() <= new Date(this._GETACTIVERIDEKEYOB().properties.time).valueOf();
        });

      } //if.ridekey

      return o;

    },
    _CHARTPIECOMPLETE: function(w) {

      let k = null;
      let D = { 'done (excluding disqualifieds)': this.meta.historyLengthValid, 'remaining': (this.meta.centerlinesLength - this.meta.historyLengthValid) }

      switch (w) {
        case 'data':
          k = D
          break;
        case 'colors':
          k = [this.classes.persimmon, 'rgba(75, 83, 32, .5)']
          break;
        default:
          k = D
          break;
      }

      return k

    }, //piechart
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
    _GETHISTORY: function() {
        // console.log("_GETHISTORY");

        this.loadings.app = true

        // temporary
        /*        let trks = [
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

                let pz = []*/

        $.getJSON(`static/ebl.geojson`, G => {
          this.loadings.app = false
          this.tracks.history = G;
        });


      } //githizterrie
      ,
    _MAPHISTORY: function() {

      this.grphistorytracksValid.clearLayers()
      this.grphistorytracksInvalid.clearLayers()

      // if (this.tracks.history && this.tracks.history.length > 0) {
      // if (this.tracks.history && this._GETFILTEREDTRACKS().features.length > 0) {
      if (this._GETFILTEREDTRACKS() && this._GETFILTEREDTRACKS().features && this._GETFILTEREDTRACKS().features.length > 0) {
        this.loadings.app = true;

        /*let ar = this.$_.find(this.tracks.history, t => {
          return this.$_.first(t.features).properties.name == this.actives.rideKey
        })*/

        /*let th = this.actives.rideKey ?
          this.$_.reject(this.tracks.history, trak => {

            return this.$_.first(trak.features).properties.time > this.$_.first(ar.features).properties.time
          }) : this.tracks.history*/

        this.$_.each(this._GETFILTEREDTRACKS().features, trackFeature => {

            if (trackFeature.properties.winout == 'winn') {

              L.geoJSON(trackFeature, {
                  style: this._STILE('trackvalid', trackFeature.properties.time)
                })
                .bindPopup(layer => {
                  return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
                })
                .addTo(this.grphistorytracksValid)
                .on("click", (e) => {

                  this.actives.rideKey = e.layer.feature.properties.name

                })
            } //if.winn
            else {
              L.geoJSON(trackFeature, {
                  style: this._STILE('trackinvalid', trackFeature.properties.time)
                })
                .bindPopup(layer => {
                  return `<h5 class="is-size-5">${layer.feature.properties.name}</h5>`;
                })
                .addTo(this.grphistorytracksInvalid)
                .on("click", (e) => {

                  this.actives.rideKey = e.layer.feature.properties.name

                })
            } //if.else (wout)

          }) //eetch.history

        if (!this.actives.bboxString) {
          this.MAP.fitBounds(this.grphistorytracksValid.getBounds())
        }

        this.loadings.app = false;

        // this._BUFFERTRACKS()
        // this._LAUDIT('grphistorytracks', false)
      } //if history

      this.$nextTick(() => {

        this._META('history')
          // if (this.actives.rideIso) { this._SETRIDEISO() }
        this._SETRIDEISO()
      })
    },
    keyMonitor: function(e) {

      if (e.key == "\`") { this.page.splayed = !this.page.splayed }
      if (e.altKey) { this.page.splayed = !this.page.splayed }

    },
    // _FTO: function() {
    //   // just a thing that maes it cleaner to get a full, single track object by key (name)

    //   return this.$_.find(this.tracks.history, th => {
    //     return this.$_.first(th.features).properties.name == this.$_.last(this.cmpIncludedTrackNames)
    //   })

    // },
    _SETMENUS: function() {

      this.menus.tracks = this.$_.map(this.$_.groupBy(this.$_.map(this.tracks.history.features, fea => {
        return fea.properties
      }), 'name'), trackGroup => {
        return {
          trackName: this.$_.first(this.$_.pluck(trackGroup, 'name')),
          trackTime: this.$_.first(this.$_.pluck(trackGroup, 'time'))
        }
      })

    },
    _META: function(w) {

      this.meta.historyLengthValid = this.$TURFLENGTH(this.grphistorytracksValid.toGeoJSON())
      this.meta.historyLengthInvalid = this.$TURFLENGTH(this.grphistorytracksInvalid.toGeoJSON())
      this.meta.isolength = this.$TURFLENGTH(this.grpisotracks.toGeoJSON(), { units: "kilometers" })

      // let spi = this.$_.groupBy(this.$_.filter(this.tracks.streetsLog, s => {
      //   return s.rideKey == this._GETACTIVERIDEKEYOB().properties.name.replace(' #', '_')
      // }), 'streetName');

      // this.meta.streetsPerIso = this._GETACTIVERIDEKEYOB() ? this.$_.sortBy(this.$_.groupBy(this.$_.filter(this.tracks.streetsLog, s => {
      //   return s.rideKey == this._GETACTIVERIDEKEYOB().properties.name.replace(' #', '_')
      // }), 'streetName'), so => {
      //   return so.length * -1
      // }) : []

      this.meta.streetsPerIso = this._GETACTIVERIDEKEYOB() ?
        this.$_.sortBy(this.$_.groupBy(this.$_.filter(this.tracks.streetsLog, s => {
          return s.rideKey == this._GETACTIVERIDEKEYOB().properties.name.replace(' #', '_')
        }), 'streetName'), so => {
          return so.length * -1
        }) : []

      // console.log("spi", spi);
      //   this.meta.streetsPerIso =
      // }


      // FoR EAch CENteRLINE'S cEnTERPOinT
      // this.$_.each(this.grpcenterlines.toGeoJSON().features, fea => {

      //     let centerPoint = this.$TURF_center(this.$TURFCOMBINE(fea))


      //     // is tHe FEAtUre'S CentERpoINT WIThin (The BuFfERED vERSion of) our history?
      //     let w = this.$TURF_booleanwithin(centerPoint, this.grpbuffered.toGeoJSON().features[0])

      //     // hOW aBOut thIs - is The FeATUre'S CeNtERPoInT Also WiThin oUR bUFfErEd trACE lInE?
      //     if (w) {
      //       // console.log('fea w/in history buff', fea)
      //       this.meta.isolist.push(fea.properties.name)
      //         // L.geoJSON(fea, { style: this._STILE('debug') }).addTo(this.grpdebug)
      //         //  if SO WE ligHt eM up bY AdDiNg thEm tO GrPtrACEceNTerlINeS
      //         // L.geoJSON(this.$TURFBUFFER(this.$TURFH.lineString(fea.geometry.coordinates[0]), 50, { units: "feet" }), { style: this._STILE('untraversed') }).addTo(this.grptrace)
      //     }
      //   }) //EETch.grpceNTeRLiNes

    },
    _METAOG: function(w) {

      this.grpdebug.clearLayers()

      switch (w) {
        /*case 'trace':
          this.meta.doneToday = this.$TURFLENGTH(this.grptrace.toGeoJSON())
          this.meta.distanceToBorder = 888
          break;*/
        case 'history':
          if (this.border && this.grphistorytracksValid.getLayers().length > 0) {

            // combined prior tracks
            let hh = this.$_.flatten(this.$TURFCOMBINE(this.grphistorytracksValid.toGeoJSON()).features[0].geometry.coordinates, 1)
              // console.log("hh length", this.$TURFLENGTH(hh));

            // ...as a single linestring
            let megaLine = this.$TURFH.lineString(hh)
            console.log("megaLine length", this.$TURFLENGTH(megaLine));


            // split that megaline by town border
            let split = this.$TURF_linesplit(megaLine, this.border.features[0]);
            console.log("split length", this.$TURFLENGTH(split));
            console.log("split:", split);

            // some counters
            let lengthValid = 0
            let lengthInvalid = 0

            // gotta test the centerpoints
            this.$_.each(split.features, (fea, feai) => {
              console.log("fea", fea);

              let win = this.$TURF_booleanwithin(this.$TURF_centroid(fea), this.grpadminghost.toGeoJSON().features[0])

              if (win) {
                // console.log(`win==${win} so we add ${this.$TURFLENGTH(fea)} to validlength of ${lengthValid}`)
                L.geoJSON(fea, {
                  style: this._STILE('linz'),
                  onEachFeature: function(feature, layer) {
                    feature.on('click', function() {
                      feature.setStyle({
                        width: 6,
                        color: '#93E600',
                        weight: 5,
                        opacity: 1,
                        fill: false
                      })
                    })
                  }
                }).addTo(this.grpdebug)
              } else {
                // console.log(`win==${win} so we add ${this.$TURFLENGTH(fea)} to INvalidlength of ${lengthInvalid}`)
                L.geoJSON(fea, {
                  style: this._STILE('debug'),
                  onEachFeature: function(feature, layer) {
                    feature.on('click', function() {
                      feature.setStyle({
                        width: 6,
                        color: '#93E600',
                        weight: 5,
                        opacity: 1,
                        fill: false
                      })
                    })
                  }
                }).addTo(this.grpdebug);
              }

              win ? lengthValid = lengthValid + this.$TURFLENGTH(fea, { units: "kilometers" }) : lengthInvalid = lengthInvalid + this.$TURFLENGTH(fea, { units: "kilometers" })

            })

            console.log("pre.this.meta.historyLengthValid", this.meta.historyLengthValid);
            console.log("pre.this.meta.historyLengthInvalid", this.meta.historyLengthInvalid);
            this.meta.historyLengthValid = lengthValid
            console.log("lengthValid", lengthValid);
            this.meta.historyLengthInvalid = lengthInvalid
            console.log("lengthInvalid", lengthInvalid);

            console.log("post.this.meta.historyLengthValid", this.meta.historyLengthValid);
            console.log("post.this.meta.historyLengthInvalid", this.meta.historyLengthInvalid);

          } else {
            console.log(`border and/or history not ready`)
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

          this.$TURFBUFFER(this.grphistorytracksValid.toGeoJSON(), 10, { units: 'meters' })

      } //traxbuhfrd
      ,
    _MAPBUFFEREDTRACKS: function(F) {


        L.geoJSON(this.tracks.buffered, {
            style: (feature) => {
              return this._STILE('buffer', feature)
            }
          })
          .addTo(this.grpbuffered);

        this.grphistorytracksValid;
        this.$_.findWhere(this.layers, { group: "grpbuffered" }).on = true

      } //traxbuhfrd
      ,
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
      } //switch



    }, //groupget
    _SETROUTE: function() {

        let P = {
          ridekey: this.actives.rideKey ? this.actives.rideKey : '$',
          rideiso: this.actives.rideIso ? 'S' : '$',
          streetiso: this.actives.streetIso ? this.actives.streetIso : '$',
          basemap: this.actives.baseMap ? this.actives.baseMap : '$',
          splayed: this.page.splayed ? 'S' : '$',
          query: this.actives.queryString ? this.actives.queryString : '$',
          bbox: this.actives.bboxString ? this.actives.bboxString : '$'
        }
        this.$router.push({
          params: P
        }); //rejplace
      } //setRoute
      ,
    _LAUDIT: function() {
      console.log("_LAUDIT");

      // let offs = this.$_.filter(this.layers, l => {
      //   return !l.on
      // })
      // let onns = this.$_.filter(this.layers, l => {
      //   return l.on
      // })

      this.$_.each(this.cmpLayerOffs, o => {
        let g = this._GROUPGET(o.group);
        this.MAP.removeLayer(g)
      })
      this.$_.each(this.cmpLayerOnns, o => {
        let g = this._GROUPGET(o.group);
        this.MAP.addLayer(g);
        g.bringToFront()
      })

    }, //laudit
    _LAUDITOG: function(H, T) {


        let c = null;

        switch (H) {
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
          case 'grphistorytracks':
            if (T) {
              this.MAP.addLayer(this.grphistorytracksValid)
              this.$_.findWhere(this.layers, { handle: H }).on = true
            } else {
              // current state is?
              c = this.$_.findWhere(this.layers, { handle: H }).on
                // flip it on the map
              c ? this.MAP.removeLayer(this.grphistorytracksValid) : this.MAP.addLayer(this.grphistorytracksValid);
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
    "layers": {
      deep: true,
      handler: function(vnew, vold) {
          this._LAUDIT()
        } //handler
    } //loadings
    ,
    "tracks.buffered": {
      handler: function(vnew, vold) {

          // this._GETPROPOSED()
          // this._MAPBUFFEREDTRACKS()
        } //handler 
    } //loadings 
    ,
    "page.splayed": {
      handler: function(vnew, vold) {

          this._SETROUTE()
        } //handler 
    } //loadings 
    ,
    "tracks.history": {
      handler: function(vnew, vold) {
          this._SETMENUS()
          this._MAPHISTORY()
            // this._META('history')
        } //handler
    } //tracks.HISTORY

    ,
    // trace: {
    //   handler: function(vnew, vold) {
    //       this._MAPTRACE()
    //       this._META('trace')
    //     } //handler
    // } //tracks.HISTORY
    // // ,
    // // border: {
    // //   handler: function(vnew, vold) {

    // //       this._META('history')
    // //     } //handler
    // // } //tracks.HISTORY
    // ,
    "actives.baseMap": {
      handler: function(vnew, vold) {

          let buri = this.$_.findWhere(this.baseMaps, { handle: this.actives.baseMap }).urii
          if (buri) {
            this.grpbasemaps.clearLayers()
            this.grpbasemaps.addLayer(new L.TileLayer(buri));
          }
          this._SETROUTE()
        } //handler
    } //tracks.HISTORY
    ,
    "actives.rideKey": {

      handler: function(vnew, vold) {
          if (this.tracks.history) { this._MAPHISTORY() }
          this.actives.rideIso = vnew ? true : false;

          this._SETROUTE()
        } //handler

    } //ridekey
    ,
    "actives.streetIso": {

      handler: function(vnew, vold) {
          this._SETSTREETISO()
          this._SETROUTE()
        } //handler

    } //ridekey
    /*    ,
        "actives.rideIso": {

          handler: function(vnew, vold) {
              console.log("actives.rideIso handler finds vnew==", vnew)
              // if (this.tracks.history) { this._SETRIDEISO() } //this isolates the geoms from master per current rideKey, sets isoRide (see below)
              this._SETROUTE()
            } //handler

        } //ridekey*/
    ,
    "rideIso": {

      handler: function(vnew, vold) {
          this._MAPRIDEISO()
        } //handler

    } //ridekey
    ,
    "streetIso": {

      handler: function(vnew, vold) {
          if (vnew) {
            this.page.splayed = true;
          }

          this._MAPSTREETISO()
        } //handler

    } //ridekey
    // ,
    // "meta.within": {
    //   handler: function(vnew, vold) {
    //       if (vold && !vnew) {
    //         // this.konsole.push({ timeout: 6, klass: 'has-text-danger', msg: "YOU JUST LEFT BROOKLINE" })
    //         this.konsole = [{ timeout: 6, klass: 'has-text-danger', msg: "YOU JUST LEFT BROOKLINE :-<", sender: "meta.within.watcher" }]
    //       }
    //       if (vnew && !vold) {
    //         // this.konsole.push({ timeout: 6, klass: 'has-text-info', msg: "ur back in brooklinline :-)" })
    //         this.konsole = [{ timeout: 6, klass: 'has-text-info', msg: "back in brookline :-)", sender: "meta.within.watcher" }]
    //       }
    //     } //handler
    // } //tracks.HISTORY
  } //watch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
</style>
