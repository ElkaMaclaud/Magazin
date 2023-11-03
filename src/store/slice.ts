import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { goods } from "../MockupData/goods";
import { IGoods } from "../type/goodsType";


// export const REGISTER_USER = createAsyncThunk<
//   {
//     rejectValue: string;
//     // указывает, что функция должна возвращать TypeReturnToken или выбрасывать ошибку типа unknown
//   }
// >("authSlice/REGISTER_USER", async (value, { rejectWithValue }) => {
//   try {
//     const response = await ("registration", "POST", value).then(
//       (response) => {
//         if (response.success) {
//           return value.email;
//         }
//         throw new Error(response);
//       }
//     );
//     return response;
//   } catch (e) {
//     return rejectWithValue(`${e}`);
//   }
// });
interface IInitialState {
  LoadingPage: "LOADING" | "COMPLICATED" | "LOGIN" ;
}
const state: IInitialState = {
  LoadingPage: "COMPLICATED"
}

const authSlice = createSlice({
    name: "AUTH_SLICE_LOGIN",
    initialState: state,
    reducers: {
      LOADING_PAGE: (state, action) => {
        state.LoadingPage = action.payload;
      },
    },
  });
//     extraReducers: (builder) => {
//       builder.addCase(API_AUTH_AGENT.fulfilled, (state, action) => {
//         if (action.payload) {
//           return {
//             ...state,
//             LoadingPage: "LOADING",
//             success: action.payload.success,
//           };
//         }
//       });
//       builder.addCase(API_AUTH_CSP.fulfilled, (state, action) => {
//         if (action.payload.success) {
//           return {
//             ...state,
//             LoadingPage: "LOADING",
//             success: action.payload.success,
//           };
//         }
//       });
//       builder.addCase(DATA_ALL_PAGE.fulfilled, (state, action) => {
//         if (action.payload.success) {
//           return {
//             ...state,
//             success: action.payload.success,
//             data: action.payload.data,
//             LoadingPage: "PREV_COMPLICATED",
//           };
//         }
//       });
//       builder.addCase(LOGOUT_USER.fulfilled, (state, action) => {
//         if (action.payload.success) {
//           window.location.reload();
//           state = {
//             emailSuccessRegisration: "",
//             success: false,
//             token: "",
//             typePostion: "DEFAULT",
//             LoadingPage: "LOGIN",
//             data: prevState,
//             CSP: { DEFAULT_CSP: [], CSP_FILTER: [] },
//           };
//           localStorage.clear();
//         } else {
//           localStorage.clear();
//           state = {
//             emailSuccessRegisration: "",
//             success: false,
//             token: "",
//             typePostion: "DEFAULT",
//             LoadingPage: "LOGIN",
//             data: prevState,
//             CSP: { DEFAULT_CSP: [], CSP_FILTER: [] },
//           };
//         }
//       });
//       builder.addCase(REGISTER_USER.fulfilled, (state, action) => {
//         if (action.payload) {
//           return (state = {
//             ...state,
//             emailSuccessRegisration: action.payload,
//             typePostion: "MESSAGE_EMAIL",
//           });
//         }
//       });
//       builder.addCase(API_AUTH_AGENT.rejected, (state, action) => {
//         if (action.payload) {
//           return (state = action.payload); // возвращаем новое значение state
//         }
//       });
//       builder.addCase(API_AUTH_CSP.rejected, (state, action) => {
//         if (action.payload) {
//           return (state = action.payload); // возвращаем новое значение state
//         }
//       });
//       builder.addCase(DATA_ALL_PAGE.rejected, () => {
//         localStorage.clear();
//         window.location.reload();
//       });
//       builder.addCase(LOGOUT_USER.rejected, () => {
//         localStorage.clear();
//         window.location.reload();
//       });
//     },
//   });
  
  // export const selectAuth = (state: RootState) => state.authSlice;
  // export const ID_USER_AUTH = (state: RootState) => state.authSlice.data.user?.id;
  // export const { TYPE_POSTION, LOADING_PAGE, CSP_CERTIFICATE } =
  //   authSlice.actions;
  export default authSlice.reducer;
  