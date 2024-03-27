import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import React from 'react'

const DayContainer = ({ day, timingData, onChange, value }) => {

    return (
        <>
            {/* <div className={`flex w-full justify-center items-center border flex-wrap xs:border-r-0 ${day === "sunday" && 'border-r-4'}`}>
        {Object.keys(timingData).map(time => (
          <label key={time} onChange={() => onChange(day, time)} className="w-1/2 border flex justify-between items-center lg:px-4 xs:px-2">
            <input type="checkbox" checked={value[day][time]} readOnly name={`${day}-${time}`} />
            <p>{time}</p>
          </label>
        ))}
      </div> */}
            {/* <Grid container sx={{border:'2px solid red' ,justifyContent:'space-between',alignItems:'center'}}>
      <Grid item xs={5}  >
                {Object.keys(timingData).map(time => (
                    <FormControlLabel
                        key={time}
                        sx={{
                            width: '100%',
                            border: '1px solid green',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                           
                        }}
                        control={<Checkbox checked={value[day][time]} readOnly />}
                        label={<Typography>{time}</Typography>}
                        onChange={() => onChange(day, time)}
                    />
                ))}
            </Grid>
      </Grid> */}
            <Grid container>
                {Object.keys(timingData).map((time,index) => {
                    return (
                        <Grid item key={index} xs={6} sx={{ overflow: 'hidden',  }}>
                            <FormGroup sx={{ border: '1px solid lightgrey',p:'5px' }}>
                                <FormControlLabel sx={{ display: 'flex', justifyContent: 'space-between',  }} control={<Checkbox checked={value[day][time]} />} label={<Typography>{time}</Typography>} onChange={() => onChange(day, time)} />

                            </FormGroup>

                        </Grid>

                    )
                })}

            </Grid>

        </>
    )
}

export default DayContainer