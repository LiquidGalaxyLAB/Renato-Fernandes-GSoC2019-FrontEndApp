(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c82c10e"],{"0a24":function(t,e,r){t.exports=r.p+"img/2.17762aa1.jpg"},"11e9":function(t,e,r){var i=r("52a7"),a=r("4630"),n=r("6821"),s=r("6a99"),o=r("69a8"),c=r("c69a"),l=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?l:function(t,e){if(t=n(t),e=s(e,!0),c)try{return l(t,e)}catch(r){}if(o(t,e))return a(!i.f.call(t,e),t[e])}},"12b2":function(t,e,r){"use strict";var i=r("2b0e");e["a"]=i["default"].extend({name:"v-card-title",functional:!0,props:{primaryTitle:Boolean},render:function(t,e){var r=e.data,i=e.props,a=e.children;return r.staticClass=("v-card__title "+(r.staticClass||"")).trim(),i.primaryTitle&&(r.staticClass+=" v-card__title--primary"),t("div",r,a)}})},"144a":function(t,e,r){var i={"./1.jpg":"59e9","./2.jpg":"0a24","./3.jpg":"879f"};function a(t){var e=n(t);return r(e)}function n(t){var e=i[t];if(!(e+1)){var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}return e}a.keys=function(){return Object.keys(i)},a.resolve=n,t.exports=a,a.id="144a"},"23bf":function(t,e,r){"use strict";var i=r("80d2"),a=r("2b0e");e["a"]=a["default"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles:function(){var t={},e=Object(i["b"])(this.height),r=Object(i["b"])(this.minHeight),a=Object(i["b"])(this.minWidth),n=Object(i["b"])(this.maxHeight),s=Object(i["b"])(this.maxWidth),o=Object(i["b"])(this.width);return e&&(t.height=e),r&&(t.minHeight=r),a&&(t.minWidth=a),n&&(t.maxHeight=n),s&&(t.maxWidth=s),o&&(t.width=o),t}}})},"253d":function(t,e,r){},"4c34":function(t,e,r){},"4c94":function(t,e,r){},"59e9":function(t,e,r){t.exports=r.p+"img/1.2cb7c6b3.jpg"},"5dbc":function(t,e,r){var i=r("d3f4"),a=r("8b97").set;t.exports=function(t,e,r){var n,s=e.constructor;return s!==r&&"function"==typeof s&&(n=s.prototype)!==r.prototype&&i(n)&&a&&a(t,n),t}},"879f":function(t,e,r){t.exports=r.p+"img/3.bbb4cd42.jpg"},"8b97":function(t,e,r){var i=r("d3f4"),a=r("cb7c"),n=function(t,e){if(a(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,r){return n(t,r),e?t.__proto__=r:i(t,r),t}}({},!1):void 0),check:n}},9093:function(t,e,r){var i=r("ce10"),a=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,a)}},9636:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{"grid-list-xl":""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xl12:""}},[r("h1",{staticClass:"text-xs-center display-1"},[t._v("Sensor list")])])],1),r("v-layout",{attrs:{row:"",wrap:""}},t._l(t.sensorList,function(t,e){return r("v-flex",{key:e,attrs:{sm4:""}},[r("cardSensor",{attrs:{title:t.name,state:"Down",stateText:"red--text",imgId:t.imgid}})],1)}),1)],1)},a=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",[r("v-img",{staticClass:"white--text",attrs:{height:"200px",src:t.imgpath}},[r("v-container",{attrs:{"fill-height":"",fluid:""}},[r("v-layout",{attrs:{"fill-height":""}},[r("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[r("span",{staticClass:"headline"},[t._v(t._s(t.title))])])],1)],1)],1),r("v-card-title",[r("div",[r("span",{class:t.stateText},[t._v(t._s(t.state))]),r("br"),r("span",{staticClass:"grey--text"},[t._v(t._s(t.desc))]),r("br"),r("span",{staticClass:"grey--text"},[t._v(t._s(t.lastData))])])]),r("v-card-actions",[r("v-btn",{attrs:{flat:"",color:"orange",href:"/"+t.title+"/sensorDetail"}},[t._v("See Details")])],1)],1)},s=[],o=(r("c5f6"),{props:{title:String,state:String,stateText:String,desc:String,lastData:String,imgId:Number,imgpath:String},beforeCreate:function(){var t=this.$options.propsData.imgId,e=r("144a")("./"+t+".jpg");this.$options.propsData.imgpath=e}}),c=o,l=r("2877"),u=r("6544"),d=r.n(u),h=r("8336"),f=r("b0af"),p=r("99d9"),g=r("12b2"),m=r("a523"),v=r("0e8f"),b=r("adda"),S=r("a722"),_=Object(l["a"])(c,n,s,!1,null,null,null),y=_.exports;d()(_,{VBtn:h["a"],VCard:f["a"],VCardActions:p["a"],VCardTitle:g["a"],VContainer:m["a"],VFlex:v["a"],VImg:b["a"],VLayout:S["a"]});var x={data:function(){return{sensorList:null,error:null}},mounted:function(){var t=this;console.log("https://gsoc-renatofernandes-2019be.herokuapp.com/"),this.axios.get("https://gsoc-renatofernandes-2019be.herokuapp.com//getAllSensors").then(function(e){t.sensorList=e.data.result}).catch(function(e){t.error=e})},components:{cardSensor:y}},O=x,j=Object(l["a"])(O,i,a,!1,null,null,null);e["default"]=j.exports;d()(j,{VContainer:m["a"],VFlex:v["a"],VLayout:S["a"]})},"99d9":function(t,e,r){"use strict";var i=r("80d2"),a=r("b0af"),n=r("adda"),s=r("d9bd"),o=n["a"].extend({name:"v-card-media",mounted:function(){Object(s["d"])("v-card-media",this.src?"v-img":"v-responsive",this)}}),c=r("12b2");r.d(e,"a",function(){return l});var l=Object(i["d"])("v-card__actions"),u=Object(i["d"])("v-card__text");a["a"],c["a"]},aa77:function(t,e,r){var i=r("5ca1"),a=r("be13"),n=r("79e5"),s=r("fdef"),o="["+s+"]",c="​",l=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),d=function(t,e,r){var a={},o=n(function(){return!!s[t]()||c[t]()!=c}),l=a[t]=o?e(h):s[t];r&&(a[r]=l),i(i.P+i.F*o,"String",a)},h=d.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=d},adda:function(t,e,r){"use strict";r("253d"),r("4c34");var i=r("23bf"),a=r("58df"),n=Object(a["a"])(i["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),s=n,o=r("d9bd");e["a"]=s.extend({name:"v-img",props:{alt:String,contain:Boolean,src:{type:[String,Object],default:""},gradient:String,lazySrc:String,srcset:String,sizes:String,position:{type:String,default:"center center"},transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0}},computed:{computedAspectRatio:function(){return this.normalisedSrc.aspect},normalisedSrc:function(){return"string"===typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||this.calculatedAspectRatio)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect||this.calculatedAspectRatio)}},__cachedImage:function(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient("+this.gradient+")"),e&&t.push('url("'+e+'")');var r=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[r]):r}},watch:{src:function(){this.isLoading?this.loadImage():this.init()},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(){if(this.normalisedSrc.lazySrc){var t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){Object(o["a"])("Image load failed\n\nsrc: "+this.normalisedSrc.src,this),this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch(function(e){Object(o["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+t.normalisedSrc.src+(e.message?"\nOriginal error: "+e.message:""),t)}).then(t.onLoad):t.onLoad()},e.onerror=this.onError,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,i=function i(){var a=t.naturalHeight,n=t.naturalWidth;a||n?e.calculatedAspectRatio=n/a:null!=r&&setTimeout(i,r)};i()},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{attrs:{name:this.transition}},t):t[0]}}},render:function(t){var e=s.options.render.call(this,t);return e.data.staticClass+=" v-image",e.data.attrs={role:this.alt?"img":void 0,"aria-label":this.alt},e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,e.data,e.children)}})},b0af:function(t,e,r){"use strict";r("4c94"),r("d0e7");var i=r("b64a"),a=r("2b0e");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s=a["default"].extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation:function(){return this.elevation},elevationClasses:function(){return this.computedElevation?n({},"elevation-"+this.computedElevation,!0):{}}}}),o=r("23bf"),c=r("6a18"),l=r("58df"),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},d=Object(l["a"])(i["a"],s,o["a"],c["a"]).extend({name:"v-sheet",props:{tag:{type:String,default:"div"},tile:Boolean},computed:{classes:function(){return u({"v-sheet":!0,"v-sheet--tile":this.tile},this.themeClasses,this.elevationClasses)},styles:function(){return this.measurableStyles}},render:function(t){var e={class:this.classes,style:this.styles,on:this.$listeners};return t(this.tag,this.setBackgroundColor(this.color,e),this.$slots.default)}}),h=d,f=r("0d01"),p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t};e["a"]=Object(l["a"])(f["a"],h).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,raised:Boolean},computed:{classes:function(){return p({"v-card":!0,"v-card--flat":this.flat,"v-card--hover":this.hover},h.options.computed.classes.call(this))},styles:function(){var t=p({},h.options.computed.styles.call(this));return this.img&&(t.background='url("'+this.img+'") center center / cover no-repeat'),t}},render:function(t){var e=this.generateRouteLink(this.classes),r=e.tag,i=e.data;return i.style=this.styles,t(r,this.setBackgroundColor(this.color,i),this.$slots.default)}})},c5f6:function(t,e,r){"use strict";var i=r("7726"),a=r("69a8"),n=r("2d95"),s=r("5dbc"),o=r("6a99"),c=r("79e5"),l=r("9093").f,u=r("11e9").f,d=r("86cc").f,h=r("aa77").trim,f="Number",p=i[f],g=p,m=p.prototype,v=n(r("2aeb")(m))==f,b="trim"in String.prototype,S=function(t){var e=o(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():h(e,3);var r,i,a,n=e.charCodeAt(0);if(43===n||45===n){if(r=e.charCodeAt(2),88===r||120===r)return NaN}else if(48===n){switch(e.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+e}for(var s,c=e.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>a)return NaN;return parseInt(c,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof p&&(v?c(function(){m.valueOf.call(r)}):n(r)!=f)?s(new g(S(e)),r,p):S(e)};for(var _,y=r("9e1e")?l(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;y.length>x;x++)a(g,_=y[x])&&!a(p,_)&&d(p,_,u(g,_));p.prototype=m,m.constructor=p,r("2aba")(i,f,p)}},d0e7:function(t,e,r){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-7c82c10e.8d116c72.js.map