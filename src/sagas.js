import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Posts } from './constants';
import { PostsAPI } from './API';
import {
  fetchPostsSuccess,
  fetchPostsError
} from './actions'

const postsApi = new PostsAPI;


function* subPosts(action) {
  yield takeLatest(Posts.submitPosts, subPostsFromAPI)
}
function* subPostsFromAPI(action) {
  try {
    // call the api
    const data = yield call(postsApi.submitPosts, {response: action.payload});
    // call the success action with data
    yield put(fetchPostsSuccess(data));
  } catch (e) {
    // call the error action with data
    yield put(fetchPostsError(e));
  }

}

export default function* rootSaga() {
  yield all([
    subPosts()
  ])
}
