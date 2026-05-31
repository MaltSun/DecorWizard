import React from 'react'
import { ReviewCardProps } from './type'
import { Box, Paper, Rating, Typography } from '@mui/material'

const ReviewCard: React.FC<ReviewCardProps> = ({ id, userName, reviewText, rating }) => {
    return (
        <div>
            <Typography>{userName} </Typography>
            <Rating
                value={rating}
                readOnly
            />
            <Typography>{reviewText}</Typography>
            {/* <Typography>{createdAt }</Typography> */}
        </div>
    )
}

export default ReviewCard
