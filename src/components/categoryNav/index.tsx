import { FoodCategory } from '@/global/types';
import style from './style.module.css';
import classNames from 'classnames';

type CategoryNavProps = {
  categories: FoodCategory[];
  activeCategoryId: string;
  onCategoryClick: (categoryId: string) => void;
};

export const CategoryNav = ({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) => {
  return (
    <div className={style.container}>
      <ul className={style.categoryNav}>
        <li
          onClick={() => onCategoryClick('')}
          className={classNames(style.category, {
            [style.active]: !activeCategoryId,
          })}
        >
          <div className={style.name}>All</div>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={classNames(style.category, {
              [style.active]: category.id === activeCategoryId,
            })}
          >
            <div className={style.name}>{category.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
