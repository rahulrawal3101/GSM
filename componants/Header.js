import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <>
         <Grid container sx={{  justifyContent: 'center', alignItems: 'flex-start' }}>
        <Grid item xs={12} sx={{ mt: '25px',borderRadius:'4px' }}>
          <Grid container>
            <Grid item xs={12} sx={{ bgcolor: '#ffa000' }}>
              <Box sx={{ height: '55px', m: '2.5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: {lg:'30px', md:'20px', sm:'20px', xs:'18px' }, fontWeight: 'bold' }}>GSM Edition 7</Typography>
              </Box>

            </Grid>

            

           
           



          </Grid>

        </Grid>

      </Grid>
    </>
  )
}

export default Header