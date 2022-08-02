var $pokemonList = document.querySelector('.pokemon-list');

function getPokemonDataAll(datagen) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = data.pokeGenBoundaries[datagen].start - 1; i <= data.pokeGenBoundaries[datagen].end - 1; i++) {
      var pokemon = document.createElement('div');
      pokemon.setAttribute('class', 'square');

      var pokemonNumber = xhr.response.pokemon_entries[i].entry_number;

      var $spriteImg = document.createElement('img');
      $spriteImg.setAttribute('src', 'images/sprites/' + pokemonNumber + '.png');
      $spriteImg.setAttribute('class', 'sprite');

      var $pokemonNumberAndName = document.createElement('p');
      $pokemonNumberAndName.textContent = '#' + pokemonNumber + ' ' + xhr.response.pokemon_entries[i].pokemon_species.name;

      pokemon.appendChild($spriteImg);
      pokemon.appendChild($pokemonNumberAndName);
      $pokemonList.appendChild(pokemon);
    }
  });
  xhr.send();
}

var $allPokemon = document.querySelector('.buttons');

function appendPokemonData(event) {
  if (event.target.tagName === 'BUTTON');
  removeAllChildNodes($pokemonList);
  var datagen = event.target.getAttribute('data-gen');
  getPokemonDataAll(datagen);
}

$allPokemon.addEventListener('click', appendPokemonData);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

var $allPokemonSelect = document.querySelector('.pokemon-category');

function appendPokemonDataForSelect(event) {
  removeAllChildNodes($pokemonList);
  var datagen = event.target.value;
  getPokemonDataAll(datagen);

}
$allPokemonSelect.addEventListener('change', appendPokemonDataForSelect);
