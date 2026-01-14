// 'use client'

// import React from 'react'

// import { TServiceConfigMap, configMap } from '@/constants/config-map'

// interface DynamicServiceRendererProps {
//   config: TServiceConfigMap
// }

// export function DynamicServiceRenderer({
//   config,
// }: DynamicServiceRendererProps) {
//   const { service, service_task } = config
//   const component = configMap[service]?.[service_task] as (
//     props: S3BucketCreateProps,
//   ) => React.JSX.Element

//   if (!Component) {
//     return (
//       <div>
//         Unknown service: {service}/{service_task}
//       </div>
//     )
//   }

//   return <Component onNext={() => {}} onPrev={() => {}} canGoPrev={false} />
// }
