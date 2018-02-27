import { createStore } from 'redux'

const init = {
    stories: []
}

const mystore = (state = {login: false, view:"login"}, action)  => {
    switch (action.type) {
        case "SUCCESSFUL_LOGIN":
            return Object.assign({}, state, {stories: action.stories, view: "worksview"})
;        default:
            return state;
    }
};

const store = createStore(mystore);

export default store;