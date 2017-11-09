"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(a){return typeof a;}:function(a){return a&&typeof Symbol==="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a;};(function b(c,d,e){function a(h,i){if(!d[h]){if(!c[h]){var j=typeof require=="function"&&require;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k;}var f=d[h]={exports:{}};c[h][0].call(f.exports,function(b){var d=c[h][1][b];return a(d?d:b);},f,f.exports,b,c,d,e);}return d[h].exports;}for(var g=typeof require=="function"&&require,f=0;f<e.length;f++){a(e[f]);}return a;})({1:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});c.default=e;var k=a('./utils'),l=d(k);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}var m=10*1000,n=null,o={},p=function e(f){for(var a=arguments.length,b=Array(a>1?a-1:0),c=1;c<a;c++){b[c-1]=arguments[c];}return f in o&&o[f].apply(o,b);},q=void 0,r={on:f,login:g,auth:h,redeem:i};function e(){if(!('WebSocket'in window))throw new Error('Unsupported browser: WebSocket is required!');if(n)return r;var b=location.protocol=='https:'?'wss:':'ws:';n=new WebSocket(b+'//'+location.host+'/ws');n.onopen=function(){q=setInterval(j,m,{action:'ping'});};n.onmessage=function(d,a){var b=l.parseJSON(d.data,{});if(!b.action)return console.warn('Unknown ws message: ',d);console.log('Received ws message. action:',b.action);if(b.action=='connect')return p('connect');if(b.action=='logOn')return p('login',b.result=='success'?null:b.message,b.detail);if(b.action=='authCode')return p('auth');if(b.action=='redeem')return p('redeem',b.detail);if(b.action=='pong')return;};n.onclose=function(){clearInterval(q);p('disconnect');};return r;}function f(c,a){o[c]=a;return r;}function g(c,d){j({action:'logOn',username:c,password:d});return r;}function h(b){j({action:'authCode',authCode:b});return r;}function i(b){j({action:'redeem',keys:b});return r;}function j(c){try{n.send(JSON.stringify(c));}catch(a){console.error('ws send failed:',c,'error: ',a);}}},{"./utils":10}],2:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});c.default=f;var g=a('downloadjs'),h=e(g),i=a('./i18n/index'),j=d(i);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}function e(b){return b&&b.__esModule?b:{default:b};}var n='#modalExport',o='#btnExport',p='#txtFileName',q='#txtRedeemedCount',r='#txtFailedCount',s='#txtWaitingCount',k='#cbASF',t='#cbRedeemed',u='#cbFailed',v='#cbWaiting',w='checked',x=':checked',y=[],z='';function f(w){y=w;var a=new Date();z='redeem-export-'+(a.getFullYear()+'-'+l(a.getMonth()+1)+'-'+l(a.getDate())+'-')+(l(a.getHours())+'-'+l(a.getMinutes())+'.txt');$(p).val(z);var b=0,c=0,d=0,e=true,x=false,g=undefined;try{for(var h=y[Symbol.iterator](),i,j;!(e=(i=h.next()).done);e=true){j=i.value;switch(j.status){case'OK':b++;break;case'Fail':c++;break;case'Waiting':d++;break;}}}catch(b){x=true;g=b;}finally{try{if(!e&&h.return){h.return();}}finally{if(x){throw g;}}}$(q).text(b);$(r).text(c);$(s).text(d);$(t)[0].checked=false;$(u)[0].checked=true;$(v)[0].checked=true;$(o).off('click').on('click',m);$(n).modal();}function l(b){return b<10?'0'+b:''+b;}function m(){var i=String($(p).val()).trim()||z,a=$(k).is(x),b=$(t).is(x),c=$(u).is(x),d=$(v).is(x),e=y.filter(function(e){return e.status=='OK'&&b||e.status=='Fail'&&c||e.status=='Waiting'&&d;}),f='';if(a)f='!redeem '+e.map(function(b){return b.key;}).join(',');else f=e.map(function(b){return[b.key,j.get(b.status),b.packages.map(function(b){return'('+b.subId+') '+b.name;}).join(',')].join('\t');}).join('\r\n');(0,h.default)(f,i,'text/plain');$(n).modal('hide');}},{"./i18n/index":4,"downloadjs":11}],3:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});var d=c.strings={title:"Steam Key Redeem",title_login:'Steam Login',disconnect_with_server:'Disconnected with server!',login_failed:'Login Failed!',login_missing_username:'please input your steam username',login_missing_password:'please input your password',login_username:'Steam Username',login_password:'Password',login:'Login',logining:'Logining...',steam_guard:'Steam Guard',steam_guard_from:'You can in your steam mobile app or you email',btn_continue:'Continue',"export":'Export',cancel:'Cancel',export_file_name:'Export File Name',export_settings:'Export Settings',export_asf:'ASF Format',export_redeemed:'Redeemed',export_failed:'Failed',export_waiting:'Waiting for redeeming',export_results:'Export results',notification:'Desktop notification after finish, disconnected or rate limited ',notification_unsupported:'(Your browser does not support it!)',finish:'Redeem finished!',label_keys:'Keys:',redeem:'Redeem',redeem_result:'Redeem Result',redeem_limited:['Fatal Error: Rate Limited. ','You can redeem keys for this account after at least 1 hour.'],table_no:'No.',table_key:'Key',table_status:'Status',table_name:'Name',status_unsupported:['Your browser is unsupported. ','(recommended browser: Chrome, Firefox, Edge)','(and please keep your browser up to date)'],status_connecting:'Connecting to server... ',status_connected:'Connected, you can login now.',status_loggedin:'You have been logged in, you can redeem keys now. Username:',status_refresh:'Please refresh this page.',made_by:'Made by ',based_on_project:'based on project ',based_on_project_from:' from ',license_prefix:'Code released under the',icon_from:'Icons from ',framework_on:'Frontend page based on ',fonts_from_1:'Web fonts (',fonts_from_2:') are copied fro',donate_link:'Donate links: ',donation_description:['Your donation is power for open-source ','and free redeeming server.'],'result:InvalidPassword':'Invalid password','result:TwoFactorCodeMismatch':'Invalid two factor code','result:Limited account':'Limited account could not redeeming','result:AuthCodeError':'Auth code is error','result:Waiting':'Waiting...','result:Redeeming':'Redeeming...','result:OK':'Success','result:Fail':'Failed','result:NoDetail':' ','result:AlreadyPurchased':'Already Purchased','result:DuplicateActivationCode':'Duplicate Activation Code','result:BadActivationCode':'Bad Activation Code','result:RateLimited':'Rate Limited','result:DoesNotOwnRequiredApp':'Does Not Own Required App','result:RestrictedCountry':'Restricted Country'};},{}],4:[function(a,b,c){"use strict";Object.defineProperty(c,"__esModule",{value:true});c.EN=undefined;c.updateUI=e;c.get=f;c.result=g;c.getLanguageName=h;c.setLanguage=i;var j=a("./zh-CN"),k=d(j),l=a("./en"),m=d(l);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}var n='steam-key-redeem-language',o=c.EN='en',p={'zh-CN':k,en:m},q=p[o],r=localStorage.getItem(n)||o,s=p[r]||q;Object.keys(p).map(function(b){return p[b].strings;}).forEach(function(c){return Object.keys(c).filter(function(a){return Array.isArray(c[a]);}).forEach(function(a){return c[a]=c[a].join('');});});e();function e(){for(var i=document.querySelectorAll('[data-i18n]'),a=i.length,b=q.strings,c=s.strings,d=0;d<a;d++){var e=i[d],f=e.getAttribute('data-i18n'),g=c[f]||b[f];if(!g)continue;if(e.tagName=='INPUT'||e.tagName=='TEXTAREA')e.value=g;else e.innerHTML=g;}}function f(){var b=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return s.strings[b]||q.strings[b]||b;}function g(){var c=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'',a="result:"+c;return s.strings[a]||q.strings[a]||c;}function h(){return r;}function i(){var b=arguments.length>0&&arguments[0]!==undefined?arguments[0]:o;if(!(b in p))return;r=b;s=p[b];e();localStorage.setItem(n,b);}},{"./en":3,"./zh-CN":5}],5:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});var d=c.strings={title:"Steam Key 批量激活工具",title_login:'登录 Steam',disconnect_with_server:'与服务器断开连接! ',login_failed:'登录失败!',login_missing_username:'请输入你的Steam账号',login_missing_password:'请输入你的Steam密码',login_username:'用户名',login_password:'密码',login:'登录',logining:'登录中...',steam_guard:'Steam 令牌',steam_guard_from:'你可以从你的手机APP或电子邮箱中找到',btn_continue:'继续登录',"export":'导出',cancel:'取消',export_file_name:'导出文件名',export_settings:'导出设置',export_asf:'ASF格式',export_redeemed:'已兑换的',export_failed:'兑换失败的',export_waiting:'未兑换的',export_results:'导出结果',notification:'桌面通知(兑换完成/断开连接/兑换超限时通知)',notification_unsupported:'(你的浏览器不支持!)',finish:'兑换完成!',label_keys:'激活码(支持很多很多个):',redeem:'激活',redeem_result:'激活结果',redeem_limited:['致命错误: Steam 限制了你的激活(短时间内激活/失败次数太多) ','建议对这个账号的游戏激活在一个小时后再进行'],table_no:'No.',table_key:'Key',table_status:'状态',table_name:'信息',status_unsupported:['你的浏览器太老了,此工具无法支持','(推荐浏览器:Chrome, Firefox, Edge)','(请保持你的浏览器是最新的版本)'],status_connecting:'正在连接到服务器...',status_connected:'已连接,现在你可以登录你的Steam账号了.',status_loggedin:'已登录,输入Key点击"激活"吧, 用户名: ',status_refresh:'请刷新过当前页面.',made_by:'本项目由我: ',based_on_project:'基于项目',based_on_project_from:' 开发, 原项目作者: ',license_prefix:'本项目开源协议:',icon_from:'图标来源 ',framework_on:'前端页面基于 ',fonts_from_1:'使用了字体 (',fonts_from_2:') 来源于',donate_link:'捐赠链接: ',donation_description:['你的捐赠能撑起开源的美好明天, ','也能让免费的公用SteamKey激活服务器走的更远'],'result:InvalidPassword':'无效的密码','result:TwoFactorCodeMismatch':'安全令错误','result:Limited account':'受限用户暂无法使用','result:AuthCodeError':'验证码有误','result:Waiting':'排队中...','result:Redeeming':'兑换中...','result:OK':'成功','result:Fail':'失败','result:NoDetail':' ','result:AlreadyPurchased':'已拥有','result:DuplicateActivationCode':'重复激活','result:BadActivationCode':'无效激活码','result:RateLimited':'次数上限','result:DoesNotOwnRequiredApp':'缺少主游戏','result:RestrictedCountry':'区域限制'};},{}],6:[function(a,b,c){"use strict";var n=a("./api"),o=e(n),p=a("./export"),q=e(p),r=a("./utils"),s=d(r),t=a("./status"),u=d(t),v=a("./redeem"),w=d(v),x=a("./i18n/index"),y=d(x),z=a("./notification"),A=d(z);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}function e(b){return b&&b.__esModule?b:{default:b};}var B='#modal2FA',C='#formLogin',D='#form2fa',E='#inputUser',F='#inputPasswd',G='#inputAuthCode',H='#inputKeys',I='#btnLogin',J='#btnLogining',K='#btnRedeem',L='#btnSwitchLanguage',M='#linkExport',N='#alertLoginFailed',O='#txtLoginFailed',P='',Q='';$(f);function f(){(0,o.default)().on('connect',u.connected).on('disconnect',function(){return u.broken(y.get('disconnect_with_server'));}).on('auth',function(){return $(B).modal({keyboard:false,backdrop:'static'});}).on('redeem',function(b){return w.onRedeem(b);}).on('login',h);w.bindAPI((0,o.default)().redeem);w.bindStringProvider(y.result);w.bindStopNowCallback(function(){return $('#cardInput').hide();});g();u.connecting();A.init();$(C).submit(j);$(D).submit(i);$(K).click(function(){var b=s.extractKeysFromText(k(H));if(b.length<1)return;$(H).val('');w.add(b);});$(L).click(function(){var b=$(L);y.setLanguage(b.attr('data-lang')||y.EN);g();});$(M).click(function(){return(0,q.default)(w.getTasks());});$(B).on('shown.bs.modal',function(){return $(G).val('').focus();});}function g(){var c=$(L),a=y.getLanguageName();c.attr('data-lang',a==y.EN?"zh-CN":"en");c.text(a==y.EN?"中文":"English");}function h(d,a){$(J).hide();$(I).show();if(d){console.error('login failed:',d);var b=String(d);if(b.match(/password/i))return m(F,y.result(b));if(b.match(/account/i))return m(E,y.result(b));$(O).text(y.result(b));$(N).show();return;}console.log('login success:',a);u.logined(P+" "+a.steamID);}function i(c){c.preventDefault();var a=k(G).trim().toUpperCase();if(a){(0,o.default)().auth(a);$(B).modal('hide');}}function j(b){b.preventDefault();$(N).hide();l(E);l(F);P=k(E).trim();Q=k(F).trim();if(!P)return m(E,y.get('login_missing_username'));if(!Q)return m(F,y.get('login_missing_password'));(0,o.default)().login(P,Q);$(I).hide();$(J).show();}function k(b){return String($(b).val()||"");}function l(b){$(b).removeClass('is-invalid').siblings('.form-control-feedback').text('');}function m(c,a){$(c).addClass('is-invalid').focus().siblings('.form-control-feedback').text(a);}},{"./api":1,"./export":2,"./i18n/index":4,"./notification":7,"./redeem":8,"./status":9,"./utils":10}],7:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});c.rateLimited=c.finish=c.disconnected=undefined;c.init=e;var i=a('./i18n/index'),j=d(i);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}var k='steam-key-redeem-notification',l='#cbNotification',m='#txtNotificationUnsupported',n='disabled',o=':checked',p=localStorage.getItem(k)=='true';if(Notification.permission!="granted")p=false;function e(){var b=$(l);console.log('notification enable:',p);if(typeof Notification=='undefined'){$(m).show();b.attr(n,n).addClass(n);return;}b[0].checked=p;b.change(function(){console.log('notification checkbox changed!');if(b.is(o))return f();g();});}function f(){Notification.requestPermission(function(b){console.log('notification permission:',b);if(b=='granted'){p=true;localStorage.setItem(k,'true');return;}g();});}function g(){p=false;localStorage.setItem(k,'false');$(l)[0].checked=false;}var q=c.disconnected=function a(){return h('disconnect_with_server');},r=c.finish=function a(){return h('finish');},s=c.rateLimited=function a(){return h('redeem_limited');};function h(b){if(p)new Notification(j.get('title'),{body:j.get(b)});}},{"./i18n/index":4}],8:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});c.getTasks=h;c.onRedeem=j;c.bindAPI=k;c.bindStringProvider=l;c.bindStopNowCallback=m;c.add=n;var o=a('./notification'),p=d(o);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}var q='#cardResult',r='#tbResult',s='#txtRedeemFatal',t='RateLimited',u=9*1000,v=300,w=[],x={},y=0,z=void 0,A=null,B=function b(c){return void c;},C=function b(c){return c;};function i(){var j=Date.now(),a=true;if(j>y+u&&w.filter(function(b){return b.status=='Redeeming';}).length==0){var b=true,k=false,d=undefined;try{for(var e=w[Symbol.iterator](),f,l;!(b=(f=e.next()).done);b=true){l=f.value;if(l.status=='Waiting'){B([l.key]);y=j;a=false;l.status='Redeeming';g();break;}}}catch(b){k=true;d=b;}finally{try{if(!b&&e.return){e.return();}}finally{if(k){throw d;}}}if(a){z=void 0;p.finish();return;}}z=setTimeout(i,v);}function e(){if(typeof z=='undefined')z=setTimeout(i,v);}function f(){clearTimeout(z);z=void 0;$(s).show();p.rateLimited();A&&A();}var D=$('<a target="_blank"></a>');function g(){$(r).html(w.map(function(l){var a='',b='span';if(l.status=='OK'||l.status=='Fail'){b='b';a=l.status=='OK'?'text-primary':'text-danger';}var c='--';if(l.packages.length){c='';var d=true,m=false,f=undefined;try{for(var g=l.packages[Symbol.iterator](),h;!(d=(h=g.next()).done);d=true){var i=h.value,j=D.clone();j.attr('href','https://steamdb.info/sub/'+i.subId+'/');j.text('('+i.subId+') '+i.name);c+=j.prop('outerHTML')+'<br/>';}}catch(b){m=true;f=b;}finally{try{if(!d&&g.return){g.return();}}finally{if(m){throw f;}}}}return'<tr>\n\t\t\t<td>'+l.no+'</td>\n\t\t\t<td><code>'+l.key+'</code></td>\n\t\t\t<td class="'+a+'">\n\t\t\t\t<'+b+'>'+C(l.status)+'</'+b+'>\n\t\t\t\t'+C(l.resultMsg)+'\n\t\t\t</td>\n\t\t\t<td>'+c+'</td>\n\t\t</tr>';}).join('\n'));}function h(){return w;}function j(c){w.filter(function(a){return a.key==c.key;}).forEach(function(a){a.status=c.result;a.resultMsg=c.details;a.packages=Object.keys(c.packages).map(function(a){return{subId:a,name:c.packages[a]};});});g();if(c.details==t)f();}function k(b){B=b;}function l(b){C=b;}function m(b){A=b;}function n(i){console.log('adding '+i.length+' keys.');var a=0,b=true,j=false,d=undefined;try{for(var k=i[Symbol.iterator](),f,l;!(b=(f=k.next()).done);b=true){l=f.value;if(l in x){console.log('key: (duplicated)',l);continue;}console.log('key:',l);a++;x[l]=true;w.push({no:w.length,key:l,status:'Waiting',resultMsg:'',packages:[]});}}catch(b){j=true;d=b;}finally{try{if(!b&&k.return){k.return();}}finally{if(j){throw d;}}}if(a){$(q).show();g();e();}}},{"./notification":7}],9:[function(a,b,c){'use strict';Object.defineProperty(c,"__esModule",{value:true});c.broken=c.logined=c.connected=c.connecting=undefined;var f=a('./notification'),g=d(f);function d(d){if(d&&d.__esModule){return d;}else{var a={};if(d!=null){for(var b in d){if(Object.prototype.hasOwnProperty.call(d,b))a[b]=d[b];}}a.default=d;return a;}}var h=c.connecting=function a(){return e('statusConnecting');},i=c.connected=function a(){e('statusConnected');$('#cardLogin').show();},j=c.logined=function b(c){e('statusLogined');$('#txtUsername').text(c);$('#cardLogin').hide();$('#cardInput').show();},k=c.broken=function b(c){e('statusBroken');$('#txtBrokenReason').text(c);$('#cardLogin').hide();$('#cardInput').hide();g.disconnected();};function e(b){$('.card-status').hide().filter('#'+b).show();}},{"./notification":7}],10:[function(a,b,c){"use strict";Object.defineProperty(c,"__esModule",{value:true});c.extractKeysFromText=d;c.parseJSON=e;function d(e){e=e.trim().toUpperCase();var a=/([0-9,A-Z]{5}\-){2,4}[0-9,A-Z]{5}/g,b=[],c=null;while(!!(c=a.exec(e))){b.push(c[0]);}return b;}function e(c,a){try{return JSON.parse(c);}catch(b){return a;}}},{}],11:[function(a,b,c){(function(a,d){if(typeof define==='function'&&define.amd){define([],d);}else if((typeof c==="undefined"?"undefined":_typeof(c))==='object'){b.exports=d();}else{a.download=d();}})(this,function(){return function a(b,c,d){var g=window,h="application/octet-stream",j=d||h,k=b,l=!c&&!d&&k,m=document.createElement("a"),n=function toString(b){return String(b);},o=g.Blob||g.MozBlob||g.WebKitBlob||n,p=c||"download",q,r;o=o.call?o.bind(g):Blob;if(String(this)==="true"){k=[k,j];j=k[0];k=k[1];}if(l&&l.length<2048){p=l.split("/").pop().split("?")[0];m.href=l;if(m.href.indexOf(l)!==-1){var s=new XMLHttpRequest();s.open("GET",l,true);s.responseType='blob';s.onload=function(b){a(b.target.response,p,h);};setTimeout(function(){s.send();},0);return s;}}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(k)){if(k.length>1024*1024*1.999&&o!==n){k=e(k);j=k.type||h;}else{return navigator.msSaveBlob?navigator.msSaveBlob(e(k),p):f(k);}}else{if(/([\x80-\xff])/.test(k)){var t=0,i=new Uint8Array(k.length),u=i.length;for(t;t<u;++t){i[t]=k.charCodeAt(t);}k=new o([i],{type:j});}}q=k instanceof o?k:new o([k],{type:j});function e(a){var b=a.split(/[:;,]/),c=b[1],d=b[2]=="base64"?atob:decodeURIComponent,e=d(b.pop()),f=e.length,g=0,h=new Uint8Array(f);for(g;g<f;++g){h[g]=e.charCodeAt(g);}return new o([h],{type:c});}function f(a,b){if('download'in m){m.href=a;m.setAttribute("download",p);m.className="download-js-link";m.innerHTML="downloading...";m.style.display="none";document.body.appendChild(m);setTimeout(function(){m.click();document.body.removeChild(m);if(b===true){setTimeout(function(){g.URL.revokeObjectURL(m.href);},250);}},66);return true;}if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)){if(/^data:/.test(a))a="data:"+a.replace(/^data:([\w\/\-\+]+)/,h);if(!window.open(a)){if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){location.href=a;}}return true;}var c=document.createElement("iframe");document.body.appendChild(c);if(!b&&/^data:/.test(a)){a="data:"+a.replace(/^data:([\w\/\-\+]+)/,h);}c.src=a;setTimeout(function(){document.body.removeChild(c);},333);}if(navigator.msSaveBlob){return navigator.msSaveBlob(q,p);}if(g.URL){f(g.URL.createObjectURL(q),true);}else{if(typeof q==="string"||q.constructor===n){try{return f("data:"+j+";base64,"+g.btoa(q));}catch(a){return f("data:"+j+","+encodeURIComponent(q));}}r=new FileReader();r.onload=function(a){f(this.result);};r.readAsDataURL(q);}return true;};});},{}]},{},[6]);