import ContactForm from "../components/layout/ContactForm.jsx";
import React from "react";
import registrationAPI from "../services/api.js";

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

    const recieveSubmit = (formData) => {

        console.log('handleSubmit', formData);
        registrationAPI.create(formData)
            .then(response => {
                if (response.success === false) {
                    alert('Registration failed. Please try again.');
                    return;
                }
                if (response.success === true) {
                    alert('Registration successful!');
                    return;
                }
                console.log('response', response);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed. Please try again.');
            }
            )
    };

    return (
        <div>
        <ContactForm
            onSubmit={recieveSubmit}
            examSections={examSections}
            gradeSections={gradeSections}
        />
        </div>
    )
}
export default APContactPage;