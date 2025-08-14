// 'use client';

// import { useState } from 'react';
// import { useForm, FormProvider, FieldPath } from 'react-hook-form'; // Add FormProvider
// import { zodResolver } from '@hookform/resolvers/zod';
// import { formSchema, FormData } from '@/schemas/formSchema';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from '@/components/ui/alert-dialog';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import Step1 from '@/components/Pages/Home/Step1';
// import Step2 from '@/components/Pages/Home/Step2';
// import Step3 from '@/components/Pages/Home/Step3';
// import Step4 from '@/components/Pages/Home/Step4';
// import Step5 from '@/components/Pages/Home/Step5';
// import { useBeforeUnload } from 'react-use';

// const steps = ['Personal Info', 'Job Details', 'Skills & Preferences', 'Emergency Contact', 'Review & Submit'];

// export default function MultiStepForm() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showLeaveWarning, setShowLeaveWarning] = useState(false);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: '',
//       email: '',
//       phoneNumber: '',
//       dateOfBirth: '',
//       department: 'Engineering',
//       positionTitle: '',
//       startDate: '',
//       jobType: 'Full-time',
//       salaryExpectation: 0,
//       manager: '',
//       primarySkills: [],
//       skillExperiences: {},
//       preferredWorkingHoursStart: '09:00',
//       preferredWorkingHoursEnd: '17:00',
//       remoteWorkPreference: 0,
//       extraNotes: '',
//       emergencyContactName: '',
//       emergencyRelationship: '',
//       emergencyPhone: '',
//       confirm: false,
//     },
//     mode: 'onChange',
//   });

//   const { handleSubmit, trigger, formState: { isDirty } } = form;

//   // Warn on unsaved changes
//   useBeforeUnload(isDirty, 'You have unsaved changes. Leave?');

//   const onSubmit = (data: FormData) => {
//     console.log('Form Submitted:', data);
//     alert('Form submitted successfully!');
//   };

//   const nextStep = async () => {
//     const fields = getFieldsForStep(currentStep);
//     const isValid = await trigger(fields as FieldPath<FormData>[]);
//     if (isValid) setCurrentStep((prev) => prev + 1);
//   };

//   const prevStep = () => setCurrentStep((prev) => prev - 1);

//   // Handle navigation with warning
//   const handleLeaveWarning = (confirm: boolean) => {
//     if (confirm) {
//       window.location.href = '/'; // Or reset form
//     }
//     setShowLeaveWarning(false);
//   };

//   // Fields to validate per step
//   const getFieldsForStep = (step: number): FieldPath<FormData>[] => {
//     switch (step) {
//       case 0:
//         return ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'profilePicture'];
//       case 1:
//         return ['department', 'positionTitle', 'startDate', 'jobType', 'salaryExpectation', 'manager'];
//       case 2:
//         return [
//           'primarySkills',
//           'preferredWorkingHoursStart',
//           'preferredWorkingHoursEnd',
//           'remoteWorkPreference',
//           'managerApproved',
//         ];
//       case 3:
//         return ['emergencyContactName', 'emergencyRelationship', 'emergencyPhone', 'guardianName', 'guardianPhone'];
//       case 4:
//         return ['confirm'];
//       default:
//         return [];
//     }
//   };

//   return (
//     <Card className="p-6 max-w-2xl mx-auto">
//       <FormProvider {...form}> {/* Wrap form with FormProvider */}
//         <ProgressBar current={currentStep} total={steps.length} />
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {currentStep === 0 && <Step1 form={form} />}
//           {currentStep === 1 && <Step2 form={form} />}
//           {currentStep === 2 && <Step3 form={form} />}
//           {currentStep === 3 && <Step4 form={form} />}
//           {currentStep === 4 && <Step5 form={form} />}

//           <div className="flex justify-between mt-4">
//             {currentStep > 0 && (
//               <Button type="button" variant="outline" onClick={prevStep}>
//                 Back
//               </Button>
//             )}
//             {currentStep < steps.length - 1 ? (
//               <Button type="button" onClick={nextStep}>
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit">Submit</Button>
//             )}
//           </div>
//         </form>
//       </FormProvider>

//       <AlertDialog open={showLeaveWarning} onOpenChange={setShowLeaveWarning}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
//             <AlertDialogDescription>
//               You have unsaved changes. Are you sure you want to leave?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => handleLeaveWarning(false)}>Stay</AlertDialogCancel>
//             <AlertDialogAction onClick={() => handleLeaveWarning(true)}>Leave</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </Card>
//   );
// }







'use client';

import { useState } from 'react';
import { useForm, FormProvider, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData } from '@/schemas/formSchema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step1 from '@/components/Pages/Home/Step1';
import Step2 from '@/components/Pages/Home/Step2';
import Step3 from '@/components/Pages/Home/Step3';
import Step4 from '@/components/Pages/Home/Step4';
import Step5 from '@/components/Pages/Home/Step5';
import { useBeforeUnload } from 'react-use';

const steps = ['Personal Info', 'Job Details', 'Skills & Preferences', 'Emergency Contact', 'Review & Submit'];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      department: 'Engineering',
      positionTitle: '',
      startDate: '',
      jobType: 'Full-time',
      salaryExpectation: 0,
      manager: '',
      primarySkills: [],
      skillExperiences: {},
      preferredWorkingHoursStart: '09:00',
      preferredWorkingHoursEnd: '17:00',
      remoteWorkPreference: 0,
      extraNotes: '',
      emergencyContactName: '',
      emergencyRelationship: '',
      emergencyPhone: '',
      confirm: false,
    },
    mode: 'onChange',
  });

  const { handleSubmit, trigger, formState: { isDirty } } = form;

  useBeforeUnload(isDirty, 'You have unsaved changes. Leave?');

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully!');
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    console.log('Validating fields:', fields); // Debug log
    const isValid = await trigger(fields as FieldPath<FormData>[]);
    console.log('Validation result:', isValid); // Debug log
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleLeaveWarning = (confirm: boolean) => {
    if (confirm) {
      window.location.href = '/';
    }
    setShowLeaveWarning(false);
  };

  const getFieldsForStep = (step: number): FieldPath<FormData>[] => {
    switch (step) {
      case 0:
        return ['fullName', 'email', 'phoneNumber', 'dateOfBirth', 'profilePicture'];
      case 1:
        return ['department', 'positionTitle', 'startDate', 'jobType', 'salaryExpectation', 'manager'];
      case 2:
        return [
          'primarySkills',
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

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <FormProvider {...form}>
        <ProgressBar current={currentStep} total={steps.length} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && <Step1 form={form} />}
          {currentStep === 1 && <Step2 form={form} />}
          {currentStep === 2 && <Step3 form={form} />}
          {currentStep === 3 && <Step4 form={form} />}
          {currentStep === 4 && <Step5 form={form} />}

          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </FormProvider>

      <AlertDialog open={showLeaveWarning} onOpenChange={setShowLeaveWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleLeaveWarning(false)}>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleLeaveWarning(true)}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}