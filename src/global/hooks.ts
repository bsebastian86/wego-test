import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Food } from './types';
import { CATEGORIES_API, FOODS_API } from './constants';

export const useFoods = (itemsPerPage: number = 9) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const filterBySearch = useCallback(
    (foods: Food[]) => {
      if (!searchTerm) return foods;
      return foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    },
    [searchTerm],
  );

  const filterByCategoryId = useCallback(
    (foods: Food[]) => {
      if (!activeCategoryId) return foods;
      return foods.filter((food) => food.categoryId === activeCategoryId);
    },
    [activeCategoryId],
  );

  const paginateData = useCallback(
    (foods: Food[]) => {
      const filteredFoods = filterBySearch(filterByCategoryId(foods));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
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

  const { data: foods, isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await fetch(FOODS_API);
      const data = await response.json();
      return data.foods;
    },
    select: (foods) => paginateData(filterByCategoryId(foods)),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(CATEGORIES_API);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    // Reset displayed foods when category changes
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
