import { FaSearch } from 'react-icons/fa';
import style from './style.module.css';

type SearchInputProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className={style.searchInput}>
      <FaSearch color="#838585" size={16} className={style.searchIcon} />
      <input
        value={value}
        type="text"
        placeholder="Enter food name..."
        onChange={onChange}
      />
    </div>
  );
};
