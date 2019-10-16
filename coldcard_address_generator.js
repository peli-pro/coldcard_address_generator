/// At this time only bitcoin mainnet is implemented
/// you need to provide the xpub, you can not provide zpub or ypub !
/// but you could convert a zpub (BIP-84) or ypub (BIP-44) to a xpub here: https://jlopp.github.io/xpub-converter/

/// for testing purpose the xpubs provided here are derived from the mnemonic:
/// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

/// Please provide the xpubs from your coldcard public.txt

/// xpub from this part:
/// ## For BIP44 / Electrum: m/44'/0'/{account}'/{change}/{idx}
/// m/44'/0'/0' =>
const xpub_44h_0h_0h = 'xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj';

/// xpub from this part:
/// ## For BIP49 (P2WPKH-nested-in-P2SH): m/49'/0'/{account}'/{change}/{idx}
/// m/49'/0'/0' =>
const xpub_49h_0h_0h = 'xpub6C6nQwHaWbSrzs5tZ1q7m5R9cPK9eYpNMFesiXsYrgc1P8bvLLAet9JfHjYXKjToD8cBRswJXXbbFpXgwsswVPAZzKMa1jUp2kVkGVUaJa7';

/// xpub from this part:
/// ## For BIP84 (Native Segwit P2PKH): m/84'/0'/{account}'/{change}/{idx}
/// m/84'/0'/0' =>
const xpub_84h_0h_0h = 'xpub6CatWdiZiodmUeTDp8LT5or8nmbKNcuyvz7WyksVFkKB4RHwCD3XyuvPEbvqAQY3rAPshWcMLoP2fMFMKHPJ4ZeZXYVUhLv1VMrjPC7PW6V';

/// If needed change the number of printed keys here:
const n = 20;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// Do not edit below this line ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bitcoin = require("bitcoinjs-lib"); // npm install bitcoinjs-lib
const bip32 = require("bip32"); // npm install bip32

var c;

child_44h_0h_0h  = bip32.fromBase58(xpub_44h_0h_0h);
child_49h_0h_0h  = bip32.fromBase58(xpub_49h_0h_0h);
child_84h_0h_0h  = bip32.fromBase58(xpub_84h_0h_0h);

////// Generate Addresses from xpubs

/////////// BIP 44
console.log("\n\nBIP 44 derivation m/44'/0'/0' recieve/external and change/internal addresses: ");
console.log("Derivation from this key:", child_44h_0h_0h.toBase58())
console.log("recieve/external addresses:");

for (c = 0; c <= n; c++) {
    address = bitcoin.payments.p2pkh({pubkey: child_44h_0h_0h.derive(0).derive(c).publicKey}).address;
    console.log("m/44'/0'/0'/".concat("0", "/", c, ": ", address))
}
console.log("change/internal addresses:");
for (c = 0; c <= n; c++) {
    address = bitcoin.payments.p2pkh({pubkey: child_44h_0h_0h.derive(1).derive(c).publicKey}).address;
    console.log("m/44'/0'/0'/".concat("1", "/", c, ": ", address))
}

////////// BIP49
console.log("\n\nBIP 49 derivation m/49'/0'/0' recieve/external and change/internal addresses: ");
console.log("Derivation from this key:", child_49h_0h_0h.toBase58())

console.log("recieve/external addresses:");
for (c = 0; c <= n; c++) {
    //address = bitcoin.payments.p2pkh({pubkey: child_44h_0h_0h.derive(0).derive(c).publicKey}).address;
    address = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({
        pubkey: child_49h_0h_0h.derive(0).derive(c).publicKey
      }),
    }).address;
    console.log("m/49'/0'/0'/".concat("0", "/", c, ": ", address))
}

console.log("change/internal addresses:");
for (c = 0; c <= n; c++) {
    //address = bitcoin.payments.p2pkh({pubkey: child_44h_0h_0h.derive(0).derive(c).publicKey}).address;
    address = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({
        pubkey: child_49h_0h_0h.derive(1).derive(c).publicKey
      }),
    }).address;
    console.log("m/49'/0'/0'/".concat("1", "/", c, ": ", address))
}

//////////// BIP84
console.log("\n\nBIP 84 derivation m/84'/0'/0' recieve/external and change/internal addresses: ");
console.log("Derivation from this key:", child_84h_0h_0h.toBase58())

console.log("recieve/external addresses:");
for (c = 0; c <= n; c++) {
    address = bitcoin.payments.p2wpkh({pubkey: child_84h_0h_0h.derive(0).derive(c).publicKey}).address;
    console.log("m/44'/0'/0'/".concat("0", "/", c, ": ", address))
}

console.log("change/internal addresses:");
for (c = 0; c <= n; c++) {
    address = bitcoin.payments.p2wpkh({pubkey: child_84h_0h_0h.derive(1).derive(c).publicKey}).address;
    console.log("m/44'/0'/0'/".concat("1", "/", c, ": ", address))
}







