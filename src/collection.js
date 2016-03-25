const redis = require('promise-redis')();
const db = redis.createClient();

class Collection {
  constructor(json) {
    this.name = json.name;
    this.attributes = json.attributes;
    this.groupBy = json.groupBy;
  }

  async countBy(attr, val) {
    var count = await db
      .hget(`${this.name}_by_${attr}`, val);
    return Number(count);
  }

  async count() {
    var count = await db
      .zcount(`${this.name}`, '-inf', '+inf');
    return Number(count);
  }

  async add(event) {
    await db
      .zadd(`${this.name}`, 1, JSON.stringify(event));

    await this._incrGroups(event);
  }

  async _incrGroups(event) {
    for (let attr of this.groupBy) {
      await db.hincrby(`${this.name}_by_${attr}`, event[attr], 1);
    }
  }

  async clear() {
    await db.del(`${this.name}`);
    for (let attr of this.groupBy) {
      await db.del(`${this.name}_by_${attr}`);
    }
  }
}

export default Collection;