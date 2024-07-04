'use client'

import { createContext, useState } from "react";

export const CompanyContext = createContext();

const CompanyWrapper = ({ children }) => {

    // COMPANY STATUS STATE
    const [companyStatus, setCompanyStatus] = useState(null);

    return (
        <CompanyContext.Provider value={[companyStatus, setCompanyStatus]}>
            {children}
        </CompanyContext.Provider>
    );
};

export default CompanyWrapper;