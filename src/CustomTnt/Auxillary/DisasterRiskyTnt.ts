import { MCFunction, Selector, Variable, _, execute, rel, say, teleport } from "sandstone";
import { self } from "../../Tick";
import { randomIntFromInterval } from "../../Utils/Functions";

export const shakeTimer = Variable(0);

// ! Always running
const decrementShakeTimer = MCFunction(
  "custom_tnt/auxillary/disaster_risky_tnt/decrement_shake_timer",
  () => {
    execute.if(shakeTimer.greaterThan(0)).run(() => {
      shakeTimer.remove(1);
    });
  },
  {
    runEachTick: true,
  }
);

// ! Always running
const screenShakeEffect = MCFunction(
  "custom_tnt/auxillary/disaster_risky_tnt/screen_shake_effect",
  () => {
    _.if(shakeTimer["!="](0), () => {
      execute
        .as("@a")
        .at(self)
        .run(() => {
          for (let i = 0; i < 20 * 5; i++) {
            _.if(shakeTimer.matches(i), () => {
              teleport(self, rel(0, 0, 0), rel(randomIntFromInterval(-5, 5), randomIntFromInterval(-5, 5)));
            });
          }
        });
    });
  },
  {
    runEachTick: true,
  }
);
