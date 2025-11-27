import ContactForm from "../components/layout/ContactForm.jsx";
import registrationAPI, {generateIdempotencyKey} from "../services/api.js";
import {useRef, useState} from "react";

const examSections = [
    { value: "Week 1: Monday", label: "Week 1: Monday" },
    { value: "Week 1: Tuesday", label: "Week 1: Tuesday" },
    { value: "Week 1: Wednesday", label: "Week 1: Wednesday" },
    { value: "Week 1: Thursday", label: "Week 1: Thursday" },
    { value: "Week 1: Friday", label: "Week 1: Friday" },
    { value: "Week 2: Monday", label: "Week 2: Monday" },
    { value: "Week 2: Tuesday", label: "Week 2: Tuesday" },
    { value: "Week 2: Wednesday", label: "Week 2: Wednesday" },
    { value: "Week 2: Thursday", label: "Week 2: Thursday" },
    { value: "Week 2: Friday", label: "Week 2: Friday" },
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