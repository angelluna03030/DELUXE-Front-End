export const Color = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`rounded-full w-12 h-12 cursor-pointer ${isSelected ? 'border-4 border-[#F2E6D6]' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onSelect(color)}
    ></div>
  );
}