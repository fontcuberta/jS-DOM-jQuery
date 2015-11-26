$('.js-characters').on('click', function(){
    fetchCharacters();
});

function fetchCharacters () {
    $('.js-character-list').empty();;
    var request = $.get('https://ironhack-characters.herokuapp.com/characters');

    function handleCharacters(characters) {
      characters.forEach( function(chr){
          var html = '<li>' + chr.name + '</li>'
          $('.js-character-list').append(html);
      })
    }

    function handleError (xhr, ajaxOptions, thrownError) {
        console.error('OH NO!!', xhr, ajaxOptions, thrownError);
    }

  request.done(handleCharacters);
  request.fail(handleError);
}

$('.js-add-character').on('submit', function(event){
    event.preventDefault();

    var character = {
      name: $('#chr-name').val(),
      occupation: $('#chr-occupation').val(),
      debt: $('#chr-debt').val(),
      weapon: $('#chr-weapon').val()
    };

    postCharacter(character);
})

function postCharacter(obj) {
    var request = $.post('https://ironhack-characters.herokuapp.com/characters', obj)

    function handleError (err1, err2, err3) {
        console.error('OH NO!!', err1, err2, err3);
    }

    request.done(fetchCharacters());
    request.fail(handleError());
}
