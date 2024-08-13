const CryptoJSUtilFile = require("crypto-js");
const fs = require("fs");
const path = require("path");

const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'config' folder
const configDir = path.resolve(srcDir, "config");
let envFilePath = `${configDir}\\.env`;
if (process.env.NODE_ENV) {
  envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
}
console.log(`Environment file path: ${envFilePath}`);

function encryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  console.log(`Using SALT: ${SALT}`);

  // Check if .env file exists
  if (!fs.existsSync(envFilePath)) {
    console.error(`Error: .env file does not exist at ${envFilePath}`);
    return;
  }

  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const encryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      const encryptedValue = CryptoJSUtilFile.AES.encrypt(
        value,
        SALT
      ).toString();
      console.log(`Encrypting ${key}: ${value} -> ${encryptedValue}`);
      return `${key}=${encryptedValue}`;
    }

    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Encryption complete. Updated .env file.");
}

function decryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  console.log(`Using SALT: ${SALT}`);

  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Decrypt values and update the array
  const decryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      try {
        const decryptedValue = CryptoJSUtilFile.AES.decrypt(
          value,
          SALT
        ).toString(CryptoJSUtilFile.enc.Utf8);
        console.log(`Decrypting ${key}: ${value} -> ${decryptedValue}`);
        return `${key}=${decryptedValue}`;
      } catch (error) {
        console.error(`Failed to decrypt ${key}: ${value}. Error: ${error}`);
      }
    }

    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Decryption complete. Updated .env file.");
}

// Run the encryption and decryption functions for testing
encryptEnvFile(); // Encrypt the .env file
decryptEnvFile(); // Uncomment this line to decrypt the .env file
