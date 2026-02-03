import z from 'zod';

export const serviceConfigMapSchema = z.object({
  serviceName: z.enum([
    's3',
    'cloudFront',
    'ec2',
    'vpc',
    'subnet',
    'routeTable',
    'internetGateway',
    'natGateway',
    'securityGroups',
  ]),
  serviceTask: z.string(),
  serviceSections: z.array(z.string()),
  fixedOptions: z.any().optional(),
  label: z.string().optional(),
});

export type TServiceConfigMap = z.infer<typeof serviceConfigMapSchema>;
