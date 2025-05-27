import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes,  } from "crypto";
import { envs } from 'src/config/envs';

@Injectable()
export class CryptoService {
    private readonly algorithm = 'aes-256-cbc';

        // Función para encriptar
        async encrypt(key:string,id:string, data:string): Promise<string> {
            try {
              const iv = Buffer.from(id.padEnd(16, '0'), 'utf8');
                const cipher = createCipheriv(
                    this.algorithm,Buffer.from(key, 'utf8'),iv);            
                const encrypted = cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
                return encrypted; // Truncar a 10 caracteres
            } catch (error) {
                console.error('Error al encriptar:', error);
                throw error;
            }
        }

        async decrypt(data: string): Promise<string> {
          try {
            const key = Buffer.from(envs.key_crypto, 'utf8');
            const iv = Buffer.from(envs.iv_crypto.padEnd(16, '0'), 'utf8');
      
            const decipher = createDecipheriv(this.algorithm, key, iv);
            let decrypted = decipher.update(data, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
      
            return decrypted;
          } catch (error) {
            console.error('Error al desencriptar:', error);
            return ''
          }
          }

          async generateRandomHex(length: number): Promise<string> {
            const bytes = randomBytes(Math.ceil(length / 2)); // Genera suficientes bytes
            return bytes.toString('hex').slice(0, length); // Convierte a hex y corta
          }
      

}
