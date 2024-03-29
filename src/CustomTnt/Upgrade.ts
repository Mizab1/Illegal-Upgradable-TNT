import { MCFunction } from "sandstone";
import { upgradeTNTGenerics } from "./Private/ComputerHandler/InteractionHandler";

export const upgradeTNT = MCFunction("custom_tnt/upgrade_tnt", () => {
  // * To know if the TNT had upgraded use: /data get entity @e[type=minecraft:item_display, tag=tnt.item_display, limit=1] item.tag.CustomModelData

  // ! Write code in descending order of risk value

  // Acid TNT
  upgradeTNTGenerics("acid.risky", "acid.critical", 130001, "Acid TNT: Risky", "red");
  upgradeTNTGenerics("acid.stable", "acid.risky", 120001, "Acid TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Horror TNT
  upgradeTNTGenerics("horror.risky", "horror.critical", 130002, "Horror TNT: Risky", "red");
  upgradeTNTGenerics("horror.stable", "horror.risky", 120002, "Horror TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Dino TNT
  upgradeTNTGenerics("dino.risky", "dino.critical", 130003, "Dinosaur TNT: Risky", "red");
  upgradeTNTGenerics("dino.stable", "dino.risky", 120003, "Dinosaur TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Magnetic TNT
  upgradeTNTGenerics("magnetic.risky", "magnetic.critical", 130004, "Magnetic TNT: Risky", "red");
  upgradeTNTGenerics("magnetic.stable", "magnetic.risky", 120004, "Magnetic TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Safari TNT
  upgradeTNTGenerics("safari.risky", "safari.critical", 130005, "Safari TNT: Risky", "red");
  upgradeTNTGenerics("safari.stable", "safari.risky", 120005, "Safari TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Twilight Forest TNT
  upgradeTNTGenerics("twilight.risky", "twilight.critical", 130006, "Twilight Forest TNT: Risky", "red");
  upgradeTNTGenerics("twilight.stable", "twilight.risky", 120006, "Twilight Forest TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Aquatic TNT
  upgradeTNTGenerics("aquatic.risky", "aquatic.critical", 130007, "Aquatic TNT: Risky", "red");
  upgradeTNTGenerics("aquatic.stable", "aquatic.risky", 120007, "Aquatic TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Ender TNT
  upgradeTNTGenerics("ender.risky", "ender.critical", 130008, "Ender TNT: Risky", "red");
  upgradeTNTGenerics("ender.stable", "ender.risky", 120008, "Ender TNT: Stable", "yellow");
  // Tier 1 is default/base TNT

  // Dragon TNT
  upgradeTNTGenerics("dragon.risky", "dragon.critical", 130009, "Dragon TNT: Risky", "red");
  upgradeTNTGenerics("dragon.stable", "dragon.risky", 120009, "Dragon TNT: Stable", "yellow");
  // Tier 1 is default/base TNT
});
