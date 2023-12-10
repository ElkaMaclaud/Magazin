import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "../type/dataType";
import { goods } from "../MockupData/goods";
import { IGoods } from "../type/goodsType";
import { IDelivery, IPurchased } from "../type/userType";
import { RootState } from "./Store";
type IAuthorization = {
  name: string;
  phone?: string;
  email: string;
  dateOfBirt?: Date;
  password: string;
};
type ReturnAction = {
  goods: IGoods[];
  basket: IGoods[];
  favorite: IGoods[];
  choiceAll?: boolean;
};
type ExtendedReturnAction = ReturnAction & {
  purchased: IPurchased[];
};
export interface IInitialState {
  success: boolean;
  pagePostion: "CHOICE_CATEGORY" | "MAIN";
  loading: "LOADING" | "COMPLICATED" | "LOGIN";
  data: IData;
}
const state: IInitialState = {
  success: false,
  pagePostion: "MAIN",
  loading: "LOADING",
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
          resolve({
            email: value.email,
            name: value.name,
            dateOfBirt: value.dateOfBirt,
            phone: value.phone,
          });
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
export const CHANGE_DELIVERY = createAsyncThunk<
  IDelivery,
  IDelivery,
  { rejectValue: string }
>("page/CHANGE_DELIVERY", async (value, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        //const success = Math.random() < 0.9;
        const success = true;
        if (success) {
          resolve(value);
        } else {
          throw new Error("Authorization failed");
        }
      }, 10)
    );
    return response as IDelivery;
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
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        //const success = Math.random() < 0.9;
        const success = true;
        if (success) {
          resolve(value);
        } else {
          throw new Error("Authorization failed");
        }
      }, 10)
    );
    return response as { name: string; phone?: string };
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const GET_GOODS_BY_CATEGORY = createAsyncThunk<
  IGoods[],
  string,
  { rejectValue: string; state: RootState }
