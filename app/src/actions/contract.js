export const ACTIONS = {
    UPDATE_INDEXES: "UPDATE_INDEXES",
    SET_CONTENT: "SET_CONTENT",
    SET_INDEXES: "SET_INDEXES",
    UPDATE_ACCOUNTS: "UPDATE_ACCOUNTS",
    UPDATE_SHARED_INDEXES: "UPDATE_SHARED_INDEXES",
}

export function setContent(web3, ipfs, contract, accounts) {
    return {
        type: ACTIONS.SET_CONTENT,
        payload: {
            web3, ipfs, contract, accounts
        }
    };
}

export function setIndexes(indexes) {
    return {
        type: ACTIONS.SET_INDEXES,
        indexes,
    }
}

export function updateIndexes(contract, account) {
    return {
        type: ACTIONS.UPDATE_INDEXES,
        payload: contract.methods.getIndexes().call({ from: account }),
    }
}

export function setAccounts(accounts) {
    return {
        type: ACTIONS.UPDATE_ACCOUNTS,
        accounts
    }
};

export function updateSharedIndexes(contract, account) {
    return {
        type: ACTIONS.UPDATE_SHARED_INDEXES,
        payload: contract.methods.getSharedIndexes().call({ from: account })
    }
}