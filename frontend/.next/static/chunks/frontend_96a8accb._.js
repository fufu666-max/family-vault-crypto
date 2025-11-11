(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/fhevm/internal/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SDK_CDN_URL",
    ()=>SDK_CDN_URL
]);
const SDK_CDN_URL = "https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/fhevm/internal/RelayerSDKLoader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelayerSDKLoader",
    ()=>RelayerSDKLoader,
    "isFhevmWindowType",
    ()=>isFhevmWindowType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/constants.ts [app-client] (ecmascript)");
;
;
class RelayerSDKLoader {
    isLoaded() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return isFhevmWindowType(window, this._trace);
    }
    load() {
        console.log("[RelayerSDKLoader] load...");
        // Ensure this only runs in the browser
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if ("relayerSDK" in window) {
            if (!isFhevmRelayerSDKType(window.relayerSDK, this._trace)) {
                console.log("[RelayerSDKLoader] window.relayerSDK === undefined");
                throw new Error("RelayerSDKLoader: Unable to load FHEVM Relayer SDK");
            }
            return Promise.resolve();
        }
        return new Promise((resolve, reject)=>{
            const existingScript = document.querySelector('script[src="'.concat(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_CDN_URL"], '"]'));
            if (existingScript) {
                if (!isFhevmWindowType(window, this._trace)) {
                    reject(new Error("RelayerSDKLoader: window object does not contain a valid relayerSDK object."));
                }
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_CDN_URL"];
            script.type = "text/javascript";
            script.async = true;
            script.onload = ()=>{
                if (!isFhevmWindowType(window, this._trace)) {
                    console.log("[RelayerSDKLoader] script onload FAILED...");
                    reject(new Error("RelayerSDKLoader: Relayer SDK script has been successfully loaded from ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_CDN_URL"], ", however, the window.relayerSDK object is invalid.")));
                }
                resolve();
            };
            script.onerror = ()=>{
                console.log("[RelayerSDKLoader] script onerror... ");
                reject(new Error("RelayerSDKLoader: Failed to load Relayer SDK from ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_CDN_URL"])));
            };
            console.log("[RelayerSDKLoader] add script to DOM...");
            document.head.appendChild(script);
            console.log("[RelayerSDKLoader] script added!");
        });
    }
    constructor(options){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "_trace", void 0);
        this._trace = options.trace;
    }
}
function isFhevmRelayerSDKType(o, trace) {
    if (typeof o === "undefined") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is undefined");
        return false;
    }
    if (o === null) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is null");
        return false;
    }
    if (typeof o !== "object") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is not an object");
        return false;
    }
    if (!objHasProperty(o, "initSDK", "function", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.initSDK is invalid");
        return false;
    }
    if (!objHasProperty(o, "createInstance", "function", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.createInstance is invalid");
        return false;
    }
    if (!objHasProperty(o, "SepoliaConfig", "object", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.SepoliaConfig is invalid");
        return false;
    }
    if ("__initialized__" in o) {
        if (o.__initialized__ !== true && o.__initialized__ !== false) {
            trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.__initialized__ is invalid");
            return false;
        }
    }
    return true;
}
function isFhevmWindowType(win, trace) {
    if (typeof win === "undefined") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window object is undefined");
        return false;
    }
    if (win === null) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window object is null");
        return false;
    }
    if (typeof win !== "object") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window is not an object");
        return false;
    }
    if (!("relayerSDK" in win)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window does not contain 'relayerSDK' property");
        return false;
    }
    return isFhevmRelayerSDKType(win.relayerSDK);
}
function objHasProperty(obj, propertyName, propertyType, trace) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (!(propertyName in obj)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: missing ".concat(String(propertyName), "."));
        return false;
    }
    const value = obj[propertyName];
    if (value === null || value === undefined) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: ".concat(String(propertyName), " is null or undefined."));
        return false;
    }
    if (typeof value !== propertyType) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: ".concat(String(propertyName), " is not a ").concat(propertyType, "."));
        return false;
    }
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/fhevm/internal/PublicKeyStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicKeyStorageGet",
    ()=>publicKeyStorageGet,
    "publicKeyStorageSet",
    ()=>publicKeyStorageSet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/idb/build/index.js [app-client] (ecmascript)");
