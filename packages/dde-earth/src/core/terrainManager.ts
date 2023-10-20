import { CesiumTerrainProvider, EllipsoidTerrainProvider } from 'cesium';

import type { Earth } from './earth';

export class TerrainManager {
  private _data: any;
  private _loaders: Record<string, TerrainManager.Loader> = {
    cesium: (data) => new CesiumTerrainProvider(data),
    custom: (data) => CesiumTerrainProvider.fromIonAssetId(1, data),
  };

  get terrain() {
    return this.earth.viewer.scene.terrainProvider;
  }

  get loaders() {
    return this._loaders;
  }

  get data() {
    return this._data;
  }

  constructor(
    readonly earth: Earth,
    options: TerrainManager.Options = {},
  ) {
    const { terrain } = options;
    this.setTerrain(terrain);
  }

  addLoader(loaders: Record<string, TerrainManager.Loader>) {
    this._loaders = {
      ...this.loaders,
      ...loaders,
    };
  }

  removeLoader(method: string | string[]) {
    const methods = Array.isArray(method) ? method : [method];
    methods.forEach((item) => {
      if (this._loaders[item]) {
        delete this._loaders[item];
      }
    });
  }

  getLoaderByMethod(method: string) {
    return this._loaders[method];
  }

  async setTerrain<
    Method extends TerrainManager.LoaderMethods = TerrainManager.LoaderMethods,
  >(
    data?: TerrainManager.LoaderTypes[Method]['data'],
  ): Promise<
    | Awaited<TerrainManager.LoaderTypes[Method]['instance']>
    | EllipsoidTerrainProvider
    | undefined
  > {
    let provider = new EllipsoidTerrainProvider({});

    if (!data) {
      this._data = undefined;
    } else {
      const { type } = data as any;

      const loader = this.getLoaderByMethod(type);
      if (!loader) {
        throw new Error(
          `Terrain loader with type "${type}" not found, please add loader`,
        );
      }
      provider = await loader(data);
    }

    if (provider) {
      this._data = data;
      this.earth.viewer.scene.terrainProvider = provider;
    }

    this.earth.emit('terrain:change', data);

    return provider;
  }
}

export namespace TerrainManager {
  export interface Options<T extends LoaderMethods = LoaderMethods> {
    terrain?: [T] extends [never] ? undefined : LoaderTypes[T]['data'];
  }

  type DataWithMethod<T extends string, U extends Record<string, any>> = {
    type: T;
  } & U;

  export type Loader<T = any, Instance = any> = (
    data: T,
  ) => Instance | Promise<Instance>;

  type ExtractLoaderTypes<T extends Loaders> = {
    [K in keyof T]: {
      data: T[K] extends Loader<infer U, any> ? U : never;
      instance: T[K] extends Loader<any, infer V> ? V : any;
    };
  };

  export interface Loaders {
    cesium: (
      data: DataWithMethod<'cesium', CesiumTerrainProvider.ConstructorOptions>,
    ) => CesiumTerrainProvider;
    custom: (
      data: DataWithMethod<'custom', CesiumTerrainProvider.ConstructorOptions>,
    ) => Promise<CesiumTerrainProvider>;
  }

  export type LoaderTypes = ExtractLoaderTypes<Loaders>;

  export type LoaderMethods = keyof LoaderTypes;
}
