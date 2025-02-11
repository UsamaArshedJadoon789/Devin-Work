// URL mapping for load testing
export const URLS = {
  // Main entry points
  signup: {
    url: 'https://sandbox.uapi.sa/signup',
    method: 'GET',
    description: 'Company onboarding entry point'
  },
  login: {
    url: 'https://sandbox.uapi.sa/login',
    method: 'GET',
    description: 'User login page'
  },

  // Registration flow pages
  registration: {
    url: 'https://sandbox.uapi.sa/signup/registration',
    method: 'POST',
    description: 'Initial registration step',
    requiredFields: ['commercialRegistry', 'expiryDate']
  },
  companyInfo: {
    url: 'https://sandbox.uapi.sa/signup/company-information',
    method: 'POST',
    description: 'Company information step'
  },
  nationalAddress: {
    url: 'https://sandbox.uapi.sa/signup/national-address',
    method: 'POST',
    description: 'National address information'
  },
  authorizedAdmin: {
    url: 'https://sandbox.uapi.sa/signup/authorized-admin',
    method: 'POST',
    description: 'Authorized and admin information'
  },
  attachments: {
    url: 'https://sandbox.uapi.sa/signup/attachments',
    method: 'POST',
    description: 'Required document uploads',
    requiredDocuments: [
      'Authorized Letter from Chamber of Commerce',
      'Articles of Association',
      'VAT Registration Certificate',
      'Zakat Certificate'
    ]
  },
  annualTires: {
    url: 'https://sandbox.uapi.sa/signup/annual-tires',
    method: 'POST',
    description: 'Annual tires information'
  },
  servicePackage: {
    url: 'https://sandbox.uapi.sa/signup/service-package',
    method: 'POST',
    description: 'Service package selection'
  },
  termsConditions: {
    url: 'https://sandbox.uapi.sa/signup/terms',
    method: 'POST',
    description: 'Terms and conditions acceptance'
  },
  review: {
    url: 'https://sandbox.uapi.sa/signup/review',
    method: 'POST',
    description: 'Final review and submission'
  },

  // Authentication related URLs
  auth: {
    login: {
      url: 'https://sandbox.uapi.sa/login',
      method: 'POST',
      description: 'User authentication endpoint',
      requiredFields: ['username', 'password', 'recaptcha']
    },
    forgotPassword: {
      url: 'https://sandbox.uapi.sa/forget-password',
      method: 'GET',
      description: 'Password recovery page'
    },
    signupStatus: {
      url: 'https://sandbox.uapi.sa/signup-status',
      method: 'GET',
      description: 'Check registration status'
    }
  },

  // API endpoints
  api: {
    validateCommercialRegistry: {
      url: 'https://sandbox.uapi.sa/api/validate-commercial-registry',
      method: 'POST',
      description: 'Validates commercial registry number'
    },
    validateCredentials: {
      url: 'https://sandbox.uapi.sa/api/validate-credentials',
      method: 'POST',
      description: 'Validates user credentials'
    },
    validateRecaptcha: {
      url: 'https://sandbox.uapi.sa/api/validate-recaptcha',
      method: 'POST',
      description: 'Validates reCAPTCHA token'
    }
  }
};

// Navigation flow mapping
export const FLOW = {
  entryPoints: ['signup', 'login'],
  registrationSequence: [
    'registration',
    'companyInfo',
    'nationalAddress',
    'authorizedAdmin',
    'attachments',
    'annualTires',
    'servicePackage',
    'termsConditions',
    'review'
  ]
};

// Export for use in load tests
export default {
  URLS,
  FLOW
};
