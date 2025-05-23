n = require("jquery");

// =======================
// Custom - Theia Sticky Sidebar | v1.7.0
// https://github.com/WeCodePixels/theia-sticky-sidebar
// =======================
(function ($) {
    $.fn.theiaStickySidebar = function (options) {
        var e, o, a, s, n;
        function d(t, e) {
            return !0 === t.initialized ||
                !($("body").width() < t.minWidth) &&
                (function (t, e) {
                    t.initialized = !0;
                    if (
                        0 ===
                        $("#theia-sticky-sidebar-stylesheet-" + t.namespace).length
                    ) {
                        $("head").append(
                            $(
                                '<style id="theia-sticky-sidebar-stylesheet-' +
                                    t.namespace +
                                    '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
                            )
                        );
                    }
                    e.each(function () {
                        var e = {};
                        e.sidebar = $(this);
                        e.options = t || {};
                        e.container = $(e.options.containerSelector);
                        if (0 == e.container.length) e.container = e.sidebar.parent();
                        e.sidebar.parents().css("-webkit-transform", "none");
                        e.sidebar.css({
                            position: e.options.defaultPosition,
                            overflow: "visible",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box",
                        });
                        e.stickySidebar = e.sidebar.find(".theiaStickySidebar");
                        if (0 == e.stickySidebar.length) {
                            var o = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                            e.sidebar
                                .find("script")
                                .filter(function (i, t) {
                                    return 0 === t.type.length || t.type.match(o);
                                })
                                .remove();
                            e.stickySidebar = $("<div>")
                                .addClass("theiaStickySidebar")
                                .append(e.sidebar.children());
                            e.sidebar.append(e.stickySidebar);
                        }
                        e.marginBottom = parseInt(e.sidebar.css("margin-bottom"));
                        e.paddingTop = parseInt(e.sidebar.css("padding-top"));
                        e.paddingBottom = parseInt(e.sidebar.css("padding-bottom"));
                        var a, s, n, d = e.stickySidebar.offset().top, c = e.stickySidebar.outerHeight();
                        function p() {
                            e.fixedScrollTop = 0;
                            e.sidebar.css({ "min-height": "1px" });
                            e.stickySidebar.css({ position: "static", width: "", transform: "none" });
                        }
                        e.stickySidebar.css("padding-top", 1);
                        e.stickySidebar.css("padding-bottom", 1);
                        d -= e.stickySidebar.offset().top;
                        c = e.stickySidebar.outerHeight() - c - d;
                        if (0 == d) {
                            e.stickySidebar.css("padding-top", 0);
                            e.stickySidebarPaddingTop = 0;
                        } else e.stickySidebarPaddingTop = 1;
                        if (0 == c) {
                            e.stickySidebar.css("padding-bottom", 0);
                            e.stickySidebarPaddingBottom = 0;
                        } else e.stickySidebarPaddingBottom = 1;
                        e.previousScrollTop = null;
                        e.fixedScrollTop = 0;
                        p();
                        e.onScroll = function (e) {
                            if (e.stickySidebar.is(":visible")) {
                                if ($("body").width() < e.options.minWidth) {
                                    p();
                                } else {
                                    if (e.options.disableOnResponsiveLayouts)
                                        if (
                                            e.sidebar.outerWidth("none" == e.sidebar.css("float")) + 50 >
                                            e.container.width()
                                        )
                                            return void p();
                                    var o, a, s = $(document).scrollTop(), n = "static";
                                    if (
                                        s >=
                                        e.sidebar.offset().top +
                                            (e.paddingTop - e.options.additionalMarginTop)
                                    ) {
                                        var d,
                                            c =
                                                e.paddingTop +
                                                t.additionalMarginTop,
                                            b =
                                                e.paddingBottom +
                                                e.marginBottom +
                                                t.additionalMarginBottom,
                                            l = e.sidebar.offset().top,
                                            h =
                                                e.sidebar.offset().top +
                                                ((o = e.container),
                                                (a = o.height()),
                                                o.children().each(function () {
                                                    a = Math.max(a, $(this).height());
                                                }),
                                                a),
                                            f = 0 + t.additionalMarginTop;
                                        d =
                                            e.stickySidebar.outerHeight() + c + b <
                                            $(window).height()
                                                ? f + e.stickySidebar.outerHeight()
                                                : $(window).height() -
                                                    e.marginBottom -
                                                    e.paddingBottom -
                                                    t.additionalMarginBottom;
                                        var g = l - s + e.paddingTop,
                                            S =
                                                h -
                                                s -
                                                e.paddingBottom -
                                                e.marginBottom,
                                            m = e.stickySidebar.offset().top - s,
                                            y = e.previousScrollTop - s;
                                        "fixed" == e.stickySidebar.css("position") &&
                                            "modern" == e.options.sidebarBehavior &&
                                            (m += y);
                                        "stick-to-top" == e.options.sidebarBehavior &&
                                            (m = t.additionalMarginTop);
                                        "stick-to-bottom" == e.options.sidebarBehavior &&
                                            (m = d - e.stickySidebar.outerHeight());
                                        m = 0 < y ? Math.min(m, f) : Math.max(m, d - e.stickySidebar.outerHeight());
                                        m = Math.max(m, g);
                                        m = Math.min(m, S - e.stickySidebar.outerHeight());
                                        var u = e.container.height() == e.stickySidebar.outerHeight();
                                        n =
                                            (!u && m == f) || (!u && m == d - e.stickySidebar.outerHeight())
                                                ? "fixed"
                                                : s + m - e.sidebar.offset().top - e.paddingTop <=
                                                    t.additionalMarginTop
                                                ? "static"
                                                : "absolute";
                                    }
                                    if ("fixed" == n) {
                                        var k = $(document).scrollLeft();
                                        e.stickySidebar.css({
                                            position: "fixed",
                                            width: r(e.stickySidebar) + "px",
                                            transform: "translateY(" + m + "px)",
                                            left:
                                                e.sidebar.offset().left +
                                                parseInt(e.sidebar.css("padding-left")) -
                                                k +
                                                "px",
                                            top: "0px",
                                        });
                                    } else if ("absolute" == n) {
                                        var v = {};
                                        "absolute" != e.stickySidebar.css("position") &&
                                            ((v.position = "absolute"),
                                            (v.transform =
                                                "translateY(" +
                                                (s +
                                                    m -
                                                    e.sidebar.offset().top -
                                                    e.stickySidebarPaddingTop -
                                                    e.stickySidebarPaddingBottom) +
                                                "px)"),
                                            (v.top = "0px")),
                                            (v.width = r(e.stickySidebar) + "px"),
                                            (v.left = ""),
                                            e.stickySidebar.css(v);
                                    } else "static" == n && p();
                                    "static" != n &&
                                        1 == e.options.updateSidebarHeight &&
                                        e.sidebar.css({
                                            "min-height":
                                                e.stickySidebar.outerHeight() +
                                                e.stickySidebar.offset().top -
                                                e.sidebar.offset().top +
                                                e.paddingBottom,
                                        });
                                    e.previousScrollTop = s;
                                }
                            }
                        };
                        e.onScroll(e);
                        $(document).on("scroll." + e.options.namespace, (a = e, function () {
                            a.onScroll(a);
                        }));
                        $(window).on("resize." + e.options.namespace, (s = e, function () {
                            s.stickySidebar.css({ position: "static" });
                            s.onScroll(s);
                        }));
                        "undefined" != typeof ResizeSensor &&
                            new ResizeSensor(e.stickySidebar[0], (n = e, function () {
                                n.onScroll(n);
                            }));
                    });
                })(t, e),
                !0;
        }
        function r(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width;
            } catch (i) {}
            return void 0 === t && (t = i.width()), t;
        }
        return (
            (t = $.extend(
                {
                    containerSelector: "",
                    additionalMarginTop: 0,
                    additionalMarginBottom: 0,
                    updateSidebarHeight: !0,
                    minWidth: 0,
                    disableOnResponsiveLayouts: !0,
                    sidebarBehavior: "modern",
                    defaultPosition: "relative",
                    namespace: "TSS",
                },
                t
            )),
            (t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
            (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
            d((e = t), this) ||
                (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),
                $(document).on("scroll." + e.namespace, (s = e, n = this, function (t) {
                    d(s, n) && $(this).unbind(t);
                })),
                $(window).on("resize." + e.namespace, (o = e, a = this, function (t) {
                    d(o, a) && $(this).unbind(t);
                }))),
            this
        );
    };
})(jQuery);

