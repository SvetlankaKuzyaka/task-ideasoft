import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

// Reducer
const initialState = {
    words: [],
    loading: false,
    error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_WORDS':
      return {
        words: [],
        loading: true,
        error: false,
      };
    case 'REQUESTED_WORDS_SUCCEEDED':
      return {
        words: action.words,
        loading: false,
        error: false,
      };
    case 'REQUESTED_WORDS_FAILED':
      return {
        words: [],
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

// Action Creators
const requestWords = () => {
    console.log('REQUESTED_WORDS');
    return { type: 'REQUESTED_WORDS' }
};

const requestWordsSuccess = (data) => {
    console.log('REQUESTED_WORDS_SUCCEEDED');
    return { type: 'REQUESTED_WORDS_SUCCEEDED', words: [...data] }
};

const requestWordsError = () => {
    console.log('REQUESTED_WORDS_FAILED');
    return { type: 'REQUESTED_WORDS_FAILED' }
};

export const fetchWords = () => {
    return { type: 'FETCHED_WORDS' }
};

// Sagas
function* watchFetchWords() {
    yield takeLatest('FETCHED_WORDS', fetchWordsAsync);
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const result = ['It', 'is', 'redux', 'saga', 'test'];
const ms = 3000;

function* fetchWordsAsync() {
    try {
        yield put(requestWords());
        const data = yield call(() => delay(ms).then(() => result));
        yield put(requestWordsSuccess(data));
    } catch (error) {
        yield put(requestWordsError());
    }
}

// Store
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetchWords);