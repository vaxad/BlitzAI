const express = require("express")
const {body, validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const s3Helper = require("../util/s3")
const {getObjectUrl} = require("../util/s3");

const metaRouter = express.Router()

metaRouter.post(
	"/presigned-url",
	fetchuser,
	[
		body("objectKey", "objectKey cannot be empty").isString(),
		body("requestMethod", "requireMethod is invalid").isIn(s3Helper.VALID_REQUEST_METHODS)
	],
	async (req, res) => {
		const valRes = validationResult(req)
		if (!valRes.isEmpty()) {
			return res.status(400).json({
				errors: valRes.array()
			})
		}

		const presignedUrl = await s3Helper.getObjectUrl({
			objectKey: req.body.objectKey,
			requestMethod: req.body.requestMethod
		})

		if (presignedUrl === null) {
			return res.status(500).json({
				error: "Failed to upload media"
			})
		}

		return res.status(200).json({
			presignedUrl
		})
	}
)

module.exports = metaRouter