import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ProjectImageForm from "./ProjectImageForm";
import { deleteProjectImage, updateProjectImage } from "../../../api/projects";
import "../../../styles/ProjectDetails.css"

const image_types = [
	"inspiration", "design", "fabric", "measurements", "in_progress", "finished"
]

export default function ProjectImages({project, onImageUpdate}) {
	const [ showImageForm, setShowImageForm ] = useState(false);
	
	const [ editingImageId, setEditingImageId ] = useState(null);
	const [ editImageType, setEditImageType ] = useState("");
	const [ editImageNotes, setEditImageNotes] = useState("");
	
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
	};

	//Start editing image info
	function handleStartEdit(img) {
		setEditingImageId(img.id);
		setEditImageType(img.image_type);
		setEditImageNotes(img.notes || "");
	}

	//Cancel editing image info
	function handleCancelEdit() {
		setEditingImageId(null);
		setEditImageType("");
		setEditImageNotes("");
	}
	//Edit image type and notes
	async function handleEditSave(image_id) {
		try {
			const updates = {
				image_type: editImageType, 
				notes: editImageNotes.trim() || null,
			}
			const response = await updateProjectImage(project.id, image_id, updates);
			const updatedImageInfo = await response.json();
			if (!response.ok) throw new Error(updatedImageInfo.error || "Failed to update image info");

			onImageUpdate(images.map(img => img.id === image_id ? updatedImageInfo : img));
			handleCancelEdit();
			
		} catch (error) {
			console.error("Failed to update image info", error)
		}	
	};

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
						<div key={img.id} className="proj-image-card"> 
							<img 
								className="proj-image"
								src={img.secure_url} 
								alt={img.image_type} 
							/>
						
							{/* Editing View */}
							{editingImageId === img.id ? (
								<div>
									<select
									value={editImageType}
									onChange={(e) => setEditImageType(e.target.value)}>
										{image_types.map(t => (
											<option key={t} value={t}>
												{t.replace(/_/g, " ")}
											</option>
										))}
									</select>
									<textarea
										type="text"
										value={editImageNotes}
										onChange={(e) => setEditImageNotes(e.target.value)}
										placeholder="Add a note..."
										maxLength={250}>
									</textarea>

									<button
										className="proj-card-btn"
										onClick={() => handleEditSave(img.id)}
										title="Save">
										Save
									</button>

									<button
										className="proj-card-btn-remove"
										onClick={handleCancelEdit}
										title="Cancel">
										Cancel
									</button>
								</div>
							) : (
								<div className="proj-image-info">
								
									<h3>{img.image_type.replace(/_/g, " ")}</h3>
									
									{img.notes && (
										<p>{img.notes}</p>
									)}	


									{/* delete image */}
									<button
										className="proj-card-btn-remove"
										onClick={() => handleDelete(img.id)}
										style={{ cursor: "pointer" }} 
										title="Delete Image"
									>
										<Trash2 color="#986f16" /> 
									</button>

									{/* edit image type/ notes */}
									<button
										className="proj-card-btn" 
										onClick={() => handleStartEdit(img)}
										style={{ cursor: "pointer" }}
										title="Edit Image Info"
									>
										<Pencil color="#986f16" />
									</button>
								</div>
								)
							}							
						</div>
					))}	
				</div>
			) : (
				<p>No Project Images</p>
			)}

		</div>
	)
};