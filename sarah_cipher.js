var used = new Set();

function clean(str) {
  return str.replace(/[^A-Za-z]/g, '').toLowerCase();
}

function add(letter1, letter2) {
  return String.fromCharCode((letter1.charCodeAt(0) + letter2.charCodeAt(0) - 97 * 2) % 26 + 97);
}

function sub(letter1, letter2) {
  return String.fromCharCode((letter1.charCodeAt(0) - letter2.charCodeAt(0) + 26) % 26 + 97);
}

function rotateAddRight(input) {
  var first = add(encryptCharacter(add(input[0], input[input.length - 1]), key), input[input.length - 1]);
  return first + input.slice(1, input.length);
}

function rotateAddLeft(input) {
  var first = sub(decryptCharacter(sub(input[0], input[input.length - 1]), key), input[input.length - 1]);
  return first + input.slice(1, input.length);
}

function encryptCharacter(character, key) {
  return key[character.charCodeAt(0) - 97];
}

function decryptCharacter(character, key) {
  return String.fromCharCode(key.indexOf(character) + 97);
}

function ige(input, key, isLast) {
  var output = encryptCharacter(input[0], key);
  for (var i = 1; i < input.length; i++) {
    // Track how much key material we're using.
    used.add(add(input[i], output[i - 1]));
    output += add(encryptCharacter(add(input[i], output[i - 1]), key), input[i - 1]);
    if (!isLast) {
      output[i] = add(output[i], input[i - 1]);
    }
  }
  return output;
}

function unige(input, key, isFirst) {
  var output = decryptCharacter(input[0], key);
  for (var i = 1; i < input.length; i++) {
    output += sub(decryptCharacter(sub(input[i], output[i - 1]), key), input[i - 1]);
    if (!isFirst) {
      output[i] = sub(output[i], input[i - 1]);
    }
  }
  return output;
}

function round(input, key) {
  var out = input;
  out = ige(out, key, false);
  //console.log('ige (3 ops/char)');
  console.log('ige:      ', out);
  out = rotateAddRight(out);
  console.log('rar:      ', out);
  return out;
}

function reverseRound(input, key) {
  var out = input;
  out = rotateAddLeft(out);
  out = unige(out, key, false);
  return out;
}

function encrypt(plaintext, key, rounds) {
  var keyCopy = Array.from(key);
  keyCopy.sort();
  if (keyCopy.join('') !== 'abcdefghijklmnopqrstuvwxyz') {
    throw 'invalid key';
  }
  console.log('plaintext: ' + plaintext);
  //console.log('key: ' + key);
  //console.log('rounds: ' + rounds);
  var output = plaintext;
  for (var i = 0; i < rounds - 1; i++) {
    //console.log('encrypt round: ' + (i + 1));
    output = round(output, key);
  }
  //console.log('final (3 ops/char)');
  return ige(output, key, true);
}

function decrypt(ciphertext, key, rounds) {
  var output = unige(ciphertext, key, true);
  for (var i = 0; i < rounds - 1; i++) {
    output = reverseRound(output, key);
  }
  return output;
}

roundCount = 3
var key = 'xchgdyfvjpbqnletrwmzkoauis';
var plaintext = clean('sphinxofblackquartzjudgemyvow');
var plaintext = clean('kkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
var plaintext = clean('justalongishregulartestmessagewithperfectlynormalenglishwords');
ciphertext = encrypt(plaintext, key, roundCount);
console.log('encrypted: ' + ciphertext);
console.log('used: ' + used.size);
console.log('-----');
decrypted = decrypt(ciphertext, key, roundCount);
console.log('decrypted: ' + decrypted);
