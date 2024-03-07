import React, { useEffect, useState } from "react";
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
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, users, typeOptions } from "./data";
import { capitalize } from "./utils";
import { deleteData, getAllKeys, getData } from "@/utilsFunctions/apiCallUnit";
import ShowSpace from "./ShowSpace";
import DatasettingModal from "@/Components/DatasettingModal";

// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

const INITIAL_VISIBLE_COLUMNS = [ "id", "key", "type"];

// type User = (typeof users)[0];

interface Key {
  key: string;
  type: string;
}

export default function App({setRedisView , setData}:any) {
  const [keys, setKeys] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [typeFilter, setTypeFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const handleBulkDelete = async () => {
    try {
      const res = await Promise.all(
        Array.from(selectedKeys).map((key) => deleteData(key))
      );
      console.log(res);
      if (res) {
        setSelectedKeys(new Set([]));
        setFilterValue("");
        fetchData();
        alert("warn");
      } else {
        alert("error");
      }
    } catch (error) {
      if (error) {
        alert("error");
      }
    }
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  //Our API Call logic to append Data
  function fetchData() {
    getAllKeys().then((data: any) => {
      const Response = data.map((item: Key, index: number) => ({
        ...item,
        id: index + 1,
      }));
      setKeys(Response);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  // actions on the left side table on row
  const handleCellAction = (key: any) => {
    const obj: any = keys.find((item: Key) => item.key === key);
    handleGetData(obj);
  };

  const filteredItems = React.useMemo(() => {
    let filteredKeys = [...keys];
    if (hasSearchFilter) {
      filteredKeys = filteredKeys.filter((item: Key) =>
        item.key.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      typeFilter !== "all" &&
      Array.from(typeFilter).length !== typeOptions.length
    ) {
      filteredKeys = filteredKeys.filter((item: Key) =>
        Array.from(typeFilter).includes(item.type)
      );
    }

    return filteredKeys;
  }, [keys, filterValue, typeFilter]);


  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a: User, b: User) => {
  //     const first = a[sortDescriptor.column as keyof User] as number;
  //     const second = b[sortDescriptor.column as keyof User] as number;
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item: Key, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item];
    switch (columnKey) {
      case "key":
        return (
          <User
            // avatarProps={{radius: "lg", src: item.key}}
            description={item.key}
            name={cellValue}
          >
            {item.key}
          </User>
        );
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
      //     </div>
      //   );
      // case "status":
      //   return (
      //     <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
      //       {cellValue}
      //     </Chip>
      //   );
      // case "actions":
      //   return (
      //     <div className="relative flex justify-end items-center gap-2">
      //       <Dropdown>
      //         <DropdownTrigger>
      //           <Button isIconOnly size="sm" variant="light">
      //             <VerticalDotsIcon className="text-default-300" />
      //           </Button>
      //         </DropdownTrigger>
      //         <DropdownMenu>
      //           <DropdownItem>View</DropdownItem>
      //           <DropdownItem>Edit</DropdownItem>
      //           <DropdownItem>Delete</DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown>
      //     </div>
      //   );
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

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
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

  const handleSort = (column: any) => {
    if (column.direction == "ascending") {
      column.direction = "descending";
    } else {
      column.direction = "ascending";
    }
  };

  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3 items-center">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Types
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={typeFilter}
              selectionMode="multiple"
              onSelectionChange={setTypeFilter}
            >
              {typeOptions.map((type) => (
                <DropdownItem key={type.uid} className="capitalize">
                  {capitalize(type.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
              onClick={onOpen}
              color="primary"
              className="flex gap-1"
            >
              <PlusIcon />
              <span className="font-bold">Add New</span>
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Post Data
                    </ModalHeader>
                    <ModalBody>
                      <DatasettingModal onClose={onClose} fetchData={fetchData}/>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-default-400 text-small">
            Total {keys.length} Redis Keys
          </span>
          {selectedKeys?.size ? <Button color="danger" size="sm" onClick={handleBulkDelete}>
            <MdDelete size={20} />
            Delete
          </Button> : null}
        </div>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
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

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
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
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  // to data data to show the data on rightside table
  const handleGetData = async (data: any) => {
    const { key, type } = data;
    const res = await getData(key, type);
    if (res) {
      setRedisView({ key, type });
      setData(res);
    } else {
      alert("error");
      // showToast("error", "Get failed", "Data has not been fetched.");
    }
  };

  return (
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onRowAction={handleCellAction}
        // sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={handleSort}
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
        <TableBody emptyContent={!keys.length ?<Spinner size="lg" /> : filteredItems.length ? "" : "no result availabale"} items={items}>
          {(item: Key) => (
            <TableRow key={item.key}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      
  );
}
