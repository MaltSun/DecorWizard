import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FooterBottom, FooterContainer, FooterContent, FooterDivider, FooterLink } from './style';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const theme = useTheme();
    const [t] = useTranslation('common');
    return (
        <FooterContainer >
            <FooterContent                >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: '#80011F',
                            fontWeight: 500,
                            mb: 1,
                        }}
                    >
                        DecorWizard
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        {t('personal_desserts')}
                    </Typography>
                </Box>

                <Box sx={{ maxWidth: 380 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontStyle: 'italic',
                            color: '#5C2A2A',
                            lineHeight: 1.6,
                        }}
                    >
                        {t('footer_status')}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" gutterBottom >
                        {t('contact_us')}
                    </Typography>
                    <FooterLink
                        href="mailto:yoursPosts@decorWizard.com"
                        underline="hover"
                    >
                        yoursPosts@decorWizard.com
                    </FooterLink>
                </Box>
            </FooterContent>

            <FooterDivider />

            <FooterBottom
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} DecorWizard. {t('all_rights_reserved')} 
                </Typography>

                <Typography variant="body2">
                    {t('with_love')} <span style={{ color: '#80011F' }}>❤️</span>

                </Typography>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;