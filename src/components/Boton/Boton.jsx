export const Boton = ({ titulo, estilos, estilosClass }) => {
  return (
    <>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => alert('hol mundo')}
        style={estilos}
        className={estilosClass}
      >
        {titulo}
      </button>
    </>
  );
};
