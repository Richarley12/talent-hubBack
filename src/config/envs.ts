import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT:number;
  JWT_SECRET: string;
  KEY_CRYPTO: string;
  IV_CRYPTO: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    KEY_CRYPTO: joi.string().required(),
    IV_CRYPTO: joi.string().required(),
  })
  .unknown(true);

const { error, value } =envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwt_secret: envVars.JWT_SECRET,
  key_crypto: envVars.KEY_CRYPTO,
  iv_crypto: envVars.IV_CRYPTO,
};
