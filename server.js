const express = require('express');
const connectDB = require('./config/db');
const cors = require('express');

const app = express();

// Connect MongoDB
connectDB();

// Bring in db schema
const patient = require('./models/Patient');
const provider = require('./models/Provider');
const patientEntry = require('./models/PatientEntry');
//const patientsymptom = require('./models/patientsymptom.model');

// app.use is a middleware function (middleware is carried out in sequence)
app.use(cors());
app.use(express.json());

// Routes (making app modular)
const mainRoutes = require('./routes');
const patientRoutes = require('./routes/patient/patient');
//const patientEntryRoutes = require('./routes/patient/patientsymptoms');
const patientEntryRoutes = require('./routes/patient/patientEntry');
const providerRoutes = require('./routes/provider/provider');

// middleware for all routes
app.use(mainRoutes);
app.use(patientRoutes);
app.use('/', patientEntryRoutes);
app.use(providerRoutes);

// Middleware (Testing middleware...)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error handler (work in progress) (takes 4 params) (return ...)
app.use((err, req, res, next) => {
    res.locals.error = err;
    // const status = err.status || 500;
    res.status(err.status);
    // Render an error template (pass in template file and the err object)
    res.render('error');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});