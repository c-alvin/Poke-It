/* exported data */
var data = {
  view: 'pokemon-view',
  pokeGenBoundaries: {
    national: {
      start: 1,
      end: 898
    },
    gen1: {
      start: 1,
      end: 151
    },
    gen2: {
      start: 152,
      end: 251
    },
    gen3: {
      start: 252,
      end: 386
    },
    gen4: {
      start: 387,
      end: 493
    },
    gen5: {
      start: 494,
      end: 649
    },
    gen6: {
      start: 650,
      end: 721
    },
    gen7: {
      start: 722,
      end: 809
    },
    gen8: {
      start: 810,
      end: 898
    }
  },
  favorited: [],
  currentPokemon: {
    id: null,
    heading: null,
    typing: [],
    hp: null,
    attack: null,
    specialAttack: null,
    specialDefense: null,
    defense: null,
    speed: null,
    weight: null,
    height: null,
    img: null
  }
};

var storedData = localStorage.getItem('pokemon-data');
if (storedData !== null) {
  data = JSON.parse(storedData);
}

function stringJson(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pokemon-data', dataJSON);
}

window.addEventListener('beforeunload', stringJson);
