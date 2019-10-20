
function bip44(){
    let xpub = document.getElementById("xpub_44").value;
    document.getElementById("resultdiv").innerHTML = generateList(44, xpub, number());
}
function bip49() {
    let xpub = document.getElementById("xpub_49").value;
    document.getElementById("resultdiv").innerHTML = generateList(49, xpub, number());
}

function bip84() {
    let xpub = document.getElementById("xpub_84").value;
    document.getElementById("resultdiv").innerHTML = generateList(84, xpub, number());
}

function generateList(derivation, xpub, number) {
    let child = bip32.fromBase58(xpub);
    try {
    }
    catch (err) {
        return "Error: " + err.message
    }
    let output = "";
    output  += "BIP " + derivation + "\n";
    output += "Derivation key" + " for m/" + derivation + "'/0'/0':\n" + child.toBase58() + "\n\n";

    let c;
    let ei;
    let address;

    for (ei = 0; ei <= 1; ei++) {
        output += ((c === 0) ? "receive/external addresses:\n" : "change/internal addresses:\n");
        for (c = 0; c <= number; c++) {
            if (derivation === 44) {
                address = bitcoinlib.payments.p2pkh({pubkey: child.derive(ei).derive(c).publicKey}).address;
            } else if (derivation === 49) {
                address = bitcoinlib.payments.p2sh({redeem: bitcoinlib.payments.p2wpkh({pubkey: child.derive(ei).derive(c).publicKey})}).address;
            } else if (derivation === 84) {
                address = bitcoinlib.payments.p2wpkh({pubkey: child.derive(ei).derive(c).publicKey}).address;
            }
            output += "m/" + derivation + "'/0'/0'/" + ei + "/" + c + ":" + ((c < 10) ? "  " : " ") + address + "\n";
        }
    }
    return output
}
function number() {
    let number = parseInt(document.getElementById("number").value);
    if (Number.isInteger(number) && number <= 1000) {
        return number
    }
    else {
        return 50
    }
}
