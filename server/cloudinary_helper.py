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
	cloudinary.uploader.destroy(public_id, resource_type="auto")