import { ACTIONS } from "../actions/ui";

const initialState = {
    showShareModal: false,
    shareIndex: null,
    showDeleteModal: false,
    deleteIndex: null,
    showNotification: false,
    notificationMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SHOW_DELETE_MODAL:
            return {
                ...state,
                showDeleteModal: true,
                showShareModal: false,
                deleteIndex: action.index,
                shareIndex: null,
            }
        case ACTIONS.SHOW_SHARE_MODAL:
            return {
                ...state,
                shareIndex: action.index,
                showShareModal: true,
                showDeleteModal: false,
                deleteIndex: null,
            }
        case ACTIONS.SHOW_NOTIFICATION:
            return {
                ...state,
                showNotification: true,
                notificationMessage: action.message
            }
        case ACTIONS.CLOSE_SHARE_MODAL:
            return {
                ...state,
                showShareModal: false,
                shareIndex: null,
            }
        default:
            return state;
    }
}