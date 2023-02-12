const updater = require("../utils/updater");

const  updatePlayer = async(STRAPIOBJ, _ID, _LMSID) =>{
    
    const PlayerUpdated  = await updater(`players/${_ID}`,"PUT",{data:STRAPIOBJ}, )
    console.log(`Player ${PlayerUpdated.id} was updated `)
}

module.exports = updatePlayer