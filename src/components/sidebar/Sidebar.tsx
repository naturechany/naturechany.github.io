import './Sidebar.css';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MessageIcon from '@mui/icons-material/Message';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <ul className='sidebarListItem'>
              <HomeWorkIcon className='sidebarIcon'/>
              Home
            </ul>
            <ul className='sidebarListItem'>
              <TrendingUpIcon className='sidebarIcon'/>
              Analystics
            </ul>
            <ul className='sidebarListItem'>
              <MonetizationOnIcon className='sidebarIcon'/>
              Sales
            </ul>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick</h3>
          <ul className='sidebarList'>
            <ul className='sidebarListItem'>
              <PersonOutlineIcon className='sidebarIcon'/>
              Users
            </ul>
            <ul className='sidebarListItem'>
              <StorefrontIcon className='sidebarIcon'/>
              Products
            </ul>
            <ul className='sidebarListItem'>
              <LocalAtmIcon className='sidebarIcon'/>
              Transactions
            </ul>
            <ul className='sidebarListItem'>
              <BarChartIcon className='sidebarIcon'/>
              Reports
            </ul>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Notifications</h3>
          <ul className='sidebarList'>
            <ul className='sidebarListItem'>
              <MailOutlineIcon className='sidebarIcon'/>
              Mail
            </ul>
            <ul className='sidebarListItem'>
              <FeedbackIcon className='sidebarIcon'/>
              Feedback
            </ul>
            <ul className='sidebarListItem'>
              <MessageIcon className='sidebarIcon'/>
              Messages
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}