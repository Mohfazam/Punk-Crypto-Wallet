let privateKey, publicKey, signature;


function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}


function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}


document.getElementById('generateKeysBtn').addEventListener('click', async () => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
    );
    privateKey = keyPair.privateKey;
    publicKey = keyPair.publicKey;

    // Export public and private keys as base64 strings
    const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', publicKey);
    const privateKeyBuffer = await window.crypto.subtle.exportKey('pkcs8', privateKey);

    document.getElementById('publicKey').value = arrayBufferToBase64(publicKeyBuffer);
    document.getElementById('privateKey').value = arrayBufferToBase64(privateKeyBuffer);
});


document.getElementById('signBtn').addEventListener('click', async () => {
    const message = document.getElementById('message').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    if (!privateKey) {
        alert("Please generate a key pair first!");
        return;
    }

    signature = await window.crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        privateKey,
        data
    );

    alert("Message signed successfully!");
});


document.getElementById('verifyBtn').addEventListener('click', async () => {
    const message = document.getElementById('message').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    if (!publicKey || !signature) {
        alert("Please sign a message first!");
        return;
    }

    const isValid = await window.crypto.subtle.verify(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        publicKey,
        signature,
        data
    );

    if (isValid) {
        alert("Signature is valid!");
    } else {
        alert("Signature is invalid.");
    }
});
