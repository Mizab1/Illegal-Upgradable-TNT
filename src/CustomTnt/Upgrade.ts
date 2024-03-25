import { MCFunction } from "sandstone";
import { upgradeTNTGenerics } from "./Private/ComputerHandler/InteractionHandler";

export const upgradeTNT = MCFunction("custom_tnt/upgrade_tnt", () => {
  // * To know if the TNT had upgraded use: /data get entity @e[type=minecraft:item_display, tag=tnt.item_display, limit=1] item.tag.CustomModelData

  // ! Write code in descending order of risk value
  upgradeTNTGenerics("acid.risky", "acid.critical", 130001, "Acid TNT: Risky", "green");
  upgradeTNTGenerics("acid.stable", "acid.risky", 120001, "Acid TNT: Stable", "yellow");
  // Tier 1 is default/base TNT
});
