const ACTIONS = {
    SET_INDEXES: "SET_INDEXES",
}

export function setIndexes(contract) {
    return {
        type: ACTIONS.SET_INDEXES,
        payload: contract.methods.getIndexes(),
    };
}