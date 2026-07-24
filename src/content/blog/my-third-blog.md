---
title: "My third blog - another update!"
description: "An update to my second blog after several more months."
pubDate: 2026-01-12T04:15:00+10:00
author: "brainage04"
slug: "2026/01/12/my-third-blog.html"
topic: "Project update"
readingMinutes: 8
---

## Since the last update

A lot has happened since my last blog, which was about eight months ago:

1. I graduated from university with a Bachelor of Information Technology (Computer Science), with Distinction.
2. I made a lot more Minecraft mods.
3. I got considerably better at MaiMai.

## Life after university

On one hand, I'm glad that university is over. On the other, I haven't really enjoyed the job search. It feels like there isn't much available for me right now.

I know it should improve around late January or early February, but I wouldn't be surprised if it takes six to twelve months to find a job. At the moment, I don't know what to do.

## The Minecraft backlog

I have another list of things I want to do, but this one is **really** long. Most of it relates to Minecraft mods.

### Projects to finish or revisit

1. Finish ProceduralDungeon.
2. Finish FortniteInMinecraft.
3. Fix the IceSkates item models.
4. Finish the remaining BrainageServerUtils work documented in its README.
5. Finish BrainageMinigames.
6. Merge BrainageUHC into BrainageMinigames.
7. Continue working on NPCAddons.
8. Refactor the Forge template to match the Fabric template and potentially rename it ForgeClientTemplate.
9. Consider creating a ForgeServerTemplate for future Minecraft 1.8.9 server or minigame work.
10. Decide what to do with ToggleSprint, probably aligning it with BrainageHUD.
11. Update SimpleTelekinesis so item-drop teleporting works with blocks that have multiple possible drops or do not always drop an item.

### New tools and experiments

12. Build a Hypixel `/play` autocomplete mod using the [`modeNames` data from the Hypixel API](https://api.hypixel.net/v2/resources/games). Vanilla does not provide this autocomplete, even in current versions, so I also need to investigate the Hypixel Mod API.
13. Try making my own configuration library for Fabric.
14. Try making my own configuration library for Forge 1.8.9.
15. Return to TextureAtlasGenerator. I have spent more than 20 hours stuck on it, so I need to study RenderPipelines, inspect other mods, or get better outside input.
16. Resume SkyBrain and SkyBrainDB once TextureAtlasGenerator can produce a comprehensive item list for the released Foraging update.

### Overworld Nether structures

17. Experiment with Overworld versions of Nether structures, especially a Bastion conversion:

- Blackstone → cobblestone
- Lava → water
- Gold → diamond
- Nether brick → stone brick
- Wither skeletons → powerful skeletons with enchanted armour and weapons
- Piglins → powerful zombies

### Advanced path finding

18. Explore a path finder that can account for:

- Sprinting, sneaking and jumping
- Player attributes such as movement speed and jump strength
- Potion and damage effects such as poison, fire and knockback
- Diagonal movement
- Removing redundant nodes that lie on a straight line
- Separate commands to calculate a route and execute it

### Maintenance and research

19. Work through several smaller items:

- Make SimpleTPA's `TpRequest` implement `Comparable<TpRequest>` using its `to` and `from` fields, then verify the behaviour with a `HashSet`.
- Continue studying Modrinth integration and test it with MagicCarpet.
- Investigate the Architectury Gradle tooling for multiplatform mod development:
  - [Architectury API on Modrinth](https://modrinth.com/mod/architectury-api)
  - [Architectury Loom](https://github.com/architectury/architectury-loom)
  - [Architectury Plugin](https://github.com/architectury/architectury-plugin)
  - [Architectury plugin for IntelliJ IDEA](https://plugins.jetbrains.com/plugin/16210-architectury)

Architectury may still be more machinery than these projects need, but it is worth understanding before I rule it out.

## What comes next

Thanks for taking the time to read my third blog. I'd like to publish more project notes here and document the decisions, problems and lessons behind current, future and previous work.
