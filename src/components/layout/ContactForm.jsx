import {useState, useEffect} from 'react'
import React from 'react';
import FormField from '../common/FormField';
import ImportantNotes from "../common/ImportantNotes.jsx";
import ExamTimeTable from "../common/ExamTimeTable.jsx";
import CostDetails from "../common/CostDetails.jsx";
import PaymentMethod from "../common/PaymentMethod.jsx";
import TotalCost from "../common/TotalCost.jsx";

function ContactForm({onSubmit, examSections, gradeSections, isSubmitting, submitSuccess, priceType = 'regular'}) {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dateOfBirth: null,
        address: '',
        homePhone: '',
        mobilePhone: '',
        currentSchool: '',
        grade: '',
        examSection: [''],
    })
    const [error, setError] = useState({
        firstName: 'This field is required',
        lastName: 'This field is required',
        gender: 'This field is required',
        dateOfBirth: 'This field is required',
        email: 'This field is required',
        address: 'This field is required',
        mobilePhone: 'This field is required',
        currentSchool: 'This field is required',
        grade: 'This field is required',
        examSection: ['This field is required'],
    });
    const [hasError, setHasError] = useState(true);
    const [examSectionsAmount, setExamSectionsAmount] = useState(1);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
        const fieldError = validateFields(name, value);
        if (!fieldError) {
            setError(prev => ({ ...prev, [name]: null }));
        }
    }

    const handleExamSectionFieldChange = (index, value) => {
        const newExamSections = [...formState.examSection];
        newExamSections[index] = value;
        setFormState({ ...formState, examSection: newExamSections });

        // Validate
        const fieldError = validators.examSection(value);
        const newErrors = [...(error.examSection || [])];
        newErrors[index] = fieldError;
        setError(prev => ({ ...prev, examSection: newErrors }));
    }

    useEffect(() => {
        const hasFieldError = Object.entries(error).some(([key, err]) => {
            if (key === 'examSection' && Array.isArray(err)) {
                return err.some(e => e);  // Check if any exam section has error
            }
            return err;
        });
        setHasError(hasFieldError);
    }, [error]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(()=> {
            onSubmit(formState);
            setTimeout(() => {
                setFormState({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dateOfBirth: null,
                    email: '',
                    address: '',
                    homePhone: '',
                    mobilePhone: '',
                    currentSchool: '',
                    grade: '',
                    examSection: [''],
                })
                setExamSectionsAmount(1);
            }, 1000)
        }, 1000)
    };

    const handleExamSectionChange = () => {
        if (examSectionsAmount < 5) {
            setExamSectionsAmount(examSectionsAmount + 1);
            setFormState(prev => ({
                ...prev,
                examSection: [...prev.examSection, '']
            }));
            setError(prev => ({
                ...prev,
                examSection: [...(prev.examSection || []), 'This field is required']
            }));
        }
    }
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
            const firstNameRegex = /^[\p{L}\p{M}\s'-]+$/u;
            if (!value) return 'First name is required';
            if (value.trim().length === 0) return 'First name cannot be only spaces';
            return firstNameRegex.test(value) ? null : 'Please enter a valid first name';
        },
        lastName: (value) => {
            const firstNameRegex = /^[\p{L}\p{M}\s'-]+$/u;
            if (!value) return 'Last name is required';
            if (value.trim().length === 0) return 'Last name cannot be only spaces';
            return firstNameRegex.test(value) ? null : 'Please enter a valid last name';
        },
        examSection: (value) => {
            if (!value) return 'Please select exam section';
        },
        grade:(value) => {
            if (!value) return 'Please select your grade';
        },
        currentSchool:(value) => {
            if (!value) return 'Please enter your school';
        },
        address:(value) => {
            if (!value) return 'Please enter your address';
        },
        gender:(value) => {
            if (!value) return 'Please select your gender';
        },
        dateOfBirth: (value) => {
            if (!value) return 'Date of birth is required';
            const today = new Date();
            if (value > today) return 'Date of birth cannot be in the future';
            return null;
        },
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
            case 'address':
                errors = validators.address(value)
                break
            case 'gender':
                errors = validators.gender(value)
                break
            case 'dateOfBirth':
                errors = validators.dateOfBirth(value)
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
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <img
                        src="/src/assets/Amberson_Logo.png"
                        alt="School Logo"
                        className="w-62 h-21 "
                        />
                        <div className="text-right flex-1">
                            <h1 className="text-2xl font-bold text-gray-600 mb-2">AP EXAM Only Sections Registration Form </h1>
                            <h1 className="text-2xl font-bold text-gray-600 mb-2">2025-2026</h1>
                            {/*<p className="text-lg text-gray-600">Amberson High School</p>*/}
                        </div>
                    </div>
                    {/* Form Section */}
                    <div className="card bg-info/10 mb-8">
                        <div className="card-body">
                            <h2 className="text-2xl font-bold mb-6">AP EXAM Registration Form</h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FormField
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
                                    /></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                    key="8"
                                    name={`gender`}
                                    label={`Gender`}
                                    type="select"
                                    value={formState.gender}
                                    onChange={handleChange}
                                    error={error.gender}
                                    placeholder="Select your gender"
                                    options={[{value: "Male", label: "Male"}, {
                                        value: "Female",
                                        label: "Female"
                                    }, {value: "Other", label: "Other"}]}
                                />
                                    <FormField
                                        key="dateOfBirth"
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        value={formState.dateOfBirth}
                                        onChange={handleChange}
                                        error={error.dateOfBirth}
                                        placeholder="Select your date of birth"
                                    />
                                </div>
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
                                    key="10"
                                    name="address"
                                    label="Address"
                                    value={formState.address}
                                    onChange={handleChange}
                                    error={error.address}
                                    placeholder="7100 Birchmount Rd, Markham, ON L3R 4H2"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        key="4"
                                        name="homePhone"
                                        label="Home Phone (optional)"
                                        value={formState.homePhone}
                                        onChange={handleChange}
                                        error={error.homePhone}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                
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

                                <ExamTimeTable/>

                                {formState.examSection.map((value, index) => (
                                    <FormField
                                        key={`examSection-${index}`}
                                        name={`examSection${index}`}
                                        label={`Name of Exam Section ${index + 1}`}
                                        type="select"
                                        value={value}
                                        onChange={(e) => handleExamSectionFieldChange(index, e.target.value)}
                                        error={error.examSection?.[index]}
                                        placeholder="Select an exam section"
                                        options={examSections}
                                    />
                                ))}
                                <button
                                    className="btn btn-block btn-sm btn-soft btn-secondary"
                                    onClick={handleExamSectionChange}
                                    disabled={examSectionsAmount >= 5}
                                >
                                    Add
                                </button>
                                <h1>{examSectionsAmount}</h1>

                            </div>
                            <CostDetails/>
                            <PaymentMethod/>
                            <TotalCost
                                selectedExams={formState.examSection}
                                registrationType={priceType}
                            />

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
                    {/* Introduction Section */}
                    <ImportantNotes/>
                </div>
            </div>
        </div>
    );
}
export default ContactForm;