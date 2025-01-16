'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { error } from 'console';
import { set } from 'zod';

interface NewIssueForm {
  title: string;
  description: string;
} 

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<NewIssueForm>();
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
         <Callout.Text>{error}</Callout.Text>        
        </Callout.Root>}
      <form className='space-y-3'
     onSubmit={handleSubmit(async (data) => {
        try{await axios.post('/api/issues', data);
        router.push('/issues');}
        catch(err){
          setError('Something went wrong. Please try again.');
          console.error(err)
        }
     })}>  
        <TextField.Root placeholder="Title" {...register('title')}>
     </TextField.Root>
     <Controller 
      name='description'
      control={control}
      render={({field}) => (
        <SimpleMDE placeholder='Add a description here...' {...field}/>
      )}
     />

<Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage