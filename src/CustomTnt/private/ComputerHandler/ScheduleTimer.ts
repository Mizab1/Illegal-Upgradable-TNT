import { MCFunction, Objective, Selector, execute } from "sandstone";
import { TNT_PARENT_ENTITY } from "../SetupGenerics";

// Scoreboard
export const scheduleTimer = Objective.create("schedule_timer", "dummy")("@s");

export const decrementScheduleTimer = MCFunction("custom_tnt/decrement_schedule_timer", () => {
  execute
    .as(
      Selector("@e", {
        type: TNT_PARENT_ENTITY,
        tag: ["tnt.as"],
      })
    )
    .if(scheduleTimer.greaterThan(0))
    .run(() => {
      scheduleTimer.remove(1);
    });
});
