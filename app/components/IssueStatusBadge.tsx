import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


interface Props {
    status: Status
}

const statusColors: Record<Status, { label: string, color: 'red' | 'orange' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'orange' },
    DONE: { label: 'Closed', color: 'green' }
}
const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusColors[status].color}>
            {statusColors[status].label}</Badge>
    )
}

export default IssueStatusBadge