import React from 'react';

interface Props {
  textColor?: string;
  width?: string;
  border?: string;
  color?: string;
  onClick?: () => void;
  radius?: string;
  children?: React.ReactNode;
  icon?: string;
}

export const Button: React.FC<Props> = ({
  textColor,
  width,
  border,
  color,
  onClick,
  radius,
  icon,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: textColor || '#fff',
        width,
        backgroundColor: color || '#999',
        border,
        borderRadius: radius || '6px',
      }}
      className={`py-2 px-6 ${icon ? icon : ''}`}
    >
      {children}
    </button>
  );
};
