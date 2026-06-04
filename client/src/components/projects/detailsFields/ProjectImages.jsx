import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ProjectImageForm from "./ProjectImageForm";
import { deleteProjectImage } from "../../../api/projects";

const image_types = [
	"inspiration", "design", "fabric", "measurements", "in_progress", "finished"
]

export default function ProjectImages({project, onImageUpdate}) {
	const [ showImageForm, setShowImageForm ] = useState(false);

	const images = project.project_images || [];

	//Delete image
	async function handleDelete(image_id) {
		if (!window.confirm("Delete this image?")) return;

		try {
			const response = await deleteProjectImage(project.id, image_id);
			if (!response.ok) throw new Error("Failed to delete image");
			onImageUpdate(project.project_images
				.filter(img => img.id !== image_id));
		} catch (error) {
			console.error("Failed to delete image:", error);
		}
	}

	//Edit image type and notes
	

	return (
		<div className="proj-images-section">
			<h2>Project Images</h2>

			<button 
				className="proj-card-btn" 
				onClick={() => setShowImageForm(!showImageForm)}>
				{showImageForm ? "Exit Image Form" : "+ Add New Image"}
			</button>

			{showImageForm && <ProjectImageForm 
				project={project} 
				onImageUpdate={onImageUpdate} 
			/>}

			{/* project images gallery */}
			{images.length > 0 ? (
				<div className="proj-images-gallery">
					{images.map(img => (
						<div key={img.id}> 
							<img src={img.secure_url} alt={img.image_type} style={{width:"30%"}} />
							<div className="proj-image-info">
								<h3>
									{img.image_type.replace(/_/g, " ")}
								</h3>
								{img.notes && (
									<p>{img.notes}</p>
								)}	
							</div>

							{/* delete image */}
							<button
								className="proj-card-btn-remove"
								onClick={() => handleDelete(img.id)}
								style={{ cursor: "pointer" }} 
							>
								<Trash2 color="#986f16" /> 
							</button>

							{/* edit image type/ notes */}
							<button
								className="proj-card-btn" 
								style={{ cursor: "pointer" }}
							>
								<Pencil color="#986f16" />
							</button>

						</div>
					))}
				</div>
			) : (
				<p>No Project Images</p>
			)}

		</div>
	)
};