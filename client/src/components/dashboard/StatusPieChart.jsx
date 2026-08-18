import {PieChart, Pie, Cell, Label, ResponsiveContainer} from 'recharts';
import { Link } from 'react-router-dom'
import { CircleArrowRight, Folder } from 'lucide-react';

export default function StatusPieChart({statusCounts={}}) {
	const pieStatuses = [
		"planning",
		"cutting",
  		"ready_to_sew",
  		"sewing",
  		"final_touches",
	];
	
	const COLORS = [
		"rgb(199, 140, 150,.75)",
		"rgb(45, 114, 160, .75)",
		"rgb(47, 116, 78, .75)",
		"rgb(110, 94, 141, .75)", 
		"rgb(161, 155, 58, .75)", 
	];

	//For pie chart legend
	const data = pieStatuses.map((status, index) => ({
		name: status.replace(/_/g, " "), 
		value: Number(statusCounts[status] || 0),
		color: COLORS[index],
	}));

	//Total num of active projects
	const activeProjects = data.reduce(
		(total, item) => total + item.value, 0);

	return (
		<div className="pie-chart">
			<h2 className='dashboard-title'>
				Active Projects by Status
			</h2>
			<div className='pie-chart-container'>

				{/*Left Column chart legend */}
				<section className='pie-chart-legend'>
					{data.map((item) => (
						<div key={item.name} className='pie-legend-row'>
							<div className='pie-legend-label'>
								<span 
									className='pie-legend-color' 
									style={{ backgroundColor: item.color }}
								/>
								<span>{item.name}</span>
							</div>

							<span className='pie-legend-count'>
								{item.value}
							</span>
						</div>
					))}
				
				</section>

				{/*Right Column visual chart */}
				<section className='pie-chart-visual'>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								dataKey="value" 
								nameKey="name" 
								cx="50%"        
								cy="50%"        
								outerRadius={88}
								innerRadius={60}
								paddingAngle={2}
								label={false} 
								>
								{data.map((item) => (
									<Cell 
										key={item.name} 
										fill={item.color}
									/>
								))}
								<Label
									value={`${activeProjects}`}
									position="center"
									dy={-20}
									className='pie-total'
								/>
								<Label
									value="Active"
									position="center"
									dy={10}
								/>
								<Label
									value="Projects"
									position="center"
									dy={30}
								/>
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</section>	
			</div>
			<footer className='dash-card-footer'>
				<Link className="go-link" to="/projects">
					View All Projects
					<CircleArrowRight color="#986f16"/>
				</Link>
			</footer>
		</div>
	)
}