import { Grid, Typography } from '@mui/material'
import React from 'react'

const CustomOption = ({option,type,onClick}) => {
  // console.log('type',type);
  // console.log('option',option);
  // console.log('onClick',onClick)
  return (
    <>
        {/* <div onClick={onClick} className="flex justify-center items-center rounded-xl p-2 px-3 lg:w-2/5 sm:w-full xs:w-full cursor-pointer hover:bg-black transition-all bg-slate-700">
        <h3 className={`${type===type.split('-')[0] ? "text-green-200":"text-red-400"} font-bold`}>{type}</h3>
        <h3 className="text-white text-sm">{option}</h3>
    </div> */}
  
        <Grid item lg={5} md={5} sm={12} xs={12} onClick={onClick} sx={{display:'flex', justifyContent:'center',alignItems:'center',borderRadius:'10px',p:'10px',cursor:'pointer', bgcolor:'rgb(51 65 85)'}}>
        <Typography sx={{fontSize: '16px',color: type === type.split('-')[0] ? '#b9f6ca' : 'red',fontWeight: '600' }}>{type}</Typography>
        
        <Typography sx={{fontSize:'15px',color:'white'}}>{option}</Typography>

        </Grid>
    
    </>
  )
}

export default CustomOption