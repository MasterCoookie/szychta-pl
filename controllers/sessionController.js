const authenticationAfterLoggingIn = (req) => {
    req.session.authenticated = true;
};

const saveApplicantInfoToSession = (req, name, surname, email, _id) => {
    req.session.applicant = { name: name, surname: surname, _id: _id, email: email, level: 0 };    
};

const saveEmployerInfoToSession = (req, name, surname, email, permLevel, _id) => {
    req.session.employer = {  name: name, surname: surname, _id: _id, email: email, level: permLevel };
};

const destroySession = (req) => {
    req.session.destroy();
};

module.exports = {
  authenticationAfterLoggingIn,
  saveApplicantInfoToSession,
  saveEmployerInfoToSession,
  destroySession,
};
