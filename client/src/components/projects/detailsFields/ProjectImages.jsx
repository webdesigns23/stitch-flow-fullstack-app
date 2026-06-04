import { useState } from "react";
import { uploadProjectImage, deleteProjectImage } from "../../../api/projects";
import { TypeOutline } from "lucide-react";

const image_types = [
	"design", "measurements", "fabric", "inspiration", "in_progress", "finished"
]

export default function ProjectImages({ project, onImageUpdate}) {
	const [ imageType, setImageType ] = useState("");
	const [ imageNotes, setImageNotes ] = useState("");
	const [ imageFile, setImageFile ] = useState(null);
	const [ uploading, setUploading ] = useState(false);
	const [ uploadError, setUploadError ] = useState(null);

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

			onImageUpdate(newImage);

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
		<div className="proj-images-section">
			<h2>Project Images</h2>

			{/* upload image form */}
			<form className="p_form" onSubmit={handleUpload}>
				<h3>Upload Image</h3>
				
				{ uploadError && <p>{uploadError}</p>}

				<div className="proj-card-field">
					<label className="proj-card-label">
						Image Type
					</label>
					<select
						value={imageType}
						onChange={(e) => setImageType(e.target.value)}>
							{image_types.map(t => (
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
						accept="image/*, .pdf"
						onChange={(e) => setImageFile(e.target.file[0])}
					/>
				</div>

				<button className="proj-card-btn"
					type="submit"
					disabled={!imageFile || uploading}
				>
					{uploading ? "Uploading Image..." : "Upload"}
				</button>
			</form>
		</div>
	)
};