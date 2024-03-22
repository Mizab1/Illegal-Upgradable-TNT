#built using mc-build (https://github.com/mc-build/mc-build)

execute at @a run function missile:__generated__/execute/8
schedule function missile:__generated__/schedule/2 35t append
schedule function missile:__generated__/schedule/3 75t append
summon armor_stand ~ ~3 ~ {Rotation:[0f,-60f],NoGravity:1b,Invulnerable:1b,Invisible:1b,Tags:["missile"],Pose:{Head:[-20f,0f,1f]},ArmorItems:[{},{},{},{id:"minecraft:blue_dye",Count:1b}]}
schedule function missile:__generated__/schedule/4 50t append
schedule function missile:__generated__/schedule/5 76t append