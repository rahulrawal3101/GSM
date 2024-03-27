// 'use server'
// import fs from 'fs';
// import path from 'path';

// export const verifyPlayer = async(props)=>{
//     const { playerId,password} = props
//     const filePath = path.join(__dirname, 'data.json');
//     try {
//         const data = await fs.promises.readFile(filePath, 'utf8')
//         const jsonData = JSON.parse(data);
//         const findplayer = jsonData.find(player => player['Player ID'] === playerId);
//         if(findplayer){
//             if(password === findplayer.Password){
//                 console.log("player verified");
//                 return JSON.parse(JSON.stringify({message:"verified",playerName:findplayer['Player Name'],playerId:findplayer['Player ID']}));
//             }else{
//                 return JSON.parse(JSON.stringify({message:"Password is wrong!!"}));
//             }
//         }else{
//             return JSON.parse(JSON.stringify({message:"User not found!!"}));
//         }
//     } catch (err) {
//         console.error('Error reading file:', err);
//     }
// }


'use server'
import fs from 'fs'
import playerData from './playerData';

export const verifyPlayer = async(props)=>{
    const { playerId,password} = props;
    const JsonData = playerData();
    // console.log('hello json',JsonData)
    try {
        const findplayer = JsonData.data.find(player => player['Player ID'] === playerId);
        if(findplayer){
            if(password === findplayer.Password){
                console.log("player verified");
                return JSON.parse(JSON.stringify({message:"verified",playerName:findplayer['Player Name'],playerId:findplayer['Player ID']}));
            }else{
                return JSON.parse(JSON.stringify({message:"Password is wrong!!"}));
            }
        }else{
            return JSON.parse(JSON.stringify({message:"User not found!!"}));
        }
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

export const savePlayerData = async (props) => {
    // Read existing data from the file
    let existingData = [];
    try {
        const data = fs.readFileSync('playerStats.json', 'utf8');
        existingData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
    }

    // Append new data to existing data
    existingData.push(props[0]);

    // Write the updated data back to the file
    try {
        fs.writeFileSync('playerStats.json', JSON.stringify(existingData, null, 2));
        console.log('Data updated successfully');
        return  JSON.parse(JSON.stringify({message:'Your Entries have been saved'})) ;
    } catch (error) {
        console.error('Error writing file:', error);
        return { error: "Failed to save timings" };
    }
};