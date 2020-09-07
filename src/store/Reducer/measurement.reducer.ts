import { createSlice, PayloadAction } from 'redux-starter-kit';
export type ErrorAction = {
  error: string;
};

const initialState: {
  [metric: string]: {
    name: string;
    utc: boolean;
    columns: string[];
    points: { time: number; value: number; unit: string }[];
  };
} = {};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    // created instance for weather data
    addLatestMetric: (state, action: PayloadAction<{ metric: string; at: number; value: number; unit: string }>) => {
      const { metric, at, value, unit } = action.payload;
      // if metric doesnt exist
      if (!state[metric]) {
        state[metric] = {
          name: metric,
          utc: true,
          columns: ['time', 'value', 'unit'],
          points: [{ time: at, value, unit }],
        };
      } else {
        // if metrics exist we can update the time , value and unit
        state[metric].points.push({ time: at, value, unit });
      }
    },
    // this call when there is an error
    ErrorReceived: (state, action: PayloadAction<ErrorAction>) => state,
  },
});
export const reducer = slice.reducer;
export const actions = slice.actions;
