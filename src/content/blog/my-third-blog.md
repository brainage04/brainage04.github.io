---
title: "My third blog - another update!"
description: "An update to my second blog after several more months."
pubDate: 2026-01-12T04:15:00+10:00
author: "brainage04"
slug: "2026/01/12/my-third-blog.html"
---

A lot has happened since my last blog (which was about 8 months ago now):

1. I graduated from university with a Bachelor in Information Technology (Computer Science) - with Distinction!!!
2. Made a bunch more Minecraft mods
3. Got a lot better at MaiMai

On one hand, I'm glad that university is over, but I'm also not really enjoying the job search. Feels like there's not that much out there for me. I know it will get better around late Jan/early Feb but I wouldn't be surprised if I don't find a job for 6-12 months. I don't know what to do.

I have another list of things I want to do, but this one is REALLY long - I have quite a backlog. As you can see most of them are to do with Minecraft mods:

1. finish ProceduralDungeon
2. finish FortniteInMinecraft
3. finish IceSkates (fix item models for skates not working)
4. finish BrainageServerUtils (according to todo in README)
5. finish BrainageMinigames
6. merge BrainageUHC with BrainageMinigames
7. continue working on NPCAddons
8. refactor forge template to match fabric template? and rename to ForgeClientTemplate
9. create ForgeServerTemplate? (this is for if I ever want to make a 1.8.9 server with minigames or something like that)
10. figure out what to do with ToggleSprint (probably try to make same as BrainageHUD)
11. update SimpleTelekinesis
    - rewrite code that teleports item drops to work with blocks that have more than 1 unique drop/do not always drop something
12. Hypixel /play autocomplete mod - https://api.hypixel.net/v2/resources/games
    - Use the keys in the modeNames objects in propertyN objects in the games object
    - There's no autocomplete for any versions in vanilla (not even latest)
    - Check out Hypixel Mod API for this?
13. try making my own config library for Fabric 1.21.11
14. try making my own config library for Forge 1.8.9
15. start working on TextureAtlasGenerator again - been smashing my head against a wall for 20+ hours. idk what to do. try getting llm to help maybe? study RenderPipelines or other mods that use them?
16. get back to work on SkyBrain/SkyBrainDB - would prefer to finish TextureAtlasGenerator first so I have a more comprehensive list of items now that the foraging update has been released
17. Overworld Nether Structures (Bastion especially would be good)
    - Blackstone -> Cobblestone
    - Lava -> Water
    - Gold -> Diamond
    - Nether Brick -> Stone Brick
    - Wither Skeletons -> OP Skeletons (OP = prot 2-4 diamond/netherite armour, power 3-5 bow, sharpness 3-5 sword/axe)
    - Piglins -> OP Zombies
18. Advanced Path Finder
    - can path find under a wide range of circumstances including:
      - ability to sprint, sneak and jump
      - potion effects/player attributes (specifically speed/walk speed and jump boost/jump strength)
      - damage effects (such as poison or fire, which would cause knockback and affect pathing that requires jumping)
    - don't forget to include diagonals
    - don't forget to remove path finding nodes that are in a straight line as they are redundant
    - command to determine path and command to actually path find
19. Other minor things on my todo list:
    - modify TpRequest class in SimpleTPA to implement Comparable<TpRequest> with only the to/from fields and see if it works with a HashSet
    - continue studying modrinth integration and test with MagicCarpet
    - look into Architectury Plugin (Gradle plugin that facilitates multiplatform mod development)
      - https://modrinth.com/mod/architectury-api
      - https://github.com/architectury/architectury-loom
      - https://github.com/architectury/architectury-plugin
      - https://plugins.jetbrains.com/plugin/16210-architectury
      - might be too much effort though tbh

Thanks for taking the time to read my third blog! I'll be making a lot more of these now, as I'd like to document my experiences when making projects on here (for present projects and future ones as well as previous ones).
