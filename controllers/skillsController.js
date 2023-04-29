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

const search_post = async (req, res) => {
    const searchQuery = req.body.searchQuery;
    try {
        const regexExp = new RegExp(searchQuery, 'i');
        const skills = await Skill.find({
            $or: [
                { name: { $regex: regexExp } },
                { keywords: { $in: regexExp }},
                // { description: { $regex: regexExp } }
            ]
    }).limit(10);
        if(skills.length < 10) {
            const additionalSkills = await Skill.find({
                $or: [
                    { name: { $regex: regexExp } },
                    { keywords: { $in: regexExp }},
                    { description: { $regex: regexExp } }
                ]
            }).limit(10 - skills.length);

            const joinedSkills = skills.concat(additionalSkills);
            res.json(joinedSkills.filter((skill, index, self) => self.findIndex(s => s.name === skill.name) === index));
        } else {
            res.json(skills);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    skill_post,
    skillsCreator_get,
    search_post
};
