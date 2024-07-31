const glob = require("fast-glob");
const fs = require("fs");

const data = {};

/**
 * @param {string} path
 */
function convertPath(path) {
  const splitPath = path.split("/");
  splitPath.shift();
  splitPath.shift();
  const category = splitPath.shift();

  const component = splitPath[0].replace(".webp", "");
  const compSplit = component.split("_");
  const drawable = parseInt(compSplit.pop());
  compSplit.pop();
  let dlc = compSplit.join("_");

  if (dlc === "0") {
    dlc =
      path.includes("mp_f") || path.includes("Female_") ? "mp_f_freemode_01" : "mp_m_freemode_01";
  }

  return { category, dlc, drawable };
}

const femaleTops = glob.sync("./female/**/*.webp").map((x) => convertPath(x));

const maleTops = glob.sync("./male/**/*.webp").map((x) => convertPath(x));

fs.writeFileSync("male.json", JSON.stringify(maleTops, null, "\t"));
fs.writeFileSync("female.json", JSON.stringify(femaleTops, null, "\t"));
