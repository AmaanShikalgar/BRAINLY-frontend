export function Input({ ref, placeholder }: { placeholder: string; ref?: any }) {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-purple-100 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-purple-400 transition-colors"/>
  );
}