import * as axios from "axios";
/**
 * Created by mymac on 26/08/18.
 */

const instance = axios.create({
    baseURL: 'https://api.trakt.tv/',
    timeout: 10000,
    headers: {
        "content-type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": "d20cf70a49a9d41b17b8403bded3064a0d91602b46dc38a84435645ddce9f98d"
    }
});

export default instance;