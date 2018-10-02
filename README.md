# Sarah: A secure hand cipher.

## What is this?

I made an encryption algorithm named "Sarah" that I think is reasonably secure against non-nation-state attackers, but can be performed completely by hand.

There's JavaScript code so you can play with it yourself.

Unlike every secure cipher in modern use, Sarah uses plain English letters.

## Why did I make this?

I feel there's a dearth of strong ciphers that can be easily understood.

There's a wide gulf between simple cryptogram puzzles in the newspaper, and AES.

I spent a really long time trying to understand what makes DES and AES "strong" ciphers, and found it was really difficult.

So, I made Sarah so that hopefully you can understand a little of the magic that makes strong ciphers work.

Here's hoping this cipher is a useful teaching tool for understanding, and a fun toy to play with.

## Here's why this is hard to break, and other hand ciphers are easy.

Two words: confusion and diffusion.

Confusion (in our letter-y cipher) means that every letter should depend on several parts of the key, and diffusion means that changing a single letter in the plaintext should change all the letters in the output to be any random letter (so 25 out of 26 letters will change, on average).

Hand ciphers almost never mix all letters.

Sarah mixes them all in every round so every output letter is dependent on every input letter.

Hand ciphers don't make everything depend on the key, usually a given ciphertext letter depends on either one or two key letters, at most.

Sarah mixes each letter with the letters to the left each round, while applying a key-based transformation, ensuring the key application is spread across all output letters.

## Definition

Encrypting letters uses two operations: "add", and "encrypt".

To "add" two letters together, they are both looked up in a [tabula recta](https://en.wikipedia.org/wiki/Tabula_recta) and the resulting "sum" letter is written down. This is the same as converting the letters A-Z to 0-25 and adding them together modulo 26.

To "encrypt" a single letter, it is replaced with its corresponding letter in the key. For a key like `qwertyuiopasdfghjklzxcvbnm`, `a` becomes `q`, `b` becomes `w`, and `c` becomes `e`.


Encrypting a round requires these steps:

1) encrypt the first letter
2) add a letter of input to the previous letter of output
3) encrypt that letter
4) add the letter in (3) to the previous letter of input

After a whole round is encrypted, add the last letter to the first (skip the adding step on the last round).

Repeat for as many rounds as are required (3 is recommended for simple examples).

Decryption is just the reverse of these steps.

## Features and caveats

### Features

This cipher uses just plain letters.

It's way easier to understand what's going on than the bits-and-bytes flow diagrams for other ciphers.

Since this cipher is essentially an arbitrarily wide-block cipher, it is also essentially authenticated.

It's not malleable, none of the ciphertext can be modified and still produce a valid plaintext upon decryption.

Appending random letters to a message can provide security against encrypting the same message over and over producing identical ciphertext.

### Caveats

If someone encrypts a bunch of short (<16 letters) messages with the same key, this can probably be broken.

Security is dependent on the non-linearity of the key as an S-box. Keys like "zbcdefghijklmnopqrstuvwxya" will not offer much security.

Security is dependent on the entropy of messages enciphered (if you only encipher messages like "aaaaaaaaaaaaa", this cipher can be broken. (in more technical terms: this cipher is definitely vulnerable to a chosen-plaintext attack).

Security depends on number of rounds. I've chosen 3 rounds as the default for ease of hand-use, but to have any chance of real security if this was used at some crazy scale (enciphering gigabytes of love letters, perhaps), I would estimate that it needs something like 20 rounds.

The cipher isn't guaranteed to use all of the key material, but I would be surprised if this is exploitable, since the set of key material used is likely not predictable from the ciphertext.

## Recommendations

Minimum length 16 characters.

Prefer enciphering longer, higher-entropy messages.

Prefix message with random letters to hit length targets.

Use randomly-generated keys.

Don't use this to encrypt anything important, it's meant to be a toy.

## Test vectors

(3-round variant)

Plaintext: `justalongishregulartestmessagewithperfectlynormalenglishwords`

Key: `xchgdyfvjpbqnletrwmzkoauis`

Ciphertext: `izlbpkccbxxyrehyptfohpaenxyazefojxketaudvorbepzpurkqpufpzwbbr`


Plaintext: `adifferentsamplemessagethatusesthestandardkeyboardlayoutasakey`

Key: `qwertyuiopasdfghjklzxcvbnm`

Ciphertext: `mxaihfjqtypnjeqmcmnvooqdjowywuqigcbcckmpocieitfmidtoucfdogskpb`

## References

links from people asking about pencil-and-paper ciphers:
https://www.reddit.com/r/crypto/comments/94nl2w/is_there_a_quick_and_secure_encryption_method_by/
https://crypto.stackexchange.com/questions/844/is-there-a-secure-cryptosystem-that-can-be-performed-mentally
https://crypto.stackexchange.com/questions/1653/what-is-the-most-secure-hand-cipher
https://crypto.stackexchange.com/questions/8237/is-there-any-strong-enough-pen-and-paper-or-mind-cipher
https://crypto.stackexchange.com/questions/18867/repeatable-crypto
https://crypto.stackexchange.com/questions/52034/whats-the-most-secure-way-to-encrypt-a-string-without-the-use-of-a-computer
https://math.stackexchange.com/questions/458384/cyber-paper-and-pencil

des: https://en.wikipedia.org/wiki/Data_Encryption_Standard
aes: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard

confusion and diffusion: https://en.wikipedia.org/wiki/Confusion_and_diffusion
avalanche effect: https://en.wikipedia.org/wiki/Avalanche_effect
substitution-permutation network: https://en.wikipedia.org/wiki/Substitution-permutation_network

bifid cipher: https://en.wikipedia.org/wiki/Bifid_cipher
the amazing king: http://theamazingking.com/
linear/non-linear functions: https://www.reddit.com/r/cryptography/comments/4cr7e6/what_is_a_linearnonlinear_function_in_cryptography/
