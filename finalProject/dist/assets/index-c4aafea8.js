import"https://cdn.jsdelivr.net/npm/colord@2.9.3/+esm";(function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))P(D);new MutationObserver(D=>{for(const E of D)if(E.type==="childList")for(const B of E.addedNodes)B.tagName==="LINK"&&B.rel==="modulepreload"&&P(B)}).observe(document,{childList:!0,subtree:!0});function I(D){const E={};return D.integrity&&(E.integrity=D.integrity),D.referrerPolicy&&(E.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?E.credentials="include":D.crossOrigin==="anonymous"?E.credentials="omit":E.credentials="same-origin",E}function P(D){if(D.ep)return;D.ep=!0;const E=I(D);fetch(D.href,E)}})();const style="";var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(C){return typeof C=="string"?C.length>0:typeof C=="number"},n=function(C,A,I){return A===void 0&&(A=0),I===void 0&&(I=Math.pow(10,A)),Math.round(I*C)/I+0},e=function(C,A,I){return A===void 0&&(A=0),I===void 0&&(I=1),C>I?I:C>A?C:A},u=function(C){return(C=isFinite(C)?C%360:0)>0?C:C+360},a=function(C){return{r:e(C.r,0,255),g:e(C.g,0,255),b:e(C.b,0,255),a:e(C.a)}},o=function(C){return{r:n(C.r),g:n(C.g),b:n(C.b),a:n(C.a,3)}},i$1=/^#([0-9a-f]{3,8})$/i,s=function(C){var A=C.toString(16);return A.length<2?"0"+A:A},h=function(C){var A=C.r,I=C.g,P=C.b,D=C.a,E=Math.max(A,I,P),B=E-Math.min(A,I,P),L=B?E===A?(I-P)/B:E===I?2+(P-A)/B:4+(A-I)/B:0;return{h:60*(L<0?L+6:L),s:E?B/E*100:0,v:E/255*100,a:D}},b=function(C){var A=C.h,I=C.s,P=C.v,D=C.a;A=A/360*6,I/=100,P/=100;var E=Math.floor(A),B=P*(1-I),L=P*(1-(A-E)*I),R=P*(1-(1-A+E)*I),V=E%6;return{r:255*[P,L,B,B,R,P][V],g:255*[R,P,P,L,B,B][V],b:255*[B,B,R,P,P,L][V],a:D}},g=function(C){return{h:u(C.h),s:e(C.s,0,100),l:e(C.l,0,100),a:e(C.a)}},d=function(C){return{h:n(C.h),s:n(C.s),l:n(C.l),a:n(C.a,3)}},f=function(C){return b((I=(A=C).s,{h:A.h,s:(I*=((P=A.l)<50?P:100-P)/100)>0?2*I/(P+I)*100:0,v:P+I,a:A.a}));var A,I,P},c=function(C){return{h:(A=h(C)).h,s:(D=(200-(I=A.s))*(P=A.v)/100)>0&&D<200?I*P/100/(D<=100?D:200-D)*100:0,l:D/2,a:A.a};var A,I,P,D},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(C){var A=i$1.exec(C);return A?(C=A[1]).length<=4?{r:parseInt(C[0]+C[0],16),g:parseInt(C[1]+C[1],16),b:parseInt(C[2]+C[2],16),a:C.length===4?n(parseInt(C[3]+C[3],16)/255,2):1}:C.length===6||C.length===8?{r:parseInt(C.substr(0,2),16),g:parseInt(C.substr(2,2),16),b:parseInt(C.substr(4,2),16),a:C.length===8?n(parseInt(C.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(C){var A=v.exec(C)||m.exec(C);return A?A[2]!==A[4]||A[4]!==A[6]?null:a({r:Number(A[1])/(A[2]?100/255:1),g:Number(A[3])/(A[4]?100/255:1),b:Number(A[5])/(A[6]?100/255:1),a:A[7]===void 0?1:Number(A[7])/(A[8]?100:1)}):null},"rgb"],[function(C){var A=l.exec(C)||p.exec(C);if(!A)return null;var I,P,D=g({h:(I=A[1],P=A[2],P===void 0&&(P="deg"),Number(I)*(r[P]||1)),s:Number(A[3]),l:Number(A[4]),a:A[5]===void 0?1:Number(A[5])/(A[6]?100:1)});return f(D)},"hsl"]],object:[[function(C){var A=C.r,I=C.g,P=C.b,D=C.a,E=D===void 0?1:D;return t(A)&&t(I)&&t(P)?a({r:Number(A),g:Number(I),b:Number(P),a:Number(E)}):null},"rgb"],[function(C){var A=C.h,I=C.s,P=C.l,D=C.a,E=D===void 0?1:D;if(!t(A)||!t(I)||!t(P))return null;var B=g({h:Number(A),s:Number(I),l:Number(P),a:Number(E)});return f(B)},"hsl"],[function(C){var A=C.h,I=C.s,P=C.v,D=C.a,E=D===void 0?1:D;if(!t(A)||!t(I)||!t(P))return null;var B=function(L){return{h:u(L.h),s:e(L.s,0,100),v:e(L.v,0,100),a:e(L.a)}}({h:Number(A),s:Number(I),v:Number(P),a:Number(E)});return b(B)},"hsv"]]},N=function(C,A){for(var I=0;I<A.length;I++){var P=A[I][0](C);if(P)return[P,A[I][1]]}return[null,void 0]},x=function(C){return typeof C=="string"?N(C.trim(),y.string):typeof C=="object"&&C!==null?N(C,y.object):[null,void 0]},M=function(C,A){var I=c(C);return{h:I.h,s:e(I.s+100*A,0,100),l:I.l,a:I.a}},H=function(C){return(299*C.r+587*C.g+114*C.b)/1e3/255},$=function(C,A){var I=c(C);return{h:I.h,s:I.s,l:e(I.l+100*A,0,100),a:I.a}},j=function(){function C(A){this.parsed=x(A)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return C.prototype.isValid=function(){return this.parsed!==null},C.prototype.brightness=function(){return n(H(this.rgba),2)},C.prototype.isDark=function(){return H(this.rgba)<.5},C.prototype.isLight=function(){return H(this.rgba)>=.5},C.prototype.toHex=function(){return A=o(this.rgba),I=A.r,P=A.g,D=A.b,B=(E=A.a)<1?s(n(255*E)):"","#"+s(I)+s(P)+s(D)+B;var A,I,P,D,E,B},C.prototype.toRgb=function(){return o(this.rgba)},C.prototype.toRgbString=function(){return A=o(this.rgba),I=A.r,P=A.g,D=A.b,(E=A.a)<1?"rgba("+I+", "+P+", "+D+", "+E+")":"rgb("+I+", "+P+", "+D+")";var A,I,P,D,E},C.prototype.toHsl=function(){return d(c(this.rgba))},C.prototype.toHslString=function(){return A=d(c(this.rgba)),I=A.h,P=A.s,D=A.l,(E=A.a)<1?"hsla("+I+", "+P+"%, "+D+"%, "+E+")":"hsl("+I+", "+P+"%, "+D+"%)";var A,I,P,D,E},C.prototype.toHsv=function(){return A=h(this.rgba),{h:n(A.h),s:n(A.s),v:n(A.v),a:n(A.a,3)};var A},C.prototype.invert=function(){return w({r:255-(A=this.rgba).r,g:255-A.g,b:255-A.b,a:A.a});var A},C.prototype.saturate=function(A){return A===void 0&&(A=.1),w(M(this.rgba,A))},C.prototype.desaturate=function(A){return A===void 0&&(A=.1),w(M(this.rgba,-A))},C.prototype.grayscale=function(){return w(M(this.rgba,-1))},C.prototype.lighten=function(A){return A===void 0&&(A=.1),w($(this.rgba,A))},C.prototype.darken=function(A){return A===void 0&&(A=.1),w($(this.rgba,-A))},C.prototype.rotate=function(A){return A===void 0&&(A=15),this.hue(this.hue()+A)},C.prototype.alpha=function(A){return typeof A=="number"?w({r:(I=this.rgba).r,g:I.g,b:I.b,a:A}):n(this.rgba.a,3);var I},C.prototype.hue=function(A){var I=c(this.rgba);return typeof A=="number"?w({h:A,s:I.s,l:I.l,a:I.a}):n(I.h)},C.prototype.isEqual=function(A){return this.toHex()===w(A).toHex()},C}(),w=function(C){return C instanceof j?C:new j(C)},S=[],k=function(C){C.forEach(function(A){S.indexOf(A)<0&&(A(j,y),S.push(A))})};function namesPlugin(C,A){var I={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},P={};for(var D in I)P[I[D]]=D;var E={};C.prototype.toName=function(B){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var L,R,V=P[this.toHex()];if(V)return V;if(B!=null&&B.closest){var T=this.toRgb(),z=1/0,O="black";if(!E.length)for(var F in I)E[F]=new C(I[F]).toRgb();for(var q in I){var W=(L=T,R=E[q],Math.pow(L.r-R.r,2)+Math.pow(L.g-R.g,2)+Math.pow(L.b-R.b,2));W<z&&(z=W,O=q)}return O}},A.string.push([function(B){var L=B.toLowerCase(),R=L==="transparent"?"#0000":I[L];return R?new C(R).toRgb():null},"name"])}w().plugin(namesPlugin);k([namesPlugin]);let primaryColour="#f0ead6",secondaryColour="#FFF",tickTextColour="#d1d1d1",i,cleanedData,indexedData=[],bucketedData=[];async function loadData(){try{const C=await d3.json("data/data.json");cleanedData=analyseData(C)}catch(C){console.error("Error loading the JSON data:",C)}}function analyseData(C){if(!Array.isArray(C))return console.error("Expected an array but received:",C),[];const A=[];return C.forEach(function(I){var E,B,L;let P={title:I.title?I.title:"NA",date:I.date?I.date:"NA",thumbnail:((B=(E=I.thumbnail)==null?void 0:E[0])==null?void 0:B.thumbnail)||"NA",link:I.link||"NA",printer:"NA",depicts:"NA",description:"NA",medium:"NA",dimensions:"NA",place:((L=I.place)==null?void 0:L.toString())||"NA",collection:"NA",topics:I.topic||"NA",color:primaryColour};if(I.printer)for(let R=0;R<I.printer.length;R++)I.printer[R].label==="Depicts"&&(P.depicts=P.depicts==="NA"?I.printer[R].content:P.depicts+"; "+I.printer[R].content),I.printer[R].label==="Printer"&&(P.printer=P.printer==="NA"?I.printer[R].content:P.printer+"; "+I.printer[R].content);if(I.description)for(let R=0;R<I.description.length;R++)P.description=P.description==="NA"?I.description[R].content:P.description+"; "+I.description[R].content;if(I.collection)for(let R=0;R<I.collection.length;R++)P.collection=P.collection==="NA"?I.collection[R].content:P.collection+"; "+I.collection[R].content;if(I.mediumDimensions)for(let R=0;R<I.mediumDimensions.length;R++){I.mediumDimensions[R].label==="Medium"&&(P.medium=P.medium==="NA"?I.mediumDimensions[R].content:P.medium+"; "+I.mediumDimensions[R].content),I.mediumDimensions[R].label==="Dimensions"&&(P.dimensions=P.dimensions==="NA"?I.mediumDimensions[R].content:P.dimensions+"; "+I.mediumDimensions[R].content);const V=I.mediumDimensions[0].content.match(/ink\s*\((.*?)\)/i);V&&V[1]&&(P.color=V[1].toLowerCase())}const D=/(\$?\d+(\.\d+)?[c\$]?)/;if(D.test(P.title)){const R=P.title.match(D)[0];if(R.includes("$")){const V=parseFloat(R.replace(/[^\d.-]/g,"")),T=Math.round(V*100);P.orgPrice=T+"c"}else P.orgPrice=R}else if(P.title.includes("cent")){const R=P.title.match(/\d+/);P.orgPrice=R?R[0]+"c":"NA"}else P.orgPrice="NA";if(P.title.includes("plate"))P.ssp="proof plate";else if(P.title.includes("single"))P.ssp=1;else if(P.title.includes("sheet")||P.title.includes("block")||P.title.includes("strip")){const R=P.title.match(/\d+/);if(R){const V=parseInt(R[0]);P.title.includes("strip of")||P.title.includes("block of")||P.title.includes("sheet of")?P.ssp=V:P.ssp="NA"}else P.ssp="NA"}else P.ssp="NA";P.selected=!1,A.push(P)}),A}async function runCode(){for(await loadData(),i=0;i<cleanedData.length;i++)indexedData[i]=createStampIndex(cleanedData[i]),bucketedData[i]=classifyStampByBucket(indexedData[i]),bucketedData[i].color&&(bucketedData[i].color=normalizeColor(bucketedData[i].color));createRadarChart(bucketedData[2].allIndices,"#radarChartIntro"),createRadarChart(bucketedData[2].allIndices,"#radarChart"),createBucketChart(bucketedData),createParallelChart(bucketedData),showImages(bucketedData)}runCode();function createStampIndex(C){var W,G;let A=0,I=0;if(C.description){const U=C.description.toLowerCase();U.includes("mint")?I=50:U.includes("unused")&&(I=25),(U.includes("lightly used")||U.includes("slightly worn"))&&(I=5),U.includes("fancy cancel")&&(I=Math.max(I,10)),(U.includes("proof")||U.includes("reprint"))&&(I=Math.min(I,20)),(U.includes("perf 12")||U.includes("perforation"))&&(I+=5),U.includes("card plate proof")&&(I+=5),I=Math.min(I,50)}A+=I;let P=0;C.ssp==="proof plate"||C.title.includes("rare")||C.description.includes("plate proof")?P=25:C.title.includes("misprint")||C.description.includes("limited edition")||C.title.includes("unique")||C.title.includes("error")||C.title.includes("first issue")?P=20:C.title.includes("commemorative")||C.description.includes("special release")?P=15:C.description.includes("first edition")||C.description.includes("reprint")?P=10:(C.description.includes("common")||C.title.includes("standard"))&&(P=5),A+=P;let D=0;C.medium&&(C.medium.includes("engraving")||C.medium.includes("plate printing")?D=5:C.medium.includes("lithography")||C.medium.includes("intaglio")?D=3:C.medium.includes("woodcut")||C.medium.includes("screen")?D=2:(C.medium.includes("offset")||C.medium.includes("digital"))&&(D=1)),A+=D;let E=0;if(C.topics)for(let U of C.topics)if(U.match(/(Civil War|World War|Revolution|Historic Event|Colonial|Empire|Independence|Liberation|Rebellion|Suffrage|Equality|Socialism|Communism|Holocaust|Genocide|Economic Crisis|Great Depression|Renaissance|Enlightenment|Art Movement|Labor Movement|Globalization|Exploration)/i)){E=20;break}else U.match(/(Spanish Inquisition|French Revolution|Industrial Revolution|Neolithic Revolution|Scientific Revolution|Abolitionism|Feminism|Civil Rights Movement|Environmentalism|Urbanization|Monarchy|Feudalism|Balkanization|Enclosure Movement|Imperialism|Great Migration|Black Plague|Treaty of Versailles|Vietnam War|Prohibition|Civil Rights Act|Suffragette|Social Reform|The New Deal|Post-War Reconstruction|Colonial Resistance|Age of Exploration|Transatlantic Slave Trade|Reformation|Age of Enlightenment|Manifest Destiny|Trail of Tears|American Revolution|Constitutional Convention|Women's Suffrage|Civil Rights Act|Labor Unions|Great Society|Space Race|The New Deal|Watergate|Freedom of Speech|Cold War Espionage)/i)?E=10:U.match(/(Pax Romana|Cold War|Terrorism|Financial Crisis|Gilded Age|Soviet Union|Fascism|Apartheid|Decolonization|Cuban Missile Crisis|Nuclear Arms Race|Arab Spring|Brexit|Climate Change|Information Revolution|Digital Age|Postmodernism)/i)&&(E=5);A+=E;let B=0;if(C.title||C.depicts){const U=[{name:"Lincoln",score:10},{name:"Washington",score:10},{name:"Roosevelt",score:9},{name:"Mandela",score:10},{name:"Gandhi",score:9},{name:"Churchill",score:8},{name:"Obama",score:7},{name:"Kennedy",score:8},{name:"Queen",score:7},{name:"Queen Elizabeth II",score:7},{name:"Napoleon",score:8},{name:"the Great",score:7},{name:"Caesar",score:8},{name:"Einstein",score:10},{name:"Curie",score:10},{name:"Newton",score:10},{name:"Tesla",score:9},{name:"Edison",score:8},{name:"Galilei",score:10},{name:"Vinci",score:10},{name:"Darwin",score:8},{name:"Hawking",score:8},{name:"Turing",score:9},{name:"Goodall",score:7},{name:"Mendel",score:7},{name:"Sagan",score:7},{name:"Carson",score:8},{name:"Shakespeare",score:10},{name:"wain",score:8},{name:"Dickens",score:8},{name:"Homer",score:9},{name:"Dickinson",score:7},{name:"Angelou",score:7},{name:"Gogh",score:9},{name:"Picasso",score:9},{name:"Michelangelo",score:10},{name:"Monet",score:8},{name:"Beethoven",score:9},{name:"Mozart",score:9},{name:"Kahlo",score:8},{name:" Bach",score:9},{name:"Tubman",score:9},{name:"Rosa Parks",score:9},{name:"Frederick Douglass",score:9},{name:"Martin Luther King Jr.",score:10},{name:"Susan B. Anthony",score:8},{name:"Malcolm X",score:8},{name:"Ida B. Wells",score:8},{name:"Sojourner Truth",score:8},{name:"Eleanor Roosevelt",score:8},{name:"Amelia Earhart",score:8},{name:"Neil Armstrong",score:9},{name:"Buzz Aldrin",score:8},{name:"Christopher Columbus",score:8},{name:"Marco Polo",score:7},{name:"Ferdinand Magellan",score:8},{name:"Robert Falcon Scott",score:7},{name:"Charles Lindbergh",score:8},{name:"Sally Ride",score:8},{name:"Jobs",score:7},{name:"Gates",score:7},{name:"Oprah Winfrey",score:7},{name:"Mark Zuckerberg",score:3},{name:"Elon Musk",score:8},{name:"Jeff Bezos",score:6},{name:"Malala Yousafzai",score:8},{name:"Greta Thunberg",score:6},{name:"Serena Williams",score:5},{name:"LeBron",score:5}],X=((W=C.title)==null?void 0:W.toLowerCase())||"",Y=((G=C.depicts)==null?void 0:G.toLowerCase())||"";U.forEach(Z=>{const J=Z.name.toLowerCase();(X.includes(J)||Y.includes(J))&&(B=Math.max(B,Z.score))})}A+=Math.min(B,10);let L=0;const R=parseFloat(C.orgPrice.replace(/[^\d.-]/g,""));R>=50||R>=1&&C.orgPrice.includes("$")?L=10:R>=10?L=5:L=Math.round(R/10*2),A+=L;let V=0;const T=parseInt(C.date[0].substring(0,4));T<=1800?V=30:T<1900?V=20:T<1950&&(V=10),A+=V;let z=0;C.collection&&C.collection.includes("Scott Catalogue")&&(z+=.5,C.collection.match(/USA \d+/)&&(z+=3),C.collection.includes("USA PR")&&(z+=3.5),C.collection.includes("USA O")&&(z+=4),C.collection.includes("USA J")&&(z+=3.5),C.collection.match(/Scott Catalogue USA (\d{1,3}[A-Z0-9]*)/)&&(z+=3),C.collection.includes("Inverted Jenny")&&(z+=5),C.collection.includes("imperforate")&&(z+=4),C.collection.includes("error")&&(z+=5),C.collection.includes("Airmail")&&(z+=4.5),C.collection.includes("classic")&&(z+=3),C.collection.includes("Scott Catalogue USA 11")&&(z+=5),C.collection.includes("Scott Catalogue USA 143L3")&&(z+=4),C.collection.includes("Scott Catalogue USA 44TC")&&(z+=4),C.collection.includes("Scott Catalogue CSA 6")&&(z+=6),C.collection.includes("Scott Catalogue CSA 7")&&(z+=6.5),C.collection.includes("Scott Catalogue USA 246")&&(z+=4.5),C.collection.includes("Back-of-Book")&&(z+=3.5),C.collection.includes("Revenue")&&(z+=4.5),C.collection.includes("Postal Tax")&&(z+=4),C.collection.includes("Postage Due")&&(z+=3.5),C.collection.includes("Special Printing")&&(z+=4),C.collection.includes("Reprint")&&(z+=3)),A+=z;const O=new Set(["National Bank Note Company","American Bank Note Company","Bureau of Engraving and Printing","Wells Fargo & Co.","Post Office Department","Security Engraving and Printing","Postal Press of New York","U.S. Treasury"]);let F=0;if(C.printer!=="NA"){if(O.has(C.printer))switch(C.printer){case"National Bank Note Company":case"American Bank Note Company":F+=1;break;case"Bureau of Engraving and Printing":case"Wells Fargo & Co.":F+=2;break;case"Security Engraving and Printing":F+=2.5;break;case"Postal Press of New York":F+=2;break;case"U.S. Treasury":F+=3;break;case"Post Office Department":F+=.5;break;case"National Bank Note Company":F+=2;break;case"American Bank Note Company":F+=1.5;break;case"Bureau of Engraving and Printing":F+=1.2;break;case"Wells Fargo & Co.":F+=1;break;case"Post Office Department":F+=.8;break;case"Security Engraving and Printing":F+=.6;break;case"Postal Press of New York":F+=.4;break;case"U.S. Treasury":F+=.2;break}C.medium&&C.medium.includes("engraving")&&(F+=1),C.ssp&&C.ssp==="proof plate"&&(F+=1.5),C.description&&(C.description.includes("plate mark")||C.description.includes("watermark"))&&(F+=1.2)}A+=F,C.index=A;const q={Condition:I,Rarity:P,PrintingTechniques:D,HistoricalEvent:E,FamousFigures:B,Denomination:L,Date:V,Collection:z,Printer:F,FinalIndex:A};return C.allIndices=q,C}function classifyStampByBucket(C){return C.index>=70?C.bucket="Very High Value":C.index>=50?C.bucket="High Value":C.index>=20?C.bucket="Moderate Value":C.bucket="Low Value",C}function aggregateAndNormalize(C){const A={};for(i=0;i<C.length;i++){const I=C[i];Object.entries(I.allIndices).forEach(([P,D])=>{A[P]=(A[P]||0)+D})}for(i=0;i<C.length;i++);return Object.entries(A).forEach(I=>{A[I[0]]=I[1]/C.length}),A}function handleLineClick(C){if(!C){console.error("Data is undefined. Ensure that the click event is passing the correct data.");return}C.selected=!C.selected;const A=cleanedData.filter(I=>I.selected);if(console.log("Selected Stamps:",A),d3.selectAll(".clickable-line").style("stroke-width",I=>I.selected?5:1).style("stroke",I=>I.color?I.color:"black").style("pointer-events","auto"),A.length>0){const I=aggregateAndNormalize(A);createRadarChart(I,"#radarChart")}else console.log("No stamps selected."),createRadarChart([],"#radarChart")}function createRadarChart(data,location){if(d3.select(location).html(""),data){var margin={top:100,right:100,bottom:100,left:100},width=400;let height=400,radarColour;location=="#radarChartIntro"?radarColour="#fff":radarColour="#000";const svg=d3.select(location).append("svg").attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom).append("g").attr("transform","translate("+margin.left+","+margin.top+")"),radarData=Object.entries(data).map(([key,value])=>{if(key==="FinalIndex")return null;const maxKey=`max${key}`,max=eval(maxKey);return{axis:key,value:value/(max||1),maxValue:max}}).filter(C=>C!==null);radarData.sort(C=>C.value);const radius=Math.min(width,height)/2,angleSlice=Math.PI*2/radarData.length,rScale=d3.scaleLinear().domain([0,1]).range([0,radius]),line=d3.lineRadial().radius(C=>rScale(C.value)).angle((C,A)=>A*angleSlice),radarChart=svg.append("g").attr("transform",`translate(${width/2}, ${height/2})`);radarChart.selectAll(".radarPolygon").data([radarData]).enter().append("path").attr("class","radarPolygon").attr("d",C=>{const A=line(C);return A?A+"Z":null}).style("fill",radarColour).style("fill-opacity",.1).style("stroke",radarColour).style("stroke-opacity",1).style("stroke-width","4px");const axis=radarChart.selectAll(".radarAxis").data(radarData).enter().append("g").attr("class","radarAxis");axis.append("line").attr("x1",0).attr("y1",0).attr("x2",(C,A)=>rScale(1)*Math.cos(A*angleSlice-Math.PI/2)).attr("y2",(C,A)=>rScale(1)*Math.sin(A*angleSlice-Math.PI/2)).attr("class","radarLine").style("stroke",radarColour).style("stroke-width","0.2px").style("stroke-opacity","0.8"),axis.append("circle").attr("cx",(C,A)=>rScale(C.value)*Math.cos(A*angleSlice-Math.PI/2)).attr("cy",(C,A)=>rScale(C.value)*Math.sin(A*angleSlice-Math.PI/2)).attr("r",4).style("fill",radarColour).style("stroke",radarColour),axis.append("text").attr("class","radarLabel").attr("x",(C,A)=>rScale(1.15)*Math.cos(A*angleSlice-Math.PI/2)).attr("y",(C,A)=>rScale(1.15)*Math.sin(A*angleSlice-Math.PI/2)).text(C=>C.axis.replace(/([A-Z])/g," $1")).style("text-anchor","middle").style("fill",radarColour).style("font-size","18px").style("font-weight","bold").style("font-family","meursault-variable, serif").style("font-size","18px").style("font-weight","400")}}function createBucketChart(C){var A={top:20,right:30,bottom:30,left:60},I=1e3-A.left-A.right,P=750-A.top-A.bottom;const D=d3.select("#barChart").append("svg").attr("width",I+A.left+A.right).attr("height",P+A.top*2+A.bottom).append("g").attr("transform","translate("+A.left+","+A.top+")");var E=d3.scaleBand().domain(["Low Value","Moderate Value","High Value","Very High Value"]).range([0,I]).padding(.2);D.append("g").attr("transform","translate(0,"+P+")").call(d3.axisBottom(E)).selectAll("text").style("font-family","meursault-variable, serif").style("font-size","18px").style("font-weight","600"),D.append("text").attr("x",I/2).attr("y",P+40).attr("text-anchor","middle").style("font-family","meursault-variable, serif").style("font-size","18px").style("font-weight","600").text("Value Today");var B=d3.scaleLinear().domain([0,250]).range([P,0]);D.append("g").call(d3.axisLeft(B)),D.append("text").attr("transform","rotate(-90)").attr("y",0-A.left).attr("x",0-P/2).attr("dy","1em").style("text-anchor","middle").style("font-family","meursault-variable, serif").style("font-size","18px").style("font-weight","600").text("Original Price"),D.selectAll("line").data(C).enter().append("line").attr("class","clickable-line").attr("x1",function(L){return E(L.bucket)}).attr("y1",function(L){return B(L.orgPrice)}).attr("x2",function(L){return(E(L.bucket)||0)+E.bandwidth()}).attr("y2",function(L){return B(L.orgPrice)}).style("stroke",function(L){return L.color?normalizeColor(L.color):"#000"}).attr("stroke-width",1).style("pointer-events","auto").on("mouseover",function(L,R){if(R.thumbnail){const T=B(R.orgPrice)-115,z=T+230>P-300?-230/2:10;d3.select(this.parentNode).selectAll(".center-image").remove(),d3.select(this.parentNode).append("image").attr("class","center-image").attr("x",E(R.bucket)-30).attr("y",T).attr("width",230).attr("height",230).attr("href",R.thumbnail).style("opacity",0).style("pointer-events","none").transition().duration(500).ease(d3.easeCubicOut).attr("y",T+z).style("opacity",1)}}).on("mouseout",function(){d3.selectAll(".center-image").remove()}).on("click",function(L,R){handleLineClick(R)})}function createParallelChart(C){var A={top:50,right:200,bottom:40,left:200},I=1400-A.left-A.right,P=3500-A.top-A.bottom;const D=d3.select("#ParallelChart").append("svg").attr("width",I+A.left+A.right).attr("height",P+A.top+A.bottom).append("g").attr("transform",`translate(${A.left}, ${A.top})`),E=Object.keys(C[0].allIndices),B={};E.forEach(T=>{B[T]=d3.scaleLinear().domain(d3.extent(C,z=>z.allIndices[T]||0)).range([0,I])});const L=d3.scalePoint().domain(E).range([0,P]),R={};function V(){const T=C.filter(z=>E.every(O=>{const F=R[O],q=z.allIndices[O];return!F||q>=F[0]&&q<=F[1]}));createDoubleRadarChart(R,"#doubleRadar"),showImages(T),D.selectAll(".line").data(T,z=>z.id).join(z=>z.append("path").attr("class","line").attr("d",O=>{const F=E.map((q,W)=>{const G=O.allIndices[q],U=(Math.random()-.5)*50;return G!==void 0&&!isNaN(G)?[B[q](G)+U,L(q)]:null}).filter(q=>q!==null);return d3.line().curve(d3.curveLinear)(F)}).style("fill","none").style("stroke",O=>O.color).style("opacity",1).style("stroke-width",1),z=>z,z=>z.remove()),D.selectAll(".axis").each(function(){this.parentNode.appendChild(this)})}V(),updateTextBlock(R),E.forEach(T=>{const z=D.append("g").attr("class","axis").attr("transform",`translate(0, ${L(T)})`);d3.select("#ParallelChart").append("div").attr("id",`${T}Anchor`).style("position","absolute").style("top",`${L(T)+3500}px`).style("left","0").style("width","1px").style("height","1px").style("visibility","hidden"),z.call(d3.axisBottom(B[T])).selectAll("text").style("fill",tickTextColour).style("font-family","meursault-variable, serif").style("font-size","18px"),z.append("text").attr("class","axis-label").attr("x",I+80).attr("y",-20).style("text-anchor","left").style("text-align","left").style("fill",tickTextColour).style("font-size","18px").style("font-weight","bold").style("font-family","meursault-variable, serif").text(T.replace(/([A-Z][a-z]*)/g,`
$1`).trim()).attr("z-index",10);const O=z.append("g").attr("class","slider").attr("transform","translate(0, 0)"),F=O.append("line").attr("x1",0).attr("x2",I).attr("stroke",primaryColour).attr("stroke-width",2),q=O.append("line").attr("x1",0).attr("x2",0).attr("stroke",primaryColour).attr("stroke-opacity",.3).attr("stroke-width",2),W=O.append("line").attr("x1",I).attr("x2",I).attr("stroke",primaryColour).attr("stroke-opacity",.3).attr("stroke-width",2),G=O.append("circle").attr("cx",0).attr("cy",0).attr("r",10).attr("fill",secondaryColour).attr("cursor","ew-resize").call(d3.drag().on("drag",function(Z){const J=Math.max(0,Math.min(I,Z.x));d3.select(this).attr("cx",J),R[T][0]=B[T].invert(J),Y.attr("visibility","visible"),X(),V(),updateTextBlock(R)})),U=O.append("circle").attr("cx",I).attr("cy",0).attr("r",10).attr("fill",secondaryColour).attr("cursor","ew-resize").call(d3.drag().on("drag",function(Z){const J=Math.max(0,Math.min(I,Z.x));d3.select(this).attr("cx",J),R[T][1]=B[T].invert(J),Y.attr("visibility","visible"),X(),V(),updateTextBlock(R)}));R[T]=[B[T].domain()[0],B[T].domain()[1]];function X(){const Z=B[T](R[T][0]),J=B[T](R[T][1]);q.attr("x2",Z),W.attr("x1",J).attr("x2",I),F.attr("x1",Z).attr("x2",J)}let Y=z.append("image").attr("visibility","hidden").attr("x",I+30).attr("y",-10).attr("width",30).attr("height",30).attr("xlink:href","./assets/reset.svg").style("cursor","pointer").on("click",function(){console.log("Resetting range for",T),R[T]=[B[T].domain()[0],B[T].domain()[1]],Y.attr("visibility","hidden"),G.attr("cx",B[T](R[T][0])),U.attr("cx",B[T](R[T][1])),V(),X(),updateTextBlock(R)})})}function createDoubleRadarChart(C,A){const I=Object.keys(C).filter(O=>!O.includes("range")),P=I.map(O=>C[O][0]),D=I.map(O=>C[O][1]);console.log(P,D);const E=70,B=Math.PI*2/I.length,L=d3.select(A).html("").append("svg").attr("width",270).attr("height",1e3).append("g").attr("transform","translate(115, 157)");L.append("text").attr("x",-20).attr("y",-130).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("font-size","18px").attr("font-weight","bold").attr("font-family","meursault-variable, serif").attr("fill",secondaryColour).text("Current Filter Selection:"),I.forEach((O,F)=>{const q=F*B,W=E*Math.cos(q-Math.PI/2),G=E*Math.sin(q-Math.PI/2);L.append("line").attr("x1",0).attr("y1",0).attr("x2",W).attr("y2",G).style("stroke","#fff").style("stroke-width","0.2px").style("stroke-opacity","0.8"),L.append("text").attr("x",(E+25)*Math.cos(q-Math.PI/2)).attr("y",(E+27)*Math.sin(q-Math.PI/2)).style("text-anchor","middle").style("font-size","12px").style("font-weight","bold").style("font-family","meursault-variable, serif").style("fill",secondaryColour).text(O.replace(/([A-Z])/g," $1"))});const R={Condition:50,Date:30,Rarity:25,PrintingTechniques:5,HistoricalEvent:20,FamousFigures:10,Denomination:10,Collection:11,Printer:4,FinalIndex:129};function V(O){return O.map((F,q)=>{const W=q*B,G=I[q],U=R[G];if(!U)return console.error(`Max value not defined for dimension: ${G}`),[0,0];const X=F/U*E,Y=X*Math.cos(W-Math.PI/2),Z=X*Math.sin(W-Math.PI/2);return[Y,Z]})}const T=V(P),z=V(D);T.forEach((O,F)=>{const q=z[F];L.append("line").attr("x1",O[0]).attr("y1",O[1]).attr("x2",q[0]).attr("y2",q[1]).style("stroke",secondaryColour).style("stroke-width",2),L.append("circle").attr("cx",O[0]).attr("cy",O[1]).attr("r",2).style("fill",secondaryColour),L.append("circle").attr("cx",q[0]).attr("cy",q[1]).attr("r",2).style("fill",secondaryColour)})}function updateTextBlock(C){const A=document.getElementById("textBlock");let I=`
        <h3> These are all the stamps that fall in the following criteria: <br> <br>
    `;Object.keys(C).forEach(P=>{const D=C[P],B=capitalizeFirstLetter(P.replace("Range","")).replace(/([A-Z])/g," $1");I+=`
            <a href="#${P.replace("Range","")}Anchor" 
               style="text-decoration: none; color: inherit;" 
               onclick="scrollToAnchor('${P.replace("Range","")}Anchor')">
               ${B}: ${Math.floor(D[0])} and ${Math.floor(D[1])}
            </a> <br>`}),I+="</h3>",A.innerHTML=I}function showImages(C){const A=document.getElementById("imageContainer");A.innerHTML="",C.forEach(({thumbnail:I,title:P},D)=>{if(!I)return;const E=document.createElement("img");E.src=I,E.alt=P||`Image ${D+1}`,E.classList.add("thumbnail"),E.addEventListener("click",()=>{const B=document.getElementById("fullscreenOverlay"),L=document.getElementById("fullscreenImage");L.src=I,L.alt=P||`Image ${D+1}`,B.classList.remove("hidden")}),A.appendChild(E)})}document.getElementById("scrollArrow").addEventListener("click",()=>{document.getElementById("imageContainer").scrollBy({left:900,behavior:"smooth"})});document.getElementById("closeFullscreen").addEventListener("click",()=>{document.getElementById("fullscreenOverlay").classList.add("hidden")});function normalizeColor(C){if(C.includes("multi;"))return null;const A=w(C);if(A.isValid()){const{r:I,g:P,b:D}=A.toRgb();if(I===0&&P===0&&D===0)return null;const E=30;return I<E&&P<E&&D<E?A.lighten(.2).toHex():A.toHex()}else return console.log("Invalid color input"),null}function capitalizeFirstLetter(C){return C.charAt(0).toUpperCase()+C.slice(1)}
