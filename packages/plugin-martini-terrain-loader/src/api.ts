import type { MartiniTerrainLoader } from ".";

declare module "dde-earth" {
  namespace TerrainManager {
    interface Loaders extends MartiniTerrainLoader.Loaders {}
  }
}
