import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalService';


const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

  ///below is same from authSlice register method:
  export const createGoal = createAsyncThunk(
    "goal/create",
    async (goalData, thunkAPI) => {
      try {
        // access jwt token form thunkAPI
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.rejectWithValue(message);
      }
    }
  );

/////  for get goal
  export const getGoal = createAsyncThunk(
    "goal/get",
    async (_, thunkAPI) => {
      try {
       //// access jwt token form thunkAPI
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoal(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.rejectWithValue(message);
      }
    }
  );
  /////  for Delete goal:
  export const deleteGoal = createAsyncThunk(
    "goal/delete",
    async (id, thunkAPI) => {
      try {
        //// access jwt token form thunkAPI
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id,token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
      reset: (state) =>  initialState,
    },
   
    //for goal service is fullfield ? bending ? reject ? same form auhslice
    extraReducers: (builder) => {
    builder.addCase(createGoal.pending, (state) => {
        state.isLoading = true
    }).addCase(createGoal.fulfilled, (state, action) =>{
        //the above action paylod is comming from goalservice return respone:
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
    }).addCase(createGoal.rejected, (state, action) =>{
        //the above action paylod is comming from goalservice return respone:
        state.isLoading = false
        state.isError = true
        // error message come from above  mesage variable  send ThunkaAPI after recive:
        state.message = action.payload
    })
    ///// For GET Goals;
    .addCase(getGoal.pending, (state) => {
        state.isLoading = true
    }).addCase(getGoal.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
    }).addCase(getGoal.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    ////// For Delete Goals
        .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
    }).addCase(deleteGoal.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
    }).addCase(deleteGoal.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    },
});

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;