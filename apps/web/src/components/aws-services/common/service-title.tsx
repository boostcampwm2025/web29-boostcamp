interface ServiceTitleProps {
  title: string
  description: string
}

export const ServiceTitle = ({ title, description }: ServiceTitleProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-[23px] font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
