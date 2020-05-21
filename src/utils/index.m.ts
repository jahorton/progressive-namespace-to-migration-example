// Cover module-based uses.
export * from './deviceSpec.m';
export * from './version.m';

// To facilitate the namespace export
import * as deviceSpec from './deviceSpec.m';
import * as version from './version.m';

// Many thanks to https://jorgeartieda.gitbook.io/typescript-from-namespaces-to-modules/solution for the inspiration,
// though additional work was needed to draw members from multiple sources.
// Ensures all of the following will be publicly-visible members of the resulting namespace.
declare global {
  namespace utils {
    export import Browser = deviceSpec.Browser;
    export import OperatingSystem = deviceSpec.OperatingSystem;
    export import FormFactor = deviceSpec.FormFactor;
    export import Version = version.Version;
    export import DeviceSpec = deviceSpec.DeviceSpec;
  }
}