export const getDateFunction=(date)=>{
  
    let dateObj={}
    dateObj["year"] = date.getFullYear();
    dateObj["month"] = String(date.getMonth() + 1).padStart(2, '0');
     dateObj["day"] = String(date.getDate()).padStart(2, '0');
    dateObj["hours"] = String(date.getHours()).padStart(2, '0');
    dateObj["minutes"] = String(date.getMinutes()).padStart(2, '0');
    dateObj["seconds"] = String(date.getSeconds()).padStart(2, '0');
    return dateObj;
    

}