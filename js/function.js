//一些共用的函数
function changePage(str) {
    window.location.href=str;
}

function playVideo(str)
{
    if(document.getElementById("video") != null){
        $("#video").remove();
    }
    var audio = document.getElementById('audio');
    audio.pause();

    var path = str;
    var video =
        '<video id="video" style="position: absolute; width: 513px; height: 413px; top: 30%"  autoplay="autoplay"></video>';
    $('#bg').append(video);
    var v = document.getElementById("video");
    v.src=path ;
    v.addEventListener('ended', function() {
        $("#video").remove();
    });
}