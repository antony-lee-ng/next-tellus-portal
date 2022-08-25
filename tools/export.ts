import { mkdirp, copy } from "fs-extra";
import path from "path";
import { exec, spawn } from "child_process";

(async () => {
  console.log("Building export...");

  // TARGET DIR
  const TARGET_DIR = path.join(
    "//slldrifttools01.gaia.sll.se",
    "tellus",
    "builds"
  );

  // naming convention ex: "next-tellus-portal-0.0.1"
  const VERSION_DIR = `${process.env.npm_package_name}-${process.env.npm_package_version}`;
  const BUILD_DIR = path.join("build", VERSION_DIR);

  await mkdirp(BUILD_DIR);

  const foldersToCopy = [
    "dist",
    ".next",
    "public",
    "package.json",
    ".env.local",
  ];

  foldersToCopy.forEach(async (contentName) => {
    await copy(contentName, path.join(BUILD_DIR, contentName));
  });

  console.log("Downloading packages, this can take a while...\n");
  const child = spawn("yarn install --production", {
    cwd: BUILD_DIR,
    shell: true,
    stdio: "inherit",
  });
  ("C:/Users/adamm/Documents/dev/tellus/next-tellus-portal/build");

  child.on("close", async (code) => {
    console.log(`Moving files to "${TARGET_DIR}" this can take a while`);
    const FINAL_DIR = path.join(TARGET_DIR, VERSION_DIR);

    process.on("SIGINT", () => {
      exec("taskkill /F /T /PID " + process.pid);
    });

    const transfer = spawn(`cp -r ${BUILD_DIR} ${TARGET_DIR}`, {
      cwd: process.cwd(),
      shell: true,
      stdio: "inherit",
    });

    transfer.on("close", (code) => {
      exec(`start ${TARGET_DIR}`);
      // exec(`rm -rf ${BUILD_DIR}`);
    });
  });
})();
