import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/schemas/formSchema';

export function useFormNavigation(form: UseFormReturn<FormData>, steps: string[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'profilePicture'];
      case 1:
        return ['department', 'positionTitle', 'startDate', 'jobType', 'salaryExpectation', 'manager'];
      case 2:
        return [
          'primarySkills',
          'skillExperiences',
          'preferredWorkingHoursStart',
          'preferredWorkingHoursEnd',
          'remoteWorkPreference',
          'managerApproved',
        ];
      case 3:
        return ['emergencyContactName', 'emergencyRelationship', 'emergencyPhone', 'guardianName', 'guardianPhone'];
      case 4:
        return ['confirm'];
      default:
        return [];
    }
  };

  const nextStep = useCallback(async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields);
    if (isValid) setCurrentStep((prev) => prev + 1);
  }, [currentStep, form]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  return { currentStep, nextStep, prevStep, totalSteps: steps.length };
}