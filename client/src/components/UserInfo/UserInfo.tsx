import React from 'react';
import { useTranslation } from 'react-i18next';
import type { UserInfoProps } from './type';
import { InfoContainer, UserName, UserEmail, MemberSince } from './style';

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
  phone,
}) => {
  const [t] = useTranslation(['common']);

  return (
    <InfoContainer>
      <UserName>{name || t('username')}</UserName>
      <UserEmail>{email || t('email')}</UserEmail>
      <UserEmail>{phone || t('phone')}</UserEmail>
    </InfoContainer>
  );
};

export default UserInfo;
