import React from 'react'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container'

function Footer() {
  return (
    <Container 
     maxWidth="100%"
     sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        backgroundColor:  '#1B2430',
        color: 'white'
     }}>
      <Typography >
        @2021 Job Portal Made By Sudip Shrestha
      </Typography>
    </Container>


  )
}

export default Footer