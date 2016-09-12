// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
      function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getVideoId() {
    var v_id = null;
    var url = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=50&key=AIzaSyDgRdNrKGH-ltrq9gYhMRcK0tsnrzNi5ss";
    var res = $.ajax({
        type: "GET",
        //cache: false,
        url: url,
        dataType: "json",
        async: false,
        success: function (result) {

        }

    }).responseText;
    res = JSON.parse(res);
    var response = res.items;
    var len = response.length;
    var number = parseInt(getRandomArbitrary(0, len));
    var video = response[number];
    var v_id = video.id;
    return v_id;
}
$(document).on("click", '.next-button', function (evt) {
    $(this).html("Loading...");
    $(this).attr("disabled", "disabled");
    player.loadVideoById(getVideoId());
    $(this).html("Next");
    $(this).removeAttr("disabled");
});