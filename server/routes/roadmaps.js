const express = require('express');
const router = express.Router();

const roadmaps = [
    { id: 1, name: "Software Engineering" },
    { id: 2, name: "Electrical Engineering" },
    { id: 3, name: "Civil Engineering" }
]

router.get('/', (req, res) => {
    res.send(roadmaps);
})

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const newRoadmap = {
        id: roadmaps.length + 1,
        name: req.body.name
    }
    roadmaps.push(newRoadmap)
    res.send(newRoadmap)
})

router.get('/:id', (req, res) => {
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")
    res.send(roadmap);
})

router.put('/:id', (req, res) => {

    // Check to see if the roadmap exists
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")

    // Validate the request body
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Update the Roadmap
    roadmap.name = req.body.name;
    res.send(roadmap);
})

router.delete('/:id', (req, res) => {

    // Check to see if the roadmap exists
    const roadmap = roadmaps.find(r => r.id === parseInt(req.params.id))
    if (!roadmap) return res.status(404).send("The selected roadmap has not been found!")

    // Validate the request body
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Delete the Roadmap
    const index = roadmaps.indexOf(roadmap);
    roadmaps.splice(index, 1);
    res.send(roadmap);
})

module.exports = router;