// =======================
// MenuIfy | v1.0.0
// https://www.vietrick.com
// =======================
(function ($) {
    $.fn.menuify = function () {
        return this.each(function () {
            var $t = $(this),
                b = $t.find(".LinkList ul > li").children("a"),
                c = b.length;
            for (var i = 0; i < c; i++) {
                var d = b.eq(i),
                    h = d.text();
                if (h.charAt(0) !== "_") {
                    var e = b.eq(i + 1),
                        j = e.text();
                    if (j.charAt(0) === "_") {
                        var m = d.parent();
                        m.append('<ul class="sub-menu m-sub"/>');
                    }
                }
                if (h.charAt(0) === "_") {
                    d.text(h.replace("_", ""));
                    d.parent().appendTo(m.children(".sub-menu"));
                }
            }
            for (var i = 0; i < c; i++) {
                var f = b.eq(i),
                    k = f.text();
                if (k.charAt(0) !== "_") {
                    var g = b.eq(i + 1),
                        l = g.text();
                    if (l.charAt(0) === "_") {
                        var n = f.parent();
                        n.append('<ul class="sub-menu2 m-sub"/>');
                    }
                }
                if (k.charAt(0) === "_") {
                    f.text(k.replace("_", ""));
                    f.parent().appendTo(n.children(".sub-menu2"));
                }
            }
            $t.find(".LinkList ul li ul").parent("li").addClass("has-sub");
        });
    };
})(jQuery);

