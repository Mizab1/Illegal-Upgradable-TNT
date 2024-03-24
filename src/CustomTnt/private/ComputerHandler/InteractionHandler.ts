import {
  BASIC_COLORS,
  Data,
  JSONTextComponent,
  LiteralUnion,
  NBT,
  Selector,
  _,
  execute,
  kill,
  particle,
  playsound,
  rel,
  stopsound,
  summon,
  tag,
} from "sandstone";
import { self } from "../../../Tick";
import { upgradeTNT } from "../../Upgrade";
import { TNT_PARENT_ENTITY } from "../SetupGenerics";
import { scheduleTimer } from "./ScheduleTimer";
export const interactionHandler = () => {
  execute
    .as(Selector("@e", { type: "minecraft:interaction", tag: "tnt.laptop.interaction" }))
    .at(self)
    .run(() => {
      // Check if the laptop is interacted
      execute.if.data.entity(self, "interaction").run(() => {
        upgradeTNT();
      });

      // Check if the laptop is broken
      execute.if.data.entity(self, "attack").run(() => {
        kill(Selector("@e", { type: "minecraft:item_display", tag: "tnt.laptop.display", distance: [Infinity, 0.5] }));
        kill(self);
      });
    });
};

const setTextToDisplayEntity = (jsonComponent: string) => {
  //* Run as TNT_PARENT_ENTITY
  execute.positioned(rel(0, 2, 0)).run(() => {
    Data(
      "entity",
      Selector("@e", { type: "minecraft:text_display", tag: "tnt.laptop.text", distance: [Infinity, 0.5], limit: 1 })
    )
      .select("text")
      .set(jsonComponent);
  });
};

export const upgradeTNTGenerics = (
  currentTNTTag: string,
  nextTNTTag: string,
  nextCustomModelData: number,
  nameOfCurrentTNT: string,
  colorOfTheName: LiteralUnion<BASIC_COLORS>
): void => {
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
        const maxDelay = 160;

        // Set the timer and add the running tag
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
            text: '{"text":"Initializing...", "color":"green"}',
          });
        });

        // Play sounds
        // /playsound minecraft:block.amethyst_block.resonate master @a ~ ~ ~ 1 2
        _.if(scheduleTimer.moduloBy(20).matches(0), () => {
          playsound("minecraft:sfx.typing", "master", "@a", rel(0, 0, 0), 1, 2);
        });

        // Text sequence
        _.if(scheduleTimer.matches(140), () => {
          setTextToDisplayEntity(`{"text":"Detecting TNT...", "color":"green"}`);
        });
        _.if(scheduleTimer.matches(100), () => {
          setTextToDisplayEntity(`{"text":"${nameOfCurrentTNT}", "color":"${colorOfTheName}"}`);
        });
        _.if(scheduleTimer.matches(60), () => {
          setTextToDisplayEntity(`{"text":"Bypassing Security...", "color":"green"}`);
        });
        _.if(scheduleTimer.matches(40), () => {
          setTextToDisplayEntity(`{"text":"Mizab is awesome!","color":"green","obfuscated":true, "bold":true}`);
        });
        _.if(scheduleTimer.matches(15), () => {
          setTextToDisplayEntity(`{"text":"Done!","color":"green"}`);
        });

        // End sequence
        _.if(scheduleTimer.matches(0), () => {
          // Particles and stuff
          particle("minecraft:poof", rel(0, 1, 0), [0.2, 0.2, 0.2], 0.2, 50, "force");
          particle("minecraft:falling_dust", "minecraft:lime_concrete", rel(0, 1, 0), [0.5, 0.5, 0.5], 0.8, 200);

          // Play sound
          playsound("minecraft:block.note_block.bell", "master", "@a", rel(0, 0, 0), 1, 1);

          // Stop the sounds
          stopsound("@a", "master", "minecraft:sfx.typing");

          // Kill the laptop and text and remove the running tag
          execute.positioned(rel(0, 1, 0)).run(() => {
            kill(Selector("@e", { type: "minecraft:interaction", tag: "tnt.laptop.interaction", distance: [Infinity, 0.5] }));
            kill(Selector("@e", { type: "minecraft:item_display", tag: "tnt.laptop.display", distance: [Infinity, 0.5] }));
          });
          execute.positioned(rel(0, 2, 0)).run(() => {
            kill(Selector("@e", { type: "minecraft:text_display", tag: "tnt.laptop.text", distance: [Infinity, 0.5] }));
          });

          // Upgrade the TNT
          tag(self).add(`tnt.${nextTNTTag}`);
          execute.positioned(rel(0, 1, 0)).run(() => {
            Data("entity", Selector("@e", { type: "minecraft:item_display", limit: 1, distance: [Infinity, 0.5] }))
              .select("item.tag.CustomModelData")
              .set(nextCustomModelData);
          });
          tag(self).remove("running");
          tag(self).remove(`tnt.${currentTNTTag}`);
        });
      });
    });
};
