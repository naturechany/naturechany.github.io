import './Topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

export const Topbar = (): JSX.Element => {
    return (
        <div className='topbar'>
          <div className='topbarWrapper'>
              <div className='topLeft'>
                <span className='logo'>CityAdmin</span>
              </div>
              <div className='topRight'>
                <div className='topbarIconContainer'>
                  <NotificationsNoneIcon />
                  <span className='topIconBadge'>1</span>
                </div>
                <div className='topbarIconContainer'>
                  <LanguageIcon />
                </div>
                <div className='topbarIconContainer'>
                  <SettingsIcon />
                </div>
                <img
                  src={require('../../assets/profile_01.png')}
                  alt='profile_01'
                  className='topAvatar'
                />
              </div>
            </div>
        </div>
    )
    
}