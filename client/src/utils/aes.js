import CryptoJS from "crypto-js";

var secret_key = import.meta.env.VITE_PUBLIC_KEY;

export const to_Encrypt = (text) => {
  var ciphertext = CryptoJS.AES.encrypt(text, secret_key).toString();
  return ciphertext;
};

export const to_Decrypt = (cipher, date) => {
  if (!cipher || !date) return;
  if (new Date(date) < new Date(1691429327433)) return cipher;
  var bytes = CryptoJS.AES.decrypt(cipher, secret_key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
