var achievements = ["stat.leaveGame","stat.playOneMinute","stat.timeSinceDeath","stat.walkOneCm","stat.crouchOneCm","stat.sprintOneCm","stat.swimOneCm","stat.fallOneCm","stat.climbOneCm","stat.flyOneCm","stat.diveOneCm","stat.minecartOneCm","stat.boatOneCm","stat.pigOneCm","stat.horseOneCm","stat.jump","stat.drop","stat.damageDealt","stat.damageTaken","stat.deaths","stat.mobKills","stat.animalsBred","stat.playerKills","stat.fishCaught","stat.junkFished","stat.treasureFished","stat.mineBlock.minecraft.stone","stat.mineBlock.minecraft.dirt","stat.mineBlock.minecraft.cobblestone","stat.mineBlock.minecraft.planks","stat.mineBlock.minecraft.sapling","stat.mineBlock.minecraft.sand","stat.mineBlock.minecraft.gravel","stat.mineBlock.minecraft.gold_ore","stat.mineBlock.minecraft.iron_ore","stat.mineBlock.minecraft.coal_ore","stat.mineBlock.minecraft.log","stat.mineBlock.minecraft.leaves","stat.mineBlock.minecraft.sponge","stat.mineBlock.minecraft.glass","stat.mineBlock.minecraft.lapis_ore","stat.mineBlock.minecraft.lapis_block","stat.mineBlock.minecraft.dispenser","stat.mineBlock.minecraft.sandstone","stat.mineBlock.minecraft.noteblock","stat.mineBlock.minecraft.golden_rail","stat.mineBlock.minecraft.detector_rail","stat.mineBlock.minecraft.sticky_piston","stat.mineBlock.minecraft.web","stat.mineBlock.minecraft.tallgrass","stat.mineBlock.minecraft.deadbush","stat.mineBlock.minecraft.piston","stat.mineBlock.minecraft.wool","stat.mineBlock.minecraft.yellow_flower","stat.mineBlock.minecraft.red_flower","stat.mineBlock.minecraft.brown_mushroom","stat.mineBlock.minecraft.gold_block","stat.mineBlock.minecraft.iron_block","stat.mineBlock.minecraft.stone_slab","stat.mineBlock.minecraft.brick_block","stat.mineBlock.minecraft.tnt","stat.mineBlock.minecraft.bookshelf","stat.mineBlock.minecraft.mossy_cobblestone","stat.mineBlock.minecraft.obsidian","stat.mineBlock.minecraft.torch","stat.mineBlock.minecraft.oak_stairs","stat.mineBlock.minecraft.chest","stat.mineBlock.minecraft.diamond_ore","stat.mineBlock.minecraft.diamond_block","stat.mineBlock.minecraft.crafting_table","stat.mineBlock.minecraft.furnace","stat.mineBlock.minecraft.ladder","stat.mineBlock.minecraft.rail","stat.mineBlock.minecraft.stone_stairs","stat.mineBlock.minecraft.lever","stat.mineBlock.minecraft.stone_pressure_plate","stat.mineBlock.minecraft.wooden_pressure_plate","stat.mineBlock.minecraft.redstone_ore","stat.mineBlock.minecraft.redstone_torch","stat.mineBlock.minecraft.stone_button","stat.mineBlock.minecraft.snow_layer","stat.mineBlock.minecraft.ice","stat.mineBlock.minecraft.snow","stat.mineBlock.minecraft.cactus","stat.mineBlock.minecraft.clay","stat.mineBlock.minecraft.jukebox","stat.mineBlock.minecraft.fence","stat.mineBlock.minecraft.pumpkin","stat.mineBlock.minecraft.netherrack","stat.mineBlock.minecraft.soul_sand","stat.mineBlock.minecraft.glowstone","stat.mineBlock.minecraft.stained_glass","stat.mineBlock.minecraft.monster_egg","stat.mineBlock.minecraft.stonebrick","stat.mineBlock.minecraft.brown_mushroom_block","stat.mineBlock.minecraft.red_mushroom_block","stat.mineBlock.minecraft.iron_bars","stat.mineBlock.minecraft.glass_pane","stat.mineBlock.minecraft.melon_block","stat.mineBlock.minecraft.vine","stat.mineBlock.minecraft.fence_gate","stat.mineBlock.minecraft.brick_stairs","stat.mineBlock.minecraft.stone_brick_stairs","stat.mineBlock.minecraft.mycelium","stat.mineBlock.minecraft.waterlily","stat.mineBlock.minecraft.nether_brick","stat.mineBlock.minecraft.nether_brick_fence","stat.mineBlock.minecraft.nether_brick_stairs","stat.mineBlock.minecraft.enchanting_table","stat.mineBlock.minecraft.end_portal_frame","stat.mineBlock.minecraft.end_stone","stat.mineBlock.minecraft.dragon_egg","stat.mineBlock.minecraft.redstone_lamp","stat.mineBlock.minecraft.wooden_slab","stat.mineBlock.minecraft.sandstone_stairs","stat.mineBlock.minecraft.emerald_ore","stat.mineBlock.minecraft.ender_chest","stat.mineBlock.minecraft.tripwire_hook","stat.mineBlock.minecraft.emerald_block","stat.mineBlock.minecraft.spruce_stairs","stat.mineBlock.minecraft.birch_stairs","stat.mineBlock.minecraft.jungle_stairs","stat.mineBlock.minecraft.command_block","stat.mineBlock.minecraft.beacon","stat.mineBlock.minecraft.cobblestone_wall","stat.mineBlock.minecraft.wooden_button","stat.mineBlock.minecraft.anvil","stat.mineBlock.minecraft.trapped_chest","stat.mineBlock.minecraft.light_weighted_pressure_plate","stat.mineBlock.minecraft.heavy_weighted_pressure_plate","stat.mineBlock.minecraft.daylight_detector","stat.mineBlock.minecraft.redstone_block","stat.mineBlock.minecraft.quartz_ore","stat.mineBlock.minecraft.hopper","stat.mineBlock.minecraft.quartz_block","stat.mineBlock.minecraft.quartz_stairs","stat.mineBlock.minecraft.activator_rail","stat.mineBlock.minecraft.dropper","stat.mineBlock.minecraft.stained_hardened_clay","stat.mineBlock.minecraft.stained_glass_pane","stat.mineBlock.minecraft.leaves2","stat.mineBlock.minecraft.log2","stat.mineBlock.minecraft.acacia_stairs","stat.mineBlock.minecraft.dark_oak_stairs","stat.mineBlock.minecraft.slime","stat.mineBlock.minecraft.prismarine","stat.mineBlock.minecraft.sea_lantern","stat.mineBlock.minecraft.hay_block","stat.mineBlock.minecraft.carpet","stat.mineBlock.minecraft.hardened_clay","stat.mineBlock.minecraft.coal_block","stat.mineBlock.minecraft.packed_ice","stat.mineBlock.minecraft.double_plant","stat.useItem.minecraft.stone","stat.useItem.minecraft.dirt","stat.useItem.minecraft.cobblestone","stat.useItem.minecraft.planks","stat.useItem.minecraft.sapling","stat.useItem.minecraft.bedrock","stat.useItem.minecraft.sand","stat.useItem.minecraft.gravel","stat.useItem.minecraft.gold_ore","stat.useItem.minecraft.iron_ore","stat.useItem.minecraft.coal_ore","stat.useItem.minecraft.log","stat.useItem.minecraft.leaves","stat.useItem.minecraft.sponge","stat.useItem.minecraft.glass","stat.useItem.minecraft.lapis_ore","stat.useItem.minecraft.lapis_block","stat.useItem.minecraft.dispenser","stat.useItem.minecraft.sandstone","stat.useItem.minecraft.noteblock","stat.useItem.minecraft.golden_rail","stat.useItem.minecraft.detector_rail","stat.useItem.minecraft.sticky_piston","stat.useItem.minecraft.web","stat.useItem.minecraft.tallgrass","stat.useItem.minecraft.deadbush","stat.useItem.minecraft.piston","stat.useItem.minecraft.wool","stat.useItem.minecraft.yellow_flower","stat.useItem.minecraft.red_flower","stat.useItem.minecraft.brown_mushroom","stat.useItem.minecraft.gold_block","stat.useItem.minecraft.iron_block","stat.useItem.minecraft.stone_slab","stat.useItem.minecraft.brick_block","stat.useItem.minecraft.tnt","stat.useItem.minecraft.bookshelf","stat.useItem.minecraft.mossy_cobblestone","stat.useItem.minecraft.obsidian","stat.useItem.minecraft.torch","stat.useItem.minecraft.mob_spawner","stat.useItem.minecraft.oak_stairs","stat.useItem.minecraft.chest","stat.useItem.minecraft.diamond_ore","stat.useItem.minecraft.diamond_block","stat.useItem.minecraft.crafting_table","stat.useItem.minecraft.furnace","stat.useItem.minecraft.ladder","stat.useItem.minecraft.rail","stat.useItem.minecraft.stone_stairs","stat.useItem.minecraft.lever","stat.useItem.minecraft.stone_pressure_plate","stat.useItem.minecraft.wooden_pressure_plate","stat.useItem.minecraft.redstone_ore","stat.useItem.minecraft.redstone_torch","stat.useItem.minecraft.stone_button","stat.useItem.minecraft.snow_layer","stat.useItem.minecraft.ice","stat.useItem.minecraft.snow","stat.useItem.minecraft.cactus","stat.useItem.minecraft.clay","stat.useItem.minecraft.jukebox","stat.useItem.minecraft.fence","stat.useItem.minecraft.pumpkin","stat.useItem.minecraft.netherrack","stat.useItem.minecraft.soul_sand","stat.useItem.minecraft.glowstone","stat.useItem.minecraft.stained_glass","stat.useItem.minecraft.trapdoor","stat.useItem.minecraft.monster_egg","stat.useItem.minecraft.stonebrick","stat.useItem.minecraft.brown_mushroom_block","stat.useItem.minecraft.red_mushroom_block","stat.useItem.minecraft.iron_bars","stat.useItem.minecraft.glass_pane","stat.useItem.minecraft.melon_block","stat.useItem.minecraft.vine","stat.useItem.minecraft.fence_gate","stat.useItem.minecraft.brick_stairs","stat.useItem.minecraft.stone_brick_stairs","stat.useItem.minecraft.mycelium","stat.useItem.minecraft.waterlily","stat.useItem.minecraft.nether_brick","stat.useItem.minecraft.nether_brick_fence","stat.useItem.minecraft.nether_brick_stairs","stat.useItem.minecraft.enchanting_table","stat.useItem.minecraft.end_portal_frame","stat.useItem.minecraft.end_stone","stat.useItem.minecraft.dragon_egg","stat.useItem.minecraft.redstone_lamp","stat.useItem.minecraft.wooden_slab","stat.useItem.minecraft.sandstone_stairs","stat.useItem.minecraft.emerald_ore","stat.useItem.minecraft.ender_chest","stat.useItem.minecraft.tripwire_hook","stat.useItem.minecraft.emerald_block","stat.useItem.minecraft.spruce_stairs","stat.useItem.minecraft.birch_stairs","stat.useItem.minecraft.jungle_stairs","stat.useItem.minecraft.command_block","stat.useItem.minecraft.beacon","stat.useItem.minecraft.cobblestone_wall","stat.useItem.minecraft.wooden_button","stat.useItem.minecraft.anvil","stat.useItem.minecraft.trapped_chest","stat.useItem.minecraft.light_weighted_pressure_plate","stat.useItem.minecraft.heavy_weighted_pressure_plate","stat.useItem.minecraft.daylight_detector","stat.useItem.minecraft.redstone_block","stat.useItem.minecraft.quartz_ore","stat.useItem.minecraft.hopper","stat.useItem.minecraft.quartz_block","stat.useItem.minecraft.quartz_stairs","stat.useItem.minecraft.activator_rail","stat.useItem.minecraft.dropper","stat.useItem.minecraft.stained_hardened_clay","stat.useItem.minecraft.stained_glass_pane","stat.useItem.minecraft.leaves2","stat.useItem.minecraft.log2","stat.useItem.minecraft.acacia_stairs","stat.useItem.minecraft.dark_oak_stairs","stat.useItem.minecraft.slime","stat.useItem.minecraft.barrier","stat.useItem.minecraft.iron_trapdoor","stat.useItem.minecraft.prismarine","stat.useItem.minecraft.sea_lantern","stat.useItem.minecraft.hay_block","stat.useItem.minecraft.carpet","stat.useItem.minecraft.hardened_clay","stat.useItem.minecraft.coal_block","stat.useItem.minecraft.packed_ice","stat.useItem.minecraft.double_plant","stat.useItem.minecraft.iron_shovel","stat.useItem.minecraft.iron_pickaxe","stat.useItem.minecraft.iron_axe","stat.useItem.minecraft.flint_and_steel","stat.useItem.minecraft.apple","stat.useItem.minecraft.bow","stat.useItem.minecraft.arrow","stat.useItem.minecraft.coal","stat.useItem.minecraft.diamond","stat.useItem.minecraft.iron_ingot","stat.useItem.minecraft.gold_ingot","stat.useItem.minecraft.iron_sword","stat.useItem.minecraft.wooden_sword","stat.useItem.minecraft.wooden_shovel","stat.useItem.minecraft.wooden_pickaxe","stat.useItem.minecraft.wooden_axe","stat.useItem.minecraft.stone_sword","stat.useItem.minecraft.stone_shovel","stat.useItem.minecraft.stone_pickaxe","stat.useItem.minecraft.stone_axe","stat.useItem.minecraft.diamond_sword","stat.useItem.minecraft.diamond_shovel","stat.useItem.minecraft.diamond_pickaxe","stat.useItem.minecraft.diamond_axe","stat.useItem.minecraft.stick","stat.useItem.minecraft.bowl","stat.useItem.minecraft.mushroom_stew","stat.useItem.minecraft.golden_sword","stat.useItem.minecraft.golden_shovel","stat.useItem.minecraft.golden_pickaxe","stat.useItem.minecraft.golden_axe","stat.useItem.minecraft.string","stat.useItem.minecraft.feather","stat.useItem.minecraft.gunpowder","stat.useItem.minecraft.wooden_hoe","stat.useItem.minecraft.stone_hoe","stat.useItem.minecraft.iron_hoe","stat.useItem.minecraft.diamond_hoe","stat.useItem.minecraft.golden_hoe","stat.useItem.minecraft.wheat_seeds","stat.useItem.minecraft.wheat","stat.useItem.minecraft.bread","stat.useItem.minecraft.leather_helmet","stat.useItem.minecraft.leather_chestplate","stat.useItem.minecraft.leather_leggings","stat.useItem.minecraft.leather_boots","stat.useItem.minecraft.chainmail_helmet","stat.useItem.minecraft.chainmail_chestplate","stat.useItem.minecraft.chainmail_leggings","stat.useItem.minecraft.chainmail_boots","stat.useItem.minecraft.iron_helmet","stat.useItem.minecraft.iron_chestplate","stat.useItem.minecraft.iron_leggings","stat.useItem.minecraft.iron_boots","stat.useItem.minecraft.diamond_helmet","stat.useItem.minecraft.diamond_chestplate","stat.useItem.minecraft.diamond_leggings","stat.useItem.minecraft.diamond_boots","stat.useItem.minecraft.golden_helmet","stat.useItem.minecraft.golden_chestplate","stat.useItem.minecraft.golden_leggings","stat.useItem.minecraft.golden_boots","stat.useItem.minecraft.flint","stat.useItem.minecraft.porkchop","stat.useItem.minecraft.cooked_porkchop","stat.useItem.minecraft.painting","stat.useItem.minecraft.golden_apple","stat.useItem.minecraft.sign","stat.useItem.minecraft.wooden_door","stat.useItem.minecraft.bucket","stat.useItem.minecraft.water_bucket","stat.useItem.minecraft.lava_bucket","stat.useItem.minecraft.minecart","stat.useItem.minecraft.saddle","stat.useItem.minecraft.iron_door","stat.useItem.minecraft.redstone","stat.useItem.minecraft.snowball","stat.useItem.minecraft.boat","stat.useItem.minecraft.leather","stat.useItem.minecraft.milk_bucket","stat.useItem.minecraft.brick","stat.useItem.minecraft.clay_ball","stat.useItem.minecraft.reeds","stat.useItem.minecraft.paper","stat.useItem.minecraft.book","stat.useItem.minecraft.slime_ball","stat.useItem.minecraft.chest_minecart","stat.useItem.minecraft.furnace_minecart","stat.useItem.minecraft.egg","stat.useItem.minecraft.compass","stat.useItem.minecraft.fishing_rod","stat.useItem.minecraft.clock","stat.useItem.minecraft.glowstone_dust","stat.useItem.minecraft.fish","stat.useItem.minecraft.cooked_fish","stat.useItem.minecraft.dye","stat.useItem.minecraft.bone","stat.useItem.minecraft.sugar","stat.useItem.minecraft.cake","stat.useItem.minecraft.bed","stat.useItem.minecraft.repeater","stat.useItem.minecraft.cookie","stat.useItem.minecraft.filled_map","stat.useItem.minecraft.shears","stat.useItem.minecraft.melon","stat.useItem.minecraft.pumpkin_seeds","stat.useItem.minecraft.melon_seeds","stat.useItem.minecraft.beef","stat.useItem.minecraft.cooked_beef","stat.useItem.minecraft.chicken","stat.useItem.minecraft.cooked_chicken","stat.useItem.minecraft.rotten_flesh","stat.useItem.minecraft.ender_pearl","stat.useItem.minecraft.blaze_rod","stat.useItem.minecraft.ghast_tear","stat.useItem.minecraft.gold_nugget","stat.useItem.minecraft.nether_wart","stat.useItem.minecraft.potion","stat.useItem.minecraft.glass_bottle","stat.useItem.minecraft.spider_eye","stat.useItem.minecraft.fermented_spider_eye","stat.useItem.minecraft.blaze_powder","stat.useItem.minecraft.magma_cream","stat.useItem.minecraft.brewing_stand","stat.useItem.minecraft.cauldron","stat.useItem.minecraft.ender_eye","stat.useItem.minecraft.speckled_melon","stat.killEntity.Creeper","stat.entityKilledBy.Creeper","stat.killEntity.Skeleton","stat.entityKilledBy.Skeleton","stat.killEntity.Spider","stat.entityKilledBy.Spider","stat.killEntity.Zombie","stat.entityKilledBy.Zombie","stat.killEntity.Slime","stat.entityKilledBy.Slime","stat.killEntity.Ghast","stat.entityKilledBy.Ghast","stat.killEntity.PigZombie","stat.entityKilledBy.PigZombie","stat.killEntity.Enderman","stat.entityKilledBy.Enderman","stat.killEntity.CaveSpider","stat.entityKilledBy.CaveSpider","stat.killEntity.Silverfish","stat.entityKilledBy.Silverfish","stat.killEntity.Blaze","stat.entityKilledBy.Blaze","stat.killEntity.LavaSlime","stat.entityKilledBy.LavaSlime","stat.killEntity.Bat","stat.entityKilledBy.Bat","stat.killEntity.Witch","stat.entityKilledBy.Witch","stat.killEntity.Endermite","stat.entityKilledBy.Endermite","stat.killEntity.Guardian","stat.entityKilledBy.Guardian","stat.killEntity.Pig","stat.entityKilledBy.Pig","stat.killEntity.Sheep","stat.entityKilledBy.Sheep","stat.killEntity.Cow","stat.entityKilledBy.Cow","stat.killEntity.Chicken","stat.entityKilledBy.Chicken","stat.killEntity.Squid","stat.entityKilledBy.Squid","stat.killEntity.Wolf","stat.entityKilledBy.Wolf","stat.killEntity.MushroomCow","stat.entityKilledBy.MushroomCow","stat.killEntity.Ozelot","stat.entityKilledBy.Ozelot","stat.killEntity.EntityHorse","stat.entityKilledBy.EntityHorse","stat.killEntity.Villager","stat.entityKilledBy.Villager","stat.useItem.minecraft.spawn_egg","stat.useItem.minecraft.experience_bottle","stat.useItem.minecraft.fire_charge","stat.useItem.minecraft.writable_book","stat.useItem.minecraft.written_book","stat.useItem.minecraft.emerald","stat.useItem.minecraft.item_frame","stat.useItem.minecraft.flower_pot","stat.useItem.minecraft.carrot","stat.useItem.minecraft.potato","stat.useItem.minecraft.baked_potato","stat.useItem.minecraft.poisonous_potato","stat.useItem.minecraft.map","stat.useItem.minecraft.golden_carrot","stat.useItem.minecraft.skull","stat.useItem.minecraft.carrot_on_a_stick","stat.useItem.minecraft.nether_star","stat.useItem.minecraft.pumpkin_pie","stat.useItem.minecraft.fireworks","stat.useItem.minecraft.firework_charge","stat.useItem.minecraft.enchanted_book","stat.useItem.minecraft.comparator","stat.useItem.minecraft.netherbrick","stat.useItem.minecraft.quartz","stat.useItem.minecraft.tnt_minecart","stat.useItem.minecraft.hopper_minecart","stat.useItem.minecraft.prismarine_shard","stat.useItem.minecraft.prismarine_crystals","stat.useItem.minecraft.iron_horse_armor","stat.useItem.minecraft.golden_horse_armor","stat.useItem.minecraft.diamond_horse_armor","stat.useItem.minecraft.lead","stat.useItem.minecraft.name_tag","stat.useItem.minecraft.command_block_minecart","stat.useItem.minecraft.record_13","stat.useItem.minecraft.record_cat","stat.useItem.minecraft.record_blocks","stat.useItem.minecraft.record_chirp","stat.useItem.minecraft.record_far","stat.useItem.minecraft.record_mall","stat.useItem.minecraft.record_mellohi","stat.useItem.minecraft.record_stal","stat.useItem.minecraft.record_strad","stat.useItem.minecraft.record_ward","stat.useItem.minecraft.record_11","stat.useItem.minecraft.record_wait","stat.breakItem.minecraft.iron_shovel","stat.breakItem.minecraft.iron_pickaxe","stat.breakItem.minecraft.iron_axe","stat.breakItem.minecraft.flint_and_steel","stat.breakItem.minecraft.bow","stat.breakItem.minecraft.iron_sword","stat.breakItem.minecraft.wooden_sword","stat.breakItem.minecraft.wooden_shovel","stat.breakItem.minecraft.wooden_pickaxe","stat.breakItem.minecraft.wooden_axe","stat.breakItem.minecraft.stone_sword","stat.breakItem.minecraft.stone_shovel","stat.breakItem.minecraft.stone_pickaxe","stat.breakItem.minecraft.stone_axe","stat.breakItem.minecraft.diamond_sword","stat.breakItem.minecraft.diamond_shovel","stat.breakItem.minecraft.diamond_pickaxe","stat.breakItem.minecraft.diamond_axe","stat.breakItem.minecraft.golden_sword","stat.breakItem.minecraft.golden_shovel","stat.breakItem.minecraft.golden_pickaxe","stat.breakItem.minecraft.golden_axe","stat.breakItem.minecraft.wooden_hoe","stat.breakItem.minecraft.stone_hoe","stat.breakItem.minecraft.iron_hoe","stat.breakItem.minecraft.diamond_hoe","stat.breakItem.minecraft.golden_hoe","stat.breakItem.minecraft.leather_helmet","stat.breakItem.minecraft.leather_chestplate","stat.breakItem.minecraft.leather_leggings","stat.breakItem.minecraft.leather_boots","stat.breakItem.minecraft.chainmail_helmet","stat.breakItem.minecraft.chainmail_chestplate","stat.breakItem.minecraft.chainmail_leggings","stat.breakItem.minecraft.chainmail_boots","stat.breakItem.minecraft.iron_helmet","stat.breakItem.minecraft.iron_chestplate","stat.breakItem.minecraft.iron_leggings","stat.breakItem.minecraft.iron_boots","stat.breakItem.minecraft.diamond_helmet","stat.breakItem.minecraft.diamond_chestplate","stat.breakItem.minecraft.diamond_leggings","stat.breakItem.minecraft.diamond_boots","stat.breakItem.minecraft.golden_helmet","stat.breakItem.minecraft.golden_chestplate","stat.breakItem.minecraft.golden_leggings","stat.breakItem.minecraft.golden_boots","stat.breakItem.minecraft.fishing_rod","stat.breakItem.minecraft.shears","stat.breakItem.minecraft.carrot_on_a_stick","stat.craftItem.minecraft.golden_sword","stat.craftItem.minecraft.cooked_chicken","stat.craftItem.minecraft.stained_glass","stat.craftItem.minecraft.lead","stat.craftItem.minecraft.snow_layer","stat.craftItem.minecraft.stick","stat.craftItem.minecraft.heavy_weighted_pressure_plate","stat.craftItem.minecraft.sticky_piston","stat.craftItem.minecraft.wheat","stat.craftItem.minecraft.redstone","stat.craftItem.minecraft.hardened_clay","stat.craftItem.minecraft.golden_hoe","stat.craftItem.minecraft.furnace","stat.craftItem.minecraft.flint_and_steel","stat.craftItem.minecraft.chest_minecart","stat.craftItem.minecraft.stone_sword","stat.craftItem.minecraft.bread","stat.craftItem.minecraft.iron_pickaxe","stat.craftItem.minecraft.stained_glass_pane","stat.craftItem.minecraft.jukebox","stat.craftItem.minecraft.bed","stat.craftItem.minecraft.wool","stat.craftItem.minecraft.diamond_boots","stat.craftItem.minecraft.lever","stat.craftItem.minecraft.compass","stat.craftItem.minecraft.coal","stat.craftItem.minecraft.noteblock","stat.craftItem.minecraft.iron_shovel","stat.craftItem.minecraft.diamond_helmet","stat.craftItem.minecraft.furnace_minecart","stat.craftItem.minecraft.slime","stat.craftItem.minecraft.brick_stairs","stat.craftItem.minecraft.trapdoor","stat.craftItem.minecraft.glowstone","stat.craftItem.minecraft.cauldron","stat.craftItem.minecraft.quartz_block","stat.craftItem.minecraft.brick","stat.craftItem.minecraft.iron_helmet","stat.craftItem.minecraft.minecart","stat.craftItem.minecraft.redstone_block","stat.craftItem.minecraft.stone_axe","stat.craftItem.minecraft.emerald_block","stat.craftItem.minecraft.stone_hoe","stat.craftItem.minecraft.leather_boots","stat.craftItem.minecraft.wooden_shovel","stat.craftItem.minecraft.wooden_axe","stat.craftItem.minecraft.brewing_stand","stat.craftItem.minecraft.lapis_block","stat.craftItem.minecraft.tripwire_hook","stat.craftItem.minecraft.writable_book","stat.craftItem.minecraft.acacia_stairs","stat.craftItem.minecraft.glass_pane","stat.craftItem.minecraft.stone","stat.craftItem.minecraft.tnt_minecart","stat.craftItem.minecraft.cookie","stat.craftItem.minecraft.iron_boots","stat.craftItem.minecraft.sandstone","stat.craftItem.minecraft.jungle_stairs","stat.craftItem.minecraft.leather_chestplate","stat.craftItem.minecraft.bowl","stat.craftItem.minecraft.comparator","stat.craftItem.minecraft.anvil","stat.craftItem.minecraft.pumpkin_pie","stat.craftItem.minecraft.prismarine","stat.craftItem.minecraft.dispenser","stat.craftItem.minecraft.stone_button","stat.craftItem.minecraft.wooden_pressure_plate","stat.craftItem.minecraft.wooden_door","stat.craftItem.minecraft.cooked_beef","stat.craftItem.minecraft.quartz","stat.craftItem.minecraft.iron_door","stat.craftItem.minecraft.hopper","stat.craftItem.minecraft.iron_sword","stat.craftItem.minecraft.diamond_pickaxe","stat.craftItem.minecraft.rail","stat.craftItem.minecraft.carrot_on_a_stick","stat.craftItem.minecraft.bookshelf","stat.craftItem.minecraft.nether_brick_stairs","stat.craftItem.minecraft.fishing_rod","stat.craftItem.minecraft.spruce_stairs","stat.craftItem.minecraft.nether_brick_fence","stat.craftItem.minecraft.fence_gate","stat.craftItem.minecraft.wooden_sword","stat.craftItem.minecraft.stone_shovel","stat.craftItem.minecraft.gold_block","stat.craftItem.minecraft.snow","stat.craftItem.minecraft.iron_leggings","stat.craftItem.minecraft.ender_chest","stat.craftItem.minecraft.golden_chestplate","stat.craftItem.minecraft.diamond_sword","stat.craftItem.minecraft.diamond_chestplate","stat.craftItem.minecraft.ender_eye","stat.craftItem.minecraft.sandstone_stairs","stat.craftItem.minecraft.diamond_shovel","stat.craftItem.minecraft.diamond","stat.craftItem.minecraft.diamond_axe","stat.craftItem.minecraft.golden_shovel","stat.craftItem.minecraft.glass","stat.craftItem.minecraft.speckled_melon","stat.craftItem.minecraft.melon_seeds","stat.craftItem.minecraft.clay","stat.craftItem.minecraft.trapped_chest","stat.craftItem.minecraft.golden_boots","stat.craftItem.minecraft.golden_apple","stat.craftItem.minecraft.nether_brick","stat.craftItem.minecraft.clock","stat.craftItem.minecraft.leather_leggings","stat.craftItem.minecraft.gold_nugget","stat.craftItem.minecraft.sea_lantern","stat.craftItem.minecraft.fence","stat.craftItem.minecraft.quartz_stairs","stat.craftItem.minecraft.shears","stat.craftItem.minecraft.flower_pot","stat.craftItem.minecraft.blaze_powder","stat.craftItem.minecraft.gold_ingot","stat.craftItem.minecraft.crafting_table","stat.craftItem.minecraft.iron_hoe","stat.craftItem.minecraft.diamond_hoe","stat.craftItem.minecraft.golden_axe","stat.craftItem.minecraft.stained_hardened_clay","stat.craftItem.minecraft.golden_rail","stat.craftItem.minecraft.piston","stat.craftItem.minecraft.lit_pumpkin","stat.craftItem.minecraft.hopper_minecart","stat.craftItem.minecraft.iron_trapdoor","stat.craftItem.minecraft.torch","stat.craftItem.minecraft.redstone_lamp","stat.craftItem.minecraft.tnt","stat.craftItem.minecraft.magma_cream","stat.craftItem.minecraft.iron_chestplate","stat.craftItem.minecraft.detector_rail","stat.craftItem.minecraft.sugar","stat.craftItem.minecraft.baked_potato","stat.craftItem.minecraft.wooden_pickaxe","stat.craftItem.minecraft.iron_ingot","stat.craftItem.minecraft.iron_block","stat.craftItem.minecraft.chest","stat.craftItem.minecraft.map","stat.craftItem.minecraft.diamond_block","stat.craftItem.minecraft.painting","stat.craftItem.minecraft.melon_block","stat.craftItem.minecraft.golden_carrot","stat.craftItem.minecraft.boat","stat.craftItem.minecraft.bow","stat.craftItem.minecraft.book","stat.craftItem.minecraft.cobblestone_wall","stat.craftItem.minecraft.redstone_torch","stat.craftItem.minecraft.stone_pressure_plate","stat.craftItem.minecraft.stone_brick_stairs","stat.craftItem.minecraft.golden_helmet","stat.craftItem.minecraft.emerald","stat.craftItem.minecraft.enchanting_table","stat.craftItem.minecraft.dark_oak_stairs","stat.craftItem.minecraft.wooden_button","stat.craftItem.minecraft.hay_block","stat.craftItem.minecraft.coal_block","stat.craftItem.minecraft.sponge","stat.craftItem.minecraft.dirt","stat.craftItem.minecraft.dye","stat.craftItem.minecraft.activator_rail","stat.craftItem.minecraft.stonebrick","stat.craftItem.minecraft.mossy_cobblestone","stat.craftItem.minecraft.fermented_spider_eye","stat.craftItem.minecraft.birch_stairs","stat.craftItem.minecraft.leather_helmet","stat.craftItem.minecraft.wooden_slab","stat.craftItem.minecraft.planks","stat.craftItem.minecraft.iron_axe","stat.craftItem.minecraft.carpet","stat.craftItem.minecraft.light_weighted_pressure_plate","stat.craftItem.minecraft.mushroom_stew","stat.craftItem.minecraft.glass_bottle","stat.craftItem.minecraft.golden_pickaxe","stat.craftItem.minecraft.repeater","stat.craftItem.minecraft.slime_ball","stat.craftItem.minecraft.diamond_leggings","stat.craftItem.minecraft.item_frame","stat.craftItem.minecraft.golden_leggings","stat.craftItem.minecraft.sign","stat.craftItem.minecraft.fire_charge","stat.craftItem.minecraft.paper","stat.craftItem.minecraft.bucket","stat.craftItem.minecraft.stone_stairs","stat.craftItem.minecraft.beacon","stat.craftItem.minecraft.stone_slab","stat.craftItem.minecraft.cooked_porkchop","stat.craftItem.minecraft.cooked_fish","stat.craftItem.minecraft.pumpkin_seeds","stat.craftItem.minecraft.arrow","stat.craftItem.minecraft.oak_stairs","stat.craftItem.minecraft.ladder","stat.craftItem.minecraft.dropper","stat.craftItem.minecraft.daylight_detector","stat.craftItem.minecraft.netherbrick","stat.craftItem.minecraft.stone_pickaxe","stat.craftItem.minecraft.iron_bars","stat.craftItem.minecraft.cake","stat.craftItem.minecraft.brick_block","stat.craftItem.minecraft.wooden_hoe","achievement.openInventory","achievement.mineWood","achievement.buildWorkBench","achievement.buildPickaxe","achievement.buildFurnace","achievement.acquireIron","achievement.buildHoe","achievement.makeBread","achievement.bakeCake","achievement.buildBetterPickaxe","achievement.cookFish","achievement.onARail","achievement.buildSword","achievement.killEnemy","achievement.killCow","achievement.flyPig","achievement.snipeSkeleton","achievement.diamonds","achievement.diamondsToYou","achievement.portal","achievement.ghast","achievement.blazeRod","achievement.potion","achievement.theEnd","achievement.theEnd2","achievement.enchantments","achievement.overkill","achievement.bookcase","achievement.breedCow","achievement.spawnWither","achievement.killWither","achievement.fullBeacon","achievement.exploreAllBiomes","achievement.overpowered"];
var commands = ["/achievement give <stat_name> [player]","/blockdata <x> <y> <z> <dataTag>","/clear <player> [item] [data] [maxCount] [dataTag]","/clone <x1> <y1> <z1> <x2> <y2> <z2> <x> <y> <z> [mode]","/debug <start|stop>","/defaultgamemode <mode>","/difficulty <new difficulty>","/effect <player> <effect> [seconds] [amplifier] [hideParticles]","/enchant <player> <enchantment ID> [level]","/execute <entity> <x> <y> <z> <command>","/fill <x1> <y1> <z1> <x2> <y2> <z2> <TileName> [dataValue] [oldBlockHandling] [dataTag]","/gamemode <mode> [player]","/gamerule <rule name> <value>","/gamerule <rule name>","/give <player> <item> [amount] [data] [dataTag]","/help [page|command name]","/kill [player|entity]","/me <action ...>","/particle <name> <x> <y> <z> <xd> <yd> <zd> <speed> [count] [player|entity]","/playsound <sound> <player> [x] [y] [z] [volume] [pitch] [minimumVolume]","/publish","/say <message ...>","/scoreboard <objectives|players|teams>","/seed","/setblock <x> <y> <z> <TileName> [dataValue] [oldBlockHandling] [dataTag]","/setworldspawn","/setworldspawn <x> <y> <z>","/spawnpoint","/spawnpoint <player>","/spawnpoint <player> <x> <y> <z>","/spreadplayers <x> <z> <spreadDistance> <maxRange> <respectTeams true|false> <player ...>","/summon <EntityName> [x] [y] [z] [dataTag]","/tell <player> <private message ...>","/tellraw <player> <raw json message>","/testfor <player> [dataTag]","/testforblock <x> <y> <z> <TileName> [dataValue] [dataTag]","/testforblocks <x1> <y1> <z1> <x2> <y2> <z2> <x> <y> <z> [mode]","/time <set|add> <value>","/title <player> title|subtitle <raw json title>","/title <player> clear|reset","/title <player> times <fadeIn> <stay> <fadeOut>","/toggledownfall","/tp [target player] <destination player>","/tp [target player] <x> <y> <z> [<y-rot> <x-rot>]","/trigger <objective> <add|set> <value>","/weather <clear|rain|thunder> [duration in seconds]","/worldborder <set|center|damage|warning>","/xp <amount> [player]","/xp <amount>L [player]"];
var chars = new Array(1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
var matchLength = 0;
var version = 2;
var jobject = [];
var selectedHover;
var selectedClick;
var selectedHover_edit;
var selectedClick_edit;
var downButton;
var upButton;
var extraTextFormat = 'raw';
var lang = {"status":"init"};
var translationStrings;
var currentEdit;
var hasAlertedTranslationObjects = false;
var webLangRelations;

function getURL(url){
	return $.ajax({
		type: "GET",
		url: url,
		cache: false,
		async: false
	}).responseText;
}

function verify_jobject_format(jdata) {
	if (get_type(jdata) != "[object Array]") {
		alert('Your stored variable is malformed and needs to be cleared.');
		localStorage.clear();
		location.reload();
	}
	if (jdata.text != '' && get_type(jdata) != "[object Array]") {
		jdata.unshift(new Object());
		jdata[0].text = jdata.text;
		jdata[0].color = jdata.color;
		delete(jdata.color);
		jdata[0].bold = jdata.bold;
		delete(jdata.bold);
		jdata[0].italic = jdata.italic;
		delete(jdata.italic);
		jdata[0].underlined = jdata.underlined;
		delete(jdata.underline);
		jdata[0].strikethrough = jdata.strikethrough;
		delete(jdata.strikethrough);
		jdata[0].obfuscated = jdata.obfuscated;
		delete(jdata.obfuscated);
		jdata.text = '';
	}

	return jdata;
}

function formatJObjectList(data,escape) {
	if (data.length == 0) {
		return [];
	}
	var ret_val = [];
	var currentDataToPlug = {"text":"","extra":[]};
	for (var i = 0; i < data.length; i++) {
		if (data[i].NEW_ITERATE_FLAG) {
			ret_val.push(currentDataToPlug);
			currentDataToPlug = {"text":"","extra":[]};
		} else {
			currentDataToPlug.extra.push(data[i]);
		}
	}
	if (!data[data.length - 1].NEW_ITERATE_FLAG) {
		if (escape) {
			ret_val.push(escapeQuotes(currentDataToPlug));
		} else {
			ret_val.push(currentDataToPlug);
		}
	}
	return ret_val;
}

function closeExport() {
	$('#exporter').remove();
}
function isScrolledIntoView(elem) {
	elem = '#' + elem;
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function goToByScroll(id){
	if (!isScrolledIntoView(id)) {
		$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
	}
}

var templates = 
{
	"tellraw": {
		"command": "/tellraw @a %s",
		"version": "1.7",
		"breakers": false
	},
	"execute_tellraw": {
		"command": "/execute @a ~ ~ ~ tellraw @p %s",
		"version": "1.8",
		"breakers": false
	},
	"title": {
		"command": "/title @a title %s",
		"version": "1.8",
		"breakers": false
	},
	"subtitle": {
		"command": "/title @a subtitle %s",
		"version": "1.8",
		"breakers": false
	},
	"sign_item": {
		"command": "/give @a sign 1 0 {BlockEntityTag:{Text1:\"%e\",id:\"Sign\"}}",
		"version": "1.8",
		"breakers": false
	},
	"sign_block": {
		"command": "/blockdata [x] [y] [z] {Text1:\"%e\"}",
		"version": "1.8",
		"breakers": false
	},
	"book": {
		"command": "/give @a written_book 1 0 {pages:[\"%e\"],title:Book,author:TellrawGenerator}",
		"version": "1.8",
		"breakers": "bookarray"
	}
}
/*
(c) 2012 Steven Levithan <http://slevithan.com/>
MIT license
*/
if (!String.prototype.codePointAt) {
	String.prototype.codePointAt = function (pos) {
		pos = isNaN(pos) ? 0 : pos;
		var str = String(this),
		code = str.charCodeAt(pos),
		next = str.charCodeAt(pos + 1);
        // If a surrogate pair
        if (0xD800 <= code && code <= 0xDBFF && 0xDC00 <= next && next <= 0xDFFF) {
        	return ((code - 0xD800) * 0x400) + (next - 0xDC00) + 0x10000;
        }
        return code;
    };
}

function setObfuscatedString(string) {
	var output = "";
	for (var i = string.length - 1; i >= 0; i--) {
		string[i]
		output = output + chars[Math.floor(Math.random() * chars.length)];
	};
	return output;
}
function saveJObject() {
	if (localStorage.getItem('currentSaveSlot') != null) {
		var saveTo = prompt('Please enter a save name. If you choose an existing one, it will overwrite it.', localStorage.getItem('currentSaveSlot'));
	} else {
		var saveTo = prompt('Please enter a save name. If you choose an existing one, it will overwrite it.');
	}
	if (saveTo == '' || saveTo == undefined || new RegExp('[^a-zA-Z0-9]').test(saveTo)) {
		alert('You didn\'t enter a valid save name! Please omit special characters');
		return false;
	}
	var saveSlot = 'saveSlot_' + saveTo;
	var overwrite = false;
	if (localStorage.getItem(saveSlot) != undefined) {
		overwrite = true;
	}
	localStorage.setItem('currentSaveSlot',saveTo);
	localStorage.setItem(saveSlot, JSON.stringify({"command": $('#command').val(), "jobject": jobject}));
	if (overwrite) {
		alert('Saved your current revision to `' + saveTo + '`, overwriting your previous save to that slot');	
	} else {
		alert('Saved your current revision to `' + saveTo + '`, which created a new saveSlot');
	}
	refreshSavesList();
	refreshOutput();
}
function loadJObject(saveName) {
	var saveItem = getJObject(saveName);
	jobject = saveItem.jobject;
	$('#command').val(saveItem.command);
	alert('Loaded save `' + saveName + '`');
	refreshSavesList();
	refreshOutput();
}
function doesJObjectExist(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	return localStorage.getItem(saveSlot) != undefined;

}
function getJObject(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	return JSON.parse(localStorage.getItem(saveSlot));
}
function deleteAll() {
	$('#deleteConfirm').remove();
	$('.alerts').append('<div id="deleteConfirm" class="alert alert-danger"><h4 lang="settings.deleteall.heading"></h4><p lang="settings.deleteall.body"></p><p><button type="button" onclick="deleteAllConfirmed()" class="btn btn-danger" lang="settings.deleteall.yes"></button> <button type="button" onclick="deleteAllCancel()" class="btn btn-default" lang="settings.deleteall.no"></button></p></div>');
	goToByScroll('deleteConfirm');
	refreshLanguage();
}
function deleteAllConfirmed() {
	$('#deleteConfirm').slideUp();
	$('#deleteConfirm');
	jobject = [];
	$('#command').val('/tellraw @a %s');
	refreshOutput();
}
function deleteAllCancel() {
	$('#deleteConfirm').slideUp();
}
function clearJObjectSaves() {
	$('#deleteJObjectConfirm').remove();
	$('.alerts').append('<div id="deleteJObjectConfirm" class="alert alert-danger"><h4 lang="saves.deleteall.heading"></h4><p lang="saves.deleteall.body"></p><p><button type="button" onclick="clearJObjectSavesConfirmed()" class="btn btn-danger" lang="saves.deleteall.yes"></button> <button type="button" onclick="clearJObjectSavesCancel()" class="btn btn-default" lang="saves.deleteall.no"></button></p></div>');
	refreshLanguage();
}
function clearJObjectSavesConfirmed() {
	for (var i = 0; i < Object.keys(localStorage).length; i++) {
		var key = Object.keys(localStorage)[i];
		if (key.indexOf('saveSlot_') != -1) {
			localStorage.removeItem(key);
		}
	};
	$('#deleteJObjectConfirm').slideUp();
	refreshSavesList();
}
function clearJObjectSavesCancel() {
	$('#deleteJObjectConfirm').slideUp();
}
function warnFutureVersion(ver,feature,c) {
	$('.modal_banners').append('<div class="alert alert-warning futureWarning '+c+'"><strong lang="textsnippets.warning.title"></strong> '+getLanguageString('textsnippets.warning.text',localStorage.getItem('langCode')).replace('%v',ver).replace('%f',feature)+'</div>');
	refreshLanguage();
}
function obfuscationPreviewHandler() {
	$('.jsonPreviewObfuscated').html(setObfuscatedString($('.jsonPreviewObfuscated').html()));
	if ($('.jsonPreviewObfuscated').length > 0) {
		setTimeout(obfuscationPreviewHandler, 20);
	}
}
function getCSSHEXFromWord(w) {
	if (w == "black") return("#000000");
	if (w == "dark_blue") return("#0000B2");
	if (w == "dark_green") return("#14AB00");
	if (w == "dark_aqua") return("#13AAAB");
	if (w == "dark_red") return("#A90400");
	if (w == "dark_purple") return("#A900B2");
	if (w == "gold") return("#FEAC00");
	if (w == "gray") return("#AAAAAA");
	if (w == "dark_gray") return("#555555");
	if (w == "blue") return("#544CFF");
	if (w == "green") return("#5CFF00");
	if (w == "aqua") return("#5BFFFF");
	if (w == "red") return("#FD5650");
	if (w == "light_purple") return("#FD4DFF");
	if (w == "yellow") return("#FFFF00");
	if (w == "white") return("#FFFFFF");
	if (w == "none") return("#FFFFFF");
	return("#FFFFFF");
}
function removeWhiteSpace(s) {
	return s;
	//BROKEN return s.replace(/ /g, '');
}
function deleteIndex(index) {
	jobject.splice(index, 1);
	refreshOutput();
}
function moveUp(index) {
	jobject.splice(index+1, 0, jobject.splice(index, 1)[0]);
	refreshOutput();
}
function getSelected(object) {
	if ($('#'+object).length != 0) {
		var e = document.getElementById(object);
		return e.options[e.selectedIndex].value;
	} else {
		return false;
	}
}
function getSelectedIndex(object) {
	var e = document.getElementById(object);
	return e.selectedIndex;
}
function getChecked(id) {
	return document.getElementById(id).checked;
}
function clearExtra() {
	$('#fmtExtraRaw').click();
	$("#clickEventText").val("");
	$("#hoverEventText").val("");
	$("#text_extra").val("");
	$("#color_extra").val("none");
	$("#clickEvent").val('none');
	$("#hoverEvent").val('none');
	$("#insertion_text").val('');
	$("#bold_text_extra").prop("checked",false);
	$("#italic_text_extra").prop("checked",false);
	$("#underlined_text_extra").prop("checked",false);
	$("#strikethrough_text_extra").prop("checked",false);
	$("#obfuscated_text_extra").prop("checked",false);
	$('#hoverEventEntityName').val('');
	$('#hoverEventEntityID').val('');
	$('#hoverEventEntityType').val('');
	$('#textsnippets_add').html(getLanguageString('textsnippets.addsnippet'),localStorage.getItem('langCode'));
	$('#textsnippets-add-button').addClass('btn-default');
	$('#textsnippets-add-button').removeClass('btn-danger');
	$('#obj_player').val('');
	$('#obj_score').val('');
	refreshOutput();
}
function editExtra(index) {
	$('#snippetsWell').hide();
	$('#editModalData').show();

	currentEdit = index;

	if (jobject[index].text != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#text_extra_container_edit').show();
		$('#translate_selector_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#text_extra_edit').val(jobject[index].text);
	} else if (jobject[index].selector != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#selector_extra_container_edit').show();
		$('#text_extra_container_edit').hide();
		$('#translate_selector_container_edit').hide();
		$('#selector_edit').val(jobject[index].selector);
	} else if (jobject[index].translate != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#text_extra_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#translate_selector_container_edit').show();
		if (!hasAlertedTranslationObjects) {
			alert('Translation objects are currently broken and may crash your game. Please test your translation before publishing it.');
			hasAlertedTranslationObjects = true;
		}
	} else if (jobject[index].score != undefined) {
		$('#obj_extra_container_edit').show();
		$('#text_extra_container_edit').hide();
		$('#translate_selector_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#obj_player_edit').val(jobject[index].score.name);
		$('#obj_score_edit').val(jobject[index].score.objective);
	}

	refreshLanguage();

	$('#colorPreviewColor_edit').css('background-color',getCSSHEXFromWord(jobject[index].color));
	if (jobject[index].color != undefined) {
		$("#color_extra_edit").val(jobject[index].color);
	} else {
		$("#color_extra_edit").val('none');
	}

	if (jobject[index].bold != undefined) {
		$('#bold_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].italic != undefined) {
		$('#italic_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].underlined != undefined) {
		$('#underlined_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].strikethrough != undefined) {
		$('#strikethrough_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].obfuscated != undefined) {
		$('#obfuscated_text_extra_edit').prop('checked',true);
	}

	if (jobject[index].clickEvent != undefined) {
		$('#clickEvent_edit').val(jobject[index].clickEvent.action);
		$('#clickEventText_edit').val(jobject[index].clickEvent.value);
	}

	if (jobject[index].hoverEvent != undefined) {
		$('#hoverEvent_edit').val(jobject[index].hoverEvent.action);
		if ($('#hoverEvent_edit').val() != 'show_entity') {
			if (jobject[index].hoverEvent.action == 'show_text') {
				$('#hoverEventText_edit').val(jobject[index].hoverEvent.value.text);
			} else {
				$('#hoverEventText_edit').val(jobject[index].hoverEvent.value);
			}
		} else {
			$('#hoverEventEntityID_edit').val(jobject[index].hoverEvent.value.match(/id:([a-zA-Z0-9]+)/g )[0].replace('id:',''));
			$('#hoverEventEntityName_edit').val(jobject[index].hoverEvent.value.match(/name:([a-zA-Z0-9]+)/g )[0].replace('name:',''));
			$('#hoverEventEntityType_edit').val(jobject[index].hoverEvent.value.match(/type:([a-zA-Z0-9]+)/g )[0].replace('type:',''));
		}
	}

	if (jobject[index].insertion != undefined) {
		$('#insertion_text_edit').val(jobject[index].insertion);
	}

	refreshOutput();
}
function cancelExtraEdit() {
	$('#editModalData').hide();
	$('#snippetsWell').show();
}
function saveExtraEdit() {	
	extraIndex = currentEdit;
	jobject[extraIndex].color = getSelected("color_extra_edit");

	if (jobject[extraIndex].color == 'none') {
		delete jobject[extraIndex].color;
	}

	if ($('#obj_extra_container_edit').is(":visible")) {
		jobject[extraIndex].score = new Object;
		jobject[extraIndex].score.name = $('#obj_player_edit').val();
		jobject[extraIndex].score.objective = $('#obj_score_edit').val();
	} else if ($('#text_extra_container_edit').is(":visible")) {
		jobject[extraIndex].text = $('#text_extra_edit').val();
	} else if ($('#selector_extra_container_edit').is(":visible")) {
		jobject[extraIndex].selector = $('#selector_edit').val();
	} else if ($('#translate_selector_container_edit').is(":visible")) {
		jobject[extraIndex].translate = $('#translate_input_edit').val();
		if (matchLength != 0) {
			if (get_type(jobject.with) != "[object Array]") {
				jobject[extraIndex].with = new Array();
			}
			for (var i = 0; i < matchLength; i++) {
				jobject[extraIndex].with[i] = $('#extraTranslationParameter'+i+'_edit').val();
			};
		}
	} else {
		alert('An unexpected error occured.');
	}

	delete jobject[extraIndex].bold;
	delete jobject[extraIndex].italic;
	delete jobject[extraIndex].underlined;
	delete jobject[extraIndex].strikethrough;
	delete jobject[extraIndex].obfuscated;

	if (getChecked("bold_text_extra_edit")) {
		jobject[extraIndex].bold = "true";
	}
	if (getChecked("italic_text_extra_edit")) {
		jobject[extraIndex].italic = "true";
	}
	if (getChecked("underlined_text_extra_edit")) {
		jobject[extraIndex].underlined = "true";
	}
	if (getChecked("strikethrough_text_extra_edit")) {
		jobject[extraIndex].strikethrough = "true";
	}
	if (getChecked("obfuscated_text_extra_edit")) {
		jobject[extraIndex].obfuscated = "true";
	}

	delete jobject[extraIndex].clickEvent;
	delete jobject[extraIndex].hoverEvent;

	var clickEventType_edit = $("#clickEvent_edit").val();
	var hoverEventType_edit = $("#hoverEvent_edit").val();

	if (clickEventType_edit != "none") {
		jobject[extraIndex].clickEvent = new Object();
		jobject[extraIndex].clickEvent.action = clickEventType_edit;
		jobject[extraIndex].clickEvent.value = $('#clickEventText_edit').val();
		if (clickEventType_edit == "run_command" || clickEventType_edit == "suggest_command") {
			if ($('#clickEventText_edit').val().length > 90) {
				alert('Commands cannot be longer than 90 characters! You should edit the length of your command before using this in game.')
			}
		}
	}
	if (hoverEventType_edit != "none") {
		jobject[extraIndex].hoverEvent = new Object();
		jobject[extraIndex].hoverEvent.action = hoverEventType_edit;
		if (hoverEventType_edit == 'show_text') {
			jobject[extraIndex].hoverEvent.value = {"text": $('#hoverEventText_edit').val()};
			if ($('#color_hover_edit').val() != 'none') {
				jobject[extraIndex].hoverEvent.value.color = $('#color_hover_edit').val();
			}
		} else {
			jobject[extraIndex].hoverEvent.value = $('#hoverEventText_edit').val();
		}
	}
	if (hoverEventType_edit == "show_entity") {
		if ($('#hoverEventEntityID_edit').val() == '') {
			$('#hoverEventEntityID_edit').val('(ID)')
		}
		if ($('#hoverEventEntityName_edit').val() == '') {
			$('#hoverEventEntityName_edit').val('(Name)')
		}
		if ($('#hoverEventEntityType_edit').val() == '') {
			$('#hoverEventEntityType_edit').val('(Type)')
		}
		jobject[extraIndex].hoverEvent.value = '{id:'+removeWhiteSpace($('#hoverEventEntityID_edit').val())+',name:'+removeWhiteSpace($('#hoverEventEntityName_edit').val())+',type:'+removeWhiteSpace($('#hoverEventEntityType_edit').val())+'}';
	}
	if ($('#insertion_text_edit').val() != '') {
		jobject[extraIndex].insertion = $('#insertion_text_edit').val();
	} else {
		delete jobject[extraIndex].insertion;
	}

	$('#editModalData').hide();
	$('#snippetsWell').show();

	refreshOutput();
}
function clearExtraText() {
	delete jobject;
	refreshOutput();
}
function get_type(thing){
	if (thing===null) {
		return "[object Null]";
	}
	return Object.prototype.toString.call(thing);
}
function escapeQuotes(string) {
	return string.replace(/\\"/g, '\\\\\\"').replace(/([^\\])"/g, '$1\\"').replace(/\\""/g,'\\"\\"');
}
function modifyExtraText(index,text) {
	if (text != "" && text != null) {
		jobject[index].text = text;
	}
	refreshOutput();
}
function cancelAddExtra() {
	$('#snippetsWell').show();
	$('#addExtraModalData').hide();
	clearExtra();
}
function addExtra() {
	if (extraTextFormat == 'raw' && $('#text_extra').val() == '') {
		$('#text_extra_container').addClass('has-error');
		$('#text_extra').focus();
		$('#textsnippets-add-button').removeClass('btn-default');
		$('#textsnippets-add-button').addClass('btn-danger');
		return false;
	} else {
		$('#snippetsWell').show();
		$('#addExtraModalData').hide();
	}
	if (get_type(jobject) != "[object Array]") {
		jobject = [];
	}
	if (extraTextFormat == 'NEW_ITERATE_FLAG') {
		jobject.push({"NEW_ITERATE_FLAG":true});
	} else {
		var clickEventType = $("#clickEvent").val();
		var hoverEventType = $("#hoverEvent").val();

		jobject.push(new Object());
		var extraIndex = jobject.length - 1;
		if (extraTextFormat == 'trn') {
			jobject[extraIndex].translate = $('#translate_input').val();
			if (matchLength != 0) {
				if (get_type(jobject.with) != "[object Array]") {
					jobject[extraIndex].with = new Array();
				}
				for (var i = 0; i < matchLength; i++) {
					jobject[extraIndex].with[i] = $('#extraTranslationParameter'+i).val();
				};
			}
		} else if (extraTextFormat == 'raw') {
			jobject[extraIndex].text = $('#text_extra').val();
		} else if (extraTextFormat == 'obj') {
			jobject[extraIndex].score = new Object;
			jobject[extraIndex].score.name = $('#obj_player').val();
			jobject[extraIndex].score.objective = $('#obj_score').val();
		} else if (extraTextFormat == 'sel') {
			jobject[extraIndex].selector = $('#selector').val();
		}


		jobject[extraIndex].color = getSelected("color_extra");
		if (jobject[extraIndex].color == 'none') {
			delete jobject[extraIndex].color;
		}

		if (getChecked("bold_text_extra")) {
			jobject[extraIndex].bold = "true";
		}
		if (getChecked("italic_text_extra")) {
			jobject[extraIndex].italic = "true";
		}
		if (getChecked("underlined_text_extra")) {
			jobject[extraIndex].underlined = "true";
		}
		if (getChecked("strikethrough_text_extra")) {
			jobject[extraIndex].strikethrough = "true";
		}
		if (getChecked("obfuscated_text_extra")) {
			jobject[extraIndex].obfuscated = "true";
		}

		if (clickEventType != "none") {
			jobject[extraIndex].clickEvent = new Object();
			jobject[extraIndex].clickEvent.action = clickEventType;
			jobject[extraIndex].clickEvent.value = $('#clickEventText').val();
			if (clickEventType == "run_command" || clickEventType == "suggest_command") {
				if ($('#clickEventText').val().length > 90) {
					alert('Commands cannot be longer than 90 characters! You should edit the length of your command before using this in game.')
				}
			}

		}
		if (hoverEventType != "none") {
			jobject[extraIndex].hoverEvent = new Object();
			jobject[extraIndex].hoverEvent.action = hoverEventType;
			if (hoverEventType == 'show_text') {
				jobject[extraIndex].hoverEvent.value = {"text": $('#hoverEventText').val()};
				if ($('#color_hover').val() != 'none') {
					jobject[extraIndex].hoverEvent.value.color = $('#color_hover').val();
				}
			} else {
				jobject[extraIndex].hoverEvent.value = $('#hoverEventText').val();
			}
		}
		if (hoverEventType == "show_entity") {
			if ($('#hoverEventEntityID').val() == '') {
				$('#hoverEventEntityID').val('(ID)')
			}
			if ($('#hoverEventEntityName').val() == '') {
				$('#hoverEventEntityName').val('(Name)')
			}
			if ($('#hoverEventEntityType').val() == '') {
				$('#hoverEventEntityType').val('(Type)')
			}
			jobject[extraIndex].hoverEvent.value = '{id:'+removeWhiteSpace($('#hoverEventEntityID').val())+',name:'+removeWhiteSpace($('#hoverEventEntityName').val())+',type:'+removeWhiteSpace($('#hoverEventEntityType').val())+'}';
		}
		if ($('#insertion_text').val() != '') jobject[extraIndex].insertion = $('#insertion_text').val();
	}
	clearExtra();
	refreshOutput();

}
function refreshSavesList() {
	$('.savesContainer').html('');
	for (var i = 0; i < Object.keys(localStorage).length; i++) {
		var key = Object.keys(localStorage)[i];
		if (key.indexOf('saveSlot_') != -1) {
			$('.savesContainer').append('<div class="row" saveKey="' + key.substring('9') + '"><div class="col-xs-3"><a href="#" onclick="loadJObject(\'' + key.substring('9') + '\')">Load ' + key.substring('9') + '</a> or <a href="#" onclick="deleteJObjectSave(\'' + key.substring('9') + '\')">Delete ' + key.substring('9') + '</a></div><div class="col-xs-9">' + localStorage.getItem(key).substring(0,90) + ' ...</div></div>')
		}
	};
	if ($('.savesContainer').html() == '') {
		$('.savesContainer').html('<div class="row"><div class="col-xs-12"><h4 lang="saves.nosaves"></h4></div></div>');
	}
	refreshLanguage();
}
function deleteJObjectSave(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	if (confirm('Are you sure you want to delete ' + saveName + '?')) {
		localStorage.removeItem(saveSlot);
	}
	refreshSavesList();
}
function refreshOutput(input) {
	/*VERIFY CONTENTS*/
	jobject = verify_jobject_format(jobject);

	if ($('#command').val().indexOf('%e') == -1 && $('#command').val().indexOf('%s') == -1) {
		$('#command').val('tellraw @a %s');
		localStorage.setItem('jtemplate','tellraw');
	}

	refreshSavesList();

	/*LANGUAGE SELECTIONS*/

	$('.langSelect').removeClass('label label-success');
	$('.' + localStorage.getItem('langCode')).addClass('label label-success');

	/*EXTRA MODAL COLOR PREVIEW MANAGER*/
	$('#colorPreviewColor').css({ 'background-color': getCSSHEXFromWord(getSelected('color_extra')) });

	/*EXTRA VIEWER MANAGER*/
	$('#textsnippets_header').html(getLanguageString('textsnippets.header',localStorage.getItem('langCode')));
	if (input != 'previewLineChange') {
		if (get_type(jobject) == "[object Array]") {
			var extraOutputPreview = "";
			$('.extraContainer div.extraRow').remove();
			$('.extraContainer').html('');
			for (var i = 0; i <= jobject.length - 1; i++) {
				if (jobject.length-1 > i) {
					downButton = '<i onclick="moveUp(' + i + ')" class="fa fa-arrow-circle-down"></i> ';
				} else {
					downButton = "";
				}
				if (i > 0) {
					upButton = '<i onclick="moveUp(' + (i-1) + ')" class="fa fa-arrow-circle-up"></i> ';
				} else {
					upButton = "";
				}
				if (jobject[i].NEW_ITERATE_FLAG) {
					if (localStorage.getItem('jtemplate') != 'book') {
						var tempJSON = '<span style="color:gray;text-decoration:line-through;" lang="textsnippets.NEW_ITERATE_FLAG"></span>';
					} else {
						var tempJSON = '<span lang="textsnippets.NEW_ITERATE_FLAG"></span>';
					}
					var saveButton = '';
				} else {
					if (get_type(jobject[i].text) != "[object Undefined]") {
						var tempJSON = '<input id="previewLine'+i+'" onkeyup="jobject['+i+'].text = $(\'#previewLine'+i+'\').val(); refreshOutput(\'previewLineChange\')" type="text" class="form-control previewLine" value="'+jobject[i].text+'">';
						var saveButton = '';
					} else if (get_type(jobject[i].translate) != "[object Undefined]") {
						var tempJSON = '<input type="text" class="form-control previewLine" disabled value="'+jobject[i].translate+'">';
						var saveButton = '';
					} else if (get_type(jobject[i].score) != "[object Undefined]") {
						var tempJSON = '<input type="text" class="form-control previewLine" disabled value="'+jobject[i].score.name+'\'s '+jobject[i].score.objective+' score">';
						var saveButton = '';
					} else if (get_type(jobject[i].selector) != "[object Undefined]") {
						var tempJSON = '<input type="text" class="form-control previewLine" disabled value="Selector: '+jobject[i].selector+'">';
						var saveButton = '';
					}
					if (input == 'noEditIfMatches' && jobject[i].text != $('#previewLine'+matchTo).val()) {
						var blah = 'blah'; /* wtf */
					} else {
						tempJSON = '<div class="row"><div class="col-xs-10 col-md-11">'+tempJSON+'</div><div class="col-xs-2 col-md-1"><div class="colorPreview"><div class="colorPreviewColor" style="background-color:'+getCSSHEXFromWord(jobject[i].color)+'"></div></div></div></div>';
					}
				}
				var deleteButton = '<i id="'+i+'RowEditButton" onclick="editExtra('+i+');" class="fa fa-pencil"></i> <i onclick="deleteIndex('+ i +');" class="fa fa-times-circle"></i> ';
				if (jobject[i].NEW_ITERATE_FLAG) {
					deleteButton = '<i onclick="deleteIndex('+ i +');" class="fa fa-times-circle"></i> ';
				}
				$('.extraContainer').append('<div class="row extraRow row-margin-top row-margin-bottom RowIndex' + i + '"><div class="col-xs-4 col-sm-2 col-lg-1">'+deleteButton+downButton+upButton+'</div><div class="col-xs-8 col-sm-10 col-lg-11" style="padding:none;">'+tempJSON+'</div></div>');
			}
			if (jobject.length === 0) {
				delete jobject;
				$('.extraContainer').html('<div class="row"><div class="col-xs-12"><h4 lang="textsnippets.nosnippets"></h4></div></div>');
				refreshLanguage();
			}
		} else {
			$('.extraContainer div.extraRow').remove();
			$('.extraContainer').html('<div class="row"><div class="col-xs-12"><h4>'+getLanguageString('textsnippets.nosnippets',localStorage.getItem('langCode'))+'</h4></div></div>');
		}
		refreshLanguage();
	}

	/*EXTRA TRANSLATE STRING MANAGER*/

	if (extraTextFormat == "trn") {
		$('#obj_extra_container').hide();
		$('#text_extra_container').hide();
		$('#selector_extra_container').hide();
		$('#translate_selector_container').show();
		if (!hasAlertedTranslationObjects) {
			alert('Translation objects are currently broken and may crash your game. Please test your translation before publishing it.');
			hasAlertedTranslationObjects = true;
		}
	} else if (extraTextFormat == "obj") {
		$('#text_extra_container').hide();
		$('#translate_selector_container').hide();
		$('#selector_extra_container').hide();
		$('#obj_extra_container').show();
	} else if (extraTextFormat == "sel") {
		$('#text_extra_container').hide();
		$('#translate_selector_container').hide();
		$('#selector_extra_container').show();
		$('#obj_extra_container').hide();
	} else if (extraTextFormat == "raw") {
		$('#text_extra_container').show();
		$('#obj_extra_container').hide();
		$('#translate_selector_container').hide();
		$('#selector_extra_container').hide();
		$('.extraTranslationParameterRow').hide();
	}
	if (extraTextFormat == 'NEW_ITERATE_FLAG') {
		if (localStorage.getItem('jtemplate') != 'book') {
			alert('You must be using the book template')
			$('#fmtExtraRaw').click();
		}
		$('.NEW_ITERATE_FLAG_not_container').hide();
	} else {
		$('.NEW_ITERATE_FLAG_not_container').show();
	}

	/*COMMAND MANAGER*/
	if ($("#command").val() == "") $("#command").val(templates[localStorage.getItem('jtemplate')]['command']);

	/*HOVEREVENT SUGGESTION MANAGER*/
	$('#hoverEventText').removeAttr('disabled');
	selectedHover = getSelected("hoverEvent");
	if (selectedHover == "show_achievement") {
		$('#hoverEventText').autocomplete({
			source: achievements
		});
	} else if (selectedHover == "show_item") {
		$('#hoverEventText').autocomplete({
			source: []
		});
	} else if (selectedHover == "show_entity") {
		$('.hovertext_default').hide();
		$('.hovertext_entity').show();
	} else if (selectedHover == "none") {
		$('#hoverEventText').attr('disabled','true');
		$('#hoverEventText').autocomplete({
			source: []
		});
	}
	if (selectedHover != "show_entity") {
		$('.hovertext_default').show();
		$('.hovertext_entity').hide();
	}
	if (selectedHover != "show_text") {
		$('.hovertext_text').hide();
	} else {
		$('.hovertext_text').show();
	}

	/*HOVEREVENT EDIT SUGGESTION MANAGER*/
	$('#hoverEventText_edit').removeAttr('disabled');
	selectedHover_edit = getSelected('hoverEvent_edit');
	if (selectedHover_edit == "show_achievement") {
		$('#hoverEventText_edit').autocomplete({
			source: achievements
		});
	} else if (selectedHover_edit == "show_item") {
		$('#hoverEventText_edit').autocomplete({
			source: []
		});
	} else if (selectedHover_edit == "show_entity") {
		$('.hovertext_default_edit').hide();
		$('.hovertext_entity_edit').show();
	} else if (selectedHover_edit == "none") {
		$('#hoverEventText_edit').attr('disabled','true');
		$('#hoverEventText_edit').autocomplete({
			source: []
		});
	}
	if (selectedHover_edit != "show_entity") {
		$('.hovertext_default_edit').show();
		$('.hovertext_entity_edit').hide();
	}
	if (selectedHover_edit != "show_text") {
		$('.hovertext_text_edit').hide();
	} else {
		$('.hovertext_text_edit').show();
	}

	/*CLICKEVENT SUGGESTION MANAGER*/
	$('#clickEventText').removeAttr('disabled');
	selectedClick = getSelected("clickEvent");
	if (selectedClick == "run_command" || selectedClick == "suggest_command") {
		$('#clickEventText').autocomplete({
			source: commands
		});
	} else if (selectedClick == "open_url") {
		$('#clickEventText').autocomplete({
			source: ["https://", "http://", "http://apple.com", "https://minecraft.net", "https://mojang.com", "http://ezekielelin.com", "https://reddit.com"]
		});
	} else if (selectedClick == "none") {
		$('#clickEventText').attr('disabled','true');
		$('#clickEventText').autocomplete({
			source: []
		});
	}

	/*CLICKEVENT EDIT SUGGESTION MANAGER*/
	$('#clickEventText_edit').removeAttr('disabled');
	selectedClick_edit = getSelected('clickEvent_edit');
	if (selectedClick_edit == "run_command" || selectedClick_edit == "suggest_command") {
		$('#clickEventText_edit').autocomplete({
			source: commands
		});
	} else if (selectedClick_edit == "open_url") {
		$('#clickEventText_edit').autocomplete({
			source: ["http://apple.com", "https://minecraft.net", "https://mojang.com", "http://ezekielelin.com", "https://", "https://reddit.com", "http://"]
		});
	} else if (selectedClick_edit == "none") {
		$('#clickEventText_edit').attr('disabled','true');
		$('#clickEventText_edit').autocomplete({
			source: []
		});
	}

	/*PREPARING OUTPUT*/
	var newLine = /\\\\n/g;

	var commandString = $('#command').val();

	var JSONOutputString = '';
	var EscapedJSONOutputString = '';
	var formattedJObject = formatJObjectList(jobject,false);
	var formattedJObjectEscaped = formatJObjectList(jobject,true);

	if (templates[localStorage.getItem('jtemplate')].breakers == 'bookarray') {
		JSONOutputString = JSON.stringify(formattedJObject);
		EscapedJSONOutputString = JSON.stringify(formattedJObjectEscaped);
	} else {
		JSONOutputString = JSON.stringify(formattedJObject[0]);
		EscapedJSONOutputString = escapeQuotes(JSON.stringify(formattedJObjectEscaped[0]));
	}

	commandString.replace(newLine,'\\n');

	commandString = commandString.replace('%s',JSONOutputString);
	commandString = commandString.replace('%e',EscapedJSONOutputString);

	outputString = commandString;

	$('#outputtextfield').val(outputString);
	$('#nicelookingoutput').html(JSON.stringify(jobject, null, 4).replace(newLine,'\\n'));
	jsonParse();

	/*COMMAND BLOCK WARNING*/
	if ($('#outputtextfield').val().length > 90) {
		$('#commandblock').show();
	} else {
		$('#commandblock').hide();
	}

	/*SAVE VARIABLES*/
	localStorage['jobject'] = JSON.stringify(jobject);
	localStorage['jcommand'] = $('#command').val();

	/*RERUN*/
	if (input != 'noLoop' && input != 'previewLineChange') {
		refreshOutput('noLoop');
	}
}
function jsonParse() {
	$('#jsonPreview').css('background-color','#'+$('#previewcolor').val());
	$('#jsonPreview').css('font-size',$('#previewFontSize').val() + 'px');
	localStorage["color"] = $('#previewcolor').val();
	$('#jsonPreview').html('');
	if (get_type(jobject) == "[object Array]") {
		for (var i = 0; i < jobject.length; i++) {
			var doClickEvent = false;
			var doHoverEvent = false;
			var popoverTitle = "";
			var popoverContentClick = "";
			var popoverContentHover = "";
			var hoverEventType = "";
			var hoverEventValue = "";
			var clickEventType = "";
			var clickEventValue = "";
			$('#jsonPreview').append('<span id="jsonPreviewSpanElement'+ i +'"></span>');
			if (get_type(jobject[i].text) != "[object Undefined]") {
				$('#jsonPreviewSpanElement'+i).html(jobject[i].text.replace('\n','<br>').replace('\\n','<br>'));
			} else {
				$('#jsonPreviewSpanElement'+i).html(jobject[i].translate);
			}
			if (jobject[i].bold == "true") {
				$('#jsonPreviewSpanElement'+i).addClass('bold');
			}
			if (jobject[i].italic == "true") {
				$('#jsonPreviewSpanElement'+i).addClass('italic');
			}
			if (jobject[i].underlined == "true") {
				$('#jsonPreviewSpanElement'+i).addClass('underlined');
			}
			if (jobject[i].strikethrough == "true") {
				if ($('#jsonPreviewSpanElement'+i).hasClass('underlined')) {
					$('#jsonPreviewSpanElement'+i).removeClass('underlined');
					$('#jsonPreviewSpanElement'+i).addClass('strikethroughunderlined');
				} else {
					$('#jsonPreviewSpanElement'+i).addClass('strikethrough');
				}
			}
			if (jobject[i].obfuscated == "true") {
				$('#jsonPreviewSpanElement'+i).addClass('jsonPreviewObfuscated');
			}

			/*COLORS*/
			$('#jsonPreviewSpanElement'+i).css('color',getCSSHEXFromWord(jobject[i].color));

			/*CLICK & HOVER EVENTS*/

			if (get_type(jobject[i].clickEvent) != "[object Undefined]" || get_type(jobject[i].hoverEvent) != "[object Undefined]") {
				if (get_type(jobject[i].clickEvent) != "[object Undefined]") doClickEvent = true;
				if (get_type(jobject[i].hoverEvent) != "[object Undefined]") doHoverEvent = true;
				if (doHoverEvent && doClickEvent) {
					popoverTitle = getLanguageString('textsnippets.hoverevent.header',localStorage.getItem('langCode')) + ' and ' + getLanguageString('textsnippets.clickevent.header');
					hoverEventType = jobject[i].hoverEvent.action;
					hoverEventValue = jobject[i].hoverEvent.value;
					clickEventType = jobject[i].clickEvent.action;
					clickEventValue = jobject[i].clickEvent.value;
				}
				if (doHoverEvent && !doClickEvent) {
					popoverTitle = getLanguageString('textsnippets.hoverevent.header',localStorage.getItem('langCode'));
					hoverEventType = jobject[i].hoverEvent.action;
					hoverEventValue = jobject[i].hoverEvent.value;
				}
				if (!doHoverEvent && doClickEvent) {
					popoverTitle = getLanguageString('textsnippets.clickevent.header',localStorage.getItem('langCode'));
					clickEventType = jobject[i].clickEvent.action;
					clickEventValue = jobject[i].clickEvent.value;
				}
				if (doClickEvent) {
					if (clickEventType == "open_url") {
						popoverContentClick = clickEventType+':<a href="'+clickEventValue+'">'+clickEventValue+'</a>';
					} else {
						popoverContentClick = clickEventType+':'+clickEventValue;
					}
				}
				if (doHoverEvent) {
					popoverContentHover = hoverEventType+':'+hoverEventValue;
				}
				if (doHoverEvent && doClickEvent) {
					popoverContentClick = popoverContentClick + '<br>';
				}
				$('#jsonPreviewSpanElement'+i).attr('rel','popover');
			}
			$('#jsonPreviewSpanElement'+ i).popover({ title: popoverTitle, content: popoverContentClick+popoverContentHover, html:true});
		}
	} else {
		$('#jsonPreview').html(getLanguageString('output.nothing',localStorage.getItem('langCode')));
		$('#jsonPreview').css('color','white');
	}
	if ($('.jsonPreviewObfuscated').length > 0) {
		setTimeout(obfuscationPreviewHandler, 20);
	}
}
function refreshLanguage(dropdownSelection) {
	if (lang[localStorage.getItem('langCode')]) {
		$('*').refreshLanguage(localStorage.getItem('langCode'));
	} else {
		localStorage.setItem('langCode','en_us')
	}
	$('*').each(function(){
		if ($(this).attr('version') != undefined && (localStorage['versionIndicators'] == true || localStorage['versionIndicators'] == undefined)) {
			var labelLevel = 'success';
			if ($(this).attr('version') == '1.9') {
				labelLevel = 'danger';
			}
			if ($(this).prop('tagName') == 'OPTION') {
				$(this).prepend('('+$(this).attr('version')+') ');
			} else {
				$(this).append(' <span class="label label-'+labelLevel+'">'+$(this).attr('version')+'</span>');
			}
		}
	});
}

function initialize() {
	if (localStorage.getItem('langCode') == undefined) {
		if (lang[navigator.language.toLowerCase()] != undefined) {
			localStorage.setItem('langCode',navigator.language.toLowerCase());
		} else {
			if (webLangRelations[navigator.language.toLowerCase()] != undefined) {
				localStorage.setItem('langCode',webLangRelations[navigator.language.toLowerCase()]);
			}
		}
	}

	if (localStorage.getItem('langCode') == undefined) {
		localStorage.setItem('langCode','en_us');
	}

	if (localStorage.getItem('jformat') != version && localStorage.getItem('jformat') != undefined) {
		if (confirm('Your cookie format is old and may cause issues. Would you like to reset them? You won\'t be asked again until the format changes again')) {
			localStorage.clear();
			location.reload();
		} else {
			alert('You won\'t be asked again until the cookie format changes. If you experience an issue, please clear your coookies for this website');
		}
	}
	localStorage.setItem('jformat',version);

	for (var i = 0; i < Object.keys(templates).length; i++) {
		var key = Object.keys(templates)[i]
		$('#templateButtons').append('<button class="btn btn-xs btn-default templateButton" lang="template.' + key + '" version="' + templates[key]['version'] + '" template="'+ key +'"></button> ');
	}
	if (localStorage.getItem('jtemplate') == undefined) {
		localStorage.setItem('jtemplate', 'tellraw');
	}
	if (lang[localStorage.getItem('langCode')]) {
		errorString = lang[localStorage.getItem('langCode')].language.name+'<br><br>';
	} else {
		errorString = '&lt;language unknown&gt;<br><br>';
	}
	for (var i = 0; i < Object.keys(lang).length; i++) {
		$('#language_keys').append('<li><a onclick="errorString = \''+lang[Object.keys(lang)[i]].language.name+'<br><br>\'; localStorage.setItem(\'langCode\',\''+Object.keys(lang)[i]+'\'); refreshLanguage(true); refreshOutput();"><span class="'+Object.keys(lang)[i]+' langSelect" id="language_select_'+Object.keys(lang)[i]+'">'+lang[Object.keys(lang)[i]].language.name+'</span></a></li>');
	};
	$('#language_keys').append('<li class="divider"></li>');
	$('#language_keys').append('<li><a href="http://www.minecraftforum.net/topic/1980545-"><span class="language_area" lang="language.translate"></span></a></li>');

	$('.extraTranslationParameterRow').hide();

	if (localStorage['color'] != undefined) {
		$('#previewcolor').val(localStorage["color"]);	
	} else {
		$('#previewcolor').val('617A80');
	}
	$('#previewcolor').css('background-color','#'+$('#previewcolor').val());
	jsonParse();
	if (localStorage['jobject'] != undefined) {
		jobject = verify_jobject_format(JSON.parse(localStorage["jobject"]));
	}

	$('.templateButton').click(function(){
		var template = $(this).attr('template');

		localStorage.setItem('jtemplate',template);
		$('#command').val(templates[localStorage.getItem('jtemplate')]['command']);

		refreshOutput();
	});

	$('#command').val(localStorage.getItem('jcommand'));

	$('#command').change(function(){refreshOutput()});

	$('#import').click(function() {
		if (confirm("Would you like to import an \"exported\" command? Press Ok if you made the string by using the export option")) {
			var inpt = prompt(getLanguageString('settings.importtext.exported',localStorage.getItem('langCode'),false,false));
			inpt = JSON.parse(inpt)
			jobject = inpt['jobject'];
			if (inpt['jtemplate']) {
				localStorage.setItem('jtemplate',inpt['jtemplate'])
			}
			$('#command').val(inpt['command']);
			refreshOutput();
		} else {
			var inpt = prompt(getLanguageString('settings.importtext.default',localStorage.getItem('langCode'),false,false));
			$('#command').val(inpt.substring(0,inpt.indexOf("{")-1));
			jobject = JSON.parse(inpt.substring(inpt.indexOf("{")));
			refreshOutput();
		}
	});
	$('#export').click(function(){
		$('#exporter').remove();
		$('.alerts').append('<div id="exporter" class="alert alert-info"><h4 lang="export.heading"></h4><p>' + JSON.stringify({"command":$('#command').val(),"jobject":jobject,"jtemplate":localStorage.getItem('jtemplate')}) + '</p><p><button type="button" onclick="closeExport()" class="btn btn-default" lang="export.close"></button></p></div>');
		goToByScroll('exporter');
		refreshLanguage();
	});
	$('#translate_input').change(function(){
		var val = translationStrings[$('#translate_input').val()];
		var match = val.match(/%./g);
		matchLength = match.length
		var c = getSelected('translate_selector');
		$('.extraTranslationParameterRow').hide();
		$('.extraTranslationParameterRow').val('');
		if (match != null) {
			for (var i = matchLength - 1; i >= 0; i--) {
				if (matchLength > 5) {
					alert('An unexpected error has occured. EID-more than 5 matches');
				}
				for (var i = matchLength - 1; i >= 0; i--) {
					$('#parameter'+i+'row').show();
				};
			};
		}
	});
	refreshLanguage();
	refreshOutput();
	$('.fmtExtra').on('click', function(){
		extraTextFormat = $(this).attr('tellrawType');
		$('.fmtExtra').removeClass('active');
		$(this).addClass('active');
		refreshOutput();
	});

	$('#addExtraButton').on('click',function(){
		$('#snippetsWell').hide();
		$('#addExtraModalData').show();
		goToByScroll('addExtraModalData');
	});
	$('#loading-container').hide();
	$('#tellraw-container').fadeIn();
	$( "#translate_input" ).autocomplete({
		source: Object.keys(translationStrings)
	});
	$( "#translate_input_edit" ).autocomplete({
		source: Object.keys(translationStrings)
	});
	$('#savesToggleButton').on('click',function(){
		if ($('#savesManagerWell').is(':hidden')) {
			$('#savesToggleButton').attr('lang','saves.hide');
			$('#savesManagerWell').slideDown();
		} else {
			$('#savesToggleButton').attr('lang','saves.show');
			$('#savesManagerWell').slideUp();
		}
		refreshLanguage();
	});
	$('#lang_request').on('click',function(){
		$('html').html('<a href="#" onclick="location.reload()">Go Back</a><br><br><br>');
		$('html').append(errorString);
	});
	$('#toggleSettings').click(function(){
		$('#settingsWell').toggle();
		//if (!$('#settingsWell').is(":hidden")) {
		//	goToByScroll("settingsWell");
		//}
	});
	$('#helptoggle').click(function(){
		$('.help-box').toggle();
	});
}
$( document ).ready(function(){
	data = getURL('resources.json');
	if (typeof data == 'string') {
		data = JSON.parse(data);
	}
	translationStrings = data['minecraft_language_strings']['en_us'];
	webLangRelations = data['web_language_relations'];
	//lang = data['web_language_strings'];
	for (var i = 0; i < data['web_language_urls'].length; i++) {
		lang[data['web_language_urls'][i]] = getURL('lang/' + data['web_language_urls'][i] + '.json');
		if (typeof lang[data['web_language_urls'][i]] == 'string') {
			lang[data['web_language_urls'][i]] = JSON.parse(lang[data['web_language_urls'][i]]);
		}
	}
	delete lang.status;
	setTimeout(initialize,500);
});