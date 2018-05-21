const assert = require('assert');
const User = require('../src/user');

describe('Db conneted successsfullu', () => {
  it('saves a user', (done) => {
    const testUser = new User({ name: 'Victor Miguel' });

    testUser.save()
      .then(() => {
        assert(!testUser.isNew);
        done();
      });
  });
});