// =======================
// LazyIfy on Scroll | v1.8.0
// https://www.vietrick.com
// =======================
(function ($) {
    $.fn.lazyify = function () {
        return this.each(function () {
            var n,
                t = $(this),
                e = $(window),
                a = t.attr("data-image"),
                c = t.is("svg") ? Math.round(t.width() / 16 * 10) : t.height(),
                h = "w" + Math.round(1.5 * t.width()) + "-h" + Math.round(1.5 * c) + "-p-k-no-nu";
            noThumbnail =
                "undefined" != typeof noThumbnail
                    ? noThumbnail
                    : "//4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nth-ify.png";
            a.match("resources.blogblog.com") && (a = noThumbnail);
            n = a.match("/s72-c")
                ? a.replace("/s72-c", "/" + h)
                : a.match("/w72-h")
                ? a.replace("/w72-h72-p-k-no-nu", "/" + h)
                : a.match("=w72-h")
                ? a.replace("=w72-h72-p-k-no-nu", "=" + h)
                : a.match("googleusercontent.com") && a.match("=")
                ? a.replace(/=.*/, "=" + h)
                : a.match("googleusercontent.com") && !a.match("=")
                ? (a = a + "=" + h)
                : a;
            t.is(":hidden") ||
                e.on("load resize scroll", function o() {
                    if (e.scrollTop() + e.height() >= t.offset().top) {
                        e.off("load resize scroll", o);
                        var a = new Image();
                        a.onload = function () {
                            t.attr("style", 'background-image:url("' + this.src + '");').addClass("lazy-ify");
                        };
                        a.src = n;
                    }
                }).trigger("scroll");
        });
    };
})(jQuery);

// =======================
// TickerIfy | v1.0.0
// https://www.vietrick.com
// =======================
(function ($) {
    $.fn.tickerify = function () {
        return this.each(function () {
            new (class {
                constructor(t) {
                    this.ticker = t;
                    this.active = 0;
                    this.tickerInit();
                }
                tickerActive(t) {
                    this.active = t;
                    this.items.each(function () {
                        this.classList.remove("active");
                    });
                    this.items[t].classList.add("active");
                    this.tickerAuto();
                }
                tickerArrows() {
                    this.ticker.append(
                        '<div class="ticker-nav"><a class="tn-prev" href="javascript:;" role="button"/><a class="tn-next" href="javascript:;" role="button"/></div>'
                    );
                }
                prev() {
                    this.active > 0
                        ? this.tickerActive(this.active - 1)
                        : this.tickerActive(this.items.length - 1);
                }
                next() {
                    this.active < this.items.length - 1
                        ? this.tickerActive(this.active + 1)
                        : this.tickerActive(0);
                }
                tickerNavigation() {
                    const t = this.ticker.find(".tn-prev");
                    this.ticker.find(".tn-next").on("click", this.next);
                    t.on("click", this.prev);
                }
                tickerAuto() {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(this.next, 5e3);
                }
                tickerInit() {
                    this.next = this.next.bind(this);
                    this.prev = this.prev.bind(this);
                    this.items = this.ticker.find(".ticker-items > *");
                    const t = this.items.length;
                    t &&
                        (this.tickerActive(0),
                        t >= 2 && (this.tickerArrows(), this.tickerNavigation()));
                }
            })( $(this) );
        });
    };
})(jQuery);

