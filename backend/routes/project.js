const express = require('express');
const Project = require('../models/Project');
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const projectRouter = express.Router()

// Route 1 create project /api/projects
projectRouter.post(
	"/",
	fetchuser,
	[
		body("title", "Title cannot be empty").isString(),
		body("initPrompt", "Provide a starting prompt").isString()
	],
	async (req, res) => {
		const valRes = validationResult(req)
		if (!valRes.isEmpty()) {
			return res.status(400).json({
				errors: valRes.array()
			})
		}

		const userId = req.user.id

		const projectDoc = new Project({
			owner: userId,
			title: req.body.title,
			initPrompt: req.body.initPrompt
		})

		await projectDoc.save()

		res.status(200).json({
			project: projectDoc
		})
	}
)

projectRouter.get(
	"/:projectId",
	fetchuser,
	async (req, res) => {
		const {projectId} = req.params
		if (projectId === undefined) {
			return res.status(404).json({
				error: "Not Found"
			})
		}
		const projectDoc = await Project.findOne({
			_id: {
				"$eq": projectId
			},
			trashStatus: {
				"$eq": false
			}
		})
		if (projectDoc === null) {
			return res.status(404).json({
				error: "Not Found"
			})
		}
		return res.status(200).json({
			project: projectDoc
		})
	}
)

module.exports = projectRouter