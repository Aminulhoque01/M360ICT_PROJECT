'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn, FieldPath } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';
import { skillsByDepartment } from '@/data/mockData';

interface Props {
  form: UseFormReturn<FormData>;
}

export default function Step3({ form }: Props) {
  const department = form.watch('department');
  const primarySkills = form.watch('primarySkills');
  const remoteWorkPreference = form.watch('remoteWorkPreference');

  const skills = skillsByDepartment[department as keyof typeof skillsByDepartment] || [];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="primarySkills"
        render={() => (
          <FormItem>
            <FormLabel>Primary Skills (Select at least 3)</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <FormField
                  key={skill}
                  control={form.control}
                  name="primarySkills"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(skill)}
                          onCheckedChange={(checked) => {
                            const newSkills = checked
                              ? [...field.value, skill]
                              : field.value.filter((s: string) => s !== skill);
                            field.onChange(newSkills);
                            // Ensure skillExperiences is initialized
                            // if (checked && !form.getValues(`skillExperiences.${skill}`)) {
                            //   form.setValue(`skillExperiences.${skill}` as FieldPath<FormData>, 0);
                            // }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{skill}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {primarySkills.length > 0 && (
        <FormItem>
          <FormLabel>Experience per Skill (Years)</FormLabel>
          {primarySkills.map((skill) => (
            <FormField
              key={skill}
              control={form.control}
              name={`skillExperiences.${skill}` as FieldPath<FormData>} // Type assertion
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel className="w-40">{skill}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={field.value ?? 0} // Ensure value is defined
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </FormItem>
      )}
      <FormField
        control={form.control}
        name="preferredWorkingHoursStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Working Hours (Start)</FormLabel>
            <FormControl>
              <Input type="time" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preferredWorkingHoursEnd"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Working Hours (End)</FormLabel>
            <FormControl>
              <Input type="time" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="remoteWorkPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remote Work Preference (%)</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <p className="text-sm text-muted-foreground">{field.value}% Remote</p>
            <FormMessage />
          </FormItem>
        )}
      />
      {remoteWorkPreference > 50 && (
        <FormField
          control={form.control}
          name="managerApproved"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Manager Approved</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="extraNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extra Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Any additional information" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}