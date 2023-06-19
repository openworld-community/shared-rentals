import React from 'react';

interface Props {
  textColor?: string;
  width?: string;
  border: string;
  color: string;
  onClick: () => void;
  radius?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  textColor,
  width,
  border,
  color,
  onClick,
  radius,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: textColor,
        width,
        backgroundColor: color,
        border,
        borderRadius: radius,
      }}
      className="p-2"
    >
      {children}
    </button>
  );
};
