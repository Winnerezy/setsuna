import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../@/components/ui/form';
import { Input } from '../@/components/ui/input';
import { Control, Form } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '../lib/utils/authFormSchema';

interface CustomInput {
  control: Control<z.infer<typeof authFormSchema>>;
  label: string;
  name: string;
  placeholder: string;
  className: string;
}

export default function CustomInput({ control, label, placeholder, name, className }: CustomInput) {
  return (
    <FormField
      control={control}
      name= { name }
      render={({ field }) => (
        <FormItem className='w-full flex-grow space-y-2'>
          <FormLabel>{ label }</FormLabel>
          <FormControl>
            <Input placeholder={ placeholder } {...field} className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black ${className}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
