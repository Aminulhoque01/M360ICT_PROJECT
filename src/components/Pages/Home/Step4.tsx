'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';
import { relationshipOptions } from '@/data/mockData';
import { parseISO, differenceInYears } from 'date-fns';

interface Props {
  form: UseFormReturn<FormData>;
}

export default function Step4({ form }: Props) {
  const dateOfBirth = form.watch('dateOfBirth');
  const age = dateOfBirth ? differenceInYears(new Date(), parseISO(dateOfBirth)) : null;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="emergencyContactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Name</FormLabel>
            <FormControl>
              <Input placeholder="Jane Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emergencyRelationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {relationshipOptions.map((rel) => (
                  <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emergencyPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Phone</FormLabel>
            <FormControl>
              <Input placeholder="+1-123-456-7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {age !== null && age < 21 && (
        <>
          <FormField
            control={form.control}
            name="guardianName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="Guardian Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guardianPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1-123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}