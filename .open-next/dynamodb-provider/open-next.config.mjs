import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));

// node_modules/@opennextjs/aws/dist/utils/error.js
var IgnorableError = class extends Error {
  __openNextInternal = true;
  canIgnore = true;
  logLevel = 0;
  constructor(message) {
    super(message);
    this.name = "IgnorableError";
  }
};
var RecoverableError = class extends Error {
  __openNextInternal = true;
  canIgnore = true;
  logLevel = 1;
  constructor(message) {
    super(message);
    this.name = "RecoverableError";
  }
};

// node_modules/@opennextjs/cloudflare/dist/api/cloudflare-context.js
var cloudflareContextSymbol = Symbol.for("__cloudflare-context__");
function getCloudflareContext() {
  const global = globalThis;
  const cloudflareContext = global[cloudflareContextSymbol];
  if (!cloudflareContext) {
    if (global.__NEXT_DATA__?.nextExport === true) {
      throw new Error(`

ERROR: \`getCloudflareContext\` has been called in a static route that is not allowed, please either avoid calling \`getCloudflareContext\` in the route or make the route non static (for example by exporting the \`dynamic\` route segment config set to \`'force-dynamic'\`.
`);
    }
    throw new Error(`

ERROR: \`getCloudflareContext\` has been called without having called \`initOpenNextCloudflareForDev\` from the Next.js config file.
You should update your Next.js config file as shown below:

   \`\`\`
   // next.config.mjs

   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

   initOpenNextCloudflareForDev();

   const nextConfig = { ... };
   export default nextConfig;
   \`\`\`

`);
  }
  return cloudflareContext;
}

// node_modules/@opennextjs/cloudflare/dist/api/kv-cache.js
var CACHE_ASSET_DIR = "cdn-cgi/_next_cache";
var STATUS_DELETED = 1;
var Cache = class {
  name = "cloudflare-kv";
  async get(key, isFetch) {
    const cfEnv = getCloudflareContext().env;
    const kv = cfEnv.NEXT_CACHE_WORKERS_KV;
    const assets = cfEnv.ASSETS;
    if (!(kv || assets)) {
      throw new IgnorableError(`No KVNamespace nor Fetcher`);
    }
    this.debug(`Get ${key}`);
    try {
      let entry = null;
      if (kv) {
        this.debug(`- From KV`);
        const kvKey = this.getKVKey(key, isFetch);
        entry = await kv.get(kvKey, "json");
        if (entry?.status === STATUS_DELETED) {
          return null;
        }
      }
      if (!entry && assets) {
        this.debug(`- From Assets`);
        const url = this.getAssetUrl(key, isFetch);
        const response = await assets.fetch(url);
        if (response.ok) {
          entry = {
            value: await response.json(),
            // __BUILD_TIMESTAMP_MS__ is injected by ESBuild.
            lastModified: globalThis.__BUILD_TIMESTAMP_MS__
          };
        }
        if (!kv) {
          if (entry?.value && "kind" in entry.value && entry.value.kind === "FETCH" && entry.value.data?.headers?.expires) {
            const expiresTime = new Date(entry.value.data.headers.expires).getTime();
            if (!isNaN(expiresTime) && expiresTime <= Date.now()) {
              this.debug(`found expired entry (expire time: ${entry.value.data.headers.expires})`);
              return null;
            }
          }
        }
      }
      this.debug(entry ? `-> hit` : `-> miss`);
      return { value: entry?.value, lastModified: entry?.lastModified };
    } catch {
      throw new RecoverableError(`Failed to get cache [${key}]`);
    }
  }
  async set(key, value, isFetch) {
    const kv = getCloudflareContext().env.NEXT_CACHE_WORKERS_KV;
    if (!kv) {
      throw new IgnorableError(`No KVNamespace`);
    }
    this.debug(`Set ${key}`);
    try {
      const kvKey = this.getKVKey(key, isFetch);
      await kv.put(kvKey, JSON.stringify({
        value,
        // Note: `Date.now()` returns the time of the last IO rather than the actual time.
        //       See https://developers.cloudflare.com/workers/reference/security-model/
        lastModified: Date.now()
      }));
    } catch {
      throw new RecoverableError(`Failed to set cache [${key}]`);
    }
  }
  async delete(key) {
    const kv = getCloudflareContext().env.NEXT_CACHE_WORKERS_KV;
    if (!kv) {
      throw new IgnorableError(`No KVNamespace`);
    }
    this.debug(`Delete ${key}`);
    try {
      const kvKey = this.getKVKey(
        key,
        /* isFetch= */
        false
      );
      await kv.put(kvKey, JSON.stringify({ status: STATUS_DELETED }));
    } catch {
      throw new RecoverableError(`Failed to delete cache [${key}]`);
    }
  }
  getKVKey(key, isFetch) {
    return `${this.getBuildId()}/${key}.${isFetch ? "fetch" : "cache"}`;
  }
  getAssetUrl(key, isFetch) {
    return isFetch ? `http://assets.local/${CACHE_ASSET_DIR}/__fetch/${this.getBuildId()}/${key}` : `http://assets.local/${CACHE_ASSET_DIR}/${this.getBuildId()}/${key}.cache`;
  }
  debug(...args) {
    if (process.env.NEXT_PRIVATE_DEBUG_CACHE) {
      console.log(`[Cache ${this.name}] `, ...args);
    }
  }
  getBuildId() {
    return process.env.NEXT_BUILD_ID ?? "no-build-id";
  }
};
var kv_cache_default = new Cache();

// open-next.config.ts
var config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: async () => kv_cache_default,
      tagCache: "dummy",
      queue: "dummy"
    }
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch"
    }
  },
  dangerous: {
    enableCacheInterception: false
  }
};
var open_next_config_default = config;
export {
  open_next_config_default as default
};
