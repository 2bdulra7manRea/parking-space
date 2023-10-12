/**
 *
 * Filter Query class using builder design pattern
 *
 */

export class ObjectBuilder {
  private object: { [key: string]: any };

  constructor() {
    this.object = {};
  }

  addProperty(key: string, value: any) {
    if (typeof value === "undefined") {
      return;
    }
    this.object = { ...this.object, [key]: value };
  }

  build(): { [key: string]: any } {
    return this.object;
  }
}
