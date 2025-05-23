import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <><Heading>{issue.title}</Heading>
            <Flex gapX='2' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='3'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card></>
    )
}

export default IssueDetails