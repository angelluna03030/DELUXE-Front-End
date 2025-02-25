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
