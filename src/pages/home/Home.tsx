import { Chart } from '../../components/chart/Chart';
import { Featuredinfo } from '../../components/featuredInfo/Featuredinfo';
import './Home.css';

export const Home = () => {
	const userData = [
		{name: 'Jan', 'Active User': 110},
		{name: 'Feb', 'Active User': 210},
		{name: 'Mar', 'Active User': 310},
		{name: 'Apr', 'Active User': 410},
		{name: 'May', 'Active User': 510},
		{name: 'Jun', 'Active User': 610},
		{name: 'Jul', 'Active User': 710},
		{name: 'Aug', 'Active User': 810},
		{name: 'Sep', 'Active User': 910},
		{name: 'Oct', 'Active User': 1010},
		{name: 'Nov', 'Active User': 2010},
		{name: 'Dec', 'Active User': 3010},
	];
  return(
    <div className="home">
      <Featuredinfo />
			<Chart
				data={userData}
				title={'User Analytics'}
				grid
				dataKey="Active User"
			/>
    </div>
  )
}