import { useState } from "react";
import ProjectImageForm from "./ProjectImageForm";
import ProjectImageEditForm from "./ProjectImageEditForm";
import "../../../styles/ProjectDetails.css"


export default function ProjectImageGallery({project, onImageUpdate}) {
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
				<div className="gallery">
					{images.map(img => (
						<div key={img.id} className="proj-image-card"> 
							<img 
								className="proj-image"
								src={img.secure_url} 
								alt={img.image_type} 
							/>
						
							<ProjectImageEditForm 
								img={img}
								images={images}
								project={project} 
								onImageUpdate={onImageUpdate}
							/>

						</div>
					))}	
				</div>
			) : (
				<p>No Project Images</p>
			)}

		</div>
	)
};