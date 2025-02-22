window.onload = function() {
    new Selected().init();
};
var Selected = function() {
    this.audio = document.getElementById('audio');
    this.lyricContainer = document.getElementById('lyricContainer');
    $("#lyricContainer").css("visibility",'visible');
    this.playlist = document.getElementById('playlist');
    this.currentIndex = 0;
    this.lyric = null;
    this.lyricStyle = 0; //random num to specify the different class name for lyric
};
Selected.prototype = {
    constructor: Selected, //fix the prototype chain
    init: function() {
        //get all songs and add to the playlist
        this.initialList(this);
        this.audio.volume = 0.4;//���ڿ�ʼĬ��������С��0.2��Ӧ20%
        var that = this,
            allSongs = this.playlist.children[0].children,
            currentSong, randomSong;

        //get the hash from the url if there's any.
        var songName = window.location.hash.substr(1);
        //then get the index of the song from all songs
        var indexOfHashSong = (function() {
            var index = 0;
            Array.prototype.forEach.call(allSongs, function(v, i, a) {
                if (v.children[0].getAttribute('data-name') == songName) {
                    index = i;
                    return false;
                }
            });
            return index;
        })();

        this.currentIndex = indexOfHashSong || Math.floor(Math.random() * allSongs.length);

        currentSong = allSongs[this.currentIndex];
        randomSong = currentSong.children[0].getAttribute('data-name');

        //set the song name to the hash of the url
        window.location.hash = window.location.hash || randomSong;


        //handle playlist
        this.playlist.addEventListener('click', function(e) {
            if (e.target.nodeName.toLowerCase() !== 'a') {
                return;
            };
            var allSongs = that.playlist.children[0].children,
                selectedIndex = Array.prototype.indexOf.call(allSongs, e.target.parentNode);
            that.currentIndex = selectedIndex;
            that.setClass(selectedIndex);
            var songName = e.target.getAttribute('data-name');
            window.location.hash = songName;
            that.play(songName);
        }, false);
        this.audio.onerror = function(e) {
            // that.lyricContainer.textContent = '!fail to load the song :(';
        };
        this.audio.addEventListener('ended', function() {
            $("#lianzhu").css("visibility",'hidden');
            $("#player").css("visibility",'hidden');
            $("#3").css("color",'#999');
        });


        //enable keyboard control , spacebar to play and pause
        window.addEventListener('keydown', function(e) {
            if (e.keyCode === 32) {
                if (that.audio.paused) {
                    that.audio.play();
                } else {
                    that.audio.pause();
                }
            }
        }, false);

        //initialize the background setting
       //  document.getElementById('bg_dark').addEventListener('click', function() {
       //      document.getElementsByTagName('html')[0].className = 'colorBg';
       // });
       //  document.getElementById('bg_pic').addEventListener('click', function() {
       //      document.getElementsByTagName('html')[0].className = 'imageBg';
       //  });
        //initially start from a random song
        for (var i = allSongs.length - 1; i >= 0; i--) {
            allSongs[i].className = '';
        };
    },
    initialList: function(ctx) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', './content/content.json', false);
        xhttp.onreadystatechange = function() {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                var fragment = document.createDocumentFragment(),
                    data = JSON.parse(xhttp.responseText).data,
                    ol = ctx.playlist.getElementsByTagName('ol')[0],
                    fragment = document.createDocumentFragment();

                data.forEach(function(v, i, a) {
                    var liid = "li-"+(i+1);
                    var aid = "a-"+(i+1);
                    //console.log(liid)
                    var li = document.getElementById(liid),
                          a = document.getElementById(aid);
                    a.href = 'javascript:void(0)';
                    a.dataset.name = v.lrc_name;
                    a.textContent = v.song_name;
                    //li.appendChild(a);
                    //fragment.appendChild(li);
                });
                ol.appendChild(fragment);
            }
        };
        xhttp.send();
    },
    play: function(songName) {
        var that = this;
        this.audio.src = './content/songs/' + songName + '.mp3';
        //reset the position of the lyric container
        this.lyricContainer.style.top = '130px';
        //empty the lyric
        this.lyric = null;
        this.lyricContainer.textContent = 'loading...';
        this.lyricStyle = Math.floor(Math.random() * 4);
        this.audio.addEventListener('canplay', function() {
            that.getLyric(that.audio.src.replace('.mp3', '.lrc'));
            this.play();
        });
        //sync the lyric
        this.audio.addEventListener("timeupdate", function(e) {
            if (!that.lyric) return;
            for (var i = 0, l = that.lyric.length; i < l; i++) {
                if (this.currentTime > that.lyric[i][0] ) {
                    //single line display mode
                    that.lyricContainer.textContent = that.lyric[i][1];
                };
            };
        });

    },
    setClass: function(index) {
        var allSongs = this.playlist.children[0].children;
        for (var i = allSongs.length - 1; i >= 0; i--) {
            allSongs[i].className = '';
        };
        allSongs[index].className = 'current-song';
    },
    getLyric: function(url) {
        var that = this,
            request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'text';
        //fix for the messy code problem for Chinese.  reference: http://xx.time8.org/php/20101218/ajax-xmlhttprequest.html
        //request['overrideMimeType'] && request.overrideMimeType("text/html;charset=gb2312");
        request.onload = function() {
            that.lyric = that.parseLyric(request.response);
            //display lyric to the page
            that.appendLyric(that.lyric);
        };
        request.onerror = request.onabort = function(e) {
            that.lyricContainer.textContent = '!failed to load the lyric :(';
        }
        this.lyricContainer.textContent = 'loading lyric...';
        request.send();
    },
    parseLyric: function(text) {
        //get each line from the text
        var lines = text.split('\n'),
            //this regex mathes the time [00.12.78]
            pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
            result = [];

        // Get offset from lyrics
        var offset = this.getOffset(text);

        //exclude the description parts or empty parts of the lyric
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1);
        };
        //remove the last empty item
        lines[lines.length - 1].length === 0 && lines.pop();
        //display all content on the page
        lines.forEach(function(v, i, a) {
            var time = v.match(pattern),
                value = v.replace(pattern, '');
            time.forEach(function(v1, i1, a1) {
                //convert the [min:sec] to secs format then store into result
                var t = v1.slice(1, -1).split(':');
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(offset) / 1000, value]);
            });
        });
        //sort the result by time
        result.sort(function(a, b) {
            return a[0] - b[0];
        });
		//console.log(result);
        return result;
    },
    appendLyric: function(lyric) {
        var that = this,
            lyricContainer = this.lyricContainer,
            fragment = document.createDocumentFragment();
        //clear the lyric container first
        this.lyricContainer.innerHTML = '';
        lyric.forEach(function(v, i, a) {
            var line = document.createElement('p');
            line.id = 'line-' + i;
            line.textContent = v[1];
            fragment.appendChild(line);
        });
        lyricContainer.appendChild(fragment);
    },
    getOffset: function(text) {
        //Returns offset in miliseconds.
        var offset = 0;
        try {
            // Pattern matches [offset:1000]
            var offsetPattern = /\[offset:\-?\+?\d+\]/g,
                // Get only the first match.
                offset_line = text.match(offsetPattern)[0],
                // Get the second part of the offset.
                offset_str = offset_line.split(':')[1];
            // Convert it to Int.
            offset = parseInt(offset_str);
        } catch (err) {
            //alert("offset error: "+err.message);
            offset = 0;
        }
        return offset;
    }
};
