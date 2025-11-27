function TotalCost({ selectedExams = [], registrationType = 'regular' }) {
    // Pricing
    const REGULAR_PRICE = 275;
    const LATE_FEE = 75;

    const pricePerExam = REGULAR_PRICE;
    const examCount = selectedExams.length;
    const subtotal = examCount * pricePerExam;
    const lateFeeTotal = registrationType === 'late' ? examCount * LATE_FEE : 0;
    const total = subtotal + lateFeeTotal;

    return (
        <div>
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 mb-8">
                <div className="card-body">
                    <h3 className="card-title text-2xl mb-6 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Cost Summary
                    </h3>

                    {/* Exam Count */}
                    <div className="bg-base-100 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-700">Number of Exams Selected:</span>
                            <span className="text-2xl font-bold text-primary">{examCount}</span>
                        </div>

                        {/* Selected Exams List */}
                        {examCount > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-600 mb-2">Selected Exams:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedExams.map((exam, index) => (
                                        <div key={index} className="badge badge-primary badge-lg">
                                            {exam}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-base-100 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-700">Price per Exam</span>
                                {/*{registrationType === 'late' && (
                                    <div className="badge badge-warning badge-sm ml-2">Late Registration</div>
                                )}*/}
                            </div>
                            <span className="font-semibold">CAD ${pricePerExam}</span>
                        </div>

                        <div className="divider my-1"></div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Subtotal ({examCount} × ${pricePerExam})</span>
                            <span className="font-semibold">CAD ${subtotal.toFixed(2)}</span>
                        </div>

                        {registrationType === 'late' && lateFeeTotal > 0 && (
                            <>
                                <div className="flex justify-between items-center text-warning">
                                    <span>Late Fee ({examCount} × ${LATE_FEE})</span>
                                    <span className="font-semibold">CAD ${lateFeeTotal.toFixed(2)}</span>
                                </div>
                            </>
                        )}

                        <div className="divider my-2"></div>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-xl font-bold text-primary">Total Amount Due:</span>
                            <span className="text-3xl font-bold text-primary">CAD ${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Info Alert */}
                    {examCount === 0 ? (
                        <div className="alert alert-info mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Please select at least one exam to see the total cost.</span>
                        </div>
                    ) : (
                        <div className="alert alert-success mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Payment of <strong>CAD ${total.toFixed(2)}</strong> will be required via E-Transfer after form submission.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TotalCost;