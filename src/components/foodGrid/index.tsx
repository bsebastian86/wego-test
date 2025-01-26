import { FunctionComponent } from 'react';
import { FoodCard, FoodCardProps } from '../foodCard';
import style from './style.module.css';

type FoodGridProps = {
  foods: FoodCardProps[];
};

export const FoodGrid: FunctionComponent<FoodGridProps> = ({
  foods,
}: FoodGridProps) => {
  return (
    <div className={style.foodCardGrid}>
      {foods.map((food) => (
        <FoodCard key={food.id} {...food} />
      ))}
    </div>
  );
};
