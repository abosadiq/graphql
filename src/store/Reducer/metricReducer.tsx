import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ErrorAction = {
  error: string;
};

const initialState: { loading: boolean; metrics: string[] } = { loading: false, metrics: [] };

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // created instance for weather data
    addMetric: (state, action: PayloadAction<string>) => {
      //  pass he actions in here
      state.metrics.push(action.payload);
    },
    removeMetric: (state, action: PayloadAction<string>) => {
      // remove the metrics here
      state.metrics = state.metrics.filter(metric => metric !== action.payload);
      //   state.
    },
    removeAllMetric: (state, action: PayloadAction) => {
      // remove the metrics here
      state.metrics = [];
    },
    // this call when there is an error
    ErrorReceived: (state, action: PayloadAction<ErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
