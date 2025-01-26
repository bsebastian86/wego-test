import classNames from 'classnames';
import style from './style.module.css';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
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
