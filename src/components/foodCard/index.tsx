import classNames from 'classnames';
import style from './style.module.css';
import { Food } from '@/global/types';
import { FaGift, FaPercent, FaStar } from 'react-icons/fa';

export type FoodCardProps = Omit<Food, 'index' | 'categoryId' | 'restaurant'>;

export const FoodCard = ({
  rating,
  promotion,
  isNew,
  minCookTime,
  maxCookTime,
  name,
  imageUrl,
}: FoodCardProps) => {
  return (
    <div className={style.foodCard}>
      <div className={style.imageContainer}>
        <img src={imageUrl} alt={name} />
        {promotion && <Tag promotion={promotion} />}
      </div>
      <div className={style.details}>
        <div className={style.name}>{name}</div>
        <div className={style.pills}>
          <div className={style.pill}>
            <FaStar /> {Math.round(rating * 10) / 10}
          </div>
          <div className={style.pill}>
            {minCookTime}-{maxCookTime} min
          </div>
          {isNew && (
            <div className={classNames(style.pill, style.new)}>New</div>
          )}
        </div>
      </div>
    </div>
  );
};

type TagProps = {
  promotion: string;
};

const Tag = ({ promotion }: TagProps) => {
  let promo = <></>;

  if (promotion === 'gift') {
    promo = <FaGift size={20} />;
  } else if (promotion === '1+1') {
    promo = <span className={style.promo}>1+1</span>;
  } else if (promotion === 'discount') {
    promo = <FaPercent size={12} />;
  }

  return (
    <div
      className={classNames(style.tag, {
        [style.gift]: promotion === 'gift',
        [style.oneplusone]: promotion === '1+1',
        [style.discount]: promotion === 'discount',
      })}
    >
      {promo}
    </div>
  );
};
