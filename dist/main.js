!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,s){const i=s(3);legalPlay=(t,e,s,i)=>!(t<0||t>99||!1===e||void 0===s[t]||!0===s[t].shot||i.includes(t)),findFirstShip=(t,e)=>{if(t.length<=0)return!1;for(let s=0;s<t.length;s++)if(e[t[s]].presence&&!e[t[s]].ship.sunk())return t[s];return!1},findAHit=(t,e,s)=>{let i=-1;for(;!legalPlay(i,!0,e,s);){switch(Math.floor(4*Math.random())){case 0:i=t-1;break;case 1:i=t+1;break;case 2:i=t-10;break;case 3:i=t+10}}return console.log(i),i},t.exports=(t,e="default")=>{let s=[];return{name:e,board:i(),turn:t,plays:s,makeMove(t,e){return!!legalPlay(t,this.turn,e.board.state,s)&&(this.turn=!1,e.turn=!0,this.plays.push(t),e.board.receiveAttack(t),!0)},aiPlay(t){if(!1===findFirstShip(this.plays,t.board.state)){let e=Math.floor(100*Math.random());for(;this.plays.includes(e);)e=Math.floor(100*Math.random());return this.makeMove(e,t),e}{let e=findAHit(findFirstShip(this.plays,t.board.state),t.board.state,this.plays);return this.makeMove(e,t),e}}}}},function(t,e,s){const i=s(0),r=s(2);test=i(!1,"test"),r(test.board.state,test.name)},function(t,e){t.exports=(t,e)=>{const s=document.getElementById("container"),i=document.createElement("div");i.id=e,i.classList.add("board");for(let e=0,s=t.length;e<s;e++){let t=document.createElement("div");t.setAttribute("position",e),t.classList.add("cell"),i.appendChild(t)}s.appendChild(i)}},function(t,e,s){const r=s(4);t.exports=()=>{let t=[];for(let e=0;e<100;e++)t.push({presence:!1,shot:!1,ship:{}});let e=[];return{ships:e,state:t,addShip(s,n,a){if(!1===function(t,e,s,r){if("horiz"===s){if(0===t&&e<=9)return!0;if(Math.floor(t/10)!==Math.floor((t+e)/10)||t+e>99)return!1;for(let t=0;t<e;t++)if(!0===r.presence)return!1}if(t+10*e>99)return!1;for(i=0;i<e;i++)if(!0===r[t+10*i].presence)return!1;return!0}(s,n,a,t))return!1;{let i=r(n,a);if(this.state[s+1].ship=Object.assign(this.state[s].ship,i),"horiz"===a){for(let t=0;t<n;t++)this.state[s+t].ship=Object.assign(this.state[s].ship,i),this.state[s+t].presence=!0;e.push(t[s].ship)}else{this.state[s].ship=Object.assign(this.state[s].ship,i),this.state[s].presence=!0,e.push(t[s].ship);for(let t=0;t<n;t++)this.state[s+10*t].presence=!0,this.state[s+10*t].ship=this.state[s].ship}}},receiveAttack(t){if(this.state[t].shot=!0,!0===this.state[t].presence){let e=function t(e,s,i){return"horiz"==i?s-1<0||e[s].ship!==e[s-1].ship?s:t(e,s-1,i):s-10<0||e[s].ship!==e[s-10].ship?s:t(e,s-10,i)}(this.state,t,this.state[t].ship.align);for(let s=0;s<this.ships.length;s++)this.ships[s]===this.state[t].ship&&("horiz"===this.ships[s].align?this.ships[s].hit(t-e):this.ships[s].hit((t-e)/10))}},allSunk(){len=this.ships.length;for(let t=0;t<len;t++)if(!1===this.ships[t].sunk())return!1;return!0}}}},function(t,e){t.exports=(t,e)=>{let s=[];for(let e=0;e<t;e++)s.push(0);return{length:t,health:s,hit(t){this.health[t]=1},sunk(){return!this.health.includes(0)},align:e}}}]);