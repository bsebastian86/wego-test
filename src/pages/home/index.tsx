import { FoodGrid } from '@/components/foodGrid';
import style from './style.module.css';
import { Button } from '@/components/button';
import { CategoryNav } from '@/components/categoryNav';
import { useCallback, useEffect, useState } from 'react';
import { SearchInput } from '@/components/searchInput';

const CATEGORIES = [
  {
    id: '6288a89f1f0152b8c2cd512b',
    name: 'Sushi',
  },
  {
    id: '6288a89f7338764f2071a8a8',
    name: 'Pizza',
  },
  {
    id: '6288a89f70dc8cf93b71609b',
    name: 'Hot Meals',
  },
  {
    id: '6288a89fe6c2fe0b758360fe',
    name: 'Desserts',
  },
  {
    id: '6288a89fac9e970731bfaa7b',
    name: 'Drinks',
  },
];

const FOODS = [
  {
    id: '628b5decc94a27754f30e6f1',
    index: 0,
    rating: 3.9508,
    promotion: 'gift',
    isNew: false,
    categoryId: '6288a89fac9e970731bfaa7b',
    minCookTime: 80,
    maxCookTime: 100,
    restaurant: 'Niquent',
    name: 'Niquent Drinks',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg',
  },
  {
    id: '628b5decf39bcc4e982fc88a',
    index: 1,
    rating: 4.9874,
    promotion: '1+1',
    isNew: false,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 120,
    maxCookTime: 140,
    restaurant: 'Boilicon',
    name: 'Boilicon Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
    id: '628b5dec6678e96d75f2f7de',
    index: 2,
    rating: 3.4518,
    promotion: null,
    isNew: true,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 100,
    maxCookTime: 120,
    restaurant: 'Quinex',
    name: 'Quinex Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
    id: '628b5dec97eacf5e8a604bd7',
    index: 3,
    rating: 1.5975,
    promotion: 'gift',
    isNew: false,
    categoryId: '6288a89f7338764f2071a8a8',
    minCookTime: 120,
    maxCookTime: 140,
    restaurant: 'Perkle',
    name: 'Perkle Pizza',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/pizza.jpg',
  },
  {
    id: '628b5decf99b6a8dc80af3b6',
    index: 4,
    rating: 0.8644,
    promotion: null,
    isNew: true,
    categoryId: '6288a89fac9e970731bfaa7b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Zanymax',
    name: 'Zanymax Drinks',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg',
  },
  {
    id: '628b5dec3bec513bdafa73b9',
    index: 11,
    rating: 2.4158,
    promotion: 'discount',
    isNew: true,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Waab',
    name: 'Waab Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
];

export const Home = () => {
  const [activeCategoryId, setActiveCategoryId] = useState('');

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveCategoryId(categoryId);
  }, []);

  useEffect(() => {
    console.log('activeCategoryId', activeCategoryId);
  }, [activeCategoryId]);

  return (
    <>
      <div className={style.search}>
        <SearchInput />
      </div>
      <div className={style.categories}>
        <CategoryNav
          activeCategoryId={activeCategoryId}
          categories={CATEGORIES}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <FoodGrid foods={FOODS} />
      <div className={style.showMore}>
        <Button>+ Show More</Button>
      </div>
    </>
  );
};
