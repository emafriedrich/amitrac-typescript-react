import cryptojs from 'crypto';

const algorithm = 'aes-256-ctr';
const password = process.env.ENCRYPTION_PASSWORD;

export function encrypt(text: string) {
  var cipher = cryptojs.createCipher(algorithm, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(text: string) {
  var decipher = cryptojs.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
