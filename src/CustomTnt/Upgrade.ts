import { MCFunction } from "sandstone";
import { upgradeTNTGenerics } from "./Private/ComputerHandler/InteractionHandler";

export const upgradeTNT = MCFunction("custom_tnt/upgrade_tnt", () => {
  upgradeTNTGenerics("5x.stable", "5x.risky", 110002, "5x TNT: Stable", "yellow");
});
