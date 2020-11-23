import { connectDB, disconnectDB } from "./lib/db-ifx.js"; 


 export const getIdBySeq = async function(seqName){
    var connDB = null;
    try{
        connDB = await connectDB(); 
    }
    catch(e){
        throw new Error(`seq.js getId(${seqName}) Ошибка соединениения с БД.\n  Error:${e}`);
    }

    let sql = `select ${seqName}.nextval as id from table(set{1})`;
    try{
        var id = await connDB.query(sql);
        return id[0].id;
       
    }
    catch(e){
        throw new Error(`seq.js getId(${seqName}) SQL = ${sql}.\n  Error:${e}`);
    }
    finally{
        disconnectDB(connDB);
    }

}

