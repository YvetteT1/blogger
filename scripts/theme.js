var target=window.location.hash.replace("#","");

function copyFunction(){
    document.getElementById("getlink").style.display="inline-block",
    document.getElementById("getlink").select(),document.execCommand("copy"),
    document.getElementById("getlink").style.display="none",
    document.getElementById("LinkCopy").classList.add("copied"),
    setTimeout(function(){document.getElementById("LinkCopy").classList.remove("copied")},3e3)
}
    
function shortCodeIfy(e,t,a){
    for(var o=e.split("$"),r=/[^{\}]+(?=})/g,
    i=0;i<o.length;i++){var s=o[i].split("=");
    if(s[0].trim()==t)return null!=(a=s[1]).match(r)&&String(a.match(r)).trim()}return!1
}
    
function msgError(){
    return'<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'
}
    
function beforeLoader(){
    return'<div class="loader"></div>'
}

function getFeedUrl(e,t,a,o){
    switch(a){
        case"recent":o="/feeds/posts/default?alt=json&max-results="+t;
        break;
        default:o="comments"==e?"/feeds/comments/default?alt=json&max-results="+t:"/feeds/posts/default/-/"+a+"?alt=json&max-results="+t
    }
    return o
}

function getPostLink(e,t){
    for(var a=0;a<e[t].link.length;a++)
        if("alternate"==e[t].link[a].rel){
            var o=e[t].link[a].href;break
        }
    return o
}
    
function getPostTitle(e,t,a){
    return e[t].title.$t?e[t].title.$t:exportify.noTitle
}

function getPostTag(e,t,a){
    return e[t].category?'<span class="entry-category">'+e[t].category[0].term+"</span>":""
}

function getPostAuthor(e,t,a,o){
    return o=""!=exportify.postAuthorLabel?'<span class="sp">'+exportify.postAuthorLabel+"</span>":"",exportify.postAuthor?'<span class="entry-author mi">'+o+'<span class="author-name">'+e[t].author[0].name.$t+"</span></span>":""
}

function getPostDate(e,t,a,o,r,i){
    monthNames="undefined"!=typeof monthNames?monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dateFormat="undefined"!=typeof dateFormat?dateFormat:"{m} {d}, {y}";var s=e[t].published.$t,n=s.substring(0,4),l=s.substring(5,7),c=s.substring(8,10),d=dateFormat.replace("{m}",monthNames[parseInt(l,10)-1]).replace("{d}",c).replace("{y}",n);return i=exportify.postAuthor&&""!=exportify.postDateLabel?'<span class="sp">'+exportify.postDateLabel+"</span>":"",[1==exportify.postDate?'<span class="entry-time mi">'+i+'<time class="published" datetime="'+s+'">'+d+"</time></span>":"",1==exportify.postDate?'<span class="entry-time mi"><time class="published" datetime="'+s+'">'+d+"</time></span>":""]
}

function getPostMeta(e,t,a,o,r){
    if(void 0!==a[o].thr$total){
        var i="";("related"==r||"block"==r)&&a[o].thr$total.$t>0&&(i="<span class='cmt-count'>"+a[o].thr$total.$t+"</span>")
    }
    else i="";
    return[1==exportify.postAuthor||1==exportify.postDate?'<div class="entry-meta">'+e+t[0]+"</div>":"",1==exportify.postDate?'<div class="entry-meta">'+t[1]+i+"</div>":""]
}

function getFirstImage(e,t){
    var a=$("<div>").html(e).find("img:first").attr("src"),o=a.lastIndexOf("/")||0,r=a.lastIndexOf("/",o-1)||0,i=a.substring(0,r),s=a.substring(r,o),n=a.substring(o);
    return(s.match(/\/s[0-9]+/g)||s.match(/\/w[0-9]+/g)||"/d"==s)&&(s="/w72-h72-p-k-no-nu"),i+s+n
}
    
function getPostImage(e,t,a,o){
    var r=null!=e[t].content?e[t].content.$t:"";return a=e[t].media$thumbnail?e[t].media$thumbnail.url:"https://resources.blogblog.com/img/blank.gif",r.indexOf(r.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))>-1?r.indexOf("<img")>-1?r.indexOf(r.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))<r.indexOf("<img")?a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):getFirstImage(r):a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):r.indexOf("<img")>-1?getFirstImage(r):"https://resources.blogblog.com/img/blank.gif"
}

