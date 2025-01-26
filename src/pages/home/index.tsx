import { Button } from '@/components/button';
import { CategoryNav } from '@/components/categoryNav';
import { FoodGrid } from '@/components/foodGrid';
import { SearchInput } from '@/components/searchInput';
import { useFoods } from '@/global/hooks';
import { useCallback } from 'react';
import style from './style.module.css';

export const Home = () => {
  const {
    foods,
    pagination,
    categories,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeCategoryId,
    setActiveCategoryId,
    setCurrentPage,
  } = useFoods();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  const handleShowMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, [setCurrentPage]);

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId);
    },
    [setActiveCategoryId],
  );

  return (
    <>
      <SearchInput value={searchTerm} onChange={handleSearch} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {categories && (
            <CategoryNav
              activeCategoryId={activeCategoryId}
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          )}
          <FoodGrid foods={foods} />
          {pagination?.hasMore && (
            <div className={style.showMore}>
              <Button onClick={handleShowMore}>+ Show More</Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
