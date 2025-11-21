export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-lg">Your order has been placed successfully!</p>

      <a
        href="/myorders"
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        View My Orders
      </a>
    </div>
  );
}
