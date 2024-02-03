
export default function Banner({ label, text, color, className }) {
    
    const colorVariants = {
      blue: 'bg-blue-700 border-blue-400 text-blue-400',
      red: 'bg-red-700 border-red-400 text-red-400',
      yellow: 'bg-yellow-700 border-yellow-400 text-yellow-400',
      green: 'bg-green-700 border-green-400 text-green-400',
      violet: 'bg-violet-700 border-violet-400 text-violet-400',
      slate: 'bg-slate-700 border-slate-400 text-slate-400',
      pink: 'bg-pink-700 border-pink-400 text-pink-400',
      indigo: 'bg-indigo-700 border-indigo-400 text-indigo-400',
      gray: 'bg-gray-700 border-gray-400 text-gray-400',
      orange: 'bg-orange-700 border-orange-400 text-orange-400',
      teal: 'bg-teal-700 border-teal-400 text-teal-400',
      cyan: 'bg-cyan-700 border-cyan-400 text-cyan-400',
      lime: 'bg-lime-700 border-lime-400 text-lime-400',
      emerald: 'bg-emerald-700 border-emerald-400 text-emerald-400',
      amber: 'bg-amber-700 border-amber-400 text-amber-400',
      fuchsia: 'bg-fuchsia-700 border-fuchsia-400 text-fuchsia-400',
      rose: 'bg-rose-700 border-rose-400 text-rose-400',
    }
      return (
          <div className={`py-1 cursor-pointer px-3 flex flex-row justify-between items-center gap-2 bg-slate-600 hover:gap-3 transition-all rounded-full w-fit ${className}`}>
              <div className={`flex flex-row justify-start items-center gap-2`}>
                  <div className={`px-2 bg-opacity-45 border flex justify-center items-center rounded-full ${colorVariants[color?color:"blue"]}`}>
                      <span className={`text-xs font-semibold `}>{label ? label : "Label"}</span>
                  </div>
                  <h4 className={`font-normal text-sm text-slate-100`}>{text ? text : "Some exciting text"}</h4>
              </div>
              <img width="15" height="15" src="https://img.icons8.com/ios/50/ffffff/long-arrow-right--v1.png" alt="long-arrow-right--v1" />
          </div>
      )
  }
  