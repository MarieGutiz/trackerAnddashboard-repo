import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
    </Box>
  )
}

export default IssueFormSkeleton
