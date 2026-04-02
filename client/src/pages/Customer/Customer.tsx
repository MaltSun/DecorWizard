import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import UserInfo from '../../components/UserInfo/UserInfo';
import { MainPart, Container } from './style';
import { ProfileData } from './type';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfileAvatar = lazy(() => import('../../modules/ProfileAvatar/ProfileAvatar'));

const UserUpdateProfile = lazy(() => import('../../modules/UserUpdateProfile/UserUpdateProfile'));

export const Customer = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const token = sessionStorage.getItem('token');

        if (!token) {
          toast.error('Необходима авторизация. Пожалуйста, войдите в аккаунт.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch('api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data);

        sessionStorage.setItem('user', JSON.stringify(data));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = () => {
    fetchProfile();
  };

  const { t } = useTranslation(['common']);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Header active="profile"></Header>
      <MainPart>
        <SideBar active="profile"></SideBar>

        <Container>
          <Suspense fallback={<CircularProgress />}>
            <ProfileAvatar
              name={profileData?.name || t('firstName')}
              avatar={profileData?.avatar || ''}
              userId={profileData?.id || ''}
              onUpdate={() => {}}
            />
          </Suspense>

          <UserInfo
            name={profileData?.name || ''}
            email={profileData?.email || ''}
            phone={profileData?.phone || ''}
            created_at={profileData?.createdAt || ''}
          />
          <Suspense>
            <UserUpdateProfile
              userId={profileData?.id || ''}
              name={profileData?.name || ''}
              phone={profileData?.phone || ''}
              email={profileData?.email || ''}
              onUpdate={() => {}}
            ></UserUpdateProfile>
          </Suspense>
        </Container>
      </MainPart>
    </Container>
  );
};

export default Customer;
