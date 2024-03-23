import {
  ENTITY_TYPES,
  MCFunction,
  NBT,
  Selector,
  _,
  execute,
  give,
  kill,
  particle,
  playsound,
  rel,
  say,
  setblock,
  summon,
  tag,
  tp,
} from "sandstone";
import { CombinedConditions } from "sandstone/flow/conditions";
import { fuseTime, self } from "../../Tick";
import { i } from "../../Utils/Functions";

// @ts-ignore
export const TNT_PARENT_ENTITY: ENTITY_TYPES = "minecraft:armor_stand";

/**
 * Places TNT at the specified location if the endermite has a certain tag.
 *
 * @param {Array<string>} tag - The tag used to check if the endermite is of a specific type
 * @param {number} customModelData - The custom model data for the TNT item.
 */
const placeTnt = (tag: Array<string>, customModelData: number) => {
  //* Run by the endermite

  const tagWithPrefix = tag.map((item) => `tnt.${item}`);
  _.if(Selector("@s", { tag: tag[0] }), () => {
    say("Placing TNT");
    playsound("minecraft:block.grass.place", "block", "@a", rel(0, 0, 0));
    summon("minecraft:armor_stand", rel(0, 0, 0), {
      NoGravity: NBT.byte(1),
      Invisible: NBT.byte(1),
      Tags: [...tagWithPrefix, `tnt.as`],
      DisabledSlots: 63,
      Small: NBT.byte(1),
      Passengers: [
        {
          id: "minecraft:item_display",
          item_display: "head",
          Tags: ["tnt.as"],
          brightness: { sky: 10, block: 0 },
          item: { id: "minecraft:endermite_spawn_egg", Count: NBT.byte(1), tag: { CustomModelData: customModelData } },
        },
      ],
    });
    setblock(rel(0, 0, 0), "minecraft:tnt");
    tp(self, rel(0, -600, 0));
  });
};

/**
 * Creates a give function for giving a specific type of TNT item to the player.
 *
 * @param {string} nameOfTheGiveFunction - The name of the give function.
 * @param {string} nameOfTheTnt - The name of the TNT item.
 * @param {Array<string>} tag - The tag associated with the TNT item.
 * @param {number} customModelData - The custom model data for the TNT item.
 */
const createGiveFunction = (nameOfTheGiveFunction: string, nameOfTheTnt: string, tag: Array<string>, customModelData: number) => {
  MCFunction("give_tnt/" + nameOfTheGiveFunction, () => {
    give(
      self,
      i("minecraft:endermite_spawn_egg", {
        display: {
          Name: `{"text":"${nameOfTheTnt}","color":"#FF0808","italic":false}`,
        },
        CustomModelData: customModelData,
        EntityTag: {
          Silent: NBT.byte(1),
          NoAI: NBT.byte(1),
          Tags: [...tag, "tnt.endermite"],
          ActiveEffects: [
            {
              Id: NBT.byte(14),
              Amplifier: NBT.byte(1),
              Duration: 999999,
              ShowParticles: NBT.byte(0),
            },
          ],
        },
      })
    );
  });
};

// Combination of 2 of the above functions
export const placeAndCreateFunction = (
  nameOfTheGiveFunction: string,
  nameOfTheTnt: string,
  tag: Array<string>,
  customModelData: number
) => {
  placeTnt(tag, customModelData);
  createGiveFunction(nameOfTheGiveFunction, nameOfTheTnt, tag, customModelData);
};

// Conditions for checking if the TNT is primed or lifted
const primingCondition: CombinedConditions = _.or(
  Selector("@e", {
    type: "minecraft:tnt",
    distance: [Infinity, 1],
  }),
  Selector("@s", { tag: "picked_up" })
);

const killItemDisplay = () => {
  execute.positioned(rel(0, 1, 0)).run.kill(Selector("@e", { type: "item_display", distance: [Infinity, 0.5] }));
};

/**
 * Handles the explosion event for the given TNT tag.
 *
 * @param {string} TntTag - The tag of the TNT.
 * @param {number} FuseTimer - The fuse time in ticks.
 * @param {() => void} displayParticles - A function to display particles.
 * @param {() => void} eventOnExplosion - A function to run when the TNT explodes.
 * @param {() => void | null} runEachTick - An optional function to run each tick while the TNT is primed.
 * @return {void}
 */
export const explosionHandler = (
  TntTag: string,
  FuseTimer: number,
  displayParticles: () => void,
  eventOnExplosion: () => void,
  runOnIgnite: () => void | null,
  runEachTick: () => void | null
) => {
  execute.if(Selector("@s", { tag: TntTag })).run(() => {
    _.if(primingCondition, () => {
      kill(
        Selector("@e", {
          type: "minecraft:tnt",
          distance: [Infinity, 1],
        })
      );

      playsound("minecraft:entity.tnt.primed", "master", "@a");
      fuseTime.set(FuseTimer);

      tag(self).add("is_primed"); // Add a tag for tracking purposes
      tag(self).remove("picked_up");
    });

    // * Run Continuously if the TNT is primed
    _.if(fuseTime.equalTo(FuseTimer - 1), () => {
      runOnIgnite ? runOnIgnite() : "";
    });
    _.if(fuseTime.greaterOrEqualThan(0), () => {
      displayParticles();

      // Run this auxillary function each fuse time
      runEachTick ? runEachTick() : "";

      _.if(fuseTime.matches(0), () => {
        particle("minecraft:explosion", rel(0, 1, 0), [1, 1, 1], 1, 30, "force");
        particle("minecraft:cloud", rel(0, 1, 0), [1, 0.1, 1], 1, 20, "force");
        playsound("minecraft:entity.generic.explode", "master", "@a", rel(0, 1, 0));
        eventOnExplosion();
        kill(self);
        killItemDisplay();
      });
    });

    // Kill the model if the TNT is broken or the TNT is lifted
    execute
      .unless(_.block(rel(0, 0, 0), "minecraft:tnt"))
      .unless(Selector("@s", { tag: "is_primed" }))
      .run(() => {
        kill(self);
        killItemDisplay();
      });
  });
};
