import * as React from 'react';
import { TextField } from '@mui/material';

interface HeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <div className='header'>
        <div className='header-search'>
            <TextField
                variant="outlined"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                fullWidth
                placeholder='Search...'
                size="small"
                sx={{
                '& .MuiInputBase-input::placeholder': {
                    fontSize: '12px',
                    borderRadius: '8px'
                },
                }}
            />
            <img 
                src="image/search.svg" 
                alt="search"
                className='search-avatar'
            />
        </div>
    </div>
    
  );
}