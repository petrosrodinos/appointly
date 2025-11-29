const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export const CountryOptions = [
    { label: "Austria", value: "AT", phone_code: "+43", icon: getCountryFlag("AT") },
    { label: "Belgium", value: "BE", phone_code: "+32", icon: getCountryFlag("BE") },
    { label: "Bulgaria", value: "BG", phone_code: "+359", icon: getCountryFlag("BG") },
    { label: "Croatia", value: "HR", phone_code: "+385", icon: getCountryFlag("HR") },
    { label: "Cyprus", value: "CY", phone_code: "+357", icon: getCountryFlag("CY") },
    { label: "Czech Republic", value: "CZ", phone_code: "+420", icon: getCountryFlag("CZ") },
    { label: "Denmark", value: "DK", phone_code: "+45", icon: getCountryFlag("DK") },
    { label: "Estonia", value: "EE", phone_code: "+372", icon: getCountryFlag("EE") },
    { label: "Finland", value: "FI", phone_code: "+358", icon: getCountryFlag("FI") },
    { label: "France", value: "FR", phone_code: "+33", icon: getCountryFlag("FR") },
    { label: "Germany", value: "DE", phone_code: "+49", icon: getCountryFlag("DE") },
    { label: "Greece", value: "GR", phone_code: "+30", icon: getCountryFlag("GR") },
    { label: "Hungary", value: "HU", phone_code: "+36", icon: getCountryFlag("HU") },
    { label: "Ireland", value: "IE", phone_code: "+353", icon: getCountryFlag("IE") },
    { label: "Italy", value: "IT", phone_code: "+39", icon: getCountryFlag("IT") },
    { label: "Latvia", value: "LV", phone_code: "+371", icon: getCountryFlag("LV") },
    { label: "Lithuania", value: "LT", phone_code: "+370", icon: getCountryFlag("LT") },
    { label: "Luxembourg", value: "LU", phone_code: "+352", icon: getCountryFlag("LU") },
    { label: "Malta", value: "MT", phone_code: "+356", icon: getCountryFlag("MT") },
    { label: "Netherlands", value: "NL", phone_code: "+31", icon: getCountryFlag("NL") },
    { label: "Poland", value: "PL", phone_code: "+48", icon: getCountryFlag("PL") },
    { label: "Portugal", value: "PT", phone_code: "+351", icon: getCountryFlag("PT") },
    { label: "Romania", value: "RO", phone_code: "+40", icon: getCountryFlag("RO") },
    { label: "Slovakia", value: "SK", phone_code: "+421", icon: getCountryFlag("SK") },
    { label: "Slovenia", value: "SI", phone_code: "+386", icon: getCountryFlag("SI") },
    { label: "Spain", value: "ES", phone_code: "+34", icon: getCountryFlag("ES") },
    { label: "Sweden", value: "SE", phone_code: "+46", icon: getCountryFlag("SE") },
];