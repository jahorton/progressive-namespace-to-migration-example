// Cover module-based uses.
export * from './deviceSpec.m';
export * from './version.m';

// To facilitate the namespace export
import * as deviceSpec from './deviceSpec.m';
import * as version from './version.m';

// Many thanks to https://jorgeartieda.gitbook.io/typescript-from-namespaces-to-modules/solution for the inspiration,
// though additional work was needed to draw members from multiple sources.
// Declares all of the following will be publicly-visible members of the resulting namespace.
// Does not actually export them.
declare global {
  namespace utils {
    export import Browser = deviceSpec.Browser;
    export import OperatingSystem = deviceSpec.OperatingSystem;
    export import FormFactor = deviceSpec.FormFactor;
    export import Version = version.Version;
    export import DeviceSpec = deviceSpec.DeviceSpec;
  }
}

// Actually exporting the namespace object.
// Continued thanks to https://jorgeartieda.gitbook.io/typescript-from-namespaces-to-modules/solution for the inspiration.
if(typeof globalThis === 'undefined') {
  // @ts-ignore
  if(typeof window !== 'undefined') { // Browser
    // @ts-ignore
    globalThis = window;
    // @ts-ignore
  } else if(typeof self !== 'undefined') {  // WebWorker
    // @ts-ignore
    globalThis = self;
  } // We assume that Node and other cases all implement `globalThis` already for simplicity.
}

//@ts-ignore
globalThis.utils = globalThis.utils || {};
globalThis.utils = { ... globalThis.utils };

// We now assign each namespace member we wish to export as a member 
// of our manually-constructed namespace object, fulfilling our declaration.
globalThis.utils.Browser = deviceSpec.Browser;
globalThis.utils.DeviceSpec = deviceSpec.DeviceSpec;
globalThis.utils.FormFactor = deviceSpec.FormFactor;
globalThis.utils.OperatingSystem = deviceSpec.OperatingSystem;
globalThis.utils.Version = version.Version;