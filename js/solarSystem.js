"use strict";
var show = [true, true, true, true, true, true, true, true, true];
var planetImages = [];
var ondisplay = false;
var ifHeRi = false, ifLianZhu = false, ifRiSHi = false;
// solarEclipse();
for(var i = 0 ; i <= 8 ; i++)
{
    var img = new Image();
    switch (i) {
        case 0:
            img.src = "images/neptune.png";
            break;
        case 1:
            img.src = "images/uranus.png";
            break;
        case 2:
            img.src = "images/saturn.png";
            break;
        case 3:
            img.src = "images/jupiter.png";
            break;
        case 4:
            img.src = "images/mars.png";
            break;
        case 5:
            img.src = "images/earth.png";
            break;
        case 6:
            img.src = "images/venus.png";
            break;
        case 7:
            img.src = "images/mercury.png";
            break;
        case 8:
            img.src = "images/sun.png";
            break;
    }
    planetImages[i] = img;
}



function rtn() {
    window.location.href="milkyWay.php";
}

function reset() {
    if(ondisplay)
    {
        $('#mask-bg').remove();
        $('video').remove();
        $('#close').remove();
    }

    for(var i = 0 ; i < 8 ; i++)
    {
        show[i] = true;
    }

    ifHeRi = false;
    ondisplay = false;
    ifLianZhu = false;
    ifRiSHi = false;

    var audio = document.getElementById('audio');
    audio.pause();
    // audio.
    var con = document.getElementById('lyricContainer');
    //console.log("num:"+con.textContent);
    $("#lyricContainer").css("visibility",'hidden');
    $("#player").css("visibility",'hidden');
    $("#2").css("color",'#999');
}

function displayStatus() {
    var mask =
        '<image src="images/mask.png" id="mask-bg" style="position:fixed;left:0px;top:0px;width:100%;height:101%;opacity: 0.3;"/>';
    var close =
        '<image src="images/close.png" id="close" style="position:fixed;right:0px;top:0px;width: 100px;height:100px;cursor: pointer"/>';

    $("#lyricContainer").css("visibility",'visible');
    $('#bg').append(mask);
    $('#bg').append(close);

    $(document).ready(function(){
        $("#close").click(function(){

            reset();
        });
    });
}

function close() {
    $('#mask-bg').remove();
    $('#close').remove();
    reset();
}

function playVideo(name){
    var node = "<video src=\"content/videos/"+name+".mp4\"></video>";
    $("#bg").append(node);
    $("video").trigger('play');
}

function riShi() {
    reset();
    displayStatus();
    playVideo("rishi");

    $("#player").css("visibility",'visible');
    ondisplay = true;

    ifRiSHi = true;
    ifHeRi = false;
    for(var i = 0 ; i < 8 ; i++)
    {
        if( i == 5)
        {
            continue;
        }
        show[i] = false;
    }

}

//合日
function heRi() {
    reset();
    displayStatus();

    $("#player").css("visibility",'visible');
    ifHeRi = true;

    ondisplay = true;
    for(var i = 0 ; i < 8 ; i++)
    {
        if( i == 5)
        {
            continue;
        }
        if( i == 4)
        {
            continue;
        }
        show[i] = false;
    }
}

function lianZhu(){
    reset();
    displayStatus();
    ifLianZhu = true;
    playVideo("lianzhu");

    $("#player").css("visibility",'visible');
    ifHeRi = false;

    ondisplay = true;
    for(var i = 0 ; i < 2 ; i++)
    {
        show[i] = false;
    }
}

function chongRi() {
    reset();
    displayStatus();
    $("#player").css("visibility",'visible');
    ifHeRi = false;

    ondisplay = true;
    for(var i = 0 ; i < 8 ; i++)
    {
        if( i == 5)
        {
            continue;
        }
        if( i == 4)
        {
            continue;
        }
        show[i] = false;
    }
}

function lingRi() {
    reset();
    displayStatus();
    $("#player").css("visibility",'visible');
    ifHeRi = false;

    ondisplay = true;
    for(var i = 0 ; i < 8 ; i++)
    {
        if( i == 5)
        {
            continue;
        }
        if( i == 6)
        {
            continue;
        }
        show[i] = false;
    }
}
/*
  Tested in recent versions on Firefox/Safari/Chrome.

  Should be running at 60fps, if it's not then let me know in the comments

  Inspired by artwork by Nina Geometrieva.

  If you want to take a look at the source code its available here: www.github.com/hparton/spaceeee
*/

