(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};


    // profile.jade compiled template
    templatizer["profile"] = function tmpl_profile(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(user) {
            buf.push('<div class="col-md-2 col-md-offset-1"><ul class="nav nav-pills nav-stacked"><li role="presentation" class="active"><a href="#navigation-user-data" aria-controls="navigation-user-data" role="tab" data-toggle="tab">Profile Data</a></li><li role="presentation"><a href="#navigation-profile-image" aria-controls="navigation-profile-image" role="tab" data-toggle="tab">Profile Image</a></li></ul></div><div class="col-md-4 col-md-offset-1"><div class="col-md-12"><div class="tab-content"><div id="navigation-user-data" role="tabpanel" class="fade in active tab-pane"><div class="row"><div class="col-md-6 col-md-offset-3"><div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">User Profile Data</h4></div><div class="panel-body"><h6>' + jade.escape(null == (jade_interp = "Username: " + user.first + " " + user.last) ? "" : jade_interp) + "</h6><h6>" + jade.escape(null == (jade_interp = "Email: " + user.email) ? "" : jade_interp) + '</h6></div></div></div></div></div><div id="navigation-profile-image" role="tabpanel" class="fade tab-pane"><div class="row"><div class="col-md-6 col-md-offset-3"><div id="users-uploadbox"><h2>Upload New User Image</h2><span id="users-uploadarea"><label for="users-filebox" style="font-family:Calibri;font-size:18px">Choose an image:</label><input id="users-filebox" type="file" accept="image/*"/><br/><div class="input-group"><input id="users-namebox" type="text" disabled="disabled" class="form-control input-sm"/><span class="input-group-btn"><button id="users-uploadbtn" type="button" disabled="true"' + jade.attr("data-userid", user.id, true, false) + ' class="btn btn-sm btn-success">Upload</button></span></div></span></div></div></div></div></div></div></div><div class="col-md-2 col-md-offset-1"><img id="users-form-image"' + jade.attr("src", user.image ? user.image : "/images/default-user-image.png", true, false) + ' alt="Profile Image" class="img img-responsive"/></div>');
        }).call(this, "user" in locals_for_with ? locals_for_with.user : typeof user !== "undefined" ? user : undefined);
        return buf.join("");
    };

    // users.jade compiled template
    templatizer["users"] = function tmpl_users(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(users) {
            buf.push('<table class="table table-hover"><thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th></tr></thead><tbody>');
            for (var i = 0; i < users.length; i++) {
                buf.push("<tr><td>" + jade.escape(null == (jade_interp = users[i].id) ? "" : jade_interp) + "</td><td>" + jade.escape(null == (jade_interp = users[i].first) ? "" : jade_interp) + "</td><td>" + jade.escape(null == (jade_interp = users[i].last) ? "" : jade_interp) + "</td><td>" + jade.escape(null == (jade_interp = users[i].email) ? "" : jade_interp) + "</td></tr>");
            }
            buf.push("</tbody></table>");
        }).call(this, "users" in locals_for_with ? locals_for_with.users : typeof users !== "undefined" ? users : undefined);
        return buf.join("");
    };

    return templatizer;
}));
