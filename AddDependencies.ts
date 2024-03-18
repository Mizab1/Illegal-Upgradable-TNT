import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

function addDatapacks(worldName) {
  const sourcePathDatapacks = `dependencies/datapacks`;
  const destPathDatapacks = `%AppData%/.minecraft/saves/${worldName}/datapacks/`;

  // Loop through each directory in datapack folder
  const subdirectories = fs
    .readdirSync(sourcePathDatapacks, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  // Copy each subdirectory to the destination path
  for (const subdirectory of subdirectories) {
    const sourceSubdirectory = path.join(sourcePathDatapacks, subdirectory);
    const destinationSubdirectory = path.join(destPathDatapacks, subdirectory);

    try {
      // Use the "robocopy" command to copy the subdirectory
      execSync(`robocopy "${sourceSubdirectory}" "${destinationSubdirectory}" /s /e /mir /nfl /ndl`, { stdio: "inherit" });
      console.log(`Copied: ${sourceSubdirectory} to ${destinationSubdirectory}`);
    } catch (error) {
      // console.error(`Error copying ${sourceSubdirectory}: ${error.message}`);
    }
  }
}
function addResources(worldName) {
  const sourcePathResources = `dependencies/resources`;
  const destPathResources = `%AppData%/.minecraft/resourcepacks/`;

  // Loop through each directory in datapack folder
  const subdirectories = fs
    .readdirSync(sourcePathResources, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  // Copy each subdirectory to the destination path
  for (const subdirectory of subdirectories) {
    const sourceSubdirectory = path.join(sourcePathResources, subdirectory);
    const destinationSubdirectory = path.join(destPathResources, subdirectory);

    try {
      // Use the "robocopy" command to copy the subdirectory
      execSync(`robocopy "${sourceSubdirectory}" "${destinationSubdirectory}" /s /e /mir /nfl /ndl`, { stdio: "inherit" });
      console.log(`Copied: ${sourceSubdirectory} to ${destinationSubdirectory}`);
    } catch (error) {
      // console.error(`Error copying ${sourceSubdirectory}: ${error.message}`);
    }
  }
}

export function addDependencies(worldName) {
  if (worldName) {
    addDatapacks(worldName);
    addResources(worldName);
  } else {
    console.error("saveOption is set to path and not world");
  }
}
