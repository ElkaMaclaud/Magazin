import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { goods } from "../MockupData/goods";
import { IGoods } from "../type/goodsType";
type IAuthorization = {
  name: string;
  phone?: string;
  email: string;
  dateOfBirt?: Date;
  password: string;
};
type ReturnAction = { goods: IGoods[]; basket: IGoods[]; favorite: IGoods[] };
type ExtendedReturnAction = ReturnAction & {
  purchased: IGoods[];
};
export interface IInitialState {
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
        email: "",
      },
      favorite: [],
      basket: [],
      registered: [],
      purchased: [],
    },
  },
};
export const AUT_USER = createAsyncThunk<
  IAuthorization,
  IAuthorization,
  { rejectValue: string }
>("page/AUT_USER", async (value, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        //const success = Math.random() < 0.9;
        const success = true;
        if (success) {
          resolve({ email: value.email, name: value.name, dateOfBirt: value.dateOfBirt, phone: value.phone });
        } else {
          throw new Error("Authorization failed");
        }
      }, 2000)
    );
    return response as IAuthorization;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_GOODS", async (_, { rejectWithValue }) => {
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
});
export const GET_FAVORITE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_FAVORITE_GOODS", async (_, { rejectWithValue, getState }: any) => {
  try {
    //const state: IInitialState = getState();
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(
            getState().page.data.goods.filter((good: IGoods) => good.favorite)
          );
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
  undefined,
  { rejectValue: string }
>("page/GET_BASKET_OF_GOODS", async (_, { rejectWithValue, getState }: any) => {
  try {
    //const state: IInitialState = getState();
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(
            getState().page.data.goods.filter((good: IGoods) => good.count)
          );
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
export const CLEARANCE_OF_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/CLEARANCE_OF_GOODS", async (_, { rejectWithValue, getState }: any) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(
            getState().page.data.user.basket.filter(
              (good: IGoods) => good.choice
            )
          );
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
export const CANSEL_PURCHASE = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/CANSEL_PURCHASE", async (_, { rejectWithValue, getState }: any) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(getState().page.data.user.basket);
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

export const PAY_GOODS = createAsyncThunk<
  ExtendedReturnAction,
  undefined,
  { rejectValue: string }
>("page/PAY_GOODS", async (_, { rejectWithValue, getState }: any) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve({
            goods: getState().page.data.goods.map((good: IGoods) => {
              if (good.choice) {
                return { ...good, count: 0, choice: false };
              }
              return good;
            }),
            basket: getState().page.data.user.basket.filter(
              (good: IGoods) => !good.choice
            ),
            favorite: getState().page.data.user.favorite.map((good: IGoods) => {
              if (good.choice) {
                return { ...good, count: 0 };
              }
              return good;
            }),
            purchased: getState().page.data.user.basket.filter(
              (good: IGoods) => good.choice
            ),
          });
        } else {
          throw new Error("Authorization failed");
        }
      }, 0)
    );
    return response as ExtendedReturnAction;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CHOICE_ALL_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  boolean,
  { rejectValue: string }
