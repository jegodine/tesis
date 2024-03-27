import express from "express";
import MongoConnect from "./config/mongoose.mjs";
import routerPatient from "./routes/Patient.mjs";
import routerPatientHistory from "./routes/PatientHistory.mjs";
import cors from "cors";

const app = express();
const port = process.env.PORT;
app.use(express.json({ limit: '500kb' }));
app.use(cors({
    origin: ['http://localhost:8081','http://localhost:3000','https://doctoriatest.com/'], // Replace with your client's origin
    methods: 'GET,POST,PUT,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(routerPatient);
app.use(routerPatientHistory);


app.get('/', (req, res) => {
    res.send('this is homepage')
})

app.listen(port, () => {
    MongoConnect();
    console.log(`server is running at port number ${port}`)
});