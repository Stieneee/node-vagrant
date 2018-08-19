var rewire = require('rewire');
var EventEmitter = require('events').EventEmitter;
var expect = require('chai').expect;

var command = rewire('../src/command');

describe('test command', function () {
    var exSpawn;
    before(function () {
        exSpawn = command.__get__('spawn');
    });
    after(function () {
        command.__set__('spawn', exSpawn);
    });
    it('tests command returns spawned child', function (done) {
        var spawnMock = new EventEmitter();
        spawnMock.stdout = new EventEmitter();
        spawnMock.stderr = new EventEmitter();
        command.__set__('spawn', function () {
            return spawnMock;
        });

        var child = command.runCommand('vagrant up', function (err) {});

        expect(child === spawnMock);
        done();
    });
});
