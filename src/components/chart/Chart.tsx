import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import './Chart.css';
export const Chart = ({title, data, grid}: any) => {
	return (
		<div className="chart">
			<h3 className='chartTitle'>{title}</h3>
			<ResponsiveContainer width={'100%'} aspect={4 / 1}>
				<LineChart data={data}>
					<XAxis dataKey={"name"} stroke='5550bd' />
					<Line type={"monotone"} dataKey={"Active User"} />
					<Tooltip />
					{ grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray={"5 5"} /> }
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}