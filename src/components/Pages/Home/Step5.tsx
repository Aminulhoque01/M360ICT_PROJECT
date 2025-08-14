'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';
import { mockManagers, skillsByDepartment } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

interface Props {
  form: UseFormReturn<FormData>;
}

export default function Step5({ form }: Props) {
  const formData = form.getValues();
  const manager = mockManagers.find((m) => m.id === formData.manager);

  return (
    <div className="space-y-6 mt-2 ">
      <div>
        <h3 className="text-lg font-medium">Personal Info</h3>
        <p>Full Name: {formData.fullName}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phoneNumber}</p>
        <p>Date of Birth: {formData.dateOfBirth ? format(parseISO(formData.dateOfBirth), 'PPP') : ''}</p>
        <p>Profile Picture: {formData.profilePicture ? 'Uploaded' : 'Not provided'}</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Job Details</h3>
        <p>Department: {formData.department}</p>
        <p>Position Title: {formData.positionTitle}</p>
        <p>Start Date: {formData.startDate ? format(parseISO(formData.startDate), 'PPP') : ''}</p>
        <p>Job Type: {formData.jobType}</p>
        <p>Salary Expectation: ${formData.salaryExpectation}{formData.jobType === 'Contract' ? '/hour' : '/year'}</p>
        <p>Manager: {manager?.name}</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Skills & Preferences</h3>
        <p>Primary Skills: {formData.primarySkills.join(', ')}</p>
        <p>Skill Experience:</p>
        <ul>
          {Object.entries(formData.skillExperiences).map(([skill, years]) => (
            <li key={skill}>{skill}: {years} years</li>
          ))}
        </ul>
        <p>Working Hours: {formData.preferredWorkingHoursStart} - {formData.preferredWorkingHoursEnd}</p>
        <p>Remote Preference: {formData.remoteWorkPreference}%</p>
        {formData.remoteWorkPreference > 50 && <p>Manager Approved: {formData.managerApproved ? 'Yes' : 'No'}</p>}
        <p>Extra Notes: {formData.extraNotes || 'None'}</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Emergency Contact</h3>
        <p>Name: {formData.emergencyContactName}</p>
        <p>Relationship: {formData.emergencyRelationship}</p>
        <p>Phone: {formData.emergencyPhone}</p>
        {formData.guardianName && <p>Guardian Name: {formData.guardianName}</p>}
        {formData.guardianPhone && <p>Guardian Phone: {formData.guardianPhone}</p>}
      </div>
      <FormField
        control={form.control}
        name="confirm"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>I confirm all information is correct</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}