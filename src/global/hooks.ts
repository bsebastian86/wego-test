import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORIES_API, FOODS_API } from './constants';
import { Food, FoodCategory } from './types';

export const useFoods = (itemsPerPage: number = 9) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories api
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(CATEGORIES_API);
      const data = await response.json();
      return data;
    },
  });

  /**
   * Create categories map for quick lookup.
   * This was done because the Food API has typos for "Dessert" and "Sushi"
   */

  const categoriesMap = useMemo(
    () =>
      categories.reduce((acc: Record<string, string>, cat: FoodCategory) => {
        acc[cat.id] = cat.name;
        return acc;
      }, {} as Record<string, string>),
    [categories],
  );

  const filterBySearch = useCallback(
    (foods: Food[]) => {
      if (!searchTerm) return foods;
      const term = searchTerm.toLowerCase();
      return foods.filter(
        (food) =>
          // Filter by food name and category name
          food.name.toLowerCase().includes(term) ||
          (categoriesMap[food.categoryId] || '').toLowerCase().includes(term),
      );
    },
    [categoriesMap, searchTerm],
  );

  // Filter foods by category when clicking the Category Nav
  const filterByCategoryId = useCallback(
    (foods: Food[]) => {
      if (!activeCategoryId) return foods;
      return foods.filter((food) => food.categoryId === activeCategoryId);
    },
    [activeCategoryId],
  );

  /**
   * Paginate data to initially show 9 items by default.
   * "itemsPerPage" can be passed to show more or less items.
   * Clicking the "Show More" will append more items until all items are shown.
   */
  const paginateData = useCallback(
    (foods: Food[]) => {
      const filteredFoods = filterBySearch(filterByCategoryId(foods));
      const startIndex = 0;
      const endIndex = currentPage * itemsPerPage;
      const paginatedFoods = filteredFoods.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

      return {
        foods: paginatedFoods,
        pagination: {
          currentPage,
          totalPages,
          hasMore: currentPage < totalPages,
        },
      };
    },
    [currentPage, filterByCategoryId, filterBySearch, itemsPerPage],
  );

  // Fetch foods api
  const { data: foods, isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await fetch(FOODS_API);
      const data = await response.json();
      return data.foods;
    },
    // Transform data to paginate
    select: (foods) => paginateData(filterByCategoryId(foods)),
  });

  useEffect(() => {
    // Reset current page when activeCategoryId changes
    if (activeCategoryId) {
      setCurrentPage(1);
    }
  }, [activeCategoryId]);

  return {
    foods: foods?.foods ?? [],
    pagination: foods?.pagination,
    categories,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeCategoryId,
    setActiveCategoryId,
    setCurrentPage,
  };
};
