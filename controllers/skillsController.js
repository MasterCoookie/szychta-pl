const Skill = require('../models/skillsModel');

const skill_post = async (req, res) => {
    const { name, description, keywords } = req.body;

    try {
        await Skill.create({ name, description, keywords });
        console.log("New skill %s created", name);
        res.sendStatus(201);
    } catch (e) {
        let errors = [];
        if (e.code === 11000) {
            console.log('Skill duplicate creation attempt');
            errors.push('Skill already exists');
        }
        if (e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
            console.log('Error creating skill');
            console.log(e);
        }
        res.status(400).json({ errors });
    }
}

const skillsCreator_get = (req, res) => {
    try {
        res.render('skills/skillsCreator', { title: 'Create skill' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    skill_post,
    skillsCreator_get
};
