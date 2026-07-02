export function Input({ ref, placeholder }: { placeholder: string; ref?: any }) {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-purple-100 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition-colors"
    />
  );
}