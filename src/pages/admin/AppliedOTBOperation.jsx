const otbApplications = [
  { initials: "SM", name: "SAMEERBHAI MANSUKHBHAI MOMTORA", agent: "AAMIR DINGI", route: "India → UAE", sub: "OTB Application", pnr: "O9J5NH", airline: "6E · IndiGo", amount: "₹400", status: "Approved" },
  { initials: "AA", name: "AFTAB ALAM", agent: "MOHAMMAD HAIDAR KHAN", route: "India → UAE", sub: "OTB Application", pnr: "CUBRUL", airline: "6E · IndiGo", amount: "₹450", status: "Approved" },
  { initials: "AT", name: "ADITYA BHAGWAT THOTE", agent: "MOHAMMAD HAIDAR KHAN", route: "India → UAE", sub: "OTB Application", pnr: "WOKSIL", airline: "6E · IndiGo", amount: "₹500", status: "Rejected" },
  { initials: "IA", name: "IRSHAD ALAM", agent: "MOHAMMAD HAIDAR KHAN", route: "India → UAE", sub: "OTB Application", pnr: "V12MKY", airline: "6E · IndiGo", amount: "₹450", status: "Approved" },
  { initials: "MA", name: "MOJAHIR ANSARI", agent: "MOHAMMAD HAIDAR KHAN", route: "India → UAE", sub: "OTB Application", pnr: "BCXERR", airline: "6E · IndiGo", amount: "₹600", status: "Approved" },
];
 
export const AppliedOTBOperationsPage = ({ onViewApplication }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Breadcrumb items={["Operations", "Visa Management", "Applied OTB"]} />
        <TopBarActions>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg">
            <Download size={15} /> Export OTB
          </button>
          <button className="flex items-center gap-2 bg-[#0B1E3E] text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <Plus size={15} /> New OTB Application
          </button>
        </TopBarActions>
      </div>
 
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Applied OTB Operations</h1>
 
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
          <StatCard label="TOTAL OTB" value="15" />
          <StatCard label="PENDING REVIEW" value="4" valueClass="text-gray-900" />
          <StatCard label="APPROVED" value="8" valueClass="text-emerald-600" />
          <StatCard label="REJECTED" value="3" valueClass="text-red-500" />
          <StatCard label="TODAY'S APPS" value="5" valueClass="text-blue-600" />
        </div>
 
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-2 rounded-lg">
            Needs Attention: 4 OTB applications require review
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-2 rounded-lg">
            Rejected: 3 applications
          </div>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-2 rounded-lg">
            Recent: 5 applications received today
          </div>
        </div>
 
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">OTB Applications</p>
        </div>
 
        <FilterBar>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[180px]">
            <Search size={14} className="text-gray-400" />
            <input placeholder="Search Applicant/Agent..." className="text-sm outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[160px]">
            <input placeholder="Email/Mobile..." className="text-sm outline-none flex-1" />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            Status <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            Airline <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 text-blue-600 text-sm font-semibold px-3 py-2">
            <Filter size={14} /> Filters
          </button>
        </FilterBar>
 
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold tracking-wide text-gray-400 border-b border-gray-100">
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">OTB / Route</th>
                <th className="px-4 py-3">PNR & Airline</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {otbApplications.map((app, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {app.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{app.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Agent: {app.agent}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-800">{app.route}</p>
                    <p className="text-xs text-gray-400">{app.sub}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-blue-600 font-medium">{app.pnr}</p>
                    <p className="text-xs text-gray-400">{app.airline}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{app.amount}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button onClick={() => onViewApplication && onViewApplication(app)} className="hover:text-blue-600">
                        <Eye size={16} />
                      </button>
                      <button className="hover:text-blue-600">
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 