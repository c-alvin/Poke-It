var $pokemonList = document.querySelector('.pokemon-list');
var $pokemonDetail = document.querySelector('#pokemon-detail');
var $favoriteList = document.querySelector('.favorite-list');
var $loadingSpinner = document.querySelector('.ring-container');
var $errorModal = document.querySelector('.error-modal');

function getPokemonDataAll(datagen) {
  var xhr = new XMLHttpRequest();
  $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center');
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center hidden');
    if (xhr.status !== 200) {
      $errorModal.setAttribute('class', 'error-modal');
    }
    for (var i = data.pokeGenBoundaries[datagen].start - 1; i <= data.pokeGenBoundaries[datagen].end - 1; i++) {
      // <div class="square">
      //   <img class="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="">
      //     <p>#1 Bulbasaur</p>
      // </div>
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
      var capitalizedName = xhr.response.pokemon_entries[i].pokemon_species.name;
      capitalizedName = capitalizedName[0].toUpperCase() + capitalizedName.slice(1, capitalizedName.length);
      $pokemonNumberAndName.innerHTML = "<span class='font-blue'>" + '#' + pokemonNumber + '</span> ' + capitalizedName;

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
  $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center');
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center hidden');
    if (xhr.status !== 200) {
      $errorModal.setAttribute('class', 'error-modal');
    }
    data.currentPokemon.id = '#' + xhr.response.id;
    var capitalName = xhr.response.name;
    capitalName = capitalName[0].toUpperCase() + capitalName.slice(1, capitalName.length);
    data.currentPokemon.heading = '#' + xhr.response.id + ' ' + capitalName;
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
  data.currentPokemon.typing = [];
}

function createPokemonDetail(id) {
  var xhr = new XMLHttpRequest();
  $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center');
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $loadingSpinner.setAttribute('class', 'ring-container display-flex justify-center hidden');
    if (xhr.status !== 200) {
      $errorModal.setAttribute('class', 'error-modal');
    }
    renderPokemonDetails(xhr.response);
  });
  xhr.send();
}

