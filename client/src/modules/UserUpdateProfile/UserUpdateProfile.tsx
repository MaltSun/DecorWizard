import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { TextField, CircularProgress } from '@mui/material';
import { FormContainer, FormFieldsStack, SubmitButton } from './style';
import { UpdateUserProfileProps } from './type';

// Описываем структуру данных формы
interface IUpdateProfileForm {
  name: string;
  email: string;
  phone: string;
}

const AdminUpdateProfile: React.FC<UpdateUserProfileProps> = ({
  userId,
  name,
  phone,
  email,
  onUpdate
}) => {
  const [t] = useTranslation('auth');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<IUpdateProfileForm>({
    defaultValues: {
      name: name || '',
      email: email || '',
      phone: phone || '',
    }
  });

  const onSubmit = async (data: IUpdateProfileForm) => {
    setIsSubmitting(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
        }),
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedUser = await response.json();
      toast.success(t('profile_updated_success') || 'Профиль обновлен!');

      if (onUpdate) onUpdate(updatedUser);
    } catch (error) {
      console.error(error);
      toast.error(t('profile_updated_error') || 'Ошибка при обновлении');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('name', { required: true })}
          type='text'
          label={t('name')}
          fullWidth
          error={!!errors.name}
        />

        <FormFieldsStack>
          <TextField
            {...register('email')}
            type='email'
            label={t('email')}
            fullWidth
            disabled   />
          <TextField
            {...register('phone')}
            type='tel'
            label={t('phone')}
            fullWidth
          />
        </FormFieldsStack>

        <SubmitButton
          type="submit"
          variant="outlined"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : t('update')}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AdminUpdateProfile;