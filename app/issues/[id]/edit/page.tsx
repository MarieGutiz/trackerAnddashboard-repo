import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'


interface EditIssuePageProps {
    params: { id: string }
}
const EditIssuePage = async ({ params }: EditIssuePageProps) => {
    const { id } = await params
        const issueId = parseInt(id)
    
        if (isNaN(issueId)) {
            notFound()
        }
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    })

    return (
        <IssueForm issue={issue || undefined} />
    )
}

export default EditIssuePage