export const ACTIONS = {
    SHOW_SHARE_MODAL: "SHOW_SHARE_MODAL",
    SHOW_DELETE_MODAL: "SHOW_DELETE_MODAL",
    SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
    HIDE_NOTIFICATION: "HIDE_NOTIFICATION",
    CLOSE_SHARE_MODAL: "CLOSE_SHARE_MODAL",
}

export function showShareModal(index) {
    return {
        type: ACTIONS.SHOW_SHARE_MODAL,
        index
    };
}

export function showDeleteModal() {
    return {
        type: ACTIONS.SHOW_DELETE_MODAL,
    };
}

export function showNotification(message) {
    return {
        type: ACTIONS.SHOW_NOTIFICATION,
        message,
    };
}

export function hideNotification() {
    return {
        type: ACTIONS.HIDE_NOTIFICATION,
    };
}

export function closeShareModal() {
    return {
        type: ACTIONS.CLOSE_SHARE_MODAL,
    };
}