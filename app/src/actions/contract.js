export const ACTIONS = {
    UPDATE_INDEXES: "UPDATE_INDEXES",
    SET_CONTENT: "SET_CONTENT",
    SET_INDEXES: "SET_INDEXES",
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