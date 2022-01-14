import fs from "fs";
import path from "path";
import { layers, rarities, weights } from "./constants";

export const assignWeights = (): void => {
  layers.forEach((layer) => {
    rarities.forEach((rarity) => {
      const oldPathBase = path.join(__dirname, "../layers", layer, rarity);
      const files = fs.readdirSync(oldPathBase);
      const weight = Math.round(weights[rarity] / files.length);
      files.forEach((file) => {
        const oldPath = path.join(__dirname, "../layers", layer, rarity, file);
        const parsedFile = path.parse(oldPath);
        const ext = parsedFile.ext;
        const name = parsedFile.name;
        const newPathBase = path.join(__dirname, `../layers-new/${layer}`);
        const newPath = path.join(newPathBase, `${name}#${weight}${ext}`);
        try {
          fs.mkdirSync(newPathBase);
        } catch (e) {}
        console.log(oldPath, "==>", newPath);
        fs.copyFileSync(oldPath, newPath);
      });
    });
  });
};