;
let __dbPromise = undefined;
async function _getDB() {
    if (__dbPromise) {
        return __dbPromise;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    __dbPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDB"])("fhevm", 1, {
        upgrade (db) {
            if (!db.objectStoreNames.contains("paramsStore")) {
                db.createObjectStore("paramsStore", {
                    keyPath: "acl"
                });
            }
            if (!db.objectStoreNames.contains("publicKeyStore")) {
                db.createObjectStore("publicKeyStore", {
                    keyPath: "acl"
                });
            }
        }
    });
    return __dbPromise;
}
function assertFhevmStoredPublicKey(value) {
    if (typeof value !== "object") {
        throw new Error("FhevmStoredPublicKey must be an object");
    }
    if (value === null) {
        return;
    }
    if (!("publicKeyId" in value)) {
        throw new Error("FhevmStoredPublicKey.publicKeyId does not exist");
    }
    if (typeof value.publicKeyId !== "string") {
        throw new Error("FhevmStoredPublicKey.publicKeyId must be a string");
    }
    if (!("publicKey" in value)) {
        throw new Error("FhevmStoredPublicKey.publicKey does not exist");
    }
    if (!(value.publicKey instanceof Uint8Array)) {
        throw new Error("FhevmStoredPublicKey.publicKey must be a Uint8Array");
    }
}
function assertFhevmStoredPublicParams(value) {
    if (typeof value !== "object") {
        throw new Error("FhevmStoredPublicParams must be an object");
    }
    if (value === null) {
        return;
    }
    if (!("publicParamsId" in value)) {
        throw new Error("FhevmStoredPublicParams.publicParamsId does not exist");
    }
    if (typeof value.publicParamsId !== "string") {
        throw new Error("FhevmStoredPublicParams.publicParamsId must be a string");
    }
    if (!("publicParams" in value)) {
        throw new Error("FhevmStoredPublicParams.publicParams does not exist");
    }
    if (!(value.publicParams instanceof Uint8Array)) {
        throw new Error("FhevmStoredPublicParams.publicParams must be a Uint8Array");
    }
}
async function publicKeyStorageGet(aclAddress) {
    const db = await _getDB();
    if (!db) {
        return {
            publicParams: null
        };
    }
    let storedPublicKey = null;
    try {
        const pk = await db.get("publicKeyStore", aclAddress);
        if (pk === null || pk === void 0 ? void 0 : pk.value) {
            assertFhevmStoredPublicKey(pk.value);
            storedPublicKey = pk.value;
        }
    } catch (e) {
    //
    }
    let storedPublicParams = null;
    try {
        const pp = await db.get("paramsStore", aclAddress);
        if (pp === null || pp === void 0 ? void 0 : pp.value) {
            assertFhevmStoredPublicParams(pp.value);
            storedPublicParams = pp.value;
        }
    } catch (e) {
    //
    }
    const publicKeyData = storedPublicKey === null || storedPublicKey === void 0 ? void 0 : storedPublicKey.publicKey;
    const publicKeyId = storedPublicKey === null || storedPublicKey === void 0 ? void 0 : storedPublicKey.publicKeyId;
    const publicParams = storedPublicParams ? {
        "2048": storedPublicParams
    } : null;
    let publicKey = undefined;
    if (publicKeyId && publicKeyData) {
        publicKey = {
            id: publicKeyId,
            data: publicKeyData
        };
    }
    return {
        ...publicKey !== undefined && {
            publicKey
        },
        publicParams
    };
}
async function publicKeyStorageSet(aclAddress, publicKey, publicParams) {
    assertFhevmStoredPublicKey(publicKey);
    assertFhevmStoredPublicParams(publicParams);
    const db = await _getDB();
    if (!db) {
        return;
    }
    if (publicKey) {
        await db.put("publicKeyStore", {
            acl: aclAddress,
            value: publicKey
        });
    }
    if (publicParams) {
        await db.put("paramsStore", {
            acl: aclAddress,
            value: publicParams
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/fhevm/internal/fhevm.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FhevmAbortError",
    ()=>FhevmAbortError,
    "FhevmReactError",
    ()=>FhevmReactError,
    "createFhevmInstance",
    ()=>createFhevmInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/address/checks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/RelayerSDKLoader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/PublicKeyStorage.ts [app-client] (ecmascript)");
;
;
;
;
class FhevmReactError extends Error {
    constructor(code, message, options){
        super(message, options), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "code", void 0);
        this.code = code;
        this.name = "FhevmReactError";
    }
}
function throwFhevmError(code, message, cause) {
    throw new FhevmReactError(code, message, cause ? {
        cause
    } : undefined);
}
const isFhevmInitialized = ()=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        return false;
    }
    return window.relayerSDK.__initialized__ === true;
};
const fhevmLoadSDK = ()=>{
    const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RelayerSDKLoader"]({
        trace: console.log
    });
    return loader.load();
};
const fhevmInitSDK = async (options)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        throw new Error("window.relayerSDK is not available");
    }
    const result = await window.relayerSDK.initSDK(options);
    window.relayerSDK.__initialized__ = result;
    if (!result) {
        throw new Error("window.relayerSDK.initSDK failed.");
    }
    return true;
};
function checkIsAddress(a) {
    if (typeof a !== "string") {
        return false;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(a)) {
        return false;
    }
    return true;
}
class FhevmAbortError extends Error {
    constructor(message = "FHEVM operation was cancelled"){
        super(message);
        this.name = "FhevmAbortError";
    }
}
async function getChainId(providerOrUrl) {
    if (typeof providerOrUrl === "string") {
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](providerOrUrl);
        return Number((await provider.getNetwork()).chainId);
    }
    const chainId = await providerOrUrl.request({
        method: "eth_chainId"
    });
    return Number.parseInt(chainId, 16);
}
async function getWeb3Client(rpcUrl) {
    const rpc = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
    try {
        const version = await rpc.send("web3_clientVersion", []);
        return version;
    } catch (e) {
        throwFhevmError("WEB3_CLIENTVERSION_ERROR", "The URL ".concat(rpcUrl, " is not a Web3 node or is not reachable. Please check the endpoint."), e);
    } finally{
        rpc.destroy();
    }
}
async function tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl) {
    const version = await getWeb3Client(rpcUrl);
    if (typeof version !== "string" || !version.toLowerCase().includes("hardhat")) {
        // Not a Hardhat Node
        return undefined;
    }
    try {
        const metadata = await getFHEVMRelayerMetadata(rpcUrl);
        if (!metadata || typeof metadata !== "object") {
            return undefined;
        }
        if (!("ACLAddress" in metadata && typeof metadata.ACLAddress === "string" && metadata.ACLAddress.startsWith("0x"))) {
            return undefined;
        }
        if (!("InputVerifierAddress" in metadata && typeof metadata.InputVerifierAddress === "string" && metadata.InputVerifierAddress.startsWith("0x"))) {
            return undefined;
        }
        if (!("KMSVerifierAddress" in metadata && typeof metadata.KMSVerifierAddress === "string" && metadata.KMSVerifierAddress.startsWith("0x"))) {
            return undefined;
        }
        return metadata;
    } catch (e) {
        // Not a FHEVM Hardhat Node
        return undefined;
    }
}
async function getFHEVMRelayerMetadata(rpcUrl) {
    const rpc = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
    try {
        const version = await rpc.send("fhevm_relayer_metadata", []);
        return version;
    } catch (e) {
        throwFhevmError("FHEVM_RELAYER_METADATA_ERROR", "The URL ".concat(rpcUrl, " is not a FHEVM Hardhat node or is not reachable. Please check the endpoint."), e);
    } finally{
        rpc.destroy();
    }
}
async function resolve(providerOrUrl, mockChains) {
    // Resolve chainId
    const chainId = await getChainId(providerOrUrl);
    // Resolve rpc url
    let rpcUrl = typeof providerOrUrl === "string" ? providerOrUrl : undefined;
    const _mockChains = {
        31337: "http://localhost:8545",
        ...mockChains !== null && mockChains !== void 0 ? mockChains : {}
    };
    // Help Typescript solver here:
    if (Object.hasOwn(_mockChains, chainId)) {
        if (!rpcUrl) {
            rpcUrl = _mockChains[chainId];
        }
        return {
            isMock: true,
            chainId,
            rpcUrl
        };
    }
    return {
        isMock: false,
        chainId,
        rpcUrl
    };
}
const createFhevmInstance = async (parameters)=>{
    const throwIfAborted = ()=>{
        if (signal.aborted) throw new FhevmAbortError();
    };
    const notify = (status)=>{
        if (onStatusChange) onStatusChange(status);
    };
    const { signal, onStatusChange, provider: providerOrUrl, mockChains } = parameters;
    // Resolve chainId
    const { isMock, rpcUrl, chainId } = await resolve(providerOrUrl, mockChains);
    if (isMock) {
        // Throws an error if cannot connect or url does not refer to a Web3 client
        const fhevmRelayerMetadata = await tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl);
        if (fhevmRelayerMetadata) {
            // fhevmRelayerMetadata is defined, which means rpcUrl refers to a FHEVM Hardhat Node
            notify("creating");
            //////////////////////////////////////////////////////////////////////////
            // 
            // WARNING!!
            // ALWAY USE DYNAMIC IMPORT TO AVOID INCLUDING THE ENTIRE FHEVM MOCK LIB 
            // IN THE FINAL PRODUCTION BUNDLE!!
            // 
            //////////////////////////////////////////////////////////////////////////
            const fhevmMock = await __turbopack_context__.A("[project]/frontend/fhevm/internal/mock/fhevmMock.ts [app-client] (ecmascript, async loader)");
            const mockInstance = await fhevmMock.fhevmMockCreateInstance({
                rpcUrl,
                chainId,
                metadata: fhevmRelayerMetadata
            });
            throwIfAborted();
            return mockInstance;
        }
    }
    throwIfAborted();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        notify("sdk-loading");
        // throws an error if failed
        await fhevmLoadSDK();
        throwIfAborted();
        notify("sdk-loaded");
    }
    // notify that state === "sdk-loaded"
    if (!isFhevmInitialized()) {
        notify("sdk-initializing");
        // throws an error if failed
        await fhevmInitSDK();
        throwIfAborted();
        notify("sdk-initialized");
    }
    const relayerSDK = window.relayerSDK;
    const aclAddress = relayerSDK.SepoliaConfig.aclContractAddress;
    if (!checkIsAddress(aclAddress)) {
        throw new Error("Invalid address: ".concat(aclAddress));
    }
    const pub = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyStorageGet"])(aclAddress);
    throwIfAborted();
    const config = {
        ...relayerSDK.SepoliaConfig,
        network: providerOrUrl,
        publicKey: pub.publicKey,
        publicParams: pub.publicParams
    };
    // notify that state === "creating"
    notify("creating");
    const instance = await relayerSDK.createInstance(config);
    // Save the key even if aborted
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyStorageSet"])(aclAddress, instance.getPublicKey(), instance.getPublicParams(2048));
    throwIfAborted();
    return instance;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/fhevm/useFhevm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFhevm",
    ()=>useFhevm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$fhevm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/fhevm.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function _assert(condition, message) {
    if (!condition) {
        const m = message ? "Assertion failed: ".concat(message) : "Assertion failed.";
        console.error(m);
        throw new Error(m);
    }
}
function useFhevm(parameters) {
    _s();
    const { provider, chainId, initialMockChains, enabled = true } = parameters;
    const [instance, _setInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [status, _setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, _setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [_isRunning, _setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(enabled);
    const [_providerChanged, _setProviderChanged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const _abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const _providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(provider);
    const _chainIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(chainId);
    const _mockChainsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialMockChains);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFhevm.useCallback[refresh]": ()=>{
            // Provider or chainId has changed. Abort immediately
            if (_abortControllerRef.current) {
                _providerRef.current = undefined;
                _chainIdRef.current = undefined;
                _abortControllerRef.current.abort();
                _abortControllerRef.current = null;
            }
            _providerRef.current = provider;
            _chainIdRef.current = chainId;
            // Nullify instance immediately
            _setInstance(undefined);
            _setError(undefined);
            _setStatus("idle");
            if (provider !== undefined) {
                // Force call main useEffect
                _setProviderChanged({
                    "useFhevm.useCallback[refresh]": (prev)=>prev + 1
                }["useFhevm.useCallback[refresh]"]);
            }
        }
    }["useFhevm.useCallback[refresh]"], [
        provider,
        chainId
    ]);
    // Merge in main useEffect!!!
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFhevm.useEffect": ()=>{
            refresh();
        }
    }["useFhevm.useEffect"], [
        refresh
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFhevm.useEffect": ()=>{
            _setIsRunning(enabled);
        }
    }["useFhevm.useEffect"], [
        enabled
    ]);
    // Main useEffect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFhevm.useEffect": ()=>{
            if (_isRunning === false) {
                // cancelled
                if (_abortControllerRef.current) {
                    _abortControllerRef.current.abort();
                    _abortControllerRef.current = null;
                }
                _setInstance(undefined);
                _setError(undefined);
                _setStatus("idle");
                return;
            }
            if (_isRunning === true) {
                if (_providerRef.current === undefined) {
                    _setInstance(undefined);
                    _setError(undefined);
                    _setStatus("idle");
                    return;
                }
                if (!_abortControllerRef.current) {
                    _abortControllerRef.current = new AbortController();
                }
                _assert(!_abortControllerRef.current.signal.aborted, "!controllerRef.current.signal.aborted");
                // Keep old instance
                _setStatus("loading");
                _setError(undefined);
                const thisSignal = _abortControllerRef.current.signal;
                const thisProvider = _providerRef.current;
                const thisRpcUrlsByChainId = _mockChainsRef.current;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$fhevm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFhevmInstance"])({
                    signal: thisSignal,
                    provider: thisProvider,
                    mockChains: thisRpcUrlsByChainId,
                    onStatusChange: {
                        "useFhevm.useEffect": (s)=>console.log("[useFhevm] createFhevmInstance status changed: ".concat(s))
                    }["useFhevm.useEffect"]
                }).then({
                    "useFhevm.useEffect": (i)=>{
                        console.log("[useFhevm] createFhevmInstance created!");
                        if (thisSignal.aborted) return;
                        _assert(thisProvider === _providerRef.current, "thisProvider === _providerRef.current");
                        _setInstance(i);
                        _setError(undefined);
                        _setStatus("ready");
                    }
                }["useFhevm.useEffect"]).catch({
                    "useFhevm.useEffect": (e)=>{
                        console.log("Error Was thrown !!! error... " + e.name);
                        if (thisSignal.aborted) return;
                        _assert(thisProvider === _providerRef.current, "thisProvider === _providerRef.current");
                        _setInstance(undefined);
                        _setError(e);
                        _setStatus("error");
                    }
                }["useFhevm.useEffect"]);
            }
        }
    }["useFhevm.useEffect"], [
        _isRunning,
        _providerChanged
    ]);
    return {
        instance,
        refresh,
        error,
        status
    };
}
_s(useFhevm, "FnHDS2iQ+HIIYWVBLBtg967ZgT8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/abi/EncryptedDebtRegisterABI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/ __turbopack_context__.s([
    "EncryptedDebtRegisterABI",
    ()=>EncryptedDebtRegisterABI
]);
const EncryptedDebtRegisterABI = {
    "abi": [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "requester",
                    "type": "address"
                }
            ],
            "name": "DebtDecrypted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "submitter",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint8",
                    "name": "debtType",
                    "type": "uint8"
                },
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "timestamp",
                    "type": "uint64"
                }
            ],
            "name": "DebtSubmitted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "name": "DebtUpdated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getDebtMetadata",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "submitter",
                    "type": "address"
                },
                {
                    "internalType": "uint8",
                    "name": "debtType",
                    "type": "uint8"
                },
                {
                    "internalType": "uint64",
                    "name": "timestamp",
                    "type": "uint64"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getEncryptedAmount",
            "outputs": [
                {
                    "internalType": "euint32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getEncryptedOwner",
            "outputs": [
                {
                    "internalType": "eaddress",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalDebtCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getUserDebtCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getUserDebtIdAt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "protocolId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "externalEaddress",
                    "name": "encOwnerAddr",
                    "type": "bytes32"
                },
                {
                    "internalType": "externalEuint32",
                    "name": "encDebtAmount",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "inputProof",
                    "type": "bytes"
                },
                {
                    "internalType": "uint8",
                    "name": "debtType",
                    "type": "uint8"
                }
            ],
            "name": "submitDebt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "name": "typeCounts",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "name": "updateDebtStatus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/config/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Import generated ABI
__turbopack_context__.s([
    "CONTRACT_ABI",
    ()=>CONTRACT_ABI,
    "CONTRACT_ADDRESS",
    ()=>CONTRACT_ADDRESS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$EncryptedDebtRegisterABI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/abi/EncryptedDebtRegisterABI.ts [app-client] (ecmascript)");
;
const CONTRACT_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xf7CcdcDf8bfdf79187832777fB2Eb77a8A3cC6C7"; // Sepolia deployment
const CONTRACT_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$EncryptedDebtRegisterABI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EncryptedDebtRegisterABI"].abi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/DebtSubmit.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DebtSubmit",
    ()=>DebtSubmit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/useFhevm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DEBT_TYPES = [
    {
        value: 0,
        label: "Loan",
        icon: "🏦"
    },
    {
        value: 1,
        label: "Credit Card",
        icon: "💳"
    },
    {
        value: 2,
        label: "Borrowing",
        icon: "🤝"
    },
    {
        value: 3,
        label: "Other",
        icon: "📝"
    }
];
function DebtSubmit() {
    var _walletClient_chain;
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    // Use window.ethereum for FHEVM (it needs EIP1193 provider)
    const { instance, status: fhevmStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFhevm"])({
        provider: ("TURBOPACK compile-time truthy", 1) ? window.ethereum : "TURBOPACK unreachable",
        chainId: walletClient === null || walletClient === void 0 ? void 0 : (_walletClient_chain = walletClient.chain) === null || _walletClient_chain === void 0 ? void 0 : _walletClient_chain.id,
        enabled: !!walletClient && "object" !== "undefined",
        initialMockChains: {
            31337: "http://localhost:8545"
        }
    });
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [debtType, setDebtType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fix hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebtSubmit.useEffect": ()=>{
            setMounted(true);
        }
    }["DebtSubmit.useEffect"], []);
    const onSubmit = async (e)=>{
        e.preventDefault();
        setStatus("");
        if (!address) {
            setStatus("Please connect your wallet");
            return;
        }
        if (!instance || fhevmStatus !== "ready") {
            setStatus("Encryption system not ready. Please wait...");
            return;
        }
        const contractAddress = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"];
        if (!contractAddress) {
            setStatus("Contract not deployed. Please deploy the contract first.");
            return;
        }
        const amountNum = parseInt(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setStatus("Please enter a valid debt amount");
            return;
        }
        try {
            setStatus("Encrypting data...");
            // Let the browser repaint before running encryption (CPU-intensive)
            await new Promise((resolve)=>setTimeout(resolve, 100));
            // Encrypt owner address and debt amount with retry logic
            const buffer = instance.createEncryptedInput(contractAddress, address);
            buffer.addAddress(address);
            buffer.add32(amountNum);
            // Retry logic for FHE encryption (relayer may be temporarily unavailable)
            let encrypted;
            let retryCount = 0;
            const maxRetries = 3;
            while(retryCount < maxRetries){
                try {
                    setStatus("Encrypting data (attempt ".concat(retryCount + 1, "/").concat(maxRetries, ")..."));
                    encrypted = await buffer.encrypt();
                    console.log("FHE encryption successful");
                    break;
                } catch (encryptError) {
                    retryCount++;
                    const errorMsg = (encryptError === null || encryptError === void 0 ? void 0 : encryptError.message) || String(encryptError);
                    console.warn("FHE encryption attempt ".concat(retryCount, " failed:"), errorMsg);
                    if (retryCount >= maxRetries) {
                        // Provide more helpful error message
                        if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
                            throw new Error("Encryption failed: Unable to connect to FHEVM Relayer service. " + "This may be due to network issues or the relayer being temporarily unavailable. " + "Please check your internet connection and try again in a few moments.");
                        }
                        throw new Error("Encryption failed after ".concat(maxRetries, " attempts: ").concat(errorMsg));
                    }
                    // Exponential backoff: 2s, 4s, 8s
                    const waitTime = Math.pow(2, retryCount) * 1000;
                    setStatus("Encryption failed, retrying in ".concat(waitTime / 1000, "s..."));
                    await new Promise((resolve)=>setTimeout(resolve, waitTime));
                }
            }
            if (!encrypted) {
                throw new Error("Encryption failed: No encrypted data generated");
            }
            setStatus("Submitting transaction...");
            // Validate encrypted handles
            if (!encrypted.handles || encrypted.handles.length < 2) {
                throw new Error("Invalid encrypted data: Missing required handles");
            }
            if (!encrypted.inputProof) {
                throw new Error("Invalid encrypted data: Missing input proof");
            }
            // Prepare contract interaction
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
            const signer = await provider.getSigner();
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](contractAddress, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], signer);
            const tx = await contract.submitDebt(encrypted.handles[0], encrypted.handles[1], encrypted.inputProof, debtType);
            setStatus("Transaction submitted: ".concat(tx.hash, ". Waiting for confirmation..."));
            await tx.wait();
            setStatus("✅ Debt record submitted successfully!");
            setAmount("");
        } catch (error) {
            setStatus("Error: ".concat(error.message || "Transaction failed"));
            console.error(error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "32px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid #e5e7eb"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#111827",
                            margin: "0 0 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "➕"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            "Submit New Debt Record"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            color: "#6b7280",
                            fontSize: "14px"
                        },
                        children: "Record your debt amount and type. All data is encrypted before being stored on-chain."
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                style: {
                    display: "grid",
                    gap: "24px",
                    maxWidth: "600px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            display: "grid",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#374151",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    "Debt Amount (USD)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#ef4444",
                                            fontSize: "16px"
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: amount,
                                onChange: (e)=>setAmount(e.target.value),
                                required: true,
                                placeholder: "Enter debt amount (e.g., 5000)",
                                min: "1",
                                style: {
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    background: "#f9fafb",
                                    color: "#111827",
                                    fontSize: "15px",
                                    fontFamily: "inherit",
                                    transition: "all 0.2s"
                                },
                                onFocus: (e)=>{
                                    e.currentTarget.style.borderColor = "#667eea";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                },
                                onBlur: (e)=>{
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            display: "grid",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#374151",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "📋"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    "Debt Type",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#ef4444",
                                            fontSize: "16px"
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "12px"
                                },
                                children: DEBT_TYPES.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setDebtType(type.value),
                                        style: {
                                            padding: "16px",
                                            border: debtType === type.value ? "2px solid #667eea" : "1px solid #d1d5db",
                                            borderRadius: "8px",
                                            background: debtType === type.value ? "#eef2ff" : "white",
                                            color: "#111827",
                                            fontSize: "14px",
                                            fontWeight: debtType === type.value ? "600" : "400",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: type.icon
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: type.label
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, type.value, true, {
                                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: !mounted || !address || fhevmStatus !== "ready" || status.includes("Submitting") || status.includes("Transaction"),
                        style: {
                            padding: "14px 24px",
                            background: !mounted || !address || fhevmStatus !== "ready" ? "#d1d5db" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: !mounted || !address || fhevmStatus !== "ready" ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                        },
                        children: !mounted ? "Loading..." : !address ? "Connect Wallet" : fhevmStatus !== "ready" ? "Initializing Encryption..." : status.includes("Submitting") || status.includes("Transaction") ? "Processing..." : "Submit Debt Record"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 16px",
                            borderRadius: "8px",
                            background: status.includes("✅") ? "#d1fae5" : status.includes("Error") ? "#fee2e2" : "#dbeafe",
                            color: status.includes("✅") ? "#065f46" : status.includes("Error") ? "#991b1b" : "#1e40af",
                            fontSize: "14px"
                        },
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtSubmit.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtSubmit.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DebtSubmit.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(DebtSubmit, "Mme33rz5254eJivg4B3Oyyy18co=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFhevm"]
    ];
});
_c = DebtSubmit;
var _c;
__turbopack_context__.k.register(_c, "DebtSubmit");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/DebtList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DebtList",
    ()=>DebtList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/useFhevm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DEBT_TYPE_LABELS = {
    0: {
        label: "Loan",
        icon: "🏦"
    },
    1: {
        label: "Credit Card",
        icon: "💳"
    },
    2: {
        label: "Borrowing",
        icon: "🤝"
    },
    3: {
        label: "Other",
        icon: "📝"
    }
};
function DebtList() {
    var _walletClient_chain;
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    // Use window.ethereum for FHEVM (it needs EIP1193 provider)
    const { instance, status: fhevmStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFhevm"])({
        provider: ("TURBOPACK compile-time truthy", 1) ? window.ethereum : "TURBOPACK unreachable",
        chainId: walletClient === null || walletClient === void 0 ? void 0 : (_walletClient_chain = walletClient.chain) === null || _walletClient_chain === void 0 ? void 0 : _walletClient_chain.id,
        enabled: !!walletClient && "object" !== "undefined",
        initialMockChains: {
            31337: "http://localhost:8545"
        }
    });
    const [debts, setDebts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const loadDebts = async ()=>{
        if (!address || !__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"]) {
            setStatus("Please connect wallet and ensure contract is deployed");
            return;
        }
        setLoading(true);
        setStatus("Loading your debt records...");
        try {
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], provider);
            const count = await contract.getUserDebtCount(address);
            const debtList = [];
            for(let i = 0; i < Number(count); i++){
                const debtId = await contract.getUserDebtIdAt(address, i);
                const metadata = await contract.getDebtMetadata(debtId);
                debtList.push({
                    id: debtId,
                    submitter: metadata.submitter,
                    debtType: metadata.debtType,
                    timestamp: metadata.timestamp,
                    isActive: metadata.isActive
                });
            }
            setDebts(debtList);
            setStatus("Found ".concat(debtList.length, " debt record(s)"));
        } catch (error) {
            setStatus("Error loading debts: ".concat(error.message));
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    const decryptDebt = async (debtId)=>{
        if (!instance || fhevmStatus !== "ready" || !address || !__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"] || !walletClient) {
            setStatus("Encryption system not ready");
            return;
        }
        setDebts((prev)=>prev.map((d)=>d.id === debtId ? {
                    ...d,
                    isDecrypting: true
                } : d));
        try {
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], provider);
            const encryptedAmount = await contract.getEncryptedAmount(debtId);
            // Check if handle is zero (uninitialized)
            const zeroHandle = "0x0000000000000000000000000000000000000000000000000000000000000000";
            if (encryptedAmount === zeroHandle || encryptedAmount === "0x0") {
                setDebts((prev)=>prev.map((d)=>d.id === debtId ? {
                            ...d,
                            decryptedAmount: 0n,
                            isDecrypting: false
                        } : d));
                return;
            }
            // Generate keypair for decryption
            const keypair = instance.generateKeypair();
            const handleContractPairs = [
                {
                    handle: encryptedAmount,
                    contractAddress: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"]
                }
            ];
            const startTimeStamp = Math.floor(Date.now() / 1000).toString();
            const durationDays = "10";
            const contractAddresses = [
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"]
            ];
            // Create EIP712 signature
            const eip712 = instance.createEIP712(keypair.publicKey, contractAddresses, startTimeStamp, durationDays);
            // Sign typed data using wallet client
            const signature = await walletClient.signTypedData({
                account: address,
                domain: eip712.domain,
                types: {
                    UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification
                },
                primaryType: "UserDecryptRequestVerification",
                message: eip712.message
            });
            // Decrypt using FHEVM
            const result = await instance.userDecrypt(handleContractPairs, keypair.privateKey, keypair.publicKey, signature.replace("0x", ""), contractAddresses, address, startTimeStamp, durationDays);
            const amount = result[encryptedAmount] || BigInt(0);
            setDebts((prev)=>prev.map((d)=>d.id === debtId ? {
                        ...d,
                        decryptedAmount: amount,
                        isDecrypting: false
                    } : d));
        } catch (error) {
            setStatus("Error decrypting: ".concat(error.message));
            setDebts((prev)=>prev.map((d)=>d.id === debtId ? {
                        ...d,
                        isDecrypting: false
                    } : d));
            console.error(error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebtList.useEffect": ()=>{
            if (address) {
                loadDebts();
            }
        }
    }["DebtList.useEffect"], [
        address
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "32px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "700",
                                    color: "#111827",
                                    margin: "0 0 8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "📋"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    "My Debt Records"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtList.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    color: "#6b7280",
                                    fontSize: "14px"
                                },
                                children: "View and decrypt your encrypted debt records"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtList.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtList.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: loadDebts,
                        disabled: loading,
                        style: {
                            padding: "10px 20px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.6 : 1
                        },
                        children: loading ? "Loading..." : "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtList.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtList.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "24px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: status.includes("Error") ? "#fee2e2" : "#dbeafe",
                    color: status.includes("Error") ? "#991b1b" : "#1e40af",
                    fontSize: "14px"
                },
                children: status
            }, void 0, false, {
                fileName: "[project]/frontend/components/DebtList.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this),
            debts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "48px",
                    textAlign: "center",
                    color: "#6b7280"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "18px",
                            margin: "0 0 8px"
                        },
                        children: "No debt records found"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtList.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "14px",
                            margin: 0
                        },
                        children: "Submit a debt record to get started"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtList.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtList.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gap: "16px"
                },
                children: debts.map((debt)=>{
                    const typeInfo = DEBT_TYPE_LABELS[debt.debtType] || {
                        label: "Unknown",
                        icon: "❓"
                    };
                    const date = new Date(Number(debt.timestamp) * 1000).toLocaleString();
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "20px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            background: "white",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                    marginBottom: "16px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    marginBottom: "8px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "20px"
                                                        },
                                                        children: typeInfo.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "18px",
                                                            fontWeight: "600",
                                                            color: "#111827"
                                                        },
                                                        children: typeInfo.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: "4px 8px",
                                                            borderRadius: "4px",
                                                            fontSize: "12px",
                                                            fontWeight: "500",
                                                            background: debt.isActive ? "#d1fae5" : "#fee2e2",
                                                            color: debt.isActive ? "#065f46" : "#991b1b"
                                                        },
                                                        children: debt.isActive ? "Active" : "Closed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/DebtList.tsx",
                                                lineNumber: 278,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: 0,
                                                    color: "#6b7280",
                                                    fontSize: "14px"
                                                },
                                                children: [
                                                    "Recorded: ",
                                                    date
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/DebtList.tsx",
                                                lineNumber: 303,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                        lineNumber: 277,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#9ca3af"
                                        },
                                        children: [
                                            "ID: ",
                                            debt.id.toString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                        lineNumber: 307,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtList.tsx",
                                lineNumber: 269,
                                columnNumber: 17
                            }, this),
                            debt.decryptedAmount !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "16px",
                                    background: "#f0f9ff",
                                    borderRadius: "8px",
                                    border: "1px solid #bae6fd"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#0369a1",
                                            marginBottom: "4px"
                                        },
                                        children: "Decrypted Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                        lineNumber: 321,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            color: "#0c4a6e"
                                        },
                                        children: [
                                            "$",
                                            Number(debt.decryptedAmount).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DebtList.tsx",
                                        lineNumber: 324,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtList.tsx",
                                lineNumber: 313,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>decryptDebt(debt.id),
                                disabled: !instance || fhevmStatus !== "ready" || debt.isDecrypting,
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    background: !instance || fhevmStatus !== "ready" ? "#d1d5db" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: !instance || fhevmStatus !== "ready" ? "not-allowed" : "pointer",
                                    opacity: debt.isDecrypting ? 0.6 : 1
                                },
                                children: debt.isDecrypting ? "Decrypting..." : !instance || fhevmStatus !== "ready" ? "Encryption Not Ready" : "🔓 Decrypt Amount"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtList.tsx",
                                lineNumber: 335,
                                columnNumber: 19
                            }, this)
                        ]
                    }, debt.id.toString(), true, {
                        fileName: "[project]/frontend/components/DebtList.tsx",
                        lineNumber: 259,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend/components/DebtList.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DebtList.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(DebtList, "e8zfNf/4z0H1hhsPss/AyTcHtOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFhevm"]
    ];
});
_c = DebtList;
var _c;
__turbopack_context__.k.register(_c, "DebtList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/DebtStatistics.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DebtStatistics",
    ()=>DebtStatistics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const DEBT_TYPE_LABELS = {
    0: {
        label: "Loan",
        icon: "🏦",
        color: "#3b82f6"
    },
    1: {
        label: "Credit Card",
        icon: "💳",
        color: "#8b5cf6"
    },
    2: {
        label: "Borrowing",
        icon: "🤝",
        color: "#10b981"
    },
    3: {
        label: "Other",
        icon: "📝",
        color: "#f59e0b"
    }
};
function DebtStatistics() {
    _s();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadStats = async ()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"]) {
            return;
        }
        setLoading(true);
        try {
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
            const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ADDRESS"], __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], provider);
            const total = await contract.getTotalDebtCount();
            setTotalCount(total);
            const typeStats = {};
            for(let i = 0; i <= 3; i++){
                const count = await contract.typeCounts(i);
                typeStats[i] = count;
            }
            setStats(typeStats);
        } catch (error) {
            console.error("Error loading statistics:", error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebtStatistics.useEffect": ()=>{
            loadStats();
        }
    }["DebtStatistics.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "32px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "700",
                                    color: "#111827",
                                    margin: "0 0 8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    "Debt Statistics"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    color: "#6b7280",
                                    fontSize: "14px"
                                },
                                children: "Public statistics on debt types (amounts remain encrypted)"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: loadStats,
                        disabled: loading,
                        style: {
                            padding: "10px 20px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.6 : 1
                        },
                        children: loading ? "Loading..." : "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gap: "24px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "24px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "12px",
                            color: "white",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "14px",
                                    opacity: 0.9,
                                    marginBottom: "8px"
                                },
                                children: "Total Debt Records"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "36px",
                                    fontWeight: "700"
                                },
                                children: Number(totalCount).toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "16px"
                        },
                        children: Object.entries(DEBT_TYPE_LABELS).map((param)=>{
                            let [key, info] = param;
                            const count = stats[Number(key)] || 0n;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "20px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "12px",
                                    background: "white",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            marginBottom: "12px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "24px"
                                                },
                                                children: info.icon
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#111827"
                                                },
                                                children: info.label
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "28px",
                                            fontWeight: "700",
                                            color: info.color
                                        },
                                        children: Number(count).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#6b7280",
                                            marginTop: "4px"
                                        },
                                        children: "records"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DebtStatistics.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DebtStatistics.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DebtStatistics.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(DebtStatistics, "PzbbgKNym7G+7N+FJjWkEE3Pwfk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"]
    ];
});
_c = DebtStatistics;
var _c;
__turbopack_context__.k.register(_c, "DebtStatistics");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/DebtRegisterApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DebtRegisterApp",
    ()=>DebtRegisterApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@rainbow-me/rainbowkit/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtSubmit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/DebtSubmit.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/DebtList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtStatistics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/DebtStatistics.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DebtRegisterApp() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("submit");
    const tabs = [
        {
            id: "submit",
            label: "Submit Debt",
            icon: "➕"
        },
        {
            id: "view",
            label: "My Debts",
            icon: "📋"
        },
        {
            id: "stats",
            label: "Statistics",
            icon: "📊"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            padding: "24px",
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "1200px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "48px",
                        padding: "24px 32px",
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "32px",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: "bold"
                                    },
                                    children: "💳"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                margin: 0,
                                                fontSize: "28px",
                                                fontWeight: "700",
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent"
                                            },
                                            children: "Encrypted Debt Register"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: 0,
                                                fontSize: "14px",
                                                color: "#6b7280",
                                                fontWeight: "500"
                                            },
                                            children: "Privacy-First Financial Management"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConnectButton"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    style: {
                        display: "flex",
                        gap: "12px",
                        marginBottom: "32px",
                        padding: "8px",
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e5e7eb"
                    },
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                borderRadius: "8px",
                                border: "none",
                                background: activeTab === tab.id ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                                color: activeTab === tab.id ? "white" : "#6b7280",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                boxShadow: activeTab === tab.id ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            },
                            onMouseEnter: (e)=>{
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.background = "#f3f4f6";
                                    e.currentTarget.style.color = "#374151";
                                }
                            },
                            onMouseLeave: (e)=>{
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#6b7280";
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: tab.icon
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: tab.label
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    style: {
                        background: "white",
                        borderRadius: "16px",
                        padding: "32px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e5e7eb",
                        minHeight: "500px"
                    },
                    children: [
                        activeTab === "submit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtSubmit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebtSubmit"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 142,
                            columnNumber: 38
                        }, this),
                        activeTab === "view" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebtList"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 143,
                            columnNumber: 36
                        }, this),
                        activeTab === "stats" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DebtStatistics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DebtStatistics"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                            lineNumber: 144,
                            columnNumber: 37
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    style: {
                        marginTop: "32px",
                        padding: "24px",
                        textAlign: "center",
                        color: "#9ca3af",
                        fontSize: "14px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "Built with 🔐 using ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#667eea"
                                },
                                children: "Zama FHEVM"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                                lineNumber: 158,
                                columnNumber: 33
                            }, this),
                            " · Privacy-First Debt Management"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/DebtRegisterApp.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(DebtRegisterApp, "bhTU9rnXh5/KLGgqHRLTMh9+Na0=");
_c = DebtRegisterApp;
var _c;
__turbopack_context__.k.register(_c, "DebtRegisterApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_96a8accb._.js.map