import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const CtrTextField = ({ control, name, defaultVal, ...props }) => {
    return (
        <Controller 
            control={control}
            name={name}
            defaultValue={defaultVal}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...props}
                />
            )}
        />
    );
};

export default CtrTextField;