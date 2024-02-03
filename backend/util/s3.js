const {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")

const s3Client = new S3Client({
	region: process.env.AWS_S3_BUCKET_REGION,
	credentials: {
		accessKeyId: process.env.AWS_CLIENT_KEY,
		secretAccessKey: process.env.AWS_CLIENT_SECRET
	}
})

const requestCommandMap = {
	GET: GetObjectCommand, PUT: PutObjectCommand, DELETE: DeleteObjectCommand
}

async function getObjectUrl({requestMethod, objectKey}) {
	try {
		const assocMethodCommand = requestCommandMap[requestMethod]

		const objCommand = new assocMethodCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: objectKey
		})

		const presignedUrl = await getSignedUrl(s3Client, objCommand, {
			expiresIn: 600		// 10min for PUT / DELETE
		})

		if (requestMethod === "GET") {
			// Strip authentication for GET requests
			const objectUrl = new URL(presignedUrl)
			const {origin: s3Origin, pathname: s3Pathname} = objectUrl
			const resolvedS3Url = `${s3Origin}${s3Pathname}`
			return resolvedS3Url
		}

		return presignedUrl
	} catch (err) {
		console.error(err)
		return null
	}
}

const VALID_REQUEST_METHODS = Object.keys(requestCommandMap)

module.exports = {getObjectUrl, VALID_REQUEST_METHODS}