import ContactForm from "../components/layout/ContactForm.jsx";
import APIntroduction from "../components/common/APIntroduction.jsx";

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

function APContactPage() {

    const recieveSubmit = (formData) => {

        console.log('handleSubmit', formData);
    };

    return (
        <div>
        <ContactForm
            onSubmit={recieveSubmit}
            examSections={examSections}
        />
        </div>
    )
}
export default APContactPage;