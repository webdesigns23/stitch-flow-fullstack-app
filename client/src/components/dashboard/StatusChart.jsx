import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default function StatusChart({statusCounts={}, statuses={}}) {
	const pieStatuses = [
		"planning",
  		"ready_to_sew",
		"cutting",
  		"sewing",
  		"final_touches",
  		"complete",
	];
	
	const COLORS = [
		"rgb(199, 140, 150)",
		"rgb(47, 116, 78)",
		"rgb(45, 114, 160)",
		"rgb(110, 94, 141)", 
		"rgb(161, 155, 58)", 
		"rgb(63, 61, 61)"
	];

	const data = pieStatuses.map((status) => (
		{name: statuses[status] || status, value: Number(statusCounts[status] || 0)}
	));

	//if zero value hide label
	const visibleLabel = data.filter((item) => item.value > 0);

	return (
		<div style={{width: "100%", height: 400}}>
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					dataKey="value" 
					nameKey="name" 
					cx="50%"        
					cy="50%"        
					outerRadius={150} 
					labelLine={false}
					label={({name, value}) => 
						value > 0 ? `${name}: ${value}`: ""
						} 
          			>
					{data.map((entry, index) => (
						<Cell key={pieStatuses[index]} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
		</div>
	)
}