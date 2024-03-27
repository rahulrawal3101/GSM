'use client'
import React, { useEffect, useState } from 'react'
import { Box,  Button,  Grid, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Header from '@/componants/Header';
import CustomOption from '@/componants/CustomOption';
import DayContainer from '@/componants/DayContainer';
import { useRouter } from 'next/navigation';
import { savePlayerData } from '@/lib/actions/verifyplayer.action';

const team = ['Animal', 'Calm-Chorz', 'Kill Squad', 'Motley Crew', 'Squashers', 'Sultans', 'Warriorz']

const page = () => {
  const router = useRouter();
  // const getplayer = localStorage.getItem('player');
  // const playerData = JSON.parse(getplayer);
  // console.log(playerData)
  const [count, setCount] = useState('');

  useEffect(() => {
    const getData = localStorage.getItem('player');
    if (getData) {
      setCount(JSON.parse(getData));
    }
  }, []);
 
  const initialData = {
    teams: ["Animals", "Calm-Chorz", "Kill Squad", "Motley Crew", "Squashers", "Sultans", "Warriorz", "Bust your Balls"],
    players: {
      "Animals": ["Harjinder Singh", "Sikander Kamal", "Amit Mina", "Ashim Shrivastava", "Dhiraj Khanna", "Divay Pratap", "Ashish Kumar", "Piyush Sachdeva", "Neville Seth", "Raghav Gupta", "Sanjay Gupta",],
      "Calm-Chorz": ["Chetan Malhotra", "Gaurav Verma", "Rohit Sehgal", "Sumit Kumar Johri", "Rahul Shah", "Shikhar Sharma", "Robin Groser", "Pavandeep Choudhary", "Abhishek Goyal", "Vikas Phogaat", "Nikhil Rajpal"],
      "Kill Squad": ["Viraj Sinh", "Gaurav Goel", "Harpreet Chawla", "Prashant Jetley", "Akhil Puri", "Rohit Dalal", "Rachit Bahri", "Amit Malik", "Ajay Kohli", "Nandy Narang", "Sandeep Neha"],
      "Motley Crew": ["Rahul Batra", "Abhishek Kalia", "Nitin Aggarwal", "Ravi Sharma", "Amol Kalra", "Asit Dhingra", "Bawa Chandhok", "Sukrita", "Kushal Gupta", "Sahil Jain", "Hardesh"],
      "Squashers": ["Ajnav Dhawan", "Mrigank Tripathi", "Rahul Bharti", "Salil Malhotra", "Roopam Jain", "SukhSagar Singh", "Dhruv Sahai", "Vipin", "Saurav Khemani", "Samir Dewan", "Ranjan Pal"],
      "Sultans": ["Pranav Bassi", "Anirudh Sood", "Karan Bedi", "Arjun Mehta", "Pranay Kapoor", "Amit Jain", "Gaurav Marwah", "Ashish Gupta", "Manish Handa", "Sumit Nanda", "Vir Mehta"],
      "Warriorz": ["Yashwinder Chikkara", "Akul Juneja", "Manmeet Walia", "Saurabh Mehta", "Tanmay Khandelawal", "Harshit Jain", "Atishay Kumar", "Rajan Puri", "Sumit Kumar Domyan", "Adeep Arora", "Gautam Singh"],
      "Bust your Balls": ["Chirag Galundia", "Siddhant Madan", "Sandeep Nair", "Amit Bhatia", "Shantanu Ghosh", "Deepak Thakran", "Rahul Keswani", "Sachin Jain", "Sunil Pahuja", "Ajay Kumar", "Matthew Koshy"]
    },
    timings: {
      "saturday": {
        "9:00 AM": false,
        "9:30 AM": false,
        "10:00 AM": false,
        "10:30 AM": false,
        "11:00 AM": false,
        "11:30 AM": false,
        "12:00 Noon": false,
        "12:30 PM": false,
        "1:00 PM": false,
        "1:30 PM": false,
        "2:00 PM": false,
        "2:30 PM": false,
        "3:00 PM": false,
        "3:30 PM": false,
        "4:00 PM": false,
        "4:30 PM": false,
        "5:00 PM": false,
        "5:30 PM": false
      },
      "sunday": {
        "9:00 AM": false,
        "9:30 AM": false,
        "10:00 AM": false,
        "10:30 AM": false,
        "11:00 AM": false,
        "11:30 AM": false,
        "12:00 Noon": false,
        "12:30 PM": false,
        "1:00 PM": false,
        "1:30 PM": false,
        "2:00 PM": false,
        "2:30 PM": false,
        "3:00 PM": false,
        "3:30 PM": false,
        "4:00 PM": false,
        "4:30 PM": false,
        "5:00 PM": false,
        "5:30 PM": false
      }
    }
  }
  const [timings, setTimings] = useState(initialData.timings);
  const [team, setTeam] = useState("")
  const [player, setPlayer] = useState("");
  const [playerName, setPlayerName] = useState(count.playerName || "Welcome" );
  const [savedSelections, setSavedSelections] = useState([]);
  const [satDate, setSatDat] = useState('30th');
  const [sunDate, setSunDate] =useState('31st')

  const handleTimingChangeThroughOption = (day, type) => {
    const updatedTimings = Object.keys(initialData.timings).reduce((acc, day) => {
      acc[day] = Object.fromEntries(
        Object.entries(initialData.timings[day]).map(([time, _]) => [time, type === "available" ? true : false])
      );
      return acc;
    }, {});
    setTimings(prevTimings => ({
      ...prevTimings,
      [day]: updatedTimings[day]
    }));
  };

    const handleTimingChange = (day, time) => {
    setTimings(prevTimings => ({
      ...prevTimings,
      [day]: {
        ...prevTimings[day],
        [time]: !prevTimings[day][time]
      }
    }));
  };

  const handleSave = () => {
      const flattenedTimings = {'30th Saturday':satDate,'31st Sunday':sunDate,'Player Id':count.playerId,'Player Name':count.playerName};
      // console.log(flattenedTimings)
      Object.keys(timings).forEach(day => {
        Object.entries(timings[day]).forEach(([time, available]) => {
          if (available) {
            flattenedTimings[`${day} ${time}`] = '✓';
          } else {
            flattenedTimings[`${day} ${time}`] = 'X';
          }
        });
      });
      setSavedSelections(prevSelections => [...prevSelections, flattenedTimings]);
      setTimings(initialData.timings);
  };
  useEffect(()=>{
    if(savedSelections.length > 0){
      handleDownload()
    }
    },[savedSelections])
    
    const handleDownload = async() => {
      const res = await savePlayerData(savedSelections);
      console.log(res)
      if(res){
        alert(res.message);
        router.push('/');
        localStorage.removeItem('player');
        setCount("")
        router.push('/login')
      }
    };

// console.log(savedSelections)
  return (
    <>
      <Grid container sx={{  justifyContent: 'center', alignItems: 'flex-start' }}>
        <Grid item xs={11} sx={{ mt: '25px', }}>
          <Grid container>
           
            <Header />
            <Grid item xs={12} sx={{ bgcolor: '#e0e0e0', p: '10px 5px', borderBottom: '2px solid #bdbdbd', mt: '20px' }}>
                <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>Welcome {count.playerName}</Typography>
            </Grid>



            <Grid item xs={12} sx={{ bgcolor: '#e0e0e0', p: '10px 5px', borderBottom: '2px solid #bdbdbd', mt: '20px' }}>
              
              <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>GSM Schedule for weekend evening March {satDate} and {sunDate}</Typography>

            </Grid>


           
            <Grid container>
              <Grid item xs={12} sx={{ display: 'flex', height: 'auto', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', mt: '15px', gap: 3 }}>
                <CustomOption onClick={() => handleTimingChangeThroughOption('saturday', 'available')} type="Available:&nbsp;" option={"All time slots on Saturday "} />
                <CustomOption onClick={() => handleTimingChangeThroughOption('sunday', 'available')} type="Available:&nbsp;" option={"All time slots on Sunday "} />
                <CustomOption onClick={() => handleTimingChangeThroughOption('saturday', 'unavailable')} type="Unavailable:-&nbsp;" option={"All time slots on Saturday "} />
                <CustomOption onClick={() => handleTimingChangeThroughOption('sunday', 'unavailable')} type="Unavailable:-&nbsp;" option={"All time slots on Sunday "} />
              </Grid>
            </Grid>

           


            <Grid container sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px' }}>
              <Grid item lg={5.9} md={5.9} sm={12} xs={12} sx={{ mt:'10px'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                  <ArrowCircleRightOutlinedIcon />
                  <Typography sx={{ fontSize: '15px', ml: '4px',color:'#ffa000', fontWeight:'bold' }}>SATURDAY</Typography>
                </Box>
                <Box >
                
                <DayContainer value={timings} onChange={handleTimingChange} day="saturday" timingData={initialData.timings["saturday"]} />


                </Box>

              </Grid>
              <Grid item lg={5.9} md={5.9} sm={12} xs={12} sx={{mt:'10px'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ArrowCircleRightOutlinedIcon />
                  <Typography sx={{ fontSize: '15px', ml: '4px',color:'#ffa000', fontWeight:'bold' }}>SUNDAY</Typography>
                </Box>

                <Box >
                <DayContainer value={timings} onChange={handleTimingChange} day="sunday" timingData={initialData.timings["sunday"]} />

                </Box>

              </Grid>



            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', mt:'20px', mb:'20px'}}>
            <Button variant='contained' color='success' sx={{p:'5px 20px', }} onClick={handleSave}>Save</Button>
            <Button variant='contained' color='error' sx={{p:'5px 20px', ml:'20px'}} onClick={()=>{localStorage.clear('player');router.push('/login')}}>logout</Button>

            </Grid>



          </Grid>

        </Grid>

      </Grid>
    </>
  )
}

export default page
