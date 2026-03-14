/**
 * Contact message types — shared between API, services, and frontend.
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiSuccess {
  success: true;
  message: string;
}

export interface ContactApiError {
  success: false;
  error: string;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;

export interface ValidationResult {
  success: true;
  data: ContactPayload;
}

export interface ValidationError {
  success: false;
  error: string;
  field?: string;
}

export type ContactValidationResult = ValidationResult | ValidationError;
