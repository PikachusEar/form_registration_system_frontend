// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5051/api';

// API Endpoints
const ENDPOINTS = {
    REGISTRATIONS: '/registrations',
    REGISTRATION_BY_ID: (id) => `/registrations/${id}`,
};

/**
 * Generic API request handler with error handling
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {Promise<object>} API response
 */
const apiRequest = async (url, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include', // Include cookies for CORS
    };

    const config = { ...defaultOptions, ...options };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);

        // Parse JSON response
        const data = await response.json();

        // Handle HTTP errors
        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                message: data.message || 'An error occurred',
                errors: data.errors || [],
                data: data
            };
        }

        return data;
    } catch (error) {
        // Network error or parsing error
        if (error.status) {
            throw error; // Re-throw API errors
        }

        // Network or other errors
        throw {
            status: 0,
            message: 'Network error. Please check your connection.',
            errors: [error.message],
            originalError: error
        };
    }
};
// Generate a unique idempotency key
export const generateIdempotencyKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

/**
 * Registration API Service
 */
export const registrationAPI = {
    /**
     * Create a new registration
     * @param {object} registrationData - Registration form data
     * @returns {Promise<object>} Created registration response
     */
    create: async (registrationData, options = {}) => {
        try {
            const response = await apiRequest(ENDPOINTS.REGISTRATIONS, {
                method: 'POST',
                body: JSON.stringify({
                    idempotencyKey: registrationData.idempotencyKey,
                    firstName: registrationData.firstName,
                    lastName: registrationData.lastName,
                    email: registrationData.email,
                    address: registrationData.address,
                    homePhone: registrationData.homePhone || null,
                    mobilePhone: registrationData.mobilePhone,
                    currentSchool: registrationData.currentSchool,
                    grade: registrationData.grade,
                    examSection: registrationData.examSection,
                }),
                signal: options.signal,
            });

            return {
                success: true,
                data: response.data,
                message: response.message || 'Registration submitted successfully'
            };
        } catch (error) {
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    message: 'Request Timeout. Please try again later.',
                    errors: []
                };
            }
            return {
                success: false,
                message: error.message,
                errors: error.errors || []
            };
        }
    },

    /**
     * Get all registrations
     * @returns {Promise<object>} List of all registrations
     */
    getAll: async () => {
        try {
            const response = await apiRequest(ENDPOINTS.REGISTRATIONS, {
                method: 'GET',
            });

            return {
                success: true,
                data: response.data,
                message: response.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                errors: error.errors || []
            };
        }
    },

    /**
     * Get a specific registration by ID
     * @param {string} id - Registration ID (GUID)
     * @returns {Promise<object>} Registration details with audit history
     */
    getById: async (id) => {
        try {
            const response = await apiRequest(ENDPOINTS.REGISTRATION_BY_ID(id), {
                method: 'GET',
            });

            return {
                success: true,
                data: response.data,
                message: response.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                errors: error.errors || []
            };
        }
    },

    /**
     * Update an existing registration
     * @param {string} id - Registration ID (GUID)
     * @param {object} updateData - Updated registration data
     * @returns {Promise<object>} Updated registration response
     */
    update: async (id, updateData) => {
        try {
            const response = await apiRequest(ENDPOINTS.REGISTRATION_BY_ID(id), {
                method: 'PUT',
                body: JSON.stringify({
                    firstName: updateData.firstName,
                    lastName: updateData.lastName,
                    email: updateData.email,
                    homePhone: updateData.homePhone || null,
                    mobilePhone: updateData.mobilePhone,
                    currentSchool: updateData.currentSchool,
                    grade: updateData.grade,
                    examSection: updateData.examSection,
                    paymentStatus: updateData.paymentStatus || 'Pending',
                    updatedBy: updateData.updatedBy || 'Admin',
                }),
            });

            return {
                success: true,
                data: response.data,
                message: response.message || 'Registration updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                errors: error.errors || []
            };
        }
    },
};

/**
 * Helper function to validate registration data before submission
 * @param {object} data - Registration data to validate
 * @returns {object} Validation result
 */
export const validateRegistrationData = (data) => {
    const errors = [];

    if (!data.firstName || data.firstName.trim().length === 0) {
        errors.push('First name is required');
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
        errors.push('Last name is required');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }

    if (!data.mobilePhone || data.mobilePhone.trim().length === 0) {
        errors.push('Mobile phone is required');
    }

    if (!data.currentSchool || data.currentSchool.trim().length === 0) {
        errors.push('Current school is required');
    }

    if (!data.grade) {
        errors.push('Grade is required');
    }

    if (!data.examSection) {
        errors.push('Exam section is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Email validation helper
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Phone validation helper (basic)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const isValidPhone = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

/**
 * Format error messages for display
 * @param {array} errors - Array of error messages
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (errors) => {
    if (!errors || errors.length === 0) {
        return 'An unknown error occurred';
    }

    if (errors.length === 1) {
        return errors[0];
    }

    return errors.join('. ');
};

export default registrationAPI;