>(
  "page/CHOICE_ALL_BASKET_OF_GOODS",
  async (checked, { rejectWithValue, getState }: any) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve(
              resolve({
                goods: getState().page.data.goods.map((good: IGoods) => {
                  return { ...good, choice: checked };
                }),
                basket: getState().page.data.user.basket.map((good: IGoods) => {
                  return { ...good, choice: checked };
                }),
                favorite: getState().page.data.user.favorite.map(
                  (good: IGoods) => {
                    return { ...good, choice: checked };
                  }
                ),
              })
            );
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const REMOVE_CHOICES_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  undefined,
  { rejectValue: string }
>(
  "page/REMOVE_CHOICES_BASKET_OF_GOODS",
  async (_, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((item: IGoods) => {
                if (item.choice) return { ...item, choice: false, count: 0 };
                return { item };
              }),
              basket: getState().page.data.user.basket.filter(
                (item: IGoods) => !item.choice
              ),
              favorite: getState().page.data.user.favorite.map(
                (item: IGoods) => {
                  if (item.choice) return { ...item, count: 0 };
                  return { item };
                }
              ),
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const CHANGE_FAVORITE_GOOD = createAsyncThunk<
  ReturnAction,
  string,
  { rejectValue: string }
>(
  "page/CHANGE_FAVORITE_GOOD",
  async (good_id, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((good: IGoods) => {
                if (good.id === good_id) {
                  return {
                    ...good,
                    favorite: good.favorite ? false : true,
                  };
                }
                return good;
              }),
              basket: getState().page.data.user.basket.map((good: IGoods) => {
                if (good.id === good_id) {
                  return {
                    ...good,
                    favorite: good.favorite ? false : true,
                  };
                }
                return good;
              }),
              favorite: getState().page.data.user.favorite.find(
                (good: IGoods) => good.id === good_id
              )
                ? getState().page.data.user.favorite.filter(
                    (good: IGoods) => good.id !== good_id
                  )
                : [
                    ...getState().page.data.user.favorite,
                    {
                      ...getState().page.data.goods.find(
                        (good: IGoods) => good.id === good_id
                      ),
                      favorite: true,
                    },
                  ],
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const ADD_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  string,
  { rejectValue: string }
>(
  "page/ADD_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((good: IGoods) => {
                if (good.id === good_id) {
                  return { ...good, count: good.count ? good.count + 1 : 1 };
                }
                return good;
              }),
              basket: getState().page.data.user.basket.find(
                (good: IGoods) => good.id === good_id
              )
                ? getState().page.data.user.basket.map((good: IGoods) => {
                    if (good.id === good_id) {
                      return {
                        ...good,
                        count: good.count ? good.count + 1 : 1,
                      };
                    }
                    return good;
                  })
                : [
                    ...getState().page.data.user.basket,
                    {
                      ...getState().page.data.goods.find(
                        (good: IGoods) => good.id === good_id
                      ),
                      count: 1,
                    },
                  ],
              favorite: getState()
                .page.data.goods.map((good: IGoods) => {
                  if (good.id === good_id) {
                    return { ...good, count: good.count ? good.count + 1 : 1 };
                  }
                  return good;
                })
                .filter((item: IGoods) => item.favorite),
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 10)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const DECREMENT_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  string,
  { rejectValue: string }
>(
  "page/DECREMENT_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((good: IGoods) => {
                if (good.id === good_id) {
                  return {
                    ...good,
                    choice: false,
                    count: good.count && good.count - 1,
                  };
                }
                return good;
              }),
              basket:
                getState().page.data.user.basket.find(
                  (good: IGoods) => good.id === good_id
                ).count === 1
                  ? getState().page.data.user.basket.filter(
                      (good: IGoods) => good.id !== good_id
                    )
                  : getState().page.data.user.basket.map((good: IGoods) => {
                      if (good.id === good_id) {
                        return { ...good, count: good.count && good.count - 1 };
                      }
                      return good;
                    }),
              favorite: getState().page.data.user.favorite.map(
                (good: IGoods) => {
                  if (good.id === good_id) {
                    return { ...good, count: good.count && good.count - 1 };
                  }
                  return good;
                }
              ),
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const REMOVE_GOOD_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  string,
  { rejectValue: string }
>(
  "page/REMOVE_GOOD_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((good: IGoods) => {
                if (good.id === good_id) {
                  return { ...good, choice: false, count: 0 };
                }
                return good;
              }),
              basket: getState().page.data.user.basket.filter(
                (good: IGoods) => good.id !== good_id
              ),
              favorite: getState().page.data.user.favorite.map(
                (good: IGoods) => {
                  if (good.id === good_id) {
                    return { ...good, count: 0 };
                  }
                  return good;
                }
              ),
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);
export const CHOICE_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  string,
  { rejectValue: string }
>(
  "page/CHOICE_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }: any) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve({
              goods: getState().page.data.goods.map((good: IGoods) => {
                if (good.id === good_id) {
                  return { ...good, choice: good.choice ? false : true };
                }
                return good;
              }),
              basket: getState().page.data.user.basket.map((good: IGoods) => {
                if (good.id === good_id) {
                  return { ...good, choice: good.choice ? false : true };
                }
                return good;
              }),
              favorite: getState().page.data.user.favorite.map(
                (good: IGoods) => {
                  if (good.id === good_id) {
                    return { ...good, choice: good.choice ? false : true };
                  }
                  return good;
                }
              ),
            });
          } else {
            throw new Error("Authorization failed");
          }
        }, 0)
      );
      return response as ReturnAction;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

const slice = createSlice({
  name: "Page",
  initialState: state,
  reducers: {
    LOADING_PAGE: (state, action) => {
      state.loading = action.payload;
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
      if (action.payload) {
        return {
          ...state,
          token: Math.random().toString(36),
          loading: "COMPLICATED",
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              id: Math.random().toString(36),
              publik: {
                ...state.data.user.publik,
                name: action.payload.name,
              },
              private: {
                ...state.data.user.private,
                name: action.payload.name,
                phone: action.payload.phone || "",
                email: action.payload.email,
                dateOfBirt: action.payload.dateOfBirt,
              },
            },
          },
        }
      }
    });
    builder.addCase(GET_GOODS.fulfilled, (state, action) => {
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
    builder.addCase(GET_FAVORITE_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: { ...state.data.user, favorite: action.payload },
          },
        };
      }
    });
    builder.addCase(GET_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
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
    builder.addCase(
      REMOVE_CHOICES_BASKET_OF_GOODS.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            data: {
              ...state.data,
              goods: action.payload.goods,
              user: {
                ...state.data.user,
                basket: action.payload.basket,
                favorite: action.payload.favorite,
              },
            },
          };
        }
      }
    );
    builder.addCase(CHOICE_ALL_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
            },
          },
        };
      }
    });
    builder.addCase(CHANGE_FAVORITE_GOOD.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
            },
          },
        };
      }
    });
    builder.addCase(ADD_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
            },
          },
        };
      }
    });
    builder.addCase(DECREMENT_BASKET_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
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
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
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
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
            },
          },
        };
      }
    });
    builder.addCase(CLEARANCE_OF_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            user: {
              ...state.data.user,
              registered: action.payload,
            },
          },
        };
      }
    });
    builder.addCase(CANSEL_PURCHASE.fulfilled, (state, action) => {
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
    builder.addCase(PAY_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
            goods: action.payload.goods,
            user: {
              ...state.data.user,
              basket: action.payload.basket,
              favorite: action.payload.favorite,
              registered: [],
              purchased: [
                ...state.data.user.purchased,
                ...action.payload.purchased,
              ],
            },
          },
        };
      }
    });
  },
});

export default slice.reducer;
export const { LOADING_PAGE } = slice.actions;
