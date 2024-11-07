import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IGoods } from "../../type/goodsType";
import classes from "./style/GoodPage.module.css";
import { CardPageFlex, InfoCard, Slider, SmallCard } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { CREATE_NEW_CHAT, GET_GOOD } from "../../store/slice";
import { CounterButton } from "../../components/CounterButton/CounterButton";
import ChoiceIcon from "../../components/ChoiceIcon/ChoiceIcon";
import Spinner from "../../components/Spinner/Spinner";
import { ISeller } from "../../type/userType";
import { Location } from "../../UI_Component/Icons";

const GoodPage = () => {
  const { id } = useParams();
  const { good, data } = useAppSelector((state) => state.page);
  const [image, setImage] = useState(good?.image[0])
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setImage(good?.image[0])
  }, [good])

  useEffect(() => {
    if (id) dispatch(GET_GOOD(id))
  }, [id, dispatch]);

  const goChat = (supportСhat?: boolean) => {
    let chat;
    if (supportСhat) {
      chat = findChatWithStore(process.env.REACT_APP_API_SUPPORT_CHAT!)
    } else {
      chat = findChatWithStore()
    }
    if (chat) {
      navigate("../chat", { state: { ...chat } })
    } else if (good && !chat) {
      if (supportСhat) {
        dispatch(CREATE_NEW_CHAT({
          userId: data.user._id,
          id: process.env.REACT_APP_API_SUPPORT_CHAT!,
          userTitle: process.env.REACT_APP_API_SUPPORT_CHAT_NAME!,
          titleId: data.user.publik.name
        }))
        navigate("../chat")
      } else {
        dispatch(CREATE_NEW_CHAT({
          userId: data.user._id,
          userTitle: good.seller.name,
          id: good.seller._id,
          titleId: data.user.publik.name
        }))
        navigate("../chat")
      }
    }
  }
  const findChatWithStore = (searchedСhatId?: string) => {
    let findChatId;
    if (good) {
      findChatId = data.user?.chats.find((i) => 
        i.participants.some((i) => i.userId === searchedСhatId || i.userId === good?.seller._id))
    }
    return findChatId
  }
  const checkProperty = (card: IGoods & { seller: ISeller }) => {
    if ("count" in card) {
      return card.count as number;
    }
    return 0;
  };
  if (!good) return <Spinner />;
  return (
    <CardPageFlex>
      <div className={classes.wrapperPage}>
        <div className={classes.wrapperImgGood}>
          <div className={classes.wrapperSliderGood}>
            <Slider
              list={good.image}
              width={50}
              height={50}
              orientationAlbum
              setState={setImage} />
            <div className={classes.wrapperGood}>
              <img className={classes.imgGood} src={image} />
              <div className={classes.description}>
                <h3>{good.category}</h3>
                <h3>{good.name}</h3>
                <h4>{good.brand}</h4>
                <p>{good.description}</p>
                <div>{Array.isArray(good.characteristics) ?
                  good.characteristics.map(item =>
                    <div key={item.name} className={classes.characteristics}><p>{item.name}:</p>
                      <p>{item.value}</p></div>) :
                  good.characteristics}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.salesmant}>
            <img src={good.seller.image} alt="" />
            <div className={classes.salesmantInfoWrapper}>
              <p>Продавец</p>
              <h2>{good.seller.name}</h2>
              <div onClick={() => goChat()} className={classes.link}>
                Написать продавцу
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrapperInfoGood}>
          <SmallCard>
            <div className={classes.contentInfoPrice}>
              <CounterButton
                id={good._id}
                text={good.price}
                title={"Добавить в корзину"}
                counter={checkProperty(good)}
                style={{ padding: "0" }}
              />
              <div className={classes.favorite}><ChoiceIcon favorite={good.favorite} id={good._id} /></div>
            </div>
            <InfoCard>
              <div className={classes.textWrapper}>
                <div className={classes.round}></div>
                <div className={classes.text}>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque, voluptatibus. Quidem sint facilis fuga, iusto
                    quod alias ea nulla corrupti.
                  </p>
                  <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque, voluptatibus. Quidem sint facilis fuga, iusto
                    quod alias ea nulla corrupti.
                  </p>
                  <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque, voluptatibus. Quidem sint facilis fuga, iusto
                    quod alias ea nulla corrupti.
                  </p>
                  <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque, voluptatibus. Quidem sint facilis fuga, iusto
                    quod alias ea nulla corrupti.
                  </p>
                </div>
              </div>
            </InfoCard>
          </SmallCard>
          <div className={classes.deliveryInfoWrapper}>
            <h3>Информация о доставке</h3>
            <div className={classes.deliveryInfo}><Location /><p>{data.user.delivery.choice}</p></div>
            <p>Со склада Magazin, Московская Область</p>
            <div className={classes.link} onClick={() => goChat(true)}>Есть вопросы по товару или доставке? Напишите нам!</div>
          </div>
        </div>
      </div>
    </CardPageFlex >
  );
};

export default GoodPage;
