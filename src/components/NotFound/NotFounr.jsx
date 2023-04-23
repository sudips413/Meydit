import { Typography,Grid } from '@mui/material'
import React from 'react'

function NotFounr() {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={4}
        sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
            <Typography>
                Sorry, The page you are looking for is under construction
            </Typography>
        </Grid>
    </Grid>    
  )
}

export default NotFounr