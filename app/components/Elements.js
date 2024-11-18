
export function Message({text}) {
  return (
    <div className="rounded-md bg-gray-100 p-4 text-center">
      {text}
    </div>
  );
}

export function ErrorMessage({text}) {
  return (
    <div className="rounded-md bg-navy bg-opacity-10 p-4 text-center">
      {text}
    </div>
  );
}


export function DetailItem({ label, value, fullWidth = false }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-md">{value}</span>
    </div>
  );
}