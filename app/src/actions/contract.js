const ACTIONS = {
    SET_IPFS: "SET_IPFS",
    SET_WEB3: "SET_WEB3",
    SET_CONTRACT: "SET_CONTRACT",
    SET_CONTENT: "SET_CONTENT",
}

export function setContent(web3, ipfs, contract) {
    return {
        type: ACTIONS.SET_CONTENT,
        payload: {
            web3, ipfs, contract
        }
    };
}