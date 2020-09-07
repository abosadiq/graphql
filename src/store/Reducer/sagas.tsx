import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricActions, ErrorAction } from './metricReducer';
import { PayloadAction } from 'redux-starter-kit';
/**
 *
 * @param action
 *when ever a user executes an action this is going to be called

 */
function* apiErrorReceived(action: PayloadAction<ErrorAction>) {
  // toast.error popup messages
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  // lounch every time an error weatherAPIERRORReceived is called
  yield takeEvery(MetricActions.ErrorReceived.type, apiErrorReceived);
}
