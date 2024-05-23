"use client"
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SpecialistModal from "./components/SpecialistModal";
import { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDeleteSpecialtyMutation, useGetAllSpecialtiesQuery } from "@/redux/api/specialitiesApi";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "sonner";


const SpecialtiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetAllSpecialtiesQuery({});

    const [deleteSpecialty] = useDeleteSpecialtyMutation({})

    const handleDelete = async (id: string) => {
        console.log(id)
        try {
            const res = await deleteSpecialty(id).unwrap()
            if (res?.id) {
                toast.success("Specialty deleted successfully")
            }
        }
        catch (err: any) {
            console.error(err?.message)
        }
    }

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 400 },
        {
            field: 'icon', headerName: 'Icon', flex: 1, renderCell: ({ row }) => {
                return <Box>
                    <Image src={row.icon} width={30} height={30} alt="icon" />
                </Box>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return <IconButton
                    onClick={() => handleDelete(row.id)}
                    aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
        },
    ];


    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button
                    onClick={() => setIsModalOpen(true)}
                >Create Specialty
                </Button>
                <SpecialistModal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                />
                <TextField size="small" placeholder="Search Specialist" />
            </Stack>
            {!isLoading ? <Box>
                <DataGrid
                    rows={data}
                    columns={columns}
                />
            </Box> : <h1>Loading...</h1>}
        </Box>
    );
};

export default SpecialtiesPage;