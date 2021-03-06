// test cube
var assert = require('assert');
var math = require('../../../index');
var unit = math.unit;
var bignumber = math.bignumber;
var fraction = math.fraction;
var matrix = math.matrix;
var range = math.range;
var cube = math.cube;

describe('cube', function() {
  it('should return the cube of a boolean', function () {
    assert.equal(cube(true), 1);
    assert.equal(cube(false), 0);
  });

  it('should return the cube of null', function () {
    assert.equal(math.ceil(null), 0);
  });

  it('should return the cube of a number', function() {
    assert.equal(cube(4), 64);
    assert.equal(cube(-2), -8);
    assert.equal(cube(0), 0);
  });

  it('should return the cube of a big number', function() {
    assert.deepEqual(cube(bignumber(4)), bignumber(64));
    assert.deepEqual(cube(bignumber(-2)), bignumber(-8));
    assert.deepEqual(cube(bignumber(0)), bignumber(0));
  });

  it('should return the cube of a fraction', function() {
    var a = fraction(0.5);
    assert(cube(a) instanceof math.type.Fraction);
    assert.equal(cube(a).toString(), '0.125');
    assert.equal(a.toString(), '0.5');
  });

  it('should return the cube of a complex number', function() {
    assert.deepEqual(cube(math.complex('2i')), math.complex('-8i'));
    assert.deepEqual(cube(math.complex('2+3i')), math.complex('-46+9i'));
    assert.deepEqual(cube(math.complex('2')), math.complex('8'));
  });

  it('should return the cube of a unit', function() {
    assert.equal(cube(math.unit('4 cm')).toString(), '64 cm^3');
    assert.equal(cube(math.unit('-2 cm')).toString(), '-8 cm^3');
    assert.equal(cube(math.unit('0 cm')).toString(), '0 cm^3');
  });

  it('should throw an error with strings', function() {
    assert.throws(function () {cube('text')});
  });

  it('should throw an error if there\'s wrong number of args', function() {
    assert.throws(function () {cube()}, /TypeError: Too few arguments/);
    assert.throws(function () {cube(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should cube each element in a matrix, array or range', function() {
    // array, matrix, range
    // arrays are evaluated element wise
    assert.deepEqual(cube([2,3,4,5]), [8,27,64,125]);
    assert.deepEqual(cube(matrix([2,3,4,5])), matrix([8,27,64,125]));
    assert.deepEqual(cube(matrix([[1,2],[3,4]])), matrix([[1,8],[27,64]]));
  });

  it('should cube Quaternions',function() {
    // assert.deepEqual(cube(new math.quaternion({i:1})), new math.quaternion({i:-1}));
    // assert.deepEqual(cube(new math.quaternion({j:1})), new math.quaternion({j:-1}));
    assert.deepEqual(cube(new math.quaternion({r:1})), new math.quaternion({r:1}));
    assert.deepEqual(cube(new math.quaternion({k:1})), new math.quaternion({k:-1}));
    assert.deepEqual(cube(new math.quaternion(1,2,3,4)), new math.quaternion(-86,-52,-78,-104));
    assert.deepEqual(cube(new math.quaternion(3,-2,-3,4)), new math.quaternion(-234,4,6,-8))
  });

  it('should LaTeX cube', function () {
    var expression = math.parse('cube(2)');
    assert.equal(expression.toTex(), '\\left(2\\right)^3');
  });  

});