function renderPokemonDetails(responseData) {

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
     <table>
       <tr>
         <th>Attack:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>HP:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>Special-attack:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>Special-defense:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>Speed:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>Defense:</th>
         <td>99</td>
         <td class="container">
           <div style="height:18.5px;background-color:black; width: 45%; border-radius:0.5rem"class=""></div>
         </td>
       </tr>
       <tr>
         <th>Weight:</th>
         <td>99</td>
         </tr>
       <tr>
         <th>Height:</th>
         <td>99</td>
       </tr>
     </table>
   </div>
 </div>
 <div class="column-half column-full display-flex align-center justify-center">
   <img class="official-artwork padding-top-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="bulbasaur">
 </div>
</div>
</div> */

  var $pokemonDetailsBorder = document.createElement('div');
  $pokemonDetailsBorder.setAttribute('class', 'pokemon-details-border height-test border-' + data.color);
  $pokemonDetailsBorder.setAttribute('id', data.currentPokemon.id);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');

  $pokemonDetailsBorder.appendChild($divRow);

  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'column-full pokemon-details-header padding-top-small');

  $divRow.appendChild($divColumn);

  var $rowHeader = document.createElement('div');
  $rowHeader.setAttribute('class', 'row padding-left-35 space-between');

  $divColumn.appendChild($rowHeader);

  var $h1 = document.createElement('h1');
  $h1.setAttribute('class', 'roboto-font name-test');
  $h1.textContent = data.currentPokemon.heading + ' ' + responseData.names[0].name;

  $rowHeader.appendChild($h1);

  var $starIcon = document.createElement('i');
  $starIcon.setAttribute('id', 'star');

  if (checkFavorites() === false) {
    $starIcon.setAttribute('class', 'fa-solid fa-star star-color-grey star-size padding-top-right-very-small margin-star');
  } else {
    $starIcon.setAttribute('class', 'fa-solid fa-star star-color-goldenrod star-size padding-top-right-very-small margin-star');
  }

  $rowHeader.appendChild($starIcon);

  var $divRow2 = document.createElement('div');
  $divRow2.setAttribute('class', 'row flex-wrap-details');

  $pokemonDetailsBorder.appendChild($divRow2);

  var $divColumn2 = document.createElement('div');
  $divColumn2.setAttribute('class', 'column-half column-full details');

  $divRow2.appendChild($divColumn2);

  var $p1 = document.createElement('p');
  $p1.setAttribute('class', 'josefins-font flavor-text margin-left-15 margin-right-15');

  for (var i = 0; i < responseData.flavor_text_entries.length; i++) {
    if (responseData.flavor_text_entries[i].language.name === 'en') {
      $p1.textContent = responseData.flavor_text_entries[i].flavor_text;
    }
  }

  $divColumn2.appendChild($p1);

  var $span = document.createElement('span');
  $span.setAttribute('class', data.currentPokemon.typing[0] + ' ' + 'margin-left-15 padding-span margin-right-15');
  var capitalTyping = data.currentPokemon.typing[0];
  capitalTyping = capitalTyping.toUpperCase();
  $span.textContent = capitalTyping;
  $divColumn2.appendChild($span);

  if (data.currentPokemon.typing.length > 1) {
    var $span2 = document.createElement('span');
    $span2.setAttribute('class', data.currentPokemon.typing[1] + ' ' + ' padding-span margin-right-15');
    var capitalTyping2 = data.currentPokemon.typing[1];
    capitalTyping2 = capitalTyping2.toUpperCase();
    $span2.textContent = capitalTyping2;
    $divColumn2.appendChild($span2);
  }
  var $divRow3 = document.createElement('div');
  $divRow3.setAttribute('class', 'padding-top-small text-align-left table-flex');

  var $table = document.createElement('table');
  $table.setAttribute('class', 'rationale-font margin-table');

  $divRow3.appendChild($table);

  var $tr = document.createElement('tr');
  $table.appendChild($tr);

  var $th = document.createElement('th');
  $th.textContent = 'Attack: ';

  $tr.appendChild($th);

  var $td = document.createElement('td');
  $td.textContent = data.currentPokemon.attack;

  $tr.appendChild($td);

  var $tdContainer = document.createElement('td');
  $tdContainer.setAttribute('class', 'progress-container');

  $tr.appendChild($tdContainer);
  var $filledDiv = document.createElement('div');
  var width = (data.currentPokemon.attack / 255) * 100;
  width = width + '%';
  $filledDiv.setAttribute('style', 'width:' + width);
  $filledDiv.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer.appendChild($filledDiv);

  var $tr2 = document.createElement('tr');
  $table.appendChild($tr2);

  var $th2 = document.createElement('th');
  $th2.textContent = 'HP: ';

  $tr2.appendChild($th2);

  var $td2 = document.createElement('td');
  $td2.textContent = data.currentPokemon.hp;

  $tr2.appendChild($td2);

  var $tdContainer2 = document.createElement('td');
  $tdContainer2.setAttribute('class', 'progress-container');

  $tr2.appendChild($tdContainer2);
  var $filledDiv2 = document.createElement('div');
  var width2 = (data.currentPokemon.hp / 255) * 100;
  width2 = width2 + '%';
  $filledDiv2.setAttribute('style', 'width:' + width2);
  $filledDiv2.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer2.appendChild($filledDiv2);

  var $tr3 = document.createElement('tr');
  $table.appendChild($tr3);

  var $th3 = document.createElement('th');
  $th3.textContent = 'S.def: ';

  $tr3.appendChild($th3);

  var $td3 = document.createElement('td');
  $td3.textContent = data.currentPokemon.specialDefense;

  $tr3.appendChild($td3);

  var $tdContainer3 = document.createElement('td');
  $tdContainer3.setAttribute('class', 'progress-container');

  $tr3.appendChild($tdContainer3);
  var $filledDiv3 = document.createElement('div');
  var width3 = (data.currentPokemon.specialDefense / 255) * 100;
  width3 = width3 + '%';
  $filledDiv3.setAttribute('style', 'width:' + width3);
  $filledDiv3.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer3.appendChild($filledDiv3);

  var $tr4 = document.createElement('tr');
  $table.appendChild($tr4);

  var $th4 = document.createElement('th');
  $th4.textContent = 'S.attack: ';

  $tr4.appendChild($th4);

  var $td4 = document.createElement('td');
  $td4.textContent = data.currentPokemon.specialAttack;

  $tr4.appendChild($td4);

  var $tdContainer4 = document.createElement('td');
  $tdContainer4.setAttribute('class', 'progress-container');

  $tr4.appendChild($tdContainer4);
  var $filledDiv4 = document.createElement('div');
  var width4 = (data.currentPokemon.specialAttack / 255) * 100;
  width4 = width4 + '%';
  $filledDiv4.setAttribute('style', 'width:' + width4);
  $filledDiv4.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer4.appendChild($filledDiv4);

  var $tr5 = document.createElement('tr');
  $table.appendChild($tr5);

  var $th5 = document.createElement('th');
  $th5.textContent = 'Defense: ';

  $tr5.appendChild($th5);

  var $td5 = document.createElement('td');
  $td5.textContent = data.currentPokemon.defense;

  $tr5.appendChild($td5);

  var $tdContainer5 = document.createElement('td');
  $tdContainer5.setAttribute('class', 'progress-container');

  $tr5.appendChild($tdContainer5);
  var $filledDiv5 = document.createElement('div');
  var width5 = (data.currentPokemon.defense / 255) * 100;
  width5 = width5 + '%';
  $filledDiv5.setAttribute('style', 'width:' + width5);
  $filledDiv5.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer5.appendChild($filledDiv5);

  var $tr6 = document.createElement('tr');
  $table.appendChild($tr6);

  var $th6 = document.createElement('th');
  $th6.textContent = 'Speed: ';

  $tr6.appendChild($th6);

  var $td6 = document.createElement('td');
  $td6.textContent = data.currentPokemon.speed;

  $tr6.appendChild($td6);

  var $tdContainer6 = document.createElement('td');
  $tdContainer6.setAttribute('class', 'progress-container');

  $tr6.appendChild($tdContainer6);
  var $filledDiv6 = document.createElement('div');
  var width6 = (data.currentPokemon.speed / 255) * 100;
  width6 = width6 + '%';
  $filledDiv6.setAttribute('style', 'width:' + width6);
  $filledDiv6.setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
  $tdContainer6.appendChild($filledDiv6);

  var $tr7 = document.createElement('tr');
  $table.appendChild($tr7);

  var $th7 = document.createElement('th');
  $th7.textContent = 'Weight: ';

  $tr7.appendChild($th7);

  var $td7 = document.createElement('td');
  $td7.textContent = data.currentPokemon.weight;

  $tr7.appendChild($td7);

  var $tr8 = document.createElement('tr');
  $table.appendChild($tr8);

  var $th8 = document.createElement('th');
  $th8.textContent = 'Height: ';

  $tr8.appendChild($th8);

  var $td8 = document.createElement('td');
  $td8.textContent = data.currentPokemon.height;

  $tr8.appendChild($td8);

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

  var $star = document.getElementById('star');

  $star.addEventListener('click', starTest);

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
  removeAllChildNodes($pokemonList);
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

