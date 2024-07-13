import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination
} from "@nextui-org/react";

import Swal from 'sweetalert2';

import { getData, putData } from "../../../config/utils/metodoFecht.js";
import { toast } from 'react-toastify';

// Componentes
// import ModalComponent from '../../../components/Modal/index.jsx';
// import TargetasVista from './TargetaProducto.jsx';
// import DetalleProducto from './DetalleProducto.jsx';
// import ContenidoSuperior from './ContenidoSuperior.jsx';
import TablaCargandoAnimacion from '../../../components/Imagenes/TablaCarga/index.jsx';
import TablaVaciaImagen from '../../../components/Imagenes/TablaVacia/index.jsx';
import EditarProducto from './EditarProducto.jsx';

const RUTA_API = import.meta.env.VITE_API_URL;

// * Columna que contiene la tabla
const columns = [
  { name: 'Código', uid: 'codigo', sortable: true },
  { name: 'Nombre producto', uid: 'nombreproductos', sortable: true },
  { name: 'Precio', uid: 'precio', sortable: true },
  { name: 'Descripción', uid: 'descripcion', sortable: true },
  { name: 'Materiales', uid: 'materiales', sortable: true },
  { name: 'Tallas', uid: 'tallas', sortable: true },
  { name: 'Colores', uid: 'colores', sortable: true },
  { name: 'Imágenes', uid: 'imágenes', sortable: true },
  { name: 'Categorías', uid: 'categorias', sortable: true },
  { name: 'Fecha de Creación', uid: 'fechaCreacion', sortable: true },
  { name: 'Acciones', uid: 'acciones', sortable: false },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap = {
  activo: 'success',
  inactivo: 'danger',
  agotado: 'default'
};

const statusOptions = [
  { name: 'Activo', uid: 'activo' },
  { name: 'Inactivo', uid: 'inactivo' },
  { name: 'Sin existencias', uid: 'agotado' }
];

const columnasVisibles = [
  'codigo',
  'nombreproductos',
  'precio',
  'descripcion',
  'materiales',
  'tallas',
  'colores',
  'imágenes',
  'categorias',
  'fechaCreacion',
  'acciones',
];

const TablaProductos = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 750px)' });

  // ? Estados

  const [cerrarModal, setCerrarModal] = React.useState(true)
  const [modalDetalle, setModalDetalle] = React.useState(false);
  const [modalRegistrar, setModalRegistrar] = React.useState(false);
  const [modalEditar, setModalEditar] = React.useState(false);

  // * Modal de registrar
  const handleCloseModalRegistrar = () => setModalRegistrar(false);

  // * Modal detalle
  const handleCloseModalDetalle = () => setModalDetalle(false);

  // * Modal editar
  const handleCloseModalEditar = () => setModalEditar(false);

  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(columnasVisibles),
  );
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'codigo',
    direction: 'descending',
  });
  const [page, setPage] = React.useState(1);

  // * Traer datos de productos cuando carga el componente
  React.useEffect(() => {
    setLoading(true);

    const loadData = async () => {

      try {
        const { status, dataResponse } = await getData(`${RUTA_API}/api/productos`);
        if (status >= 200 && status < 300) 
          setData(dataResponse.datos);
        else 
          toast.error("No se encontraron los recursos (404)")
      } catch (err) {
        toast.error('No se ha podido traer los productos');
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    loadData();
    setLoading(true);
    setCerrarModal(false)
  }, []);

  // * Camibar de estado un producto
  const handleChipClick = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cambiar el estado de una categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { status, dataResponse } = await putData(`${RUTA_API}/api/productos/estado/${id}`);
          if (status >= 200 && status < 300) {
            toast.success('Estado cambiado');
            setData((prevData) => prevData.map((dato) =>
              dato._id === id
                ? { ...dato, estado_producto: dato.estado_producto === 1 ? 0 : 1 }
                : dato
            ));
          } else if (status >= 400 && status < 500) {
            toast.warn(dataResponse.mensaje);
          }
        } catch (err) {
          toast.error('Hubo un error al cambiar el estado');
          console.error(err);
        }
      }
    });
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  // * Buscar producto y filtrar por estado
  const filteredItems = React.useMemo(() => {
    let filtrarDatos = [...data];

    if (hasSearchFilter) {
      filtrarDatos = filtrarDatos.filter(dato =>
        dato.nombreproductos.toLowerCase().includes(filterValue.toLowerCase()) ||
        dato.descripcion.toLowerCase().includes(filterValue.toLowerCase()) ||
        dato.categorias.toLowerCase().includes(filterValue.toLowerCase()) || 
        dato.precio.toString().includes(filterValue)
      );
    }

    if (statusFilter !== 'all') {
      filtrarDatos = filtrarDatos.filter(dato =>
        statusFilter.has(dato.estado_producto === 1 ? 'activo' : dato.estado_producto === 2 ? 'agotado' : 'inactivo')
      );
    }

    return filtrarDatos;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((dato, columnKey) => {
    const cellValue = dato[columnKey];
    switch (columnKey) {
      case 'tallas':
        return cellValue.join(', ');
      case 'colores':
        return cellValue.join(', ');
      case 'imágenes':
        return cellValue.map((img, index) => (
          <img key={index} src={img} alt={`img-${index}`} width="50" />
        ));
      case 'fechaCreacion':
        return new Date(cellValue).toLocaleDateString();
      case 'acciones':
        return (
          <div className='flex justify-evenly items-center gap-2'>
            {/* <ModalComponent
              titulo='Editar producto'
              size='lg'
              onClose={handleCloseModalEditar}
              iconBoton='edit'
              botonColor='secundary'
              color='#338EF0'
              isDisabled={dato.estado_producto === 0}
            >
              <EditarProducto
                id={dato._id}
                closeModal={handleCloseModalEditar}
                setData={setData}
              />
            </ModalComponent>
            <ModalComponent
              titulo='Detalle de producto'
              size='lg'
              onClose={handleCloseModalDetalle}
              iconBoton='eye'
              botonColor='primary'
              color='#21A6F0'
            >
              <DetalleProducto datos={dato} />
            </ModalComponent> */}
            <Chip
              size='sm'
              variant='flat'
              color={dato.estado_producto === 1 ? 'success' : 'danger'}
              onClick={() => handleChipClick(dato._id)}
            >
              {dato.estado_producto === 1 ? 'Activo' : 'Inactivo'}
            </Chip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return <TablaCargandoAnimacion />;
  }

  if (!data.length && !loading) {
    return <TablaVaciaImagen />;
  }

  return (
    <div className='w-full'>
      {/* <div className='w-full flex justify-center'>
        <ContenidoSuperior
          titulo='Lista de Productos'
          placeholder='Buscar Producto'
          onSearchChange={(e) => setFilterValue(e.target.value)}
          searchValue={filterValue}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={statusOptions}
          toggleModal={() => setModalRegistrar(true)}
          showButton={true}
        />
      </div> */}
      {isMobile ? (
        <div className='grid grid-cols-1 gap-4 mt-5'>
          {/* {sortedItems.map((dato) => (
            <TargetasVista key={dato._id} data={dato} />
          ))} */}
        </div>
      ) : (
        <Table
          aria-label="Example table with dynamic content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
                allowsSorting={column.sortable}
              >
                {capitalize(column.name)}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Pagination
              total={pages}
              initialPage={1}
              page={page}
              onChange={(page) => setPage(page)}
            />
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default TablaProductos;
