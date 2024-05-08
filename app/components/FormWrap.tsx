const FormWrap = ({
  children,
  custom,
}: {
  children: React.ReactNode;
  custom?: string;
}) => {
  return (
    <div
      className={`min-h-fit h-full flex items-center justify-center pb-12 pt-24 ${custom}`}
    >
      <div className="max-w-[650px] w-full flex flex-col gap-6 items-center border-2 border-slate-200 shadow-xl shadow-slate-300 rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
