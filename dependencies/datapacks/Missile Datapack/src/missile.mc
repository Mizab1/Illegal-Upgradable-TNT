function load{
    scoreboard objectives add missile_timer dummy
}

function tick{
    execute unless entity @e[type=armor_stand,tag=missile] run stopsound @a master item.trident.thunder
    execute as @e[type=armor_stand,tag=missile,tag=!lockon] at @s run tp @s ^ ^ ^0.25 ~ ~
    execute as @e[type=minecraft:armor_stand,tag=missile] at @s anchored eyes run particle minecraft:flame ^ ^ ^-2 0.05 0.05 0.05 0.01 30 force
    execute as @e[type=armor_stand,tag=missile] at @s run{
        execute if entity @a[distance=..1] run{
            summon creeper ~ ~ ~ {ExplosionRadius:-1b,Fuse:1,ignited:1b,Tags:["missile_creeper"],ActiveEffects:[{Id:14b,Amplifier:1b,Duration:4000,ShowParticles:0b}]}
            kill @s
            schedule 2t append{
                kill @e[type=area_effect_cloud]
            }
        }
        execute unless block ~ ~ ~ #aestd1:air run{
            summon creeper ~ ~ ~ {ExplosionRadius:-1b,Fuse:1,ignited:1b,Tags:["missile_creeper"],ActiveEffects:[{Id:14b,Amplifier:1b,Duration:4000,ShowParticles:0b}]}
            kill @s
            schedule 2t append{
                kill @e[type=area_effect_cloud]
            }
        }
    } 
    execute as @e[type=minecraft:armor_stand,tag=missile] store result entity @s Pose.Head[0] float 0.001 run data get entity @s Rotation[1] 1000
    execute as @e[type=armor_stand,tag=missile,tag=lockon] at @s facing entity @a feet run tp @s ^ ^ ^0.45 ~ ~
}

##########################################################
# Used to spawn the missile
# 
# Must be run AT the location where the missile must spawn
##########################################################
function spawn_missile{
    # Play sounds at the player
    execute at @a run{
        playsound item.trident.thunder master @a ~ ~ ~ 0.25 2
        playsound minecraft:item.trident.throw master @a ~ ~ ~ 1 1.5 1
    } 
    schedule 35t append{
        execute at @a run{
            playsound item.trident.thunder master @a ~ ~ ~ 0.25 2
            playsound minecraft:item.trident.throw master @a ~ ~ ~ 1 1.5 1
        } 
    }
    schedule 75t append{
        execute at @a run{
            playsound item.trident.thunder master @a ~ ~ ~ 0.25 2
            playsound minecraft:item.trident.throw master @a ~ ~ ~ 1 1.5 1
        } 
    }

    # Spawns missile 3 block above
    summon armor_stand ~ ~3 ~ {Rotation:[0f,-60f],NoGravity:1b,Invulnerable:1b,Invisible:1b,Tags:["missile"],Pose:{Head:[-20f,0f,1f]},ArmorItems:[{},{},{},{id:"minecraft:blue_dye",Count:1b}]}
    # execute as @e[type=armor_stand,tag=missile] at @s run tp @s ~ ~ ~ ~ -60

    # Lock the missile after some time
    schedule 50t append{
        tag @e[type=armor_stand,tag=missile] add lockon
    }
    schedule 76t append{
        tag @e[type=armor_stand,tag=missile] add lockon
    }
}

clock 20t{
    # Missile timer
    execute as @e[type=armor_stand,tag=missile] at @s run{
        execute if score @s missile_timer matches 7.. run{
            summon creeper ~ ~ ~ {ExplosionRadius:-1b,Fuse:1,ignited:1b,Tags:["missile_creeper"],ActiveEffects:[{Id:14b,Amplifier:1b,Duration:4000,ShowParticles:0b}]}
            kill @s
            schedule 2t append{
                kill @e[type=area_effect_cloud]
            }
        }
        execute unless score @s missile_timer matches 7.. run{
            scoreboard players add @s missile_timer 1 
        }
    }
}