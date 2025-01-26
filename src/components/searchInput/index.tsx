import { FaSearch } from 'react-icons/fa';
import style from './style.module.css';

export const SearchInput = () => {
  return (
    <div className={style.searchInput}>
      <FaSearch color="#838585" size={16} className={style.searchIcon} />
      <input type="text" placeholder="Enter food name..." />
    </div>
  );
};
