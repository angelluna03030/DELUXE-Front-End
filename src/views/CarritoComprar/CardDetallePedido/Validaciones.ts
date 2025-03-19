
  
  export const validarNombre = (nombre: string) => {
      if (typeof nombre === 'string' && (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(nombre) || nombre.length > 50)) {
        return false; // Retorna vacío si cumple con la condición
      } else {
        return "El nombre debe contener solo letras máximo 50 caracteres";
      }
    };


  export const validartelefono = (telefono: { toString: () => string; } ) => {
    if (  /^\d{10}$/.test(telefono.toString())) {
      return false; // Retorna false si cumple con la condición
    } else {
      return "El número de telefono debe comenzar con 3, tener 10 dígitos y solo contener números.";
    }
  };
  

  export const validarCorreo = (correo: string)=> {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (regexCorreo.test(correo)) {
      return false; // Retorna vacío si cumple con la condición
    } else {
      return "El correo electrónico no es válido.";
    }
  };
