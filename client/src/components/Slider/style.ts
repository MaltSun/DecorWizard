import { styled } from "@mui/material";
import { ContentContainer } from "../../pages/Main/style";

export const ArticleContainer = styled(ContentContainer)(() => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
    gap: '20px'
}))