import React from "react";
import styles from "./index.module.css";
import { Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface IBtnNav {
  icon: IconType;
  onClick: () => void;
}

export interface IBottomNavProps {
  left: IBtnNav;
  middle: IBtnNav;
  right: IBtnNav;
  noLovesIcon?: boolean;
}

const lovesUrl = "/images/loves.png";

const BottomNav = (props: IBottomNavProps) => {
  const { left, middle, right, noLovesIcon } = props;

  const elmts = [{ ...left, key: "left" }, { ...middle, key: "middle" }, { ...right, key: "rigth" }];

  return (
    <>
      {noLovesIcon || <img src={lovesUrl} alt="" className={styles.lovesIcon} />}
      <div className={styles.container}>

        {elmts.map(e => {
          return (
            <div key={e.key} onClick={e.onClick} className={styles.elmt}>
              <Icon as={e.icon} boxSize={6} /> {/* <img src={e.urlIcon} alt={e.altImg} /> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BottomNav;
