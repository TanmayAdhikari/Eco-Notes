// CustomPagination.js
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ totalPages, currentPage, handleChangePage }) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"  // Change color here
        sx={{
          '& .MuiPaginationItem-icon': {
            color: 'green', // Make arrows green
          },
        }}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default CustomPagination;
    