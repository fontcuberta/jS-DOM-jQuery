$('#js-search-artist').on('submit', function(event){
    var artistName = $('#artistname').val();
    getArtists(artistName);
    console.log(event);
    event.preventDefault();
});

function getArtists(artistName){
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/search?type=artist&query='
        + artistName
        + '&limit=3',
        success: fetchArtist,
        error: function(){
            console.log("ERROR");
        },
        datatype: 'JSON'
    });
};

function fetchArtist (data) {
    $('#result-wrapper').empty();
    data.artists.items.forEach(function(artist){
      var html = '<div class="col-md-4 col-xs-8">'
                  + '<h3>' + artist.name + '</h3>'
                  + '<img src="' + artist.images[0].url + '"'
                  + ' class="img-thumbnail" '
                  + 'data-toggle="modal" data-target=".bs-example-modal-sm" '
                  + 'value=' + artist.id + '/>'
                  + '</div>';
      $('#result-wrapper').append(html);
    });
};

function getArtistAlbums(artistId){
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/artists/'
        + artistId
        + '/albums',
        success: fetchAlbums,
        error: function(){
            console.log("ERROR");
        },
        datatype: 'JSON'
    });
};

function fetchAlbums(data) {
  $('#trackList').empty();
  $('#albumList').empty();
  $('.modal-title').text('Albums');
  data.items.forEach(function(album){
    var html = '<li><a href="#"'
              + 'id="'+ album.id +'">'
              + album.name
              + '</a></li>';
    $('#albumList').append(html);
  });
};

function getAlbumTracks(albumId){
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/albums/'
        + albumId
        + '/tracks',
        success: fetchTracks,
        error: function(){
            console.log("ERROR");
        },
        datatype: 'JSON'
    });
};

function fetchTracks(data) {
  $('#trackList').empty();
  $('#albumList').empty();
  $('.modal-title').text('Tracks');
  data.items.forEach(function(track){
    var html = '<li><a target="_blank"'
              + ' href="' + track.preview_url +'"'
              + 'id="'+ track.id +'">'
              + track.name
              + '</a></li>';
    $('#trackList').append(html);
  });
};

$('.container').on('click', '#result-wrapper img', function(event){
    var artistId = $(event.currentTarget).attr("value");
    getArtistAlbums(artistId);
    $('#modale').modal('show');
});

$('#modale').on('click', '#albumList li', function(event){
  event.preventDefault();
  var albumId = $(event.currentTarget).children().attr("id");
  getAlbumTracks(albumId);
});
