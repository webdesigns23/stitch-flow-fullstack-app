import { useState } from "react";
import { Image } from "lucide-react";
// import ProjectImageForm from "./ProjectImageForm";
import ProjectImageEditForm from "./ProjectImageEditForm";
import "../../../styles/ProjectDetails.css"

const IMAGE_TYPES = [
	{ key: "all" , label: "All" },
	{ key:"inspiration" , label: "Inspiration" },
	{ key: "design", label: "Design" },
	{ key: "fabric", label: "Fabric" },
	{ key: "measurements", label: "Measurements" },
	{ key: "in_progress", label: "In Progress" },
	{ key:"finished" , label: "Finished" },
];

export default function ProjectImageGallery({project, onImageUpdate}) {
	const [ showImageForm, setShowImageForm ] = useState(false);
	const [ filterType, setFilterType ] = useState("all");
	const [ lightboxImg, setLightboxImg ] = useState(null);
	
	const images = project.project_images || [];

	//Filter images by type in image gallery
	const filteredImages = filterType === "all" ? images : images.filter(img => (
		img.image_type === filterType)
	);

	return (
		<div className="proj-images-section">
			<header className="proj-images-gallery-header">
				<span className="proj-details-label"><Image size={16} color="#9f831d"/>
					{" "} Project Images ({images.length})
				</span>
				{/* <button 
					className="proj-card-btn" 
					onClick={() => setShowImageForm(!showImageForm)}>
					{showImageForm ? "Exit Image Form" : "+ Add New Image"}
				</button>	 */}
			</header>
			

			{/* {showImageForm && <ProjectImageForm 
				project={project} 
				onImageUpdate={onImageUpdate} 
			/>} */}

			{/* create image filter pills */}
			<div className="image-filter-pills">
				{IMAGE_TYPES.map(({key, label}) => (
					<button
					key={key}
					className={`${filterType === key ? "image-filter-pill-active" : "image-filter-pill"}`}
					onClick={() => setFilterType(key)}>
						{label}
					</button>
				))}
			</div>

			{/* project images gallery */}
			{images.length > 0 ? (
				<div className="gallery">
					{filteredImages.map(img => (
						<div key={img.id} className="proj-image-card"> 

							<ProjectImageEditForm 
								img={img}
								images={images}
								project={project} 
								onImageUpdate={onImageUpdate}
							/>
							<img 
								className="proj-image"
								src={img.secure_url} 
								alt={img.image_type} 
								onClick={() => setLightboxImg(img)}
							/>

							{/* image notes */}
							{img.notes && <p className="proj-image-notes">{img.notes}</p>}
						</div>
					))}	
				</div>
			) : (
				<p>No Project Images</p>
			)}

			{/* lightbox images */}
			{lightboxImg && (
				<div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
					<button className="lightbox-close" onClick={() => setLightboxImg(null)}>X Close</button>
					<img 
						className="lightbox-img"
						src={lightboxImg.secure_url} 									alt={lightboxImg.image_type}
						onClick={(e) => e.stopPropagation()}
					/>

					{lightboxImg.notes && (
						<p className="lightbox-caption">{lightboxImg.notes}</p>
					)}
				</div>
			)}

		</div>
	)
};