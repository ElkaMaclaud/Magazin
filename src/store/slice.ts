import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { IGoods } from "../type/goodsType";
import { IDelivery, ISeller, IUser } from "../type/userType";
import { RootState } from "./Store";
import { sendRequest } from "../API/api";

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
  good?: IGoods & { seller: ISeller };
}
const initialUserData: IUser = {
  publik: {
    name: "",
    city: "",
  },
  privates: {
    phone: "",
    city: "",
    email: "",
  },
  favorite: [],
  cart: [],
  purchased: [],
  delivery: {
    pickUpPoin: "Республика Татарстан, Казань, Беломорская 17",
    choice: "pickUpPoin",
  },
  registered: false,
  chats: []
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
    user: initialUserData
  },
};
export const REGISTER_USER = createAsyncThunk<
  { success: boolean },
  IAuthorization,
  { rejectValue: string }
>("page/REGISTER_USER", async (value, { rejectWithValue }) => {
  try {
    const response = await sendRequest("user/auth/register", "POST", value)
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
    const response = await sendRequest("user/auth/login", "POST",
      value
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_USER_DATA = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>("page/GET_USER_DATA", async (_, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/userData"
    );
    return response.data as IUser;
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
    const response = await sendRequest(
      "/user/changeDelivery", "PATCH",
      value
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
    const response = await sendRequest(
      "user/updateUserData", "PATCH",
      value
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
    const response = await sendRequest(
      "good/goodsByCategory", "POST",
      { category }
    );
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOOD = createAsyncThunk<
  IGoods & { seller: ISeller },
  string,
  { rejectValue: string }
>("page/good/GET_GOOD", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      `good/${id}`
    );
    return response.data as IGoods & { seller: ISeller };
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
    const response = await sendRequest("good/goodsbySale");
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const GET_DISCOUNT_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_DISCOUNT_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await sendRequest("good/goodsbyDiscount");
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
    const response = await sendRequest("user/favorites")
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_CART_OF_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_CART_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await sendRequest("user/cart");
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
    const response = await sendRequest("user/orders");
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const SELECT_ALL_ITEMS_IN_CART = createAsyncThunk<
  IGoods[],
  boolean,
  { rejectValue: string; state: RootState }
>("page/SELECT_ALL_ITEMS_IN_CART", async (choice, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/selectAll", "PATCH",
      { on: choice }
    );
    return response.data as IGoods[];
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_SELECTED_ITEMS_FROM_CART = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string; state: RootState }
>("page/REMOVE_SELECTED_ITEMS_FROM_CART", async (_, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/deleteSelected", "DELETE",
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
    const response = await sendRequest(
      "/user/toggleFavorites", "PATCH",
      { id }
    );
    return response.data as IGoods | { id: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHANGE_FAVORITE_GOOD__NO_AUTO = createAsyncThunk<
  { result: IGoods; token: string },
  string,
  { rejectValue: string; state: RootState }
>("page/CHANGE_FAVORITE_GOOD__NO_AUTO", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/toggleFavoritesGetAuto", "PATCH",
      { id }
    );
    return response.data as { result: IGoods; token: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const ADD_TO_CARD_OF_GOODS = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string; state: RootState }
>("page/ADD_TO_CARD_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/addToCart", "PATCH",
      { id }
    );
    return response.data as IGoods;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const ADD_TO_CARD_OF_GOODS__NO_AUTO = createAsyncThunk<
  { result: IGoods; token: string },
  string,
  { rejectValue: string; state: RootState }
>("page/ADD_TO_CARD_OF_GOODS__NO_AUTO", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/addToCartGetAuto", "PATCH",
      { id }
    );
    return response.data as { result: IGoods; token: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const SUBTRACT_FROM_CART = createAsyncThunk<
  IGoods,
  string,
  { rejectValue: string }
>("page/SUBTRACT_FROM_CART", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/subFromCart", "PATCH",
      { id }
    );
    return response.data as IGoods;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const REMOVE_FROM_CART_OF_GOODS = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("page/REMOVE_FROM_CART_OF_GOODS", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest(
      "user/removeFromCart", "PATCH",
      { id }
    );
    return response.data as { id: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const SELECTING_PRODUCTS_IN_THE_CART = createAsyncThunk<
  { goodId: string; count: number; choice: boolean },
  string,
  { rejectValue: string }
>("page/SELECTING_PRODUCTS_IN_THE_CART", async (id, { rejectWithValue }) => {
  try {
    const response = await sendRequest("user/toggleSelect", "PATCH", { id });
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
    SET_LOGOUT: (state) => {
      state.data.user = initialUserData
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
              registered: true,
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
              registered: action.payload.registered,
              chats: action.payload.chats
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
          good: action.payload,
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
            (good) => good._id !== (action.meta.arg as string)
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
    builder.addCase(SELECTING_PRODUCTS_IN_THE_CART.fulfilled, (state, action) => {
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
  },
});

export default slice.reducer;
export const { LOADING_PAGE, PAGE_POSITION, SET_LOGOUT } = slice.actions;
