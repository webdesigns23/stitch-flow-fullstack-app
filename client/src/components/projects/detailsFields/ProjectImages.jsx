import { useState } from "react";
import ProjectImageForm from "./ProjectImageForm";
import { uploadProjectImage, deleteProjectImage } from "../../../api/projects";

const image_types = [
	"design", "measurements", "fabric", "inspiration", "in_progress", "finished"
]

export default function ProjectImages({project, onImageUpdate}) {
	const [ showImageForm, setShowImageForm ] = useState(false);

	const images = project.project_images || [];
	

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
						</div>
					))}
				</div>
			) : (
				<p>No Project Images</p>
			)}

		</div>
	)
};