function getPostImageType(e,t){
    return e.match("i.ytimg.com")?"is-video":"is-image"
}
    
function getPostSummary(e,t,a,o,r,i){
    return e[t].content?'<span class="entry-excerpt excerpt">'+$("<div>").html(e[t].content.$t).text().trim().substr(0,a)+"…</span>":""
}

function getPostComments(e,t,a,o){
    var r=e[t].author[0].name.$t,i=e[t].author[0].gd$image.src.replace("/s113","/s72-c").replace("/s220","/s72-c"),s=e[t].title.$t;return(i.match("//img1.blogblog.com/img/blank.gif")||i.match("//img1.blogblog.com/img/b16-rounded.gif"))&&(i="//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w72-h72-p-k-no-nu/avatar.jpg"),'<div class="cmm1-item item-'+t+'"><a class="entry-inner wrap-all-link" href="'+a+'" title="'+r+'"><span class="entry-image-wrap cmm-avatar"><span class="entry-thumb" data-image="'+i+'"></span></span><div class="entry-header"><h2 class="entry-title cmm-title">'+r+'</h2><p class="cmm-snippet excerpt">'+s+"</p></div></a></div>"
}

function getAjax(e, t, a, o, r) {
    // For related posts, increment the number of results
    if (t === "related") a = parseInt(a) + 1;

    // If o is falsy, set to "geterror404"
    if (
        [
            "msimple", "ticker", "featured", "block", "grid", "video",
            "list", "default", "mini", "comments", "related"
        ].includes(t) && !o
    ) {
        o = "geterror404";
    }

    var feedUrl = getFeedUrl(t, a, o);

    $.ajax({
        url: feedUrl,
        type: "GET",
        dataType: "json",
        cache: true,
        beforeSend: function () {
            if (
                [
                    "ticker", "featured", "block", "grid", "video",
                    "list", "default", "mini", "comments", "related"
                ].includes(t)
            ) {
                e.html(beforeLoader()).parent().addClass("type-" + t);
            }
        },
        success: function (data) {
            var html = "";
            var skipIndex = -1;
            var entries = data.feed.entry;

            // For related posts, find the current post index to skip
            if (t === "related" && entries) {
                for (var n = 0; n < entries.length; n++) {
                    if (clink === entries[n].link.slice(-1)[0].href) {
                        skipIndex = n;
                        break;
                    }
                }
            }

            // Opening wrapper
            switch (t) {
                case "msimple":
                    html = '<div class="ul mega-items">';
                    break;
                case "ticker":
                    html = '<div class="ticker-items">';
                    break;
                case "featured":
                    html = '<div class="featured-items">';
                    break;
                case "block":
                case "grid":
                case "list":
                case "video":
                    html = `<div class="content-block ${t}-items">`;
                    break;
                case "default":
                    html = '<div class="default-items">';
                    break;
                case "mini":
                    html = '<div class="mini-items">';
                    break;
                case "comments":
                    html = '<div class="cmm1-items">';
                    break;
                case "related":
                    html = '<div class="related-posts">';
                    break;
            }

            if (entries) {
                for (var d = 0; d < entries.length; d++) {
                    var entry = entries[d];
                    var postLink = getPostLink(entries, d);
                    var postTitle = getPostTitle(entries, d);
                    var postTag = getPostTag(entries, d);
                    var postAuthor = getPostAuthor(entries, d);
                    var postDate = getPostDate(entries, d, postTag);
                    var postImage = getPostImage(entries, d);
                    var imageType = getPostImageType(postImage, d);
                    var postMeta = getPostMeta(postAuthor, postDate, entries, d, t);
                    var itemHtml = "";

                    switch (t) {
                        case "msimple":
                            itemHtml += `<div class="mega-item post">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                ${postMeta[1]}
                            </div>`;
                            break;
                        case "ticker":
                            itemHtml += `<div class="ticker-item item-${d}">
                                <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                            </div>`;
                            break;
                        case "featured":
                            itemHtml += `<div class="featured-item cs item-${d}">
                                <a class="featured-inner" href="${postLink}" title="${postTitle}">
                                    <span class="entry-image-wrap before-mask ${imageType}">
                                        <span class="entry-thumb" data-image="${postImage}"></span>
                                    </span>
                                    <div class="entry-header entry-info">
                                        ${postTag}
                                        <h2 class="entry-title">${postTitle}</h2>
                                        ${postMeta[0]}
                                    </div>
                                </a>
                            </div>`;
                            break;
                        case "block":
                            if (d === 1) {
                                itemHtml += `<div class="block-item item-${d}">
                                    <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                        <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                    </a>
                                    <div class="entry-header">
                                        ${postMeta[1]}
                                        <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                        ${getPostSummary(entries, d, 160)}
                                    </div>
                                </div>`;
                            } else {
                                itemHtml += `<div class="block-item item-${d}">
                                    <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                        <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                    </a>
                                    <div class="entry-header">
                                        ${postMeta[1]}
                                        <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                    </div>
                                </div>`;
                            }
                            break;
                        case "grid":
                            itemHtml += `<div class="grid-item item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a title="${postTitle}" href="${postLink}">${postTitle}</a></h2>
                                    ${postMeta[1]}
                                </div>
                            </div>`;
                            break;
                        case "list":
                            itemHtml += `<div class="list-item item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a title="${postTitle}" href="${postLink}">${postTitle}</a></h2>
                                    ${getPostSummary(entries, d, 120)}
                                    ${postMeta[0]}
                                </div>
                            </div>`;
                            break;
                        case "video":
                            itemHtml += `<div class="video-item item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap is-video" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a title="${postTitle}" href="${postLink}">${postTitle}</a></h2>
                                    ${postMeta[1]}
                                </div>
                            </div>`;
                            break;
                        case "default":
                            itemHtml += `<div class="default-item ds item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                    ${postMeta[1]}
                                </div>
                            </div>`;
                            break;
                        case "mini":
                            itemHtml += `<div class="mini-item item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                    ${postMeta[1]}
                                </div>
                            </div>`;
                            break;
                        case "comments":
                            itemHtml += getPostComments(entries, d, postLink);
                            break;
                        case "related":
                            // Skip current post in related
                            if (entries.length > 1 && (d === skipIndex || (skipIndex < 0 && d === entries.length - 1))) {
                                continue;
                            }
                            itemHtml += `<div class="related-item item-${d}">
                                <a title="${postTitle}" class="entry-image-wrap ${imageType}" href="${postLink}">
                                    <svg class="entry-thumb" width="100" height="62.5" viewBox="0 0 16 9" data-image="${postImage}"/>
                                </a>
                                <div class="entry-header">
                                    <h2 class="entry-title"><a href="${postLink}" title="${postTitle}">${postTitle}</a></h2>
                                    ${postMeta[1]}
                                </div>
                            </div>`;
                            break;
                    }
                    html += itemHtml;
                }
            } else {
                // No entries found
                if (t === "msimple") {
                    html = '<div class="ul mega-items no-items">' + msgError() + "</div>";
                } else {
                    html = msgError();
                }
            }

            // Closing wrapper and rendering
            switch (t) {
                case "msimple":
                    html += "</div>";
                    e.append(html).addClass("msimple");
                    e.find("a:first").attr("href", function () {
                        if (o === "recent") {
                            return "/search";
                        } else {
                            return "/search/label/" + o;
                        }
                    });
                    break;
                case "ticker":
                    html += "</div>";
                    e.html(html).tickerify();
                    break;
                default:
                    html += "</div>";
                    e.html(html);
            }

            // Lazy load images
            e.find("span.entry-thumb,svg.entry-thumb").lazyify();
        },
        error: function () {
            if (t === "msimple") {
                e.append('<div class="ul mega-items no-items">' + msgError() + "</div>");
            } else {
                e.html(msgError());
            }
        }
    });
}
                
