import { Box, Card, Flex } from '@radix-ui/themes'
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-2xl'>
      <Skeleton />
      <Flex gapX='2' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='3'>
        <Skeleton count={5} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage