import { combineReducers } from "redux";
import contract from "./contract";
import ui from "./ui";

export default combineReducers({
    contract,
    ui,
});