/*! For license information please see 63522.5b8bc39c.js.LICENSE.txt */
"use strict";(self.webpackChunkturf_www=self.webpackChunkturf_www||[]).push([[63522],{5149:(t,e,o)=>{o.d(e,{a:()=>i});const r=new Set(["children","localName","ref","style","className"]),s=new WeakMap,n=(t,e,o,r,n)=>{const i=n?.[e];void 0===i?(t[e]=o,null==o&&e in HTMLElement.prototype&&t.removeAttribute(e)):o!==r&&((t,e,o)=>{let r=s.get(t);void 0===r&&s.set(t,r=new Map);let n=r.get(e);void 0!==o?void 0===n?(r.set(e,n={handleEvent:o}),t.addEventListener(e,n)):n.handleEvent=o:void 0!==n&&(r.delete(e),t.removeEventListener(e,n))})(t,i,o)},i=({react:t,tagName:e,elementClass:o,events:s,displayName:i})=>{const l=new Set(Object.keys(s??{})),a=t.forwardRef(((i,a)=>{const u=t.useRef(new Map),d=t.useRef(null),c={},h={};for(const[t,e]of Object.entries(i))r.has(t)?c["className"===t?"class":t]=e:l.has(t)||t in o.prototype?h[t]=e:c[t]=e;return t.useLayoutEffect((()=>{if(null===d.current)return;const t=new Map;for(const e in h)n(d.current,e,i[e],u.current.get(e),s),u.current.delete(e),t.set(e,i[e]);for(const[e,o]of u.current)n(d.current,e,void 0,o,s);u.current=t})),t.useLayoutEffect((()=>{d.current?.removeAttribute("defer-hydration")}),[]),c.suppressHydrationWarning=!0,t.createElement(e,{...c,ref:t.useCallback((t=>{d.current=t,"function"==typeof a?a(t):null!==a&&(a.current=t)}),[a])})}));return a.displayName=i??o.name,a}},36124:(t,e,o)=>{o.d(e,{mN:()=>C,AH:()=>a,W3:()=>A,Ec:()=>w});const r=globalThis,s=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),i=new WeakMap;class l{constructor(t,e,o){if(this._$cssResult$=!0,o!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1]),t[0]);return new l(o,t,n)},u=(t,e)=>{if(s)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const o of e){const e=document.createElement("style"),s=r.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=o.cssText,t.appendChild(e)}},d=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:b,getOwnPropertySymbols:m,getPrototypeOf:f}=Object,g=globalThis,v=g.trustedTypes,y=v?v.emptyScript:"",_=g.reactiveElementPolyfillSupport,$=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},w=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:s}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return r?.call(this)},set(e){const n=r?.call(this);s.call(this,e),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...b(t),...m(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const t=this._$Eu(e,o);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return u(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(void 0!==r&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:A).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=o.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=r,this[r]=s.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??w)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[$("elementProperties")]=new Map,C[$("finalized")]=new Map,_?.({ReactiveElement:C}),(g.reactiveElementVersions??=[]).push("2.0.4")},57061:(t,e,o)=>{o.d(e,{w:()=>s});var r=o(31797);function s(t,e){const o=(0,r.IA)({waitUntilFirstUpdate:!1},e);return(e,r)=>{const{update:s}=e,n=Array.isArray(t)?t:[t];e.update=function(t){n.forEach((e=>{const s=e;if(t.has(s)){const e=t.get(s),n=this[s];e!==n&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[r](e,n))}})),s.call(this,t)}}}},31797:(t,e,o)=>{o.d(e,{Cc:()=>p,IA:()=>c,ko:()=>h});var r=Object.defineProperty,s=Object.defineProperties,n=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,d=(t,e,o)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,c=(t,e)=>{for(var o in e||(e={}))a.call(e,o)&&d(t,o,e[o]);if(l)for(var o of l(e))u.call(e,o)&&d(t,o,e[o]);return t},h=(t,e)=>s(t,i(e)),p=(t,e,o,s)=>{for(var i,l=s>1?void 0:s?n(e,o):e,a=t.length-1;a>=0;a--)(i=t[a])&&(l=(s?i(e,o,l):i(l))||l);return s&&l&&r(e,o,l),l}},35292:(t,e,o)=>{o.d(e,{X:()=>r});var r=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}}},90966:(t,e,o)=>{o.d(e,{f:()=>i});var r=o(31797),s=o(97199),n=o(13103),i=class extends s.WF{constructor(){super(),Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,(0,r.IA)({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const r=customElements.get(t);if(!r)return void customElements.define(t,class extends e{},o);let s=" (unknown version)",n=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in r&&r.version&&(n=" v"+r.version),s&&n&&s===n||console.warn(`Attempted to register <${t}>${s}, but <${t}>${n} has already been registered.`)}};i.version="2.15.0",i.dependencies={},(0,r.Cc)([(0,n.MZ)()],i.prototype,"dir",2),(0,r.Cc)([(0,n.MZ)()],i.prototype,"lang",2)},41101:(t,e,o)=>{o.d(e,{$:()=>r});var r=o(97199).AH`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`},60784:(t,e,o)=>{o.d(e,{A:()=>w});var r=o(97199),s=r.AH`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button[checked]]) {
    z-index: 2;
  }
`,n=r.AH`
  ${s}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,i=o(35292),l=o(57061),a=o(41101),u=o(90966),d=o(31797),c=o(23036),h=o(36752);const p=Symbol.for(""),b=t=>{if(t?.r===p)return t?._$litStatic$},m=new Map,f=t=>(e,...o)=>{const r=o.length;let s,n;const i=[],l=[];let a,u=0,d=!1;for(;u<r;){for(a=e[u];u<r&&void 0!==(n=o[u],s=b(n));)a+=s+e[++u],d=!0;u!==r&&l.push(n),i.push(a),u++}if(u===r&&i.push(e[r]),d){const t=i.join("$$lit$$");void 0===(e=m.get(t))&&(i.raw=i,m.set(t,e=i)),o=l}return t(e,...o)},g=f(h.qy);f(h.JW);var v=o(13103),y=class extends u.f{constructor(){super(...arguments),this.hasSlotController=new i.X(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled)return t.preventDefault(),void t.stopPropagation();this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return g`
      <div part="base" role="presentation">
        <button
          part="${"button"+(this.checked?" button--checked":"")}"
          role="radio"
          aria-checked="${this.checked}"
          class=${(0,c.H)({button:!0,"button--default":!0,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${(t=>t??h.s6)(this.value)}
          tabindex="${this.checked?"0":"-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};y.styles=[a.$,n],(0,d.Cc)([(0,v.P)(".button")],y.prototype,"input",2),(0,d.Cc)([(0,v.P)(".hidden-input")],y.prototype,"hiddenInput",2),(0,d.Cc)([(0,v.wk)()],y.prototype,"hasFocus",2),(0,d.Cc)([(0,v.MZ)({type:Boolean,reflect:!0})],y.prototype,"checked",2),(0,d.Cc)([(0,v.MZ)()],y.prototype,"value",2),(0,d.Cc)([(0,v.MZ)({type:Boolean,reflect:!0})],y.prototype,"disabled",2),(0,d.Cc)([(0,v.MZ)({reflect:!0})],y.prototype,"size",2),(0,d.Cc)([(0,v.MZ)({type:Boolean,reflect:!0})],y.prototype,"pill",2),(0,d.Cc)([(0,l.w)("disabled",{waitUntilFirstUpdate:!0})],y.prototype,"handleDisabledChange",1);var _=o(96540),$=o.t(_,2),A=o(5149);y.define("sl-radio-button");var w=(0,A.a)({tagName:"sl-radio-button",elementClass:y,react:$,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlRadioButton"})},54133:(t,e,o)=>{o.d(e,{A:()=>M});var r=o(97199),s=r.AH`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,n=r.AH`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,i=o(31797),l=new WeakMap,a=new WeakMap,u=new WeakMap,d=new WeakSet,c=new WeakMap,h=class{constructor(t,e){this.handleFormData=t=>{const e=this.options.disabled(this.host),o=this.options.name(this.host),r=this.options.value(this.host),s="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!e&&!s&&"string"==typeof o&&o.length>0&&void 0!==r&&(Array.isArray(r)?r.forEach((e=>{t.formData.append(o,e.toString())})):t.formData.append(o,r.toString()))},this.handleFormSubmit=t=>{var e;const o=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=l.get(this.form))||e.forEach((t=>{this.setUserInteracted(t,!0)}))),!this.form||this.form.noValidate||o||r(this.host)||(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),c.set(this.host,[])},this.handleInteraction=t=>{const e=c.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.checkValidity&&!e.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=(0,i.IA)({form:t=>{const e=t.form;if(e){const o=t.getRootNode().querySelector(`#${e}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),checkValidity:t=>"function"!=typeof t.checkValidity||t.checkValidity(),setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),c.set(this.host,[]),this.options.assumeInteractionOn.forEach((t=>{this.host.addEventListener(t,this.handleInteraction)}))}hostDisconnected(){this.detachForm(),c.delete(this.host),this.options.assumeInteractionOn.forEach((t=>{this.host.removeEventListener(t,this.handleInteraction)}))}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,l.has(this.form)?l.get(this.form).add(this.host):l.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),a.has(this.form)||(a.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),u.has(this.form)||(u.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=l.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),a.has(this.form)&&(this.form.reportValidity=a.get(this.form),a.delete(this.form)),u.has(this.form)&&(this.form.checkValidity=u.get(this.form),u.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?d.add(t):d.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach((t=>{e.hasAttribute(t)&&o.setAttribute(t,e.getAttribute(t))}))),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=Boolean(d.has(e)),r=Boolean(e.required);e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},p=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),b=Object.freeze((0,i.ko)((0,i.IA)({},p),{valid:!1,valueMissing:!0})),m=Object.freeze((0,i.ko)((0,i.IA)({},p),{valid:!1,customError:!0})),f=r.AH`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,g=o(41101),v=o(90966),y=o(13103),_=class extends v.f{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=$(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=$(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=$(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=$(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const o=t.indexOf(e),r=$(e);r&&(r.toggleAttribute("data-sl-button-group__button",!0),r.toggleAttribute("data-sl-button-group__button--first",0===o),r.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio","sl-radio-button"===r.tagName.toLowerCase()))}))}render(){return r.qy`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function $(t){var e;const o="sl-button, sl-radio-button";return null!=(e=t.closest(o))?e:t.querySelector(o)}_.styles=[g.$,f],(0,i.Cc)([(0,y.P)("slot")],_.prototype,"defaultSlot",2),(0,i.Cc)([(0,y.wk)()],_.prototype,"disableRole",2),(0,i.Cc)([(0,y.MZ)()],_.prototype,"label",2);var A=o(35292),w=o(57061),x=o(23036),C=class extends v.f{constructor(){super(...arguments),this.formControlController=new h(this),this.hasSlotController=new A.X(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const t=this.required&&!this.value;return""!==this.customValidityMessage?m:t?b:p}get validationMessage(){const t=this.required&&!this.value;return""!==this.customValidityMessage?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){const e=t.target.closest("sl-radio, sl-radio-button"),o=this.getAllRadios(),r=this.value;e.disabled||(this.value=e.value,o.forEach((t=>t.checked=t===e)),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;const o=this.getAllRadios().filter((t=>!t.disabled)),r=null!=(e=o.find((t=>t.checked)))?e:o[0],s=" "===t.key?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,n=this.value;let i=o.indexOf(r)+s;i<0&&(i=o.length-1),i>o.length-1&&(i=0),this.getAllRadios().forEach((t=>{t.checked=!1,this.hasButtonGroup||(t.tabIndex=-1)})),this.value=o[i].value,o[i].checked=!0,this.hasButtonGroup?o[i].shadowRoot.querySelector("button").focus():(o[i].tabIndex=0,o[i].focus()),this.value!==n&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){const t=this.getAllRadios(),e=t.find((t=>t.checked))||t[0];e&&e.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;const o=this.getAllRadios();if(await Promise.all(o.map((async t=>{await t.updateComplete,t.checked=t.value===this.value,t.size=this.size}))),this.hasButtonGroup=o.some((t=>"sl-radio-button"===t.tagName.toLowerCase())),o.length>0&&!o.some((t=>t.checked)))if(this.hasButtonGroup){const e=null==(t=o[0].shadowRoot)?void 0:t.querySelector("button");e&&(e.tabIndex=0)}else o[0].tabIndex=0;if(this.hasButtonGroup){const t=null==(e=this.shadowRoot)?void 0:e.querySelector("sl-button-group");t&&(t.disableRole=!0)}}syncRadios(){customElements.get("sl-radio")&&customElements.get("sl-radio-button")?this.syncRadioElements():(customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then((()=>this.syncRadios())),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then((()=>this.syncRadios())))}updateCheckedRadio(){this.getAllRadios().forEach((t=>t.checked=t.value===this.value)),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const t=this.required&&!this.value,e=""!==this.customValidityMessage;return!t&&!e||(this.formControlController.emitInvalidEvent(),!1)}getForm(){return this.formControlController.getForm()}reportValidity(){const t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout((()=>this.validationInput.hidden=!0),1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,s=!!this.helpText||!!e,n=r.qy`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return r.qy`
      <fieldset
        part="form-control"
        class=${(0,x.H)({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--radio-group":!0,"form-control--has-label":o,"form-control--has-help-text":s})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?r.qy`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${n}
                </sl-button-group>
              `:n}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};C.styles=[g.$,n,s],C.dependencies={"sl-button-group":_},(0,i.Cc)([(0,y.P)("slot:not([name])")],C.prototype,"defaultSlot",2),(0,i.Cc)([(0,y.P)(".radio-group__validation-input")],C.prototype,"validationInput",2),(0,i.Cc)([(0,y.wk)()],C.prototype,"hasButtonGroup",2),(0,i.Cc)([(0,y.wk)()],C.prototype,"errorMessage",2),(0,i.Cc)([(0,y.wk)()],C.prototype,"defaultValue",2),(0,i.Cc)([(0,y.MZ)()],C.prototype,"label",2),(0,i.Cc)([(0,y.MZ)({attribute:"help-text"})],C.prototype,"helpText",2),(0,i.Cc)([(0,y.MZ)()],C.prototype,"name",2),(0,i.Cc)([(0,y.MZ)({reflect:!0})],C.prototype,"value",2),(0,i.Cc)([(0,y.MZ)({reflect:!0})],C.prototype,"size",2),(0,i.Cc)([(0,y.MZ)({reflect:!0})],C.prototype,"form",2),(0,i.Cc)([(0,y.MZ)({type:Boolean,reflect:!0})],C.prototype,"required",2),(0,i.Cc)([(0,w.w)("size",{waitUntilFirstUpdate:!0})],C.prototype,"handleSizeChange",1),(0,i.Cc)([(0,w.w)("value")],C.prototype,"handleValueChange",1);var k=o(96540),E=o.t(k,2),S=o(5149);C.define("sl-radio-group");var M=(0,S.a)({tagName:"sl-radio-group",elementClass:C,react:E,events:{onSlChange:"sl-change",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlRadioGroup"})},81376:(t,e,o)=>{o.d(e,{j:()=>r});function r(t){t}o(31797)},14945:(t,e,o)=>{o.d(e,{B8d:()=>a.A,Lrk:()=>u.Lr,Qk1:()=>s.A,kJI:()=>n.A,nIv:()=>l.A,ra8:()=>d.A,ucs:()=>i.A,vKl:()=>r.A,wiw:()=>u.wi,zx7:()=>u.zx});o(27082),o(57941),o(50360),o(64335),o(44660),o(90301),o(47109);var r=o(26584),s=(o(102),o(59788),o(58658),o(47969),o(96338),o(33922),o(25903),o(12102),o(17450),o(2343),o(30669),o(29307),o(75917)),n=(o(39654),o(31234)),i=(o(22608),o(69399),o(37028),o(2116),o(18034),o(96221)),l=(o(67604),o(96558),o(37654),o(89481),o(90999),o(20491),o(50802),o(59895),o(18743),o(83811),o(51204),o(40368),o(78640),o(91988),o(46021),o(52282),o(75448),o(86069),o(82861),o(65875),o(6773),o(5266),o(20790),o(46156),o(7743),o(78664),o(7861),o(46977),o(38197),o(74169),o(5486),o(91349)),a=(o(11557),o(17788),o(58649),o(28297),o(64284),o(50347),o(20145),o(27296),o(1958),o(3327),o(64078),o(55263),o(22900),o(40231),o(37601),o(17885),o(52170),o(57784),o(13012)),u=(o(53416),o(75843),o(87836),o(29611),o(66093),o(19117),o(25590),o(38220),o(2811),o(60073),o(67925),o(93279)),d=(o(45046),o(29987),o(50365),o(57468));o(14657),o(95475),o(39721),o(68526),o(33102),o(84071),o(51465),o(83185)},36752:(t,e,o)=>{o.d(e,{JW:()=>C,XX:()=>q,c0:()=>k,qy:()=>x,s6:()=>E});const r=globalThis,s=r.trustedTypes,n=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,i="$lit$",l=`lit$${Math.random().toFixed(9).slice(2)}$`,a="?"+l,u=`<${a}>`,d=document,c=()=>d.createComment(""),h=t=>null===t||"object"!=typeof t&&"function"!=typeof t,p=Array.isArray,b=t=>p(t)||"function"==typeof t?.[Symbol.iterator],m="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,g=/-->/g,v=/>/g,y=RegExp(`>|${m}(?:([^\\s"'>=/]+)(${m}*=${m}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),_=/'/g,$=/"/g,A=/^(?:script|style|textarea|title)$/i,w=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),x=w(1),C=w(2),k=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),S=new WeakMap,M=d.createTreeWalker(d,129);function P(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==n?n.createHTML(e):e}const U=(t,e)=>{const o=t.length-1,r=[];let s,n=2===e?"<svg>":"",a=f;for(let d=0;d<o;d++){const e=t[d];let o,c,h=-1,p=0;for(;p<e.length&&(a.lastIndex=p,c=a.exec(e),null!==c);)p=a.lastIndex,a===f?"!--"===c[1]?a=g:void 0!==c[1]?a=v:void 0!==c[2]?(A.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=y):void 0!==c[3]&&(a=y):a===y?">"===c[0]?(a=s??f,h=-1):void 0===c[1]?h=-2:(h=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?y:'"'===c[3]?$:_):a===$||a===_?a=y:a===g||a===v?a=f:(a=y,s=void 0);const b=a===y&&t[d+1].startsWith("/>")?" ":"";n+=a===f?e+u:h>=0?(r.push(o),e.slice(0,h)+i+e.slice(h)+l+b):e+l+(-2===h?d:b)}return[P(t,n+(t[o]||"<?>")+(2===e?"</svg>":"")),r]};class R{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let n=0,u=0;const d=t.length-1,h=this.parts,[p,b]=U(t,e);if(this.el=R.createElement(p,o),M.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=M.nextNode())&&h.length<d;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(i)){const e=b[u++],o=r.getAttribute(t).split(l),s=/([.?@])?(.*)/.exec(e);h.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?T:"?"===s[1]?I:"@"===s[1]?H:N}),r.removeAttribute(t)}else t.startsWith(l)&&(h.push({type:6,index:n}),r.removeAttribute(t));if(A.test(r.tagName)){const t=r.textContent.split(l),e=t.length-1;if(e>0){r.textContent=s?s.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],c()),M.nextNode(),h.push({type:2,index:++n});r.append(t[e],c())}}}else if(8===r.nodeType)if(r.data===a)h.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(l,t+1));)h.push({type:7,index:n}),t+=l.length-1}n++}}static createElement(t,e){const o=d.createElement("template");return o.innerHTML=t,o}}function O(t,e,o=t,r){if(e===k)return e;let s=void 0!==r?o._$Co?.[r]:o._$Cl;const n=h(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,o,r)),void 0!==r?(o._$Co??=[])[r]=s:o._$Cl=s),void 0!==s&&(e=O(t,s._$AS(t,e.values),s,r)),e}class V{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??d).importNode(e,!0);M.currentNode=r;let s=M.nextNode(),n=0,i=0,l=o[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new z(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new L(s,this,t)),this._$AV.push(e),l=o[++i]}n!==l?.index&&(s=M.nextNode(),n++)}return M.currentNode=d,r}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),h(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==k&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):b(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==E&&h(this._$AH)?this._$AA.nextSibling.data=t:this.T(d.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=R.createElement(P(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new V(r,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=S.get(t.strings);return void 0===e&&S.set(t.strings,e=new R(t)),e}k(t){p(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new z(this.S(c()),this.S(c()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,s){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=E}_$AI(t,e=this,o,r){const s=this.strings;let n=!1;if(void 0===s)t=O(this,t,e,0),n=!h(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{const r=t;let i,l;for(t=s[0],i=0;i<s.length-1;i++)l=O(this,r[o+i],e,i),l===k&&(l=this._$AH[i]),n||=!h(l)||l!==this._$AH[i],l===E?t=E:t!==E&&(t+=(l??"")+s[i+1]),this._$AH[i]=l}n&&!r&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class T extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}}class I extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E)}}class H extends N{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??E)===k)return;const o=this._$AH,r=t===E&&o!==E||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==E&&(o===E||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const D=r.litHtmlPolyfillSupport;D?.(R,z),(r.litHtmlVersions??=[]).push("3.1.3");const q=(t,e,o)=>{const r=o?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=o?.renderBefore??null;r._$litPart$=s=new z(e.insertBefore(c(),t),t,void 0,o??{})}return s._$AI(t),s}},13103:(t,e,o)=>{o.d(e,{MZ:()=>i,P:()=>u,wk:()=>l});var r=o(36124);const s={attribute:!0,type:String,converter:r.W3,reflect:!1,hasChanged:r.Ec},n=(t=s,e,o)=>{const{kind:r,metadata:n}=o;let i=globalThis.litPropertyMetadata.get(n);if(void 0===i&&globalThis.litPropertyMetadata.set(n,i=new Map),i.set(o.name,t),"accessor"===r){const{name:r}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,s,t)},init(e){return void 0!==e&&this.P(r,void 0,t),e}}}if("setter"===r){const{name:r}=o;return function(o){const s=this[r];e.call(this,o),this.requestUpdate(r,s,t)}}throw Error("Unsupported decorator location: "+r)};function i(t){return(e,o)=>"object"==typeof o?n(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function l(t){return i({...t,state:!0,attribute:!1})}const a=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function u(t,e){return(o,r,s)=>{const n=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof r?o:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return a(o,r,{get(){let o=t.call(this);return void 0===o&&(o=n(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return a(o,r,{get(){return n(this)}})}}},23036:(t,e,o)=>{o.d(e,{H:()=>i});var r=o(36752);const s=1;class n{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const i=(l=class extends n{constructor(t){if(super(t),t.type!==s||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const r of this.st)r in e||(o.remove(r),this.st.delete(r));for(const r in e){const t=!!e[r];t===this.st.has(r)||this.nt?.has(r)||(t?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return r.c0}},(...t)=>({_$litDirective$:l,values:t}));var l},97199:(t,e,o)=>{o.d(e,{WF:()=>n,AH:()=>r.AH,qy:()=>s.qy});var r=o(36124),s=o(36752);class n extends r.mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,s.XX)(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return s.c0}}n._$litElement$=!0,n.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:n});const i=globalThis.litElementPolyfillSupport;i?.({LitElement:n});(globalThis.litElementVersions??=[]).push("4.0.5")}}]);