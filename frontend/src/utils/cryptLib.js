import CryptoJS from "crypto-js";

export default class CryptLib {
  constructor() {
    this._maxKeySize = 32;
    this._maxIVSize = 16;
    this._algorithm = "AES-256-CBC";
    this._charset = "utf8";
    this._encoding = "base64";
    this._hashAlgo = "sha256";
    this._digestEncoding = "hex";
  }

  _encryptDecrypt(text, key, initVector, isEncrypt) {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(initVector);

    if (isEncrypt) {
      const encrypted = CryptoJS.AES.encrypt(text, keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    } else {
      const decrypted = CryptoJS.AES.decrypt(text, keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }

  getHashSha256(key, length) {
    const fullHash = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, length);
  }

  encrypt(plainText, key, initVector) {
    return this._encryptDecrypt(plainText, key, initVector, true);
  }

  decrypt(encryptedText, key, initVector) {
    return this._encryptDecrypt(encryptedText, key, initVector, false);
  }
}