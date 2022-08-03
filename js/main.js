var $pokemonList = document.querySelector('.pokemon-list');
var $pokemonDetail = document.querySelector('#pokemon-detail');

function getPokemonDataAll(datagen) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = data.pokeGenBoundaries[datagen].start - 1; i <= data.pokeGenBoundaries[datagen].end - 1; i++) {
      var pokemon = document.createElement('div');
      pokemon.setAttribute('class', 'square');
      pokemon.setAttribute('id', xhr.response.pokemon_entries[i].entry_number);
      pokemon.setAttribute('data-view', 'pokemon-details');

      var pokemonNumber = xhr.response.pokemon_entries[i].entry_number;

      var $spriteImg = document.createElement('img');
      $spriteImg.setAttribute('src', 'images/sprites/' + pokemonNumber + '.png');
      $spriteImg.setAttribute('class', 'sprite');

      var $pokemonNumberAndName = document.createElement('p');
      $pokemonNumberAndName.setAttribute('class', 'name');
      $pokemonNumberAndName.innerHTML = "<span class='font-blue'>" + '#' + pokemonNumber + '</span> ' + xhr.response.pokemon_entries[i].pokemon_species.name;

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

function getPokemonDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.currentPokemon.heading = '#' + xhr.response.id + ' ' + xhr.response.name;
    data.currentPokemon.weight = xhr.response.weight;
    data.currentPokemon.height = xhr.response.height;
    data.currentPokemon.hp = xhr.response.stats[0].base_stat;
    data.currentPokemon.attack = xhr.response.stats[1].base_stat;
    data.currentPokemon.defense = xhr.response.stats[2].base_stat;
    data.currentPokemon.specialAttack = xhr.response.stats[3].base_stat;
    data.currentPokemon.specialDefense = xhr.response.stats[4].base_stat;
    data.currentPokemon.speed = xhr.response.stats[5].base_stat;
    data.currentPokemon.typing[0] = xhr.response.types[0].type.name;
    if (xhr.response.types.length > 1) {
      data.currentPokemon.typing[1] = xhr.response.types[1].type.name;
    }
    data.currentPokemon.img = xhr.response.sprites.other['official-artwork'].front_default;
    createPokemonDetail(id);
  });
  xhr.send();
}

function createPokemonDetail(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    renderPokemonDetails(xhr.response);
  });
  xhr.send();
}

