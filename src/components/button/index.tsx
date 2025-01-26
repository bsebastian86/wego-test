import classNames from 'classnames';
import style from './style.module.css';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={classNames(style.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};
