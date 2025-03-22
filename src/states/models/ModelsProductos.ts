export interface Producto {
    _id: string;
    codigo: string;
    nombreproductos: string;
    estado: number;
    precio: number;
    descripcion: string;
    tallas: string[];
    colores: string[];
    imagenes: string[];
    categorias: string[];
    fechaCreacion: string; // Puede ser Date si lo deseas
    __v: number;
  }

  export interface ProductoFavoritos {
    _id: string;
    codigo: string;
    nombreproductos: string;
    estado: number;
    precio: number;
    descripcion: string;
    tallas: string[];
    colores: string[];
    imagenes: string[];
    categorias: string[];
    fechaCreacion: string; // Puede ser Date si lo deseas
    favoritos: boolean;
    __v: number;
  }
  export interface Categoria {
    _id: string;
    nombre: string;
    imagen: string;
    estado: number;
    descripcion: string;
    fechaCreacion: string;
    __v: number;
  }
  export interface CatalogoPagina {
    _id: string;
    imagenesparavideo: string[];
    video: string;
    imagenesparagaleria: string[];
    productosdestacados: string[];
    __v: number;
  }


  export interface UsuarioProducto {
    nombre: string;
    cantidad: number;
    precio: number;
    talla: string;
    color: string;
  }
  
  export interface UsuarioCompra {
    fechaDeCompra: Date;
    productos: UsuarioProducto[];
    totalCompra: number;
  }
  
  export interface UsuariosCompras {
    _id: string,
    nombre: string;
    correo: string;
    direccion: string;
    departamento: string;
    fechaDeRegistro: Date;
    compras: UsuarioCompra[];
  }
  