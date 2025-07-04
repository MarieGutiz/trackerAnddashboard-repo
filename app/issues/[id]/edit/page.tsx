
import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import IssueFormWrapper from '../../_components/IssueFormWrapper'
// import dynamic from 'next/dynamic'

// const IssueForm = dynamic(
//     () => import('@/app/issues/_components/IssueForm'),
//     { ssr: false, loading: () => <IssueFormSkeleton /> }
// )
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
        <IssueFormWrapper issue={issue || undefined} />
    )
}

export default EditIssuePage