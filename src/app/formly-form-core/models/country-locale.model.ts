
export interface CountryLocale {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  countryCode: string;
  currency?: string;
}

export const COUNTRY_LOCALES: CountryLocale[] = [
  { name: 'Afghanistan', alpha2Code: 'AF', alpha3Code: 'AFG', countryCode: '+93' },
  { name: 'Albania', alpha2Code: 'AL', alpha3Code: 'ALB', countryCode: '+355' },
  { name: 'Algeria', alpha2Code: 'DZ', alpha3Code: 'DZA', countryCode: '+213' },
  { name: 'American Samoa', alpha2Code: 'AS', alpha3Code: 'ASM', countryCode: '+1684' },
  { name: 'Andorra', alpha2Code: 'AD', alpha3Code: 'AND', countryCode: '+376' },
  { name: 'Angola', alpha2Code: 'AO', alpha3Code: 'AGO', countryCode: '+244' },
  { name: 'Antigua and Barbuda', alpha2Code: 'AG', alpha3Code: 'ATG', countryCode: '+1268' },
  { name: 'Argentina', alpha2Code: 'AR', alpha3Code: 'ARG', countryCode: '+54' },
  { name: 'Armenia', alpha2Code: 'AM', alpha3Code: 'ARM', countryCode: '+374' },
  { name: 'Australia', alpha2Code: 'AU', alpha3Code: 'AUS', countryCode: '+61', currency: 'AUD' },
  { name: 'Austria', alpha2Code: 'AT', alpha3Code: 'AUT', countryCode: '+43' },
  { name: 'Azerbaijan', alpha2Code: 'AZ', alpha3Code: 'AZE', countryCode: '+994' },
  { name: 'Bahamas', alpha2Code: 'BS', alpha3Code: 'BHS', countryCode: '+1242' },
  { name: 'Bahrain', alpha2Code: 'BH', alpha3Code: 'BHR', countryCode: '+973' },
  { name: 'Bangladesh', alpha2Code: 'BD', alpha3Code: 'BGD', countryCode: '+880' },
  { name: 'Barbados', alpha2Code: 'BB', alpha3Code: 'BRB', countryCode: '+1246' },
  { name: 'Belarus', alpha2Code: 'BY', alpha3Code: 'BLR', countryCode: '+375' },
  { name: 'Belgium', alpha2Code: 'BE', alpha3Code: 'BEL', countryCode: '+32' },
  { name: 'Belize', alpha2Code: 'BZ', alpha3Code: 'BLZ', countryCode: '+501', currency: 'BZD' },
  { name: 'Benin', alpha2Code: 'BJ', alpha3Code: 'BEN', countryCode: '+229' },
  { name: 'Bermuda', alpha2Code: 'BM', alpha3Code: 'BMU', countryCode: '+1441' },
  { name: 'Bhutan', alpha2Code: 'BT', alpha3Code: 'BTN', countryCode: '+975' },
  { name: 'Bolivia (Plurinational State of)', alpha2Code: 'BO', alpha3Code: 'BOL', countryCode: '+591' },
  { name: 'Bonaire, Sint Eustatius and Saba', alpha2Code: 'BQ', alpha3Code: 'BES', countryCode: '+5997' },
  { name: 'Bosnia and Herzegovina', alpha2Code: 'BA', alpha3Code: 'BIH', countryCode: '+387' },
  { name: 'Botswana', alpha2Code: 'BW', alpha3Code: 'BWA', countryCode: '+267' },
  { name: 'Bouvet Island', alpha2Code: 'BV', alpha3Code: 'BVT', countryCode: '+55' },
  { name: 'Brazil', alpha2Code: 'BR', alpha3Code: 'BRA', countryCode: '+55' },
  { name: 'Brunei Darussalam', alpha2Code: 'BN', alpha3Code: 'BRN', countryCode: '+673' },
  { name: 'Bulgaria', alpha2Code: 'BG', alpha3Code: 'BGR', countryCode: '+359' },
  { name: 'Burkina Faso', alpha2Code: 'BF', alpha3Code: 'BFA', countryCode: '+226' },
  { name: 'Burundi', alpha2Code: 'BI', alpha3Code: 'BDI', countryCode: '+257' },
  { name: 'Cabo Verde', alpha2Code: 'CV', alpha3Code: 'CPV', countryCode: '+238' },
  { name: 'Cambodia', alpha2Code: 'KH', alpha3Code: 'KHM', countryCode: '+855' },
  { name: 'Cameroon', alpha2Code: 'CM', alpha3Code: 'CMR', countryCode: '+237' },
  { name: 'Canada', alpha2Code: 'CA', alpha3Code: 'CAN', countryCode: '+1' },
  { name: 'Central African Republic', alpha2Code: 'CF', alpha3Code: 'CAF', countryCode: '+236' },
  { name: 'Chad', alpha2Code: 'TD', alpha3Code: 'TCD', countryCode: '+235' },
  { name: 'Chile', alpha2Code: 'CL', alpha3Code: 'CHL', countryCode: '+56' },
  { name: 'China', alpha2Code: 'CN', alpha3Code: 'CHN', countryCode: '+86' },
  { name: 'Colombia', alpha2Code: 'CO', alpha3Code: 'COL', countryCode: '+57' },
  { name: 'Congo (Democratic Republic of the)', alpha2Code: 'CD', alpha3Code: 'COD', countryCode: '+243' },
  { name: 'Congo', alpha2Code: 'CG', alpha3Code: 'COG', countryCode: '+242' },
  { name: 'Costa Rica', alpha2Code: 'CR', alpha3Code: 'CRI', countryCode: '+506' },
  { name: 'Croatia', alpha2Code: 'HR', alpha3Code: 'HRV', countryCode: '+385' },
  { name: 'Cuba', alpha2Code: 'CU', alpha3Code: 'CUB', countryCode: '+53' },
  { name: 'Cyprus', alpha2Code: 'CY', alpha3Code: 'CYP', countryCode: '+357' },
  { name: 'Czech Republic', alpha2Code: 'CZ', alpha3Code: 'CZE', countryCode: '+420' },
  { name: 'Côte d\'Ivoire', alpha2Code: 'CI', alpha3Code: 'CIV', countryCode: '+225' },
  { name: 'Denmark', alpha2Code: 'DK', alpha3Code: 'DNK', countryCode: '+45' },
  { name: 'Djibouti', alpha2Code: 'DJ', alpha3Code: 'DJI', countryCode: '+253' },
  { name: 'Dominica', alpha2Code: 'DM', alpha3Code: 'DMA', countryCode: '+1767' },
  { name: 'Dominican Republic', alpha2Code: 'DO', alpha3Code: 'DOM', countryCode: '+1809' },
  { name: 'Ecuador', alpha2Code: 'EC', alpha3Code: 'ECU', countryCode: '+593' },
  { name: 'Egypt', alpha2Code: 'EG', alpha3Code: 'EGY', countryCode: '+20' },
  { name: 'El Salvador', alpha2Code: 'SV', alpha3Code: 'SLV', countryCode: '+503' },
  { name: 'Equatorial Guinea', alpha2Code: 'GQ', alpha3Code: 'GNQ', countryCode: '+240' },
  { name: 'Eritrea', alpha2Code: 'ER', alpha3Code: 'ERI', countryCode: '+291' },
  { name: 'Estonia', alpha2Code: 'EE', alpha3Code: 'EST', countryCode: '+372' },
  { name: 'Swaziland', alpha2Code: 'SZ', alpha3Code: 'SWZ', countryCode: '+268' },
  { name: 'Ethiopia', alpha2Code: 'ET', alpha3Code: 'ETH', countryCode: '+251' },
  { name: 'Fiji', alpha2Code: 'FJ', alpha3Code: 'FJI', countryCode: '+679' },
  { name: 'Finland', alpha2Code: 'FI', alpha3Code: 'FIN', countryCode: '+358' },
  { name: 'France', alpha2Code: 'FR', alpha3Code: 'FRA', countryCode: '+33', currency: 'EUR' },
  { name: 'Gabon', alpha2Code: 'GA', alpha3Code: 'GAB', countryCode: '+241' },
  { name: 'Gambia', alpha2Code: 'GM', alpha3Code: 'GMB', countryCode: '+220' },
  { name: 'Georgia', alpha2Code: 'GE', alpha3Code: 'GEO', countryCode: '+995' },
  { name: 'Germany', alpha2Code: 'DE', alpha3Code: 'DEU', countryCode: '+49' },
  { name: 'Ghana', alpha2Code: 'GH', alpha3Code: 'GHA', countryCode: '+233' },
  { name: 'Greece', alpha2Code: 'GR', alpha3Code: 'GRC', countryCode: '+30' },
  { name: 'Greenland', alpha2Code: 'GL', alpha3Code: 'GRL', countryCode: '+299' },
  { name: 'Guadeloupe', alpha2Code: 'GP', alpha3Code: 'GLP', countryCode: '+590' },
  { name: 'Grenada', alpha2Code: 'GD', alpha3Code: 'GRD', countryCode: '+1473' },
  { name: 'Guatemala', alpha2Code: 'GT', alpha3Code: 'GTM', countryCode: '+502' },
  { name: 'Guinea', alpha2Code: 'GN', alpha3Code: 'GIN', countryCode: '+224' },
  { name: 'Guinea-Bissau', alpha2Code: 'GW', alpha3Code: 'GNB', countryCode: '+245' },
  { name: 'Guyana', alpha2Code: 'GY', alpha3Code: 'GUY', countryCode: '+592' },
  { name: 'Haiti', alpha2Code: 'HT', alpha3Code: 'HTI', countryCode: '+509' },
  { name: 'Honduras', alpha2Code: 'HN', alpha3Code: 'HND', countryCode: '+504' },
  { name: 'Hong Kong', alpha2Code: 'HK', alpha3Code: 'HKG', countryCode: '+852' },
  { name: 'Hungary', alpha2Code: 'HU', alpha3Code: 'HUN', countryCode: '+36' },
  { name: 'Iceland', alpha2Code: 'IS', alpha3Code: 'ISL', countryCode: '+354' },
  { name: 'India', alpha2Code: 'IN', alpha3Code: 'IND', countryCode: '+91' },
  { name: 'Indonesia', alpha2Code: 'ID', alpha3Code: 'IDN', countryCode: '+62' },
  { name: 'Iran (Islamic Republic of)', alpha2Code: 'IR', alpha3Code: 'IRN', countryCode: '+98' },
  { name: 'Iraq', alpha2Code: 'IQ', alpha3Code: 'IRQ', countryCode: '+964' },
  { name: 'Ireland', alpha2Code: 'IE', alpha3Code: 'IRL', countryCode: '+353' },
  { name: 'Israel', alpha2Code: 'IL', alpha3Code: 'ISR', countryCode: '+972' },
  { name: 'Italy', alpha2Code: 'IT', alpha3Code: 'ITA', countryCode: '+39' },
  { name: 'Jamaica', alpha2Code: 'JM', alpha3Code: 'JAM', countryCode: '+1876' },
  { name: 'Japan', alpha2Code: 'JP', alpha3Code: 'JPN', countryCode: '+81' },
  { name: 'Jersey', alpha2Code: 'JE', alpha3Code: 'JEY', countryCode: '+44' },
  { name: 'Jordan', alpha2Code: 'JO', alpha3Code: 'JOR', countryCode: '+962' },
  { name: 'Kazakhstan', alpha2Code: 'KZ', alpha3Code: 'KAZ', countryCode: '+76' },
  { name: 'Kenya', alpha2Code: 'KE', alpha3Code: 'KEN', countryCode: '+254' },
  { name: 'Kiribati', alpha2Code: 'KI', alpha3Code: 'KIR', countryCode: '+686' },
  { name: 'Korea (Democratic People\'s Republic of)', alpha2Code: 'KP', alpha3Code: 'PRK', countryCode: '+850' },
  { name: 'Korea (Republic of)', alpha2Code: 'KR', alpha3Code: 'KOR', countryCode: '+82' },
  { name: 'Kuwait', alpha2Code: 'KW', alpha3Code: 'KWT', countryCode: '+965' },
  { name: 'Kyrgyzstan', alpha2Code: 'KG', alpha3Code: 'KGZ', countryCode: '+996' },
  { name: 'Lao People\'s Democratic Republic', alpha2Code: 'LA', alpha3Code: 'LAO', countryCode: '+856' },
  { name: 'Latvia', alpha2Code: 'LV', alpha3Code: 'LVA', countryCode: '+371' },
  { name: 'Lebanon', alpha2Code: 'LB', alpha3Code: 'LBN', countryCode: '+961' },
  { name: 'Lesotho', alpha2Code: 'LS', alpha3Code: 'LSO', countryCode: '+266' },
  { name: 'Liberia', alpha2Code: 'LR', alpha3Code: 'LBR', countryCode: '+231' },
  { name: 'Libya', alpha2Code: 'LY', alpha3Code: 'LBY', countryCode: '+218' },
  { name: 'Liechtenstein', alpha2Code: 'LI', alpha3Code: 'LIE', countryCode: '+423' },
  { name: 'Lithuania', alpha2Code: 'LT', alpha3Code: 'LTU', countryCode: '+370' },
  { name: 'Luxembourg', alpha2Code: 'LU', alpha3Code: 'LUX', countryCode: '+352' },
  { name: 'Macao', alpha2Code: 'MO', alpha3Code: 'MAC', countryCode: '+853' },
  { name: 'Madagascar', alpha2Code: 'MG', alpha3Code: 'MDG', countryCode: '+261' },
  { name: 'Malawi', alpha2Code: 'MW', alpha3Code: 'MWI', countryCode: '+265' },
  { name: 'Malaysia', alpha2Code: 'MY', alpha3Code: 'MYS', countryCode: '+60' },
  { name: 'Maldives', alpha2Code: 'MV', alpha3Code: 'MDV', countryCode: '+960' },
  { name: 'Mali', alpha2Code: 'ML', alpha3Code: 'MLI', countryCode: '+223' },
  { name: 'Malta', alpha2Code: 'MT', alpha3Code: 'MLT', countryCode: '+356' },
  { name: 'Mauritania', alpha2Code: 'MR', alpha3Code: 'MRT', countryCode: '+222' },
  { name: 'Mauritius', alpha2Code: 'MU', alpha3Code: 'MUS', countryCode: '+230' },
  { name: 'Mexico', alpha2Code: 'MX', alpha3Code: 'MEX', countryCode: '+52' },
  { name: 'Moldova (Republic of)', alpha2Code: 'MD', alpha3Code: 'MDA', countryCode: '+373' },
  { name: 'Monaco', alpha2Code: 'MC', alpha3Code: 'MCO', countryCode: '+377' },
  { name: 'Mongolia', alpha2Code: 'MN', alpha3Code: 'MNG', countryCode: '+976' },
  { name: 'Montenegro', alpha2Code: 'ME', alpha3Code: 'MNE', countryCode: '+382' },
  { name: 'Morocco', alpha2Code: 'MA', alpha3Code: 'MAR', countryCode: '+212' },
  { name: 'Mozambique', alpha2Code: 'MZ', alpha3Code: 'MOZ', countryCode: '+258' },
  { name: 'Myanmar', alpha2Code: 'MM', alpha3Code: 'MMR', countryCode: '+95' },
  { name: 'Namibia', alpha2Code: 'NA', alpha3Code: 'NAM', countryCode: '+264' },
  { name: 'Nauru', alpha2Code: 'NR', alpha3Code: 'NRU', countryCode: '+674' },
  { name: 'Nepal', alpha2Code: 'NP', alpha3Code: 'NPL', countryCode: '+977' },
  { name: 'Netherlands', alpha2Code: 'NL', alpha3Code: 'NLD', countryCode: '+31' },
  { name: 'New Caledonia', alpha2Code: 'NC', alpha3Code: 'NCL', countryCode: '+687' },
  { name: 'New Zealand', alpha2Code: 'NZ', alpha3Code: 'NZL', countryCode: '+64' },
  { name: 'Nicaragua', alpha2Code: 'NI', alpha3Code: 'NIC', countryCode: '+505' },
  { name: 'Niger', alpha2Code: 'NE', alpha3Code: 'NER', countryCode: '+227' },
  { name: 'Nigeria', alpha2Code: 'NG', alpha3Code: 'NGA', countryCode: '+234' },
  { name: 'Norway', alpha2Code: 'NO', alpha3Code: 'NOR', countryCode: '+47' },
  { name: 'Oman', alpha2Code: 'OM', alpha3Code: 'OMN', countryCode: '+968' },
  { name: 'Pakistan', alpha2Code: 'PK', alpha3Code: 'PAK', countryCode: '+92' },
  { name: 'Palau', alpha2Code: 'PW', alpha3Code: 'PLW', countryCode: '+680' },
  { name: 'Palestine, State of', alpha2Code: 'PS', alpha3Code: 'PSE', countryCode: '+970' },
  { name: 'Panama', alpha2Code: 'PA', alpha3Code: 'PAN', countryCode: '+507' },
  { name: 'Papua New Guinea', alpha2Code: 'PG', alpha3Code: 'PNG', countryCode: '+675' },
  { name: 'Paraguay', alpha2Code: 'PY', alpha3Code: 'PRY', countryCode: '+595' },
  { name: 'Peru', alpha2Code: 'PE', alpha3Code: 'PER', countryCode: '+51' },
  { name: 'Philippines', alpha2Code: 'PH', alpha3Code: 'PHL', countryCode: '+63' },
  { name: 'Poland', alpha2Code: 'PL', alpha3Code: 'POL', countryCode: '+48' },
  { name: 'Portugal', alpha2Code: 'PT', alpha3Code: 'PRT', countryCode: '+351' },
  { name: 'Puerto Rico', alpha2Code: 'PR', alpha3Code: 'PRI', countryCode: '+1787' },
  { name: 'Qatar', alpha2Code: 'QA', alpha3Code: 'QAT', countryCode: '+974' },
  { name: 'Macedonia (the former Yugoslav Republic of)', alpha2Code: 'MK', alpha3Code: 'MKD', countryCode: '+389' },
  { name: 'Romania', alpha2Code: 'RO', alpha3Code: 'ROU', countryCode: '+40' },
  { name: 'Russian Federation', alpha2Code: 'RU', alpha3Code: 'RUS', countryCode: '+7' },
  { name: 'Rwanda', alpha2Code: 'RW', alpha3Code: 'RWA', countryCode: '+250' },
  { name: 'Saint Kitts and Nevis', alpha2Code: 'KN', alpha3Code: 'KNA', countryCode: '+1869' },
  { name: 'Saint Lucia', alpha2Code: 'LC', alpha3Code: 'LCA', countryCode: '+1758' },
  { name: 'Saint Vincent and the Grenadines', alpha2Code: 'VC', alpha3Code: 'VCT', countryCode: '+1784' },
  { name: 'Samoa', alpha2Code: 'WS', alpha3Code: 'WSM', countryCode: '+685' },
  { name: 'San Marino', alpha2Code: 'SM', alpha3Code: 'SMR', countryCode: '+378' },
  { name: 'Sao Tome and Principe', alpha2Code: 'ST', alpha3Code: 'STP', countryCode: '+239' },
  { name: 'Saudi Arabia', alpha2Code: 'SA', alpha3Code: 'SAU', countryCode: '+966' },
  { name: 'Senegal', alpha2Code: 'SN', alpha3Code: 'SEN', countryCode: '+221' },
  { name: 'Serbia', alpha2Code: 'RS', alpha3Code: 'SRB', countryCode: '+381' },
  { name: 'Seychelles', alpha2Code: 'SC', alpha3Code: 'SYC', countryCode: '+248' },
  { name: 'Sierra Leone', alpha2Code: 'SL', alpha3Code: 'SLE', countryCode: '+232' },
  { name: 'Singapore', alpha2Code: 'SG', alpha3Code: 'SGP', countryCode: '+65' },
  { name: 'Slovakia', alpha2Code: 'SK', alpha3Code: 'SVK', countryCode: '+421' },
  { name: 'Slovenia', alpha2Code: 'SI', alpha3Code: 'SVN', countryCode: '+386' },
  { name: 'Solomon Islands', alpha2Code: 'SB', alpha3Code: 'SLB', countryCode: '+677' },
  { name: 'Somalia', alpha2Code: 'SO', alpha3Code: 'SOM', countryCode: '+252' },
  { name: 'South Africa', alpha2Code: 'ZA', alpha3Code: 'ZAF', countryCode: '+27' },
  { name: 'South Sudan', alpha2Code: 'SS', alpha3Code: 'SSD', countryCode: '+211' },
  { name: 'Spain', alpha2Code: 'ES', alpha3Code: 'ESP', countryCode: '+34' },
  { name: 'Sri Lanka', alpha2Code: 'LK', alpha3Code: 'LKA', countryCode: '+94' },
  { name: 'Sudan', alpha2Code: 'SD', alpha3Code: 'SDN', countryCode: '+249' },
  { name: 'Suriname', alpha2Code: 'SR', alpha3Code: 'SUR', countryCode: '+597' },
  { name: 'Sweden', alpha2Code: 'SE', alpha3Code: 'SWE', countryCode: '+46' },
  { name: 'Switzerland', alpha2Code: 'CH', alpha3Code: 'CHE', countryCode: '+41' },
  { name: 'Syrian Arab Republic', alpha2Code: 'SY', alpha3Code: 'SYR', countryCode: '+963' },
  { name: 'Taiwan', alpha2Code: 'TW', alpha3Code: 'TWN', countryCode: '+886' },
  { name: 'Tajikistan', alpha2Code: 'TJ', alpha3Code: 'TJK', countryCode: '+992' },
  { name: 'Tanzania, United Republic of', alpha2Code: 'TZ', alpha3Code: 'TZA', countryCode: '+255' },
  { name: 'Thailand', alpha2Code: 'TH', alpha3Code: 'THA', countryCode: '+66' },
  { name: 'Timor-Leste', alpha2Code: 'TL', alpha3Code: 'TLS', countryCode: '+670' },
  { name: 'Togo', alpha2Code: 'TG', alpha3Code: 'TGO', countryCode: '+228' },
  { name: 'Tonga', alpha2Code: 'TO', alpha3Code: 'TON', countryCode: '+676' },
  { name: 'Trinidad and Tobago', alpha2Code: 'TT', alpha3Code: 'TTO', countryCode: '+1868' },
  { name: 'Tunisia', alpha2Code: 'TN', alpha3Code: 'TUN', countryCode: '+216' },
  { name: 'Turkey', alpha2Code: 'TR', alpha3Code: 'TUR', countryCode: '+90' },
  { name: 'Turkmenistan', alpha2Code: 'TM', alpha3Code: 'TKM', countryCode: '+993' },
  { name: 'Tuvalu', alpha2Code: 'TV', alpha3Code: 'TUV', countryCode: '+688' },
  { name: 'Uganda', alpha2Code: 'UG', alpha3Code: 'UGA', countryCode: '+256' },
  { name: 'Ukraine', alpha2Code: 'UA', alpha3Code: 'UKR', countryCode: '+380' },
  { name: 'United Arab Emirates', alpha2Code: 'AE', alpha3Code: 'ARE', countryCode: '+971' },
  { name: 'United Kingdom of Great Britain and Northern Ireland', alpha2Code: 'GB', alpha3Code: 'GBR', countryCode: '+44', currency: 'GBP' },
  { name: 'United States of America', alpha2Code: 'US', alpha3Code: 'USA', countryCode: '+1', currency: 'USD' },
  { name: 'Uruguay', alpha2Code: 'UY', alpha3Code: 'URY', countryCode: '+598' },
  { name: 'Uzbekistan', alpha2Code: 'UZ', alpha3Code: 'UZB', countryCode: '+998' },
  { name: 'Vanuatu', alpha2Code: 'VU', alpha3Code: 'VUT', countryCode: '+678' },
  { name: 'Venezuela (Bolivarian Republic of)', alpha2Code: 'VE', alpha3Code: 'VEN', countryCode: '+58' },
  { name: 'Viet Nam', alpha2Code: 'VN', alpha3Code: 'VNM', countryCode: '+84' },
  { name: 'Yemen', alpha2Code: 'YE', alpha3Code: 'YEM', countryCode: '+967' },
  { name: 'Zambia', alpha2Code: 'ZM', alpha3Code: 'ZMB', countryCode: '+260' },
  { name: 'Zimbabwe', alpha2Code: 'ZW', alpha3Code: 'ZWE', countryCode: '+263' }
];
