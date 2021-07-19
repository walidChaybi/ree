import { AES, enc } from "crypto-js";

export class Crypto {
  static encrypte(message: string, pass: string): string {
    return AES.encrypt(message, pass).toString();
  }
  static decrypte(message: string, pass: string): string {
    return AES.decrypt(message, pass).toString(enc.Utf8);
  }
}
