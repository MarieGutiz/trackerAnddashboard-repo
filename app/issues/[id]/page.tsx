import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'


interface IssueDetailPageProps {
    params: {
        id: string
    }
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {

    const { id } = await params
    const issueId = parseInt(id)

    if (isNaN(issueId)) {
        notFound()
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    })

    if (!issue) {
        notFound();
    }
    

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gapX='2' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='3'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    )
}

export default IssueDetailPage