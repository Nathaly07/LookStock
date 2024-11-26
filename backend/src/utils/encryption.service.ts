import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr'; // Algoritmo de cifrado
  private readonly secretKey = process.env.ENCRYPTION_SECRET || 'default_secret_key_32_characters'; // Clave secreta (debe ser exactamente 32 caracteres)
  private readonly ivLength = 16; // Longitud del vector de inicialización (IV)

  constructor() {
    if (this.secretKey.length !== 32) {
      throw new Error('La clave de encriptación debe tener exactamente 32 caracteres.');
    }
  }

  /**
   * Cifra datos sensibles.
   * @param data Texto a cifrar.
   * @returns Cadena cifrada con IV incluido.
   */
  encryptData(data: string): string {
    const iv = crypto.randomBytes(this.ivLength); // Crear un IV único para este cifrado
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    // Retornar el IV y el contenido cifrado como una única cadena
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  /**
   * Descifra datos previamente cifrados.
   * @param encryptedData Cadena cifrada con IV incluido.
   * @returns Texto descifrado.
   */
  decryptData(encryptedData: string): string {
    const [iv, encrypted] = encryptedData.split(':');
    if (!iv || !encrypted) {
      throw new Error('El formato de los datos cifrados es inválido.');
    }

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(iv, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
