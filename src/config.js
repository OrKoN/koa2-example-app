import Collection from './collection';
import pageviews from '../config/collections/pageviews';
import postreads from '../config/collections/postreads';

var key = null;

try {
  key = require('../config/key');
} catch (err) {
  console.error('../config/key.json is not found. Please create it.')
  process.exit(1);
}

export default {
  collections: {
    pageviews: new Collection(pageviews),
    postreads: new Collection(postreads)
  },
  cors: require('../config/cors'),
  key: key
};
