'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { set, z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';


type IssueFormData = z.infer<typeof issueSchema>;
interface IssueFormProps {
  issue?: Issue;
}

const IssueForm = ({issue}: IssueFormProps) => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueFormData>(
    { resolver: zodResolver(issueSchema) }
  );
  const [error, setError] = React.useState<string | null>('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      console.log(data);
      if(issue) 
        // If issue is provided, update the existing issue
        await axios.patch('/api/issues/'+ issue.id, data);
      else        
          await axios.post('/api/issues', data);

      router.push('/issues');    
      
    }
    catch (err) {
      setSubmitting(false);
      setError('Something went wrong. Please try again.');
      console.error(err)
    }
  })

  return (
    <div className='max-w-xl'>
      {error && (<Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>)}
      <form className='space-y-3'
        onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}>
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Add a description here...' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue? 'Update Issue':'Submit New Issue'} {' '}
          {isSubmitting && <Spinner />} </Button>
      </form>
    </div>
  )
}

export default IssueForm