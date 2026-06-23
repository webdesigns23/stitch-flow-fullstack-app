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
		"rgb(199, 140, 150,.75)",
		"rgb(45, 114, 160, .75)",
		"rgb(47, 116, 78, .75)",
		"rgb(110, 94, 141, .75)", 
		"rgb(161, 155, 58, .75)", 
	];

	const data = pieStatuses.map((status) => (
		{name: status.replace(/_/g, " "), value: Number(statusCounts[status] || 0)}
	));

	//if zero value hide label
	const visibleLabel = data.filter((item) => item.value > 0);

	return (
		<div className="pie-chart">
		<ResponsiveContainer width="99%" height="100%" minWidth={0}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value" 
					nameKey="name" 
					cx="50%"        
					cy="50%"        
					outerRadius={120}
					label={false} 
          			>
					{data.map((entry, index) => (
						<Cell key={pieStatuses[index]} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend
					layout='vertical'
					align='left'
					wrapperStyle={{ margin: "28px" }}
					itemSorter={() => null}/>
			</PieChart>
		</ResponsiveContainer>
		</div>
	)
}