import ContactForm from "../components/layout/ContactForm.jsx";
import registrationAPI, {generateIdempotencyKey} from "../services/api.js";
import {useRef, useState} from "react";

const examSections = [
    { value: "Week 1: Monday, Biology", label: "Week 1: Monday, Biology" },
    { value: "Week 1: Monday, Latin", label: "Week 1: Monday, Latin" },
    { value: "Week 1: Monday, European History", label: "Week 1: Monday, European History" },
    { value: "Week 1: Monday, Microeconomics", label: "Week 1: Monday, Microeconomics" },
    { value: "Week 1: Tuesday, Chemistry", label: "Week 1: Tuesday, Chemistry" },
    { value: "Week 1: Tuesday, Human Geography", label: "Week 1: Tuesday, Human Geography" },
    { value: "Week 1: Tuesday, United States Government and Politics", label: "Week 1: Tuesday, United States Government and Politics" },
    { value: "Week 1: Wednesday, English Literature and Composition", label: "Week 1: Wednesday, English Literature and Composition" },
    { value: "Week 1: Wednesday, Comparative Government and Politics", label: "Week 1: Wednesday, Comparative Government and Politics" },
    { value: "Week 1: Wednesday, Physics 1: Algebra-Based", label: "Week 1: Wednesday: Algebra-Based" },
    { value: "Week 1: Thursday, Physics 2: Algebra-Based", label: "Week 1: Thursday, Physics 2: Algebra-Based" },
    { value: "Week 1: Thursday, World History: Modern", label: "Week 1: Thursday World History: Modern" },
    { value: "Week 1: Thursday, African American Studies", label: "Week 1: Thursday, African American Studies" },
    { value: "Week 1: Thursday, Statistics", label: "Week 1: Thursday, Statistics" },
    { value: "Week 1: Friday, Italian Language and Culture", label: "Week 1: Friday, Italian Language and Culture" },
    { value: "Week 1: Friday, United States History", label: "Week 1: Friday, United States History" },
    { value: "Week 1: Friday, Chinese Language and Culture", label: "Week 1: Friday, Chinese Language and Culture" },
    { value: "Week 1: Friday, Macroeconomics", label: "Week 1: Friday, Macroeconomics" },
    { value: "Week 2: Monday, Calculus AB", label: "Week 2: Monday, Calculus AB" },
    { value: "Week 2: Monday, Calculus BC", label: "Week 2: Monday, Calculus BC" },
    { value: "Week 2: Monday, Music Theory", label: "Week 2: Monday, Music Theory" },
    { value: "Week 2: Monday, Seminar", label: "Week 2: Monday, Seminar" },
    { value: "Week 2: Tuesday, French Language and Culture", label: "Week 2: Tuesday, French Language and Culture" },
    { value: "Week 2: Tuesday, Precalculus", label: "Week 2: Tuesday, Precalculus" },
    { value: "Week 2: Tuesday, Japanese Language and Culture", label: "Week 2: Tuesday, Japanese Language and Culture" },
    { value: "Week 2: Tuesday, Psychology", label: "Week 2: Tuesday, Psychology" },
    { value: "Week 2: Wednesday, English Language and Composition", label: "Week 2: Wednesday, English Language and Composition" },
    { value: "Week 2: Wednesday, German Language and Culture", label: "Week 2: Wednesday, German Language and Culture" },
    { value: "Week 2: Wednesday, Physics C: Mechanics", label: "Week 2: Wednesday, Physics C: Mechanics" },
    { value: "Week 2: Wednesday, Spanish Literature and Culture", label: "Week 2: Wednesday, Spanish Literature and Culture" },
    { value: "Week 2: Thursday, Art History", label: "Week 2: Thursday, Art History" },
    { value: "Week 2: Thursday, Spanish Language and Culture", label: "Week 2: Thursday, Spanish Language and Culture" },
    { value: "Week 2: Thursday, Computer Science Principles", label: "Week 2: Thursday, Computer Science Principles" },
    { value: "Week 2: Thursday, Physics C: Electricity and Magnetism", label: "Week 2: Thursday, Physics C: Electricity and Magnetism" },
    { value: "Week 2: Friday, Environmental Science", label: "Week 2: Friday, Environmental Science" },
    { value: "Week 2: Friday, Computer Science A", label: "Week 2: Friday, Computer Science A" },

];

const gradeSections = [
    {value: "12", label: "Grade 12"},
    {value: "11", label: "Grade 11"},
    {value: "10", label: "Grade 10"},
    {value: "9", label: "Grade 9"},
];


function APContactPage() {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const idempotencyKeyRef = useRef(null);

    const receiveSubmit = (formData) => {
        setIsSubmitting(true);
        setSubmitSuccess(false);
        if (!idempotencyKeyRef.current) {
            idempotencyKeyRef.current = generateIdempotencyKey();
            console.log('idempotencyKey', idempotencyKeyRef.current);
        }
        const dataWithIdempotencyKey = {
            ...formData,
            idempotencyKey: idempotencyKeyRef.current,
        }

        console.log('Submitting data: ', dataWithIdempotencyKey);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        registrationAPI.create(dataWithIdempotencyKey, { signal: controller.signal })
            .then(response => {
                if (response.success === false) {
                    setIsSubmitting(false);
                    setSubmitSuccess(false);
                    alert('Registration failed. Please try again.');
                    return;
                }
                if (response.success === true) {
                    setSubmitSuccess(true);
                    setIsSubmitting(false);
                    alert('Registration successful!');
                    return;
                }
                console.log('response', response);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                setIsSubmitting(false);
                console.error('Error:', error);
                alert(error.name === 'AbortError'
                    ? 'Registration time out. Please try again.'
                    : 'Registration failed. Please try again later'
                );
            }
            )
    };

    return (
        <div>
        <ContactForm
            onSubmit={receiveSubmit}
            examSections={examSections}
            gradeSections={gradeSections}
            submitSuccess={submitSuccess}
            isSubmitting={isSubmitting}
            priceType="late"
        />
        </div>
    )
}
export default APContactPage;