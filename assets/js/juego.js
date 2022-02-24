let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Refenacias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');



// Esta funcion crea una nueva baraja
const crearDeck = () => {
    deck=[];
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);

        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);

        }
    }

    // console.log(deck);

    deck = _.shuffle(deck);

    console.log(deck);
    return deck;
}

crearDeck();



// Esta funcion toma una carta de la baraja

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas';
    }

    const carta = deck.shift();
    // console.log(carta);   // Esta carta que debe ser de la baraja

    // console.log(deck);

    return carta;
}

// pedirCarta();



//Esta función da valor a cada carta

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    // let puntos=0;

    let puntos = (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;

    // if (isNaN(valor)){
    //     puntos=(valor==='A')?11:10;

    // }
    // else{
    //     console.log('Es un numero');
    //     puntos=valor*1;
    // }

    return puntos;
}


// Turno de la Computadora
const turnoComputadora = (puntosMinimos) => {
    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);

        console.log(puntosComputadora);

        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
        
        if(puntosMinimos===puntosComputadora){
            alert ('Empataste');
        }else if(puntosMinimos>21){
            alert('Jugador Pierde');
        }else if(puntosComputadora>21){
            alert('Jugador Gana');
        // }else if (puntosMinimos<puntosComputadora&&puntosComputadora<=21){
        //     alert ('Gana Computadora');
        // }else if(puntosMinimos>puntosComputadora&&puntosComputadora>21){
        //     alert ('Jugador Gana');
        // }
        }else{
            alert('Computadora Gana')
        }

    }, 200);

}




//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdio');
        btnPedir.disabled = true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }


});


btnDetener.addEventListener('click', () => {

    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador)
       
});


btnNuevo.addEventListener('click',() => {
    
    console.clear();
    
    crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;

    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';
    
    btnPedir.disabled=false;
    btnDetener.disabled=false;



});
