
export const validarNombre = (nombre: string): string | null => {
  if (!nombre) {
    return "El nombre no puede estar vacío.";
  }

  if (nombre.length > 50) {
    return "El nombre debe tener máximo 50 caracteres.";
  }

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
  if (!regex.test(nombre)) {
    return "El nombre debe contener solo letras y espacios.";
  }

  return null; // Retorna null si el nombre es válido
};
  export const validartelefono = (telefono: { toString: () => string; } ) => {
    if (  /^\d{10}$/.test(telefono.toString())) {
      return false; // Retorna false si cumple con la condición
    } else {
      return "El número de telefono debe comenzar con 3, tener 10 dígitos y solo contener números.";
    }
  };
  

  export const validarCorreo = (correo: string): string => {
    // Expresión regular para validar correos electrónicos
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{10,}$/;
  
    // Validar el correo electrónico usando la expresión regular
    return regexCorreo.test(correo) 
      ? "" // Retorna vacío si el correo es válido
      : "El correo electrónico no es válido."; // Mensaje si no es válido
  };
  