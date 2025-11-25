function CostDetails() {
    return (
        <div>
            {/* Cost Details */}
            <div className="card bg-base-100/80 mb-8">
                <div className="card-body">
                    <h3 className="card-title text-xl mb-4">Cost Details</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-[minmax(100px,15%)_1fr] items-start sm:items-center gap-2 sm:gap-4">
                            <div className="badge badge-primary badge-lg">Regular</div>
                            <div>
                                <p className="font-semibold text-base sm:text-lg">CAD $275 per exam</p>
                                <p className="text-xs sm:text-sm text-gray-600">Before November 7, 2025</p>
                                <p className="text-xs text-gray-500">Regular Orders for the 2025 AP Exam administration must be completed by November 7th, 2025 along with the exam fee payment. </p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-[minmax(100px,15%)_1fr] items-start sm:items-center gap-2 sm:gap-4">
                            <div className="badge badge-warning badge-lg">Late</div>
                            <div>
                                <p className="font-semibold text-base sm:text-lg">CAD $350 per exam</p>
                                <p className="text-xs sm:text-sm text-gray-600">November 15, 2025 - March 13, 2026</p>
                                <p className="text-xs text-gray-500">Additional exams can be ordered between November 15, 2025 and March 13, 2026, but exams ordered during this timeframe will incur a late order fee of CAD$75 per exam in addition to the exam fee. (total $350 per exam) </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
export default CostDetails