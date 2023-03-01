import React from "react";

import styles from "./index.module.css";

interface IBtnNav {
  urlIcon: string;
  onClick: () => void;
  altImg?: string;
}

export interface IBottomNavProps {
  left: IBtnNav;
  middle: IBtnNav;
  right: IBtnNav;
}

const BottomNav = (props: IBottomNavProps) => {
  const { left, middle, right } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.padder}></div>
      <div className={styles.container}>
        <img src="svgs/bottom-nav.svg" className={styles.background} />
        <div className={styles.btns}>
          <div className={styles.leftBtn} onClick={left.onClick}>
            <img src={left.urlIcon} alt={left.altImg} />
          </div>
          <div className={styles.middleBtn}>
            <div className={styles.containerMiddleBtn} onClick={middle.onClick}>
              <img src={middle.urlIcon} alt={middle.altImg} />
            </div>
          </div>
          <div className={styles.rightBtn} onClick={right.onClick}>
            <img src={right.urlIcon} alt={right.altImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
