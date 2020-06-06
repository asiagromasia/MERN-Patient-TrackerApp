const router = require('express').Router();
let PatientEntry = require('../../models/Patient');

router.route('/patientEntries').get((req, res) => {
    PatientEntry.find().select('patientEntry') 
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patientEntry/add/:id').put((req, res) => { //patient Id

    const formElement = {
        symptom1 :req.body.symptom1,
        symptom2 :req.body.symptom2,
        symptom3 :req.body.symptom3,
        symptom4:req.body.symptom4,
        temp : req.body.temp,
        comment : req.body.comment,
        doctorNote : req.body.doctorNote,
        immediateAttention : req.body.immediateAttention};
    PatientEntry.findById(req.params.id)
    .then(patientEntries => {
        patientEntries.patientEntry.push(formElement)

        patientEntries.save()
            .then(() => res.json('Patient Entry Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/patientEntry/:id').get((req, res) => {
    PatientEntry.findById(req.params.id).select('patientEntry') 
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});


//update route for the patient to add a note to their entry entered in last 24 hours

/*
router.route('/PatientEntry/update/:id').post((req, res) => {
    PatientEntry.findById(req.params.id)
        .then(patientsymptom => {
            patientsymptom.additionalNote = req.body.additionalNote;

            patientsymptom.save()
                .then(() => res.json('Patient Entry Node  updated!'))

router.route('/patientEntry/update/:id').put((req, res) => {
    PatientEntry.findById(req.params.id)
        .then(entry => {
            //entry.form[form.size() - 1[5]] = req.body.updatedAdditionalNote;
            entry.doctorNote = req.body.doctorNote;
            entry.save()
                .then(() => res.json('Patient Entry Note Updated!'))

                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
*/
module.exports = router;