function ajaxMega(element, type, results, label, shortcode) {
    if (!shortcode.match("getcontent")) {
        element.append('<div class="ul mega-items no-items">' + msgError() + "</div>");
        return;
    }
    if (type === "msimple") {
        return getAjax(element, type, results, label);
    }
    element.append('<div class="ul mega-items no-items">' + msgError() + "</div>");
}

function ajaxTicker(element, type, results, label, shortcode) {
    if (!shortcode.match("getcontent")) {
        element.html(msgError());
        return;
    }
    if (type === "ticker") {
        return getAjax(element, type, results, label);
    }
    element.html(msgError());
}

function ajaxFeatured(element, type, results, label, shortcode) {
    if (!shortcode.match("getcontent")) {
        element.html(msgError());
        return;
    }
    if (type === "featured") {
        return getAjax(element, type, results, label);
    }
    element.html(msgError());
}

function ajaxBlock(element, type, results, label, shortcode, o, s) {
    if (!shortcode.match("getcontent")) {
        element.html(msgError());
        return;
    }
    if (type === "block" || type === "grid" || type === "list" || type === "video") {
        if (label) {
            o = (label === "recent") ? "/search" : "/search/label/" + label;
            s = viewAllText && viewAllText.trim() ? viewAllText : exportify.viewAll;
            element.parent().find(".widget-title").append('<a href="' + o + '" class="wt-l">' + s + "</a>");
        }
        return getAjax(element, type, results, label);
    }
    element.html(msgError());
}

