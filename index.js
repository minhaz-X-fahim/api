const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use("/api",require("./routes/app.routes"));

app.listen(4200,function(){
    console.log("Server started")
}
)