function renderPokemonDetails(responseData) {
  var $pokemonDetailsBorder = document.createElement('div');
  $pokemonDetailsBorder.setAttribute('class', 'pokemon-details-border height-test');

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');

  $pokemonDetailsBorder.appendChild($divRow);

  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'column-full pokemon-details-header padding-top-small');

  $divRow.appendChild($divColumn);

  var $rowHeader = document.createElement('div');
  $rowHeader.setAttribute('class', 'row padding-left-25');

  $divColumn.appendChild($rowHeader);

  var $h1 = document.createElement('h1');
  $h1.setAttribute('class', 'roboto-font');
  $h1.textContent = data.currentPokemon.heading + ' ' + responseData.names[0].name;

  $rowHeader.appendChild($h1);

  var $divRow2 = document.createElement('div');
  $divRow2.setAttribute('class', 'row flex-wrap');

  $pokemonDetailsBorder.appendChild($divRow2);

  var $divColumn2 = document.createElement('div');
  $divColumn2.setAttribute('class', 'column-half column-full details');

  $divRow2.appendChild($divColumn2);

  var $p1 = document.createElement('p');
  $p1.setAttribute('class', 'josefins-font flavor-text');

  for (var i = 0; i < responseData.flavor_text_entries.length; i++) {
    if (responseData.flavor_text_entries[i].language.name === 'en') {
      $p1.textContent = responseData.flavor_text_entries[i].flavor_text;
    }
  }

  $divColumn2.appendChild($p1);

  var $button = document.createElement('button');
  $button.setAttribute('class', data.currentPokemon.typing[0]);
  var capitalTyping = data.currentPokemon.typing[0];
  capitalTyping = capitalTyping.toUpperCase();
  $button.textContent = capitalTyping;
  $divColumn2.appendChild($button);

  if (data.currentPokemon.typing.length > 1) {
    var $button2 = document.createElement('button');
    $button2.setAttribute('class', data.currentPokemon.typing[1] + ' ' + 'margin-left-small');
    var capitalTyping2 = data.currentPokemon.typing[1];
    capitalTyping2 = capitalTyping2.toUpperCase();
    $button2.textContent = capitalTyping2;
    $divColumn2.appendChild($button2);
  }
  var $divRow3 = document.createElement('div');
  $divRow3.setAttribute('class', 'stats padding-top-small');

  var $p2 = document.createElement('p');
  $p2.setAttribute('class', 'margin-top-small');
  $p2.textContent = 'HP: ' + data.currentPokemon.hp;

  $divRow3.appendChild($p2);

  var $p3 = document.createElement('p');
  $p3.textContent = 'Attack: ' + data.currentPokemon.attack;

  $divRow3.appendChild($p3);

  var $p4 = document.createElement('p');
  $p4.textContent = 'Defense: ' + data.currentPokemon.defense;
  $divRow3.appendChild($p4);
  var $p5 = document.createElement('p');
  $p5.textContent = 'Special-defense: ' + data.currentPokemon.specialDefense;

  $divRow3.appendChild($p5);
  var $p6 = document.createElement('p');

  $p6.textContent = 'Special-attack: ' + data.currentPokemon.specialAttack;
  $divRow3.appendChild($p6);

  var $p7 = document.createElement('p');
  $p7.textContent = 'Speed: ' + data.currentPokemon.speed;

  var $p8 = document.createElement('p');
  $p8.textContent = 'Weight: ' + data.currentPokemon.weight;

  var $p9 = document.createElement('p');
  $p9.textContent = 'Height: ' + data.currentPokemon.height;

  $divRow3.appendChild($p7);
  $divRow3.appendChild($p8);
  $divRow3.appendChild($p9);

  $divColumn2.appendChild($divRow3);

  var $divColumn3 = document.createElement('div');
  $divColumn3.setAttribute('class', 'column-half column-full display-flex align-center justify-center');

  $pokemonDetailsBorder.appendChild($divColumn3);

  var $officialArt = document.createElement('img');
  $officialArt.setAttribute('class', 'official-artwork padding-top-small');
  $officialArt.setAttribute('src', data.currentPokemon.img);

  $divColumn3.appendChild($officialArt);
  $divRow2.appendChild($divColumn3);

  $pokemonDetail.appendChild($pokemonDetailsBorder);
  /* <div class="pokemon-details-border height-test">
  <div class="row">
    <div class="column-full pokemon-details-header padding-top-small">
      <div class="row padding-left-25">
        <h1>#1 Bulbasaur フシギダネ</h1>
      </div>
    </div>
  </div>
  <div class="row flex-wrap">
    <div class="column-half column-full details">
      <p>A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.</p>
      <button class="grass-type">GRASS</button>
      <button class="poison-type">POISON</button>
      <div class="stats padding-top-small">
        <p class="bot-margin-none">HP: 99</p>
        <p class="bot-margin-none">Attack: 99</p>
        <p class="bot-margin-none">Special-attack: 99</p>
        <p class="bot-margin-none">Special-defense: 99</p>
        <p class="bot-margin-none">Defense: 99</p>
        <p class="bot-margin-none">Speed: 99</p>
        <p class="bot-margin-none">Weight: 99</p>
        <p class="bot-margin-none">Height: 99</p>
      </div>
    </div>
    <div class="column-half column-full display-flex align-center justify-center">
      <img class="official-artwork padding-top-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="bulbasaur">
    </div>
  </div>
</div> */
}

var $allView = document.querySelectorAll('.view');

function viewSwap(viewData) {
  for (var i = 0; i < $allView.length; i++) {
    var $dataView = $allView[i].getAttribute('data-view');
    if (viewData === $dataView) {
      $allView[i].className = 'view';
      data.view = viewData;
    } else if (viewData !== $dataView) {
      $allView[i].className = 'view hidden';
    }
  }
}

function clickPokemon(event) {
  var $dataView = event.target.closest('.square').getAttribute('data-view');
  if (event.target.className === 'square') {
    var id = event.target.getAttribute('id');
    getPokemonDetails(id);
    viewSwap($dataView);
  } else if (event.target.className === 'sprite' || event.target.className === 'name') {
    var id2 = event.target.closest('.square').getAttribute('id');
    getPokemonDetails(id2);
    viewSwap($dataView);
  }
}

function changeDataView(event) {
  if (event.target.closest('.header-text')) {
    var $closestDiv = event.target.closest('.header-text').getAttribute('data-view');
    viewSwap($closestDiv);
    removeAllChildNodes($pokemonList);
    removeAllChildNodes($pokemonDetail);
    getPokemonDataAll('national');
  }
}

$pokemonList.addEventListener('click', clickPokemon);

var $header = document.querySelector('.header-text');

$header.addEventListener('click', changeDataView);

var $random = document.querySelector('#random');

function generateRandomNumber(min, max) {
  min = 1;
  max = 898;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomPokemon(event) {
  removeAllChildNodes($pokemonList);
  removeAllChildNodes($pokemonDetail);
  viewSwap('pokemon-details');
  var id = generateRandomNumber(1, 898);
  id = id.toString();
  getPokemonDetails(id);

}

$random.addEventListener('click', generateRandomPokemon);
