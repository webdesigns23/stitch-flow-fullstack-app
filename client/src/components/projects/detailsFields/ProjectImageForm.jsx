import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { uploadProjectImage } from "../../../api/projects";

const IMAGE_TYPES = [
	"inspiration", "design", "fabric", "measurements", "in_progress", "finished"
]
export default function ProjectImageForm({project, onImageUpdate}) {

	const [imageType, setImageType] = useState("");
	const [imageNotes, setImageNotes] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState(null);

	//Upload image
	async function handleUpload(e) {
		e.preventDefault();
		if (!imageFile) return;

		setUploading(true);
		setUploadError(null);

		try {
			const formData = new FormData();
			formData.append("image", imageFile);
			formData.append("image_type", imageType);
			if (imageNotes.trim()) formData.append("notes", imageNotes.trim());

			const response = await uploadProjectImage(project.id, formData);
			const newImage = await response.json();

			if (!response.ok) throw new Error(newImage.error || "Upload failed");

			// Pass updated images list back to parent
			onImageUpdate([...(project.project_images || []), newImage]);

			//Reset Form
			setImageFile(null);
			setImageNotes("");
			setImageType("");
			document.getElementById("image-file-upload").value = "";
		} catch (error) {
			setUploadError(error.message || "Failed to upload image");
		} finally {
			setUploading(false);
		}
	};
	return (
		<div className="proj-details-field">
			{/* upload image form */}
			<form className="proj-image-form" onSubmit={handleUpload}>
				<span className="proj-details-label">
				<ImagePlus
					size={20} 
					color="#9f831d" 
				/>{" "} Upload Images
				</span>

				{uploadError && <p>{uploadError}</p>}

				<div className="proj-card-field">
					<label className="proj-card-label">
						Image Type
					</label>
					<select
						value={imageType}
						onChange={(e) => setImageType(e.target.value)}>
						<option value="">Select Image Type...</option>
						{IMAGE_TYPES.map(t => (
							<option key={t} value={t}>
								{t.replace(/_/g, " ")}
							</option>
						))}
					</select>
				</div>

				<div className="proj-card-field">
					<label className="proj-card-label">
						Notes
					</label>
					<input
						type="text"
						value={imageNotes}
						onChange={(e) => setImageNotes(e.target.value)}
						maxLength={250}
						placeholder="Add a note about this image..."
					/>
				</div>

				<div className="proj-card-field">
					<label className="proj-card-label">
						Choose a File
					</label>
					<input
						id="image-file-upload"
						type="file"
						accept="image/*"
						onChange={(e) => setImageFile(e.target.files[0])}
					/>
				</div>

				<button className="proj-card-btn"
					type="submit"
					// disabled={!imageFile || uploading}
				>
					{uploading ? "Uploading Image..." : "Upload"}
				</button>
			</form>
		</div>
	)
}