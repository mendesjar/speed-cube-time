import CryptoJS from "crypto-js";

var aleat: string;
var aleatPt = -1;
var passphrase = "";
var salt: string | CryptoJS.lib.WordArray;

export function shuffleCube() {
  var cont = 0;
  var emb: string = "";
  var ant1 = 12;
  var ant2 = 17;
  var mov = 0;
  var duplo = 0;
  while (cont < 23) {
    do {
      mov = nextRnd();
      if (mov >= 12) {
        mov = -1;
      } else if (Math.floor(mov / 2) == Math.floor(ant1 / 2)) {
        if (duplo != 0 || mov != ant1) {
          mov = -1;
        }
      } else if (
        Math.floor(mov / 4) == Math.floor(ant1 / 4) &&
        Math.floor(mov / 2) == Math.floor(ant2 / 2)
      ) {
        mov = -1;
      }
    } while (mov < 0);

    if (duplo == 0 && mov == ant1) {
      duplo = 1;
      if (emb.substr(emb.length - 1, 1) == "'") {
        emb = emb.substr(0, emb.length - 1);
      }
      emb = emb + "2";
      continue;
    }

    switch (mov) {
      case 0:
        emb = emb + " U";
        break;
      case 1:
        emb = emb + " U'";
        break;
      case 2:
        emb = emb + " D";
        break;
      case 3:
        emb = emb + " D'";
        break;
      case 4:
        emb = emb + " R";
        break;
      case 5:
        emb = emb + " R'";
        break;
      case 6:
        emb = emb + " L";
        break;
      case 7:
        emb = emb + " L'";
        break;
      case 8:
        emb = emb + " F";
        break;
      case 9:
        emb = emb + " F'";
        break;
      case 10:
        emb = emb + " B";
        break;
      case 11:
        emb = emb + " B'";
        break;
      default:
        break;
    }
    ant2 = ant1;
    ant1 = mov;
    cont = cont + 1;
  }
  return emb.substr(1);
}

function nextRnd() {
  var v;
  if (aleatPt < 0) {
    obtemAleat();
  }
  v = aleat.substr(aleatPt);
  aleat = aleat.substr(0, aleatPt);
  aleatPt = aleatPt - 1;
  if (v >= "A" && v <= "Z") {
    v = v.charCodeAt(0) - "A".charCodeAt(0) + 10;
  } else {
    v = parseInt(v, 10);
  }
  return v;
}

function obtemAleat() {
  var d;
  d = new Date();
  if (passphrase == "") {
    d = new Date();
    passphrase = "" + d;
    salt = CryptoJS.lib.WordArray.random(128 / 8);
  }
  aleat =
    "" +
    CryptoJS.PBKDF2(passphrase, salt, { keySize: 512 / 32, iterations: 10 });
  aleat = aleat.toUpperCase();
  aleatPt = 127;
  passphrase = "" + aleat;
}