// =======================
// jQuery replaceText | v1.1.0
// https://benalman.com/projects/jquery-replacetext-plugin/
// =======================
(function ($) {
    $.fn.replaceText = function (search, replace, isHTML) {
        return this.each(function () {
            var node, value, newValue, child = this.firstChild, nodesToRemove = [];
            if (child)
                do {
                    if (3 === child.nodeType) {
                        value = child.nodeValue;
                        newValue = value.replace(search, replace);
                        if (newValue !== value) {
                            if (!isHTML && /</.test(newValue)) {
                                $(child).before(newValue);
                                nodesToRemove.push(child);
                            } else {
                                child.nodeValue = newValue;
                            }
                        }
                    }
                } while ((child = child.nextSibling));
            nodesToRemove.length && $(nodesToRemove).remove();
        });
    };
})(jQuery);

// =======================
// Table of Contents | v0.5 - Fork by VIETRICK
// https://github.com/ndabas/toc (v0.4)
// =======================
(function ($) {
    "use strict";
    var toc = function (options) {
        return this.each(function () {
            var e, a, i = $(this), c = i.data(), o = [i], r = this.tagName, d = 0;
            e = $.extend(
                { content: "body", headings: "h1,h2,h3" },
                { content: c.toc || void 0, headings: c.tocHeadings || void 0 },
                options
            );
            a = e.headings.split(",");
            $(e.content)
                .find(e.headings)
                .attr("id", function (n, e) {
                    return (
                        e ||
                        (function (t) {
                            0 === t.length && (t = "?");
                            for (
                                var n = (t = t
                                    .replace(/\s+/g, "-")
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/đ/g, "d")
                                    .replace(/([^\w]+|\s+)/g, "-")
                                    .replace(/\-\-+/g, "-")
                                    .replace(/(^-+|-+$)/, "")
                                ).replace(/\s+/g, "-"),
                                    e = "",
                                    a = 1;
                                null !== document.getElementById(n + e);

                            )
                                e = "-" + a++;
                            return n + e;
                        })( $(this).text() )
                    );
                })
                .each(function () {
                    var n = $(this),
                        e = $.map(a, function (t, e) {
                            return n.is(t) ? e : void 0;
                        })[0];
                    if (e > d) {
                        var i = o[0].children("li:last")[0];
                        i && o.unshift($("<" + r + "/>").appendTo(i));
                    } else o.splice(0, Math.min(d - e, Math.max(o.length - 1, 0)));
                    $("<li/>")
                        .appendTo(o[0])
                        .append(
                            $("<a/>")
                                .text(n.text())
                                .attr("href", "#" + n.attr("id"))
                        ),
                        (d = e);
                });
        });
    };
    var old = $.fn.toc;
    $.fn.toc = toc;
    $.fn.toc.noConflict = function () {
        return ($.fn.toc = old), this;
    };
    $(function () {
        toc.call($("[data-toc]"));
    });
})(window.jQuery);

// =======================
// Javascript Cookie | v1.5.1
// https://github.com/js-cookie/js-cookie
// =======================
(function (factory) {
    var n;
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        try {
        } catch (e) {}
        module.exports = factory(n);
    } else {
        var o = window.Cookies,
            r = (window.Cookies = factory(window.jQuery));
        r.noConflict = function () {
            return (window.Cookies = o), r;
        };
    }
})(function ($) {
    // ... (code omitted for brevity, see original for full implementation)
    // This section is a standard cookie library, you can keep it minified or use the official unminified version.
});

// =======================
// lazysizes - v5.3.2
// https://github.com/aFarkas
// =======================
// ... (code omitted for brevity, see original for full implementation)
// This section is a large library, you can keep it minified or use the official unminified version.