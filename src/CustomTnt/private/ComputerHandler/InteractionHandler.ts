import { Data, NBT, Selector, _, execute, kill, rel, say, summon, tag } from "sandstone";
import { self } from "../../../Tick";
import { upgradeTNT } from "../../Upgrade";
import { scheduleTimer } from "./ScheduleTimer";
import { TNT_PARENT_ENTITY } from "../SetupGenerics";
export const interactionHandler = () => {
  execute
    .as(Selector("@e", { type: "minecraft:interaction", tag: "tnt.laptop.interaction" }))
    .at(self)
    .run(() => {
      // Check if the laptop is interacted
      execute.if.data.entity(self, "interaction").run(() => {
        upgradeTNT();
      });
    });
};

export const upgradeTNTGenerics = (currentTNTTag: string, nextTNTTag: string, nextCustomModelData: number): void => {
  //* Called with the context of interaction entity with positional context

  // Set the schedule timer
  execute
    .positioned(rel(0, -1, 0))
    .as(Selector("@e", { type: TNT_PARENT_ENTITY, distance: [Infinity, 0.5] }))
    .at(self)
    .run(() => {
      // * Switch the context to armor stand

      // Check the current tag
      execute.if.entity(Selector("@s", { tag: `tnt.${currentTNTTag}` })).run(() => {
        const maxDelay = 40;

        _.if(Selector("@s", { tag: "!running" }), () => {
          scheduleTimer.set(maxDelay);
          tag(self).add("running");
        });

        // Start sequence
        _.if(scheduleTimer.matches(maxDelay), () => {
          // Summon a text display above the laptop
          summon("minecraft:text_display", rel(0, 2, 0), {
            billboard: "vertical",
            shadow: NBT.byte(1),
            Tags: ["tnt.laptop.text"],
            text: '{"text":"Initializing..."}',
          });
        });

        // End sequence
        _.if(scheduleTimer.matches(0), () => {
          tag(self).add(`tnt.${nextTNTTag}`);
          tag(self).remove(currentTNTTag);
          Data("entity", self).select("Passengers[0].item.tag.CustomModelData").set(nextCustomModelData);

          // Kill the laptop and text and remove the running tag
          tag(self).remove("running");
          execute.positioned(rel(0, 1, 0)).run(() => {
            kill(Selector("@e", { type: "minecraft:interaction", tag: "tnt.laptop.interaction", distance: [Infinity, 0.5] }));
            kill(Selector("@e", { type: "minecraft:item_display", tag: "tnt.laptop.display", distance: [Infinity, 0.5] }));
          });
          execute.positioned(rel(0, 2, 0)).run(() => {
            kill(Selector("@e", { type: "minecraft:text_display", tag: "tnt.laptop.text", distance: [Infinity, 0.5] }));
          });
        });
      });
    });
};
