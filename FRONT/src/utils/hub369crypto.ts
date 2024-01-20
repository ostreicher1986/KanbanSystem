const crypto = require("crypto")

//import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-192-cbc';
const key = 'kSJKksjKsjKsjsi7823#6578';

export const encrypt = (plaintext: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${encrypted}${iv.toString('hex')}`; // os últimos 32 caracteres são a chave para descriptografar
}

export const decrypt = (encryptText: string) => {
    const iv = encryptText.slice(-32); // os últimos 32 caracteres são a chave para descriptografar
    const et = encryptText.slice(0, -32); // obtem somente a parte da requisição
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(et, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}