// async function generateKeyPair(){
//     const keyPair = await crypto.subtle.generateKey({
//         name: "RSASSA-PKCS1-v1_5",
//         modulusLength: 2048,
//         publicExponent: new Uint8Array([1, 0, 1]),
//         has: {name: "SHA-256"}
//     }, true, ["sign", "verify"]);

//     return keyPair;
// }

// generateKeyPair().then((keyPair) => {
//     console.log("Private Key: ", keyPair.privateKey);
//     console.log("Public Key: ", keyPair.publicKey);
// });






// Generating an RSA key pair
async function generateKeyPair() {
    const keyPair = await crypto.subtle.generateKey({
      name: "RSASSA-PKCS1-v1_5",  // Algorithm to use
      modulusLength: 2048,         // Key size (security strength)
      publicExponent: new Uint8Array([1, 0, 1]), // Part of the key generation
      hash: { name: "SHA-256" }    // Hashing algorithm
    }, true, ["sign", "verify"]);  // 'sign' for private key, 'verify' for public key
    
    // keyPair contains both private and public keys
    return keyPair;
  }
  
  generateKeyPair().then((keyPair) => {
    console.log("Private Key:", keyPair.privateKey);
    console.log("Public Key:", keyPair.publicKey);
  });
  