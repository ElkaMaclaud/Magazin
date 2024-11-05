import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IGoods } from "../../type/goodsType";
import classes from "./style/GoodPage.module.css";
import { Button, CardPageFlex, ImageGood, InfoCard, Slider, SmallCard } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { GET_GOOD } from "../../store/slice";
import { CounterButton } from "../../components/CounterButton/CounterButton";
import ChoiceIcon from "../../components/ChoiceIcon/ChoiceIcon";
import Spinner from "../../components/Spinner/Spinner";
import { ISeller } from "../../type/userType";

const GoodPage = () => {
  const { id } = useParams();
  const { good } = useAppSelector((state) => state.page);
  const [image, setImage] = useState(good?.image[0])
  useEffect(() => {
    setImage(good?.image[0])
  }, [good])
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(GET_GOOD(id))
  }, [id, dispatch]);
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
              setState={setImage}/>
            <div className={classes.wrapperGood}>
              <img className={classes.imgGood} src={image} />
              <div className={classes.description}>
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
              <Link to="../chat">
                Написать продавцу
              </Link>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque, voluptatibus. Quidem sint facilis fuga, iusto
                  quod alias ea nulla corrupti.
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
        </div>
      </div>
    </CardPageFlex >
  );
};

export default GoodPage;
