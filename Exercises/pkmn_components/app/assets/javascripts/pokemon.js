(function () {
    "use strict";

    PokemonApp.Pokemon = function (pokemonUri) {
        this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
    };

    PokemonApp.Pokemon.prototype.render = function () {
        console.log("Rendering pokemon: #" + this.id);

        var self = this;

        $.ajax({
            url: "api/pokemon/" + this.id,
            success: function (response) {
                self.info = response;

                $('#pkmn-sprite').attr('src', "");
                $('.js-pkmn-name').text(self.info.name);
                $('.js-pkmn-number').text(self.info.pkdx_id);
                $('.js-pkmn-height').text(self.info.height);
                $('.js-pkmn-weight').text(self.info.weight);
                $('.js-pkmn-hp').text(self.info.hp);
                $('.js-pkmn-attack').text(self.info.attack);
                $('.js-pkmn-defense').text(self.info.defense);
                $('.js-pkmn-spAttack').text(self.info.sp_atk);
                $('.js-pkmn-spDefense').text(self.info.sp_def);
                $('.js-pkmn-speed').text(self.info.speed);
                $('.js-pkmn-desc').text(getLatestDescription(self.info));

                var imageUri = self.info.sprites[0].resource_uri;

                $.get(imageUri).done(function (data) {
                    var url = data.image
                    $('#pkmn-sprite').attr('src', "http://pokeapi.co" + url)
                })

                self.info.types.forEach(
                        function(type) {
                            $('.js-pkmn-type').append(
                                type.name + " "
                            );
                        }
                    )

                console.log("Pokemon info:");
                console.log(self.info);

                $('.js-pokemon-modal').modal("show");
            }
        });
    };

    function getLatestDescription(object) {
        var latestDescription = "";
        var description = object.descriptions
        var hash = {}
        description.map(function(item) {
            hash[parseInt(item.name.match(/\d/))] = item.resource_uri
        })
        var maxKey = Object.keys(hash).reduce(function(prev, key){
            return parseInt(prev) < parseInt(key) ? key : prev
        })

        $.ajax({
            async: false,
            url: hash[maxKey],
            success: function (data) {
                latestDescription = data.description;
            }
        });

        return latestDescription;
    };

    PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
        var uriSegments = pokemonUri.split("/");
        var secondLast = uriSegments.length - 2;
        return uriSegments[secondLast];
    };

    $(document).on('ready', function () {

        $(".js-show-pokemon").on('click', function (event) {
            var $button = $(event.currentTarget);
            var pokemonUri = $button.data("pokemon-uri");

            var pokemon = new PokemonApp.Pokemon(pokemonUri);
            pokemon.render();
        });
    });

})();
