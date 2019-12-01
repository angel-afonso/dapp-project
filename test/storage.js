const Storage = artifacts.require("./Storage.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("Storage", accounts => {
    let storageInstance;

    beforeEach(async () => {
        storageInstance = await Storage.new({ from: accounts[0] })
    });

    it('Should emit StoredFile event', async () => {
        let tx = await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.eventEmitted(tx, 'StoredFile', (e) => {
            return e.owner === accounts[0] && e.index == 0;
        });
    });

    it('Should get file hash', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        let result = await storageInstance.getFile.call(0, { from: accounts[0] });
        assert.equal(result[0], `0x${'0'.repeat(10)}`);
        assert.equal(result[1], `test file`);
    });

    it('Should delete file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        await storageInstance.add(`0x${'1'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        await storageInstance.add(`0x${'2'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.passes(storageInstance.deleteFile(1, { from: accounts[0] }))
    });

    it('Should access to shared file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [accounts[1]], { from: accounts[0] });
        let result = await storageInstance.viewFile.call(0, { from: accounts[1] });
        assert.equal(result[0], `0x${'0'.repeat(10)}`);
        assert.equal(result[1], `test file`);
    });

    it('Should throw on try to access to non shared file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.fails(
            storageInstance.viewFile.call(0, { from: accounts[1] })
        );
    });

    it('Should throw on try to access a non own file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.fails(storageInstance.getFile(0, { from: accounts[1] }));
    });

    it('Should throw on try to delete a non own file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.fails(storageInstance.deleteFile(0, { from: accounts[1] }));
    });

    it('Should add new address to share a file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.passes(storageInstance.addAddressToShare(accounts[1], 0, { from: accounts[0] }));
    });

    it('Should remove address to share file ', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [accounts[1], accounts[2], accounts[3]], { from: accounts[0] });
        truffleAssert.passes(storageInstance.removeAddressToShare(accounts[2], 0, { from: accounts[0] }));
    });

    it('Should throw on add new address to share a file in not own file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [], { from: accounts[0] });
        truffleAssert.fails(storageInstance.addAddressToShare(accounts[1], 0, { from: accounts[1] }));
    });

    if ('Should view free file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 0, 'test file', [accounts[2]], { from: accounts[0] });
        truffleAssert.passes(
            storageInstance.viewFile(0, { from: accounts[2], value: 0 }),
        );
    });

    it('Should pay for view the file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 1000, 'test file', [accounts[2]], { from: accounts[0] });
        truffleAssert.passes(
            storageInstance.viewFile(0, { from: accounts[2], value: 1000 })
        );
    });

    it('Should throw on invalid amount to view file', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 1000, 'test file', [accounts[2]], { from: accounts[0] });
        truffleAssert.fails(
            storageInstance.viewFile(0, { from: accounts[2], value: 10 }),
        );
    });

    it('Should fail on try to get invalid file index', async () => {
        truffleAssert.fails(
            storageInstance.getFile(0, { from: accounts[0] })
        );
    });

    it('Should fail on try to view invalid file index', async () => {
        truffleAssert.fails(
            storageInstance.viewFile(0, { from: accounts[0] })
        );
    });

    it('Should change file amount', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 1000, 'test file', [accounts[2]], { from: accounts[0] });
        truffleAssert.passes(storageInstance.setAmount(0, 10, { from: accounts[0] }))
        let result = await storageInstance.getFile.call(0, { from: accounts[0] });
        assert.equal(result[2], 10);

    });

    it('Should fail trying to change file amount', async () => {
        await storageInstance.add(`0x${'0'.repeat(10)}`, 1000, 'test file', [accounts[2]], { from: accounts[0] });
        truffleAssert.passes(storageInstance.setAmount(0, 10, { from: accounts[1] }))
    });
});