function ajaxWidget(element, type, results, label, shortcode) {
    if (!shortcode.match("getcontent")) {
        element.html(msgError());
        return;
    }
    if (type === "default" || type === "mini" || type === "comments") {
        return getAjax(element, type, results, label);
    }
    element.html(msgError());
}

function ajaxRelated(element, type, results, label, extra) {
    return getAjax(element, type, results, label, extra);
}

function disqusComments(e){
    var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//"+e+".disqus.com/blogger_item.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)
}
 
function beautiAvatar(e){
    $(e).attr("src", function(e,t){return(t=(t=t.replace("//resources.blogblog.com/img/blank.gif","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("/s35","/s39")})}

function fixedSidebarIfy(selector) {
    $(selector).each(function () {
        // Use global fixedSidebar/fixedMenu if defined, otherwise default to true
        var isFixedSidebar = typeof fixedSidebar === "undefined" ? true : fixedSidebar;
        if (isFixedSidebar) {
            var marginTop = (typeof fixedMenu !== "undefined" && fixedMenu) ? 89 : 30;
            $(this).theiaStickySidebar({
                containerSelector: "#content-wrapper > .container",
                additionalMarginTop: marginTop,
                additionalMarginBottom: 30
            });
        }
    });
}

// Reset hash on load
window.location.hash = "";

// Smooth scroll for anchor links and hash on load
$(window).on("load", function () {
    if (target) {
        $("html, body").animate({ scrollTop: $("#" + target).offset().top }, 700, "swing");
    }
    $('a[href*="#"]:not(".tocify-wrap a")').on("click", function (e) {
        let hash = this.hash;
        let linkUrl = new URL(this.href);
        let currentUrl = new URL(window.location.href);
        linkUrl.hash = "";
        currentUrl.hash = "";
        if (hash && $(hash).length && linkUrl.href === currentUrl.href) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(hash).offset().top - 10 }, 750);
        }
    });
});

// Set global variables with fallback
var fixedMenu = typeof fixedMenu === "undefined" ? true : fixedMenu;
var viewAllText = typeof viewAllText !== "undefined" ? viewAllText : exportify.viewAll;

// Menu initialization
$("#vtrick-pro-main-nav").menuify();
$("#vtrick-pro-main-nav .widget").addClass("show-menu");

// Search open/close
$(".show-search").on("click", function () {
    $("body").addClass("search-active");
    $("#main-search-wrap").fadeIn(170).find("input").focus();
});
$(".search-close").on("click", function () {
    $("body").removeClass("search-active");
    $("#main-search-wrap").fadeOut(170).find("input").blur();
});

// Dark mode toggle
$("html").each(function () {
    var $html = $(this);
    var darkModeEnabled = typeof darkMode !== "undefined" && darkMode;
    var userDarkMode = typeof userDarkMode === "undefined" ? true : userDarkMode;
    if (!darkModeEnabled && userDarkMode) {
        if (localStorage.themeColor === "dark") $html.addClass("is-dark");
        $(".darkmode-toggle").on("click", function () {
            if (localStorage.themeColor !== "dark") {
                $html.addClass("is-dark");
                localStorage.themeColor = "dark";
            } else {
                $html.removeClass("is-dark");
                localStorage.themeColor = "light";
            }
        });
    }
});

// Ticker
$("#ticker .PopularPosts .widget-content").tickerify();

// Update "View All" text
$(".bp-title a.wt-l").each(function () {
    if (viewAllText.trim() !== "") $(this).text(viewAllText);
});

// Social icons: append text from hash
$(".sidebar .social-icons li a").each(function () {
    var $a = $(this);
    var parts = $a.attr("href").split("#");
    if (parts[1] && parts[1].trim() !== "") {
        $a.append('<span class="text">' + parts[1].trim() + "</span>");
    }
    $a.attr("href", parts[0].trim());
});

// FollowByEmail widget: set title/text from shortcode
$(".FollowByEmail .widget-content").each(function () {
    var $el = $(this);
    var shortcode = $el.data("shortcode");
    if (shortcode != null) {
        var title = shortCodeIfy(shortcode, "title");
        var text = shortCodeIfy(shortcode, "text");
        if (title) $el.find(".follow-by-email-title").text(title);
        if (text) $el.find(".follow-by-email-text").text(text);
    }
});

// Post-body buttons
$(".post-body a").each(function () {
    var $a = $(this);
    var html = $a.html();
    var lower = html.toLowerCase();
    var text = shortCodeIfy(html, "text");
    var icon = shortCodeIfy(html, "icon");
    var color = shortCodeIfy(html, "color");
    if (lower.match("getbutton") && text) {
        $a.addClass("button btn").text(text);
        if (icon) $a.addClass(icon);
        if (color) $a.addClass("colored-button").attr("style", "background-color:" + color + ";");
    }
});

// Post-body: replace b tags with special widgets
$(".post-body b").each(function () {
    var $b = $(this);
    var txt = $b.text().toLowerCase().trim();
    if (txt.match("{contactform}")) {
        $b.replaceWith('<div class="contact-form"/>');
        $(".contact-form").append($("#ContactForm1"));
    }
    if (txt.match("{leftsidebar}")) {
        $("body").addClass("is-left");
        $b.remove();
    }
    if (txt.match("{rightsidebar}")) {
        $("body").addClass("is-right").removeClass("is-left");
        $b.remove();
    }
    if (txt.match("{fullwidth}")) {
        $("body").addClass("no-sidebar");
        $b.remove();
    }
});

// Move ad widgets to new locations
$("#vtrick-pro-new-before-ad").each(function () {
    var $el = $(this);
    if ($el.length) $("#before-ad").appendTo($el);
});
$("#vtrick-pro-new-after-ad").each(function () {
    var $el = $(this);
    if ($el.length) $("#after-ad").appendTo($el);
});
$("#vtrick-pro-main-before-ad .widget").each(function () {
    var $el = $(this);
    if ($el.length) $el.appendTo($("#before-ad"));
});
$("#vtrick-pro-main-after-ad .widget").each(function () {
    var $el = $(this);
    if ($el.length) $el.appendTo($("#after-ad"));
});
$("#vtrick-pro-post-footer-ads .widget").each(function () {
    var $el = $(this);
    if ($el.length) $el.appendTo($("#post-footer-ads"));
});

// Post-body: blockquote to alert/code widgets
$(".post-body blockquote").each(function () {
    var $bq = $(this);
    var txt = $bq.text().toLowerCase().trim();
    var html = $bq.html();
    if (txt.match("{alertsuccess}")) {
        $bq.replaceWith('<div class="alert-message alert-success">' + html.replace("{alertSuccess}", "") + "</div>");
    }
    if (txt.match("{alertinfo}")) {
        $bq.replaceWith('<div class="alert-message alert-info">' + html.replace("{alertInfo}", "") + "</div>");
    }
    if (txt.match("{alertwarning}")) {
        $bq.replaceWith('<div class="alert-message alert-warning">' + html.replace("{alertWarning}", "") + "</div>");
    }
    if (txt.match("{alerterror}")) {
        $bq.replaceWith('<div class="alert-message alert-error">' + html.replace("{alertError}", "") + "</div>");
    }
    if (txt.match("{codebox}")) {
        $bq.replaceWith('<pre class="code-box">' + html.replace("{codeBox}", "") + "</pre>");
    }
});

// Post-body: pre with lang attribute
$(".post-body pre").each(function () {
    var $pre = $(this);
    var html = $pre.html();
    var lang = $pre.attr("lang") || "html";
    if ($pre.is("[lang]")) {
        $pre.replaceWith('<pre class="language-' + lang + '"><code>' + html + "</code></pre>");
    }
});

// Share links: open in window
$(".entry-share-links .window-ify, .post-share .window-ify").on("click", function () {
    var $el = $(this);
    var url = $el.data("url");
    var width = $el.data("width");
    var height = $el.data("height");
    var left = Math.round(window.screen.width / 2 - width / 2);
    var top = Math.round(window.screen.height / 2 - height / 2);
    window.open(
        url,
        "_blank",
        "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" +
            width +
            ",height=" +
            height +
            ",left=" +
            left +
            ",top=" +
            top
    ).focus();
});

// Share links: show/hide
$(".vtrick-pro-share-links").each(function () {
    var $el = $(this);
    $el.find(".show-hid a").on("click", function () {
        $el.toggleClass("show-hidden");
    });
});

// About author: convert links to social list
$(".about-author .author-text").each(function () {
    var $el = $(this);
    var $links = $el.find("a");
    $links.each(function () {
        var $a = $(this);
        var text = $a.text().trim();
        var href = $a.attr("href");
        $a.replaceWith('<li class="' + text + '"><a href="' + href + '" title="' + text + '" rel="noopener noreferrer" target="_blank"/></li>');
    });
    if ($links.length) {
        $el.parent().append('<ul class="author-links social social-color"></ul>');
        $el.find("li").appendTo(".author-links");
    }
});

// Mega menu: AJAX load
$("#vtrick-pro-main-nav-menu li.mega-menu").each(function () {
    var $el = $(this);
    var shortcode = $el.find("a").data("shortcode");
    if (shortcode != null) {
        var label = shortCodeIfy(shortcode, "label");
        ajaxMega($el, "msimple", 5, label, shortcode.toLowerCase());
    }
});

// Ticker AJAX load on scroll
$("#ticker .HTML .widget-content").each(function () {
    var $el = $(this);
    var $win = $(window);
    var shortcode = $el.data("shortcode");
    if (shortcode != null) {
        var results = shortCodeIfy(shortcode, "results");
        var label = shortCodeIfy(shortcode, "label");
        var mtc = shortcode.toLowerCase();
        $win.on("load resize scroll", function handler() {
            if ($win.scrollTop() + $win.height() >= $el.offset().top) {
                $win.off("load resize scroll", handler);
                ajaxTicker($el, "ticker", results, label, mtc);
            }
        }).trigger("scroll");
    }
});

// Featured AJAX load on scroll
$("#featured .HTML .widget-content").each(function () {
    var $el = $(this);
    var $win = $(window);
    var shortcode = $el.data("shortcode");
    if (shortcode != null) {
        var label = shortCodeIfy(shortcode, "label");
        var mtc = shortcode.toLowerCase();
        $win.on("load resize scroll", function handler() {
            if ($win.scrollTop() + $win.height() >= $el.offset().top) {
                $win.off("load resize scroll", handler);
                ajaxFeatured($el, "featured", 3, label, mtc);
            }
        }).trigger("scroll");
    }
});

// Content-section AJAX block/grid/list/video
$(".content-section .HTML .widget-content").each(function () {
    var $el = $(this);
    var $win = $(window);
    var shortcode = $el.data("shortcode");
    if (shortcode != null) {
        var results = shortCodeIfy(shortcode, "results");
        var label = shortCodeIfy(shortcode, "label");
        var type = shortCodeIfy(shortcode, "type");
        var mtc = shortcode.toLowerCase();
        $win.on("load resize scroll", function handler() {
            if ($win.scrollTop() + $win.height() >= $el.offset().top) {
                $win.off("load resize scroll", handler);
                ajaxBlock($el, type, results, label, mtc);
            }
        }).trigger("scroll");
    }
});

// Widget ready AJAX
$(".vtrick-pro-widget-ready .HTML .widget-content").each(function () {
    var $el = $(this);
    var $win = $(window);
    var shortcode = $el.data("shortcode");
    if (shortcode != null) {
        var results = shortCodeIfy(shortcode, "results");
        var label = shortCodeIfy(shortcode, "label");
        var type = shortCodeIfy(shortcode, "type");
        var mtc = shortcode.toLowerCase();
        $win.on("load resize scroll", function handler() {
            if ($win.scrollTop() + $win.height() >= $el.offset().top) {
                $win.off("load resize scroll", handler);
                ajaxWidget($el, type, results, label, mtc);
            }
        }).trigger("scroll");
    }
});

// Related posts AJAX
$("#vtrick-pro-related-posts .HTML").each(function () {
    var metaArr = [];
    $(".vtrick-pro-related-content meta").each(function () {
        metaArr.push($(this).attr("content"));
    });
    var shortcode = $(this).data("shortcode");
    if (shortcode != null) {
        function getTitleResults() {
            return [
                shortCodeIfy(shortcode, "title"),
                shortCodeIfy(shortcode, "results")
            ];
        }
        $("#related-wrap").each(function () {
            var $wrap = $(this);
            var $win = $(window);
            var $content = $wrap.find(".vtrick-pro-related-content");
            var [title, results] = getTitleResults();
            var count = results ? results : 3;
            if (title) $wrap.find(".related-title .title > span").text(title);
            var label = $wrap.find(".related-tag").data("label");
            $win.on("load resize scroll", function handler() {
                if ($win.scrollTop() + $win.height() >= $content.offset().top) {
                    $win.off("load resize scroll", handler);
                    ajaxRelated($content, "related", count, label, metaArr);
                }
            }).trigger("scroll");
        });
    }
});

// Comments system switcher
$(".vtrick-pro-blog-post-comments").each(function () {
    var $el = $(this);
    var shortcode = $el.data("shortcode");
    var type = shortCodeIfy(shortcode, "type");
    var systemClass = "comments-system-" + type;
    var $reply = $el.find("#top-continue .comment-reply");
    switch (type) {
        case "disqus":
            var shortname = shortCodeIfy(shortcode, "shortname");
            if (shortname) disqus_shortname = shortname;
            disqusComments(disqus_shortname);
            $el.addClass(systemClass).show();
            break;
        case "facebook":
            $el.addClass(systemClass)
                .find("#comments")
                .html('<div class="fb-comments" data-width="100%" data-href="' + disqus_blogger_current_url + '" order_by="time" data-numposts="5" data-lazy="true"></div>');
            $el.show();
            break;
        case "hide":
            $el.hide();
            break;
        default:
            $el.addClass("comments-system-blogger").show();
            $(".entry-meta .entry-comments-link").addClass("show");
            $reply.addClass("btn");
    }
});

// Lazy load images and mobile menu
$(function () {
    $(".entry-image-wrap .entry-thumb, .author-avatar-wrap .author-avatar, #particle, .ratio-16-10").lazyify();

    // Mobile menu
    $("#vtrick-pro-mobile-menu").each(function () {
        var $menu = $(this);
        var $mainNav = $("#vtrick-pro-main-nav-menu").clone();
        $mainNav.attr("id", "main-mobile-nav");
        $mainNav.find(".mega-items").remove();
        $mainNav.find(".mega-menu > a").each(function () {
            var $a = $(this);
            var shortcode = $a.data("shortcode");
            if (shortcode != null) {
                var label = shortCodeIfy(shortcode.trim(), "label");
                var href = label === "recent" ? "/search" : "/search/label/" + label;
                $a.attr("href", href);
            }
        });
        $mainNav.appendTo($menu);

        $(".mobile-menu-toggle, .hide-vtrick-pro-mobile-menu, .overlay").on("click", function () {
            $("body").toggleClass("nav-active");
        });

        $(".vtrick-pro-mobile-menu .has-sub").append('<div class="submenu-toggle"/>');
        $(".vtrick-pro-mobile-menu .mega-menu").find(".submenu-toggle").remove();
        $(".vtrick-pro-mobile-menu ul li .submenu-toggle").on("click", function (e) {
            var $parent = $(this).parent();
            if ($parent.hasClass("has-sub")) {
                e.preventDefault();
                if ($parent.hasClass("show")) {
                    $parent.removeClass("show").find("> .m-sub").slideToggle(170);
                } else {
                    $parent.addClass("show").children(".m-sub").slideToggle(170);
                }
            }
        });
    });

    // Footer social/menu
    $(".mm-footer .mm-social").each(function () {
        var $el = $(this);
        var $social = $("#vtrick-pro-about-section ul.social").clone();
        $social.removeClass("social-bg-hover");
        $social.appendTo($el);
    });
    $(".mm-footer .mm-menu").each(function () {
        var $el = $(this);
        $("#footer-menu ul.link-list").clone().appendTo($el);
    });

    // Header fixed on scroll
    $(".header-inner").each(function () {
        var $header = $(this);
        if (fixedMenu && $header.length > 0) {
            var lastScroll = $(document).scrollTop();
            var offset = $header.offset().top;
            var height = $header.height();
            var limit = offset + height * 2;
            $(window).scroll(function () {
                var scroll = $(document).scrollTop();
                if (scroll > limit) {
                    $header.addClass("is-fixed");
                } else if (scroll < offset || scroll <= 1) {
                    $header.removeClass("is-fixed");
                }
                if (scroll > lastScroll) {
                    $header.removeClass("show");
                } else {
                    $header.addClass("show");
                }
                lastScroll = scroll;
            });
        }
    });

    // Fixed sidebar
    fixedSidebarIfy("#main-wrapper, #sidebar-wrapper");

    // Responsive YouTube iframes
    $("#post-body iframe").each(function () {
        var $iframe = $(this);
        if ($iframe.attr("src").match("www.youtube.com")) {
            $iframe.wrap('<div class="responsive-video-wrap"/>');
        }
    });

    // Comment content: replace image/video links
    $("p.comment-content").each(function () {
        var $p = $(this);
        $p.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>');
        $p.replaceText(
            /(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,
            '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" class="lazyload" data-src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
        );
    });

    // Load more posts
    $("#vtrick-pro-load-more-link").each(function () {
        var loadUrl = $(this).data("load");
        if (loadUrl) $("#vtrick-pro-load-more-link").show();
        $("#vtrick-pro-load-more-link").on("click", function (e) {
            $("#vtrick-pro-load-more-link").hide();
            $.ajax({
                url: loadUrl,
                success: function (data) {
                    var $posts = $(data).find(".blog-posts");
                    $posts.find(".index-post").addClass("post-animated post-fadeInUp");
                    $(".blog-posts").append($posts.html());
                    var nextUrl = $(data).find("#vtrick-pro-load-more-link").data("load");
                    if (nextUrl) {
                        $("#vtrick-pro-load-more-link").show();
                    } else {
                        $("#vtrick-pro-load-more-link").hide();
                        $("#blog-pager .no-more").addClass("show");
                    }
                },
                beforeSend: function () {
                    $("#blog-pager .loading").show();
                },
                complete: function () {
                    $("#blog-pager .loading").hide();
                    $(".index-post .entry-image-wrap .entry-thumb, .author-avatar-wrap .author-avatar").lazyify();
                    fixedSidebarIfy("#main-wrapper");
                }
            });
            e.preventDefault();
        });
    });

    // Cookie consent
    $("#vtrick-pro-cookie-ify").each(function () {
        var $el = $(this);
        var shortcode = $el.find(".widget.Text").data("shortcode");
        var ok, days;
        if (shortcode != null) {
            ok = shortCodeIfy(shortcode, "ok");
            days = shortCodeIfy(shortcode, "days");
            if (ok) $el.find("#vtrick-pro-cookie-ify-accept").text(ok);
            days = days ? Number(days) : 7;
        }
        if ($el.length > 0) {
            if ($.cookie("vtrick_pro_cookie_ify_consent") !== "1") {
                $el.css("display", "block");
                $(window).on("load", function () {
                    $el.addClass("is-visible");
                });
            }
            $("#vtrick-pro-cookie-ify-accept")
                .off("click")
                .on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $.cookie("vtrick_pro_cookie_ify_consent", "1", { expires: days, path: "/" });
                    $el.removeClass("is-visible");
                    setTimeout(function () {
                        $el.css("display", "none");
                    }, 500);
                });
            cookieChoices = {};
        }
    });

    // Back to top button
    $("#back-top").each(function () {
        var $btn = $(this);
        $(window).on("scroll", function () {
            var winHeight = window.innerHeight;
            var $cta = $("#vtrick-pro-cta2-section ul.cta-containter");
            if ($(this).scrollTop() >= 100) {
                $btn.fadeIn(170);
                if (!$cta.hasClass("has-backtop")) {
                    $cta.animate({ bottom: "+=46px" }, 170);
                    $cta.addClass("has-backtop");
                }
            } else {
                $btn.fadeOut(170);
                if ($cta.hasClass("has-backtop")) {
                    $cta.animate({ bottom: "-=46px" }, 170);
                    $cta.removeClass("has-backtop");
                }
            }
            if ($btn.hasClass("on-footer") && !$cta.hasClass("get-footer")) {
                $cta.animate({ bottom: "-=46px" }, 170);
                $cta.addClass("get-footer");
            }
            if (!$btn.hasClass("on-footer") && $cta.hasClass("get-footer")) {
                $cta.animate({ bottom: "+=46px" }, 170);
                $cta.removeClass("get-footer");
            }
            if ($(this).scrollTop() + winHeight >= $("#footer-wrapper").offset().top + 36) {
                $btn.addClass("on-footer");
            } else {
                $btn.removeClass("on-footer");
            }
        });
        $btn.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
        });
    });
});