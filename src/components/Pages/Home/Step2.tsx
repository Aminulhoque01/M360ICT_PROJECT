'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, parseISO } from 'date-fns';
import { Combobox } from '@/components/ui/combobox'; // Ensure combobox is added via shadcn
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';
import { mockManagers } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface Props {
  form: UseFormReturn<FormData>;
}

export default function Step2({ form }: Props) {
  const department = form.watch('department');
  const jobType = form.watch('jobType');

  const filteredManagers = mockManagers.filter((manager) => manager.department === department);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'].map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="positionTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Title</FormLabel>
            <FormControl>
              <Input placeholder="Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" className={cn('w-full', !field.value && 'text-muted-foreground')}>
                    {field.value ? format(parseISO(field.value), 'PPP') : 'Pick a date'}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 90)}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                {['Full-time', 'Part-time', 'Contract'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <FormLabel htmlFor={type}>{type}</FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="salaryExpectation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary Expectation ({jobType === 'Contract' ? '$/hour' : '$/year'})</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="manager"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manager</FormLabel>
            <FormControl>
              <Combobox
                options={filteredManagers.map((m) => ({ value: m.id, label: m.name }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select manager"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}