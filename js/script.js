const cards = [{
  'name': 'square',
  'img': 'assets/cards/blue.svg'
}, {
  'name': 'circle',
  'img': 'assets/cards/green.svg'
}, {
  'name': 'rhombus',
  'img': 'assets/cards/purple.svg'
}, {
  'name': 'plus',
  'img': 'assets/cards/orange.svg'
}, {
  'name': 'star',
  'img': 'assets/cards/red.svg'
}, {
  'name': 'halfcircle',
  'img': 'assets/cards/yellow.svg'
}, {
  'name': 'pink',
  'img': 'assets/cards/pink.svg'
}, {
  'name': 'ring',
  'img': 'assets/cards/brown.svg'
}];



let guessesNumber = 0;
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1000;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

function generateDeck() {
  console.log('start')
  let deck = cards.concat(cards).sort(() => 0.5 - Math.random());

  deck.forEach(function (item) {
    var name = item.name,
        img = item.img;
  
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    var front = document.createElement('div');
    front.classList.add('front');
  
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';
  
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });  
}


var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
  showModalValidation();
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {
  var clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
      guessesNumber++;
      let counter = document.querySelectorAll('.counter')
      counter.forEach(element => element.innerHTML = guessesNumber + ' guesses')
    }
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

function showModalValidation() {
  let matches = document.querySelectorAll('.match');
  if(matches.length/2 == cards.length) {
    let x = document.querySelector('#modal');
    x.classList.remove('d-none');
  }
}

generateDeck();

let button = document.getElementById('restart')

button.addEventListener('click', () => generateDeck())