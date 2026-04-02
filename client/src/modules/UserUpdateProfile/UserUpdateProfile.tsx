import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import {
  UpdatePositionDepartmentSchema,
  type DepartmentType,
  type PositionsType,
  type UpdatePositionDepartmentDate,
  type UpdateUserProfileProps,
} from './type';
import { FormContainer, FormStack, FormFieldsStack, ButtonStack, SubmitButton } from './style';
import { TextField } from '@mui/material';

const AdminUpdateProfile: React.FC<UpdateUserProfileProps> = ({
  userId,
  name,
  phone,
  email,
  onUpdate,
}) => {
  const [t] = useTranslation();

  const onSubmit = () => {};

  return (
    <FormContainer>
      <form style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={onSubmit}>
        <TextField type='text' label={t('name')} defaultValue={name || ''}  />

        <FormFieldsStack>
          <TextField type='email' label={t('email')} fullWidth  defaultValue={email || ''} />
          <TextField type='tel' label={t('phone')} fullWidth  defaultValue={phone || ''} />
        </FormFieldsStack>

        <SubmitButton variant="outlined">{t('update')}</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AdminUpdateProfile;
