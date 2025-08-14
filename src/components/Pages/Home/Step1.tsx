


'use client';

import { useState } from 'react'; // Add useState for year management
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { differenceInYears, format, parseISO, getYear, addYears, subYears } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';
import { cn } from '@/lib/utils';

interface Props {
  form: UseFormReturn<FormData>;
}

export default function Step1({ form }: Props) {
  const currentYear = getYear(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear); // Track selected year
  const minYear = 1900; // Minimum year for birth date
  const maxYear = currentYear - 18; // Must be at least 18 years old

  // Generate years for the dropdown (1900 to current year - 18)
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  // Handle year change from dropdown or navigation
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const currentDate = parseISO(form.getValues('dateOfBirth') || format(new Date(year, 0, 1), 'yyyy-MM-dd'));
    const updatedDate = new Date(currentDate.setFullYear(year));
    form.setValue('dateOfBirth', format(updatedDate, 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1-123-456-7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? format(parseISO(field.value), 'PPP') : 'Pick a date'}
                    <span className="ml-auto flex h-4 w-4 items-center justify-center">
                      {/* Calendar icon or indicator (optional) */}
                    </span>
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex items-center justify-between p-2 border-b">
                  <select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(parseInt(e.target.value))}
                    className="w-24 p-1 border border-input bg-background text-foreground rounded-md"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleYearChange(selectedYear - 1)}
                    disabled={selectedYear <= minYear}
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleYearChange(selectedYear + 1)}
                    disabled={selectedYear >= maxYear}
                  >
                    →
                  </Button>
                </div>
                <Calendar
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedYear(getYear(date));
                      field.onChange(format(date, 'yyyy-MM-dd'));
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || differenceInYears(new Date(), date) < 18
                  }
                  defaultMonth={field.value ? parseISO(field.value) : new Date(maxYear, 0, 1)}
                  year={selectedYear} // Sync calendar year with selected year
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="profilePicture"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".jpg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}