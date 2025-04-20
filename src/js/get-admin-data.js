/*
-   myData ""
-   developer   : https://mayankdevil.github.io/MayankDevil
-   JavaScript  : ./src/js/get-admin-data.js
*/

/** 
 * getAdminData function : fetch admin data & return match data base on provided username
 * 
 * @param {string} username - access username
 * @returns {Promise<Object|null>} - return promise object else null.
 */
async function getAdminData(username) 
{
    try
    {
        const response = await fetch('https://mayankdevil.github.io/myData/public/api/admin.json')

        if (!response.ok) 
        {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const outputData = await response.json();

        return outputData.admin.find(admin => admin.username === username)
    } 
    catch (error) 
    {
        console.error(`[data fetch error]:\n ${error}`);
    }
    return null
}