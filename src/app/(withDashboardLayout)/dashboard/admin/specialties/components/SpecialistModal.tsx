import PHFileUploader from '@/components/Forms/PHFileUploader';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import PHModal from '@/components/Shared/PHModal/PHModal';
import { useCreateSpecialtyMutation } from '@/redux/api/specialitiesApi';
import { modifyPayload } from '@/utils/modifyPayload';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistModal = ({ open, setOpen }: TProps) => {
    const [createSpecialty] = useCreateSpecialtyMutation()
    const handleFormSubmit = async (values: FieldValues) => {
        const data = modifyPayload(values)

        try {
            const res = await createSpecialty(data).unwrap();
            console.log(res)
            if (res?.id) {
                toast.success("Specialty Created Successfully.")
                setOpen(false)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }
    return (
        <PHModal
            open={open}
            setOpen={setOpen}
            title="Create A New Specialty"
        >
            <PHForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <PHInput name='title' label='Title'></PHInput>
                    </Grid>
                    <Grid item md={6}>
                        <PHFileUploader name="file" label="Upload File" />
                    </Grid>
                </Grid>
                <Button sx={{
                    mt: 1
                }} type='submit'>
                    Create
                </Button>
            </PHForm>
        </PHModal>
    );
};

export default SpecialistModal;