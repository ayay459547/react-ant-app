"use strict";(self.webpackChunkreact_ant_app=self.webpackChunkreact_ant_app||[]).push([[565],{64056:function(e,a,n){n.r(a),n.d(a,{default:function(){return K}});var r=n(72791),t=n(35529),s=n(39816),i=n(83099),c=n(34093),l=n(78823),d=n.p+"static/media/web1.c4b7675a6bf94696fd24.jpg",o=n.p+"static/media/web2.948d5b75ab2a21f696d6.jpg",u=n.p+"static/media/web3.5bfa2d382f21bafae4b8.jpg",h=n(29439),x=n(82165),v=n(82839),j=n(90466),m=n(12891),g=n(35667),f=n(83672),p=n(62066),b=n(80184),y=[{name:"Page A",uv:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],w=function(){var e=(0,r.useRef)(null),a=(0,r.useState)(700),n=(0,h.Z)(a,2),t=n[0],s=n[1],i=(0,r.useState)(250),c=(0,h.Z)(i,2),l=c[0],d=c[1];return(0,r.useEffect)((function(){var a=new ResizeObserver((function(e){e.forEach((function(e){var a=e.contentRect,n=a.width,r=a.height;s(n),d(r)}))}));return e.current&&a.observe(e.current),function(){a.disconnect()}}),[e]),(0,b.jsx)("div",{ref:e,className:"dashboard-line-container",children:(0,b.jsxs)(x.w,{width:t,height:l,data:y,margin:{top:5,right:30,left:20,bottom:5},children:[(0,b.jsx)(v.q,{strokeDasharray:"3 3"}),(0,b.jsx)(j.K,{dataKey:"name"}),(0,b.jsx)(m.B,{}),(0,b.jsx)(g.u,{}),(0,b.jsx)(f.D,{}),(0,b.jsx)(p.x,{type:"monotone",dataKey:"pv",stroke:"#8884d8"}),(0,b.jsx)(p.x,{type:"monotone",dataKey:"uv",stroke:"#82ca9d"})]})})},Z=n(73909),N=n(21041),P=n(41048),R=["#FF4444","#0099CC","#9933CC","#669900","#FFBB33","#FF4444","#CC0000"],S=[{name:"TS",color:"#000000",value:75.3},{name:"SCSS",color:"#000000",value:16.5},{name:"JS",color:"#000000",value:6.1},{name:"HTML",color:"#000000",value:2},{name:"Shell",color:"#000000",value:.1}],k=function(){var e=(0,r.useRef)(null),a=(0,r.useState)(700),n=(0,h.Z)(a,2),t=n[0],s=n[1],i=(0,r.useState)(250),c=(0,h.Z)(i,2),l=c[0],d=c[1],o=Math.PI/180;return(0,r.useEffect)((function(){var a=new ResizeObserver((function(e){e.forEach((function(e){var a=e.contentRect,n=a.width,r=a.height;s(n),d(r)}))}));return e.current&&a.observe(e.current),function(){a.disconnect()}}),[e]),(0,b.jsx)("div",{ref:e,className:"dashboard-line-container",children:(0,b.jsx)(Z.u,{width:t,height:l,children:(0,b.jsx)(N.b,{data:S,cx:"50%",cy:"50%",dataKey:"value",innerRadius:0,outerRadius:100,paddingAngle:5,labelLine:!1,label:function(e){var a=e.cx,n=e.cy,r=e.midAngle,t=e.innerRadius,s=e.outerRadius,i=e.payload,c=t+1.1*(s-t),l=a+c*Math.cos(-r*o),d=n+c*Math.sin(-r*o),u=i.color,h=i.name,x=i.value;return(0,b.jsx)("text",{x:l,y:d,fill:u,textAnchor:l>a?"start":"end",dominantBaseline:"central",children:"".concat(h,"-").concat(x,"%")})},children:S.map((function(e,a){return(0,b.jsx)(P.b,{fill:R[a]},"cell-".concat(a))}))})})})},C=n(38725),F=n(57702),_=[{name:"Page A",uv:4e3,pv:2400},{name:"Page B",uv:3e3,pv:1398},{name:"Page C",uv:2e3,pv:9800},{name:"Page D",uv:2780,pv:3908},{name:"Page E",uv:1890,pv:4800},{name:"Page F",uv:2390,pv:3800},{name:"Page G",uv:3490,pv:4300}],E=function(){var e=(0,r.useRef)(null),a=(0,r.useState)(700),n=(0,h.Z)(a,2),t=n[0],s=n[1],i=(0,r.useState)(250),c=(0,h.Z)(i,2),l=c[0],d=c[1];return(0,r.useEffect)((function(){var a=new ResizeObserver((function(e){e.forEach((function(e){var a=e.contentRect,n=a.width,r=a.height;s(n),d(r)}))}));return e.current&&a.observe(e.current),function(){a.disconnect()}}),[e]),(0,b.jsx)("div",{ref:e,className:"dashboard-line-container",children:(0,b.jsxs)(C.v,{width:t,height:l,data:_,children:[(0,b.jsx)(v.q,{strokeDasharray:"3 3"}),(0,b.jsx)(j.K,{dataKey:"name"}),(0,b.jsx)(m.B,{}),(0,b.jsx)(g.u,{}),(0,b.jsx)(f.D,{}),(0,b.jsx)(F.$,{dataKey:"pv",fill:"#8884d8"}),(0,b.jsx)(F.$,{dataKey:"uv",fill:"#82ca9d"})]})})},K=function(){return(0,b.jsxs)("div",{className:"dashboard-container grid-row",children:[(0,b.jsx)("div",{className:"grid-col-lg-12 grid-col-xs-24",children:(0,b.jsx)(t.Z,{title:"\u7df4\u7fd2\u4f5c\u54c1",children:(0,b.jsx)(s.Z,{className:"dashboard-timeline",items:[{children:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{children:"2022/09 ~ 2022/10"}),(0,b.jsx)("a",{href:"https://ayay459547.github.io/vue3_ts/",target:"_blank",rel:"noreferrer",children:(0,b.jsxs)(i.Z,{children:[(0,b.jsx)(l.Z,{}),(0,b.jsx)("span",{children:"Vue3 + TypeScript + ElementUI"})]})})]})},{children:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{children:"2022/10 ~ 2022/11"}),(0,b.jsx)("a",{href:"https://ayay459547.github.io/nuxt_hotal/",target:"_blank",rel:"noreferrer",children:(0,b.jsxs)(i.Z,{children:[(0,b.jsx)(l.Z,{}),(0,b.jsx)("span",{children:"Vue3 + Nuxt"})]})})]})},{children:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{children:"2021/05 ~ 2021/05"}),(0,b.jsx)("a",{href:"https://ayay459547.github.io/university_project/",target:"_blank",rel:"noreferrer",children:(0,b.jsxs)(i.Z,{children:[(0,b.jsx)(l.Z,{}),(0,b.jsx)("span",{children:"Vue2 + Vuex"})]})})]})}]})})}),(0,b.jsx)("div",{className:"grid-col-lg-12 grid-col-xs-24",children:(0,b.jsx)(t.Z,{title:"\u4f5c\u54c1\u5716",children:(0,b.jsxs)(c.Z,{autoplay:!0,className:"dashboard-carousel-list",children:[(0,b.jsx)("div",{className:"dashboard-carousel-item",children:(0,b.jsx)("img",{src:d,alt:"web1"})}),(0,b.jsx)("div",{className:"dashboard-carousel-item",children:(0,b.jsx)("img",{src:o,alt:"web2"})}),(0,b.jsx)("div",{className:"dashboard-carousel-item",children:(0,b.jsx)("img",{src:u,alt:"web3"})})]})})}),(0,b.jsx)("div",{className:"grid-col-xl-8 grid-col-lg-12 grid-col-xs-24",children:(0,b.jsx)(t.Z,{title:"\u6b64\u5c08\u6848\u8a9e\u8a00\u4f7f\u7528\u6bd4\u4f8b",children:(0,b.jsx)(k,{})})}),(0,b.jsx)("div",{className:"grid-col-xl-8 grid-col-lg-12 grid-col-xs-24",children:(0,b.jsx)(t.Z,{title:"\u6e2c\u8a66\u5716\u8868(\u6298\u7dda\u5716)",children:(0,b.jsx)(w,{})})}),(0,b.jsx)("div",{className:"grid-col-xl-8 grid-col-lg-24 grid-col-xs-24",children:(0,b.jsx)(t.Z,{title:"\u6e2c\u8a66\u5716\u8868(\u67f1\u72c0\u5716)",children:(0,b.jsx)(E,{})})})]})}}}]);
//# sourceMappingURL=565.dee5e7dc.chunk.js.map