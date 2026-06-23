import { createRequire } from "module";
const require = createRequire(import.meta.url); // Create the require because we use module as the default in package.sjon

const sum = require("./sum.cjs");
import sub from "./subtract.mjs";

console.log(sum(2, 2));
console.log(sub(2, 2));
