namespace core {
  export class VersionedDeviceSpec extends utils.DeviceSpec {
    private browserVersion: utils.Version;
    // Obviously a bit naive for Windows; this is example code only, so whatever.
    private osVersion: utils.Version;

    constructor(browser: string, 
      browserVersion: utils.Version, 
      formFactor: string, 
      OS: string, 
      osVersion: utils.Version, 
      touchable: boolean) {

      super(browser, formFactor, OS, touchable);
      this.browserVersion = browserVersion;
      this.osVersion = osVersion;
    }

    get osIsLatestVersion(): boolean {
      switch(this.OS) {
        case utils.OperatingSystem.Windows:
          return this.osVersion.equals(new utils.Version("10.0.1909"));
        case utils.OperatingSystem.macOS:
          return this.osVersion.equals(new utils.Version("10.15"));
        case utils.OperatingSystem.Linux:
          // Latest Ubuntu LTS.  Obviously very naive, but good enough
          // for a demo project.
          return this.osVersion.equals(new utils.Version("18.4"));
        case utils.OperatingSystem.Android:
          // The latest release, API 29.
          return this.osVersion.equals(new utils.Version("10.0"));
        case utils.OperatingSystem.iOS:
          return this.osVersion.equals(new utils.Version("13.5"));
        default:
          // For anything else, we lack sufficient knowledge to properly return a boolean.
          return undefined;
      }
    }
  }
} 