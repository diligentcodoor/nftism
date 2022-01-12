import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import { rarities } from "./constants";

const hexToRgb = (hex: string): Record<string, number> | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const colors = (): Record<string, string> => {
  const colors = {
    black: "#000000",
    royal: "#000F80",
    sky: "#36B8F9",
    purple: "#6D11C3",
    maroon: "#710505",
    lime: "#81E85C",
    lemon: "#E8CB64",
    pink: "#FF7A99",
    orange: "#FF8C00",
    white: "#FFFFFF",
  };
  const getColors = (): Record<string, string> => {
    return fs
      .readdirSync(path.join(__dirname, "../layers/background/common"))
      .reduce((dict, file) => {
        const [hex, color] = file.split("-");
        dict[color.replace(".png", "")] = hex;
        return dict;
      }, {} as Record<string, string>);
  };
  return colors || getColors();
};

export const createFontColorCombinations = () => {
  rarities.forEach((rarity) => {
    const pathBase = path.join(__dirname, "../layers/font", rarity);
    const files = fs.readdirSync(pathBase);
    files.forEach((file) => {
      const parsedFile = path.parse(file);
      const ext = parsedFile.ext;
      const name = parsedFile.name;
      Object.keys(colors()).forEach((color) => {
        const png = PNG.sync.read(fs.readFileSync(path.join(pathBase, file)));
        for (let y = 0; y < png.height; y++) {
          for (let x = 0; x < png.width; x++) {
            const idx = (png.width * y + x) << 2;
            const rgb = hexToRgb(colors()[color]);
            png.data[idx] = rgb?.r ?? 0;
            png.data[idx + 1] = rgb?.g ?? 0;
            png.data[idx + 2] = rgb?.b ?? 0;
          }
        }
        fs.writeFileSync(
          `${pathBase}/${color}-${name}${ext}`,
          PNG.sync.write(png)
        );
      });
      fs.rmSync(`${pathBase}/${file}`);
    });
  });
};

export const colorFontsReplaceDash = () => {
  rarities.forEach((rarity) => {
    const pathBase = path.join(__dirname, "../layers/font", rarity);
    const files = fs.readdirSync(pathBase);
    files.forEach((file) => {
      fs.renameSync(
        path.join(pathBase, file),
        path.join(pathBase, file.replace("-", "_"))
      );
    });
  });
};
