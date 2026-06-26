export type ContactPurpose = 'general' | 'careers' | 'press' | 'partners' | 'support';

export interface ContactField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'url' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export interface ContactPurposeConfig {
  label: string;
  submitLabel: string;
  successMessage: string;
  fields: ContactField[];
}

export const contactPurposeConfigs: Record<ContactPurpose, ContactPurposeConfig> = {
  general: {
    label: 'Travel inquiry',
    submitLabel: 'Send message',
    successMessage: 'Thanks! Our travel team will reply within one business day.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        rows: 4,
        placeholder: 'Tell us about your dream trip…',
        required: true,
      },
    ],
  },
  careers: {
    label: 'Job application',
    submitLabel: 'Submit application',
    successMessage: 'Application received! Our talent team will reply within three business days.',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
      {
        name: 'role',
        label: 'Role applying for',
        type: 'text',
        placeholder: 'e.g. Senior Product Designer',
        required: true,
      },
      {
        name: 'portfolio',
        label: 'Portfolio or LinkedIn',
        type: 'url',
        placeholder: 'https://',
        required: true,
      },
      {
        name: 'message',
        label: 'About your work',
        type: 'textarea',
        rows: 4,
        placeholder: 'Share a project you are proud of and why you want to join tafiya…',
        required: true,
      },
    ],
  },
  press: {
    label: 'Press request',
    submitLabel: 'Send media request',
    successMessage: 'Request received! Our press team will respond within one business day.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Work email', type: 'email', required: true },
      {
        name: 'outlet',
        label: 'Publication or outlet',
        type: 'text',
        placeholder: 'e.g. Travel Weekly',
        required: true,
      },
      {
        name: 'deadline',
        label: 'Deadline (optional)',
        type: 'text',
        placeholder: 'e.g. Friday 5pm GMT',
      },
      {
        name: 'message',
        label: 'Story angle or request',
        type: 'textarea',
        rows: 4,
        placeholder: 'What are you working on? Do you need assets, quotes, or an interview?',
        required: true,
      },
    ],
  },
  partners: {
    label: 'Partner application',
    submitLabel: 'Submit partnership inquiry',
    successMessage: 'Thanks! Our partnerships team will review your application and reply within three business days.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      {
        name: 'website',
        label: 'Website or channel',
        type: 'url',
        placeholder: 'https://',
        required: true,
      },
      {
        name: 'audience',
        label: 'Audience size & focus',
        type: 'text',
        placeholder: 'e.g. 50k travel newsletter subscribers',
        required: true,
      },
      {
        name: 'message',
        label: 'How you plan to promote tafiya',
        type: 'textarea',
        rows: 4,
        required: true,
      },
    ],
  },
  support: {
    label: 'Support request',
    submitLabel: 'Send to support',
    successMessage: 'Message sent! Support will reply within one business day.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      {
        name: 'bookingRef',
        label: 'Booking reference (if applicable)',
        type: 'text',
        placeholder: 'e.g. TFY-48291',
      },
      {
        name: 'message',
        label: 'How can we help?',
        type: 'textarea',
        rows: 4,
        required: true,
      },
    ],
  },
};

export function resolveContactPurpose(purpose?: string): ContactPurpose {
  if (purpose && purpose in contactPurposeConfigs) {
    return purpose as ContactPurpose;
  }
  return 'general';
}
