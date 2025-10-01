import {useState, useEffect} from 'react'
import React from 'react';
import FormField from '../common/FormField';
import APIntroduction from "../common/APIntroduction.jsx";

const gradeSections = [
    {value: "12", label: "Grade 12"},
    {value: "11", label: "Grade 11"},
    {value: "10", label: "Grade 10"},
    {value: "9", label: "Grade 9"},
];

function ContactForm({onSubmit, examSections}) {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        homePhone: '',
        mobilePhone: '',
        currentSchool: '',
        grade: '',
        examSection: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState({
        firstName: 'This field is required',
        lastName: 'This field is required',
        email: 'This field is required',
        mobilePhone: 'This field is required',
        currentSchool: 'This field is required',
        grade: 'This field is required',
        examSection: 'This field is required',
    });
    const [hasError, setHasError] = useState(true);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
        const fieldError = validateFields(name, value);
        if (!fieldError) {
            setError(prev => ({ ...prev, [name]: null }));
        }
    }

    useEffect(() => {
        setHasError(Object.values(error).some(err => err));
    }, [error]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(()=> {
            onSubmit(formState);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setTimeout(() => {
                setFormState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    homePhone: '',
                    mobilePhone: '',
                    currentSchool: '',
                    grade: '',
                    examSection: '',
                })
                //setSubmitSuccess(false);
            }, 1000)
        }, 1000)
    };
    const validators = {
        required: (value) => {
            return value.trim() !== '' ? null : 'This field is required';
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return 'Email is required';
            return emailRegex.test(value) ? null : 'Please enter a valid email';
        },
        homePhone: (value) => {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!value) return null;
            return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
        },
        mobilePhone: (value) => {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!value) return 'Phone number is required';
            return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
        },
        firstName: (value) => {
            const firstNameRegex = /^[A-Za-z_]+$/;
            if (!value) return 'First name is required';
            return firstNameRegex.test(value) ? null : 'Please enter a valid first name';
        },
        lastName: (value) => {
            const lastNameRegex = /^[A-Za-z_]+$/;
            if (!value) return 'Last name is required';
            return lastNameRegex.test(value) ? null : 'Please enter a valid last name';
        },
        examSection: (value) => {
            if (!value) return 'Please select exam section';
        },
        grade:(value) => {
            if (!value) return 'Please select your grade';
        },
        currentSchool:(value) => {
            if (!value) return 'Please enter your school';
        }
    }
    const validateFields = (name, value) => {
        let errors = {};
        switch (name) {
            case 'firstName':
                errors = validators.firstName(value);
                break;
            case 'lastName':
                errors = validators.lastName(value);
                break;
            case 'email':
                errors = validators.email(value);
                break;
            case 'homePhone':
                errors = validators.homePhone(value);
                break;
            case 'mobilePhone':
                errors = validators.mobilePhone(value);
                break;
            case 'examSection':
                errors = validators.examSection(value)
                break
            case 'grade':
                errors = validators.grade(value)
                break
            case 'currentSchool':
                errors = validators.currentSchool(value)
                break
            default:
                break;

        }
        setError(prev => ({ ...prev, [name]: errors }));
        if (errors) {
            setHasError(true);
        }
        return errors;
    }



    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Introduction Section */}
                    <APIntroduction/>

                    <div className="divider my-8"></div>

                    {/* Form Section */}
                    <h2 className="text-2xl font-bold mb-6">AP EXAM Registration Form</h2>

                    <div className="space-y-4">
                        <FormField
                            key="1"
                            name="firstName"
                            label="First Name"
                            value={formState.firstName}
                            onChange={handleChange}
                            error={error.firstName}
                            placeholder="Enter your first name"
                        />
                        <FormField
                            key="2"
                            name="lastName"
                            label="Last Name"
                            value={formState.lastName}
                            onChange={handleChange}
                            error={error.lastName}
                            placeholder="Enter your last name"
                        />
                        <FormField
                            key="3"
                            name="email"
                            label="Email"
                            value={formState.email}
                            onChange={handleChange}
                            error={error.email}
                            placeholder="your.email@example.com"
                        />
                        <FormField
                            key="4"
                            name="homePhone"
                            label="Home Phone (optional)"
                            value={formState.homePhone}
                            onChange={handleChange}
                            error={error.homePhone}
                            placeholder="+1 (555) 000-0000"
                        />
                        <FormField
                            key="5"
                            name="mobilePhone"
                            label="Mobile Phone"
                            value={formState.mobilePhone}
                            onChange={handleChange}
                            error={error.mobilePhone}
                            placeholder="+1 (555) 000-0000"
                        />
                        <FormField
                            key="6"
                            name="currentSchool"
                            label="Current Day School"
                            value={formState.currentSchool}
                            onChange={handleChange}
                            error={error.currentSchool}
                            placeholder="Amberson High School"
                        />
                        <FormField
                            key="7"
                            name="grade"
                            label="Grade"
                            type="select"
                            value={formState.grade}
                            onChange={handleChange}
                            error={error.grade}
                            placeholder="Select your current grade"
                            options={gradeSections}
                        />
                        <FormField
                            key="8"
                            name="examSection"
                            label="Name of the Exam Section you are requesting"
                            type="select"
                            value={formState.examSection}
                            onChange={handleChange}
                            error={error.examSection}
                            placeholder="Select an exam section"
                            options={examSections}
                        />
                    </div>

                    {/* Error Alert */}
                    {hasError && (
                        <div className="alert alert-error mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Please check the errors before submitting</span>
                        </div>
                    )}

                    {/* Success Alert */}
                    {submitSuccess && (
                        <div className="alert alert-info mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Form submitted successfully!</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="card-actions justify-end mt-8">
                        <button
                            onClick={hasError ? () => alert('Please fix the errors first') : handleSubmit}
                            className={`btn btn-lg ${hasError ? 'btn-error' : 'btn-primary'} ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : hasError ? 'Check Errors' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactForm;