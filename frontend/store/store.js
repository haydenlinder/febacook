import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root_reducer'

const middlewares = [thunk];
const { logger } = require("redux-logger");

if (process.env.NODE_ENV !== "production") {
    // middlewares.push(logger);
}

const configureStore = (preloadedState) => createStore(
    rootReducer, preloadedState, applyMiddleware(...middlewares, logger)
)

export default configureStore;