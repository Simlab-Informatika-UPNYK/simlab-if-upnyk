
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.4.2";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseCookies(cookies) {
  if (!cookies) {
    return [];
  }
  return typeof cookies === "string" ? cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim()) : cookies;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    init_util();
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = {};
        for (const [key, value] of searchParams.entries()) {
          if (key in query) {
            if (Array.isArray(query[key])) {
              query[key].push(value);
            } else {
              query[key] = [query[key], value];
            }
          } else {
            query[key] = value;
          }
        }
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookies = Object.fromEntries(parseCookies(event.headers.get("cookie")).map((cookie) => cookie.split("=")));
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          let url = result.internalEvent.url;
          if (!result.isExternalRewrite) {
            if (result.origin) {
              url = `${result.origin.protocol}://${result.origin.host}${result.origin.port ? `:${result.origin.port}` : ""}${url}`;
            } else {
              url = `https://${result.internalEvent.headers.host}${url}`;
            }
          }
          const request = new Request(url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          headers.set(key, Array.isArray(value) ? value.join(",") : value);
        }
        return new Response(result.body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      globalThis.openNextWaitUntil = ctx.waitUntil.bind(ctx);
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent);
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n)
          return n.exports;
        var a = r[o] = { exports: {} }, f = true;
        try {
          e[o].call(a.exports, a, a.exports, t), f = false;
        } finally {
          f && delete r[o];
        }
        return a.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, a) => {
          if (o) {
            a = a || 0;
            for (var f = e2.length; f > 0 && e2[f - 1][2] > a; f--)
              e2[f] = e2[f - 1];
            e2[f] = [o, n, a];
            return;
          }
          for (var l = 1 / 0, f = 0; f < e2.length; f++) {
            for (var [o, n, a] = e2[f], i = true, u = 0; u < o.length; u++)
              (false & a || l >= a) && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (i = false, a < l && (l = a));
            if (i) {
              e2.splice(f--, 1);
              var c = n();
              void 0 !== c && (r2 = c);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, (() => {
        var e2, r2 = Object.getPrototypeOf ? (e3) => Object.getPrototypeOf(e3) : (e3) => e3.__proto__;
        t.t = function(o, n) {
          if (1 & n && (o = this(o)), 8 & n || "object" == typeof o && o && (4 & n && o.__esModule || 16 & n && "function" == typeof o.then))
            return o;
          var a = /* @__PURE__ */ Object.create(null);
          t.r(a);
          var f = {};
          e2 = e2 || [null, r2({}), r2([]), r2(r2)];
          for (var l = 2 & n && o; "object" == typeof l && !~e2.indexOf(l); l = r2(l))
            Object.getOwnPropertyNames(l).forEach((e3) => f[e3] = () => o[e3]);
          return f.default = () => o, t.d(a, f), a;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2)
          t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis)
          return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window)
            return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, a, [f, l, i] = o2, u = 0;
          if (f.some((r4) => 0 !== e2[r4])) {
            for (n in l)
              t.o(l, n) && (t.m[n] = l[n]);
            if (i)
              var c = i(t);
          }
          for (r3 && r3(o2); u < f.length; u++)
            a = f[u], t.o(e2, a) && e2[a] && e2[a][0](), e2[a] = 0;
          return t.O(c);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 608: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { Headers: () => a, Request: () => o, Response: () => l, default: () => n, fetch: () => s });
      var i = function() {
        if ("undefined" != typeof self)
          return self;
        if ("undefined" != typeof window)
          return window;
        if (void 0 !== r.g)
          return r.g;
        throw Error("unable to locate global object");
      }();
      let s = i.fetch, n = i.fetch.bind(i), a = i.Headers, o = i.Request, l = i.Response;
    }, 976: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true });
      let s = i(r(608)), n = i(r(711));
      class a {
        constructor(e2) {
          this.shouldThrowOnError = false, this.method = e2.method, this.url = e2.url, this.headers = e2.headers, this.schema = e2.schema, this.body = e2.body, this.shouldThrowOnError = e2.shouldThrowOnError, this.signal = e2.signal, this.isMaybeSingle = e2.isMaybeSingle, e2.fetch ? this.fetch = e2.fetch : "undefined" == typeof fetch ? this.fetch = s.default : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e2, t2) {
          return this.headers = Object.assign({}, this.headers), this.headers[e2] = t2, this;
        }
        then(e2, t2) {
          void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema), "GET" !== this.method && "HEAD" !== this.method && (this.headers["Content-Type"] = "application/json");
          let r2 = (0, this.fetch)(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (e3) => {
            var t3, r3, i2;
            let s2 = null, a2 = null, o = null, l = e3.status, u = e3.statusText;
            if (e3.ok) {
              if ("HEAD" !== this.method) {
                let t4 = await e3.text();
                "" === t4 || (a2 = "text/csv" === this.headers.Accept ? t4 : this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? t4 : JSON.parse(t4));
              }
              let i3 = null === (t3 = this.headers.Prefer) || void 0 === t3 ? void 0 : t3.match(/count=(exact|planned|estimated)/), n2 = null === (r3 = e3.headers.get("content-range")) || void 0 === r3 ? void 0 : r3.split("/");
              i3 && n2 && n2.length > 1 && (o = parseInt(n2[1])), this.isMaybeSingle && "GET" === this.method && Array.isArray(a2) && (a2.length > 1 ? (s2 = { code: "PGRST116", details: `Results contain ${a2.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, a2 = null, o = null, l = 406, u = "Not Acceptable") : a2 = 1 === a2.length ? a2[0] : null);
            } else {
              let t4 = await e3.text();
              try {
                s2 = JSON.parse(t4), Array.isArray(s2) && 404 === e3.status && (a2 = [], s2 = null, l = 200, u = "OK");
              } catch (r4) {
                404 === e3.status && "" === t4 ? (l = 204, u = "No Content") : s2 = { message: t4 };
              }
              if (s2 && this.isMaybeSingle && (null === (i2 = null == s2 ? void 0 : s2.details) || void 0 === i2 ? void 0 : i2.includes("0 rows")) && (s2 = null, l = 200, u = "OK"), s2 && this.shouldThrowOnError)
                throw new n.default(s2);
            }
            return { error: s2, data: a2, count: o, status: l, statusText: u };
          });
          return this.shouldThrowOnError || (r2 = r2.catch((e3) => {
            var t3, r3, i2;
            return { error: { message: `${null !== (t3 = null == e3 ? void 0 : e3.name) && void 0 !== t3 ? t3 : "FetchError"}: ${null == e3 ? void 0 : e3.message}`, details: `${null !== (r3 = null == e3 ? void 0 : e3.stack) && void 0 !== r3 ? r3 : ""}`, hint: "", code: `${null !== (i2 = null == e3 ? void 0 : e3.code) && void 0 !== i2 ? i2 : ""}` }, data: null, count: null, status: 0, statusText: "" };
          })), r2.then(e2, t2);
        }
      }
      t.default = a;
    }, 640: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true });
      let s = i(r(580)), n = i(r(910)), a = r(873);
      class o {
        constructor(e2, { headers: t2 = {}, schema: r2, fetch: i2 } = {}) {
          this.url = e2, this.headers = Object.assign(Object.assign({}, a.DEFAULT_HEADERS), t2), this.schemaName = r2, this.fetch = i2;
        }
        from(e2) {
          let t2 = new URL(`${this.url}/${e2}`);
          return new s.default(t2, { headers: Object.assign({}, this.headers), schema: this.schemaName, fetch: this.fetch });
        }
        schema(e2) {
          return new o(this.url, { headers: this.headers, schema: e2, fetch: this.fetch });
        }
        rpc(e2, t2 = {}, { head: r2 = false, get: i2 = false, count: s2 } = {}) {
          let a2, o2;
          let l = new URL(`${this.url}/rpc/${e2}`);
          r2 || i2 ? (a2 = r2 ? "HEAD" : "GET", Object.entries(t2).filter(([e3, t3]) => void 0 !== t3).map(([e3, t3]) => [e3, Array.isArray(t3) ? `{${t3.join(",")}}` : `${t3}`]).forEach(([e3, t3]) => {
            l.searchParams.append(e3, t3);
          })) : (a2 = "POST", o2 = t2);
          let u = Object.assign({}, this.headers);
          return s2 && (u.Prefer = `count=${s2}`), new n.default({ method: a2, url: l, headers: u, schema: this.schemaName, body: o2, fetch: this.fetch, allowEmpty: false });
        }
      }
      t.default = o;
    }, 711: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      class r extends Error {
        constructor(e2) {
          super(e2.message), this.name = "PostgrestError", this.details = e2.details, this.hint = e2.hint, this.code = e2.code;
        }
      }
      t.default = r;
    }, 910: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true });
      let s = i(r(460));
      class n extends s.default {
        eq(e2, t2) {
          return this.url.searchParams.append(e2, `eq.${t2}`), this;
        }
        neq(e2, t2) {
          return this.url.searchParams.append(e2, `neq.${t2}`), this;
        }
        gt(e2, t2) {
          return this.url.searchParams.append(e2, `gt.${t2}`), this;
        }
        gte(e2, t2) {
          return this.url.searchParams.append(e2, `gte.${t2}`), this;
        }
        lt(e2, t2) {
          return this.url.searchParams.append(e2, `lt.${t2}`), this;
        }
        lte(e2, t2) {
          return this.url.searchParams.append(e2, `lte.${t2}`), this;
        }
        like(e2, t2) {
          return this.url.searchParams.append(e2, `like.${t2}`), this;
        }
        likeAllOf(e2, t2) {
          return this.url.searchParams.append(e2, `like(all).{${t2.join(",")}}`), this;
        }
        likeAnyOf(e2, t2) {
          return this.url.searchParams.append(e2, `like(any).{${t2.join(",")}}`), this;
        }
        ilike(e2, t2) {
          return this.url.searchParams.append(e2, `ilike.${t2}`), this;
        }
        ilikeAllOf(e2, t2) {
          return this.url.searchParams.append(e2, `ilike(all).{${t2.join(",")}}`), this;
        }
        ilikeAnyOf(e2, t2) {
          return this.url.searchParams.append(e2, `ilike(any).{${t2.join(",")}}`), this;
        }
        is(e2, t2) {
          return this.url.searchParams.append(e2, `is.${t2}`), this;
        }
        in(e2, t2) {
          let r2 = Array.from(new Set(t2)).map((e3) => "string" == typeof e3 && RegExp("[,()]").test(e3) ? `"${e3}"` : `${e3}`).join(",");
          return this.url.searchParams.append(e2, `in.(${r2})`), this;
        }
        contains(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `cs.${t2}`) : Array.isArray(t2) ? this.url.searchParams.append(e2, `cs.{${t2.join(",")}}`) : this.url.searchParams.append(e2, `cs.${JSON.stringify(t2)}`), this;
        }
        containedBy(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `cd.${t2}`) : Array.isArray(t2) ? this.url.searchParams.append(e2, `cd.{${t2.join(",")}}`) : this.url.searchParams.append(e2, `cd.${JSON.stringify(t2)}`), this;
        }
        rangeGt(e2, t2) {
          return this.url.searchParams.append(e2, `sr.${t2}`), this;
        }
        rangeGte(e2, t2) {
          return this.url.searchParams.append(e2, `nxl.${t2}`), this;
        }
        rangeLt(e2, t2) {
          return this.url.searchParams.append(e2, `sl.${t2}`), this;
        }
        rangeLte(e2, t2) {
          return this.url.searchParams.append(e2, `nxr.${t2}`), this;
        }
        rangeAdjacent(e2, t2) {
          return this.url.searchParams.append(e2, `adj.${t2}`), this;
        }
        overlaps(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `ov.${t2}`) : this.url.searchParams.append(e2, `ov.{${t2.join(",")}}`), this;
        }
        textSearch(e2, t2, { config: r2, type: i2 } = {}) {
          let s2 = "";
          "plain" === i2 ? s2 = "pl" : "phrase" === i2 ? s2 = "ph" : "websearch" === i2 && (s2 = "w");
          let n2 = void 0 === r2 ? "" : `(${r2})`;
          return this.url.searchParams.append(e2, `${s2}fts${n2}.${t2}`), this;
        }
        match(e2) {
          return Object.entries(e2).forEach(([e3, t2]) => {
            this.url.searchParams.append(e3, `eq.${t2}`);
          }), this;
        }
        not(e2, t2, r2) {
          return this.url.searchParams.append(e2, `not.${t2}.${r2}`), this;
        }
        or(e2, { foreignTable: t2, referencedTable: r2 = t2 } = {}) {
          let i2 = r2 ? `${r2}.or` : "or";
          return this.url.searchParams.append(i2, `(${e2})`), this;
        }
        filter(e2, t2, r2) {
          return this.url.searchParams.append(e2, `${t2}.${r2}`), this;
        }
      }
      t.default = n;
    }, 580: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true });
      let s = i(r(910));
      class n {
        constructor(e2, { headers: t2 = {}, schema: r2, fetch: i2 }) {
          this.url = e2, this.headers = t2, this.schema = r2, this.fetch = i2;
        }
        select(e2, { head: t2 = false, count: r2 } = {}) {
          let i2 = false, n2 = (null != e2 ? e2 : "*").split("").map((e3) => /\s/.test(e3) && !i2 ? "" : ('"' === e3 && (i2 = !i2), e3)).join("");
          return this.url.searchParams.set("select", n2), r2 && (this.headers.Prefer = `count=${r2}`), new s.default({ method: t2 ? "HEAD" : "GET", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch, allowEmpty: false });
        }
        insert(e2, { count: t2, defaultToNull: r2 = true } = {}) {
          let i2 = [];
          if (this.headers.Prefer && i2.push(this.headers.Prefer), t2 && i2.push(`count=${t2}`), r2 || i2.push("missing=default"), this.headers.Prefer = i2.join(","), Array.isArray(e2)) {
            let t3 = e2.reduce((e3, t4) => e3.concat(Object.keys(t4)), []);
            if (t3.length > 0) {
              let e3 = [...new Set(t3)].map((e4) => `"${e4}"`);
              this.url.searchParams.set("columns", e3.join(","));
            }
          }
          return new s.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: this.fetch, allowEmpty: false });
        }
        upsert(e2, { onConflict: t2, ignoreDuplicates: r2 = false, count: i2, defaultToNull: n2 = true } = {}) {
          let a = [`resolution=${r2 ? "ignore" : "merge"}-duplicates`];
          if (void 0 !== t2 && this.url.searchParams.set("on_conflict", t2), this.headers.Prefer && a.push(this.headers.Prefer), i2 && a.push(`count=${i2}`), n2 || a.push("missing=default"), this.headers.Prefer = a.join(","), Array.isArray(e2)) {
            let t3 = e2.reduce((e3, t4) => e3.concat(Object.keys(t4)), []);
            if (t3.length > 0) {
              let e3 = [...new Set(t3)].map((e4) => `"${e4}"`);
              this.url.searchParams.set("columns", e3.join(","));
            }
          }
          return new s.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: this.fetch, allowEmpty: false });
        }
        update(e2, { count: t2 } = {}) {
          let r2 = [];
          return this.headers.Prefer && r2.push(this.headers.Prefer), t2 && r2.push(`count=${t2}`), this.headers.Prefer = r2.join(","), new s.default({ method: "PATCH", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: this.fetch, allowEmpty: false });
        }
        delete({ count: e2 } = {}) {
          let t2 = [];
          return e2 && t2.push(`count=${e2}`), this.headers.Prefer && t2.unshift(this.headers.Prefer), this.headers.Prefer = t2.join(","), new s.default({ method: "DELETE", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch, allowEmpty: false });
        }
      }
      t.default = n;
    }, 460: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true });
      let s = i(r(976));
      class n extends s.default {
        select(e2) {
          let t2 = false, r2 = (null != e2 ? e2 : "*").split("").map((e3) => /\s/.test(e3) && !t2 ? "" : ('"' === e3 && (t2 = !t2), e3)).join("");
          return this.url.searchParams.set("select", r2), this.headers.Prefer && (this.headers.Prefer += ","), this.headers.Prefer += "return=representation", this;
        }
        order(e2, { ascending: t2 = true, nullsFirst: r2, foreignTable: i2, referencedTable: s2 = i2 } = {}) {
          let n2 = s2 ? `${s2}.order` : "order", a = this.url.searchParams.get(n2);
          return this.url.searchParams.set(n2, `${a ? `${a},` : ""}${e2}.${t2 ? "asc" : "desc"}${void 0 === r2 ? "" : r2 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e2, { foreignTable: t2, referencedTable: r2 = t2 } = {}) {
          let i2 = void 0 === r2 ? "limit" : `${r2}.limit`;
          return this.url.searchParams.set(i2, `${e2}`), this;
        }
        range(e2, t2, { foreignTable: r2, referencedTable: i2 = r2 } = {}) {
          let s2 = void 0 === i2 ? "offset" : `${i2}.offset`, n2 = void 0 === i2 ? "limit" : `${i2}.limit`;
          return this.url.searchParams.set(s2, `${e2}`), this.url.searchParams.set(n2, `${t2 - e2 + 1}`), this;
        }
        abortSignal(e2) {
          return this.signal = e2, this;
        }
        single() {
          return this.headers.Accept = "application/vnd.pgrst.object+json", this;
        }
        maybeSingle() {
          return "GET" === this.method ? this.headers.Accept = "application/json" : this.headers.Accept = "application/vnd.pgrst.object+json", this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.Accept = "text/csv", this;
        }
        geojson() {
          return this.headers.Accept = "application/geo+json", this;
        }
        explain({ analyze: e2 = false, verbose: t2 = false, settings: r2 = false, buffers: i2 = false, wal: s2 = false, format: n2 = "text" } = {}) {
          var a;
          let o = [e2 ? "analyze" : null, t2 ? "verbose" : null, r2 ? "settings" : null, i2 ? "buffers" : null, s2 ? "wal" : null].filter(Boolean).join("|"), l = null !== (a = this.headers.Accept) && void 0 !== a ? a : "application/json";
          return this.headers.Accept = `application/vnd.pgrst.plan+${n2}; for="${l}"; options=${o};`, this;
        }
        rollback() {
          var e2;
          return (null !== (e2 = this.headers.Prefer) && void 0 !== e2 ? e2 : "").trim().length > 0 ? this.headers.Prefer += ",tx=rollback" : this.headers.Prefer = "tx=rollback", this;
        }
        returns() {
          return this;
        }
      }
      t.default = n;
    }, 873: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.DEFAULT_HEADERS = void 0;
      let i = r(346);
      t.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${i.version}` };
    }, 174: function(e, t, r) {
      "use strict";
      var i = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.PostgrestError = t.PostgrestBuilder = t.PostgrestTransformBuilder = t.PostgrestFilterBuilder = t.PostgrestQueryBuilder = t.PostgrestClient = void 0;
      let s = i(r(640));
      t.PostgrestClient = s.default;
      let n = i(r(580));
      t.PostgrestQueryBuilder = n.default;
      let a = i(r(910));
      t.PostgrestFilterBuilder = a.default;
      let o = i(r(460));
      t.PostgrestTransformBuilder = o.default;
      let l = i(r(976));
      t.PostgrestBuilder = l.default;
      let u = i(r(711));
      t.PostgrestError = u.default, t.default = { PostgrestClient: s.default, PostgrestQueryBuilder: n.default, PostgrestFilterBuilder: a.default, PostgrestTransformBuilder: o.default, PostgrestBuilder: l.default, PostgrestError: u.default };
    }, 346: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.version = void 0, t.version = "0.0.0-automated";
    }, 896: (e, t) => {
      "use strict";
      t.q = function(e2, t2) {
        if ("string" != typeof e2)
          throw TypeError("argument str must be a string");
        var r2 = {}, s2 = e2.length;
        if (s2 < 2)
          return r2;
        var n2 = t2 && t2.decode || c, a2 = 0, o2 = 0, h = 0;
        do {
          if (-1 === (o2 = e2.indexOf("=", a2)))
            break;
          if (-1 === (h = e2.indexOf(";", a2)))
            h = s2;
          else if (o2 > h) {
            a2 = e2.lastIndexOf(";", o2 - 1) + 1;
            continue;
          }
          var d = l(e2, a2, o2), p = u(e2, o2, d), f = e2.slice(d, p);
          if (!i.call(r2, f)) {
            var g = l(e2, o2 + 1, h), v = u(e2, h, g);
            34 === e2.charCodeAt(g) && 34 === e2.charCodeAt(v - 1) && (g++, v--);
            var m = e2.slice(g, v);
            r2[f] = function(e3, t3) {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            }(m, n2);
          }
          a2 = h + 1;
        } while (a2 < s2);
        return r2;
      }, t.l = function(e2, t2, i2) {
        var l2 = i2 && i2.encode || encodeURIComponent;
        if ("function" != typeof l2)
          throw TypeError("option encode is invalid");
        if (!s.test(e2))
          throw TypeError("argument name is invalid");
        var u2 = l2(t2);
        if (!n.test(u2))
          throw TypeError("argument val is invalid");
        var c2 = e2 + "=" + u2;
        if (!i2)
          return c2;
        if (null != i2.maxAge) {
          var h = Math.floor(i2.maxAge);
          if (!isFinite(h))
            throw TypeError("option maxAge is invalid");
          c2 += "; Max-Age=" + h;
        }
        if (i2.domain) {
          if (!a.test(i2.domain))
            throw TypeError("option domain is invalid");
          c2 += "; Domain=" + i2.domain;
        }
        if (i2.path) {
          if (!o.test(i2.path))
            throw TypeError("option path is invalid");
          c2 += "; Path=" + i2.path;
        }
        if (i2.expires) {
          var d = i2.expires;
          if ("[object Date]" !== r.call(d) || isNaN(d.valueOf()))
            throw TypeError("option expires is invalid");
          c2 += "; Expires=" + d.toUTCString();
        }
        if (i2.httpOnly && (c2 += "; HttpOnly"), i2.secure && (c2 += "; Secure"), i2.partitioned && (c2 += "; Partitioned"), i2.priority)
          switch ("string" == typeof i2.priority ? i2.priority.toLowerCase() : i2.priority) {
            case "low":
              c2 += "; Priority=Low";
              break;
            case "medium":
              c2 += "; Priority=Medium";
              break;
            case "high":
              c2 += "; Priority=High";
              break;
            default:
              throw TypeError("option priority is invalid");
          }
        if (i2.sameSite)
          switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              c2 += "; SameSite=Strict";
              break;
            case "lax":
              c2 += "; SameSite=Lax";
              break;
            case "none":
              c2 += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
        return c2;
      };
      var r = Object.prototype.toString, i = Object.prototype.hasOwnProperty, s = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, n = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e2, t2, r2) {
        do {
          var i2 = e2.charCodeAt(t2);
          if (32 !== i2 && 9 !== i2)
            return t2;
        } while (++t2 < r2);
        return r2;
      }
      function u(e2, t2, r2) {
        for (; t2 > r2; ) {
          var i2 = e2.charCodeAt(--t2);
          if (32 !== i2 && 9 !== i2)
            return t2 + 1;
        }
        return r2;
      }
      function c(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
    }, 555: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, n = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), i2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? i2 : `${i2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2)
            continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [i2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(i2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2)
          return;
        let [[i2, s2], ...n2] = o(e2), { domain: a2, expires: l2, httponly: h2, maxage: d2, path: p, samesite: f, secure: g, partitioned: v, priority: m } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3)
            e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: i2, value: decodeURIComponent(s2), domain: a2, ...l2 && { expires: new Date(l2) }, ...h2 && { httpOnly: true }, ..."string" == typeof d2 && { maxAge: Number(d2) }, path: p, ...f && { sameSite: u.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...m && { priority: c.includes(r2 = (r2 = m).toLowerCase()) ? r2 : void 0 }, ...v && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var i2 in r2)
          t(e2, i2, { get: r2[i2], enumerable: true });
      })(n, { RequestCookies: () => h, ResponseCookies: () => d, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => a }), e.exports = ((e2, n2, a2, o2) => {
        if (n2 && "object" == typeof n2 || "function" == typeof n2)
          for (let l2 of i(n2))
            s.call(e2, l2) || l2 === a2 || t(e2, l2, { get: () => n2[l2], enumerable: !(o2 = r(n2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), n);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], h = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2)
            for (let [e3, r2] of o(t2))
              this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length)
            return r2.map(([e3, t3]) => t3);
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === i2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, i2 = this._parsed;
          return i2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(i2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, d = class {
        constructor(e2) {
          var t2, r2, i2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let s2 = null != (i2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? i2 : [];
          for (let e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4)
              return [];
            var t3, r3, i3, s3, n2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); )
                o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, n2 = false; l2(); )
                if ("," === (r3 = e4.charAt(o2))) {
                  for (i3 = o2, o2 += 1, l2(), s3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; )
                    o2 += 1;
                  o2 < e4.length && "=" === e4.charAt(o2) ? (n2 = true, o2 = s3, a2.push(e4.substring(t3, i3)), t3 = o2) : o2 = i3 + 1;
                } else
                  o2 += 1;
              (!n2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(s2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length)
            return r2;
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === i2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, i2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...i2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 777: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let i2 = r2(223), s2 = r2(172), n2 = r2(930), a = "context", o = new i2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, s2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...i3) {
              return this._getContextManager().with(e3, t4, r3, ...i3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, s2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, s2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let i2 = r2(56), s2 = r2(912), n2 = r2(957), a = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3)
                    return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: n2.DiagLogLevel.INFO }) => {
                var i3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (i3 = e5.stack) && void 0 !== i3 ? i3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, a.getGlobal)("diag"), c = (0, s2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : n2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let i2 = r2(660), s2 = r2(172), n2 = r2(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, s2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, s2.getGlobal)(a) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, s2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let i2 = r2(172), s2 = r2(874), n2 = r2(194), a = r2(277), o = r2(369), l = r2(930), u = "propagation", c = new s2.NoopTextMapPropagator();
          class h {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = n2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = n2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = h;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let i2 = r2(172), s2 = r2(846), n2 = r2(139), a = r2(607), o = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new s2.ProxyTracerProvider(), this.wrapSpanContext = n2.wrapSpanContext, this.isSpanContextValid = n2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, i2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, i2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new s2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let i2 = r2(491), s2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function n2(e3) {
            return e3.getValue(s2) || void 0;
          }
          t3.getBaggage = n2, t3.getActiveBaggage = function() {
            return n2(i2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(s2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(s2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4)
                return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let i2 = new r2(this._entries);
              return i2._entries.set(e3, t4), i2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3)
                t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let i2 = r2(930), s2 = r2(993), n2 = r2(830), a = i2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new s2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: n2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let i2 = r2(491);
          t3.context = i2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let i2 = r2(780);
          class s2 {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...i3) {
              return t4.call(r3, ...i3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = s2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, i2) => {
                let s2 = new r2(t4._currentContext);
                return s2._currentContext.set(e4, i2), s2;
              }, t4.deleteValue = (e4) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let i2 = r2(930);
          t3.diag = i2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let i2 = r2(172);
          class s2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          }
          function n2(e3, t4, r3) {
            let s3 = (0, i2.getGlobal)("diag");
            if (s3)
              return r3.unshift(t4), s3[e3](...r3);
          }
          t3.DiagComponentLogger = s2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class i2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++)
                this[r2[e3].n] = function(e4) {
                  return function(...t4) {
                    if (console) {
                      let r3 = console[e4];
                      if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3)
                        return r3.apply(console, t4);
                    }
                  };
                }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = i2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let i2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, i3) {
              let s2 = t4[r4];
              return "function" == typeof s2 && e3 >= i3 ? s2.bind(t4) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", i2.DiagLogLevel.ERROR), warn: r3("warn", i2.DiagLogLevel.WARN), info: r3("info", i2.DiagLogLevel.INFO), debug: r3("debug", i2.DiagLogLevel.DEBUG), verbose: r3("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let i2 = r2(200), s2 = r2(521), n2 = r2(130), a = s2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), l = i2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, i3 = false) {
            var n3;
            let a2 = l[o] = null !== (n3 = l[o]) && void 0 !== n3 ? n3 : { version: s2.VERSION };
            if (!i3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== s2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${s2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${s2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let i3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (i3 && (0, n2.isCompatible)(i3))
              return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${s2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let i2 = r2(521), s2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function n2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), i3 = e3.match(s2);
            if (!i3)
              return () => false;
            let n3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != n3.prerelease)
              return function(t5) {
                return t5 === e3;
              };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4))
                return true;
              if (r3.has(e4))
                return false;
              let i4 = e4.match(s2);
              if (!i4)
                return a(e4);
              let o = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              return null != o.prerelease || n3.major !== o.major ? a(e4) : 0 === n3.major ? n3.minor === o.minor && n3.patch <= o.patch ? (t4.add(e4), true) : a(e4) : n3.minor <= o.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = n2, t3.isCompatible = n2(i2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let i2 = r2(653);
          t3.metrics = i2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class i2 {
          }
          t3.NoopMetric = i2;
          class s2 extends i2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = s2;
          class n2 extends i2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = n2;
          class a extends i2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends o {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends o {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new s2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new n2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let i2 = r2(102);
          class s2 {
            getMeter(e3, t4, r3) {
              return i2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = s2, t3.NOOP_METER_PROVIDER = new s2();
        }, 200: function(e2, t3, r2) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), e3[i3] = t4[r3];
          }), s2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3)
              "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || i2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), s2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), e3[i3] = t4[r3];
          }), s2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3)
              "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || i2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), s2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let i2 = r2(181);
          t3.propagation = i2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3)
              return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let i2 = r2(997);
          t3.trace = i2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let i2 = r2(476);
          class s2 {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = s2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let i2 = r2(491), s2 = r2(607), n2 = r2(403), a = r2(139), o = i2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root)
                return new n2.NonRecordingSpan();
              let i3 = r3 && (0, s2.getSpanContext)(r3);
              return "object" == typeof i3 && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, a.isSpanContextValid)(i3) ? new n2.NonRecordingSpan(i3) : new n2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, i3) {
              let n3, a2, l2;
              if (arguments.length < 2)
                return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (n3 = t4, l2 = r3) : (n3 = t4, a2 = r3, l2 = i3);
              let u = null != a2 ? a2 : o.active(), c = this.startSpan(e3, n3, u), h = (0, s2.setSpan)(u, c);
              return o.with(h, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let i2 = r2(614);
          class s2 {
            getTracer(e3, t4, r3) {
              return new i2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = s2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let i2 = new (r2(614)).NoopTracer();
          class s2 {
            constructor(e3, t4, r3, i3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = i3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, i3) {
              let s3 = this._getTracer();
              return Reflect.apply(s3.startActiveSpan, s3, arguments);
            }
            _getTracer() {
              if (this._delegate)
                return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          }
          t3.ProxyTracer = s2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let i2 = r2(125), s2 = new (r2(124)).NoopTracerProvider();
          class n2 {
            getTracer(e3, t4, r3) {
              var s3;
              return null !== (s3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== s3 ? s3 : new i2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : s2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var i3;
              return null === (i3 = this._delegate) || void 0 === i3 ? void 0 : i3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = n2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let i2 = r2(780), s2 = r2(403), n2 = r2(491), a = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(n2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new s2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let i2 = r2(564);
          class s2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), s3 = r3.indexOf("=");
                if (-1 !== s3) {
                  let n2 = r3.slice(0, s3), a = r3.slice(s3 + 1, t4.length);
                  (0, i2.validateKey)(n2) && (0, i2.validateValue)(a) && e4.set(n2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new s2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = s2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", i2 = `[a-z]${r2}{0,255}`, s2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, n2 = RegExp(`^(?:${i2}|${s2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return n2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let i2 = r2(325);
          t3.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let i2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let i2 = r2(476), s2 = r2(403), n2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return n2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function l(e3) {
            return a.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new s2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, i = {};
        function s(e2) {
          var r2 = i[e2];
          if (void 0 !== r2)
            return r2.exports;
          var n2 = i[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(n2.exports, n2, n2.exports, s), a = false;
          } finally {
            a && delete i[e2];
          }
          return n2.exports;
        }
        s.ab = "//";
        var n = {};
        (() => {
          Object.defineProperty(n, "__esModule", { value: true }), n.trace = n.propagation = n.metrics = n.diag = n.context = n.INVALID_SPAN_CONTEXT = n.INVALID_TRACEID = n.INVALID_SPANID = n.isValidSpanId = n.isValidTraceId = n.isSpanContextValid = n.createTraceState = n.TraceFlags = n.SpanStatusCode = n.SpanKind = n.SamplingDecision = n.ProxyTracerProvider = n.ProxyTracer = n.defaultTextMapSetter = n.defaultTextMapGetter = n.ValueType = n.createNoopMeter = n.DiagLogLevel = n.DiagConsoleLogger = n.ROOT_CONTEXT = n.createContextKey = n.baggageEntryMetadataFromString = void 0;
          var e2 = s(369);
          Object.defineProperty(n, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = s(780);
          Object.defineProperty(n, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(n, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = s(972);
          Object.defineProperty(n, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var i2 = s(957);
          Object.defineProperty(n, "DiagLogLevel", { enumerable: true, get: function() {
            return i2.DiagLogLevel;
          } });
          var a = s(102);
          Object.defineProperty(n, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = s(901);
          Object.defineProperty(n, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = s(194);
          Object.defineProperty(n, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(n, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = s(125);
          Object.defineProperty(n, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = s(846);
          Object.defineProperty(n, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var h = s(996);
          Object.defineProperty(n, "SamplingDecision", { enumerable: true, get: function() {
            return h.SamplingDecision;
          } });
          var d = s(357);
          Object.defineProperty(n, "SpanKind", { enumerable: true, get: function() {
            return d.SpanKind;
          } });
          var p = s(847);
          Object.defineProperty(n, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = s(475);
          Object.defineProperty(n, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = s(98);
          Object.defineProperty(n, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var v = s(139);
          Object.defineProperty(n, "isSpanContextValid", { enumerable: true, get: function() {
            return v.isSpanContextValid;
          } }), Object.defineProperty(n, "isValidTraceId", { enumerable: true, get: function() {
            return v.isValidTraceId;
          } }), Object.defineProperty(n, "isValidSpanId", { enumerable: true, get: function() {
            return v.isValidSpanId;
          } });
          var m = s(476);
          Object.defineProperty(n, "INVALID_SPANID", { enumerable: true, get: function() {
            return m.INVALID_SPANID;
          } }), Object.defineProperty(n, "INVALID_TRACEID", { enumerable: true, get: function() {
            return m.INVALID_TRACEID;
          } }), Object.defineProperty(n, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return m.INVALID_SPAN_CONTEXT;
          } });
          let b = s(67);
          Object.defineProperty(n, "context", { enumerable: true, get: function() {
            return b.context;
          } });
          let w = s(506);
          Object.defineProperty(n, "diag", { enumerable: true, get: function() {
            return w.diag;
          } });
          let y = s(886);
          Object.defineProperty(n, "metrics", { enumerable: true, get: function() {
            return y.metrics;
          } });
          let _ = s(939);
          Object.defineProperty(n, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = s(845);
          Object.defineProperty(n, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), n.default = { context: b.context, diag: w.diag, metrics: y.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = n;
      })();
    }, 503: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2)
              throw TypeError("argument str must be a string");
            for (var s2 = {}, n = t2.split(i), a = (r2 || {}).decode || e2, o = 0; o < n.length; o++) {
              var l = n[o], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), h = l.substr(++u, l.length).trim();
                '"' == h[0] && (h = h.slice(1, -1)), void 0 == s2[c] && (s2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(h, a));
              }
            }
            return s2;
          }, t.serialize = function(e3, t2, i2) {
            var n = i2 || {}, a = n.encode || r;
            if ("function" != typeof a)
              throw TypeError("option encode is invalid");
            if (!s.test(e3))
              throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !s.test(o))
              throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != n.maxAge) {
              var u = n.maxAge - 0;
              if (isNaN(u) || !isFinite(u))
                throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (n.domain) {
              if (!s.test(n.domain))
                throw TypeError("option domain is invalid");
              l += "; Domain=" + n.domain;
            }
            if (n.path) {
              if (!s.test(n.path))
                throw TypeError("option path is invalid");
              l += "; Path=" + n.path;
            }
            if (n.expires) {
              if ("function" != typeof n.expires.toUTCString)
                throw TypeError("option expires is invalid");
              l += "; Expires=" + n.expires.toUTCString();
            }
            if (n.httpOnly && (l += "; HttpOnly"), n.secure && (l += "; Secure"), n.sameSite)
              switch ("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
                case true:
                case "strict":
                  l += "; SameSite=Strict";
                  break;
                case "lax":
                  l += "; SameSite=Lax";
                  break;
                case "none":
                  l += "; SameSite=None";
                  break;
                default:
                  throw TypeError("option sameSite is invalid");
              }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, i = /; */, s = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 541: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function i2() {
          }
          function s2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function n(e3, t3, i3, n2, a2) {
            if ("function" != typeof i3)
              throw TypeError("The listener must be a function");
            var o2 = new s2(i3, n2 || e3, a2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], o2] : e3._events[l].push(o2) : (e3._events[l] = o2, e3._eventsCount++), e3;
          }
          function a(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new i2() : delete e3._events[t3];
          }
          function o() {
            this._events = new i2(), this._eventsCount = 0;
          }
          Object.create && (i2.prototype = /* @__PURE__ */ Object.create(null), new i2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, i3, s3 = [];
            if (0 === this._eventsCount)
              return s3;
            for (i3 in e3 = this._events)
              t2.call(e3, i3) && s3.push(r2 ? i3.slice(1) : i3);
            return Object.getOwnPropertySymbols ? s3.concat(Object.getOwnPropertySymbols(e3)) : s3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, i3 = this._events[t3];
            if (!i3)
              return [];
            if (i3.fn)
              return [i3.fn];
            for (var s3 = 0, n2 = i3.length, a2 = Array(n2); s3 < n2; s3++)
              a2[s3] = i3[s3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, i3 = this._events[t3];
            return i3 ? i3.fn ? 1 : i3.length : 0;
          }, o.prototype.emit = function(e3, t3, i3, s3, n2, a2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2])
              return false;
            var l, u, c = this._events[o2], h = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e3, c.fn, void 0, true), h) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, i3), true;
                case 4:
                  return c.fn.call(c.context, t3, i3, s3), true;
                case 5:
                  return c.fn.call(c.context, t3, i3, s3, n2), true;
                case 6:
                  return c.fn.call(c.context, t3, i3, s3, n2, a2), true;
              }
              for (u = 1, l = Array(h - 1); u < h; u++)
                l[u - 1] = arguments[u];
              c.fn.apply(c.context, l);
            } else {
              var d, p = c.length;
              for (u = 0; u < p; u++)
                switch (c[u].once && this.removeListener(e3, c[u].fn, void 0, true), h) {
                  case 1:
                    c[u].fn.call(c[u].context);
                    break;
                  case 2:
                    c[u].fn.call(c[u].context, t3);
                    break;
                  case 3:
                    c[u].fn.call(c[u].context, t3, i3);
                    break;
                  case 4:
                    c[u].fn.call(c[u].context, t3, i3, s3);
                    break;
                  default:
                    if (!l)
                      for (d = 1, l = Array(h - 1); d < h; d++)
                        l[d - 1] = arguments[d];
                    c[u].fn.apply(c[u].context, l);
                }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return n(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return n(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, i3, s3) {
            var n2 = r2 ? r2 + e3 : e3;
            if (!this._events[n2])
              return this;
            if (!t3)
              return a(this, n2), this;
            var o2 = this._events[n2];
            if (o2.fn)
              o2.fn !== t3 || s3 && !o2.once || i3 && o2.context !== i3 || a(this, n2);
            else {
              for (var l = 0, u = [], c = o2.length; l < c; l++)
                (o2[l].fn !== t3 || s3 && !o2[l].once || i3 && o2[l].context !== i3) && u.push(o2[l]);
              u.length ? this._events[n2] = 1 === u.length ? u[0] : u : a(this, n2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && a(this, t3)) : (this._events = new i2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let i2 = 0, s2 = e3.length;
            for (; s2 > 0; ) {
              let n = s2 / 2 | 0, a = i2 + n;
              0 >= r2(e3[a], t3) ? (i2 = ++a, s2 -= n + 1) : s2 = n;
            }
            return i2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let i2 = r2(574);
          class s2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                this._queue.push(r3);
                return;
              }
              let s3 = i2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(s3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = s2;
        }, 816: (e2, t2, r2) => {
          let i2 = r2(213);
          class s2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let n = (e3, t3, r3) => new Promise((n2, a) => {
            if ("number" != typeof t3 || t3 < 0)
              throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) {
              n2(e3);
              return;
            }
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  n2(r3());
                } catch (e4) {
                  a(e4);
                }
                return;
              }
              let i3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new s2(i3);
              "function" == typeof e3.cancel && e3.cancel(), a(o2);
            }, t3);
            i2(e3.then(n2, a), () => {
              clearTimeout(o);
            });
          });
          e2.exports = n, e2.exports.default = n, e2.exports.TimeoutError = s2;
        } }, r = {};
        function i(e2) {
          var s2 = r[e2];
          if (void 0 !== s2)
            return s2.exports;
          var n = r[e2] = { exports: {} }, a = true;
          try {
            t[e2](n, n.exports, i), a = false;
          } finally {
            a && delete r[e2];
          }
          return n.exports;
        }
        i.ab = "//";
        var s = {};
        (() => {
          Object.defineProperty(s, "__esModule", { value: true });
          let e2 = i(993), t2 = i(816), r2 = i(821), n = () => {
          }, a = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, i2, s2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1))
                throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null !== (i2 = null === (t3 = e3.intervalCap) || void 0 === t3 ? void 0 : t3.toString()) && void 0 !== i2 ? i2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0))
                throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null !== (a2 = null === (s2 = e3.interval) || void 0 === s2 ? void 0 : s2.toString()) && void 0 !== a2 ? a2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0))
                  return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                    this._onResumeInterval();
                  }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size)
                return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); )
                ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1))
                throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((i2, s2) => {
                let n2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let n3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && s2(a);
                    });
                    i2(await n3);
                  } catch (e4) {
                    s2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(n2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size)
                return new Promise((e3) => {
                  let t3 = this._resolveEmpty;
                  this._resolveEmpty = () => {
                    t3(), e3();
                  };
                });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size)
                return new Promise((e3) => {
                  let t3 = this._resolveIdle;
                  this._resolveIdle = () => {
                    t3(), e3();
                  };
                });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          s.default = o;
        })(), e.exports = s;
      })();
    }, 544: (e, t) => {
      "use strict";
      Symbol.for("react.transitional.element"), Symbol.for("react.portal"), Symbol.for("react.fragment"), Symbol.for("react.strict_mode"), Symbol.for("react.profiler"), Symbol.for("react.forward_ref"), Symbol.for("react.suspense"), Symbol.for("react.memo"), Symbol.for("react.lazy"), Symbol.iterator, Object.prototype.hasOwnProperty, Object.assign;
    }, 886: (e, t, r) => {
      "use strict";
      e.exports = r(544);
    }, 113: (e, t, r) => {
      var i;
      (() => {
        var s = { 226: function(s2, n2) {
          !function(a2, o2) {
            "use strict";
            var l = "function", u = "undefined", c = "object", h = "string", d = "major", p = "model", f = "name", g = "type", v = "vendor", m = "version", b = "architecture", w = "console", y = "mobile", _ = "tablet", S = "smarttv", k = "wearable", x = "embedded", T = "Amazon", O = "Apple", E = "ASUS", P = "BlackBerry", C = "Browser", R = "Chrome", A = "Firefox", j = "Google", I = "Huawei", N = "Microsoft", L = "Motorola", $ = "Opera", M = "Samsung", D = "Sharp", U = "Sony", q = "Xiaomi", B = "Zebra", V = "Facebook", z = "Chromium OS", F = "Mac OS", G = function(e2, t2) {
              var r2 = {};
              for (var i2 in e2)
                t2[i2] && t2[i2].length % 2 == 0 ? r2[i2] = t2[i2].concat(e2[i2]) : r2[i2] = e2[i2];
              return r2;
            }, H = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++)
                t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, W = function(e2, t2) {
              return typeof e2 === h && -1 !== K(t2).indexOf(K(e2));
            }, K = function(e2) {
              return e2.toLowerCase();
            }, J = function(e2, t2) {
              if (typeof e2 === h)
                return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, i2, s3, n3, a3, u2, h2 = 0; h2 < t2.length && !a3; ) {
                var d2 = t2[h2], p2 = t2[h2 + 1];
                for (r2 = i2 = 0; r2 < d2.length && !a3 && d2[r2]; )
                  if (a3 = d2[r2++].exec(e2))
                    for (s3 = 0; s3 < p2.length; s3++)
                      u2 = a3[++i2], typeof (n3 = p2[s3]) === c && n3.length > 0 ? 2 === n3.length ? typeof n3[1] == l ? this[n3[0]] = n3[1].call(this, u2) : this[n3[0]] = n3[1] : 3 === n3.length ? typeof n3[1] !== l || n3[1].exec && n3[1].test ? this[n3[0]] = u2 ? u2.replace(n3[1], n3[2]) : void 0 : this[n3[0]] = u2 ? n3[1].call(this, u2, n3[2]) : void 0 : 4 === n3.length && (this[n3[0]] = u2 ? n3[3].call(this, u2.replace(n3[1], n3[2])) : void 0) : this[n3] = u2 || o2;
                h2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2)
                if (typeof t2[r2] === c && t2[r2].length > 0) {
                  for (var i2 = 0; i2 < t2[r2].length; i2++)
                    if (W(t2[r2][i2], e2))
                      return "?" === r2 ? o2 : r2;
                } else if (W(t2[r2], e2))
                  return "?" === r2 ? o2 : r2;
              return e2;
            }, Q = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [m, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [m, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, m], [/opios[\/ ]+([\w\.]+)/i], [m, [f, $ + " Mini"]], [/\bopr\/([\w\.]+)/i], [m, [f, $]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, m], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [m, [f, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [m, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [m, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [m, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [m, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [m, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + C], m], [/\bfocus\/([\w\.]+)/i], [m, [f, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [m, [f, $ + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [m, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [m, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [m, [f, $ + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [m, [f, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [m, [f, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + C], m], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], m], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, m], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, V], m], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, m], [/\bgsa\/([\w\.]+) .*safari\//i], [m, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [m, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [m, [f, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, R + " WebView"], m], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [m, [f, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, m], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [m, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [m, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [m, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, m], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], m], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [m, [f, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, m], [/(cobalt)\/([\w\.]+)/i], [f, [m, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[b, "amd64"]], [/(ia32(?=;))/i], [[b, K]], [/((?:i[346]|x)86)[;\)]/i], [[b, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[b, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[b, "armhf"]], [/windows (ce|mobile); ppc;/i], [[b, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[b, /ower/, "", K]], [/(sun4\w)[;\)]/i], [[b, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[b, K]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [v, M], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [v, M], [g, y]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [v, O], [g, y]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [v, O], [g, _]], [/(macintosh);/i], [p, [v, O]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [v, D], [g, y]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [v, I], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [v, I], [g, y]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [v, q], [g, y]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [v, q], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [v, "OPPO"], [g, y]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [v, "Vivo"], [g, y]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [v, "Realme"], [g, y]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [v, L], [g, y]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [v, L], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [v, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [v, "LG"], [g, y]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [v, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [v, "Nokia"], [g, y]], [/(pixel c)\b/i], [p, [v, j], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [v, j], [g, y]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [v, U], [g, y]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [v, U], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [v, "OnePlus"], [g, y]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [v, T], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [v, T], [g, y]], [/(playbook);[-\w\),; ]+(rim)/i], [p, v, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [v, P], [g, y]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [v, E], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [v, E], [g, y]], [/(nexus 9)/i], [p, [v, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [v, [p, /_/g, " "], [g, y]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [v, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [v, "Meizu"], [g, y]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [v, p, [g, y]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [v, p, [g, _]], [/(surface duo)/i], [p, [v, N], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [v, "Fairphone"], [g, y]], [/(u304aa)/i], [p, [v, "AT&T"], [g, y]], [/\bsie-(\w*)/i], [p, [v, "Siemens"], [g, y]], [/\b(rct\w+) b/i], [p, [v, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [v, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [v, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [v, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [v, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [v, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [v, "ZTE"], [g, y]], [/\b(gen\d{3}) b.+49h/i], [p, [v, "Swiss"], [g, y]], [/\b(zur\d{3}) b/i], [p, [v, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [v, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[v, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [v, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [v, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[v, "Voice"], p, [g, y]], [/\b(lvtel\-)?(v1[12]) b/i], [[v, "LvTel"], p, [g, y]], [/\b(ph-1) /i], [p, [v, "Essential"], [g, y]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [v, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [v, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [v, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [v, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [v, p, [g, y]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [v, N], [g, y]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [v, B], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [v, B], [g, y]], [/smart-tv.+(samsung)/i], [v, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [v, M], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[v, "LG"], [g, S]], [/(apple) ?tv/i], [v, [p, O + " TV"], [g, S]], [/crkey/i], [[p, R + "cast"], [v, j], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [v, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [v, D], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [v, U], [g, S]], [/(mitv-\w{5}) bui/i], [p, [v, q], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [v, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[v, J], [p, J], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [v, p, [g, w]], [/droid.+; (shield) bui/i], [p, [v, "Nvidia"], [g, w]], [/(playstation [345portablevi]+)/i], [p, [v, U], [g, w]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [v, N], [g, w]], [/((pebble))app/i], [v, p, [g, k]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [v, O], [g, k]], [/droid.+; (glass) \d/i], [p, [v, j], [g, k]], [/droid.+; (wt63?0{2,3})\)/i], [p, [v, B], [g, k]], [/(quest( 2| pro)?)/i], [p, [v, V], [g, k]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [v, [g, x]], [/(aeobc)\b/i], [p, [v, T], [g, x]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, y]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [v, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [m, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [m, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, m], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [m, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, m], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [m, Y, Q]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [m, Y, Q]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[m, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, F], [m, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [m, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, m], [/\(bb(10);/i], [m, [f, P]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [m, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [m, [f, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [m, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [m, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [m, [f, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, z], m], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, m], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], m], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, m]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = o2), !(this instanceof ee))
                return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== u && a2.navigator ? a2.navigator : o2, i2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), s3 = r2 && r2.userAgentData ? r2.userAgentData : o2, n3 = t2 ? G(Z, t2) : Z, w2 = r2 && r2.userAgent == i2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[m] = o2, X.call(t3, i2, n3.browser), t3[d] = typeof (e3 = t3[m]) === h ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, w2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[b] = o2, X.call(e3, i2, n3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[v] = o2, e3[p] = o2, e3[g] = o2, X.call(e3, i2, n3.device), w2 && !e3[g] && s3 && s3.mobile && (e3[g] = y), w2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[m] = o2, X.call(e3, i2, n3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[m] = o2, X.call(e3, i2, n3.os), w2 && !e3[f] && s3 && "Unknown" != s3.platform && (e3[f] = s3.platform.replace(/chrome os/i, z).replace(/macos/i, F)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return i2;
              }, this.setUA = function(e3) {
                return i2 = typeof e3 === h && e3.length > 350 ? J(e3, 350) : e3, this;
              }, this.setUA(i2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = H([f, m, d]), ee.CPU = H([b]), ee.DEVICE = H([p, v, g, w, y, S, _, k, x]), ee.ENGINE = ee.OS = H([f, m]), typeof n2 !== u ? (s2.exports && (n2 = s2.exports = ee), n2.UAParser = ee) : r.amdO ? void 0 !== (i = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = i) : typeof a2 !== u && (a2.UAParser = ee);
            var et = typeof a2 !== u && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2)
                  et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, n = {};
        function a(e2) {
          var t2 = n[e2];
          if (void 0 !== t2)
            return t2.exports;
          var r2 = n[e2] = { exports: {} }, i2 = true;
          try {
            s[e2].call(r2.exports, r2, r2.exports, a), i2 = false;
          } finally {
            i2 && delete n[e2];
          }
          return r2.exports;
        }
        a.ab = "//";
        var o = a(226);
        e.exports = o;
      })();
    }, 152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return n;
      } });
      let i = new (r(521)).AsyncLocalStorage();
      function s(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2)
          return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function n(e2, t2, r2) {
        let n2 = s(e2, t2);
        return n2 ? i.run(n2, r2) : r2();
      }
      function a(e2, t2) {
        return i.getStore() || (e2 && t2 ? s(e2, t2) : void 0);
      }
    }, 53: (e, t, r) => {
      "use strict";
      var i = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return n;
      } });
      let s = r(152), n = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: s2, headers: n2, body: a2, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: s2, headers: [...Array.from(n2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++)
            if (e3[t3].length > 0) {
              e3 = e3.slice(t3);
              break;
            }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? i.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, s.getTestReqInfo)(t2, n);
        if (!r2)
          return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, u = await a(o2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok)
          throw Error(`Proxy request failed: ${c.status}`);
        let h = await c.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: s2 } = e3.response;
          return new Response(s2 ? i.from(s2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(h);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var i2;
          return (null == r2 ? void 0 : null == (i2 = r2.next) ? void 0 : i2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 384: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return n;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let i = r(152), s = r(53);
      function n() {
        return (0, s.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, s.reader, () => e2(t2, r2));
      }
    }, 392: (e) => {
      "use strict";
      e.exports = function() {
        throw Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
      };
    }, 656: (e, t, r) => {
      "use strict";
      let i;
      r.r(t), r.d(t, { default: () => iE });
      var s, n, a, o, l, u, c, h, d, p, f, g = {};
      async function v() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(g), r.d(g, { config: () => ik, middleware: () => iS });
      let m = null;
      async function b() {
        if ("phase-production-build" === process.env.NEXT_PHASE)
          return;
        m || (m = v());
        let e10 = await m;
        if (null == e10 ? void 0 : e10.register)
          try {
            await e10.register();
          } catch (e11) {
            throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
          }
      }
      async function w(...e10) {
        let t10 = await v();
        try {
          var r10;
          await (null == t10 ? void 0 : null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let y = null;
      function _() {
        return y || (y = b()), y;
      }
      function S(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10)
            return {};
          throw Error(S(e10));
        }, construct() {
          throw Error(S(e10));
        }, apply(r10, i2, s2) {
          if ("function" == typeof s2[0])
            return s2[0](t10);
          throw Error(S(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), _();
      class k extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class x extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class T extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let O = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser" };
      function E(e10) {
        var t10, r10, i2, s2, n2, a2 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); )
            o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, n2 = false; l2(); )
            if ("," === (r10 = e10.charAt(o2))) {
              for (i2 = o2, o2 += 1, l2(), s2 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; )
                o2 += 1;
              o2 < e10.length && "=" === e10.charAt(o2) ? (n2 = true, o2 = s2, a2.push(e10.substring(t10, i2)), t10 = o2) : o2 = i2 + 1;
            } else
              o2 += 1;
          (!n2 || o2 >= e10.length) && a2.push(e10.substring(t10, e10.length));
        }
        return a2;
      }
      function P(e10) {
        let t10 = {}, r10 = [];
        if (e10)
          for (let [i2, s2] of e10.entries())
            "set-cookie" === i2.toLowerCase() ? (r10.push(...E(s2)), t10[i2] = 1 === r10.length ? r10[0] : r10) : t10[i2] = s2;
        return t10;
      }
      function C(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...O, GROUP: { builtinReact: [O.reactServerComponents, O.actionBrowser], serverOnly: [O.reactServerComponents, O.actionBrowser, O.instrument, O.middleware], neutralTarget: [O.api], clientOnly: [O.serverSideRendering, O.appPagesBrowser], bundled: [O.reactServerComponents, O.actionBrowser, O.serverSideRendering, O.appPagesBrowser, O.shared, O.instrument], appPages: [O.reactServerComponents, O.serverSideRendering, O.appPagesBrowser, O.actionBrowser] } });
      let R = Symbol("response"), A = Symbol("passThrough"), j = Symbol("waitUntil");
      class I {
        constructor(e10, t10) {
          this[A] = false, this[j] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[R] || (this[R] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[A] = true;
        }
        waitUntil(e10) {
          if ("external" === this[j].kind)
            return (0, this[j].function)(e10);
          this[j].promises.push(e10);
        }
      }
      class N extends I {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new k({ page: this.sourcePage });
        }
        respondWith() {
          throw new k({ page: this.sourcePage });
        }
      }
      function L(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function $(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), i2 = r10 > -1 && (t10 < 0 || r10 < t10);
        return i2 || t10 > -1 ? { pathname: e10.substring(0, i2 ? r10 : t10), query: i2 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function M(e10, t10) {
        if (!e10.startsWith("/") || !t10)
          return e10;
        let { pathname: r10, query: i2, hash: s2 } = $(e10);
        return "" + t10 + r10 + i2 + s2;
      }
      function D(e10, t10) {
        if (!e10.startsWith("/") || !t10)
          return e10;
        let { pathname: r10, query: i2, hash: s2 } = $(e10);
        return "" + r10 + t10 + i2 + s2;
      }
      function U(e10, t10) {
        if ("string" != typeof e10)
          return false;
        let { pathname: r10 } = $(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function q(e10, t10) {
        let r10;
        let i2 = e10.split("/");
        return (t10 || []).some((t11) => !!i2[1] && i2[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, i2.splice(1, 1), e10 = i2.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let B = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function V(e10, t10) {
        return new URL(String(e10).replace(B, "localhost"), t10 && String(t10).replace(B, "localhost"));
      }
      let z = Symbol("NextURLInternal");
      class F {
        constructor(e10, t10, r10) {
          let i2, s2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (i2 = t10, s2 = r10 || {}) : s2 = r10 || t10 || {}, this[z] = { url: V(e10, i2 ?? s2.base), options: s2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, i2, s2;
          let n2 = function(e11, t11) {
            var r11, i3;
            let { basePath: s3, i18n: n3, trailingSlash: a3 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a3 };
            s3 && U(o3.pathname, s3) && (o3.pathname = function(e12, t12) {
              if (!U(e12, t12))
                return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, s3), o3.basePath = s3);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              o3.buildId = r12, l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : q(o3.pathname, n3.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (i3 = e12.pathname) ? i3 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : q(l2, n3.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[z].url.pathname, { nextConfig: this[z].options.nextConfig, parseData: true, i18nProvider: this[z].options.i18nProvider }), a2 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host))
              r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname)
                return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[z].url, this[z].options.headers);
          this[z].domainLocale = this[z].options.i18nProvider ? this[z].options.i18nProvider.detectDomainLocale(a2) : function(e11, t11, r11) {
            if (e11)
              for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) {
                var i3, s3;
                if (t11 === (null == (i3 = n3.domain) ? void 0 : i3.split(":", 1)[0].toLowerCase()) || r11 === n3.defaultLocale.toLowerCase() || (null == (s3 = n3.locales) ? void 0 : s3.some((e12) => e12.toLowerCase() === r11)))
                  return n3;
              }
          }(null == (t10 = this[z].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, a2);
          let o2 = (null == (r10 = this[z].domainLocale) ? void 0 : r10.defaultLocale) || (null == (s2 = this[z].options.nextConfig) ? void 0 : null == (i2 = s2.i18n) ? void 0 : i2.defaultLocale);
          this[z].url.pathname = n2.pathname, this[z].defaultLocale = o2, this[z].basePath = n2.basePath ?? "", this[z].buildId = n2.buildId, this[z].locale = n2.locale ?? o2, this[z].trailingSlash = n2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, i2) {
            if (!t11 || t11 === r10)
              return e11;
            let s2 = e11.toLowerCase();
            return !i2 && (U(s2, "/api") || U(s2, "/" + t11.toLowerCase())) ? e11 : M(e11, "/" + t11);
          }((e10 = { basePath: this[z].basePath, buildId: this[z].buildId, defaultLocale: this[z].options.forceLocale ? void 0 : this[z].defaultLocale, locale: this[z].locale, pathname: this[z].url.pathname, trailingSlash: this[z].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = L(t10)), e10.buildId && (t10 = D(M(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = M(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : D(t10, "/") : L(t10);
        }
        formatSearch() {
          return this[z].url.search;
        }
        get buildId() {
          return this[z].buildId;
        }
        set buildId(e10) {
          this[z].buildId = e10;
        }
        get locale() {
          return this[z].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[z].locale || !(null == (r10 = this[z].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10)))
            throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[z].locale = e10;
        }
        get defaultLocale() {
          return this[z].defaultLocale;
        }
        get domainLocale() {
          return this[z].domainLocale;
        }
        get searchParams() {
          return this[z].url.searchParams;
        }
        get host() {
          return this[z].url.host;
        }
        set host(e10) {
          this[z].url.host = e10;
        }
        get hostname() {
          return this[z].url.hostname;
        }
        set hostname(e10) {
          this[z].url.hostname = e10;
        }
        get port() {
          return this[z].url.port;
        }
        set port(e10) {
          this[z].url.port = e10;
        }
        get protocol() {
          return this[z].url.protocol;
        }
        set protocol(e10) {
          this[z].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[z].url = V(e10), this.analyze();
        }
        get origin() {
          return this[z].url.origin;
        }
        get pathname() {
          return this[z].url.pathname;
        }
        set pathname(e10) {
          this[z].url.pathname = e10;
        }
        get hash() {
          return this[z].url.hash;
        }
        set hash(e10) {
          this[z].url.hash = e10;
        }
        get search() {
          return this[z].url.search;
        }
        set search(e10) {
          this[z].url.search = e10;
        }
        get password() {
          return this[z].url.password;
        }
        set password(e10) {
          this[z].url.password = e10;
        }
        get username() {
          return this[z].url.username;
        }
        set username(e10) {
          this[z].url.username = e10;
        }
        get basePath() {
          return this[z].basePath;
        }
        set basePath(e10) {
          this[z].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new F(String(this), this[z].options);
        }
      }
      var G = r(555);
      let H = Symbol("internal request");
      class W extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          C(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let i2 = new F(r10, { headers: P(this.headers), nextConfig: t10.nextConfig });
          this[H] = { cookies: new G.RequestCookies(this.headers), nextUrl: i2, url: i2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[H].cookies;
        }
        get nextUrl() {
          return this[H].nextUrl;
        }
        get page() {
          throw new x();
        }
        get ua() {
          throw new T();
        }
        get url() {
          return this[H].url;
        }
      }
      class K {
        static get(e10, t10, r10) {
          let i2 = Reflect.get(e10, t10, r10);
          return "function" == typeof i2 ? i2.bind(e10) : i2;
        }
        static set(e10, t10, r10, i2) {
          return Reflect.set(e10, t10, r10, i2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let J = Symbol("internal response"), X = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function Y(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers))
            throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [i2, s2] of e10.request.headers)
            t10.set("x-middleware-request-" + i2, s2), r11.push(i2);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class Q extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, i2 = new Proxy(new G.ResponseCookies(r10), { get(e11, i3, s2) {
            switch (i3) {
              case "delete":
              case "set":
                return (...s3) => {
                  let n2 = Reflect.apply(e11[i3], e11, s3), a2 = new Headers(r10);
                  return n2 instanceof G.ResponseCookies && r10.set("x-middleware-set-cookie", n2.getAll().map((e12) => (0, G.stringifyCookie)(e12)).join(",")), Y(t10, a2), n2;
                };
              default:
                return K.get(e11, i3, s2);
            }
          } });
          this[J] = { cookies: i2, url: t10.url ? new F(t10.url, { headers: P(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[J].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new Q(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!X.has(r10))
            throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let i2 = "object" == typeof t10 ? t10 : {}, s2 = new Headers(null == i2 ? void 0 : i2.headers);
          return s2.set("Location", C(e10)), new Q(null, { ...i2, headers: s2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", C(e10)), Y(t10, r10), new Q(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), Y(e10, t10), new Q(null, { ...e10, headers: t10 });
        }
      }
      function Z(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, i2 = new URL(e10, t10), s2 = r10.protocol + "//" + r10.host;
        return i2.protocol + "//" + i2.host === s2 ? i2.toString().replace(s2, "") : i2.toString();
      }
      let ee = "Next-Router-Prefetch", et = ["RSC", "Next-Router-State-Tree", ee, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], er = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], ei = ["__nextDataReq"];
      class es extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new es();
        }
      }
      class en extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, i2) {
            if ("symbol" == typeof r10)
              return K.get(t10, r10, i2);
            let s2 = r10.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === s2);
            if (void 0 !== n2)
              return K.get(t10, n2, i2);
          }, set(t10, r10, i2, s2) {
            if ("symbol" == typeof r10)
              return K.set(t10, r10, i2, s2);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return K.set(t10, a2 ?? r10, i2, s2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10)
              return K.has(t10, r10);
            let i2 = r10.toLowerCase(), s2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return void 0 !== s2 && K.has(t10, s2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10)
              return K.deleteProperty(t10, r10);
            let i2 = r10.toLowerCase(), s2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return void 0 === s2 || K.deleteProperty(t10, s2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return es.callable;
              default:
                return K.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new en(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, i2] of this.entries())
            e10.call(t10, i2, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let ea = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class eo {
        disable() {
          throw ea;
        }
        getStore() {
        }
        run() {
          throw ea;
        }
        exit() {
          throw ea;
        }
        enterWith() {
          throw ea;
        }
        static bind(e10) {
          return e10;
        }
      }
      let el = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function eu() {
        return el ? new el() : new eo();
      }
      let ec = eu(), eh = eu();
      class ed extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ed();
        }
      }
      class ep {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return ed.callable;
              default:
                return K.get(e11, t10, r10);
            }
          } });
        }
      }
      let ef = Symbol.for("next.mutated.cookies");
      class eg {
        static wrap(e10, t10) {
          let r10 = new G.ResponseCookies(new Headers());
          for (let t11 of e10.getAll())
            r10.set(t11);
          let i2 = [], s2 = /* @__PURE__ */ new Set(), n2 = () => {
            let e11 = ec.getStore();
            if (e11 && (e11.pathWasRevalidated = true), i2 = r10.getAll().filter((e12) => s2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of i2) {
                let r11 = new G.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, a2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case ef:
                return i2;
              case "delete":
                return function(...t12) {
                  s2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a2;
                  } finally {
                    n2();
                  }
                };
              case "set":
                return function(...t12) {
                  s2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a2;
                  } finally {
                    n2();
                  }
                };
              default:
                return K.get(e11, t11, r11);
            }
          } });
          return a2;
        }
      }
      function ev(e10) {
        if ("action" !== function(e11) {
          let t10 = eh.getStore();
          if (t10) {
            if ("request" === t10.type)
              return t10;
            if ("prerender" === t10.type || "prerender-ppr" === t10.type || "prerender-legacy" === t10.type)
              throw Error(`\`${e11}\` cannot be called inside a prerender. This is a bug in Next.js.`);
            if ("cache" === t10.type)
              throw Error(`\`${e11}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === t10.type)
              throw Error(`\`${e11}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          throw Error(`\`${e11}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
        }(e10).phase)
          throw new ed();
      }
      var em = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(em || {}), eb = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(eb || {}), ew = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(ew || {}), ey = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(ey || {}), e_ = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(e_ || {}), eS = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(eS || {}), ek = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(ek || {}), ex = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(ex || {}), eT = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(eT || {}), eO = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(eO || {}), eE = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(eE || {}), eP = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eP || {});
      let eC = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], eR = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eA(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ej, propagation: eI, trace: eN, SpanStatusCode: eL, SpanKind: e$, ROOT_CONTEXT: eM } = i = r(777);
      class eD extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eU = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eD;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eL.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eq = /* @__PURE__ */ new Map(), eB = i.createContextKey("next.rootSpanId"), eV = 0, ez = () => eV++, eF = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class eG {
        getTracerInstance() {
          return eN.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ej;
        }
        getTracePropagationData() {
          let e10 = ej.active(), t10 = [];
          return eI.inject(e10, t10, eF), t10;
        }
        getActiveScopeSpan() {
          return eN.getSpan(null == ej ? void 0 : ej.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let i2 = ej.active();
          if (eN.getSpanContext(i2))
            return t10();
          let s2 = eI.extract(i2, e10, r10);
          return ej.with(s2, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, i2, s2] = e10, { fn: n2, options: a2 } = "function" == typeof i2 ? { fn: i2, options: {} } : { fn: s2, options: { ...i2 } }, o2 = a2.spanName ?? r10;
          if (!eC.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a2.hideSpan)
            return n2();
          let l2 = this.getSpanContext((null == a2 ? void 0 : a2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t10 = eN.getSpanContext(l2)) ? void 0 : t10.isRemote) && (u2 = true) : (l2 = (null == ej ? void 0 : ej.active()) ?? eM, u2 = true);
          let c2 = ez();
          return a2.attributes = { "next.span_name": o2, "next.span_type": r10, ...a2.attributes }, ej.with(l2.setValue(eB, c2), () => this.getTracerInstance().startActiveSpan(o2, a2, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, i3 = () => {
              eq.delete(c2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && eR.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            u2 && eq.set(c2, new Map(Object.entries(a2.attributes ?? {})));
            try {
              if (n2.length > 1)
                return n2(e11, (t13) => eU(e11, t13));
              let t12 = n2(e11);
              if (eA(t12))
                return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                  throw eU(e11, t13), t13;
                }).finally(i3);
              return e11.end(), i3(), t12;
            } catch (t12) {
              throw eU(e11, t12), i3(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, i2, s2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eC.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = i2;
            "function" == typeof e11 && "function" == typeof s2 && (e11 = e11.apply(this, arguments));
            let n2 = arguments.length - 1, a2 = arguments[n2];
            if ("function" != typeof a2)
              return t10.trace(r10, e11, () => s2.apply(this, arguments));
            {
              let i3 = t10.getContext().bind(ej.active(), a2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[n2] = function(e13) {
                return null == t11 || t11(e13), i3.apply(this, arguments);
              }, s2.apply(this, arguments)));
            }
          } : s2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, i2 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, i2);
        }
        getSpanContext(e10) {
          return e10 ? eN.setSpan(ej.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ej.active().getValue(eB);
          return eq.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = ej.active().getValue(eB), i2 = eq.get(r10);
          i2 && i2.set(e10, t10);
        }
      }
      let eH = (() => {
        let e10 = new eG();
        return () => e10;
      })(), eW = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eW);
      class eK {
        constructor(e10, t10, r10, i2) {
          var s2;
          let n2 = e10 && function(e11, t11) {
            let r11 = en.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a2 = null == (s2 = r10.get(eW)) ? void 0 : s2.value;
          this.isEnabled = !!(!n2 && a2 && e10 && a2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = i2;
        }
        enable() {
          if (!this._previewModeId)
            throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eW, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eW, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eJ(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], i2 = new Headers();
          for (let e11 of E(r10))
            i2.append("set-cookie", e11);
          for (let e11 of new G.ResponseCookies(i2).getAll())
            t10.set(e11);
        }
      }
      var eX = r(541), eY = r.n(eX);
      class eQ extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      async function eZ(e10, t10) {
        if (!e10)
          return t10();
        let r10 = e0(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.revalidatedTags), i2 = new Set(e11.pendingRevalidateWrites);
            return { revalidatedTags: t12.revalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !i2.has(e12)) };
          }(r10, e0(e10));
          await e1(e10, t11);
        }
      }
      function e0(e10) {
        return { revalidatedTags: e10.revalidatedTags ? [...e10.revalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e1(e10, { revalidatedTags: t10, pendingRevalidates: r10, pendingRevalidateWrites: i2 }) {
        var s2;
        return Promise.all([null == (s2 = e10.incrementalCache) ? void 0 : s2.revalidateTag(t10), ...Object.values(r10), ...i2]);
      }
      let e2 = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class e3 {
        disable() {
          throw e2;
        }
        getStore() {
        }
        run() {
          throw e2;
        }
        exit() {
          throw e2;
        }
        enterWith() {
          throw e2;
        }
        static bind(e10) {
          return e10;
        }
      }
      let e6 = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, e4 = e6 ? new e6() : new e3();
      class e5 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (eY())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eA(e10))
            this.waitUntil || e9(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10)
            this.addCallback(e10);
          else
            throw Error("`after()`: Argument must be a promise or a function");
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || e9();
          let r10 = eh.getStore();
          r10 && this.workUnitStores.add(r10);
          let i2 = e4.getStore(), s2 = i2 ? i2.rootTaskSpawnPhase : null == r10 ? void 0 : r10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let n2 = (t10 = async () => {
            try {
              await e4.run({ rootTaskSpawnPhase: s2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, e6 ? e6.bind(t10) : e3.bind(t10));
          this.callbackQueue.add(n2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size)
            return;
          for (let e11 of this.workUnitStores)
            e11.phase = "after";
          let e10 = ec.getStore();
          if (!e10)
            throw new eQ("Missing workStore in AfterContext.runCallbacks");
          return eZ(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError)
            try {
              null == this.onTaskError || this.onTaskError.call(this, t10);
            } catch (e11) {
              console.error(new eQ("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
            }
        }
      }
      function e9() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      class e8 {
        onClose(e10) {
          if (this.isClosed)
            throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed)
            throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e7() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let te = Symbol.for("@next/request-context");
      class tt extends W {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new k({ page: this.sourcePage });
        }
        respondWith() {
          throw new k({ page: this.sourcePage });
        }
        waitUntil() {
          throw new k({ page: this.sourcePage });
        }
      }
      let tr = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ti = (e10, t10) => eH().withPropagatedContext(e10.headers, t10, tr), ts = false;
      async function tn(e10) {
        var t10;
        let i2, s2;
        !function() {
          if (!ts && (ts = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(384);
            e11(), ti = t11(ti);
          }
        }(), await _();
        let n2 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a2 = new F(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...a2.searchParams.keys()]) {
          let t11 = a2.searchParams.getAll(e11);
          !function(e12, t12) {
            for (let r10 of ["nxtP", "nxtI"])
              e12 !== r10 && e12.startsWith(r10) && t12(e12.substring(r10.length));
          }(e11, (r10) => {
            for (let e12 of (a2.searchParams.delete(r10), t11))
              a2.searchParams.append(r10, e12);
            a2.searchParams.delete(e11);
          });
        }
        let o2 = a2.buildId;
        a2.buildId = "";
        let l2 = e10.request.headers["x-nextjs-data"];
        l2 && "/index" === a2.pathname && (a2.pathname = "/");
        let u2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, i3] of Object.entries(e11))
            for (let e12 of Array.isArray(i3) ? i3 : [i3])
              void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), c2 = /* @__PURE__ */ new Map();
        if (!n2)
          for (let e11 of et) {
            let t11 = e11.toLowerCase(), r10 = u2.get(t11);
            r10 && (c2.set(t11, r10), u2.delete(t11));
          }
        let h2 = new tt({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, i3 = r10 ? new URL(e11) : e11;
          for (let e12 of er)
            i3.searchParams.delete(e12);
          if (t11)
            for (let e12 of ei)
              i3.searchParams.delete(e12);
          return r10 ? i3.toString() : i3;
        }(a2, true).toString(), init: { body: e10.request.body, headers: u2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        l2 && Object.defineProperty(h2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e7() }) }));
        let d2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[te];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), p2 = new N({ request: h2, page: e10.page, context: d2 ? { waitUntil: d2 } : void 0 });
        if ((i2 = await ti(h2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = p2.waitUntil.bind(p2), r10 = new e8();
            return eH().trace(eP.execute, { spanName: `middleware ${h2.method} ${h2.nextUrl.pathname}`, attributes: { "http.target": h2.nextUrl.pathname, "http.method": h2.method } }, async () => {
              try {
                var i3, n3, a3, l3, u3, c3, d3;
                let f3 = e7(), g3 = (u3 = h2.nextUrl, c3 = void 0, d3 = (e11) => {
                  s2 = e11;
                }, function(e11, t12, r11, i4, s3, n4, a4, o3, l4, u4) {
                  function c4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let h3 = {};
                  return { type: "request", phase: e11, implicitTags: s3 ?? [], url: { pathname: i4.pathname, search: i4.search ?? "" }, get headers() {
                    return h3.headers || (h3.headers = function(e12) {
                      let t13 = en.from(e12);
                      for (let e13 of et)
                        t13.delete(e13.toLowerCase());
                      return en.seal(t13);
                    }(t12.headers)), h3.headers;
                  }, get cookies() {
                    if (!h3.cookies) {
                      let e12 = new G.RequestCookies(en.from(t12.headers));
                      eJ(t12, e12), h3.cookies = ep.seal(e12);
                    }
                    return h3.cookies;
                  }, set cookies(value) {
                    h3.cookies = value;
                  }, get mutableCookies() {
                    if (!h3.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new G.RequestCookies(en.from(e13));
                        return eg.wrap(r12, t13);
                      }(t12.headers, n4 || (r11 ? c4 : void 0));
                      eJ(t12, e12), h3.mutableCookies = e12;
                    }
                    return h3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h3.userspaceMutableCookies) {
                      let e12 = function(e13) {
                        let t13 = new Proxy(e13, { get(e14, r12, i5) {
                          switch (r12) {
                            case "delete":
                              return function(...r13) {
                                return ev("cookies().delete"), e14.delete(...r13), t13;
                              };
                            case "set":
                              return function(...r13) {
                                return ev("cookies().set"), e14.set(...r13), t13;
                              };
                            default:
                              return K.get(e14, r12, i5);
                          }
                        } });
                        return t13;
                      }(this.mutableCookies);
                      h3.userspaceMutableCookies = e12;
                    }
                    return h3.userspaceMutableCookies;
                  }, get draftMode() {
                    return h3.draftMode || (h3.draftMode = new eK(o3, t12, this.cookies, this.mutableCookies)), h3.draftMode;
                  }, renderResumeDataCache: a4 ?? null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache };
                }("action", h2, void 0, u3, c3, d3, void 0, f3, false, void 0)), v3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: i4, isPrefetchRequest: s3 }) {
                  var n4;
                  let a4 = { isStaticGeneration: !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isServerAction, page: e11, fallbackRouteParams: t12, route: (n4 = e11.split("/").reduce((e12, t13, r12, i5) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === i5.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? n4 : "/" + n4, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: i4, isPrefetchRequest: s3, buildId: r11.buildId, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: i5 } = e12;
                    return new e5({ waitUntil: t13, onClose: r12, onTaskError: i5 });
                  }(r11) };
                  return r11.store = a4, a4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (n3 = e10.request.nextConfig) ? void 0 : null == (i3 = n3.experimental) ? void 0 : i3.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) ? void 0 : null == (a3 = l3.experimental) ? void 0 : a3.authInterrupts) }, buildId: o2 ?? "", supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: h2.headers.has(ee) });
                return await ec.run(v3, () => eh.run(g3, e10.handler, h2, p2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(h2, p2);
        })) && !(i2 instanceof Response))
          throw TypeError("Expected an instance of Response to be returned");
        i2 && s2 && i2.headers.set("set-cookie", s2);
        let f2 = null == i2 ? void 0 : i2.headers.get("x-middleware-rewrite");
        if (i2 && f2 && !n2) {
          let t11 = new F(f2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t11.host === h2.nextUrl.host && (t11.buildId = o2 || t11.buildId, i2.headers.set("x-middleware-rewrite", String(t11)));
          let r10 = Z(String(t11), String(a2));
          l2 && i2.headers.set("x-nextjs-rewrite", r10);
        }
        let g2 = null == i2 ? void 0 : i2.headers.get("Location");
        if (i2 && g2 && !n2) {
          let t11 = new F(g2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          i2 = new Response(i2.body, i2), t11.host === h2.nextUrl.host && (t11.buildId = o2 || t11.buildId, i2.headers.set("Location", String(t11))), l2 && (i2.headers.delete("Location"), i2.headers.set("x-nextjs-redirect", Z(String(t11), String(a2))));
        }
        let v2 = i2 || Q.next(), m2 = v2.headers.get("x-middleware-override-headers"), b2 = [];
        if (m2) {
          for (let [e11, t11] of c2)
            v2.headers.set(`x-middleware-request-${e11}`, t11), b2.push(e11);
          b2.length > 0 && v2.headers.set("x-middleware-override-headers", m2 + "," + b2.join(","));
        }
        return { response: v2, waitUntil: ("internal" === p2[j].kind ? Promise.all(p2[j].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: h2.fetchMetrics };
      }
      var ta = r(896);
      function to() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let tl = { path: "/", sameSite: "lax", httpOnly: false, maxAge: 3456e4 }, tu = /^(.*)[.](0|[1-9][0-9]*)$/;
      function tc(e10, t10) {
        if (e10 === t10)
          return true;
        let r10 = e10.match(tu);
        return !!r10 && r10[1] === t10;
      }
      function th(e10, t10, r10) {
        let i2 = r10 ?? 3180, s2 = encodeURIComponent(t10);
        if (s2.length <= i2)
          return [{ name: e10, value: t10 }];
        let n2 = [];
        for (; s2.length > 0; ) {
          let e11 = s2.slice(0, i2), t11 = e11.lastIndexOf("%");
          t11 > i2 - 3 && (e11 = e11.slice(0, t11));
          let r11 = "";
          for (; e11.length > 0; )
            try {
              r11 = decodeURIComponent(e11);
              break;
            } catch (t12) {
              if (t12 instanceof URIError && "%" === e11.at(-3) && e11.length > 3)
                e11 = e11.slice(0, e11.length - 3);
              else
                throw t12;
            }
          n2.push(r11), s2 = s2.slice(e11.length);
        }
        return n2.map((t11, r11) => ({ name: `${e10}.${r11}`, value: t11 }));
      }
      async function td(e10, t10) {
        let r10 = await t10(e10);
        if (r10)
          return r10;
        let i2 = [];
        for (let r11 = 0; ; r11++) {
          let s2 = `${e10}.${r11}`, n2 = await t10(s2);
          if (!n2)
            break;
          i2.push(n2);
        }
        return i2.length > 0 ? i2.join("") : null;
      }
      let tp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), tf = " 	\n\r=".split(""), tg = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1)
          e10[t10] = -1;
        for (let t10 = 0; t10 < tf.length; t10 += 1)
          e10[tf[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < tp.length; t10 += 1)
          e10[tp[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function tv(e10) {
        let t10 = [], r10 = 0, i2 = 0;
        if (function(e11, t11) {
          for (let r11 = 0; r11 < e11.length; r11 += 1) {
            let i3 = e11.charCodeAt(r11);
            if (i3 > 55295 && i3 <= 56319) {
              let t12 = (i3 - 55296) * 1024 & 65535;
              i3 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
            }
            !function(e12, t12) {
              if (e12 <= 127) {
                t12(e12);
                return;
              }
              if (e12 <= 2047) {
                t12(192 | e12 >> 6), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 65535) {
                t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 1114111) {
                t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
            }(i3, t11);
          }
        }(e10, (e11) => {
          for (r10 = r10 << 8 | e11, i2 += 8; i2 >= 6; ) {
            let e12 = r10 >> i2 - 6 & 63;
            t10.push(tp[e12]), i2 -= 6;
          }
        }), i2 > 0)
          for (r10 <<= 6 - i2, i2 = 6; i2 >= 6; ) {
            let e11 = r10 >> i2 - 6 & 63;
            t10.push(tp[e11]), i2 -= 6;
          }
        return t10.join("");
      }
      function tm(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, i2 = { utf8seq: 0, codepoint: 0 }, s2 = 0, n2 = 0;
        for (let t11 = 0; t11 < e10.length; t11 += 1) {
          let a2 = tg[e10.charCodeAt(t11)];
          if (a2 > -1)
            for (s2 = s2 << 6 | a2, n2 += 6; n2 >= 8; )
              (function(e11, t12, r11) {
                if (0 === t12.utf8seq) {
                  if (e11 <= 127) {
                    r11(e11);
                    return;
                  }
                  for (let r12 = 1; r12 < 6; r12 += 1)
                    if ((e11 >> 7 - r12 & 1) == 0) {
                      t12.utf8seq = r12;
                      break;
                    }
                  if (2 === t12.utf8seq)
                    t12.codepoint = 31 & e11;
                  else if (3 === t12.utf8seq)
                    t12.codepoint = 15 & e11;
                  else if (4 === t12.utf8seq)
                    t12.codepoint = 7 & e11;
                  else
                    throw Error("Invalid UTF-8 sequence");
                  t12.utf8seq -= 1;
                } else if (t12.utf8seq > 0) {
                  if (e11 <= 127)
                    throw Error("Invalid UTF-8 sequence");
                  t12.codepoint = t12.codepoint << 6 | 63 & e11, t12.utf8seq -= 1, 0 === t12.utf8seq && r11(t12.codepoint);
                }
              })(s2 >> n2 - 8 & 255, i2, r10), n2 -= 8;
          else if (-2 === a2)
            continue;
          else
            throw Error(`Invalid Base64-URL character "${e10.at(t11)}" at position ${t11}`);
        }
        return t10.join("");
      }
      let tb = "base64-";
      async function tw({ getAll: e10, setAll: t10, setItems: r10, removedItems: i2 }, s2) {
        let n2 = s2.cookieEncoding, a2 = s2.cookieOptions ?? null, o2 = await e10([...r10 ? Object.keys(r10) : [], ...i2 ? Object.keys(i2) : []]), l2 = o2?.map(({ name: e11 }) => e11) || [], u2 = Object.keys(i2).flatMap((e11) => l2.filter((t11) => tc(t11, e11))), c2 = Object.keys(r10).flatMap((e11) => {
          let t11 = new Set(l2.filter((t12) => tc(t12, e11))), i3 = r10[e11];
          "base64url" === n2 && (i3 = tb + tv(i3));
          let s3 = th(e11, i3);
          return s3.forEach((e12) => {
            t11.delete(e12.name);
          }), u2.push(...t11), s3;
        }), h2 = { ...tl, ...a2, maxAge: 0 }, d2 = { ...tl, ...a2, maxAge: tl.maxAge };
        delete h2.name, delete d2.name, await t10([...u2.map((e11) => ({ name: e11, value: "", options: h2 })), ...c2.map(({ name: e11, value: t11 }) => ({ name: e11, value: t11, options: d2 }))]);
      }
      let ty = (e10) => {
        let t10;
        return e10 ? t10 = e10 : "undefined" == typeof fetch ? t10 = (...e11) => Promise.resolve().then(r.bind(r, 608)).then(({ default: t11 }) => t11(...e11)) : t10 = fetch, (...e11) => t10(...e11);
      };
      class t_ extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
      }
      class tS extends t_ {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class tk extends t_ {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class tx extends t_ {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      !function(e10) {
        e10.Any = "any", e10.ApNortheast1 = "ap-northeast-1", e10.ApNortheast2 = "ap-northeast-2", e10.ApSouth1 = "ap-south-1", e10.ApSoutheast1 = "ap-southeast-1", e10.ApSoutheast2 = "ap-southeast-2", e10.CaCentral1 = "ca-central-1", e10.EuCentral1 = "eu-central-1", e10.EuWest1 = "eu-west-1", e10.EuWest2 = "eu-west-2", e10.EuWest3 = "eu-west-3", e10.SaEast1 = "sa-east-1", e10.UsEast1 = "us-east-1", e10.UsWest1 = "us-west-1", e10.UsWest2 = "us-west-2";
      }(s || (s = {}));
      class tT {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: i2 = s.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = i2, this.fetch = ty(r10);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10, t10 = {}) {
          var r10, i2, s2, n2, a2;
          return i2 = this, s2 = void 0, n2 = void 0, a2 = function* () {
            try {
              let i3;
              let { headers: s3, method: n3, body: a3 } = t10, o2 = {}, { region: l2 } = t10;
              l2 || (l2 = this.region), l2 && "any" !== l2 && (o2["x-region"] = l2), a3 && (s3 && !Object.prototype.hasOwnProperty.call(s3, "Content-Type") || !s3) && ("undefined" != typeof Blob && a3 instanceof Blob || a3 instanceof ArrayBuffer ? (o2["Content-Type"] = "application/octet-stream", i3 = a3) : "string" == typeof a3 ? (o2["Content-Type"] = "text/plain", i3 = a3) : "undefined" != typeof FormData && a3 instanceof FormData ? i3 = a3 : (o2["Content-Type"] = "application/json", i3 = JSON.stringify(a3)));
              let u2 = yield this.fetch(`${this.url}/${e10}`, { method: n3 || "POST", headers: Object.assign(Object.assign(Object.assign({}, o2), this.headers), s3), body: i3 }).catch((e11) => {
                throw new tS(e11);
              }), c2 = u2.headers.get("x-relay-error");
              if (c2 && "true" === c2)
                throw new tk(u2);
              if (!u2.ok)
                throw new tx(u2);
              let h2 = (null !== (r10 = u2.headers.get("Content-Type")) && void 0 !== r10 ? r10 : "text/plain").split(";")[0].trim();
              return { data: "application/json" === h2 ? yield u2.json() : "application/octet-stream" === h2 ? yield u2.blob() : "text/event-stream" === h2 ? u2 : "multipart/form-data" === h2 ? yield u2.formData() : yield u2.text(), error: null };
            } catch (e11) {
              return { data: null, error: e11 };
            }
          }, new (n2 || (n2 = Promise))(function(e11, t11) {
            function r11(e12) {
              try {
                l2(a2.next(e12));
              } catch (e13) {
                t11(e13);
              }
            }
            function o2(e12) {
              try {
                l2(a2.throw(e12));
              } catch (e13) {
                t11(e13);
              }
            }
            function l2(t12) {
              var i3;
              t12.done ? e11(t12.value) : ((i3 = t12.value) instanceof n2 ? i3 : new n2(function(e12) {
                e12(i3);
              })).then(r11, o2);
            }
            l2((a2 = a2.apply(i2, s2 || [])).next());
          });
        }
      }
      let { PostgrestClient: tO, PostgrestQueryBuilder: tE, PostgrestFilterBuilder: tP, PostgrestTransformBuilder: tC, PostgrestBuilder: tR, PostgrestError: tA } = r(174), tj = { "X-Client-Info": "realtime-js/2.11.2" };
      !function(e10) {
        e10[e10.connecting = 0] = "connecting", e10[e10.open = 1] = "open", e10[e10.closing = 2] = "closing", e10[e10.closed = 3] = "closed";
      }(n || (n = {})), function(e10) {
        e10.closed = "closed", e10.errored = "errored", e10.joined = "joined", e10.joining = "joining", e10.leaving = "leaving";
      }(a || (a = {})), function(e10) {
        e10.close = "phx_close", e10.error = "phx_error", e10.join = "phx_join", e10.reply = "phx_reply", e10.leave = "phx_leave", e10.access_token = "access_token";
      }(o || (o = {})), (l || (l = {})).websocket = "websocket", function(e10) {
        e10.Connecting = "connecting", e10.Open = "open", e10.Closing = "closing", e10.Closed = "closed";
      }(u || (u = {}));
      class tI {
        constructor() {
          this.HEADER_LENGTH = 1;
        }
        decode(e10, t10) {
          return e10.constructor === ArrayBuffer ? t10(this._binaryDecode(e10)) : "string" == typeof e10 ? t10(JSON.parse(e10)) : t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = new TextDecoder();
          return this._decodeBroadcast(e10, t10, r10);
        }
        _decodeBroadcast(e10, t10, r10) {
          let i2 = t10.getUint8(1), s2 = t10.getUint8(2), n2 = this.HEADER_LENGTH + 2, a2 = r10.decode(e10.slice(n2, n2 + i2));
          n2 += i2;
          let o2 = r10.decode(e10.slice(n2, n2 + s2));
          return n2 += s2, { ref: null, topic: a2, event: o2, payload: JSON.parse(r10.decode(e10.slice(n2, e10.byteLength))) };
        }
      }
      class tN {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0, this.callback = e10, this.timerCalc = t10;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }
      !function(e10) {
        e10.abstime = "abstime", e10.bool = "bool", e10.date = "date", e10.daterange = "daterange", e10.float4 = "float4", e10.float8 = "float8", e10.int2 = "int2", e10.int4 = "int4", e10.int4range = "int4range", e10.int8 = "int8", e10.int8range = "int8range", e10.json = "json", e10.jsonb = "jsonb", e10.money = "money", e10.numeric = "numeric", e10.oid = "oid", e10.reltime = "reltime", e10.text = "text", e10.time = "time", e10.timestamp = "timestamp", e10.timestamptz = "timestamptz", e10.timetz = "timetz", e10.tsrange = "tsrange", e10.tstzrange = "tstzrange";
      }(c || (c = {}));
      let tL = (e10, t10, r10 = {}) => {
        var i2;
        let s2 = null !== (i2 = r10.skipTypes) && void 0 !== i2 ? i2 : [];
        return Object.keys(t10).reduce((r11, i3) => (r11[i3] = t$(i3, e10, t10, s2), r11), {});
      }, t$ = (e10, t10, r10, i2) => {
        let s2 = t10.find((t11) => t11.name === e10), n2 = null == s2 ? void 0 : s2.type, a2 = r10[e10];
        return n2 && !i2.includes(n2) ? tM(n2, a2) : tD(a2);
      }, tM = (e10, t10) => {
        if ("_" === e10.charAt(0))
          return tV(t10, e10.slice(1, e10.length));
        switch (e10) {
          case c.bool:
            return tU(t10);
          case c.float4:
          case c.float8:
          case c.int2:
          case c.int4:
          case c.int8:
          case c.numeric:
          case c.oid:
            return tq(t10);
          case c.json:
          case c.jsonb:
            return tB(t10);
          case c.timestamp:
            return tz(t10);
          case c.abstime:
          case c.date:
          case c.daterange:
          case c.int4range:
          case c.int8range:
          case c.money:
          case c.reltime:
          case c.text:
          case c.time:
          case c.timestamptz:
          case c.timetz:
          case c.tsrange:
          case c.tstzrange:
          default:
            return tD(t10);
        }
      }, tD = (e10) => e10, tU = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, tq = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10))
            return t10;
        }
        return e10;
      }, tB = (e10) => {
        if ("string" == typeof e10)
          try {
            return JSON.parse(e10);
          } catch (e11) {
            console.log(`JSON parse error: ${e11}`);
          }
        return e10;
      }, tV = (e10, t10) => {
        if ("string" != typeof e10)
          return e10;
        let r10 = e10.length - 1, i2 = e10[r10];
        if ("{" === e10[0] && "}" === i2) {
          let i3;
          let s2 = e10.slice(1, r10);
          try {
            i3 = JSON.parse("[" + s2 + "]");
          } catch (e11) {
            i3 = s2 ? s2.split(",") : [];
          }
          return i3.map((e11) => tM(t10, e11));
        }
        return e10;
      }, tz = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, tF = (e10) => {
        let t10 = e10;
        return (t10 = (t10 = t10.replace(/^ws/i, "http")).replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "")).replace(/\/+$/, "");
      };
      class tG {
        constructor(e10, t10, r10 = {}, i2 = 1e4) {
          this.channel = e10, this.event = t10, this.payload = r10, this.timeout = i2, this.sent = false, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
        }
        resend(e10) {
          this.timeout = e10, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = false, this.send();
        }
        send() {
          this._hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload, ref: this.ref, join_ref: this.channel._joinRef() }));
        }
        updatePayload(e10) {
          this.payload = Object.assign(Object.assign({}, this.payload), e10);
        }
        receive(e10, t10) {
          var r10;
          return this._hasReceived(e10) && t10(null === (r10 = this.receivedResp) || void 0 === r10 ? void 0 : r10.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        startTimeout() {
          this.timeoutTimer || (this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref), this.channel._on(this.refEvent, {}, (e10) => {
            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = e10, this._matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout));
        }
        trigger(e10, t10) {
          this.refEvent && this.channel._trigger(this.refEvent, { status: e10, response: t10 });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
        }
        _matchReceive({ status: e10, response: t10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        _hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
      }
      !function(e10) {
        e10.SYNC = "sync", e10.JOIN = "join", e10.LEAVE = "leave";
      }(h || (h = {}));
      class tH {
        constructor(e10, t10) {
          this.channel = e10, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.caller = { onJoin: () => {
          }, onLeave: () => {
          }, onSync: () => {
          } };
          let r10 = (null == t10 ? void 0 : t10.events) || { state: "presence_state", diff: "presence_diff" };
          this.channel._on(r10.state, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: i2 } = this.caller;
            this.joinRef = this.channel._joinRef(), this.state = tH.syncState(this.state, e11, t11, r11), this.pendingDiffs.forEach((e12) => {
              this.state = tH.syncDiff(this.state, e12, t11, r11);
            }), this.pendingDiffs = [], i2();
          }), this.channel._on(r10.diff, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: i2 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(e11) : (this.state = tH.syncDiff(this.state, e11, t11, r11), i2());
          }), this.onJoin((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "join", key: e11, currentPresences: t11, newPresences: r11 });
          }), this.onLeave((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "leave", key: e11, currentPresences: t11, leftPresences: r11 });
          }), this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
          });
        }
        static syncState(e10, t10, r10, i2) {
          let s2 = this.cloneDeep(e10), n2 = this.transformState(t10), a2 = {}, o2 = {};
          return this.map(s2, (e11, t11) => {
            n2[e11] || (o2[e11] = t11);
          }), this.map(n2, (e11, t11) => {
            let r11 = s2[e11];
            if (r11) {
              let i3 = t11.map((e12) => e12.presence_ref), s3 = r11.map((e12) => e12.presence_ref), n3 = t11.filter((e12) => 0 > s3.indexOf(e12.presence_ref)), l2 = r11.filter((e12) => 0 > i3.indexOf(e12.presence_ref));
              n3.length > 0 && (a2[e11] = n3), l2.length > 0 && (o2[e11] = l2);
            } else
              a2[e11] = t11;
          }), this.syncDiff(s2, { joins: a2, leaves: o2 }, r10, i2);
        }
        static syncDiff(e10, t10, r10, i2) {
          let { joins: s2, leaves: n2 } = { joins: this.transformState(t10.joins), leaves: this.transformState(t10.leaves) };
          return r10 || (r10 = () => {
          }), i2 || (i2 = () => {
          }), this.map(s2, (t11, i3) => {
            var s3;
            let n3 = null !== (s3 = e10[t11]) && void 0 !== s3 ? s3 : [];
            if (e10[t11] = this.cloneDeep(i3), n3.length > 0) {
              let r11 = e10[t11].map((e11) => e11.presence_ref), i4 = n3.filter((e11) => 0 > r11.indexOf(e11.presence_ref));
              e10[t11].unshift(...i4);
            }
            r10(t11, n3, i3);
          }), this.map(n2, (t11, r11) => {
            let s3 = e10[t11];
            if (!s3)
              return;
            let n3 = r11.map((e11) => e11.presence_ref);
            s3 = s3.filter((e11) => 0 > n3.indexOf(e11.presence_ref)), e10[t11] = s3, i2(t11, s3, r11), 0 === s3.length && delete e10[t11];
          }), e10;
        }
        static map(e10, t10) {
          return Object.getOwnPropertyNames(e10).map((r10) => t10(r10, e10[r10]));
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = this.cloneDeep(e10)).reduce((t10, r10) => {
            let i2 = e10[r10];
            return "metas" in i2 ? t10[r10] = i2.metas.map((e11) => (e11.presence_ref = e11.phx_ref, delete e11.phx_ref, delete e11.phx_ref_prev, e11)) : t10[r10] = i2, t10;
          }, {});
        }
        static cloneDeep(e10) {
          return JSON.parse(JSON.stringify(e10));
        }
        onJoin(e10) {
          this.caller.onJoin = e10;
        }
        onLeave(e10) {
          this.caller.onLeave = e10;
        }
        onSync(e10) {
          this.caller.onSync = e10;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      !function(e10) {
        e10.ALL = "*", e10.INSERT = "INSERT", e10.UPDATE = "UPDATE", e10.DELETE = "DELETE";
      }(d || (d = {})), function(e10) {
        e10.BROADCAST = "broadcast", e10.PRESENCE = "presence", e10.POSTGRES_CHANGES = "postgres_changes", e10.SYSTEM = "system";
      }(p || (p = {})), function(e10) {
        e10.SUBSCRIBED = "SUBSCRIBED", e10.TIMED_OUT = "TIMED_OUT", e10.CLOSED = "CLOSED", e10.CHANNEL_ERROR = "CHANNEL_ERROR";
      }(f || (f = {}));
      class tW {
        constructor(e10, t10 = { config: {} }, r10) {
          this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.state = a.closed, this.joinedOnce = false, this.pushBuffer = [], this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "" }, private: false }, t10.config), this.timeout = this.socket.timeout, this.joinPush = new tG(this, o.join, this.params, this.timeout), this.rejoinTimer = new tN(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
            this.state = a.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this._onClose(() => {
            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = a.closed, this.socket._remove(this);
          }), this._onError((e11) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e11), this.state = a.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("timeout", () => {
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = a.errored, this.rejoinTimer.scheduleTimeout());
          }), this._on(o.reply, {}, (e11, t11) => {
            this._trigger(this._replyEventName(t11), e11);
          }), this.presence = new tH(this), this.broadcastEndpointURL = tF(this.socket.endPoint) + "/api/broadcast", this.private = this.params.config.private || false;
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, i2;
          if (this.socket.isConnected() || this.socket.connect(), this.joinedOnce)
            throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
          {
            let { config: { broadcast: s2, presence: n2, private: a2 } } = this.params;
            this._onError((t11) => null == e10 ? void 0 : e10(f.CHANNEL_ERROR, t11)), this._onClose(() => null == e10 ? void 0 : e10(f.CLOSED));
            let o2 = {}, l2 = { broadcast: s2, presence: n2, postgres_changes: null !== (i2 = null === (r10 = this.bindings.postgres_changes) || void 0 === r10 ? void 0 : r10.map((e11) => e11.filter)) && void 0 !== i2 ? i2 : [], private: a2 };
            this.socket.accessTokenValue && (o2.access_token = this.socket.accessTokenValue), this.updateJoinPayload(Object.assign({ config: l2 }, o2)), this.joinedOnce = true, this._rejoin(t10), this.joinPush.receive("ok", async ({ postgres_changes: t11 }) => {
              var r11;
              if (this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(f.SUBSCRIBED);
                return;
              }
              {
                let i3 = this.bindings.postgres_changes, s3 = null !== (r11 = null == i3 ? void 0 : i3.length) && void 0 !== r11 ? r11 : 0, n3 = [];
                for (let r12 = 0; r12 < s3; r12++) {
                  let s4 = i3[r12], { filter: { event: a3, schema: o3, table: l3, filter: u2 } } = s4, c2 = t11 && t11[r12];
                  if (c2 && c2.event === a3 && c2.schema === o3 && c2.table === l3 && c2.filter === u2)
                    n3.push(Object.assign(Object.assign({}, s4), { id: c2.id }));
                  else {
                    this.unsubscribe(), null == e10 || e10(f.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
                    return;
                  }
                }
                this.bindings.postgres_changes = n3, e10 && e10(f.SUBSCRIBED);
                return;
              }
            }).receive("error", (t11) => {
              null == e10 || e10(f.CHANNEL_ERROR, Error(JSON.stringify(Object.values(t11).join(", ") || "error")));
            }).receive("timeout", () => {
              null == e10 || e10(f.TIMED_OUT);
            });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10.timeout || this.timeout);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          return this._on(e10, t10, r10);
        }
        async send(e10, t10 = {}) {
          var r10, i2;
          if (this._canPush() || "broadcast" !== e10.type)
            return new Promise((r11) => {
              var i3, s2, n2;
              let a2 = this._push(e10.type, e10, t10.timeout || this.timeout);
              "broadcast" !== e10.type || (null === (n2 = null === (s2 = null === (i3 = this.params) || void 0 === i3 ? void 0 : i3.config) || void 0 === s2 ? void 0 : s2.broadcast) || void 0 === n2 ? void 0 : n2.ack) || r11("ok"), a2.receive("ok", () => r11("ok")), a2.receive("error", () => r11("error")), a2.receive("timeout", () => r11("timed out"));
            });
          {
            let { event: s2, payload: n2 } = e10, a2 = { method: "POST", headers: { Authorization: this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "", apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: s2, payload: n2, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, a2, null !== (r10 = t10.timeout) && void 0 !== r10 ? r10 : this.timeout);
              return await (null === (i2 = e11.body) || void 0 === i2 ? void 0 : i2.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if ("AbortError" === e11.name)
                return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.joinPush.updatePayload(e10);
        }
        unsubscribe(e10 = this.timeout) {
          this.state = a.leaving;
          let t10 = () => {
            this.socket.log("channel", `leave ${this.topic}`), this._trigger(o.close, "leave", this._joinRef());
          };
          return this.rejoinTimer.reset(), this.joinPush.destroy(), new Promise((r10) => {
            let i2 = new tG(this, o.leave, {}, e10);
            i2.receive("ok", () => {
              t10(), r10("ok");
            }).receive("timeout", () => {
              t10(), r10("timed out");
            }).receive("error", () => {
              r10("error");
            }), i2.send(), this._canPush() || i2.trigger("ok", {});
          });
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let i2 = new AbortController(), s2 = setTimeout(() => i2.abort(), r10), n2 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: i2.signal }));
          return clearTimeout(s2), n2;
        }
        _push(e10, t10, r10 = this.timeout) {
          if (!this.joinedOnce)
            throw `tried to push '${e10}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let i2 = new tG(this, e10, t10, r10);
          return this._canPush() ? i2.send() : (i2.startTimeout(), this.pushBuffer.push(i2)), i2;
        }
        _onMessage(e10, t10, r10) {
          return t10;
        }
        _isMember(e10) {
          return this.topic === e10;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e10, t10, r10) {
          var i2, s2;
          let n2 = e10.toLocaleLowerCase(), { close: a2, error: l2, leave: u2, join: c2 } = o;
          if (r10 && [a2, l2, u2, c2].indexOf(n2) >= 0 && r10 !== this._joinRef())
            return;
          let h2 = this._onMessage(n2, t10, r10);
          if (t10 && !h2)
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(n2) ? null === (i2 = this.bindings.postgres_changes) || void 0 === i2 || i2.filter((e11) => {
            var t11, r11, i3;
            return (null === (t11 = e11.filter) || void 0 === t11 ? void 0 : t11.event) === "*" || (null === (i3 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event) || void 0 === i3 ? void 0 : i3.toLocaleLowerCase()) === n2;
          }).map((e11) => e11.callback(h2, r10)) : null === (s2 = this.bindings[n2]) || void 0 === s2 || s2.filter((e11) => {
            var r11, i3, s3, a3, o2, l3;
            if (!["broadcast", "presence", "postgres_changes"].includes(n2))
              return e11.type.toLocaleLowerCase() === n2;
            if ("id" in e11) {
              let n3 = e11.id, a4 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event;
              return n3 && (null === (i3 = t10.ids) || void 0 === i3 ? void 0 : i3.includes(n3)) && ("*" === a4 || (null == a4 ? void 0 : a4.toLocaleLowerCase()) === (null === (s3 = t10.data) || void 0 === s3 ? void 0 : s3.type.toLocaleLowerCase()));
            }
            {
              let r12 = null === (o2 = null === (a3 = null == e11 ? void 0 : e11.filter) || void 0 === a3 ? void 0 : a3.event) || void 0 === o2 ? void 0 : o2.toLocaleLowerCase();
              return "*" === r12 || r12 === (null === (l3 = null == t10 ? void 0 : t10.event) || void 0 === l3 ? void 0 : l3.toLocaleLowerCase());
            }
          }).map((e11) => {
            if ("object" == typeof h2 && "ids" in h2) {
              let e12 = h2.data, { schema: t11, table: r11, commit_timestamp: i3, type: s3, errors: n3 } = e12;
              h2 = Object.assign(Object.assign({}, { schema: t11, table: r11, commit_timestamp: i3, eventType: s3, new: {}, old: {}, errors: n3 }), this._getPayloadRecords(e12));
            }
            e11.callback(h2, r10);
          });
        }
        _isClosed() {
          return this.state === a.closed;
        }
        _isJoined() {
          return this.state === a.joined;
        }
        _isJoining() {
          return this.state === a.joining;
        }
        _isLeaving() {
          return this.state === a.leaving;
        }
        _replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        _on(e10, t10, r10) {
          let i2 = e10.toLocaleLowerCase(), s2 = { type: i2, filter: t10, callback: r10 };
          return this.bindings[i2] ? this.bindings[i2].push(s2) : this.bindings[i2] = [s2], this;
        }
        _off(e10, t10) {
          let r10 = e10.toLocaleLowerCase();
          return this.bindings[r10] = this.bindings[r10].filter((e11) => {
            var i2;
            return !((null === (i2 = e11.type) || void 0 === i2 ? void 0 : i2.toLocaleLowerCase()) === r10 && tW.isEqual(e11.filter, t10));
          }), this;
        }
        static isEqual(e10, t10) {
          if (Object.keys(e10).length !== Object.keys(t10).length)
            return false;
          for (let r10 in e10)
            if (e10[r10] !== t10[r10])
              return false;
          return true;
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
        }
        _onClose(e10) {
          this._on(o.close, {}, e10);
        }
        _onError(e10) {
          this._on(o.error, {}, (t10) => e10(t10));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e10 = this.timeout) {
          this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = a.joining, this.joinPush.resend(e10));
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = tL(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = tL(e10.columns, e10.old_record)), t10;
        }
      }
      let tK = () => {
      }, tJ = "undefined" != typeof WebSocket, tX = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class tY {
        constructor(e10, t10) {
          var i2;
          this.accessTokenValue = null, this.apiKey = null, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = tj, this.params = {}, this.timeout = 1e4, this.heartbeatIntervalMs = 3e4, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = tK, this.conn = null, this.sendBuffer = [], this.serializer = new tI(), this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.accessToken = null, this._resolveFetch = (e11) => {
            let t11;
            return e11 ? t11 = e11 : "undefined" == typeof fetch ? t11 = (...e12) => Promise.resolve().then(r.bind(r, 608)).then(({ default: t12 }) => t12(...e12)) : t11 = fetch, (...e12) => t11(...e12);
          }, this.endPoint = `${e10}/${l.websocket}`, this.httpEndpoint = tF(e10), (null == t10 ? void 0 : t10.transport) ? this.transport = t10.transport : this.transport = null, (null == t10 ? void 0 : t10.params) && (this.params = t10.params), (null == t10 ? void 0 : t10.headers) && (this.headers = Object.assign(Object.assign({}, this.headers), t10.headers)), (null == t10 ? void 0 : t10.timeout) && (this.timeout = t10.timeout), (null == t10 ? void 0 : t10.logger) && (this.logger = t10.logger), (null == t10 ? void 0 : t10.heartbeatIntervalMs) && (this.heartbeatIntervalMs = t10.heartbeatIntervalMs);
          let s2 = null === (i2 = null == t10 ? void 0 : t10.params) || void 0 === i2 ? void 0 : i2.apikey;
          if (s2 && (this.accessTokenValue = s2, this.apiKey = s2), this.reconnectAfterMs = (null == t10 ? void 0 : t10.reconnectAfterMs) ? t10.reconnectAfterMs : (e11) => [1e3, 2e3, 5e3, 1e4][e11 - 1] || 1e4, this.encode = (null == t10 ? void 0 : t10.encode) ? t10.encode : (e11, t11) => t11(JSON.stringify(e11)), this.decode = (null == t10 ? void 0 : t10.decode) ? t10.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new tN(async () => {
            this.disconnect(), this.connect();
          }, this.reconnectAfterMs), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch), null == t10 ? void 0 : t10.worker) {
            if ("undefined" != typeof window && !window.Worker)
              throw Error("Web Worker is not supported");
            this.worker = (null == t10 ? void 0 : t10.worker) || false, this.workerUrl = null == t10 ? void 0 : t10.workerUrl;
          }
          this.accessToken = (null == t10 ? void 0 : t10.accessToken) || null;
        }
        connect() {
          if (!this.conn) {
            if (this.transport) {
              this.conn = new this.transport(this.endpointURL(), void 0, { headers: this.headers });
              return;
            }
            if (tJ) {
              this.conn = new WebSocket(this.endpointURL()), this.setupConnection();
              return;
            }
            this.conn = new tQ(this.endpointURL(), void 0, { close: () => {
              this.conn = null;
            } }), Promise.resolve().then(r.t.bind(r, 392, 23)).then(({ default: e10 }) => {
              this.conn = new e10(this.endpointURL(), void 0, { headers: this.headers }), this.setupConnection();
            });
          }
        }
        endpointURL() {
          return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: "1.0.0" }));
        }
        disconnect(e10, t10) {
          this.conn && (this.conn.onclose = function() {
          }, e10 ? this.conn.close(e10, null != t10 ? t10 : "") : this.conn.close(), this.conn = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset());
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return 0 === this.channels.length && this.disconnect(), t10;
        }
        async removeAllChannels() {
          let e10 = await Promise.all(this.channels.map((e11) => e11.unsubscribe()));
          return this.disconnect(), e10;
        }
        log(e10, t10, r10) {
          this.logger(e10, t10, r10);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case n.connecting:
              return u.Connecting;
            case n.open:
              return u.Open;
            case n.closing:
              return u.Closing;
            default:
              return u.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === u.Open;
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = new tW(`realtime:${e10}`, t10, this);
          return this.channels.push(r10), r10;
        }
        push(e10) {
          let { topic: t10, event: r10, payload: i2, ref: s2 } = e10, n2 = () => {
            this.encode(e10, (e11) => {
              var t11;
              null === (t11 = this.conn) || void 0 === t11 || t11.send(e11);
            });
          };
          this.log("push", `${t10} ${r10} (${s2})`, i2), this.isConnected() ? n2() : this.sendBuffer.push(n2);
        }
        async setAuth(e10 = null) {
          let t10 = e10 || this.accessToken && await this.accessToken() || this.accessTokenValue;
          if (t10) {
            let e11 = null;
            try {
              e11 = JSON.parse(atob(t10.split(".")[1]));
            } catch (e12) {
            }
            if (e11 && e11.exp && !(Math.floor(Date.now() / 1e3) - e11.exp < 0))
              return this.log("auth", `InvalidJWTToken: Invalid value for JWT claim "exp" with value ${e11.exp}`), Promise.reject(`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${e11.exp}`);
            this.accessTokenValue = t10, this.channels.forEach((e12) => {
              t10 && e12.updateJoinPayload({ access_token: t10 }), e12.joinedOnce && e12._isJoined() && e12._push(o.access_token, { access_token: t10 });
            });
          }
        }
        async sendHeartbeat() {
          var e10;
          if (this.isConnected()) {
            if (this.pendingHeartbeatRef) {
              this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), null === (e10 = this.conn) || void 0 === e10 || e10.close(1e3, "hearbeat timeout");
              return;
            }
            this.pendingHeartbeatRef = this._makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef }), this.setAuth();
          }
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        _makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        _leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11._isJoined() || t11._isJoining()));
          t10 && (this.log("transport", `leaving duplicate topic "${e10}"`), t10.unsubscribe());
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10._joinRef() !== e10._joinRef());
        }
        setupConnection() {
          this.conn && (this.conn.binaryType = "arraybuffer", this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e10) => this._onConnError(e10), this.conn.onmessage = (e10) => this._onConnMessage(e10), this.conn.onclose = (e10) => this._onConnClose(e10));
        }
        _onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            let { topic: t10, event: r10, payload: i2, ref: s2 } = e11;
            s2 && s2 === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null), this.log("receive", `${i2.status || ""} ${t10} ${r10} ${s2 && "(" + s2 + ")" || ""}`, i2), this.channels.filter((e12) => e12._isMember(t10)).forEach((e12) => e12._trigger(r10, i2, s2)), this.stateChangeCallbacks.message.forEach((t11) => t11(e11));
          });
        }
        async _onConnOpen() {
          if (this.log("transport", `connected to ${this.endpointURL()}`), this.flushSendBuffer(), this.reconnectTimer.reset(), this.worker) {
            this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
            let e10 = this._workerObjectUrl(this.workerUrl);
            this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
              this.log("worker", "worker error", e11.message), this.workerRef.terminate();
            }, this.workerRef.onmessage = (e11) => {
              "keepAlive" === e11.data.event && this.sendHeartbeat();
            }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
          } else
            this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
          this.stateChangeCallbacks.open.forEach((e10) => e10());
        }
        _onConnClose(e10) {
          this.log("transport", "close", e10), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t10) => t10(e10));
        }
        _onConnError(e10) {
          this.log("transport", e10.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t10) => t10(e10));
        }
        _triggerChanError() {
          this.channels.forEach((e10) => e10._trigger(o.error));
        }
        _appendParams(e10, t10) {
          if (0 === Object.keys(t10).length)
            return e10;
          let r10 = e10.match(/\?/) ? "&" : "?", i2 = new URLSearchParams(t10);
          return `${e10}${r10}${i2}`;
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10)
            t10 = e10;
          else {
            let e11 = new Blob([tX], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
      }
      class tQ {
        constructor(e10, t10, r10) {
          this.binaryType = "arraybuffer", this.onclose = () => {
          }, this.onerror = () => {
          }, this.onmessage = () => {
          }, this.onopen = () => {
          }, this.readyState = n.connecting, this.send = () => {
          }, this.url = null, this.url = e10, this.close = r10.close;
        }
      }
      class tZ extends Error {
        constructor(e10) {
          super(e10), this.__isStorageError = true, this.name = "StorageError";
        }
      }
      function t0(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      class t1 extends tZ {
        constructor(e10, t10) {
          super(e10), this.name = "StorageApiError", this.status = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status };
        }
      }
      class t2 extends tZ {
        constructor(e10, t10) {
          super(e10), this.name = "StorageUnknownError", this.originalError = t10;
        }
      }
      let t3 = (e10) => {
        let t10;
        return e10 ? t10 = e10 : "undefined" == typeof fetch ? t10 = (...e11) => Promise.resolve().then(r.bind(r, 608)).then(({ default: t11 }) => t11(...e11)) : t10 = fetch, (...e11) => t10(...e11);
      }, t6 = () => function(e10, t10, r10, i2) {
        return new (r10 || (r10 = Promise))(function(s2, n2) {
          function a2(e11) {
            try {
              l2(i2.next(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function o2(e11) {
            try {
              l2(i2.throw(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function l2(e11) {
            var t11;
            e11.done ? s2(e11.value) : ((t11 = e11.value) instanceof r10 ? t11 : new r10(function(e12) {
              e12(t11);
            })).then(a2, o2);
          }
          l2((i2 = i2.apply(e10, t10 || [])).next());
        });
      }(void 0, void 0, void 0, function* () {
        return "undefined" == typeof Response ? (yield Promise.resolve().then(r.bind(r, 608))).Response : Response;
      }), t4 = (e10) => {
        if (Array.isArray(e10))
          return e10.map((e11) => t4(e11));
        if ("function" == typeof e10 || e10 !== Object(e10))
          return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = t4(r10);
        }), t10;
      };
      var t5 = function(e10, t10, r10, i2) {
        return new (r10 || (r10 = Promise))(function(s2, n2) {
          function a2(e11) {
            try {
              l2(i2.next(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function o2(e11) {
            try {
              l2(i2.throw(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function l2(e11) {
            var t11;
            e11.done ? s2(e11.value) : ((t11 = e11.value) instanceof r10 ? t11 : new r10(function(e12) {
              e12(t11);
            })).then(a2, o2);
          }
          l2((i2 = i2.apply(e10, t10 || [])).next());
        });
      };
      let t9 = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), t8 = (e10, t10, r10) => t5(void 0, void 0, void 0, function* () {
        e10 instanceof (yield t6()) && !(null == r10 ? void 0 : r10.noResolveJson) ? e10.json().then((r11) => {
          t10(new t1(t9(r11), e10.status || 500));
        }).catch((e11) => {
          t10(new t2(t9(e11), e11));
        }) : t10(new t2(t9(e10), e10));
      }), t7 = (e10, t10, r10, i2) => {
        let s2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" === e10 ? s2 : (s2.headers = Object.assign({ "Content-Type": "application/json" }, null == t10 ? void 0 : t10.headers), i2 && (s2.body = JSON.stringify(i2)), Object.assign(Object.assign({}, s2), r10));
      };
      function re(e10, t10, r10, i2, s2, n2) {
        return t5(this, void 0, void 0, function* () {
          return new Promise((a2, o2) => {
            e10(r10, t7(t10, i2, s2, n2)).then((e11) => {
              if (!e11.ok)
                throw e11;
              return (null == i2 ? void 0 : i2.noResolveJson) ? e11 : e11.json();
            }).then((e11) => a2(e11)).catch((e11) => t8(e11, o2, i2));
          });
        });
      }
      function rt(e10, t10, r10, i2) {
        return t5(this, void 0, void 0, function* () {
          return re(e10, "GET", t10, r10, i2);
        });
      }
      function rr(e10, t10, r10, i2, s2) {
        return t5(this, void 0, void 0, function* () {
          return re(e10, "POST", t10, i2, s2, r10);
        });
      }
      function ri(e10, t10, r10, i2, s2) {
        return t5(this, void 0, void 0, function* () {
          return re(e10, "DELETE", t10, i2, s2, r10);
        });
      }
      var rs = r(356).Buffer, rn = function(e10, t10, r10, i2) {
        return new (r10 || (r10 = Promise))(function(s2, n2) {
          function a2(e11) {
            try {
              l2(i2.next(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function o2(e11) {
            try {
              l2(i2.throw(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function l2(e11) {
            var t11;
            e11.done ? s2(e11.value) : ((t11 = e11.value) instanceof r10 ? t11 : new r10(function(e12) {
              e12(t11);
            })).then(a2, o2);
          }
          l2((i2 = i2.apply(e10, t10 || [])).next());
        });
      };
      let ra = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, ro = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      class rl {
        constructor(e10, t10 = {}, r10, i2) {
          this.url = e10, this.headers = t10, this.bucketId = r10, this.fetch = t3(i2);
        }
        uploadOrUpdate(e10, t10, r10, i2) {
          return rn(this, void 0, void 0, function* () {
            try {
              let s2;
              let n2 = Object.assign(Object.assign({}, ro), i2), a2 = Object.assign(Object.assign({}, this.headers), "POST" === e10 && { "x-upsert": String(n2.upsert) }), o2 = n2.metadata;
              "undefined" != typeof Blob && r10 instanceof Blob ? ((s2 = new FormData()).append("cacheControl", n2.cacheControl), o2 && s2.append("metadata", this.encodeMetadata(o2)), s2.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? ((s2 = r10).append("cacheControl", n2.cacheControl), o2 && s2.append("metadata", this.encodeMetadata(o2))) : (s2 = r10, a2["cache-control"] = `max-age=${n2.cacheControl}`, a2["content-type"] = n2.contentType, o2 && (a2["x-metadata"] = this.toBase64(this.encodeMetadata(o2)))), (null == i2 ? void 0 : i2.headers) && (a2 = Object.assign(Object.assign({}, a2), i2.headers));
              let l2 = this._removeEmptyFolders(t10), u2 = this._getFinalPath(l2), c2 = yield this.fetch(`${this.url}/object/${u2}`, Object.assign({ method: e10, body: s2, headers: a2 }, (null == n2 ? void 0 : n2.duplex) ? { duplex: n2.duplex } : {})), h2 = yield c2.json();
              if (c2.ok)
                return { data: { path: l2, id: h2.Id, fullPath: h2.Key }, error: null };
              return { data: null, error: h2 };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        upload(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("POST", e10, t10, r10);
          });
        }
        uploadToSignedUrl(e10, t10, r10, i2) {
          return rn(this, void 0, void 0, function* () {
            let s2 = this._removeEmptyFolders(e10), n2 = this._getFinalPath(s2), a2 = new URL(this.url + `/object/upload/sign/${n2}`);
            a2.searchParams.set("token", t10);
            try {
              let e11;
              let t11 = Object.assign({ upsert: ro.upsert }, i2), n3 = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(t11.upsert) });
              "undefined" != typeof Blob && r10 instanceof Blob ? ((e11 = new FormData()).append("cacheControl", t11.cacheControl), e11.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? (e11 = r10).append("cacheControl", t11.cacheControl) : (e11 = r10, n3["cache-control"] = `max-age=${t11.cacheControl}`, n3["content-type"] = t11.contentType);
              let o2 = yield this.fetch(a2.toString(), { method: "PUT", body: e11, headers: n3 }), l2 = yield o2.json();
              if (o2.ok)
                return { data: { path: s2, fullPath: l2.Key }, error: null };
              return { data: null, error: l2 };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        createSignedUploadUrl(e10, t10) {
          return rn(this, void 0, void 0, function* () {
            try {
              let r10 = this._getFinalPath(e10), i2 = Object.assign({}, this.headers);
              (null == t10 ? void 0 : t10.upsert) && (i2["x-upsert"] = "true");
              let s2 = yield rr(this.fetch, `${this.url}/object/upload/sign/${r10}`, {}, { headers: i2 }), n2 = new URL(this.url + s2.url), a2 = n2.searchParams.get("token");
              if (!a2)
                throw new tZ("No token returned by API");
              return { data: { signedUrl: n2.toString(), path: e10, token: a2 }, error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        update(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("PUT", e10, t10, r10);
          });
        }
        move(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            try {
              return { data: yield rr(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        copy(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            try {
              return { data: { path: (yield rr(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers })).Key }, error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        createSignedUrl(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            try {
              let i2 = this._getFinalPath(e10), s2 = yield rr(this.fetch, `${this.url}/object/sign/${i2}`, Object.assign({ expiresIn: t10 }, (null == r10 ? void 0 : r10.transform) ? { transform: r10.transform } : {}), { headers: this.headers }), n2 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
              return { data: s2 = { signedUrl: encodeURI(`${this.url}${s2.signedURL}${n2}`) }, error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        createSignedUrls(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            try {
              let i2 = yield rr(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: this.headers }), s2 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
              return { data: i2.map((e11) => Object.assign(Object.assign({}, e11), { signedUrl: e11.signedURL ? encodeURI(`${this.url}${e11.signedURL}${s2}`) : null })), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        download(e10, t10) {
          return rn(this, void 0, void 0, function* () {
            let r10 = void 0 !== (null == t10 ? void 0 : t10.transform), i2 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {}), s2 = i2 ? `?${i2}` : "";
            try {
              let t11 = this._getFinalPath(e10), i3 = yield rt(this.fetch, `${this.url}/${r10 ? "render/image/authenticated" : "object"}/${t11}${s2}`, { headers: this.headers, noResolveJson: true });
              return { data: yield i3.blob(), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        info(e10) {
          return rn(this, void 0, void 0, function* () {
            let t10 = this._getFinalPath(e10);
            try {
              let e11 = yield rt(this.fetch, `${this.url}/object/info/${t10}`, { headers: this.headers });
              return { data: t4(e11), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        exists(e10) {
          return rn(this, void 0, void 0, function* () {
            let t10 = this._getFinalPath(e10);
            try {
              return yield function(e11, t11, r10, i2) {
                return t5(this, void 0, void 0, function* () {
                  return re(e11, "HEAD", t11, Object.assign(Object.assign({}, r10), { noResolveJson: true }), void 0);
                });
              }(this.fetch, `${this.url}/object/${t10}`, { headers: this.headers }), { data: true, error: null };
            } catch (e11) {
              if (t0(e11) && e11 instanceof t2) {
                let t11 = e11.originalError;
                if ([400, 404].includes(null == t11 ? void 0 : t11.status))
                  return { data: false, error: e11 };
              }
              throw e11;
            }
          });
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), i2 = [], s2 = (null == t10 ? void 0 : t10.download) ? `download=${true === t10.download ? "" : t10.download}` : "";
          "" !== s2 && i2.push(s2);
          let n2 = void 0 !== (null == t10 ? void 0 : t10.transform), a2 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {});
          "" !== a2 && i2.push(a2);
          let o2 = i2.join("&");
          return "" !== o2 && (o2 = `?${o2}`), { data: { publicUrl: encodeURI(`${this.url}/${n2 ? "render/image" : "object"}/public/${r10}${o2}`) } };
        }
        remove(e10) {
          return rn(this, void 0, void 0, function* () {
            try {
              return { data: yield ri(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e10 }, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        list(e10, t10, r10) {
          return rn(this, void 0, void 0, function* () {
            try {
              let i2 = Object.assign(Object.assign(Object.assign({}, ra), t10), { prefix: e10 || "" });
              return { data: yield rr(this.fetch, `${this.url}/object/list/${this.bucketId}`, i2, { headers: this.headers }, r10), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== rs ? rs.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e10) {
          let t10 = [];
          return e10.width && t10.push(`width=${e10.width}`), e10.height && t10.push(`height=${e10.height}`), e10.resize && t10.push(`resize=${e10.resize}`), e10.format && t10.push(`format=${e10.format}`), e10.quality && t10.push(`quality=${e10.quality}`), t10.join("&");
        }
      }
      let ru = { "X-Client-Info": "storage-js/2.7.1" };
      var rc = function(e10, t10, r10, i2) {
        return new (r10 || (r10 = Promise))(function(s2, n2) {
          function a2(e11) {
            try {
              l2(i2.next(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function o2(e11) {
            try {
              l2(i2.throw(e11));
            } catch (e12) {
              n2(e12);
            }
          }
          function l2(e11) {
            var t11;
            e11.done ? s2(e11.value) : ((t11 = e11.value) instanceof r10 ? t11 : new r10(function(e12) {
              e12(t11);
            })).then(a2, o2);
          }
          l2((i2 = i2.apply(e10, t10 || [])).next());
        });
      };
      class rh {
        constructor(e10, t10 = {}, r10) {
          this.url = e10, this.headers = Object.assign(Object.assign({}, ru), t10), this.fetch = t3(r10);
        }
        listBuckets() {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield rt(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
            } catch (e10) {
              if (t0(e10))
                return { data: null, error: e10 };
              throw e10;
            }
          });
        }
        getBucket(e10) {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield rt(this.fetch, `${this.url}/bucket/${e10}`, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        createBucket(e10, t10 = { public: false }) {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield rr(this.fetch, `${this.url}/bucket`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        updateBucket(e10, t10) {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield function(e11, t11, r10, i2, s2) {
                return t5(this, void 0, void 0, function* () {
                  return re(e11, "PUT", t11, i2, void 0, r10);
                });
              }(this.fetch, `${this.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        emptyBucket(e10) {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield rr(this.fetch, `${this.url}/bucket/${e10}/empty`, {}, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        deleteBucket(e10) {
          return rc(this, void 0, void 0, function* () {
            try {
              return { data: yield ri(this.fetch, `${this.url}/bucket/${e10}`, {}, { headers: this.headers }), error: null };
            } catch (e11) {
              if (t0(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
      }
      class rd extends rh {
        constructor(e10, t10 = {}, r10) {
          super(e10, t10, r10);
        }
        from(e10) {
          return new rl(this.url, this.headers, e10, this.fetch);
        }
      }
      let rp = "";
      "undefined" != typeof Deno ? rp = "deno" : "undefined" != typeof document ? rp = "web" : "undefined" != typeof navigator && "ReactNative" === navigator.product ? rp = "react-native" : rp = "node";
      let rf = { headers: { "X-Client-Info": `supabase-js-${rp}/2.48.1` } }, rg = { schema: "public" }, rv = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, rm = {};
      var rb = r(608);
      let rw = (e10) => {
        let t10;
        return e10 ? t10 = e10 : "undefined" == typeof fetch ? t10 = rb.default : t10 = fetch, (...e11) => t10(...e11);
      }, ry = () => "undefined" == typeof Headers ? rb.Headers : Headers, r_ = (e10, t10, r10) => {
        let i2 = rw(r10), s2 = ry();
        return (r11, n2) => function(e11, t11, r12, i3) {
          return new (r12 || (r12 = Promise))(function(s3, n3) {
            function a2(e12) {
              try {
                l2(i3.next(e12));
              } catch (e13) {
                n3(e13);
              }
            }
            function o2(e12) {
              try {
                l2(i3.throw(e12));
              } catch (e13) {
                n3(e13);
              }
            }
            function l2(e12) {
              var t12;
              e12.done ? s3(e12.value) : ((t12 = e12.value) instanceof r12 ? t12 : new r12(function(e13) {
                e13(t12);
              })).then(a2, o2);
            }
            l2((i3 = i3.apply(e11, t11 || [])).next());
          });
        }(void 0, void 0, void 0, function* () {
          var a2;
          let o2 = null !== (a2 = yield t10()) && void 0 !== a2 ? a2 : e10, l2 = new s2(null == n2 ? void 0 : n2.headers);
          return l2.has("apikey") || l2.set("apikey", e10), l2.has("Authorization") || l2.set("Authorization", `Bearer ${o2}`), i2(r11, Object.assign(Object.assign({}, n2), { headers: l2 }));
        });
      }, rS = "2.67.3", rk = { "X-Client-Info": `gotrue-js/${rS}` }, rx = "X-Supabase-Api-Version", rT = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, rO = () => "undefined" != typeof window && "undefined" != typeof document, rE = { tested: false, writable: false }, rP = () => {
        if (!rO())
          return false;
        try {
          if ("object" != typeof globalThis.localStorage)
            return false;
        } catch (e11) {
          return false;
        }
        if (rE.tested)
          return rE.writable;
        let e10 = `lswt-${Math.random()}${Math.random()}`;
        try {
          globalThis.localStorage.setItem(e10, e10), globalThis.localStorage.removeItem(e10), rE.tested = true, rE.writable = true;
        } catch (e11) {
          rE.tested = true, rE.writable = false;
        }
        return rE.writable;
      }, rC = (e10) => {
        let t10;
        return e10 ? t10 = e10 : "undefined" == typeof fetch ? t10 = (...e11) => Promise.resolve().then(r.bind(r, 608)).then(({ default: t11 }) => t11(...e11)) : t10 = fetch, (...e11) => t10(...e11);
      }, rR = (e10) => "object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json, rA = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, rj = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10)
          return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return r10;
        }
      }, rI = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class rN {
        constructor() {
          this.promise = new rN.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function rL(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length)
          throw Error("JWT is not valid: not a JWT structure");
        if (!/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i.test(t10[1]))
          throw Error("JWT is not valid: payload is not in base64url format");
        return JSON.parse(function(e11) {
          let t11, r10, i2, s2, n2, a2, o2;
          let l2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", u2 = "", c2 = 0;
          for (e11 = e11.replace("-", "+").replace("_", "/"); c2 < e11.length; )
            s2 = l2.indexOf(e11.charAt(c2++)), n2 = l2.indexOf(e11.charAt(c2++)), a2 = l2.indexOf(e11.charAt(c2++)), o2 = l2.indexOf(e11.charAt(c2++)), t11 = s2 << 2 | n2 >> 4, r10 = (15 & n2) << 4 | a2 >> 2, i2 = (3 & a2) << 6 | o2, u2 += String.fromCharCode(t11), 64 != a2 && 0 != r10 && (u2 += String.fromCharCode(r10)), 64 != o2 && 0 != i2 && (u2 += String.fromCharCode(i2));
          return u2;
        }(t10[1]));
      }
      async function r$(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function rM(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function rD(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function rU(e10) {
        return "undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder ? btoa(await rD(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      async function rq(e10, t10, r10 = false) {
        let i2 = function() {
          let e11 = new Uint32Array(56);
          if ("undefined" == typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let i3 = 0; i3 < 56; i3++)
              r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, rM).join("");
        }(), s2 = i2;
        r10 && (s2 += "/PASSWORD_RECOVERY"), await rA(e10, `${t10}-code-verifier`, s2);
        let n2 = await rU(i2), a2 = i2 === n2 ? "plain" : "s256";
        return [n2, a2];
      }
      rN.promiseConstructor = Promise;
      let rB = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
      class rV extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
      }
      function rz(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class rF extends rV {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      class rG extends rV {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class rH extends rV {
        constructor(e10, t10, r10, i2) {
          super(e10, r10, i2), this.name = t10, this.status = r10;
        }
      }
      class rW extends rH {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      class rK extends rH {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class rJ extends rH {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class rX extends rH {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class rY extends rH {
        constructor(e10, t10 = null) {
          super(e10, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class rQ extends rH {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function rZ(e10) {
        return rz(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class r0 extends rH {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
      }
      var r1 = function(e10, t10) {
        var r10 = {};
        for (var i2 in e10)
          Object.prototype.hasOwnProperty.call(e10, i2) && 0 > t10.indexOf(i2) && (r10[i2] = e10[i2]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols)
          for (var s2 = 0, i2 = Object.getOwnPropertySymbols(e10); s2 < i2.length; s2++)
            0 > t10.indexOf(i2[s2]) && Object.prototype.propertyIsEnumerable.call(e10, i2[s2]) && (r10[i2[s2]] = e10[i2[s2]]);
        return r10;
      };
      let r2 = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), r3 = [502, 503, 504];
      async function r6(e10) {
        var t10;
        let r10, i2;
        if (!rR(e10))
          throw new rQ(r2(e10), 0);
        if (r3.includes(e10.status))
          throw new rQ(r2(e10), e10.status);
        try {
          r10 = await e10.json();
        } catch (e11) {
          throw new rG(r2(e11), e11);
        }
        let s2 = function(e11) {
          let t11 = e11.headers.get(rx);
          if (!t11 || !t11.match(rB))
            return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        }(e10);
        if (s2 && s2.getTime() >= rT["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? i2 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (i2 = r10.error_code), i2) {
          if ("weak_password" === i2)
            throw new r0(r2(r10), e10.status, (null === (t10 = r10.weak_password) || void 0 === t10 ? void 0 : t10.reasons) || []);
          if ("session_not_found" === i2)
            throw new rW();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true))
          throw new r0(r2(r10), e10.status, r10.weak_password.reasons);
        throw new rF(r2(r10), e10.status || 500, i2);
      }
      let r4 = (e10, t10, r10, i2) => {
        let s2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" === e10 ? s2 : (s2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t10 ? void 0 : t10.headers), s2.body = JSON.stringify(i2), Object.assign(Object.assign({}, s2), r10));
      };
      async function r5(e10, t10, r10, i2) {
        var s2;
        let n2 = Object.assign({}, null == i2 ? void 0 : i2.headers);
        n2[rx] || (n2[rx] = rT["2024-01-01"].name), (null == i2 ? void 0 : i2.jwt) && (n2.Authorization = `Bearer ${i2.jwt}`);
        let a2 = null !== (s2 = null == i2 ? void 0 : i2.query) && void 0 !== s2 ? s2 : {};
        (null == i2 ? void 0 : i2.redirectTo) && (a2.redirect_to = i2.redirectTo);
        let o2 = Object.keys(a2).length ? "?" + new URLSearchParams(a2).toString() : "", l2 = await r9(e10, t10, r10 + o2, { headers: n2, noResolveJson: null == i2 ? void 0 : i2.noResolveJson }, {}, null == i2 ? void 0 : i2.body);
        return (null == i2 ? void 0 : i2.xform) ? null == i2 ? void 0 : i2.xform(l2) : { data: Object.assign({}, l2), error: null };
      }
      async function r9(e10, t10, r10, i2, s2, n2) {
        let a2;
        let o2 = r4(t10, i2, s2, n2);
        try {
          a2 = await e10(r10, Object.assign({}, o2));
        } catch (e11) {
          throw console.error(e11), new rQ(r2(e11), 0);
        }
        if (a2.ok || await r6(a2), null == i2 ? void 0 : i2.noResolveJson)
          return a2;
        try {
          return await a2.json();
        } catch (e11) {
          await r6(e11);
        }
      }
      function r8(e10) {
        var t10, r10;
        let i2 = null;
        return e10.access_token && e10.refresh_token && e10.expires_in && (i2 = Object.assign({}, e10), !e10.expires_at) && (i2.expires_at = (r10 = e10.expires_in, Math.round(Date.now() / 1e3) + r10)), { data: { session: i2, user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function r7(e10) {
        let t10 = r8(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function ie(e10) {
        var t10;
        return { data: { user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function it(e10) {
        return { data: e10, error: null };
      }
      function ir(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: i2, redirect_to: s2, verification_type: n2 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: i2, redirect_to: s2, verification_type: n2 }, user: Object.assign({}, r1(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function ii(e10) {
        return e10;
      }
      var is = function(e10, t10) {
        var r10 = {};
        for (var i2 in e10)
          Object.prototype.hasOwnProperty.call(e10, i2) && 0 > t10.indexOf(i2) && (r10[i2] = e10[i2]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols)
          for (var s2 = 0, i2 = Object.getOwnPropertySymbols(e10); s2 < i2.length; s2++)
            0 > t10.indexOf(i2[s2]) && Object.prototype.propertyIsEnumerable.call(e10, i2[s2]) && (r10[i2[s2]] = e10[i2[s2]]);
        return r10;
      };
      class ia {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10 }) {
          this.url = e10, this.headers = t10, this.fetch = rC(r10), this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) };
        }
        async signOut(e10, t10 = "global") {
          try {
            return await r5(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await r5(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: ie });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = is(e10, ["options"]), i2 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (i2.new_email = null == r10 ? void 0 : r10.newEmail, delete i2.newEmail), await r5(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: i2, headers: this.headers, xform: ir, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (rz(e11))
              return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await r5(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: ie });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, i2, s2, n2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await r5(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (s2 = null === (i2 = null == e10 ? void 0 : e10.perPage) || void 0 === i2 ? void 0 : i2.toString()) && void 0 !== s2 ? s2 : "" }, xform: ii });
            if (u2.error)
              throw u2.error;
            let c2 = await u2.json(), h2 = null !== (n2 = u2.headers.get("x-total-count")) && void 0 !== n2 ? n2 : 0, d2 = null !== (o2 = null === (a2 = u2.headers.get("link")) || void 0 === a2 ? void 0 : a2.split(",")) && void 0 !== o2 ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          try {
            return await r5(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: ie });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          try {
            return await r5(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: ie });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          try {
            return await r5(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: ie });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          try {
            let { data: t10, error: r10 } = await r5(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          try {
            return { data: await r5(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      let io = { getItem: (e10) => rP() ? globalThis.localStorage.getItem(e10) : null, setItem: (e10, t10) => {
        rP() && globalThis.localStorage.setItem(e10, t10);
      }, removeItem: (e10) => {
        rP() && globalThis.localStorage.removeItem(e10);
      } };
      function il(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      let iu = { debug: !!(globalThis && rP() && globalThis.localStorage && "true" === globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")) };
      class ic extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      class ih extends ic {
      }
      async function id(e10, t10, r10) {
        iu.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e10, t10);
        let i2 = new globalThis.AbortController();
        return t10 > 0 && setTimeout(() => {
          i2.abort(), iu.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e10);
        }, t10), await Promise.resolve().then(() => globalThis.navigator.locks.request(e10, 0 === t10 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: i2.signal }, async (i3) => {
          if (i3) {
            iu.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", e10, i3.name);
            try {
              return await r10();
            } finally {
              iu.debug && console.log("@supabase/gotrue-js: navigatorLock: released", e10, i3.name);
            }
          } else {
            if (0 === t10)
              throw iu.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", e10), new ih(`Acquiring an exclusive Navigator LockManager lock "${e10}" immediately failed`);
            if (iu.debug)
              try {
                let e11 = await globalThis.navigator.locks.query();
                console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(e11, null, "  "));
              } catch (e11) {
                console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e11);
              }
            return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await r10();
          }
        }));
      }
      !function() {
        if ("object" != typeof globalThis)
          try {
            Object.defineProperty(Object.prototype, "__magic__", { get: function() {
              return this;
            }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
          } catch (e10) {
            "undefined" != typeof self && (self.globalThis = self);
          }
      }();
      let ip = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: rk, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false };
      async function ig(e10, t10, r10) {
        return await r10();
      }
      class iv {
        constructor(e10) {
          var t10, r10;
          this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = iv.nextInstanceID, iv.nextInstanceID += 1, this.instanceID > 0 && rO() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
          let i2 = Object.assign(Object.assign({}, ip), e10);
          if (this.logDebugMessages = !!i2.debug, "function" == typeof i2.debug && (this.logger = i2.debug), this.persistSession = i2.persistSession, this.storageKey = i2.storageKey, this.autoRefreshToken = i2.autoRefreshToken, this.admin = new ia({ url: i2.url, headers: i2.headers, fetch: i2.fetch }), this.url = i2.url, this.headers = i2.headers, this.fetch = rC(i2.fetch), this.lock = i2.lock || ig, this.detectSessionInUrl = i2.detectSessionInUrl, this.flowType = i2.flowType, this.hasCustomAuthorizationHeader = i2.hasCustomAuthorizationHeader, i2.lock ? this.lock = i2.lock : rO() && (null === (t10 = null == globalThis ? void 0 : globalThis.navigator) || void 0 === t10 ? void 0 : t10.locks) ? this.lock = id : this.lock = ig, this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this) }, this.persistSession ? i2.storage ? this.storage = i2.storage : rP() ? this.storage = io : (this.memoryStorage = {}, this.storage = il(this.memoryStorage)) : (this.memoryStorage = {}, this.storage = il(this.memoryStorage)), rO() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e11) {
              console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e11);
            }
            null === (r10 = this.broadcastChannel) || void 0 === r10 || r10.addEventListener("message", async (e11) => {
              this._debug("received broadcast notification from other tab or client", e11), await this._notifyAllSubscribers(e11.data.event, e11.data.session, false);
            });
          }
          this.initialize();
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${rS}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e10), this;
        }
        async initialize() {
          return this.initializePromise || (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))()), await this.initializePromise;
        }
        async _initialize() {
          var e10;
          try {
            let t10 = function(e11) {
              let t11 = {}, r11 = new URL(e11);
              if (r11.hash && "#" === r11.hash[0])
                try {
                  new URLSearchParams(r11.hash.substring(1)).forEach((e12, r12) => {
                    t11[r12] = e12;
                  });
                } catch (e12) {
                }
              return r11.searchParams.forEach((e12, r12) => {
                t11[r12] = e12;
              }), t11;
            }(window.location.href), r10 = "none";
            if (this._isImplicitGrantCallback(t10) ? r10 = "implicit" : await this._isPKCECallback(t10) && (r10 = "pkce"), rO() && this.detectSessionInUrl && "none" !== r10) {
              let { data: i2, error: s2 } = await this._getSessionFromURL(t10, r10);
              if (s2) {
                if (this._debug("#_initialize()", "error detecting session from URL", s2), rz(s2) && "AuthImplicitGrantRedirectError" === s2.name) {
                  let t11 = null === (e10 = s2.details) || void 0 === e10 ? void 0 : e10.code;
                  if ("identity_already_exists" === t11 || "identity_not_found" === t11 || "single_identity_not_deletable" === t11)
                    return { error: s2 };
                }
                return await this._removeSession(), { error: s2 };
              }
              let { session: n2, redirectType: a2 } = i2;
              return this._debug("#_initialize()", "detected session in URL", n2, "redirect type", a2), await this._saveSession(n2), setTimeout(async () => {
                "recovery" === a2 ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", n2) : await this._notifyAllSubscribers("SIGNED_IN", n2);
              }, 0), { error: null };
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e11) {
            if (rz(e11))
              return { error: e11 };
            return { error: new rG("Unexpected error during initialization", e11) };
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, i2;
          try {
            let { data: s2, error: n2 } = await r5(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.data) && void 0 !== r10 ? r10 : {}, gotrue_meta_security: { captcha_token: null === (i2 = null == e10 ? void 0 : e10.options) || void 0 === i2 ? void 0 : i2.captchaToken } }, xform: r8 });
            if (n2 || !s2)
              return { data: { user: null, session: null }, error: n2 };
            let a2 = s2.session, o2 = s2.user;
            return s2.session && (await this._saveSession(s2.session), await this._notifyAllSubscribers("SIGNED_IN", a2)), { data: { user: o2, session: a2 }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, i2;
          try {
            let s2;
            if ("email" in e10) {
              let { email: r11, password: i3, options: n3 } = e10, a3 = null, o3 = null;
              "pkce" === this.flowType && ([a3, o3] = await rq(this.storage, this.storageKey)), s2 = await r5(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: null == n3 ? void 0 : n3.emailRedirectTo, body: { email: r11, password: i3, data: null !== (t10 = null == n3 ? void 0 : n3.data) && void 0 !== t10 ? t10 : {}, gotrue_meta_security: { captcha_token: null == n3 ? void 0 : n3.captchaToken }, code_challenge: a3, code_challenge_method: o3 }, xform: r8 });
            } else if ("phone" in e10) {
              let { phone: t11, password: n3, options: a3 } = e10;
              s2 = await r5(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: n3, data: null !== (r10 = null == a3 ? void 0 : a3.data) && void 0 !== r10 ? r10 : {}, channel: null !== (i2 = null == a3 ? void 0 : a3.channel) && void 0 !== i2 ? i2 : "sms", gotrue_meta_security: { captcha_token: null == a3 ? void 0 : a3.captchaToken } }, xform: r8 });
            } else
              throw new rJ("You must provide either an email or phone number and a password");
            let { data: n2, error: a2 } = s2;
            if (a2 || !n2)
              return { data: { user: null, session: null }, error: a2 };
            let o2 = n2.session, l2 = n2.user;
            return n2.session && (await this._saveSession(n2.session), await this._notifyAllSubscribers("SIGNED_IN", o2)), { data: { user: l2, session: o2 }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: i3, options: s2 } = e10;
              t10 = await r5(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: i3, gotrue_meta_security: { captcha_token: null == s2 ? void 0 : s2.captchaToken } }, xform: r7 });
            } else if ("phone" in e10) {
              let { phone: r11, password: i3, options: s2 } = e10;
              t10 = await r5(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: i3, gotrue_meta_security: { captcha_token: null == s2 ? void 0 : s2.captchaToken } }, xform: r7 });
            } else
              throw new rJ("You must provide either an email or phone number and a password");
            let { data: r10, error: i2 } = t10;
            if (i2)
              return { data: { user: null, session: null }, error: i2 };
            if (!r10 || !r10.session || !r10.user)
              return { data: { user: null, session: null }, error: new rK() };
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), { data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: i2 };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, i2, s2;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, scopes: null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.scopes, queryParams: null === (i2 = e10.options) || void 0 === i2 ? void 0 : i2.queryParams, skipBrowserRedirect: null === (s2 = e10.options) || void 0 === s2 ? void 0 : s2.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10) {
          return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e10));
        }
        async _exchangeCodeForSession(e10) {
          let t10 = await rj(this.storage, `${this.storageKey}-code-verifier`), [r10, i2] = (null != t10 ? t10 : "").split("/");
          try {
            let { data: t11, error: s2 } = await r5(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: r10 }, xform: r8 });
            if (await rI(this.storage, `${this.storageKey}-code-verifier`), s2)
              throw s2;
            if (!t11 || !t11.session || !t11.user)
              return { data: { user: null, session: null, redirectType: null }, error: new rK() };
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), { data: Object.assign(Object.assign({}, t11), { redirectType: null != i2 ? i2 : null }), error: s2 };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null, redirectType: null }, error: e11 };
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: i2, access_token: s2, nonce: n2 } = e10, { data: a2, error: o2 } = await r5(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: i2, access_token: s2, nonce: n2, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: r8 });
            if (o2)
              return { data: { user: null, session: null }, error: o2 };
            if (!a2 || !a2.session || !a2.user)
              return { data: { user: null, session: null }, error: new rK() };
            return a2.session && (await this._saveSession(a2.session), await this._notifyAllSubscribers("SIGNED_IN", a2.session)), { data: a2, error: o2 };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, i2, s2, n2;
          try {
            if ("email" in e10) {
              let { email: i3, options: s3 } = e10, n3 = null, a2 = null;
              "pkce" === this.flowType && ([n3, a2] = await rq(this.storage, this.storageKey));
              let { error: o2 } = await r5(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: i3, data: null !== (t10 = null == s3 ? void 0 : s3.data) && void 0 !== t10 ? t10 : {}, create_user: null === (r10 = null == s3 ? void 0 : s3.shouldCreateUser) || void 0 === r10 || r10, gotrue_meta_security: { captcha_token: null == s3 ? void 0 : s3.captchaToken }, code_challenge: n3, code_challenge_method: a2 }, redirectTo: null == s3 ? void 0 : s3.emailRedirectTo });
              return { data: { user: null, session: null }, error: o2 };
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a2, error: o2 } = await r5(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null !== (i2 = null == r11 ? void 0 : r11.data) && void 0 !== i2 ? i2 : {}, create_user: null === (s2 = null == r11 ? void 0 : r11.shouldCreateUser) || void 0 === s2 || s2, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null !== (n2 = null == r11 ? void 0 : r11.channel) && void 0 !== n2 ? n2 : "sms" } });
              return { data: { user: null, session: null, messageId: null == a2 ? void 0 : a2.message_id }, error: o2 };
            }
            throw new rJ("You must provide either an email or phone number.");
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let i2, s2;
            "options" in e10 && (i2 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, s2 = null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.captchaToken);
            let { data: n2, error: a2 } = await r5(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: s2 } }), redirectTo: i2, xform: r8 });
            if (a2)
              throw a2;
            if (!n2)
              throw Error("An error occurred on token verification.");
            let o2 = n2.session, l2 = n2.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), { data: { user: l2, session: o2 }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, i2;
          try {
            let s2 = null, n2 = null;
            return "pkce" === this.flowType && ([s2, n2] = await rq(this.storage, this.storageKey)), await r5(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: null !== (r10 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo) && void 0 !== r10 ? r10 : void 0 }), (null === (i2 = null == e10 ? void 0 : e10.options) || void 0 === i2 ? void 0 : i2.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: s2, code_challenge_method: n2 }), headers: this.headers, xform: it });
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async reauthenticate() {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10)
                throw r10;
              if (!t10)
                throw new rW();
              let { error: i2 } = await r5(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return { data: { user: null, session: null }, error: i2 };
            });
          } catch (e10) {
            if (rz(e10))
              return { data: { user: null, session: null }, error: e10 };
            throw e10;
          }
        }
        async resend(e10) {
          try {
            let t10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: r10, type: i2, options: s2 } = e10, { error: n2 } = await r5(this.fetch, "POST", t10, { headers: this.headers, body: { email: r10, type: i2, gotrue_meta_security: { captcha_token: null == s2 ? void 0 : s2.captchaToken } }, redirectTo: null == s2 ? void 0 : s2.emailRedirectTo });
              return { data: { user: null, session: null }, error: n2 };
            }
            if ("phone" in e10) {
              let { phone: r10, type: i2, options: s2 } = e10, { data: n2, error: a2 } = await r5(this.fetch, "POST", t10, { headers: this.headers, body: { phone: r10, type: i2, gotrue_meta_security: { captcha_token: null == s2 ? void 0 : s2.captchaToken } } });
              return { data: { user: null, session: null, messageId: null == n2 ? void 0 : n2.message_id }, error: a2 };
            }
            throw new rJ("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async getSession() {
          return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (e10) => e10));
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let e10 = null, t10 = await rj(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", t10), null !== t10 && (this._isValidSession(t10) ? e10 = t10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e10)
              return { data: { session: null }, error: null };
            let r10 = !!e10.expires_at && e10.expires_at <= Date.now() / 1e3;
            if (this._debug("#__loadSession()", `session has${r10 ? "" : " not"} expired`, "expires_at", e10.expires_at), !r10) {
              if (this.storage.isServer) {
                let t11 = this.suppressGetSessionWarning;
                e10 = new Proxy(e10, { get: (e11, r11, i3) => (t11 || "user" !== r11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), t11 = true, this.suppressGetSessionWarning = true), Reflect.get(e11, r11, i3)) });
              }
              return { data: { session: e10 }, error: null };
            }
            let { session: i2, error: s2 } = await this._callRefreshToken(e10.refresh_token);
            if (s2)
              return { data: { session: null }, error: s2 };
            return { data: { session: i2 }, error: null };
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e10) {
          return e10 ? await this._getUser(e10) : (await this.initializePromise, await this._acquireLock(-1, async () => await this._getUser()));
        }
        async _getUser(e10) {
          try {
            if (e10)
              return await r5(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: ie });
            return await this._useSession(async (e11) => {
              var t10, r10, i2;
              let { data: s2, error: n2 } = e11;
              if (n2)
                throw n2;
              return (null === (t10 = s2.session) || void 0 === t10 ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await r5(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null !== (i2 = null === (r10 = s2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== i2 ? i2 : void 0, xform: ie }) : { data: { user: null }, error: new rW() };
            });
          } catch (e11) {
            if (rz(e11))
              return rz(e11) && "AuthSessionMissingError" === e11.name && (await this._removeSession(), await rI(this.storage, `${this.storageKey}-code-verifier`)), { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e10, t10));
        }
        async _updateUser(e10, t10 = {}) {
          try {
            return await this._useSession(async (r10) => {
              let { data: i2, error: s2 } = r10;
              if (s2)
                throw s2;
              if (!i2.session)
                throw new rW();
              let n2 = i2.session, a2 = null, o2 = null;
              "pkce" === this.flowType && null != e10.email && ([a2, o2] = await rq(this.storage, this.storageKey));
              let { data: l2, error: u2 } = await r5(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: null == t10 ? void 0 : t10.emailRedirectTo, body: Object.assign(Object.assign({}, e10), { code_challenge: a2, code_challenge_method: o2 }), jwt: n2.access_token, xform: ie });
              if (u2)
                throw u2;
              return n2.user = l2.user, await this._saveSession(n2), await this._notifyAllSubscribers("USER_UPDATED", n2), { data: { user: n2.user }, error: null };
            });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        _decodeJWT(e10) {
          return rL(e10);
        }
        async setSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e10));
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token)
              throw new rW();
            let t10 = Date.now() / 1e3, r10 = t10, i2 = true, s2 = null, n2 = rL(e10.access_token);
            if (n2.exp && (i2 = (r10 = n2.exp) <= t10), i2) {
              let { session: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11)
                return { data: { user: null, session: null }, error: r11 };
              if (!t11)
                return { data: { user: null, session: null }, error: null };
              s2 = t11;
            } else {
              let { data: i3, error: n3 } = await this._getUser(e10.access_token);
              if (n3)
                throw n3;
              s2 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: i3.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(s2), await this._notifyAllSubscribers("SIGNED_IN", s2);
            }
            return { data: { user: s2.user, session: s2 }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { session: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async refreshSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e10));
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: i3, error: s3 } = t10;
                if (s3)
                  throw s3;
                e10 = null !== (r10 = i3.session) && void 0 !== r10 ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token))
                throw new rW();
              let { session: i2, error: s2 } = await this._callRefreshToken(e10.refresh_token);
              return s2 ? { data: { user: null, session: null }, error: s2 } : i2 ? { data: { user: i2.user, session: i2 }, error: null } : { data: { user: null, session: null }, error: null };
            });
          } catch (e11) {
            if (rz(e11))
              return { data: { user: null, session: null }, error: e11 };
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          try {
            if (!rO())
              throw new rX("No browser detected.");
            if (e10.error || e10.error_description || e10.error_code)
              throw new rX(e10.error_description || "Error in URL with unspecified error_description", { error: e10.error || "unspecified_error", code: e10.error_code || "unspecified_code" });
            switch (t10) {
              case "implicit":
                if ("pkce" === this.flowType)
                  throw new rY("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType)
                  throw new rX("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t10) {
              if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e10.code)
                throw new rY("No code detected.");
              let { data: t11, error: r11 } = await this._exchangeCodeForSession(e10.code);
              if (r11)
                throw r11;
              let i3 = new URL(window.location.href);
              return i3.searchParams.delete("code"), window.history.replaceState(window.history.state, "", i3.toString()), { data: { session: t11.session, redirectType: null }, error: null };
            }
            let { provider_token: r10, provider_refresh_token: i2, access_token: s2, refresh_token: n2, expires_in: a2, expires_at: o2, token_type: l2 } = e10;
            if (!s2 || !a2 || !n2 || !l2)
              throw new rX("No session defined in URL");
            let u2 = Math.round(Date.now() / 1e3), c2 = parseInt(a2), h2 = u2 + c2;
            o2 && (h2 = parseInt(o2));
            let d2 = h2 - u2;
            1e3 * d2 <= 3e4 && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d2}s, should have been closer to ${c2}s`);
            let p2 = h2 - c2;
            u2 - p2 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", p2, h2, u2) : u2 - p2 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", p2, h2, u2);
            let { data: f2, error: g2 } = await this._getUser(s2);
            if (g2)
              throw g2;
            let v2 = { provider_token: r10, provider_refresh_token: i2, access_token: s2, expires_in: c2, expires_at: h2, refresh_token: n2, token_type: l2, user: f2.user };
            return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: v2, redirectType: e10.type }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: { session: null, redirectType: null }, error: e11 };
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return !!(e10.access_token || e10.error_description);
        }
        async _isPKCECallback(e10) {
          let t10 = await rj(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e10.code && t10);
        }
        async signOut(e10 = { scope: "global" }) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e10));
        }
        async _signOut({ scope: e10 } = { scope: "global" }) {
          return await this._useSession(async (t10) => {
            var r10;
            let { data: i2, error: s2 } = t10;
            if (s2)
              return { error: s2 };
            let n2 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token;
            if (n2) {
              let { error: t11 } = await this.admin.signOut(n2, e10);
              if (t11 && !(rz(t11) && "AuthApiError" === t11.name && (404 === t11.status || 401 === t11.status || 403 === t11.status)))
                return { error: t11 };
            }
            return "others" !== e10 && (await this._removeSession(), await rI(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
          });
        }
        onAuthStateChange(e10) {
          let t10 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e11) {
            let t11 = 16 * Math.random() | 0;
            return ("x" == e11 ? t11 : 3 & t11 | 8).toString(16);
          }), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, await this._acquireLock(-1, async () => {
              this._emitInitialSession(t10);
            });
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, i2;
            try {
              let { data: { session: i3 }, error: s2 } = t10;
              if (s2)
                throw s2;
              await (null === (r10 = this.stateChangeEmitters.get(e10)) || void 0 === r10 ? void 0 : r10.callback("INITIAL_SESSION", i3)), this._debug("INITIAL_SESSION", "callback id", e10, "session", i3);
            } catch (t11) {
              await (null === (i2 = this.stateChangeEmitters.get(e10)) || void 0 === i2 ? void 0 : i2.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, i2 = null;
          "pkce" === this.flowType && ([r10, i2] = await rq(this.storage, this.storageKey, true));
          try {
            return await r5(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: i2, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: t10.redirectTo });
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10)
              throw r10;
            return { data: { identities: null !== (e10 = t10.user.identities) && void 0 !== e10 ? e10 : [] }, error: null };
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async linkIdentity(e10) {
          var t10;
          try {
            let { data: r10, error: i2 } = await this._useSession(async (t11) => {
              var r11, i3, s2, n2, a2;
              let { data: o2, error: l2 } = t11;
              if (l2)
                throw l2;
              let u2 = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null === (r11 = e10.options) || void 0 === r11 ? void 0 : r11.redirectTo, scopes: null === (i3 = e10.options) || void 0 === i3 ? void 0 : i3.scopes, queryParams: null === (s2 = e10.options) || void 0 === s2 ? void 0 : s2.queryParams, skipBrowserRedirect: true });
              return await r5(this.fetch, "GET", u2, { headers: this.headers, jwt: null !== (a2 = null === (n2 = o2.session) || void 0 === n2 ? void 0 : n2.access_token) && void 0 !== a2 ? a2 : void 0 });
            });
            if (i2)
              throw i2;
            return !rO() || (null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.skipBrowserRedirect) || window.location.assign(null == r10 ? void 0 : r10.url), { data: { provider: e10.provider, url: null == r10 ? void 0 : r10.url }, error: null };
          } catch (t11) {
            if (rz(t11))
              return { data: { provider: e10.provider, url: null }, error: t11 };
            throw t11;
          }
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, i2;
              let { data: s2, error: n2 } = t10;
              if (n2)
                throw n2;
              return await r5(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null !== (i2 = null === (r10 = s2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== i2 ? i2 : void 0 });
            });
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = `#_refreshAccessToken(${e10.substring(0, 5)}...)`;
          this._debug(t10, "begin");
          try {
            var r10, i2;
            let s2 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await r$(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await r5(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: r8 })), i2 = (e11, t11) => {
              let r11 = 200 * Math.pow(2, e11);
              return t11 && rZ(t11) && Date.now() + r11 - s2 < 3e4;
            }, new Promise((e11, t11) => {
              (async () => {
                for (let s3 = 0; s3 < 1 / 0; s3++)
                  try {
                    let t12 = await r10(s3);
                    if (!i2(s3, null, t12)) {
                      e11(t12);
                      return;
                    }
                  } catch (e12) {
                    if (!i2(s3, e12)) {
                      t11(e12);
                      return;
                    }
                  }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), rz(e11))
              return { data: { session: null, user: null }, error: e11 };
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let r10 = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), rO() && !t10.skipBrowserRedirect && window.location.assign(r10), { data: { provider: e10, url: r10 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10;
          let t10 = "#_recoverAndRefresh()";
          this._debug(t10, "begin");
          try {
            let r10 = await rj(this.storage, this.storageKey);
            if (this._debug(t10, "session from storage", r10), !this._isValidSession(r10)) {
              this._debug(t10, "session is not valid"), null !== r10 && await this._removeSession();
              return;
            }
            let i2 = Math.round(Date.now() / 1e3), s2 = (null !== (e10 = r10.expires_at) && void 0 !== e10 ? e10 : 1 / 0) < i2 + 10;
            if (this._debug(t10, `session has${s2 ? "" : " not"} expired with margin of 10s`), s2) {
              if (this.autoRefreshToken && r10.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(r10.refresh_token);
                e11 && (console.error(e11), rZ(e11) || (this._debug(t10, "refresh failed with a non-retryable error, removing the session", e11), await this._removeSession()));
              }
            } else
              await this._notifyAllSubscribers("SIGNED_IN", r10);
          } catch (e11) {
            this._debug(t10, "error", e11), console.error(e11);
            return;
          } finally {
            this._debug(t10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10)
            throw new rW();
          if (this.refreshingDeferred)
            return this.refreshingDeferred.promise;
          let i2 = `#_callRefreshToken(${e10.substring(0, 5)}...)`;
          this._debug(i2, "begin");
          try {
            this.refreshingDeferred = new rN();
            let { data: t11, error: r11 } = await this._refreshAccessToken(e10);
            if (r11)
              throw r11;
            if (!t11.session)
              throw new rW();
            await this._saveSession(t11.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", t11.session);
            let i3 = { session: t11.session, error: null };
            return this.refreshingDeferred.resolve(i3), i3;
          } catch (e11) {
            if (this._debug(i2, "error", e11), rz(e11)) {
              let r11 = { session: null, error: e11 };
              return rZ(e11) || await this._removeSession(), null === (t10 = this.refreshingDeferred) || void 0 === t10 || t10.resolve(r11), r11;
            }
            throw null === (r10 = this.refreshingDeferred) || void 0 === r10 || r10.reject(e11), e11;
          } finally {
            this.refreshingDeferred = null, this._debug(i2, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          let i2 = `#_notifyAllSubscribers(${e10})`;
          this._debug(i2, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let i3 = [], s2 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                i3.push(e11);
              }
            });
            if (await Promise.all(s2), i3.length > 0) {
              for (let e11 = 0; e11 < i3.length; e11 += 1)
                console.error(i3[e11]);
              throw i3[0];
            }
          } finally {
            this._debug(i2, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true, await rA(this.storage, this.storageKey, e10);
        }
        async _removeSession() {
          this._debug("#_removeSession()"), await rI(this.storage, this.storageKey), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e10 = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e10 && rO() && (null == window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e10);
          } catch (e11) {
            console.error("removing visibilitychange callback failed", e11);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10), setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e10 = Date.now();
                try {
                  return await this._useSession(async (t10) => {
                    let { data: { session: r10 } } = t10;
                    if (!r10 || !r10.refresh_token || !r10.expires_at) {
                      this._debug("#_autoRefreshTokenTick()", "no session");
                      return;
                    }
                    let i2 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${i2} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), i2 <= 3 && await this._callRefreshToken(r10.refresh_token);
                  });
                } catch (e11) {
                  console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e10) {
            if (e10.isAcquireTimeout || e10 instanceof ic)
              this._debug("auto refresh token tick lock not available");
            else
              throw e10;
          }
        }
        async _handleVisibilityChange() {
          if (this._debug("#_handleVisibilityChange()"), !rO() || !(null == window ? void 0 : window.addEventListener))
            return this.autoRefreshToken && this.startAutoRefresh(), false;
          try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false), null == window || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
          } catch (e10) {
            console.error("_handleVisibilityChange", e10);
          }
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState ? (this.autoRefreshToken && this._startAutoRefresh(), e10 || (await this.initializePromise, await this._acquireLock(-1, async () => {
            if ("visible" !== document.visibilityState) {
              this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
              return;
            }
            await this._recoverAndRefresh();
          }))) : "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let i2 = [`provider=${encodeURIComponent(t10)}`];
          if ((null == r10 ? void 0 : r10.redirectTo) && i2.push(`redirect_to=${encodeURIComponent(r10.redirectTo)}`), (null == r10 ? void 0 : r10.scopes) && i2.push(`scopes=${encodeURIComponent(r10.scopes)}`), "pkce" === this.flowType) {
            let [e11, t11] = await rq(this.storage, this.storageKey), r11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(e11)}`, code_challenge_method: `${encodeURIComponent(t11)}` });
            i2.push(r11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            i2.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && i2.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), `${e10}?${i2.join("&")}`;
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: i2, error: s2 } = t10;
              return s2 ? { data: null, error: s2 } : await r5(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null === (r10 = null == i2 ? void 0 : i2.session) || void 0 === r10 ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, i2;
              let { data: s2, error: n2 } = t10;
              if (n2)
                return { data: null, error: n2 };
              let a2 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : { issuer: e10.issuer }), { data: o2, error: l2 } = await r5(this.fetch, "POST", `${this.url}/factors`, { body: a2, headers: this.headers, jwt: null === (r10 = null == s2 ? void 0 : s2.session) || void 0 === r10 ? void 0 : r10.access_token });
              return l2 ? { data: null, error: l2 } : ("totp" === e10.factorType && (null === (i2 = null == o2 ? void 0 : o2.totp) || void 0 === i2 ? void 0 : i2.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), { data: o2, error: null });
            });
          } catch (e11) {
            if (rz(e11))
              return { data: null, error: e11 };
            throw e11;
          }
        }
        async _verify(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10;
                let { data: i2, error: s2 } = t10;
                if (s2)
                  return { data: null, error: s2 };
                let { data: n2, error: a2 } = await r5(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: { code: e10.code, challenge_id: e10.challengeId }, headers: this.headers, jwt: null === (r10 = null == i2 ? void 0 : i2.session) || void 0 === r10 ? void 0 : r10.access_token });
                return a2 ? { data: null, error: a2 } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + n2.expires_in }, n2)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", n2), { data: n2, error: a2 });
              });
            } catch (e11) {
              if (rz(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        async _challenge(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10;
                let { data: i2, error: s2 } = t10;
                return s2 ? { data: null, error: s2 } : await r5(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: { channel: e10.channel }, headers: this.headers, jwt: null === (r10 = null == i2 ? void 0 : i2.session) || void 0 === r10 ? void 0 : r10.access_token });
              });
            } catch (e11) {
              if (rz(e11))
                return { data: null, error: e11 };
              throw e11;
            }
          });
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? { data: null, error: r10 } : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          let { data: { user: e10 }, error: t10 } = await this.getUser();
          if (t10)
            return { data: null, error: t10 };
          let r10 = (null == e10 ? void 0 : e10.factors) || [], i2 = r10.filter((e11) => "totp" === e11.factor_type && "verified" === e11.status), s2 = r10.filter((e11) => "phone" === e11.factor_type && "verified" === e11.status);
          return { data: { all: r10, totp: i2, phone: s2 }, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          return this._acquireLock(-1, async () => await this._useSession(async (e10) => {
            var t10, r10;
            let { data: { session: i2 }, error: s2 } = e10;
            if (s2)
              return { data: null, error: s2 };
            if (!i2)
              return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
            let n2 = this._decodeJWT(i2.access_token), a2 = null;
            n2.aal && (a2 = n2.aal);
            let o2 = a2;
            return (null !== (r10 = null === (t10 = i2.user.factors) || void 0 === t10 ? void 0 : t10.filter((e11) => "verified" === e11.status)) && void 0 !== r10 ? r10 : []).length > 0 && (o2 = "aal2"), { data: { currentLevel: a2, nextLevel: o2, currentAuthenticationMethods: n2.amr || [] }, error: null };
          }));
        }
      }
      iv.nextInstanceID = 0;
      let im = iv;
      class ib extends im {
        constructor(e10) {
          super(e10);
        }
      }
      class iw {
        constructor(e10, t10, r10) {
          var i2, s2, n2;
          if (this.supabaseUrl = e10, this.supabaseKey = t10, !e10)
            throw Error("supabaseUrl is required.");
          if (!t10)
            throw Error("supabaseKey is required.");
          let a2 = e10.replace(/\/$/, "");
          this.realtimeUrl = `${a2}/realtime/v1`.replace(/^http/i, "ws"), this.authUrl = `${a2}/auth/v1`, this.storageUrl = `${a2}/storage/v1`, this.functionsUrl = `${a2}/functions/v1`;
          let o2 = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`, l2 = function(e11, t11) {
            let { db: r11, auth: i3, realtime: s3, global: n3 } = e11, { db: a3, auth: o3, realtime: l3, global: u2 } = t11, c2 = { db: Object.assign(Object.assign({}, a3), r11), auth: Object.assign(Object.assign({}, o3), i3), realtime: Object.assign(Object.assign({}, l3), s3), global: Object.assign(Object.assign({}, u2), n3), accessToken: () => {
              var e12, t12, r12, i4;
              return e12 = this, t12 = void 0, i4 = function* () {
                return "";
              }, new (r12 = void 0, r12 = Promise)(function(s4, n4) {
                function a4(e13) {
                  try {
                    l4(i4.next(e13));
                  } catch (e14) {
                    n4(e14);
                  }
                }
                function o4(e13) {
                  try {
                    l4(i4.throw(e13));
                  } catch (e14) {
                    n4(e14);
                  }
                }
                function l4(e13) {
                  var t13;
                  e13.done ? s4(e13.value) : ((t13 = e13.value) instanceof r12 ? t13 : new r12(function(e14) {
                    e14(t13);
                  })).then(a4, o4);
                }
                l4((i4 = i4.apply(e12, t12 || [])).next());
              });
            } };
            return e11.accessToken ? c2.accessToken = e11.accessToken : delete c2.accessToken, c2;
          }(null != r10 ? r10 : {}, { db: rg, realtime: rm, auth: Object.assign(Object.assign({}, rv), { storageKey: o2 }), global: rf });
          this.storageKey = null !== (i2 = l2.auth.storageKey) && void 0 !== i2 ? i2 : "", this.headers = null !== (s2 = l2.global.headers) && void 0 !== s2 ? s2 : {}, l2.accessToken ? (this.accessToken = l2.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null !== (n2 = l2.auth) && void 0 !== n2 ? n2 : {}, this.headers, l2.global.fetch), this.fetch = r_(t10, this._getAccessToken.bind(this), l2.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, l2.realtime)), this.rest = new tO(`${a2}/rest/v1`, { headers: this.headers, schema: l2.db.schema, fetch: this.fetch }), l2.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new tT(this.functionsUrl, { headers: this.headers, customFetch: this.fetch });
        }
        get storage() {
          return new rd(this.storageUrl, this.headers, this.fetch);
        }
        from(e10) {
          return this.rest.from(e10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        rpc(e10, t10 = {}, r10 = {}) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        _getAccessToken() {
          var e10, t10, r10, i2, s2, n2;
          return r10 = this, i2 = void 0, s2 = void 0, n2 = function* () {
            if (this.accessToken)
              return yield this.accessToken();
            let { data: r11 } = yield this.auth.getSession();
            return null !== (t10 = null === (e10 = r11.session) || void 0 === e10 ? void 0 : e10.access_token) && void 0 !== t10 ? t10 : null;
          }, new (s2 || (s2 = Promise))(function(e11, t11) {
            function a2(e12) {
              try {
                l2(n2.next(e12));
              } catch (e13) {
                t11(e13);
              }
            }
            function o2(e12) {
              try {
                l2(n2.throw(e12));
              } catch (e13) {
                t11(e13);
              }
            }
            function l2(t12) {
              var r11;
              t12.done ? e11(t12.value) : ((r11 = t12.value) instanceof s2 ? r11 : new s2(function(e12) {
                e12(r11);
              })).then(a2, o2);
            }
            l2((n2 = n2.apply(r10, i2 || [])).next());
          });
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: i2, storageKey: s2, flowType: n2, lock: a2, debug: o2 }, l2, u2) {
          let c2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new ib({ url: this.authUrl, headers: Object.assign(Object.assign({}, c2), l2), storageKey: s2, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: i2, flowType: n2, lock: a2, debug: o2, fetch: u2, hasCustomAuthorizationHeader: "Authorization" in this.headers });
        }
        _initRealtimeClient(e10) {
          return new tY(this.realtimeUrl, Object.assign(Object.assign({}, e10), { params: Object.assign({ apikey: this.supabaseKey }, null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10) && this.changedAccessToken !== r10 ? this.changedAccessToken = r10 : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      }
      let iy = (e10, t10, r10) => new iw(e10, t10, r10);
      r(113), "undefined" == typeof URLPattern || URLPattern, r(886).unstable_postpone;
      if (false === function(e10) {
        return e10.includes("needs to bail out of prerendering at this point because it used") && e10.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))
        throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");
      async function i_(e10) {
        let t10 = Q.next({ request: e10 }), r10 = function(e11, t11, r11) {
          if (!e11 || !t11)
            throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
          let { storage: i3, getAll: s3, setAll: n3, setItems: a3, removedItems: o2 } = function(e12, t12) {
            let r12, i4;
            let s4 = e12.cookies ?? null, n4 = e12.cookieEncoding, a4 = {}, o3 = {};
            if (s4) {
              if ("get" in s4) {
                let e13 = async (e14) => {
                  let t13 = e14.flatMap((e15) => [e15, ...Array.from({ length: 5 }).map((t14, r14) => `${e15}.${r14}`)]), r13 = [];
                  for (let e15 = 0; e15 < t13.length; e15 += 1) {
                    let i5 = await s4.get(t13[e15]);
                    (i5 || "string" == typeof i5) && r13.push({ name: t13[e15], value: i5 });
                  }
                  return r13;
                };
                if (r12 = async (t13) => await e13(t13), "set" in s4 && "remove" in s4)
                  i4 = async (e14) => {
                    for (let t13 = 0; t13 < e14.length; t13 += 1) {
                      let { name: r13, value: i5, options: n5 } = e14[t13];
                      i5 ? await s4.set(r13, i5, n5) : await s4.remove(r13, n5);
                    }
                  };
                else if (t12)
                  i4 = async () => {
                    console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
                  };
                else
                  throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
              } else if ("getAll" in s4) {
                if (r12 = async () => await s4.getAll(), "setAll" in s4)
                  i4 = s4.setAll;
                else if (t12)
                  i4 = async () => {
                    console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
                  };
                else
                  throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
              } else
                throw Error(`@supabase/ssr: ${t12 ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${to() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`);
            } else if (!t12 && to()) {
              let e13 = () => {
                let e14 = (0, ta.q)(document.cookie);
                return Object.keys(e14).map((t13) => ({ name: t13, value: e14[t13] }));
              };
              r12 = () => e13(), i4 = (e14) => {
                e14.forEach(({ name: e15, value: t13, options: r13 }) => {
                  document.cookie = (0, ta.l)(e15, t13, r13);
                });
              };
            } else if (t12)
              throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else
              r12 = () => [], i4 = () => {
                throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
              };
            return t12 ? { getAll: r12, setAll: i4, setItems: a4, removedItems: o3, storage: { isServer: true, getItem: async (e13) => {
              if ("string" == typeof a4[e13])
                return a4[e13];
              if (o3[e13])
                return null;
              let t13 = await r12([e13]), i5 = await td(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              if (!i5)
                return null;
              let s5 = i5;
              return "string" == typeof i5 && i5.startsWith(tb) && (s5 = tm(i5.substring(tb.length))), s5;
            }, setItem: async (t13, s5) => {
              t13.endsWith("-code-verifier") && await tw({ getAll: r12, setAll: i4, setItems: { [t13]: s5 }, removedItems: {} }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: n4 }), a4[t13] = s5, delete o3[t13];
            }, removeItem: async (e13) => {
              delete a4[e13], o3[e13] = true;
            } } } : { getAll: r12, setAll: i4, setItems: a4, removedItems: o3, storage: { isServer: false, getItem: async (e13) => {
              let t13 = await r12([e13]), i5 = await td(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              if (!i5)
                return null;
              let s5 = i5;
              return i5.startsWith(tb) && (s5 = tm(i5.substring(tb.length))), s5;
            }, setItem: async (t13, s5) => {
              let a5 = await r12([t13]), o4 = new Set((a5?.map(({ name: e13 }) => e13) || []).filter((e13) => tc(e13, t13))), l3 = s5;
              "base64url" === n4 && (l3 = tb + tv(s5));
              let u2 = th(t13, l3);
              u2.forEach(({ name: e13 }) => {
                o4.delete(e13);
              });
              let c2 = { ...tl, ...e12?.cookieOptions, maxAge: 0 }, h2 = { ...tl, ...e12?.cookieOptions, maxAge: tl.maxAge };
              delete c2.name, delete h2.name;
              let d2 = [...[...o4].map((e13) => ({ name: e13, value: "", options: c2 })), ...u2.map(({ name: e13, value: t14 }) => ({ name: e13, value: t14, options: h2 }))];
              d2.length > 0 && await i4(d2);
            }, removeItem: async (t13) => {
              let s5 = await r12([t13]), n5 = (s5?.map(({ name: e13 }) => e13) || []).filter((e13) => tc(e13, t13)), a5 = { ...tl, ...e12?.cookieOptions, maxAge: 0 };
              delete a5.name, n5.length > 0 && await i4(n5.map((e13) => ({ name: e13, value: "", options: a5 })));
            } } };
          }({ ...r11, cookieEncoding: r11?.cookieEncoding ?? "base64url" }, true), l2 = iy(e11, t11, { ...r11, global: { ...r11?.global, headers: { ...r11?.global?.headers, "X-Client-Info": "supabase-ssr/0.5.2" } }, auth: { ...r11?.cookieOptions?.name ? { storageKey: r11.cookieOptions.name } : null, ...r11?.auth, flowType: "pkce", autoRefreshToken: false, detectSessionInUrl: false, persistSession: true, storage: i3 } });
          return l2.auth.onAuthStateChange(async (e12) => {
            (Object.keys(a3).length > 0 || Object.keys(o2).length > 0) && ("SIGNED_IN" === e12 || "TOKEN_REFRESHED" === e12 || "USER_UPDATED" === e12 || "PASSWORD_RECOVERY" === e12 || "SIGNED_OUT" === e12 || "MFA_CHALLENGE_VERIFIED" === e12) && await tw({ getAll: s3, setAll: n3, setItems: a3, removedItems: o2 }, { cookieOptions: r11?.cookieOptions ?? null, cookieEncoding: r11?.cookieEncoding ?? "base64url" });
          }), l2;
        }("https://dqohyiugqnkmuhbhtteq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxb2h5aXVncW5rbXVoYmh0dGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MzA3OTMsImV4cCI6MjA1NDMwNjc5M30.oYZ1XUETpGe7t-MPF5fo6ExMwFRPilct0PGvRYIQGEw", { cookies: { getAll: () => e10.cookies.getAll(), setAll(r11) {
          r11.forEach(({ name: t11, value: r12, options: i3 }) => e10.cookies.set(t11, r12)), t10 = Q.next({ request: e10 }), r11.forEach(({ name: e11, value: r12, options: i3 }) => t10.cookies.set(e11, r12, i3));
        } } }), { data: { user: i2 } } = await r10.auth.getUser(), s2 = e10.nextUrl.pathname, n2 = ["/dashboard", "/test"].includes(s2), a2 = ["/login", "/signup", "/"].includes(s2);
        if (!i2 && !a2 && n2) {
          let t11 = e10.nextUrl.clone();
          return t11.pathname = "/login", Q.redirect(t11);
        }
        return t10;
      }
      async function iS(e10) {
        return await i_(e10);
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
      let ik = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let ix = { ...g }, iT = ix.middleware || ix.default, iO = "/middleware";
      if ("function" != typeof iT)
        throw Error(`The Middleware "${iO}" must export a \`middleware\` or a \`default\` function`);
      function iE(e10) {
        return tn({ ...e10, page: iO, handler: async (...e11) => {
          try {
            return await iT(...e11);
          } catch (s2) {
            let t10 = e11[0], r10 = new URL(t10.url), i2 = r10.pathname + r10.search;
            throw await w(s2, { path: i2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), s2;
          }
        } });
      }
    } }, (e) => {
      var t = e(e.s = 656);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path2 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path2)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  await result.waitUntil;
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const promisesToAwait = globalThis.__openNextAls.getStore()?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (globalThis.openNextWaitUntil) {
    globalThis.openNextWaitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const openNextStoreContext = globalThis.__openNextAls.getStore();
  const waitUntil = globalThis.openNextWaitUntil ?? ((promise) => openNextStoreContext?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation }, fn) {
  return globalThis.__openNextAls.run({
    requestId: Math.random().toString(36),
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation
  }, async () => {
    provideNextAfterProvider();
    const result = await fn();
    await awaitAllDetachedPromise();
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "appIsrStatus": true, "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/afifjamhari/Project Coding/03. Afif/kerja praktik/simlab-if-upnyk", "experimental": { "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "turbo": { "root": "/Users/afifjamhari/Project Coding/03. Afif/kerja praktik/simlab-if-upnyk" }, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "reactOwnerStack": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "bundlePagesRouterDependencies": false, "configFileName": "next.config.mjs" };
var BuildId = "2dtI0XXCgmn4rH9TlTjqE";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/register", "regex": "^/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/register(?:/)?$" }, { "page": "/test", "regex": "^/test(?:/)?$", "routeKeys": {}, "namedRegex": "^/test(?:/)?$" }], "dynamic": [], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "9af29716e96ec32af3ed3166463a05dc", "previewModeSigningKey": "f0e8356b82bfd1841b262dfef802b31926a32554fadbe761503d82226865b922", "previewModeEncryptionKey": "02cc701d8003f900dc77e226e2193926fcdc652e333306513cc98d8e280de85c" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "2dtI0XXCgmn4rH9TlTjqE", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "9DduBa56vs3UPX79muiAznoRx0queNxGAKcwV+TiY7U=", "__NEXT_PREVIEW_MODE_ID": "9af29716e96ec32af3ed3166463a05dc", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "02cc701d8003f900dc77e226e2193926fcdc652e333306513cc98d8e280de85c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "f0e8356b82bfd1841b262dfef802b31926a32554fadbe761503d82226865b922" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/favicon.ico/route": "/favicon.ico", "/dashboard/page": "/dashboard", "/page": "/", "/test/page": "/test", "/(auth)/login/page": "/login", "/(auth)/register/page": "/register" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path2) {
  return NextConfig.i18n?.locales.includes(path2.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectLocale(internalEvent, i18n) {
  if (i18n.localeDetection === false) {
    return i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale
  });
  return cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return queryParts.reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = value;
    return acc;
  }, {});
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function convertToQueryString(query) {
  const urlQuery = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => urlQuery.append(key, decodeURIComponent(entry)));
    } else {
      urlQuery.append(key, decodeURIComponent(value));
    }
  });
  const queryString = urlQuery.toString();
  return queryString ? `?${queryString}` : "";
}
function getMiddlewareMatch(middlewareManifest2) {
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str) {
  return str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function generateMessageGroupId(rawPath) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `revalidate-${randomInt}`;
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
async function computeCacheControl(path2, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path2)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path2}/` : path2;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: { host, url },
        MessageDeduplicationId: hash(`${path2}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path2)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    statusCode: 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers
    }
  };
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  if (localizedPath === "") {
    localizedPath = "index";
  }
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath) || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData?.value?.type === "app") {
        const _lastModified = await globalThis.tagCache.getLastModified(localizedPath, cachedData.lastModified);
        if (_lastModified === -1) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path2 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path2 += prefix;
        prefix = "";
      }
      if (path2) {
        result.push(path2);
        path2 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path2 += value;
      continue;
    }
    if (path2) {
      result.push(path2);
      path2 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path2 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path2 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path2 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path2 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path2;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path2 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path2, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path2, keys) {
  if (!keys)
    return path2;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path2.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path2.source);
  }
  return path2;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path2) {
    return pathToRegexp(path2, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path2, keys, options) {
  return tokensToRegexp(parse2(path2, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path2, keys, options) {
  if (path2 instanceof RegExp)
    return regexpToRegexp(path2, keys);
  if (Array.isArray(path2))
    return arrayToRegexp(path2, keys, options);
  return stringToRegexp(path2, keys, options);
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path2 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path2) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path2);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path2 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path2) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = rawPath;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    const encodePlusQueryString = queryString.replaceAll("+", "%20");
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname ?? "") ?? "");
    const toDestinationHost = compile(escapeRegex(hostname ?? "") ?? "");
    const toDestinationQuery = compile(escapeRegex(encodePlusQueryString ?? "") ?? "");
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite?.source) ?? ""))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = encodePlusQueryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : `${rewrittenPath}`;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      rawPath: rewrittenUrl,
      url: `${rewrittenUrl}${convertToQueryString(finalQuery)}`
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const dataPattern = `${NextConfig.basePath ?? ""}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/");
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: `${newPath}${convertToQueryString(query)}`
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const routeFallback = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false).some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  const localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: "/404",
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
var middlewareManifest = MiddlewareManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"])
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const protocol = internalEvent.url.startsWith("http://") ? "http:" : "https:";
  const host = headers.host ? `${protocol}//${headers.host}` : "http://localhost:3000";
  const initialUrl = new URL(normalizedPath, host);
  initialUrl.search = convertToQueryString(internalEvent.query);
  const url = initialUrl.toString();
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  responseHeaders.delete("x-middleware-override-headers");
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  if (statusCode >= 300 && statusCode < 400) {
    resHeaders.location = responseHeaders.get("location")?.replace("http://localhost:3000", `${protocol}//${internalEvent.headers.host}`) ?? resHeaders.location;
    return {
      body: emptyReadableStream(),
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      isBase64Encoded: false
    };
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let rewritten = false;
  let isExternalRewrite = false;
  let middlewareQueryString = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    if (isExternal(rewriteUrl, internalEvent.headers.host)) {
      newUrl = rewriteUrl;
      rewritten = true;
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      newUrl = rewriteUrlObject.pathname;
      if (middlewareQueryString.__nextDataReq) {
        middlewareQueryString = {
          __nextDataReq: middlewareQueryString.__nextDataReq
        };
      } else {
        middlewareQueryString = {};
      }
      rewriteUrlObject.searchParams.forEach((v, k) => {
        middlewareQueryString[k] = v;
      });
      rewritten = true;
    }
  }
  if (result.body) {
    const body = result.body;
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: rewritten ? newUrl ?? internalEvent.rawPath : internalEvent.rawPath,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQueryString,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var apiPrefix = `${RoutesManifest.basePath ?? ""}/api`;
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path2) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path2));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher(RoutesManifest.routes.static);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_PATH = `${INTERNAL_HEADER_PREFIX}initial-path`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventHeaders, middlewareHeaders, setPrefix = true) {
  const keyPrefix = setPrefix ? MIDDLEWARE_HEADER_PREFIX : "";
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      eventHeaders[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event) {
  for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
    const value = event.headers[openNextGeoName];
    if (value) {
      event.headers[nextGeoName] = value;
    }
  }
  for (const key of Object.keys(event.headers)) {
    if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
      delete event.headers[key];
    }
  }
  const nextHeaders = getNextConfigHeaders(event, ConfigHeaders);
  let internalEvent = fixDataPage(event, BuildId);
  if ("statusCode" in internalEvent) {
    return internalEvent;
  }
  const redirect = handleRedirects(internalEvent, RoutesManifest.redirects);
  if (redirect) {
    debug("redirect", redirect);
    return redirect;
  }
  const eventOrResult = await handleMiddleware(internalEvent);
  const isResult = "statusCode" in eventOrResult;
  if (isResult) {
    return eventOrResult;
  }
  const middlewareResponseHeaders = eventOrResult.responseHeaders;
  let isExternalRewrite = eventOrResult.isExternalRewrite ?? false;
  internalEvent = eventOrResult;
  if (!isExternalRewrite) {
    const beforeRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.beforeFiles);
    internalEvent = beforeRewrites.internalEvent;
    isExternalRewrite = beforeRewrites.isExternalRewrite;
  }
  const foundStaticRoute = staticRouteMatcher(internalEvent.rawPath);
  const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
  if (!(isStaticRoute || isExternalRewrite)) {
    const afterRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.afterFiles);
    internalEvent = afterRewrites.internalEvent;
    isExternalRewrite = afterRewrites.isExternalRewrite;
  }
  const { event: fallbackEvent, isISR } = handleFallbackFalse(internalEvent, PrerenderManifest);
  internalEvent = fallbackEvent;
  const foundDynamicRoute = dynamicRouteMatcher(internalEvent.rawPath);
  const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
  if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
    const fallbackRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.fallback);
    internalEvent = fallbackRewrites.internalEvent;
    isExternalRewrite = fallbackRewrites.isExternalRewrite;
  }
  const isApiRoute = internalEvent.rawPath === apiPrefix || internalEvent.rawPath.startsWith(`${apiPrefix}/`);
  const isNextImageRoute = internalEvent.rawPath.startsWith("/_next/image");
  const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
  if (!(isRouteFoundBeforeAllRewrites || isApiRoute || isNextImageRoute || // We need to check again once all rewrites have been applied
  staticRouteMatcher(internalEvent.rawPath).length > 0 || dynamicRouteMatcher(internalEvent.rawPath).length > 0)) {
    internalEvent = {
      ...internalEvent,
      rawPath: "/404",
      url: "/404",
      headers: {
        ...internalEvent.headers,
        "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
      }
    };
  }
  if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !("statusCode" in internalEvent)) {
    debug("Cache interception enabled");
    internalEvent = await cacheInterceptor(internalEvent);
    if ("statusCode" in internalEvent) {
      applyMiddlewareHeaders(internalEvent.headers, {
        ...middlewareResponseHeaders,
        ...nextHeaders
      }, false);
      return internalEvent;
    }
  }
  applyMiddlewareHeaders(internalEvent.headers, {
    ...middlewareResponseHeaders,
    ...nextHeaders
  });
  const resolvedRoutes = [
    ...foundStaticRoute,
    ...foundDynamicRoute
  ];
  debug("resolvedRoutes", resolvedRoutes);
  return {
    internalEvent,
    isExternalRewrite,
    origin: false,
    isISR,
    initialPath: event.rawPath,
    resolvedRoutes
  };
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent) => {
  const originResolver = await resolveOriginResolver(globalThis.openNextConfig.middleware?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(globalThis.openNextConfig.middleware?.override?.proxyExternalRequest);
  return runWithOpenNextRequestContext({ isISRRevalidation: internalEvent.headers["x-isr"] === "1" }, async () => {
    const result = await routingHandler(internalEvent);
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_PATH]: internalEvent.rawPath,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes) ?? "[]"
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialPath: result.initialPath,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            rawPath: "/500",
            url: "/500",
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialPath: result.internalEvent.rawPath,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
