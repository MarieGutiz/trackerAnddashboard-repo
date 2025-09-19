import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueBtn = ({issueId}: {issueId: Number}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue {issueId.toString()}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Please confirm</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
        <Flex justify='center' gap='3' mt='2'>
          <AlertDialog.Cancel>
            <Button color='gray' variant='outline'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Yes, delete issue</Button>
          </AlertDialog.Action>
        </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    // <Button color='red'>Delete Issue {issueId.toString()}</Button>
  )
}

export default DeleteIssueBtn