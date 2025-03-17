export const ColorDetalles = ({ color, isSelected, onSelect }) => {
    return (
      <div
        className={`rounded-full w-4 h-4 cursor-pointer mx-2 ${isSelected ? 'border-4 border-colorprimary' : ''}`}
        style={{
          backgroundColor: color,
        }}
        onClick={() => onSelect(color)}
      ></div>
    );
  };
  