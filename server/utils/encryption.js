// import crypto from 'crypto';

// // Encryption key (loaded from .env)
// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// // Encrypt data
// export const encrypt = (text) => {
//   const iv = crypto.randomBytes(16); // Initialization vector
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
// };

// // Decrypt data
// export const decrypt = (text) => {
//   const [iv, encrypted] = text.split(':');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
//   let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// };