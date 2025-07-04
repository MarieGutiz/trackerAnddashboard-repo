'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/app/issues/[id]/edit/loading';

const IssueForm = dynamic(() => import('./IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

import { Issue } from '@prisma/client';

interface IssueFormWrapperProps {
  issue: Issue | undefined;
}

export default function IssueFormWrapper({ issue }: IssueFormWrapperProps) {
  return <IssueForm issue={issue} />;
}