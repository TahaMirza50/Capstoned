export async function getDashboardDataAPICall(route, token){
    try{
        let res = await fetch(route, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("getDashboardDataAPICall Error: " + error);
    }
}