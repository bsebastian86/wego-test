import { FunctionComponent } from 'react';
import { FoodCard, FoodCardProps } from '../foodCard';
import style from './style.module.css';

type FoodGridProps = {
  foods: FoodCardProps[];
};

export const FoodGrid: FunctionComponent<FoodGridProps> = ({
  foods = [],
}: FoodGridProps) => {
  return (
    <div className={style.foodCardGrid}>
      {foods.length > 0 ? (
        foods.map((food) => <FoodCard key={food.id} {...food} />)
      ) : (
        <div className={style.noFood}>Sorry, no food found.</div>
      )}
    </div>
  );
};
