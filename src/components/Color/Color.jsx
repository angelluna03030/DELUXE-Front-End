export const Color = ({ color }) => {
  return (
    <>
      <div
        className='rounded-full w-12 h-12'
        style={{
          backgroundColor: color,
        }}
      ></div>
    </>
  );
};
