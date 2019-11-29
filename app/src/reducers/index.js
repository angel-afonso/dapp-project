import { combineReducers } from "redux";
import files from "./files";
import contract from "./contract";

export default combineReducers({
    files,
    contract,
});