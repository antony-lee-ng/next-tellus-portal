import { mkdirp } from "fs-extra";
import path from "path";

(async () => {
  const targetPath = path.join("//slldrifttools01.gaia.sll.se", "tellus");
  await mkdirp(
    path.join(targetPath, "builds", process.env.npm_package_version)
  );
})();
