import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import type { UserInfoProps } from './type';
import { InfoContainer, UserName, UserEmail, MemberSince } from './style';

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
  created_at,
  phone,
}) => {
  const [t] = useTranslation(['common']);

  return (
    <InfoContainer>
      <UserName>{name || t('username')}</UserName>
      <UserEmail>{email || t('email')}</UserEmail>
      <UserEmail>{phone || t('phone')}</UserEmail>
      {/* <MemberSince>{created_at || t('memberSince')}</MemberSince> */}
    </InfoContainer>
  );
};

export default UserInfo;
