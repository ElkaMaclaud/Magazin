import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { IGoods } from "../type/goodsType";
import { IDelivery, IUser } from "../type/userType";
import { RootState } from "./Store";
import axios, { AxiosHeaders } from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
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
      privates: {
        phone: "",
        city: "",
        email: "",
      },
      choiceAll: false,
      favorite: [],
      cart: [],
      registered: [],
      purchased: [],
      delivery: {
        pickUpPoin: "Республика Татарстан, Казань, Беломорская 17",
        choice: "pickUpPoin",
      },
      authorized: false,
    },
  },
};
export const REGISTER_USER = createAsyncThunk<
  { success: boolean },
  IAuthorization,
  { rejectValue: string }
>("page/REGISTER_USER", async (value, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.post<{ success: boolean }>(
      `${path}/user/auth/register`,
      value,
      { headers }
    );
    NProgress.done();
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
    NProgress.start();
    const response = await axios.post<{ access_token: string }>(
      `${path}/user/auth/login`,
      value,
      { headers }
    );
    NProgress.done();
    return response.data;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const GET_USER_DATA = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>("page/GET_USER_DATA", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IUser>(
      `${path}/user/userData`,
      { headers }
    );
    NProgress.done();
    return response.data as IUser;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_DELIVERY = createAsyncThunk<
  IDelivery,
  IDelivery,
  { rejectValue: string }
>("page/CHANGE_DELIVERY", async (value, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<IDelivery>(
      `${path}/user/changeDelivery`,
      value,
      { headers }
    );
    NProgress.done();
    return response.data as IDelivery;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_ACCOUNT_INFO = createAsyncThunk<
  { name: string; phone?: string },
  { name: string; phone?: string },
  { rejectValue: string }
>("page/CHANGE_ACCOUNT_INFO", async (value, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<{ name: string; phone?: string }>(
      `${path}/user/updateUserData`,
      value,
      { headers }
    );
    NProgress.done();
    return response.data as { name: string; phone?: string };
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOODS_BY_CATEGORY = createAsyncThunk<
  IGoods[],
  string,
  { rejectValue: string }
>("page/GET_GOODS_BY_CATEGORY", async (category, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.post<IGoods[]>(
      `${path}/good/goodsByCategory`,
      { category },
      { headers }
    );
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOOD = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string }
>("page/good/GET_GOOD", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods>(
      `${path}/good/${id}`,
      { headers }
    );
    NProgress.done();
    return response.data as IGoods;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);

  }
});

export const GET_SALE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_SALE_GOODS", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods[]>(`${path}/good/goodsbySale`, {
      headers,
    });
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});

export const GET_DISCOUNT_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_DISCOUNT_GOODS", async (_, { rejectWithValue, getState }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods[]>(`${path}/good/goodsbyDiscount`, {
      headers,
    });
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});

export const GET_FAVORITE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_FAVORITE_GOODS", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods[]>(`${path}/user/favorites`, {
      headers,
    });
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const GET_CART_OF_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_CART_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods[]>(`${path}/user/cart`, {
      headers,
    });
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const GET_OF_ORDERS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_OF_ORDERS", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.get<IGoods[]>(`${path}/user/orders`, {
      headers,
    });
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});

