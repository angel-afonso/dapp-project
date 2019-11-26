const Storage = artifacts.require("./Storage.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("Storage", accounts => {
    let storageInstance;

    beforeEach(async () => {
        storageInstance = await Storage.new({ from: accounts[0] })
    });

    it('Should emit StoredFile event', async () => {
        let tx = await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [], { from: accounts[0] });
        truffleAssert.eventEmitted(tx, 'StoredFile', (e) => {
            return e.owner === accounts[0] && e.index == 0;
        });
    });

    it('Should get file hash', async () => {
        await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [], { from: accounts[0] });
        assert.equal(await storageInstance.getFile(0, { from: accounts[0] }), `0x${'0'.repeat(64)}`);
    });

    it('Should delete file', async () => {
        await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [], { from: accounts[0] });
        truffleAssert.passes(storageInstance.deleteFile(`0x${'0'.repeat(64)}`, { from: accounts[0] }))
    });

    it('Should access to shared file', async () => {
        await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [accounts[1]], { from: accounts[0] });
        assert.equal(await storageInstance.getFile(0, { from: accounts[1] }), `0x${'0'.repeat(64)}`);
    });

    it('Should throw on try to access a non own file', async () => {
        await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [], { from: accounts[0] });
        truffleAssert.fails(storageInstance.getFile(0, { from: accounts[1] }));
    });

    it('Should throw on try to delete a non own file', async () => {
        await storageInstance.add(`0x${'0'.repeat(64)}`, 0, [], { from: accounts[0] });
        truffleAssert.fails(storageInstance.deleteFile(0, { from: accounts[1] }));
    });
});
