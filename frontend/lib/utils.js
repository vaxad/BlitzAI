import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export async function manageMedia(
	files, options
) {
	if (files === undefined || !Array.isArray(files) || options === undefined || options === {}) {
		return Array(files.length).fill(false)
	}

	if (!(options.requestMethods) || !(options.keygenFn)) {
		return Array(files.length).fill(false)
	}

	let fileMethods;
	if (Array.isArray(options.requestMethods)) {
		if (options.requestMethods.length === 0) {
			return Array(files.length).fill(false)
		}
		if (options.requestMethods.length !== files.length) {
			fileMethods = Array(files.length).fill(options.requestMethods[0])
		} else {
			fileMethods = options.requestMethods
		}
	} else {
		fileMethods = Array(files.length).fill(options.requestMethods[0])
	}

	const objectKeys = files.map((fileObj, fileIdx) => {
		return (
			options.keygenFn(fileObj, fileIdx)
		)
	})

	const mediaResponses = await Promise.all(
		objectKeys.map(async (objectKey, keyIndex) => {
			const fileObj = files[keyIndex]
			const fileMethod = fileMethods[keyIndex]

			const apiResp = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/meta/presigned-url`,
				{
					headers: {
						"Content-Type": "application/json",
						"auth-token": window.localStorage.getItem("auth-token")
					},
					body: {
						objectKey: objectKey,
						requestMethod: fileMethod
					}
				}
			)

			if (apiResp.ok) {
				const {presignedUrl} = await apiResp.json()

				const s3Resp = await fetch(
					presignedUrl,
					{
						headers: {
							"Content-Type": fileObj.type
						},
						body: fileObj
					},
				)

				if (s3Resp.ok) {
					return true
				}

				return false
			}

			return false
		})
	)

	return mediaResponses
}