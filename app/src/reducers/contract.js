import { ACTIONS } from "../actions/contract";

const initialState = {
    web3: null,
    ipfs: null,
    storage: null,
    accounts: [],
    indexes: [],
    sharedIndexes: [],
};

export default function (state = initialState, action) {
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
        case ACTIONS.UPDATE_ACCOUNTS:
            return {
                ...state,
                accounts: action.accounts,
            }
        case ACTIONS.UPDATE_SHARED_INDEXES + "_SUCCESS":
            return {
                ...state,
                sharedIndexes: action.payload,
            }
        default:
            return state;
    }
}