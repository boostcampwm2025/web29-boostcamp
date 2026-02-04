import { IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { cn } from '@/lib/utils'

export const ServiceTabs = ({
  services,
  current,
  onChange,
}: {
  services: IServiceMapper[]
  current: IServiceMapper['serviceTask']
  onChange: (task: IServiceMapper['serviceTask']) => void
}) => {
  return (
    <div className="mb-0 flex w-full items-center justify-between">
      {services.map((service) => (
        <span
          key={service.label || service.serviceTask}
          className={cn(
            'w-full cursor-pointer rounded-t-lg border py-1 text-center text-base font-semibold select-none',
            current === service.serviceTask
              ? 'bg-background text-primary border-b-0'
              : 'bg-muted text-muted-foreground border-b',
          )}
          onClick={() => onChange(service.serviceTask)}
        >
          {service.label || service.serviceTask}
        </span>
      ))}
    </div>
  )
}
