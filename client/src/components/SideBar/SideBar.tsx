import { ListItemButton, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import type { SideBarProps } from './type';
import {
  StyledList,
  Container,
  UserAvatar,
  StyledMovingIcon,
  StyledGTranslateIcon,
  StyledPortraitIcon,
  StyledListItemText,
} from './style';

const SideBar: React.FC<SideBarProps> = ({ active = 'profile' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const userData = JSON.parse(sessionStorage.getItem('user') || '');

  const handleUsersNavigate = () => {
    navigate(AppRoutes.Profile.Path);
  };
  const handleOrderNavigate = () => {
    navigate(AppRoutes.Profile.Children.Order);
  };
  const handleReviewNavigate = () => {
    navigate(AppRoutes.Profile.Children.Review);
  };
  const handleAnswerNavigate = () => {
    navigate(AppRoutes.Profile.Children.Answer);
  };

  return (
    <StyledList>
      <Container>
        <ListItemButton
          onClick={handleUsersNavigate}
          selected={active === 'profile'}
          sx={{ width: '100%' }}
        >
          <ListItemIcon>
            {userData.avatar ? (
              <UserAvatar src={userData.avatar} />
            ) : (
              <UserAvatar>{userData.name?.[0] ?? ''}</UserAvatar>
            )}
          </ListItemIcon>
          <StyledListItemText primary={`${userData.name}`} />
        </ListItemButton>
        <ListItemButton
          selected={active === 'order'}
          onClick={handleOrderNavigate}
          sx={{ width: '100%' }}
        >
          <ListItemIcon>
            <StyledMovingIcon isActive={active === 'order'} />
          </ListItemIcon>
          <StyledListItemText primary={t('orders')} />
        </ListItemButton>
        <ListItemButton
          selected={active === 'review'}
          onClick={handleReviewNavigate}
          sx={{ width: '100%' }}
        >
          <ListItemIcon>
            <StyledGTranslateIcon isActive={active === 'review'} />
          </ListItemIcon>
          <StyledListItemText primary={t('reviews')} />
        </ListItemButton>
        <ListItemButton
          selected={active === 'answer'}
          onClick={handleAnswerNavigate}
          sx={{ width: '100%' }}
        >
          <ListItemIcon>
            <StyledPortraitIcon isActive={active === 'answer'} />
          </ListItemIcon>
          <StyledListItemText primary={t('answers')} />
        </ListItemButton>
      </Container>
    </StyledList>
  );
};

export default SideBar;
