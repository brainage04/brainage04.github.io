import type { ModSide } from './projects';

/** A reviewed side: where the mod must be installed, or null for repositories nobody installs in a game. */
export type ReviewedSide = { side: ModSide | null; source: string };

/**
 * Where each Minecraft mod must be installed, reviewed by hand from the repository's documented installation
 * requirements (README, docs/). A side here means "must be installed there": a server mod that vanilla clients can join
 * is server-side even when its metadata lets it load on clients too (Fabric's `environment: "*"` only says it can).
 * These take precedence over the side detected from metadata files, which is only the fallback for a mod missing here;
 * a test fails when a mod has neither. `source` quotes the evidence; "Judged from the code" marks a README that says
 * nothing about installation, for review.
 */
export const projectSides: Record<string, ReviewedSide> = {
  AcceleratedDamage: {
    side: 'server',
    source: 'README: "install it on the server only, and vanilla clients can connect"',
  },
  ActionAssist: { side: 'client', source: 'README: "Do not install the mod on a dedicated server"' },
  BetterVillagerTrades: {
    side: 'server',
    source: 'README: "Vanilla clients can join. Installing the matching mod on a client is optional"',
  },
  BrainageHUD: { side: 'client', source: 'README: "a client-side Fabric and NeoForge mod"' },
  BrainageLib: {
    side: 'server',
    source: 'README: "a server-side Fabric and NeoForge library … Vanilla clients do not install it"',
  },
  BrainageMinigames: { side: 'server', source: 'README (private repo): "Clients do not need to install the mod"' },
  BrainageServerUtils: { side: 'server', source: 'README: "Clients do not need to install the mod"' },
  DebugHudBackport: { side: 'client', source: 'README (private repo): "A client-only Fabric mod"' },
  DimensionStructureVariants: {
    side: 'server',
    source: 'README: "vanilla clients can join without installing the mod or a resource pack"',
  },
  FabricModdingConventions: { side: null, source: 'README: Gradle plugins and test helpers, not installed in a game' },
  FloodedEnd: { side: 'server', source: 'README: "Nothing is required on the client"' },
  FortniteInMinecraft: {
    side: 'both',
    source: 'Judged from the code: registers items (ModItems) and renders build previews on the client',
  },
  GenshinInMinecraft: {
    side: 'both',
    source: 'Owner: server-and-client (README is silent; it adds GeckoLib-rendered content and client rendering)',
  },
  HudRendererLib: {
    side: 'client',
    source: 'README: "a library for rendering Heads-Up Display (HUD) elements"; client-only initialisation',
  },
  IceSkates: { side: 'both', source: 'README: "Install the matching loader variant on both the client and server"' },
  LegacyMinecraftModTemplate: { side: null, source: 'README: a mod template, not installed in a game' },
  MagicCarpet: { side: 'both', source: 'README: "Install it on both the client and server"' },
  ModernMinecraftModTemplate: { side: null, source: 'README: a mod template, not installed in a game' },
  ProceduralDungeon: {
    side: 'server',
    source: 'README: "server-side only … players can join with an unmodded vanilla client"',
  },
  SimpleHomes: { side: 'server', source: 'README: "Vanilla clients can join without installing the mod"' },
  SimpleTPA: { side: 'server', source: 'README: "Vanilla clients can join without installing the mod"' },
  SimpleTwitchChat: { side: 'client', source: 'README: "it is client-only on both loaders"' },
  SpawnCommands: { side: 'server', source: 'README: "Vanilla clients can join without installing the mod"' },
  SparringBots: { side: 'server', source: 'README (private repo): "Clients do not need the mod"' },
  Telekinesis: { side: 'server', source: 'README: "Vanilla clients can join without installing the mod"' },
  TextureAtlasGenerator: { side: 'client', source: 'README: "A client-side Fabric and NeoForge mod"' },
  ToggleSprint: { side: 'client', source: 'README: "a client-side Forge mod for Minecraft 1.8.9"' },
  TwitchPlaysMinecraft: { side: 'client', source: 'README (private repo): "a client-side Minecraft 26.2 mod"' },
  VeinMiner: { side: 'server', source: 'README: "Vanilla clients can join without installing the mod"' },
};
