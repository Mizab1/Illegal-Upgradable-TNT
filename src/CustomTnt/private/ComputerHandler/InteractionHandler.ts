import { Selector, execute, kill, say } from "sandstone";
import { self } from "../../../Tick";

export const interactionHandler = () => {
  execute
    .as(Selector("@e", { type: "minecraft:interaction", tag: "tnt.laptop.interaction" }))
    .at(self)
    .run(() => {
      // Check if the laptop is interacted
      execute.if.data.entity(self, "interaction").run(() => {
        say("Working!");

        // Kill the interaction entity
        kill(self);
        // Kill the nearest item display
        kill(Selector("@e", { type: "minecraft:item_display", tag: "tnt.laptop.display", distance: [Infinity, 0.5] }));
      });
    });
};
