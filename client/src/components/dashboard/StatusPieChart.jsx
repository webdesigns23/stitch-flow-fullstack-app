import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default function StatusPieChart({statusCounts={}, statuses={}}) {
	const pieStatuses = [
		"planning",
		"cutting",
  		"ready_to_sew",
  		"sewing",
  		"final_touches",
	];
	
	const COLORS = [
		"rgb(199, 140, 150)",
		"rgb(45, 114, 160)",
		"rgb(47, 116, 78)",
		"rgb(110, 94, 141)", 
		"rgb(161, 155, 58)", 
	];

	const data = pieStatuses.map((status) => (
		{name: status.replace(/_/g, " "), value: Number(statusCounts[status] || 0)}
	));

	//if zero value hide label
	const visibleLabel = data.filter((item) => item.value > 0);

	return (
		<div className="pie-chart">
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					dataKey="value" 
					nameKey="name" 
					cx="50%"        
					cy="100%"        
					outerRadius={170}
					innerRadius={50}
					startAngle={180}
					endAngle={0}
					label={false} 
          			>
					{data.map((entry, index) => (
						<Cell key={pieStatuses[index]} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend
					layout="vertical"
					align="left"
					verticalAlign="bottom"  
					itemSorter={() => null}/>
			</PieChart>
		</ResponsiveContainer>
		</div>
	)
}