export const PAY_GOODS = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: string; state: RootState }
>("page/PAY_GOODS", async (_, { rejectWithValue, getState }) => {
  try {
    NProgress.start();
    const response = await axios.patch<string[]>(
      `${path}/user/orders`,
      { ids: getState().page.data.user.registered },
      { headers }
    );
    NProgress.done();
    return response.data as string[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const SELECT_ALL_ITEMS_IN_CART = createAsyncThunk<
  IGoods[],
  boolean,
  { rejectValue: string; state: RootState }
>("page/SELECT_ALL_ITEMS_IN_CART", async (choice, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<IGoods[]>(
      `${path}/user/selectAll`,
      { on: choice },
      { headers }
    );
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_SELECTED_ITEMS_FROM_CART = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string; state: RootState }
>("page/REMOVE_SELECTED_ITEMS_FROM_CART", async (_, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.delete<IGoods[]>(
      `${path}/user/deleteSelected`,
      { headers }
    );
    NProgress.done();
    return response.data as IGoods[];
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_FAVORITE_GOOD = createAsyncThunk<
  IGoods | { id: string },
  string,
  { rejectValue: string; state: RootState }
>("page/CHANGE_FAVORITE_GOOD", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<IGoods | { id: string }>(
      `${path}/user/toggleFavorites`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as IGoods | { id: string };
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_FAVORITE_GOOD__NO_AUTO = createAsyncThunk<
  { result: IGoods; token: string },
  string,
  { rejectValue: string; state: RootState }
>("page/CHANGE_FAVORITE_GOOD__NO_AUTO", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<{ result: IGoods; token: string }>(
      `${path}/user/toggleFavoritesGetAuto`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as { result: IGoods; token: string };
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const ADD_TO_CARD_OF_GOODS = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string; state: RootState }
>("page/ADD_TO_CARD_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<IGoods>(
      `${path}/user/addToCart`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as IGoods;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const ADD_TO_CARD_OF_GOODS__NO_AUTO = createAsyncThunk<
  { result: IGoods; token: string },
  string,
  { rejectValue: string; state: RootState }
>("page/ADD_TO_CARD_OF_GOODS__NO_AUTO", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<{ result: IGoods; token: string }>(
      `${path}/user/addToCartGetAuto`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as { result: IGoods; token: string };
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const SUBTRACT_FROM_CART = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string }
>("page/SUBTRACT_FROM_CART", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<IGoods>(
      `${path}/user/subFromCart`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as IGoods;
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_FROM_CART_OF_GOODS = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("page/REMOVE_FROM_CART_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<{ id: string }>(
      `${path}/user/removeFromCart`,
      { id },
      { headers }
    );
    NProgress.done();
    return response.data as { id: string };
  } catch (error) {
    NProgress.done();
    return rejectWithValue(`${error}`);
  }
});
export const SELECTING_PRODUCTS_IN_THE_CART = createAsyncThunk<
  { goodId: string; count: number; choice: boolean },
  string,
  { rejectValue: string }
>("page/SELECTING_PRODUCTS_IN_THE_CART", async (id, { rejectWithValue }) => {
  try {
    NProgress.start();
    const response = await axios.patch<{
      goodId: string;
      count: number;
      choice: boolean;
    }>(`${path}/user/toggleSelect`, { id }, { headers });
    NProgress.done();
    return response.data as { goodId: string; count: number; choice: boolean };
  } catch (error) {
    NProgress.done();
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
              privates: {
                ...state.data.user.privates,
                email: sentDate.email,
                phone: sentDate.phone,
              },
              authorized: true,
            },
          },
        };
      }
    });
    builder.addCase(GET_USER_DATA.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "COMPLICATED",
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              _id: action.payload._id,
              publik: action.payload.publik,
              privates: action.payload.privates,
              delivery: action.payload.delivery,
              registered: action.payload.registered
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
              delivery: action.payload,
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
              privates: {
                ...state.data.user.privates,
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
    builder.addCase(GET_GOODS_BY_CATEGORY.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          success: true,
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
    builder.addCase(GET_FAVORITE_GOODS.rejected, (state, action) => {
      return {
        ...state,
        isloading: false,
      };
    });
    builder.addCase(GET_CART_OF_GOODS.pending, (state) => {
      return {
        ...state,
        isloading: true,
      };
    });
    builder.addCase(GET_CART_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          isloading: false,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: action.payload,
            },
          },
        };
      }
    });
    builder.addCase(GET_CART_OF_GOODS.rejected, (state, action) => {
      return {
        ...state,
        isloading: false,
      };
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
    builder.addCase(GET_OF_ORDERS.rejected, (state) => {
      return {
        ...state,
        isloading: false,
      };
    });
    builder.addCase(
      REMOVE_SELECTED_ITEMS_FROM_CART.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            data: {
              ...state.data,
              user: {
                ...state.data.user,
                cart: state.data.user.cart.filter(
                  (good) => good.choice === false
                ),
              },
            },
          };
        }
      }
    );
    builder.addCase(SELECT_ALL_ITEMS_IN_CART.fulfilled, (state, action) => {
      const on = action.meta.arg;
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: state.data.user.cart.map((good) => {
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
    builder.addCase(CHANGE_FAVORITE_GOOD__NO_AUTO.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem("access_token", action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              favorite: [...state.data.user.favorite, action.payload.result],
            },
          },
        };
      }
    });
    builder.addCase(ADD_TO_CARD_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        const findUpdatedGood = state.data.user.cart.find(
          (good) => action.payload._id === good._id
        );
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: findUpdatedGood
                ? state.data.user.cart.map((good) => {
                  if (good._id === findUpdatedGood._id) {
                    return { ...good, ...action.payload };
                  }
                  return good;
                })
                : [action.payload, ...state.data.user.cart],
            },
          },
        };
      }
    });
    builder.addCase(ADD_TO_CARD_OF_GOODS__NO_AUTO.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem("access_token", action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: [...state.data.user.cart, action.payload.result]
            },
          },
        };
      }
    });
    builder.addCase(SUBTRACT_FROM_CART.fulfilled, (state, action) => {
      if (action.payload) {
        const findUpdatedGood = state.data.user.cart.find(
          (good) => action.payload._id === good._id
        );
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart:
                findUpdatedGood!.count === 0
                  ? state.data.user.cart.filter(
                    (good) => good._id === findUpdatedGood!._id
                  )
                  : state.data.user.cart.map((good) => {
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
    builder.addCase(REMOVE_FROM_CART_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: state.data.user.cart.filter(
                (good) => good._id !== action.payload.id
              ),
            },
          },
        };
      }
    });
    builder.addCase(SELECTING_PRODUCTS_IN_THE_CART .fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              cart: state.data.user.cart.map((good) => {
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
