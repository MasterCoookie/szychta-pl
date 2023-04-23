const sessionAuthentication = (req) => {
    req.session.authenticated = true;
};

const sendAplicantInfoToSession = (req, name, email, _id) => {
    req.session.applicant = { name: name, _id: _id, email: email };    
};

const destroySession = (req) => {
    req.session.destroy();
};

module.exports = {
  sessionAuthentication,
  sendAplicantInfoToSession,
  destroySession,
};
