import React from 'react';

interface ColorDetallesProps {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
}

export const ColorDetalles: React.FC<ColorDetallesProps> = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`rounded-full w-4 h-4 cursor-pointer mx-1 ${isSelected ? 'border-4 border-colorprimary' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onSelect(color)}
    ></div>
  );
};
  