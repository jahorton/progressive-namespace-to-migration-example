var assert = require('chai').assert;

// Verifies that we can access Version directly from the base-level module import file.
let Version = require('../dist').utils;

// // Alternatively, requires the module_bundle, which auto-exports the namespace.
// // We can't require the bundle, as it's been webpack'd and thus doesn't do actual module exports.
// require('../dist/intermediate/module_bundle');
// let Version = utils.Version;


describe('Version Logic', function() {
  it('Should provide a default, fallback value when nothing is specified', function() {
    var fallback = new utils.Version(undefined);
    assert.isTrue(fallback.equals(utils.Version.FIRST_ALPHA));
  });

  it('Should properly process a simple major.minor version string.', function() {
    var version = new utils.Version("1.2");
    assert.equal(version.major, 1);
    assert.equal(version.minor, 2);
  });

  it('Should handle long/deep version specifications.', function() {
    var version = new utils.Version("1.2.3.4.5.6");
    assert.equal(version.components.length, 6);
    assert.equal(version.major, 1);
    assert.equal(version.minor, 2);
  });

  it('Should properly compare two versions.', function() {
    var v9_0_1 = new utils.Version("9.0.1");
    var v9_1_0 = new utils.Version("9.1.0");
    var v10_0 = new utils.Version("10.0");
    var v10_0_0 = new utils.Version("10.0.0");

    // "Precede" checks
    assert.equal(v9_0_1.compareTo(v9_1_0), -1);
    assert.equal(v9_1_0.compareTo(v10_0_0), -1);
    assert.equal(v9_0_1.compareTo(v10_0_0), -1);

    // Equality checks
    assert.equal(v9_0_1.compareTo(v9_0_1), 0);
    // Tests equal versions where one omits the build number.
    assert.equal( v10_0.compareTo(v10_0_0), 0);

    // Ensures the first "precede" check's return is flipped when the order's flipped.
    assert.equal(v9_1_0.compareTo(v9_0_1), 1);
  });
    
});