! function t(i, e, o) {
    function n(r, s) {
        if (!e[r]) {
            if (!i[r]) {
                var h = "function" == typeof require && require;
                if (!s && h) return h(r, !0);
                if (a) return a(r, !0);
                var l = new Error("Cannot find module '" + r + "'");
                throw l.code = "MODULE_NOT_FOUND", l;
            }
            var d = e[r] = {
                exports: {}
            };
            i[r][0].call(d.exports, function(t) {
                var e = i[r][1][t];
                return n(e ? e : t);
            }, d, d.exports, t, i, e, o);
        }
        return e[r].exports;
    }
    for (var a = "function" == typeof require && require, r = 0; r < o.length; r++) {
        n(o[r]);
    }
    return n;
}({
    1: [function(t, i, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = e.genLine = function(t, i, e, o, n, a, r) {
            for (var s = t.getContext("2d"), h = {
                x: i,
                y: e
            }, l = h, d = o, u = e, c = [], f = [], p = Math.ceil(o / (4 * a) + 1), g = 0; g < n; g += n / 4) {
                c.push(n / 4 * g);
            }
            for (var v = 0; v < p; v++) {
                f.push({
                    top: c[Math.floor(Math.random() * c.length)],
                    bottom: -c[Math.floor(Math.random() * c.length)]
                });
            }
            s.beginPath(), s.strokeStyle = "green", s.lineWidth = "4", s.moveTo(h.x, h.y + 10 * d);
            for (var x = 0; x < p; x++) {
                var y = l.y,
                    w = l.x,
                    b = u + -f[x].top,
                    m = u + -f[x].bottom;
                s.quadraticCurveTo(w, y, w, y - a), s.lineTo(w, b), s.quadraticCurveTo(w, b - a, w + a, b - a), s.quadraticCurveTo(w + 2 * a, b - a, w + 2 * a, b), s.lineTo(w + 2 * a, m - a), x !== p - 1 && s.quadraticCurveTo(w + 2 * a, m, w + 3 * a, m), l.x = w + 4 * a, l.y = m;
            }
            s.lineTo(l.x - 2 * a, l.y + 10 * d), s.fillStyle = r, s.fill();
        };
        e.generatePlanetTexture = function(t, i, e) {
            var n = document.createElement("canvas"),
                a = n.getContext("2d");
            return n.width = n.height = t, a.beginPath(), a.arc(n.width / 2, n.height / 2, n.width / 2, 0, 2 * Math.PI, !0), a.save(), a.clip(), e && (a.translate(n.width / 2, n.height / 2), a.rotate(e), a.translate(-n.width / 2, -n.width / 2)), i.forEach(function(t) {
                o(n, 0, t.offset, n.width, t.height, t.width, t.fill);
            }), a.restore(), a.canvas;
        };
    }, {}],
    2: [function(t, i, e) {
        "use strict";

        function o(t, i) {
            return Math.round(Math.random() * i - t + t);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.StarField = void 0;
        var n = t("./utils"),
            a = e.StarField = function(t, i) {
                this.parentCanvas = t, this.background = i;
            };
        a.prototype.init = function() {
            this.el = (0, n.createChildCanvas)("star-field", this.parentCanvas, -3, this.background), this.drawStarField(200);
        }, a.prototype._drawStar = function(t) {
            var i = Math.random() * this.el.canvas.width,
                e = Math.random() * this.el.canvas.height,
                n = 2 * Math.random(),
                a = o(80, 100) / 100;
            t.beginPath(), t.globalAlpha = a, t.fillStyle = "#ffffff", t.arc(i, e, n, 0, 2 * Math.PI, !0), t.fill(), t.closePath();
        }, a.prototype.drawStarField = function(t) {
            // for (var i = 0; i <= t; i++) {
            //     this._drawStar(this.el.ctx);
            // }
        };
    }, {
        "./utils": 3
    }],
    3: [function(t, i, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.createChildCanvas = function(t, i, e, o) {
            var n = document.createElement("canvas"),
                a = i,
                r = n.getContext("2d");
            return n.id = t, n.width = i.width, n.height = i.height, n.style.position = "absolute", n.style.zIndex = e, n.style.left = "0", n.style.top = "0", o && (n.style.background = o), a.parentNode.insertBefore(n, a), {
                canvas: n,
                ctx: r
            };
        };
    }, {}],
    4: [function(t, i, e) {
        "use strict";

        function o() {
            this.width = window.innerWidth, this.height = window.innerHeight, this.canvas = document.getElementById("space"), this.ctx = this.canvas.getContext("2d"), this.ctx.canvas.width = this.width, this.ctx.canvas.height = this.height, this.sun = new n(this.canvas.width / 2, this.canvas.height - this.canvas.height / 2, 72.5, f), this.planets = [], this.registerPlanets(), this.updatePlanetPosition();

            var cxt = this.canvas.getContext('2d');
            // //加上字体
            // cxt.save();
            // // cxt.translate(500,500);
            // cxt.fillStyle = '#fff';
            // cxt.font = "bold " + 22 + "px Arial";
            // cxt.textAlign = "center";
            // cxt.textBaseline = "middle";
            // // cxt.rotate(time*360/this.revolution*Math.PI/180)
            // cxt.fillText("太阳",this.width/2-6,this.height/2-6);

            //添加鼠标事件
            this.canvas.addEventListener("mousedown", doMouseDown, false);
            this.canvas.addEventListener('mousemove', doMouseMove, false);
        }

        var preStr;
        function doMouseMove() {
            var x = event.pageX;
            var y = event.pageY;
            var canvas = event.target;
            var loc = getPointOnCanvas(canvas, x, y);

            var x_ = loc.x - this.width/2;
            var y_ = loc.y - this.height/2;
            // console.log("mouse down at point( x:" + x_ + ", y:" + y_ + ")");
            var str = toJudgePlanet(x_, y_);
            if(str != null)
            {
                var tempstr = "#"+str;
                $(tempstr).css("color","#a7b0d0");
            }
            if(preStr != null && str != preStr)
            {
                var tempstr = "#"+preStr;
                $(tempstr).css("color","white");
            }
            preStr = str;
        }

        //点击后，跳转到介绍页
        function doMouseDown(event) {
            var x = event.pageX;
            var y = event.pageY;
            var canvas = event.target;
            var loc = getPointOnCanvas(canvas, x, y);

            var x_ = loc.x - this.width/2;
            var y_ = loc.y - this.height/2;
            // console.log("mouse down at point( x:" + x_ + ", y:" + y_ + ")");
            var str = toJudgePlanet(x_, y_);
            if(str != null)
            {
                window.location.href = str+".php";
            }
        }

        function toJudgePlanet(x, y) {
            var r2 = x * x + y * y;
            // 145+150+150*t
            if(r2 < 72.5*72.5)
            {
                return "sun";
            }

            if(y > 23.5 || y < -23.5)
            {
                return null;
            }

            if(x > 103.5 && x < 169.5)
            {
                return "mercury";
            }
            if(x > 178.5 && x < 244.5)
            {
                return "venus";
            }
            if(x > 253.5 && x < 319.5)
            {
                return "earth";
            }
            if(x > 328.5 && x < 394.5)
            {
                return "mars";
            }
            if(x > 403.5 && x < 469.5)
            {
                return "jupiter";
            }
            if(x > 478.5 && x < 544.5)
            {
                return "saturn";
            }
            if(x > 553.5 && x < 619.5)
            {
                return "uranus";
            }
            if(x > 628.5 && x < 694.5)
            {
                return "neptune";
            }
        }

        function getPointOnCanvas(canvas, x, y) {
            var bbox = canvas.getBoundingClientRect();
            return { x: x - bbox.left * (canvas.width  / bbox.width),
                y: y - bbox.top  * (canvas.height / bbox.height)
            };
        }

        function n(t, i, e, o) {
            this.radius = e, this.position = {}, this.position.x = t, this.position.y = i, this.children = [], this.texture = o;
        }

        var earthSpeed = 700;
        var planetSpeed = [0.24*earthSpeed, 0.62*earthSpeed, earthSpeed, 1.52*earthSpeed, 5.2*earthSpeed, 9.55*earthSpeed, 19.21*earthSpeed, 30.11*earthSpeed];
        //n声明为行星中的第几个
        function a(t, i, e, o, n, s, h) {
            //console.log("dis:"+o)
            this.radius = e, this.distance = o, this.angle = 360 * Math.random() + 0, this.angularSpeed = 6 / (2 * this.distance), this.position = {}, this.position.x = t, this.position.y = i, this.texture = n, this.border = s, h && (this.moon = new a(1.5 * this.position.x, 1.5 * this.position.y, this.radius / 3.5), this.moon.angularSpeed = .1), this.background = r(c);
        }

        function r(t) {
            var i,
                e = [];
            for (i in t) {
                t.hasOwnProperty(i) && e.push(i);
            }
            return t[e[Math.floor(Math.random() * e.length)]];
        }

        function s(t, i) {
            var e = parseInt(t.slice(1), 16),
                o = i < 0 ? 0 : 255,
                n = i < 0 ? i * -1 : i,
                a = e >> 16,
                r = e >> 8 & 255,
                s = 255 & e;
            return "#" + (16777216 + 65536 * (Math.round((o - a) * n) + a) + 256 * (Math.round((o - r) * n) + r) + (Math.round((o - s) * n) + s)).toString(16).slice(1);
        }
        var _earth = 30;
        var h = t("./js/backgroundPattern"),
            l = t("./js/stars"),
            d = t("./js/utils"),
            u = {
                planets: 7
            },
            c = {
                pink: "#e29fc7",
                purple: "#5e3d86",
                ice: "#a7b0d0"
            },
            //太阳颜色
            f = (0, h.generatePlanetTexture)(600, [{
                offset: -40,
                height: 10,
                width: 4,
                fill: "#f89736"
            }, {
                offset: 140,
                height: 18,
                width: 4,
                fill: "#ec6351"
            }, {
                offset: 280,
                height: 18,
                width: 4,
                fill: "#db3d32"
            }, {
                offset: 420,
                height: 18,
                width: 4,
                fill: "#d80f46"
            }], 1);
        o.prototype.init = function() {
            function t() {
                n.clearPlanets(), n.updatePlanetPosition(), n.drawPlanets(), requestAnimationFrame(function(i) {
                    t();
                });
            }
            //背景
            var i = new l.StarField(this.canvas, "#01011a");
            i.init();
            for (var e = (0, d.createChildCanvas)("trajectory", this.canvas, -2), o = this.planets.length - 1; o >= 0; o--) {
                g(e.ctx, {
                    x: this.sun.position.x,
                    y: this.sun.position.y,
                    radius: this.sun.radius + 75 + 75 * o
                });

            }



            var n = this;
            t();
        }, o.prototype.registerPlanets = function() {
            for (var t = u.planets ; t >= 0; t--) {
                var i = r(c);
                var pR = _earth;
                var satellite = 0;
                switch(t){
                    case 0:
                        i = "#e9cc7c";
                        pR = _earth*0.3;
                        break;
                    case 1:
                        i = "#cf642c";
                        pR = _earth*0.5;
                        break;
                    case 2:
                        satellite = 1;
                        pR = _earth;
                        i = "#3f7dac";
                        break;
                    case 3:
                        i = "#9a405a";
                        pR = _earth;
                        break;
                    case 4:
                        i = "#ebc57e";
                        pR = _earth * 1.5;
                        break;
                    case 5:
                        i = "#fdd563";
                        pR =  _earth * 1.1;
                        break;
                    case 6:
                        i = "#0c5e8e";
                        pR = _earth * 0.65;
                        break;
                    case 7:
                        i = "#5bacbf";
                        pR = _earth * 0.6;
                        break;
                };
                //a的第三个参是半径大小
                e = new a(this.sun.position.y, this.sun.position.x, pR, this.sun.radius + 75 + 75 * t, (0, h.generatePlanetTexture)(600, [{
                    offset: -40,
                    height: 10,
                    width: 20,
                    fill: i
                }, {
                    offset: 140,
                    height: 20,
                    width: 20,
                    fill: s(i, .2)
                }, {
                    offset: 420,
                    height: 20,
                    width: 20,
                    fill: s(i, .4)
                }], 1), 0, satellite);//最后一个参数是有无卫星//倒数第二个有无白边
                e.angularSpeed = 6/planetSpeed[t];
                this.planets.push(e);
            }
        }, o.prototype.updatePlanetPosition = function() {
            // w
            var j = this.planets[this.planets.length - 1];
            var tmpx = Math.cos(j.angle) * j.distance + this.sun.position.x - this.width/2;
            var tmpy = Math.sin(j.angle) * j.distance + this.sun.position.y - this.height/2;
            if(!ondisplay || (tmpx <= 120 && tmpx >= -120))
            {
                //console.log("tmp:"+tmpx)
                for (var t = this.planets.length - 1; t >= 0; t--) {
                    var i = this.planets[t];
                    i.angle += i.angularSpeed;
                    var e = Math.cos(i.angle) * i.distance,
                        o = Math.sin(i.angle) * i.distance;
                    if (i.position.x = e + this.sun.position.x, i.position.y = o + this.sun.position.y, i.moon) {
                        i.moon.angle += i.moon.angularSpeed;
                        var n = Math.cos(i.moon.angle) * (1.5 * i.radius),
                            a = Math.sin(i.moon.angle) * (1.5 * i.radius);
                        i.moon.position.x = n + i.position.x, i.moon.position.y = a + i.position.y;
                    }
                }
            }
            else
            {
                var theFirst = true;
                for (var t = this.planets.length - 2; t >= 0; t--) {
                    //如果星球被隐藏了，就不更新位置
                    if(show[t])
                    {
                        var i = this.planets[t];

                        if(ifLianZhu && t == 5)
                        {
                            i.angle += i.angularSpeed;
                            var e = Math.cos(i.angle) * i.distance,
                                o = Math.sin(i.angle) * i.distance;
                            if (i.position.x = e + this.sun.position.x, i.position.y = o + this.sun.position.y, i.moon) {
                                i.moon.angle += i.moon.angularSpeed;
                                var n = Math.cos(i.moon.angle) * (1.5 * i.radius),
                                    a = Math.sin(i.moon.angle) * (1.5 * i.radius);
                                i.moon.position.x = n + i.position.x, i.moon.position.y = a + i.position.y;
                            }
                            continue;
                        }

                        //如果星球没有被隐藏，看符不符合不更新的条件
                        var ix = Math.cos(i.angle) * i.distance + this.sun.position.x - window.innerWidth/2;
                        var iy = Math.sin(i.angle) * i.distance + this.sun.position.y - window.innerHeight/2;
                        var tmp = tmpx * ix;
                        if(tmpx != 0)
                        {
                            var k = tmpy / tmpx;
                            //判断是否同方向
                            if(k * ix - iy > -30 && k * ix - iy < 30)
                            {
                                if(!ifHeRi && tmp >= 0)
                                {
                                    if(t == 5 && ifRiSHi)
                                    {
                                        var n = -Math.cos(i.angle) * (1.5 * i.radius),
                                            a = -Math.sin(i.angle) * (1.5 * i.radius);
                                        i.moon.position.x = n + i.position.x, i.moon.position.y = a + i.position.y;
                                    }
                                    continue;
                                }

                                if(ifHeRi)
                                {
                                    if(tmp < 0 && theFirst)
                                    {
                                        theFirst = false;
                                        continue;
                                    }
                                    if(!theFirst && tmp >= 0)
                                    {
                                        continue;
                                    }
                                }
                                // if(theFirst )
                                // continue;
                            }
                        }
                        else
                        {
                            if(ix > -30 && ix < 30)
                            {
                                if(!ifHeRi && tmp >= 0)
                                {
                                    continue;
                                }
                                if(ifHeRi)
                                {
                                    if(tmp < 0 && theFirst)
                                    {
                                        theFirst = false;
                                        continue;
                                    }
                                    if(!theFirst && tmp >= 0)
                                    {
                                        continue;
                                    }
                                }
                                // if(
                            }

                        }


                        i.angle += i.angularSpeed*4;
                        var e = Math.cos(i.angle) * i.distance,
                            o = Math.sin(i.angle) * i.distance;
                        if (i.position.x = e + this.sun.position.x, i.position.y = o + this.sun.position.y, i.moon) {
                            i.moon.angle += i.moon.angularSpeed;
                            var n = Math.cos(i.moon.angle) * (1.5 * i.radius),
                                a = Math.sin(i.moon.angle) * (1.5 * i.radius);
                            i.moon.position.x = n + i.position.x, i.moon.position.y = a + i.position.y;
                        }


                    }

                }
            }


        }, o.prototype.clearPlanets = function() {
            for (var t = this.planets.length - 1; t >= 0; t--) {
                var i = this.planets[t];
                this.ctx.clearRect(i.position.x - i.radius / 2 - 75, i.position.y - i.radius / 2 - 75, i.radius + 150, i.radius + 150);
            }
        }, o.prototype.drawSun = function(t) {
            var i = (0, d.createChildCanvas)("sun", this.canvas, -1),
                e = this.sun;
            p(i.ctx, {
                x: e.position.x,
                y: e.position.y,
                radius: e.radius,
                background: e.background,
                //太阳的光晕
                atmosphere: {
                    color: "#f3320d",
                    rings: 4
                },
                shadow: {
                    color: "rgba(130,100,139,0.6)",
                    blur: 120
                },
                texture: e.texture
            });
        }, o.prototype.drawPlanets = function() {
            for (var t = this.planets.length - 1; t >= 0; t--) {
                var img = planetImages[t];  //创建Image对象



                if(show[t])
                {
                    var i = this.planets[t];
                    p(this.ctx, {
                        x: i.position.x,
                        y: i.position.y,
                        radius: i.radius,
                        background: i.background,
                        //星球光晕
                        shadow: {
                            color: "rgba(247,222,226,0.35)",
                            blur: 25
                        },
                        texture: img,
                        border: i.border
                    }), i.moon && (g(this.ctx, {
                        x: i.position.x,
                        y: i.position.y,
                        radius: 1.5 * i.radius
                    }), p(this.ctx, {
                        x: i.moon.position.x,
                        y: i.moon.position.y,
                        radius: i.moon.radius-5,
                        background: i.moon.background,
                        shadow: {
                            color: "rgba(247,222,226,0.2)",
                            blur: 5
                        },
                        texture: i.moon.texture
                    }));
                }
            }
        };
        var p = function p(t) {
                var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    e = i.x,
                    o = i.y,
                    n = i.radius,
                    a = void 0 === n ? 20 : n,
                    r = i.shadow,
                    s = void 0 === r ? {} : r,
                    h = i.atmosphere,
                    l = void 0 === h ? {} : h,
                    d = i.border,
                    u = void 0 !== d && d,
                    c = i.background,
                    //卫星颜色
                    f = void 0 === c ? "grey" : c,
                    p = i.texture;
                if (s.color && (t.shadowColor = s.color, t.shadowBlur = s.blur, t.shadowOffsetX = 0, t.shadowOffsetY = 0), l.rings) {
                    for (var g = l.rings - 1; g >= 0; g--) {
                        t.fillStyle = l.color, t.globalAlpha = .6 - .15 * g, t.beginPath(), t.arc(e, o, a + 20 * g, 0, 2 * Math.PI, !0), t.fill(), t.closePath();
                    }
                    t.globalAlpha = 1;
                }
                var img = new Image();  //创建Image对象
                img.src = "images/saturn.png";
                //drawImage P是纹理
                t.beginPath(), t.arc(e, o, a, 0, 2 * Math.PI, !0), p ? t.drawImage(p, e - a, o - a, 2 * a, 2 * a) : (t.fillStyle = f, t.fill()), u && (t.strokeStyle = "white", t.lineWidth = 3, t.stroke()), t.closePath(), s.color && (t.shadowBlur = 0);
            },

            //轨道
            g = function g(t) {
                var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    e = i.x,
                    o = i.y,
                    n = i.radius,
                    a = i.width,
                    r = void 0 === a ? 2 : a,
                    s = i.color,
                    //轨道颜色
                    h = "#FFF";
                t.strokeStyle = "#483b67", t.lineWidth = 0.40, t.beginPath(), t.arc(e, o, n + 2, 0, 2 * Math.PI, !0), t.strokeStyle = h, t.closePath(), t.stroke();

            },
            v = new o();
        v.init();
    }, {
        "./js/backgroundPattern": 1,
        "./js/stars": 2,
        "./js/utils": 3
    }]
}, {}, [4]);