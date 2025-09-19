import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueBtn from './EditIssueBtn'
import IssueDetails from './IssueDetails'
import DeleteIssueBtn from './DeleteIssueBtn'


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
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md: col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <EditIssueBtn issueId={issue.id} />
                    <DeleteIssueBtn issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage