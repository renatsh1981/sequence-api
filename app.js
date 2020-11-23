import {getIdBySeq} from "./seq.js"


export const app = function(req, res){
    
    
    if(req.method != "GET"){
        console.error("Неверный метод запроса");
        res.statusCode = 405;
        res.end();
        return;
    }
    const reqUrl = req.url.toUpperCase();
   // console.log(reqUrl);
    var seqName = "";
    switch(reqUrl){
        case "/":
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write("<!DOCTYPE html>");
            res.write("<html>");
            res.write("<head>");
            res.write("<title>Сервис запроса секвинсов</title>");
            res.write("<meta charset=\"utf-8\" />");
            res.write("</head>");
            res.write("<body><h2>Сервис запроса секвинсов</h2></body>");
            res.write("</html>");
            res.end();
            break;
        case "/EVENT":
                seqName = "eventlist";
            break; 
        case "/VIOLATION":
                seqName = "violation";
            break;      
        case "/PHOTO":
                seqName = "photolist";
            break;
        case "/VIDEO":
                seqName = "videolist";
            break;
        case "/FILE":
                seqName = "file";
            break;
    }

    if(seqName != ""){     
        res.statusCode = 200;     
        getIdBySeq(seqName).then(
            result =>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/plain");
                res.write(result);
                res.end();
                },
            error => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                var response = {"error": error.message}
                res.end(JSON.stringify(response));
                console.error(`${new Date().toISOString()} ${error}`);
              })

        
    }
    else{
        res.statusCode = 404;
        res.end();
    }

}