function checkFavorites() {
  for (var p = 0; p < data.favorited.length; p++) {
    if (data.currentPokemon.id === data.favorited[p].id) {
      return true;
    }
  }
  return false;
}

function starTest(event) {
  if (checkFavorites() === false) {
    event.target.setAttribute('class', 'fa-solid fa-star star-color-goldenrod star-size padding-top-right-very-small margin-star');
    var favoritedPokemon = {};
    var $h1 = document.querySelector('.name-test');
    var splitHeading = $h1.textContent.split(' ');
    favoritedPokemon.id = splitHeading[0];
    favoritedPokemon.name = splitHeading[1];
    data.favorited.unshift(favoritedPokemon);
    var favoritedTest = createFavorites(favoritedPokemon);
    $favoriteList.appendChild(favoritedTest);

  } else if (checkFavorites() === true) {
    event.target.setAttribute('class', 'fa-solid fa-star star-color-grey star-size padding-top-right-very-small margin-star');
    for (var i = 0; i < data.favorited.length; i++) {
      if (data.favorited[i].id === data.currentPokemon.id) {
        var pokemonId = data.favorited[i].id.slice(1);
        var $findSquare = document.getElementById(pokemonId);
        $findSquare.remove();
        data.favorited.splice(i, 1);

      }
    }
  }
}

