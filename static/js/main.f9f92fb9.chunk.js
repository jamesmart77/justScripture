(this["webpackJsonpbible-app"]=this["webpackJsonpbible-app"]||[]).push([[0],{167:function(e,a){},196:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),s=t(15),c=t.n(s),o=(t(79),t(80),t(20)),l=t(21),i=t(23),u=t(22),p=t(71),h=t(4),m=t(69),d=t.n(m),y=function(e){Object(i.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"mobile-container"},n.a.createElement("h1",null," This is rendered only in Mobile "))}}]),t}(r.Component),E=t(17),f=t.n(E),g=t(25),b=t(3),v=t(6),w=t(36),k=t.n(w),S=t(70),x=t.n(S),R={proxy:!1,headers:{"content-type":"application/json",Authorization:"Token 1db4878bd4ef4915253c027d47fcad03a11a739b"}},I=function(){var e=Object(g.a)(f.a.mark((function e(a){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("https://api.esv.org/v3/passage/html/?q=".concat(a),R);case 2:if(t=e.sent,r=t.data,console.log("Data: ",r),0!==r.passages.length){e.next=7;break}throw new Error("Invalid search. Query: ".concat(a));case 7:return r.passages=x()(r.passages[0]),e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),N=function(){var e=Object(g.a)(f.a.mark((function e(a){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("https://api.esv.org/v3/passage/search/?q=".concat(a,"&page-size=100"),R);case 2:if(t=e.sent,r=t.data,console.log("Data: ",r),0!==r.results.length){e.next=7;break}throw new Error("Invalid search. Query: ".concat(a));case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),C=t(30),j=t(26);var O=function(){var e=function(){return window.location.href="/bibleApp"};return n.a.createElement("div",{onClick:e,onKeyPress:e,className:"title-container",title:"Reset Searches"},n.a.createElement("h2",{className:"text"},"Bible App"))},_=t(73);var T=function(e){var a=e.type,t=e.onSearch,s=Object(r.useState)(""),c=Object(_.a)(s,2),o=c[0],l=c[1];return n.a.createElement("div",{className:"search-container"},n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t(o,a),l("")}},n.a.createElement(b.TextInput,{s:12,value:o,placeholder:a===v.searchTypes.keyword?"Repent":"John 3:1-10",onChange:function(e){return l(e.target.value)}}),n.a.createElement(b.Row,null,n.a.createElement(b.Col,{s:12,className:"btn-wrapper"},n.a.createElement(b.Button,{className:"search-btn",type:"submit",waves:"light"},n.a.createElement(b.Icon,{className:"icon"},"search"),"Search")))))};var B=function(){return n.a.createElement("div",{className:"copyright-container"},n.a.createElement("small",null,"Scripture quotations are from the ESV\xae Bible (The Holy Bible, English Standard Version\xae), copyright \xa9 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. You may not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible."))};var P=function(e){var a=e.content,t=e.reference,r=e.search,s=t.split(":")[0];return n.a.createElement(j.Fade,{right:!0,cascade:!0,duration:500},n.a.createElement("div",{className:"keyword-result-container"},n.a.createElement("h5",{className:"title"},t),n.a.createElement("div",{className:"text"},a),n.a.createElement("div",{role:"button",tabIndex:0,className:"read-chapter",title:"Read ".concat(s),onClick:function(){return r(s,v.searchTypes.passages)},onKeyPress:function(){return r(s,v.searchTypes.passages)}},"Read Chapter")))},A=function(e){Object(i.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(o.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=a.call.apply(a,[this].concat(n))).state={isPassageExpanded:!0,isKeywordExpanded:!1,isLoading:!1,isInitialState:!0,keywordSearchResults:v.keywordSearchResultsInitial,passageSearchResults:v.passageSearchResultsInitial},e.onSearch=function(){var a=Object(g.a)(f.a.mark((function a(t,r){var n,s,c,o;return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(n=e.props.history,s=t.trim().replace(/ /g,"+"),e.setState({isLoading:!0,isInitialState:!1}),a.prev=3,r!==v.searchTypes.keyword){a.next=13;break}return a.next=7,N(s);case 7:return c=a.sent,a.next=10,e.setState({keywordSearchResults:c,passageSearchResults:v.passageSearchResultsInitial});case 10:console.log("state: ",e.state),a.next=18;break;case 13:return a.next=15,I(s);case 15:return o=a.sent,a.next=18,e.setState({passageSearchResults:o,keywordSearchResults:v.keywordSearchResultsInitial});case 18:a.next=24;break;case 20:a.prev=20,a.t0=a.catch(3),console.error("ERROR: ",a.t0),C.b.error("Search failed. Please simplify your search and try again.");case 24:n.push("/bibleApp/".concat(r,"?q=").concat(s)),e.setState({isLoading:!1});case 26:case"end":return a.stop()}}),a,null,[[3,20]])})));return function(e,t){return a.apply(this,arguments)}}(),e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=function(e){var a=e.search,t=e.pathname,r=v.searchTypes.keyword,n=v.searchTypes.passages,s=a.split("q=");if("/bibleApp"!==t&&1!==s.length){var c={type:n,query:s[1]};return t.includes(r)&&(c.type=r),c}}(this.props.location);e&&this.onSearch(e.query,e.type)}},{key:"render",value:function(){var e=this,a=this.state,t=a.isPassageExpanded,r=a.isKeywordExpanded,s=a.isLoading,c=a.passageSearchResults,o=a.keywordSearchResults,l=a.isInitialState;return n.a.createElement("div",{className:"desktop-container"},n.a.createElement(b.Row,{className:"row-wrapper"},n.a.createElement(b.Col,{xl:3,m:4,className:"col-wrapper search-col"},n.a.createElement(j.Fade,{left:!0},n.a.createElement(O,null),n.a.createElement(b.Collapsible,null,n.a.createElement(b.CollapsibleItem,{header:"Passages",expanded:!0,node:"div",onClick:function(){return e.setState({isKeywordExpanded:!1,isPassageExpanded:!t})},icon:t?n.a.createElement(b.Icon,null,"keyboard_arrow_down"):n.a.createElement(b.Icon,null,"keyboard_arrow_right")},n.a.createElement(T,{type:v.searchTypes.passages,onSearch:this.onSearch})),n.a.createElement(b.CollapsibleItem,{header:"Keyword",node:"div",onClick:function(){return e.setState({isKeywordExpanded:!r,isPassageExpanded:!1})},icon:r?n.a.createElement(b.Icon,null,"keyboard_arrow_down"):n.a.createElement(b.Icon,null,"keyboard_arrow_right")},n.a.createElement(T,{type:v.searchTypes.keyword,onSearch:this.onSearch}))))),n.a.createElement(b.Col,{xl:9,m:8,className:"col-wrapper display-col"},s&&!l&&n.a.createElement(b.Preloader,{className:"loading-spinner"}),l&&!s&&n.a.createElement(j.Fade,{top:!0,duration:2e3},n.a.createElement("div",{className:"pre-search-msg"},n.a.createElement("p",null,"Welcome to the Bible App. Search passages, verses, and keywords in the ESV Bible."),n.a.createElement(b.Icon,null,"search"))),!l&&!s&&c!==v.passageSearchResultsInitial&&c.passages&&c.passages.length>0&&n.a.createElement(b.Row,null,n.a.createElement(b.Col,{s:12},n.a.createElement("div",{className:"passage-text"},c.passages)),n.a.createElement(b.Col,{s:12},n.a.createElement(B,null))),!l&&!s&&o!==v.keywordSearchResultsInitial&&o.results&&o.results.length>0&&n.a.createElement(b.Row,null,n.a.createElement(b.Col,{s:12},o.results.map((function(a){return n.a.createElement(P,Object.assign({key:"key-".concat(a.reference),search:e.onSearch},a))}))),n.a.createElement(b.Col,{s:12},n.a.createElement(B,null))))))}}]),t}(r.Component);var q=function(){var e=(new Date).getFullYear();return n.a.createElement("footer",{className:"footer-container"},"\xa9 ",e," ",n.a.createElement("a",{href:"https://jamesmart77.github.io",target:"_blank",rel:"noopener noreferrer"},"James Martineau"))},D=function(e){Object(i.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){var e=this.props.isDesktop;return n.a.createElement(p.a,null,n.a.createElement("div",{className:"app-container"},n.a.createElement("main",null,n.a.createElement(h.c,null,n.a.createElement(h.a,{path:"/bibleApp",render:function(a){return e?n.a.createElement(A,a):n.a.createElement(y,null)}}))),n.a.createElement(q,null),n.a.createElement(C.a,{className:"error-toast-container",autoClose:!1})))}}]),t}(r.Component),K=d()((function(e){return{isDesktop:e.width>=900}}))(D);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,a){a.searchTypes={passages:"passages",keyword:"keyword"},a.keywordSearchResultsInitial={total_results:0,results:[{reference:"",content:""}]},a.passageSearchResultsInitial={passage_meta:[{canonical:"",chapter_start:[],chapter_end:[],prev_verse:0,next_verse:0,prev_chapter:[],next_chapter:[]}],passages:""}},74:function(e,a,t){e.exports=t(196)},79:function(e,a,t){}},[[74,1,2]]]);
//# sourceMappingURL=main.f9f92fb9.chunk.js.map