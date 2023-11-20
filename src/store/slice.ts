import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { goods } from "../MockupData/goods";
import { IUser } from "../type/userType";
import { IGoods } from "../type/goodsType";

export const AUT_USER = createAsyncThunk<
  IUser,
  IAuthorization,
  { rejectValue: string }
>("slice/AUT_USER", async (value, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = Math.random() < 0.9;
        if (success) {
          resolve({ email: value.email });
        } else {
          throw new Error("Authorization failed");
        }
      }, 1000)
    );
    return response as IUser;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOODS = createAsyncThunk<IGoods[], undefined, { rejectValue: string }>(
  "slice/GET_GOODS",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve(goods);
          } else {
            throw new Error("Authorization failed");
          }
        }, 1000)
      );
      return response as IGoods[];
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const GET_FAVORITE_GOODS = createAsyncThunk<
  IGoods[],
  { rejectValue: string }
>("slice/GET_FAVORITE_GOODS", async (_,{ rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(goods.filter((good) => good.favorite));
        } else {
          throw new Error("Authorization failed");
        }
      }, 0)
    );
    return response as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_BASKET_OF_GOODS = createAsyncThunk<
  IGoods[],
  { rejectValue: string }
>("slice/GET_BASKET_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(goods.filter((good) => good.count));
        } else {
          throw new Error("Authorization failed");
        }
      }, 0)
    );
    return response as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

type IAuthorization = {
  email: string;
  password: string;
};
interface IInitialState {
  success: boolean;
  token: string;
  loading: "LOADING" | "COMPLICATED" | "LOGIN";
  data: IData;
}
const state: IInitialState = {
  success: false,
  token: "",
  loading: "LOADING",
  data: {
    goods: [],
    user: {
      publik: {
        name: "",
        city: "",
      },
      private: {
        phone: "",
        name: "",
        city: "",
      },
      favorite: [],
      basket: [],
    },
  },
};

const slice = createSlice({
  name: "Page",
  initialState: state,
  reducers: {
    LOADING_PAGE: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AUT_USER.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "LOADING",
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              id: action.payload.id,
              private: {
                ...state.data.user.private,
                name: action.payload.private.name,
              },
            },
          },
        };
      }
    });
    builder.addCase(GET_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            goods: action.payload,
          },
        };
      }
    });
    builder.addCase(GET_FAVORITE_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              favorite: action.payload,
            },
          },
        };
      }
    });
    builder.addCase(GET_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket: action.payload,
            },
          },
        };
      }
    });
  },
});

export default slice.reducer;
export const { LOADING_PAGE } = slice.actions;
