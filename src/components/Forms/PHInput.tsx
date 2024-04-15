import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
    name: string;
    label?: string;
    type?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    placeholder?: string;
    required?: boolean;
}

const PHInput = ({
    name,
    label,
    type = "text",
    size = "small",
    fullWidth,
    sx,
    placeholder,
    required,
}
    : TInputProps
) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    required={false}
                    placeholder={label}
                    variant="outlined"
                    size={size}
                    sx={{ ...sx }}
                    fullWidth={fullWidth}
                    error={!!error?.message}
                    helperText={error?.message}
                />
            )
            }
        />

    );
};

export default PHInput;