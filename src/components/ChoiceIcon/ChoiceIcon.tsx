import React, { FC, useState } from "react";
import { Favorites } from "../../UI_Component/Icons";

const ChoiceIcon: FC<{
  favorite?: boolean;
  onClick: (id: string) => void;
  id: string;
}> = ({ favorite, onClick, id }) => {
  const [like, setLike] = useState<boolean>(favorite || false);
  const handleClick = (id: string) => {
    setLike(!like);
    onClick(id);
  };
  if (like) {
    return (
      <div onClick={() => handleClick(id)}>
        <Favorites width="30" height="30" className="like" like={like} />
      </div>
    );
  }
  return (
    <div onClick={() => handleClick(id)}>
      <Favorites width="30" height="30" className="like" />
    </div>
  );
};

export default ChoiceIcon;
