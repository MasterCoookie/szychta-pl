const authenticationAfterloggingIn = (req) => {
    req.session.authenticated = true;
};

const saveApplicantInfoToSession = (req, name, surname, email, _id) => {
    req.session.applicant = { name: name, surname: surname, _id: _id, email: email };    
};

const destroySession = (req) => {
    req.session.destroy();
};

module.exports = {
  authenticationAfterloggingIn,
  saveApplicantInfoToSession,
  destroySession,
};
