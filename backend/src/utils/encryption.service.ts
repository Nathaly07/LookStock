import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey = process.env.ENCRYPTION_SECRET || 'default_secret_key_32_characters';
  private readonly ivLength = 16;

  constructor() {
    if (this.secretKey.length !== 32) {
      throw new Error('La clave de encriptación debe tener exactamente 32 caracteres.');
    }
  }

  encryptData(data: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    const result = `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    console.log('Datos cifrados:', result);
    return result;
  }

  decryptData(encryptedData: string): string {
    console.log('Intentando descifrar:', encryptedData);
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

    console.log('Datos descifrados:', decrypted.toString('utf8'));
    return decrypted.toString('utf8');
  }
}

