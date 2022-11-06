! function(window, document) {
    var baidu = baidu || {
        version: "1.3.8"
    };
    baidu.socShare = baidu.socShare || {}, baidu.socShare.dom = {}, baidu.socShare.event = baidu.socShare.event || {}, baidu.socShare.event.getTarget = function(e) {
        return e.target || e.srcElement
    }, baidu.socShare.event._listeners = baidu.socShare.event._listeners || [], baidu.socShare.lang = baidu.socShare.lang || {}, baidu.socShare.lang.isString = Box.isString, baidu.socShare.isString = baidu.socShare.lang.isString, baidu.socShare.event.on = function(e, t, i) {
        t = t.replace(/^on/i, ""), e = Box.byId(e);
        var n, a = function(t) {
                i.call(e, t)
            },
            o = baidu.socShare.event._listeners,
            r = baidu.socShare.event._eventFilter,
            s = t;
        return t = t.toLowerCase(), r && r[t] && (n = r[t](e, t, a), s = n.type, a = n.listener), e.addEventListener(s, a, !1), o[o.length] = [e, t, i, a, s], e
    }, baidu.socShare.event.un = function(e, t, i) {
        e = Box.byId(e), t = t.replace(/^on/i, "").toLowerCase();
        for (var n, a, o, r = baidu.socShare.event._listeners, s = r.length, d = !i; s--;) n = r[s], n[1] !== t || n[0] !== e || !d && n[2] !== i || (a = n[4], o = n[3], e.removeEventListener(a, o, !1), r.splice(s, 1));
        return e
    }, baidu.socShare.on = baidu.socShare.event.on, baidu.socShare.un = baidu.socShare.event.un, baidu.socShare.lang.module = function(name, module, owner) {
        var packages = name.split("."),
            len = packages.length - 1,
            packageName, i = 0;
        if (!owner) try {
            if (!new RegExp("^[a-zA-Z_$][a-zA-Z0-9_$]*$").test(packages[0])) throw "";
            owner = eval(packages[0]), i = 1
        } catch (e) {
            owner = window
        }
        for (; len > i; i++) packageName = packages[i], owner[packageName] || (owner[packageName] = {}), owner = owner[packageName];
        owner[packages[len]] || (owner[packages[len]] = module)
    }, baidu.socShare.dom.remove = function(e) {
        e = Box.byId(e);
        var t = e.parentNode;
        t && t.removeChild(e)
    }, baidu.socShare.sio = baidu.sio || {}, baidu.socShare.sio._createScriptTag = function(e, t, i) {
        e.setAttribute("type", "text/javascript"), i && e.setAttribute("charset", i), e.setAttribute("src", t), document.getElementsByTagName("head")[0].appendChild(e)
    }, baidu.socShare.sio._removeScriptTag = function(e) {
        if (e.clearAttributes) e.clearAttributes();
        else
            for (var t in e) e.hasOwnProperty(t) && delete e[t];
        e && e.parentNode && e.parentNode.removeChild(e), e = null
    }, baidu.socShare.sio.callByBrowser = function(e, t, i) {
        var n, a = document.createElement("SCRIPT"),
            o = 0,
            r = i || {},
            s = r.charset,
            d = t || function() {},
            c = r.timeOut || 0;
        a.onload = a.onreadystatechange = function() {
            if (!o) {
                var e = a.readyState;
                if ("undefined" == typeof e || "loaded" == e || "complete" == e) {
                    o = 1;
                    try {
                        d(), clearTimeout(n)
                    } finally {
                        a.onload = a.onreadystatechange = null, baidu.socShare.sio._removeScriptTag(a)
                    }
                }
            }
        }, c && (n = setTimeout(function() {
            a.onload = a.onreadystatechange = null, baidu.socShare.sio._removeScriptTag(a), r.onfailure && r.onfailure()
        }, c)), baidu.socShare.sio._createScriptTag(a, e, s)
    }, baidu.socShare.dom.getPageSize = function() {
        var e, t;
        window.innerHeight && window.scrollMaxY ? (e = window.innerWidth + window.scrollMaxX, t = window.innerHeight + window.scrollMaxY) : document.body.scrollHeight > document.body.offsetHeight ? (e = document.body.scrollWidth, t = document.body.scrollHeight) : document.body && (e = document.body.offsetWidth, t = document.body.offsetHeight);
        var i, n;
        window.innerHeight ? (i = window.innerWidth, n = window.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (i = document.documentElement.clientWidth, n = document.documentElement.clientHeight) : document.body && (i = document.body.clientWidth, n = document.body.clientHeight);
        var a = i > e ? i : e,
            o = n > t ? n : t;
        return {
            PageW: a,
            PageH: o,
            WinW: i,
            WinH: n
        }
    };
    var ua = navigator.userAgent.toLowerCase(),
        isBaiduBrowser = function() {
            return /baidubrowser\/([\d.]+)/.test(ua)
        };
    baidu.socShare.lang.module("baidu.socShare.ui", {
            _stylelink: "//openapi.baidu.com/static/05291639/social-api/css/bd_share.css?t=05291639",
            _orientTimer: null,
            _tpl: '<div class="bd-share"><ul class="bd-cl" id="bd_share_mediaes" style="width:<%=listWidth%>;"><%Box.each(mediaes,function(media,idx){ %><li class="media"><a class="<%=media.media_type%>" id="bd_share_mediaes_<%=media.media_type%>" href="<%=href[media.media_type]%>"><%=media.cn%></a></li><% });%></ul></div>',
            _template: function(e, t) {
                var i = {
                        evaluate: /<%([\s\S]+?)%>/g,
                        interpolate: /<%=([\s\S]+?)%>/g,
                        escape: /<%-([\s\S]+?)%>/g
                    },
                    n = function(e) {
                        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
                    },
                    a = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(i.escape || noMatch, function(e, t) {
                        return "',_escape(" + unescape(t) + "),'"
                    }).replace(i.interpolate || noMatch, function(e, t) {
                        return "'," + unescape(t) + ",'"
                    }).replace(i.evaluate || noMatch, function(e, t) {
                        return "');" + unescape(t).replace(/[\r\n\t]/g, " ") + ";__p.push('"
                    }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
                    o = new Function("obj", "_escape", a);
                return t ? o(t, n) : function(e, t) {
                    return o.call(this, e, t)
                }
            },
            _addStyle: function() {
                for (var e = this, t = document.getElementsByTagName("head")[0], i = document.getElementsByTagName("link"), n = !0, a = 0, o = i.length; o > a; a++)
                    if (0 === i[0].href.indexOf(e._stylelink)) {
                        n = !1;
                        break
                    }
                if (n) {
                    var r = document.createElement("link");
                    r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", e._stylelink), t.appendChild(r)
                }
            },
            _add_event: function(e) {
                var t = this,
                    i = this._data,
                    n = i.time,
                    a = Box.byId("bd_share_popup_" + n),
                    o = "native" === i.theme && i.animate !== !1;
                t._viewOrientHandler = function() {
                    t._orient()
                }, t._shareBtnClickHandler = function() {
                    return t._show(a, o), i.shortLink && "click" === i.shortLink && !baidu.socShare.acc.shortLinks.sms && baidu.socShare.acc.getShortLink(i, function() {
                        i.href = baidu.socShare.acc.getHref(i), Box.byId("bd_share_mediaes_mail").href = i.href.mail, Box.byId("bd_share_mediaes_sms").href = i.href.sms
                    }), !1
                }, t._layClickHandler = function(e) {
                    var i = window.event ? window.event.srcElement : e.target;
                    return i === this.getElementsByTagName("td")[0] && t._hide(a, o), !1
                }, t._closeBtnClickHandler = function() {
                    return t._hide(a, o), !1
                }, e || (baidu.socShare.on(window, "orientationchange", t._viewOrientHandler), i.dom_id && baidu.socShare.on(i.dom_id, "click", t._shareBtnClickHandler)), baidu.socShare.on("bd_share_popup_close_" + n, "click", t._closeBtnClickHandler), baidu.socShare.on("bd_share_popup_content", "click", t._layClickHandler)
            },
            _remove_event: function() {
                var e = this,
                    t = e._data,
                    i = t.time;
                baidu.socShare.un(window, "orientationchange", e._viewOrientHandler), baidu.socShare.un(t.dom_id, "click", e._shareBtnClickHandler), baidu.socShare.un("bd_share_popup_close_" + i, "click", e._closeBtnClickHandler), baidu.socShare.un("bd_share_popup_content", "click", e._layClickHandler)
            },
            _hide: function(e, t) {
                t === !0 ? this._slide("down", function() {
                    e.style.display = "none"
                }) : e.style.display = "none"
            },
            _show: function(e, t) {
                t === !0 ? (e.style.display = "", this._slide("up")) : e.style.display = ""
            },
            _slide: function(e, t) {
                var i, n = Box.byId("bd_share_popup"),
                    a = n.offsetHeight;
                "up" === e ? (n.style.height = 0, i = function() {
                    return a - inc * a / total + "px"
                }) : i = function() {
                    return inc * a / total + "px"
                };
                var o = function() {
                    return function() {
                        n.style.height = "up" === e ? 0 : a + "px", n.style.overflow = "hidden", n.style.webkitTransition = "height linear .3s";
                        var i = function() {
                            n.style.height = "auto", n.style.overflow = "auto", n.style.webkitTransition = "none", t && t(), n.removeEventListener("webkitTransitionEnd", i, !1)
                        };
                        n.addEventListener("webkitTransitionEnd", i, !1), setTimeout(function() {
                            n.style.height = "up" === e ? a + "px" : 0
                        }, 0)
                    }
                }();
                o()
            },
            _orient: function() {
                var e = this,
                    t = this._data;
                return delete t.afterInit, e._orientTimer && clearTimeout(e._orientTimer), e._orientTimer = setTimeout(function() {
                    e.render(t, !0)
                }, 500), !1
            },
            _popup_render: function() {
                var e = this._data,
                    t = Box.byId("bd_share_popup_" + e.time);
                t || (t = document.createElement("div"), t.style.display = "none", t.id = "bd_share_popup_" + e.time), t.innerHTML = this._template('<div class="bd-share-popup-layer" id="bd_share_popup_layer" style="height:<%=(pageHeight+500)%>px;"></div><div class="bd-share-pop-content <%=theme%>" id="bd_share_popup_content" style="height:<%=pageHeight%>px;"><table><tr><td><div class="bd-share-popup" id="bd_share_popup" style="width:<%=popupWidth%>;">' + this._tpl + '<div class="bd-share-popup-footer"><a class="bd-share-popup-close" id="bd_share_popup_close_<%=time%>" href="javascript:void 0;">\u53d6\u6d88</a></div></div></div></td></tr></table>', e), document.body.appendChild(t)
            },
            close: function() {
                var e = this._data;
                if (e) {
                    var t = Box.byId("bd_share_popup_" + e.time);
                    t && this._hide(t)
                }
            },
            destroy: function() {
                var e = this._data;
                if (e) {
                    var t = Box.byId("bd_share_popup_" + e.time);
                    this.close(), this._remove_event(), t && baidu.socShare.dom.remove(t)
                }
            },
            render: function(e, t) {
                if (this._data = e, e && e.afterInit && "function" == typeof e.afterInit) e.afterInit(e.href);
                else {
                    e.theme = e.theme || "web";
                    var i = baidu.socShare.dom.getPageSize();
                    if (e.pageHeight = i.WinH, "native" === e.theme ? (e.popupWidth = "100%", e.listWidth = i.WinW - i.WinW % 76 + "px") : (e.listWidth = "100%", e.popupWidth = i.WinW - i.WinW % 76 + "px"), !t) {
                        this._addStyle();
                        var n = e.afterRender
                    }
                    this._popup_render(), this._add_event(t), n && "function" == typeof n && n()
                }
            }
        }),
        function() {
            window.afterGetShortLink = function(e) {
                e.mail = e.email, baidu.socShare.acc.shortLinks = e
            }, baidu.socShare.lang.module("baidu.socShare.acc", {
                shortLinks: {},
                _order: [],
                _defaultOrder: ["qqdenglu", "sinaweibo", "renren", "kaixin", "mail", "sms"],
                _mediaes: {
                    qqdenglu: {
                        media_type: "qqdenglu",
                        cn: "QQ\u7a7a\u95f4",
                        selected: !1
                    },
                    sinaweibo: {
                        media_type: "sinaweibo",
                        cn: "\u65b0\u6d6a\u5fae\u535a",
                        selected: !1
                    },
                    renren: {
                        media_type: "renren",
                        cn: "\u4eba\u4eba\u7f51",
                        selected: !1
                    },
                    kaixin: {
                        media_type: "kaixin",
                        cn: "\u5f00\u5fc3\u7f51",
                        selected: !1
                    },
                    mail: {
                        media_type: "mail",
                        cn: "\u90ae\u4ef6",
                        selected: !1
                    },
                    sms: {
                        media_type: "sms",
                        cn: "\u77ed\u4fe1",
                        selected: !1
                    }
                },
                getShortLink: function(e, t) {
                    var i = this,
                        n = "client_id=" + e.client_id + "&url=" + e.url + "&client_type=web&media_types=email,sms&callback=afterGetShortLink",
                        a = "//openapi.baidu.com/social/api/2.0/share_batch/back/url";
                    baidu.socShare.sio.callByBrowser(a + "?" + n, function() {
                        i.afterGetShortLink(e, t)
                    })
                },
                afterGetShortLink: function(e, t) {
                    var i = this.shortLinks;
                    e.shortLinks = i, t && t()
                },
                getEmailHref: function(e, t) {
                    var i = "";
                    if (Box.os.ios) {
                        var n = e.replace(/&/g, "&amp;");
                        i = encodeURIComponent(n + "   ") + t
                    } else if (Box.os.android) i = isBaiduBrowser() ? encodeURIComponent(e + "   ") + t : e + "   " + t, i = encodeURIComponent(i);
                    else {
                        var a = e.replace(/&/g, "%26");
                        i = a + "   " + t
                    }
                    return "mailto:someone@somedomain.com?body=" + i
                },
                getSMSHref: function(e, t) {
                    var i = "";
                    return isBaiduBrowser() || (e = e.replace(/\?/g, "\uff1f")), i = encodeURIComponent(e + "   ") + t, "sms:?body=" + i
                },
                getQQHref: function(e) {
                    var t = e.url || "";
                    return ["http://openmobile.qq.com/oauth2.0/m_jump?page=qzshare.html&loginpage=loginindex.html&logintype=qzone", "&site=" + encodeURIComponent("\u767e\u5ea6"), "&appName=" + encodeURIComponent("\u767e\u5ea6"), "&summary=" + encodeURIComponent(e.content ? e.content : " "), "&title=" + encodeURIComponent(e.title ? e.title : " "), "&appId=100312028", "&action=shareToQQ", "&targetUrl=" + t, e.pic_url ? "&imageUrl=" + e.pic_url : "", "&t=" + Box.getId()].join("")
                },
                getHref: function(e) {
                    var t = e.content || "",
                        i = e.pic_url || "",
                        n = e.url || "",
                        a = e.u || e.url,
                        o = e.title,
                        r = encodeURIComponent(this._order.join(","));
                    t.length > 140 && (t = t.substring(0, 140));
                    var s = {},
                        d = this;
                    return Box.each(e.mediaes, function(c) {
                        var l = "";
                        "mail" === c.media_type ? l = d.getEmailHref(t, d._getUrl(e, "mail")) : "sms" === c.media_type ? l = d.getSMSHref(t, d._getUrl(e, "sms")) : "qqdenglu" === c.media_type ? l = d.getQQHref(e) : (l = "//openapi.baidu.com/social/widget/share?method=share&media_type=" + c.media_type + "&client_id=" + e.client_id + "&url=" + n + "&pic_url=" + i + "&content=" + encodeURIComponent(t) + "&u=" + a, !e.afterInit && (l += "&enabled_medias=" + r), o && (l += "&title=" + encodeURIComponent(o))), s[c.media_type] = l
                    }), s
                },
                _getMedia: function(e) {
                    if ("sms" === e && Box.os.ios) return null;
                    var t = baidu.socShare.acc._mediaes;
                    return t[e]
                },
                _filterMediaesOrder: function(e) {
                    var t = [],
                        i = baidu.socShare.acc._mediaes;
                    if (e && e.length)
                        for (var n = 0, a = e.length; a > n; n++) {
                            var o = e[n];
                            i[o].selected = !1, i[o] && !i[o].selected && (t.push(o), i[o].selected = !0)
                        }
                    return !t.length && (t = this._defaultOrder), t
                },
                _getShowMediaes: function(e) {
                    this._order = [], e = this._filterMediaesOrder(e);
                    for (var t = [], i = 0, n = e.length; n > i; i++) {
                        var a = e[i],
                            o = this._getMedia(a);
                        o && (("sms" !== a || "mail" !== a) && this._order.push(a), t.push(o))
                    }
                    return t
                },
                _render: function(e) {
                    baidu.socShare.ui.render(e)
                },
                _getUrl: function(e, t) {
                    var i = e.shortLinks || {};
                    return i[t] || e.url
                },
                init: function(e) {
                    var t = this;
                    e.time = (new Date).getTime(), e.mediaes = this._getShowMediaes(e.order);
                    var i = function(e) {
                        e.href = t.getHref(e), t._render(e)
                    };
                    e.shortLink && "init" === e.shortLink ? this.getShortLink(e, function() {
                        i(e)
                    }) : i(e)
                }
            })
        }();
    var soc = baidu.socShare;
    Box("_socShare", {
        ui: soc.ui,
        init: function(e) {
            return e || Box.isObject(e) ? (e && !e.url && (e.url = encodeURIComponent(location.href)), void soc.acc.init(e)) : (alert("\u8bf7\u53c2\u7167\u6587\u6863\u586b\u5199\u4e2a\u914d\u7f6e\u5427"), !1)
        },
        close: function() {
            soc.ui.close()
        },
        destroy: function() {
            soc.ui.destroy()
        }
    })
}(window, document);
