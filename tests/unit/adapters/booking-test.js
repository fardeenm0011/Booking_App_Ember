import { module, test } from 'qunit';

import { setupTest } from 'booking-app/tests/helpers';

module('Unit | Adapter | booking', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:booking');
    assert.ok(adapter);
  });
});
