import { MCFunction } from "sandstone";
import { upgradeTNTGenerics } from "./Private/ComputerHandler/InteractionHandler";

export const upgradeTNT = MCFunction("custom_tnt/upgrade_tnt", () => {
  // ! Write code in descending order of risk value
  upgradeTNTGenerics("5x.risky", "5x.critical", 130001, "5x TNT: Risky", "green");
  upgradeTNTGenerics("5x.stable", "5x.risky", 120001, "5x TNT: Stable", "yellow");
});
