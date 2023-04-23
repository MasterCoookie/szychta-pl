const sessionAuthentication = (req) => {
    req.session.authenticated = true;
};

const sendAplicantInfoToSession = (req, name, email, _id) => {
    req.session.aplicant = { name: name, id: _id, email: email };    
};

const destroySession = (req) => {
    req.session.destroy();
};

module.exports = {
  sessionAuthentication,
  sendAplicantInfoToSession,
  destroySession,
};
