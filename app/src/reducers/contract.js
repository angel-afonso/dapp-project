import { ACTIONS } from "../actions/contract";

const initialState = {
    web3: null,
    ipfs: null,
    storage: null,
    accounts: [],
    indexes: [],
};

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case ACTIONS.SET_CONTENT:
            return {
                ...state,
                web3: action.payload.web3,
                ipfs: action.payload.ipfs,
                storage: action.payload.contract,
                accounts: action.payload.accounts,
            }
        case ACTIONS.SET_INDEXES:
            return {
                ...state,
                indexes: action.indexes,
            }
        case ACTIONS.UPDATE_INDEXES + "_SUCCESS":
            return {
                ...state,
                indexes: action.payload,
            };
        default:
            return state;
    }
}