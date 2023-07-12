import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  large?: boolean;
  bgWhite?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: string;
}

export const Button: FC<ButtonProps> = ({
  large,
  bgWhite,
  onClick,
  icon,
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      onClick={onClick}
      className={`py-2 px-6 ${icon ? icon : ''}`}
      style={{
        color: bgWhite ? '#999' : '#FFF',
        backgroundColor: bgWhite ? '#FFF' : '#999',
        borderRadius: '6px',
        fontSize: large ? '16px' : '14px',
        padding: large ? '12px' : '8px',
      }}
    >
      {children}
    </button>
  );
};