function createFavorites(favoritedPokemon) {
  // <div class="square">
  //   <img class="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="">
  //     <p>#1 Bulbasaur</p>
  // </div>
  var pokemonNumberNoOcto = favoritedPokemon.id.slice(1);
  var favoritePokemon = document.createElement('div');
  favoritePokemon.setAttribute('class', 'square');
  favoritePokemon.setAttribute('id', pokemonNumberNoOcto);
  favoritePokemon.setAttribute('data-view', 'pokemon-details');

  var $spriteImg = document.createElement('img');

  $spriteImg.setAttribute('src', 'images/sprites/' + pokemonNumberNoOcto + '.png');
  $spriteImg.setAttribute('class', 'sprite');

  var $pokemonNumberAndName = document.createElement('p');
  $pokemonNumberAndName.setAttribute('class', 'name');
  $pokemonNumberAndName.innerHTML = "<span class='font-blue'>" + '#' + pokemonNumberNoOcto + '</span> ' + favoritedPokemon.name;

  favoritePokemon.appendChild($spriteImg);
  favoritePokemon.appendChild($pokemonNumberAndName);

  return favoritePokemon;
}

var $favoriteAnchor = document.querySelector('#favorites');
var $placeholder = document.querySelector('.placeholder-text');

function changeToFavorites(event) {
  removeAllChildNodes($pokemonDetail);
  if (data.favorited.length > 0) {
    $placeholder.className = 'hidden text-center placeholder-text rationale-font text-white margin-top-small';
  } else {
    $placeholder.className = 'text-center placeholder-text rationale-font text-white margin-top-small';
  }
  var $dataView = event.target.getAttribute('data-view');
  viewSwap($dataView);
}
$favoriteAnchor.addEventListener('click', changeToFavorites);

$favoriteList.addEventListener('click', clickPokemon);

function contentLoadPokemonFavorites(event) {
  for (var i = 0; i < data.favorited.length; i++) {
    var content = createFavorites(data.favorited[i]);
    $favoriteList.prepend(content);
  }
}

window.addEventListener('DOMContentLoaded', contentLoadPokemonFavorites);

var $themesAnchor = document.querySelector('#themes');
var $modalDiv = document.querySelector('.badges-modal');

var modalOn = false;
function viewThemesModal(event) {
  if (modalOn === false) {
    $modalDiv.className = 'badges-modal';
    modalOn = true;
  } else {
    $modalDiv.className = 'badges-modal hidden';
    modalOn = false;
  }
}

$themesAnchor.addEventListener('click', viewThemesModal);

var $cancelButton = document.querySelector('.cancel-button');

$cancelButton.addEventListener('click', viewThemesModal);

var $mainColor = document.querySelector('.maincolor');
var $subColor = document.querySelector('.subcolor');
var $favoriteColor = document.querySelector('.favorite-color');

function changeColorTheme(event) {
  if (event.target.matches('IMG')) {
    var color = event.target.getAttribute('data-color');
    if (color === data.color) {
      data.color = 'default';
      $mainColor.setAttribute('class', 'height-min-max maincolor' + ' background-color-' + 'red');
      $subColor.setAttribute('class', 'row header subcolor' + ' background-color-subcolor-' + 'white');
      $favoriteColor.setAttribute('class', 'container background-color-red');
      var $pokemonDetailsBorderDefault = document.querySelector('.pokemon-details-border');
      if ($pokemonDetailsBorderDefault !== null) {
        $pokemonDetailsBorderDefault.setAttribute('class', 'pokemon-details-border height-test border-' + 'red');
      }
    } else {
      data.color = color;
      $mainColor.setAttribute('class', 'height-min-max maincolor' + ' background-color-' + color);
      $subColor.setAttribute('class', 'row header subcolor' + ' background-color-subcolor-' + color);
      $favoriteColor.setAttribute('class', 'container background-color-' + color);
      var $pokemonDetailsBorder = document.querySelector('.pokemon-details-border');
      if ($pokemonDetailsBorder !== null) {
        $pokemonDetailsBorder.setAttribute('class', 'pokemon-details-border height-test border-' + data.color);
        var $progressBar = document.querySelectorAll('.progress-bar');
        for (var i = 0; i < $progressBar.length; i++) {
          $progressBar[i].setAttribute('class', 'background-color-subcolor-' + data.color + ' ' + 'progress-bar');
        }
      }
    }
  }
}

var $modalBadges = document.querySelector('.first-four-badges');
var $modalBadges2 = document.querySelector('.last-four-badges');

$modalBadges.addEventListener('click', changeColorTheme);
$modalBadges2.addEventListener('click', changeColorTheme);
