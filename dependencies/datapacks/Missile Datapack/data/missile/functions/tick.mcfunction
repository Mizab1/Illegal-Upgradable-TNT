#built using mc-build (https://github.com/mc-build/mc-build)

execute unless entity @e[type=armor_stand,tag=missile] run stopsound @a master item.trident.thunder
execute as @e[type=armor_stand,tag=missile,tag=!lockon] at @s run tp @s ^ ^ ^0.25 ~ ~
execute as @e[type=minecraft:armor_stand,tag=missile] at @s anchored eyes run particle minecraft:flame ^ ^ ^-2 0.05 0.05 0.05 0.01 30 force
execute as @e[type=armor_stand,tag=missile] at @s run function missile:__generated__/execute/3
execute as @e[type=minecraft:armor_stand,tag=missile] store result entity @s Pose.Head[0] float 0.001 run data get entity @s Rotation[1] 1000
execute as @e[type=armor_stand,tag=missile,tag=lockon] at @s facing entity @a feet run tp @s ^ ^ ^0.45 ~ ~