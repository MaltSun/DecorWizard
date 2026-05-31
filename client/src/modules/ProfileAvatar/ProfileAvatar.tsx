import { Avatar, CircularProgress, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AvatarContainer, HiddenInput, UploadBlock } from './style';
import type { ProfileAvatarProps } from './type';
import theme from '../../../theme/theme';
import { toast, Bounce } from 'react-toastify';

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, avatar, userId, onUpdate }) => {
  const [t] = useTranslation(['auth']);
  const [loading, setLoading] = useState(false);

  const userJson = sessionStorage.getItem('user') || '';
  const user = userJson ? JSON.parse(userJson) : null;

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error(t('common:fileTooLarge'));
      return;
    }

    const reader = new FileReader();
    setLoading(true);

    reader.onloadend = async () => {
      const base64String = reader.result as string;

      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          // Передаем base64 в поле bakeryName
          body: JSON.stringify({
            bakeryName: base64String 
          }),
        });

        if (!response.ok) throw new Error('Failed to upload');

        const updatedUser = await response.json();
        
       const newUserContext = { ...user, bakeryName: updatedUser.bakeryName };
        sessionStorage.setItem('user', JSON.stringify(newUserContext));

        toast.success(t('common:successfully'), {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
          transition: Bounce,
        });

        if (onUpdate) onUpdate(); 
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <AvatarContainer>
      { avatar ? (
        <Avatar src={avatar} sx={{ width: 220, height: 220 }} />
      ) : (
        <Avatar sx={{ width: 220, height: 220 }}>{name?.[0]?.toUpperCase() || '?'}</Avatar>
      )}

      {user && userId === user.id && (
        <UploadBlock>
          <Typography variant="h3" textTransform={'capitalize'}>
            <label htmlFor="avatar-upload">
              <HiddenInput id="avatar-upload" type="file" accept="image/*" onChange={onChange} />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  marginRight: theme.spacing(2),
                }}
              >
                <FileUploadIcon />
              </IconButton>
              {t('uploadAvatarImg')}
            </label>
          </Typography>
          <Typography variant="body2" color={theme.palette.text.disabled}>
            {t('uploadRules')}
          </Typography>
        </UploadBlock>
      )}
    </AvatarContainer>
  );
};

export default ProfileAvatar;