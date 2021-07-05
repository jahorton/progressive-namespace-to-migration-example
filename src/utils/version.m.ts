// Dotted-decimal version
export class Version {
  public static readonly CURRENT = new Version("1.0.0");

  // Represents a default version value that would likely come before any other version..
  public static readonly FIRST_ALPHA = new Version([0, 0, 1]);

  private readonly components: number[]

  /**
   * Parses version information, preparing it for use in comparisons.
   * @param text Either a string representing a version number (ex: "9.0.0") or an array representing
   *             its components (ex: [9, 0, 0]).
   */
  constructor(text: String | number[]) {
    // If a version isn't specified, assume the most early possible basic semantic versioning value - 0.0.1.
    if(text === undefined || text === null) {
      this.components = [].concat(Version.FIRST_ALPHA.components);
      return;
    }

    if(Array.isArray(text)) {
      let components = text as number[];
      if(components.length < 2) {
        throw new Error("Version string must have at least a major and minor component!");
      } else {
        this.components = [].concat(components);
        return;
      }
    }

    // else, standard constructor path.
    let parts = text.split('.');
    let componentArray: number[] = [];

    if(parts.length < 2) {
      throw new Error("Version string must have at least a major and minor component!");
    }

    for(let i=0; i < parts.length; i++) {
      let value = parseInt(parts[i], 10);
      if(isNaN(value)) {
        throw new Error("Version string components must be numerical!");
      }

      componentArray.push(value);
    }

    this.components = componentArray;
  }

  get major(): number {
    return this.components[0];
  }

  get minor(): number {
    return this.components[1];
  }

  toString(): string {
    return this.components.join('.');
  }

  toJSON(): string {
    return this.toString();
  }

  equals(other: Version): boolean {
    return this.compareTo(other) == 0;
  }

  precedes(other: Version): boolean {
    return this.compareTo(other) < 0;
  }

  compareTo(other: Version): number {
    // If the version info depth differs, we need a flag to indicate which instance is shorter.
    var isShorter: boolean = this.components.length < other.components.length;
    var maxDepth: number = (this.components.length < other.components.length) ? this.components.length : other.components.length;

    var i: number;
    for(i = 0; i < maxDepth; i++) {
      let delta = this.components[i] - other.components[i];
      if(delta != 0) {
        return delta;
      }
    }

    var longList = isShorter ? other.components : this.components;
    do {
      if(longList[i] > 0) {
        return isShorter ? -1 : 1;
      }
      i++;
    } while (i < longList.length);

    // Equal.
    return 0;
  }
}