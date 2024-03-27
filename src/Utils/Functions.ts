import { BLOCKS, ITEMS, LiteralUnion, RootNBT, execute, nbtParser, rel, setblock } from "sandstone";

/**
 * Concatenates the given item with the parsed nbt string.
 *
 * @param {LiteralUnion<ITEMS>} item - The item to be concatenated.
 * @param {RootNBT} nbt - The nbt string to be parsed.
 * @return {string} The concatenated string.
 */
export function i(item: LiteralUnion<ITEMS>, nbt: RootNBT): string {
  return `${item}${nbtParser(nbt)}`;
}

/**
 * Generates a string by concatenating a block with its corresponding NBT.
 *
 * @param {LiteralUnion<BLOCKS>} block - The block to concatenate.
 * @param {RootNBT} nbt - The NBT to concatenate.
 * @return {string} The concatenated string.
 */
export function b(block: LiteralUnion<BLOCKS>, nbt: RootNBT): string {
  return `${block}${nbtParser(nbt)}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The generated random integer.
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomFloatFromInterval(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Generates a random number within a given range, excluding certain values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number[]} exclude - An array of values to exclude from the range.
 * @returns {number | null} - A random number within the range, excluding the specified values. Returns null if all values are excluded.
 */
export function getRandomNumberInRange(min: number, max: number, exclude: number[]): number | null {
  if (max <= min) {
    throw new Error("Invalid range. 'max' should be greater than 'min'.");
  }

  const range = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  // Filter out excluded values
  const availableValues = range.filter((value) => !exclude.includes(value));

  if (availableValues.length === 0) {
    // All values are excluded, return null or handle it as you like
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableValues.length);
  return availableValues[randomIndex];
}

export function randomWithDec(): number {
  let randomNum = Math.random() * 2 - 1;
  randomNum = randomNum === 0 ? 0.0 : randomNum;
  randomNum = randomNum === 1 ? 1.0 : randomNum;
  return parseFloat(randomNum.toFixed(3));
}

/**
 * Replaces each block within the specified range (inclusive), excluding a specified block, with another block or a randomly selected block from an array of blocks.
 *
 * @param {[x: number, y: number, z: number]} from - The starting coordinates of the range (inclusive).
 * @param {[x: number, y: number, z: number]} to - The ending coordinates of the range (inclusive).
 * @param {LiteralUnion<BLOCKS>} blockToExclude - The block to exclude from replacement.
 * @param {LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>} blockToPlace - The block or array of blocks to replace with.
 * @return {void} This function does not return a value.
 */
export function fillRandom(
  from: [x: number, y: number, z: number],
  to: [x: number, y: number, z: number],
  blockToExclude: LiteralUnion<BLOCKS>,
  blockToPlace: LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>
): void {
  for (let i = from[0]; i <= to[0]; i++) {
    for (let j = from[1]; j <= to[1]; j++) {
      for (let k = from[2]; k <= to[2]; k++) {
        execute
          .positioned(rel(i, j, k))
          .if.block(rel(0, 0, 0), blockToExclude)
          .run(() => {
            if (typeof blockToPlace === "string") {
              setblock(rel(0, 0, 0), blockToPlace);
            } else if (Array.isArray(blockToPlace)) {
              setblock(rel(0, 0, 0), blockToPlace[Math.floor(Math.random() * blockToPlace.length)]);
            }
          });
      }
    }
  }
}

export function genDiscOfBlock(
  radius: number,
  density: number,
  floorCoord: number,
  blockToExclude: LiteralUnion<BLOCKS>,
  blockToPlace: LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>,
  radiusGap: number = 1
): void {
  for (let i = 1; i <= radius; i++) {
    for (let j = 1; j <= density; j++) {
      let x = Math.cos(j) * i * radiusGap;
      let z = Math.sin(j) * i * radiusGap;

      execute.if.block(rel(0, floorCoord, 0), blockToExclude).run(() => {
        if (typeof blockToPlace === "string") {
          setblock(rel(x, floorCoord, z), blockToPlace);
        } else if (Array.isArray(blockToPlace)) {
          setblock(rel(x, floorCoord, z), blockToPlace[Math.floor(Math.random() * blockToPlace.length)]);
        }
      });
    }
  }
}

export function genFullDiscOfBlock(radius: number, pointDensity: number): void {
  const circumference: number = 2 * Math.PI * radius;
  const numPoints: number = Math.ceil(circumference * pointDensity);

  const angleIncrement: number = (2 * Math.PI) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const angle: number = i * angleIncrement;
    const x: number = parseFloat((radius * Math.cos(angle)).toFixed(3));
    const z: number = parseFloat((radius * Math.sin(angle)).toFixed(3));

    setblock(rel(x, 0, z), "minecraft:stone");
  }
}
