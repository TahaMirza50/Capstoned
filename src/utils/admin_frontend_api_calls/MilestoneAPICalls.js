export async function getAllMilestonesAPICall(route, apiCallMethod, token){
    try{
        let res = await fetch(route, {
            method: apiCallMethod,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("getAllMilestonesAPICall Error: " + error);
    }
}

export async function createNewMilestoneAPICall(route, apiCallMethod, token, data){
    try{
        let res = await fetch(route, {
            method: apiCallMethod,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return res;
    }
    catch(error){
        console.log("createNewMilestoneAPICall: " + error);
    }
}