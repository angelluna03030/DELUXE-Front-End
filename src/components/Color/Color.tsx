interface ColorDetallesProps {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
}


export const Color: React.FC<ColorDetallesProps> = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`rounded-full w-12 h-12 cursor-pointer ${isSelected ? 'border-4 border-colorprimary' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onSelect(color)}
    ></div>
  );
};
