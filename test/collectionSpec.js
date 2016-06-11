import { expect } from 'chai';
import Collection from '../build/collection';

describe('Collection', () => {
  const repo = new Collection({
    name: 'pageviews',
    attributes: ['page', 'agent'],
    groupBy: ['page']
  });

  beforeEach(async () => {
    await repo.clear();
  });

  async function addEvent() {
    await repo.add({
      page: 'http://google.com',
      agent: 'Google Chrome'
    });
  }

  describe('async #add', () => {
    it('should add an event', async () => {
      await addEvent();
    });
  });

  describe('async #count', () => {
    it('should get total count', async () => {
      await addEvent();
      const totalCount = await repo.count();
      expect(totalCount).to.equal(1);
    });
  });

  describe('async #countBy', () => {
    it('should get count by attribute', async () => {
      await addEvent();
      const countByPage = await repo
        .countBy('page', 'http://google.com');
      expect(countByPage).to.equal(1);
    });
  });
});
