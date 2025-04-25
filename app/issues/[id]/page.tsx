import { prisma } from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueBtn from './EditIssueBtn'
import IssueDetails from './IssueDetails'


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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueBtn issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailPage