import cloudinary
import cloudinary.uploader
import os

cloudinary.config(
	cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
	api_key=os.getenv("CLOUDINARY_API_KEY"),
	api_secret=os.getenv("CLOUDINARY_API_SECRET"),
	secure=True  # Always use https URLs
)


def upload_image(file, folder="sewing_projects"):
	"""
	Upload a file to Cloudinary.
	Returns a dict with 'url' and 'public_id'.
	Call this from your routes when handling image POST requests.

	Usage in a route:
		file = request.files.get("image")
		result = upload_image(file)
		project_image.secure_url = result["secure_url"]
		project_image.cloudinary_public_id = result["cloudinary_public_id"]
	"""
	result = cloudinary.uploader.upload(
		file,
		folder=folder,
		resource_type="auto"  # Handles images and PDFs
	)
	return {
		"secure_url": result["secure_url"],
		"cloudinary_public_id": result["public_id"]
	}


def delete_image(public_id):
	"""
	Delete an image from Cloudinary by its public_id.
	Call this from your routes when a ProjectImage is deleted.

	Usage in a route:
		delete_image(project_image.cloudinary_public_id)
		db.session.delete(project_image)
		db.session.commit()
	"""
	cloudinary.uploader.destroy(public_id, resource_type="auto")