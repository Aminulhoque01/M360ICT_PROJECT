import { Progress } from '@/components/ui/progress';

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  return (
    <div className="mb-6">
      <Progress value={((current + 1) / total) * 100} className="w-full" />
      <p className="text-center mt-2 text-sm font-medium">Step {current + 1} of {total}: {steps[current]}</p>
    </div>
  );
}

const steps = ['Personal Info', 'Job Details', 'Skills & Preferences', 'Emergency Contact', 'Review & Submit'];