>(
  "page/GET_GOODS_BY_CATEGORY",
  async (categoty, { rejectWithValue, getState }) => {
    try {
      const response = await new Promise<IGoods[]>((resolve) =>
        setTimeout(() => {
          const success = true;
          const basket = getState().page.data.user.basket;
          const favorite = getState().page.data.user.favorite;
          if (success) {
            resolve(
              goods
                .filter((item) => item.category === categoty)
                .map((good: IGoods) => {
                  const findGood = basket.find(
                    (goodFind: IGoods) => goodFind.id === good.id
                  );
                  const favoriteGood = favorite.find(
                    (likeGood: IGoods) => likeGood.id === good.id
                  );
                  if (findGood || favoriteGood) {
                    return {
                      ...good,
                      count: findGood?.count || 0,
                      choice: findGood?.choice || false,
                      favorite: favoriteGood?.favorite || false,
                    };
                  }
                  return { ...good };
                })
            );
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
export const GET_SALE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_SALE_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(goods.filter((item) => item.sale));
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
export const GET_DISCOUNT_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_DISCOUNT_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(goods.filter((item) => item.discount));
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
// export const GET_GOOD = createAsyncThunk<
//   IGoods,
//   string,
//    { rejectValue: string;}
// >("page/GET_SALE_GOODS", async (id, { rejectWithValue }) => {
//   try {
//     const response = await new Promise((resolve) =>
//     setTimeout(() => {
//       const success = true;
//       if (success) {
//         goods.find((item) => item.id === id);
//       } else {
//         throw new Error("Authorization failed");
//       }
//     }, 1000)
//   );

//     return response as IGoods;
//   } catch (error) {
//     return rejectWithValue(`${error}`);
//   }
// });
// export const GET_SALE_GOODS = createAsyncThunk<
//   IGoods[],
//   undefined,
//    { rejectValue: string }
// >("page/GET_SALE_GOODS", async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetch("../MockupData/goods.ts").then(res => res.json());
//         const success = true;
//         if (success) {
//           return response.data as IGoods[];
//         } else {
//           throw new Error("Authorization failed");
//         }
//   } catch (error) {
//     return rejectWithValue(${error});
//   }
// });
export const GET_FAVORITE_GOODS = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("page/GET_FAVORITE_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(
            goods.filter((good: IGoods) => good.favorite) //getState().page.data.
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
>("page/GET_BASKET_OF_GOODS", async (_, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve(
            goods.filter((good: IGoods) => good.count) //getState().page.data.
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
  { rejectValue: string; state: RootState }
>("page/CLEARANCE_OF_GOODS", async (_, { rejectWithValue, getState }) => {
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
  { rejectValue: string; state: RootState }
>("page/CANSEL_PURCHASE", async (_, { rejectWithValue, getState }) => {
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
  IDelivery, // | null
  { rejectValue: string; state: RootState }
>("page/PAY_GOODS", async (deliveryOrder, { rejectWithValue, getState }) => {
  try {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        const success = deliveryOrder === null ? false : true;
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
            purchased: getState()
              .page.data.user.basket.filter((good: IGoods) => good.choice)
              .map((item: IGoods) => ({ ...item, delivery: deliveryOrder })),
          });
        } else {
          throw new Error("Authorization failed");
          //alert("Авторизуйтесь сначало!")
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
  { rejectValue: string; state: RootState }
>(
  "page/CHOICE_ALL_BASKET_OF_GOODS",
  async (checked, { rejectWithValue, getState }) => {
    try {
      //const dispatch = useAppDispatch();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = true;
          if (success) {
            //dispatch(SET_CHOICE_ALL(checked));
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
              choiceAll: checked,
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
export const REMOVE_CHOICES_BASKET_OF_GOODS = createAsyncThunk<
  ReturnAction,
  undefined,
  { rejectValue: string; state: RootState }
>(
  "page/REMOVE_CHOICES_BASKET_OF_GOODS",
  async (_, { rejectWithValue, getState }) => {
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
  { rejectValue: string; state: RootState }
>(
  "page/CHANGE_FAVORITE_GOOD",
  async (good_id, { rejectWithValue, getState }) => {
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
                    {
                      ...getState().page.data.goods.find(
                        (good: IGoods) => good.id === good_id
                      ),
                      favorite: true,
                    },
                    ...getState().page.data.user.favorite,
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
  { rejectValue: string; state: RootState }
>(
  "page/ADD_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }) => {
    try {
      //const state: IInitialState = getState();
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const choiceAll = getState().page.data.user.choiceAll;
          const findInGoods = getState().page.data.goods.find(
            (good: IGoods) => good.id === good_id
          );
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
                    findInGoods
                      ? {
                          ...getState().page.data.goods.find(
                            (good: IGoods) => good.id === good_id
                          ),
                          count: 1,
                          choice: choiceAll,
                        }
                      : {
                          ...getState().page.data.user.favorite.find(
                            (good: IGoods) => good.id === good_id
                          ),
                          count: 1,
                          choice: choiceAll,
                        },
                    ...getState().page.data.user.basket,
                  ],
              favorite: getState().page.data.user.favorite.map(
                (good: IGoods) => {
                  if (good.id === good_id) {
                    return { ...good, count: good.count ? good.count + 1 : 1 };
                  }
                  return good;
                }
              ),
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
  { rejectValue: string; state: RootState }
>(
  "page/DECREMENT_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }) => {
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
                )!.count === 1
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
  { rejectValue: string; state: RootState }
>(
  "page/REMOVE_GOOD_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }) => {
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
  { rejectValue: string; state: RootState }
>(
  "page/CHOICE_BASKET_OF_GOODS",
  async (good_id, { rejectWithValue, getState }) => {
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
    PAGE_POSITION: (state, action) => {
      state.pagePostion = action.payload;
    },
    // SET_CHOICE_ALL: (state, action) => {
    //   state.data.user.choiceAll = action.payload;
    // },
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
        const token = Math.random().toString(36) + Math.random().toString(36);
        localStorage.setItem("token", token);
        return {
          ...state,
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
    builder.addCase(GET_FAVORITE_GOODS.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loading: "COMPLICATED",
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
              choiceAll:
                action.payload.choiceAll !== undefined
                  ? action.payload.choiceAll
                  : false,
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
export const { LOADING_PAGE, PAGE_POSITION } = slice.actions;
