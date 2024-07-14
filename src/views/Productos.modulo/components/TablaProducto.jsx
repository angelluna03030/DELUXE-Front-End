import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tooltip
} from "@nextui-org/react";
import { getData, putData, } from "../../../config/utils/metodoFecht";
import { toast } from 'react-toastify';
 const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return ''; // Manejar valores undefined o null
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const RUTA_API = import.meta.env.VITE_API_URL;
const columns = [
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Categoría", uid: "category", sortable: true },
  { name: "Estado", uid: "status", sortable: true },
  { name: "Acciones", uid: "actions" },
];

const EstadoOptions = [
  { name: "activo", uid: "activo" },
  { name: "inactivo", uid: "inactivo" },
  
];
import { SearchIcon } from "../../../states/icons/SearchIcon";
import { ChevronDownIcon } from "../../../states/icons/ChevronDownIcon";
import { users } from "./data";
import {EditarProducto} from "./EditarProducto"
import Swal from 'sweetalert2';
import { ModalCrearProductos } from "./crearProducto";
import {DetalleProducto} from "./DetalleProducto"
const statusColorMap = {
  activo: "success",
  inactivo: "danger",

};

const INITIAL_VISIBLE_COLUMNS = ["name", "category", "status", "actions"];

export const TablaProductos = () => {
  const [loading, setLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
 //* Trear productos 
 React.useEffect(() => {
  setLoading(true);

  const loadData = async () => {

    try {
      const { status, dataResponse } = await getData(`${RUTA_API}/productos`);
      if (status >= 200 && status < 300) 
        getData(dataResponse.datos);
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

}, []);
	// * Camibar de estado un producto
	const handleChipClick = async (id) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Vas a cambiar el estado de una Producto',
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
						getData((prevData) => prevData.map((dato) =>
							dato.id_producto === id
								? { ...dato, estado_producto: dato.estado_producto === 1 ? 0 : 1 }
								: dato
						));
					} else if (status >= 400 && status < 500) {
						toast.warn(dataResponse.mensaje);
					}
				} catch (err) {
					toast.error('Hubo un error al cambiar el Producto');
					console.error(err);
				}
			}
		});
	};
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.Nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== EstadoOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.Estado)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{capitalize(cellValue)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{capitalize(user.team)}</p>
          </div>
        );
      case "category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{capitalize(cellValue)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{capitalize(user.team)}</p>
          </div>
        );
      case "status":
        return (
          <Button className="capitalize" color={statusColorMap[user.Estado]} size="sm" variant="flat" onClick={() => handleChipClick('1')}>
          {user.Estado}
          </Button>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <DetalleProducto/>
           <EditarProducto/>
            
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="sm:flex  sm:flex-col sm:gap-4 ml-10 mr-10">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
           className="w-[200px] sm:max-w-full sm:w-[400px]"
            placeholder="Buscar Producto..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
      <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
             
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {EstadoOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalCrearProductos />
      </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} Productos</span>
          <label className="flex items-center text-default-400 text-small">
          Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
      
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
          Previa
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
          Próximo
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      className=" sm:w-[1200px] w-[400px]"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
    
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
