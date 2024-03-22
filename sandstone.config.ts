import type { SandstoneConfig } from "sandstone";
import { addDependencies } from "./AddDependencies";

export default {
  name: "Illegal Upgradable TNT",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "illegal_upgradable_tnt",
  packUid: "zIoSdkjJ",
  // saveOptions: { path: "./.sandstone/output/datapack"},
  saveOptions: { world: "Comission Mod Test World" },
  onConflict: {
    default: "warn",
  },
  scripts: {
    afterAll: () => {
      // @ts-ignore
      let worldName = this.default.saveOptions.world;
      addDependencies(worldName);
    },
  },
} as SandstoneConfig;
