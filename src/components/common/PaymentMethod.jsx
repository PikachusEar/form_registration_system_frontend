function PaymentMethod() {
    return (
        <div>
            {/* Payment Method */}
            <div className="card bg-base-100/80 mb-8">
                <div className="card-body">
                    <h3 className="card-title text-xl mb-4">Payment Method</h3>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>After submitting this form, please make an E-Transfer to <span className="font-mono font-semibold">ap@ambersonhighschool.ca</span></li>
                        <li>Enter Security Answer: <span className="badge badge-lg font-mono">AP7100</span></li>
                        <li>Under Notes be sure to enter your name and purpose of transaction.  </li>
                    </ol>
                    <p className="mt-4 text-sm">Once we confirm your payment, you will receive a confirmation email with the next step. </p>
                </div>
            </div>
        </div>
    )
}
export default PaymentMethod;