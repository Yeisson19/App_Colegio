import { JSEncrypt } from 'jsencrypt';
import  publicKey   from './key/public.jsx';
import  privateKey  from './key/private';

// Crea una instancia de JSEncrypt
const rsa = new JSEncrypt();
// Función para encriptar un objeto
export const Encriptar = (data) => {
    try {
        rsa.setPublicKey(publicKey);
        const encrypted = rsa.encrypt(data);
        return encrypted;
    } catch (error) {
        console.error('Error al encriptar el objeto:', error);
        return null;
    }
};

// Función para desencriptar un objeto
export const Desencriptar  = (encryptedData) => {
    try {
        rsa.setPrivateKey(privateKey);
        const decrypted = rsa.decrypt(encryptedData);
        return JSON.parse(decrypted);
    } catch (error) {
        console.error('Error al desencriptar el objeto:', error);
        return null;
    }
};
