import { expect } from 'chai';
import request from 'supertest';
import app from '../build/app';
import config from '../build/config';

describe('API', () => {
  const inst = app.listen(4000);

  describe('POST /:collection', () => {
    it('should add an event', async () => {
      const page = 'http://google.com';
      const encoded = encodeURIComponent(page);
      const res = await request(inst)
        .post(`/pageviews`)
        .set({
          Authorization: 'Key ' + config.key
        })
        .send({
          time: 'now',
          referrer: 'a',
          agent: 'b',
          source: 'c',
          medium: 'd',
          campaign: 'e',
          page: page
        })
        .expect(201);
    });

    it('should not add an event if no key provided', async () => {
      const page = 'http://google.com';
      const encoded = encodeURIComponent(page);
      const res = await request(inst)
        .post(`/pageviews`)
        .send({
          time: 'now',
          referrer: 'a',
          agent: 'b',
          source: 'c',
          medium: 'd',
          campaign: 'e',
          page: page
        })
        .expect(401);
    });
  });

  describe('GET /:collection/:attr/:value/count', () => {
    it('should get count by page', async () => {
      const page = 'http://google.com';
      const encoded = encodeURIComponent(page);
      const res = await request(inst)
        .get(`/pageviews/page/${encoded}/count`)
        .set({
          Authorization: 'Key ' + config.key
        })
        .send()
        .expect(200);

      expect(res).to.be.a.number;
    });
    it('should not add an event if no key provided', async () => {
      const page = 'http://google.com';
      const encoded = encodeURIComponent(page);
      const res = await request(inst)
        .get(`/pageviews/page/${encoded}/count`)
        .send()
        .expect(401);
    });
  });
});
