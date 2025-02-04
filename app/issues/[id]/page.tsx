import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'


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
        notFound()
    }

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.createdAt.toDateString()}</p>
            <p>{issue.status}</p>
        </div>
    )
}

export default IssueDetailPage