function ImportantNotes () {
    return (<div>
                {/* Important Notes */}
                <div className="alert alert-warning mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <h4 className="font-bold">Important Notes</h4>
                        <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
                            <li> Please note that the exam payment is non-refundable under any circumstances. Students must ensure that they are fully committed to taking the exam(s) in May 2026 before proceeding with payment.</li>
                            <li> Submit your registration after payment has been made.</li>
                            <li> It is the students' responsibility to stay informed by keeping up to date with all AP announcements and directions. To facilitate effective communication, please provide an accurate and current email address.</li>
                            <li> Please note that by submitting this form, registering and taking the Advanced Placement Exams (AP EXAMS), you are agreeing that data provided as part of the entry or admission process may be passed to AP College Board and any institution involved in your application for a place at one of the AP institutions, and also that your data may be anonymized and used for research purposes. We store personal data securely and will ensure if candidate data is used in publications or research that it is used anonymously.</li>
                        </ol>
                    </div>
                </div>
        </div>
    )
}
export default ImportantNotes