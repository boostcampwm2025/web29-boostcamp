import type { Control, FieldValues, UseFormSetValue } from 'react-hook-form'

export interface GeneralFieldsConfig {
  visible: boolean
  disabled?: boolean
  [key: string]: unknown
}

export type GeneralBackendConfig<T extends string> = Record<
  T,
  GeneralFieldsConfig
>

export interface AwsSectionProps<T extends FieldValues, F extends string> {
  control: Control<T>
  config: GeneralBackendConfig<F>
}

export type AwsWithSetValueSectionProps<
  T extends FieldValues,
  F extends string,
> = {
  setValue: UseFormSetValue<T>
} & AwsSectionProps<T, F>
