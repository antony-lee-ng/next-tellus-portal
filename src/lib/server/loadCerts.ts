import { readdirSync, readFileSync } from "fs";
import { extname, join } from "path";

const readFileInDir = (path: string, extNames: string[]) => {
  const dir = readdirSync(path);

  if (dir.length !== 1) {
    const msg = `readFileInDir error, need 1 and only 1 file when reading ${path}`;
    throw new Error(msg);
  }

  let filePath = dir.find((file) => extNames.includes(extname(file)));
  if (!filePath) {
    const msg = `readFileInDir error could not find file with ${extNames} in ${path}`;
    throw new Error(msg);
  }
  return readFileSync(join(path, filePath));
};

export const loadCerts = () => {
  return {
    key: readFileInDir(join(process.cwd(), "certs", "key"), [".key", ".pem"]),
    cert: readFileInDir(join(process.cwd(), "certs", "cert"), [".cer", ".crt"]),
  };
};
