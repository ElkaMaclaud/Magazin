import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { IGoods } from "../type/goodsType";
import { IDelivery } from "../type/userType";
import { RootState } from "./Store";
import axios, { AxiosHeaders } from "axios";
const hostDomain = process.env.REACT_APP_API_URL;
const path = hostDomain + "/api";
const headers = new AxiosHeaders({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

type IAuthorization = {
  name: string;
  phone?: string;
  email: string;
  dateofBirth?: Date;
  password: string;
};
export interface IInitialState {
  success: boolean;
  pagePostion: "CHOICE_CATEGORY" | "MAIN";
  loading: "LOADING" | "COMPLICATED" | "LOGIN";
  data: IData;
  token: string | null;
  isloading: boolean;
}
const state: IInitialState = {
  success: false,
  pagePostion: "MAIN",
  loading: "LOADING",
  token: localStorage.getItem("access_token") || null,
  isloading: false,
  data: {
    goods: [],
    sale: [],
    discount: [],
    user: {
      publik: {
        name: "",
        city: "",
      },
      private: {
        phone: "",
        name: "",
        city: "",
        email: "",
      },
      choiceAll: false,
      favorite: [],
      basket: [],
      registered: [],
      purchased: [],
      delivery: {
        pickUpPoin: "Республика Татарстан, Казань, Беломорская 17",
        choice: "pickUpPoin",
      },
    },
  },
};
export const REGISTER_USER = createAsyncThunk<
  { success: boolean },
  IAuthorization,
  { rejectValue: string }
>("page/REGISTER_USER", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ success: boolean }>(
      `${path}/user/auth/register`,
      value,
      { headers }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const AUT_USER = createAsyncThunk<
  { access_token: string },
  IAuthorization,
  { rejectValue: string }
>("page/AUT_USER", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ access_token: string }>(
      `${path}/user/auth/login`,
      value,
      { headers }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_DELIVERY = createAsyncThunk<
  IDelivery,
  IDelivery,
  { rejectValue: string }
>("page/CHANGE_DELIVERY", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IDelivery>(
      `${path}/user/changeDelivery`,
      value,
      { headers }
    );

    return response.data as IDelivery;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_ACCOUNT_INFO = createAsyncThunk<
  { name: string; phone?: string },
  { name: string; phone?: string },
  { rejectValue: string }
>("page/CHANGE_ACCOUNT_INFO", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.patch<{ name: string; phone?: string }>(
      `${path}/user/updateUserData`,
      value,
      { headers }
    );
    return response.data as { name: string; phone?: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOODS_BY_CATEGORY = createAsyncThunk<
  IGoods[],
  string,
  { rejectValue: string }
>("page/GET_GOODS_BY_CATEGORY", async (category, { rejectWithValue }) => {
  try {
    const response = await axios.post<IGoods[]>(
      `${path}/good/goodsByCategory`,
      { category },
      { headers }
    );
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOOD = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string }
>("page/GET_GOOD", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGoods>(
      `http://localhost:3000/api/good/${id}`,
      { headers }
    );
    return response.data as IGoods;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const GET_SALE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_SALE_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGoods[]>(`${path}/good/goodsbySale`, {
      headers,
    });
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const GET_DISCOUNT_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_DISCOUNT_GOODS", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await axios.get<IGoods[]>(`${path}/good/goodsbyDiscount`, {
      headers,
    });
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const GET_FAVORITE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_FAVORITE_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGoods[]>(`${path}/user/favorites`, {
      headers,
    });
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_BASKET_OF_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_BASKET_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGoods[]>(`${path}/user/basket`, {
      headers,
    });
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_OF_ORDERS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_OF_ORDERS", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGoods[]>(`${path}/user/orders`, {
      headers,
    });
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const PAY_GOODS = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: string; state: RootState }
>("page/PAY_GOODS", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await axios.patch<string[]>(
      `${path}/user/orders`,
      { ids: getState().page.data.user.registered },
      { headers }
    );
    return response.data as string[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHOICE_ALL_BASKET_OF_GOODS = createAsyncThunk<
  IGoods[],
  boolean,
  { rejectValue: string; state: RootState }
>("page/CHOICE_ALL_BASKET_OF_GOODS", async (choice, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IGoods[]>(
      `${path}/user/ChooseAll`,
      { on: choice },
      { headers }
    );
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_CHOICES_BASKET_OF_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string; state: RootState }
>("page/REMOVE_CHOICES_BASKET_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.delete<IGoods[]>(
      `${path}/user/deleteSelected`,
      { headers }
    );
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_FAVORITE_GOOD = createAsyncThunk<
  IGoods | { id: string },
  string,
  { rejectValue: string; state: RootState }
>("page/CHANGE_FAVORITE_GOOD", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IGoods | { id: string }>(
      `${path}/user/toggleFavorites`,
      { id },
      { headers }
    );
    return response.data as IGoods | { id: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const ADD_BASKET_OF_GOODS = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string; state: RootState }
>("page/ADD_BASKET_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IGoods>(
      `${path}/user/addBasket`,
      { id },
      { headers }
    );
    return response.data as IGoods;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const DECREMENT_BASKET_OF_GOODS = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string }
>("page/DECREMENT_BASKET_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IGoods>(
      `${path}/user/subBasket`,
      { id },
      { headers }
    );
    return response.data as IGoods;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_GOOD_BASKET_OF_GOODS = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("page/REMOVE_GOOD_BASKET_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<{ id: string }>(
      `${path}/user/deleteBasket`,
      { id },
      { headers }
    );
    return response.data as { id: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHOICE_BASKET_OF_GOODS = createAsyncThunk<
  { goodId: string; count: number; choice: boolean },
  string,
  { rejectValue: string }
>("page/CHOICE_BASKET_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<{
      goodId: string;
      count: number;
      choice: boolean;
    }>(`${path}/user/toggleChoice`, { id }, { headers });
    return response.data as { goodId: string; count: number; choice: boolean };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

const slice = createSlice({
  name: "Page",
  initialState: state,
  reducers: {
    LOADING_PAGE: (state, action) => {
      state.loading = action.payload;
    },
    PAGE_POSITION: (state, action) => {
      state.pagePostion = action.payload;
    },
    SET_REGISTRED: (state, action) => {
      state.data.user.registered = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AUT_USER.pending, (state) => {
      return {
        ...state,
        loading: "LOADING",
      };
    });
    builder.addCase(AUT_USER.fulfilled, (state, action) => {
      const sentDate = action.meta.arg;
      if (action.payload) {
        localStorage.setItem("access_token", action.payload.access_token);
        return {
          ...state,
          loading: "COMPLICATED",
          token: action.payload.access_token,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              publik: {
                ...state.data.user.publik,
                name: sentDate.name,
              },
              private: {
                ...state.data.user.private,
                email: sentDate.email,
                phone: sentDate.phone,
              },
            },
          },
        };
      }
    });
    builder.addCase(CHANGE_DELIVERY.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              delivery: {...state.data.user.delivery, ...action.payload},
            },
          },
        };
      }
    });
    builder.addCase(CHANGE_ACCOUNT_INFO.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              private: {
                ...state.data.user.private,
                name: action.payload.name,
                phone: action.payload.phone,
              },
              publik: {
                ...state.data.user.publik,
                name: action.payload.name,
              },
            },
          },
        };
      }
    });
    builder.addCase(GET_GOODS_BY_CATEGORY.pending, (state) => {
      return {
        ...state,
        loading: "LOADING",
      };
    });
    builder.addCase(GET_GOODS_BY_CATEGORY.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          success: true,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            goods: action.payload,
          },
        };
      }
    });
    builder.addCase(GET_GOOD.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              good: action.payload,
            },
          },
        };
      }
    });
    builder.addCase(GET_SALE_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          success: true,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            sale: action.payload,
          },
        };
      }
    });
    builder.addCase(GET_DISCOUNT_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          success: true,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            discount: action.payload,
          },
        };
      }
    });
    builder.addCase(GET_FAVORITE_GOODS.pending, (state, action) => {
      return {
        ...state,
        isloading: true,
      };
    });
    builder.addCase(GET_FAVORITE_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          isloading: false,
          data: {
            ...state.data,
            user: { ...state.data.user, favorite: action.payload },
          },
        };
      }
    });
    builder.addCase(GET_BASKET_OF_GOODS.pending, (state) => {
      return {
        ...state,
        isloading: true,
      };
    });
    builder.addCase(GET_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          isloading: false,
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
    builder.addCase(GET_OF_ORDERS.pending, (state) => {
      return {
        ...state,
        isloading: true,
      };
    });
    builder.addCase(GET_OF_ORDERS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          isloading: false,
          data: {
            ...state.data,
            user: { ...state.data.user, purchased: action.payload },
          },
        };
      }
    });
    builder.addCase(
      REMOVE_CHOICES_BASKET_OF_GOODS.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            data: {
              ...state.data,
              user: {
                ...state.data.user,
                basket: state.data.user.basket.filter(
                  (good) => good.choice === false
                ),
              },
            },
          };
        }
      }
    );
    builder.addCase(CHOICE_ALL_BASKET_OF_GOODS.fulfilled, (state, action) => {
      const on = action.meta.arg;
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket: state.data.user.basket.map((good) => {
                return { ...good, choice: on };
              }),
            },
          },
        };
      }
    });
    builder.addCase(CHANGE_FAVORITE_GOOD.fulfilled, (state, action) => {
      if (action.payload) {
        const isGoodsType = Object.keys(action.payload).length > 1;
        const newFavoriteList = isGoodsType
          ? [action.payload as IGoods, ...state.data.user.favorite]
          : state.data.user.favorite.filter(
              (good) => good._id !== (action.payload as { id: string }).id
            );
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              favorite: newFavoriteList,
            },
          },
        };
      }
    });
    builder.addCase(ADD_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        const findUpdatedGood = state.data.user.basket.find(
          (good) => action.payload._id === good._id
        );
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket: findUpdatedGood
                ? state.data.user.basket.map((good) => {
                    if (good._id === findUpdatedGood._id) {
                      return { ...good, ...action.payload };
                    }
                    return good;
                  })
                : [action.payload, ...state.data.user.basket],
            },
          },
        };
      }
    });
    builder.addCase(DECREMENT_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        const findUpdatedGood = state.data.user.basket.find(
          (good) => action.payload._id === good._id
        );
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket:
                findUpdatedGood!.count === 0
                  ? state.data.user.basket.filter(
                      (good) => good._id === findUpdatedGood!._id
                    )
                  : state.data.user.basket.map((good) => {
                      if (good._id === findUpdatedGood!._id) {
                        return { ...good, ...action.payload };
                      }
                      return good;
                    }),
            },
          },
        };
      }
    });
    builder.addCase(REMOVE_GOOD_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket: state.data.user.basket.filter(
                (good) => good._id !== action.payload.id
              ),
            },
          },
        };
      }
    });
    builder.addCase(CHOICE_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              basket: state.data.user.basket.map((good) => {
                if (good._id === action.payload.goodId) {
                  return { ...good, choice: action.payload.choice };
                }
                return good;
              }),
            },
          },
        };
      }
    });
    builder.addCase(PAY_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              registered: [],
            },
          },
        };
      }
    });
  },
});

export default slice.reducer;
export const { LOADING_PAGE, PAGE_POSITION, SET_REGISTRED } = slice.actions;
