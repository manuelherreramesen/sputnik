'use strict';

angular.module('sputnikApp.user').constant('COUNTRIES', [
    {
        name: 'Afghanistan',
        code: 'af'
    }, {
        name: 'Åland Islands',
        code: 'ax'
    }, {
        name: 'Albania',
        code: 'al'
    }, {
        name: 'Algeria',
        code: 'dz'
    }, {
        name: 'Andorra',
        code: 'ad'
    }, {
        name: 'Angola',
        code: 'ao'
    }, {
        name: 'Anguilla',
        code: 'ai'
    }, {
        name: 'Antarctica',
        code: 'aq'
    }, {
        name: 'Antigua And Barbuda',
        code: 'ag'
    }, {
        name: 'Argentina',
        code: 'ar'
    }, {
        name: 'Armenia',
        code: 'am'
    }, {
        name: 'Aruba',
        code: 'aw'
    }, {
        name: 'Australia',
        code: 'au'
    }, {
        name: 'Austria',
        code: 'at'
    }, {
        name: 'Azerbaijan',
        code: 'az'
    }, {
        name: 'Bahamas',
        code: 'bs'
    }, {
        name: 'Bahrain',
        code: 'bh'
    }, {
        name: 'Bangladesh',
        code: 'bd'
    }, {
        name: 'Barbados',
        code: 'bb'
    }, {
        name: 'Belarus',
        code: 'by'
    }, {
        name: 'Belize',
        code: 'bz'
    }, {
        name: 'Benin',
        code: 'bj'
    }, {
        name: 'Bermuda',
        code: 'bm'
    }, {
        name: 'Bhutan',
        code: 'bt'
    }, {
        name: 'Bolivia, Plurinational State Of',
        code: 'bo'
    }, {
        name: 'Bosnia And Herzegovina',
        code: 'ba'
    }, {
        name: 'Botswana',
        code: 'bw'
    }, {
        name: 'Bouvet Island',
        code: 'bv'
    }, {
        name: 'Brazil',
        code: 'br'
    }, {
        name: 'British Indian Ocean Territory',
        code: 'io'
    }, {
        name: 'Brunei Darussalam',
        code: 'bn'
    }, {
        name: 'Bulgaria',
        code: 'bg'
    }, {
        name: 'Burkina Faso',
        code: 'bf'
    }, {
        name: 'Burundi',
        code: 'bi'
    }, {
        name: 'Cambodia',
        code: 'kh'
    }, {
        name: 'Cameroon',
        code: 'cm'
    }, {
        name: 'Cape Verde',
        code: 'cv'
    }, {
        name: 'Cayman Islands',
        code: 'ky'
    }, {
        name: 'Central African Republic',
        code: 'cf'
    }, {
        name: 'Chad',
        code: 'td'
    }, {
        name: 'Chile',
        code: 'cl'
    }, {
        name: 'China',
        code: 'cn'
    }, {
        name: 'Christmas Island',
        code: 'cx'
    }, {
        name: 'Cocos (keeling) Islands',
        code: 'cc'
    }, {
        name: 'Colombia',
        code: 'co'
    }, {
        name: 'Comoros',
        code: 'km'
    }, {
        name: 'Congo',
        code: 'cg'
    }, {
        name: 'Congo, The Democratic Republic Of The',
        code: 'cd'
    }, {
        name: 'Cook Islands',
        code: 'ck'
    }, {
        name: 'Costa Rica',
        code: 'cr'
    }, {
        name: 'CÔte D\'ivoire',
        code: 'ci'
    }, {
        name: 'Croatia',
        code: 'hr'
    }, {
        name: 'Cuba',
        code: 'cu'
    }, {
        name: 'CuraÇao',
        code: 'cw'
    }, {
        name: 'Cyprus',
        code: 'cy'
    }, {
        name: 'Czech Republic',
        code: 'cz'
    }, {
        name: 'Djibouti',
        code: 'dj'
    }, {
        name: 'Dominica',
        code: 'dm'
    }, {
        name: 'Dominican Republic',
        code: 'do'
    }, {
        name: 'Ecuador',
        code: 'ec'
    }, {
        name: 'Egypt',
        code: 'eg'
    }, {
        name: 'El Salvador',
        code: 'sv'
    }, {
        name: 'Equatorial Guinea',
        code: 'gq'
    }, {
        name: 'Eritrea',
        code: 'er'
    }, {
        name: 'Estonia',
        code: 'ee'
    }, {
        name: 'Ethiopia',
        code: 'et'
    }, {
        name: 'Falkland Islands (malvinas)',
        code: 'fk'
    }, {
        name: 'Faroe Islands',
        code: 'fo'
    }, {
        name: 'Fiji',
        code: 'fj'
    }, {
        name: 'Finland',
        code: 'fi'
    }, {
        name: 'French Southern Territories',
        code: 'tf'
    }, {
        name: 'Gabon',
        code: 'ga'
    }, {
        name: 'Gambia',
        code: 'gm'
    }, {
        name: 'Georgia',
        code: 'ge'
    }, {
        name: 'Germany',
        code: 'de'
    }, {
        name: 'Ghana',
        code: 'gh'
    }, {
        name: 'Greece',
        code: 'gr'
    }, {
        name: 'Greenland',
        code: 'gl'
    }, {
        name: 'Grenada',
        code: 'gd'
    }, {
        name: 'Guatemala',
        code: 'gt'
    }, {
        name: 'Guernsey',
        code: 'gg'
    }, {
        name: 'Guinea',
        code: 'gn'
    }, {
        name: 'Guinea-bissau',
        code: 'gw'
    }, {
        name: 'Guyana',
        code: 'gy'
    }, {
        name: 'Haiti',
        code: 'ht'
    }, {
        name: 'Heard Island And Mcdonald Islands',
        code: 'hm'
    }, {
        name: 'Holy See (vatican City State)',
        code: 'va'
    }, {
        name: 'Honduras',
        code: 'hn'
    }, {
        name: 'Hong Kong',
        code: 'hk'
    }, {
        name: 'Hungary',
        code: 'hu'
    }, {
        name: 'Iceland',
        code: 'is'
    }, {
        name: 'India',
        code: 'in'
    }, {
        name: 'Indonesia',
        code: 'id'
    }, {
        name: 'Iraq',
        code: 'iq'
    }, {
        name: 'Ireland',
        code: 'ie'
    }, {
        name: 'Jamaica',
        code: 'jm'
    }, {
        name: 'Japan',
        code: 'jp'
    }, {
        name: 'Jersey',
        code: 'je'
    }, {
        name: 'Jordan',
        code: 'jo'
    }, {
        name: 'Kazakhstan',
        code: 'kz'
    }, {
        name: 'Kenya',
        code: 'ke'
    }, {
        name: 'Kiribati',
        code: 'ki'
    }, {
        name: 'Kuwait',
        code: 'kw'
    }, {
        name: 'Kyrgyzstan',
        code: 'kg'
    }, {
        name: 'Lao People\'s Democratic Republic',
        code: 'la'
    }, {
        name: 'Latvia',
        code: 'lv'
    }, {
        name: 'Lebanon',
        code: 'lb'
    }, {
        name: 'Lesotho',
        code: 'ls'
    }, {
        name: 'Liberia',
        code: 'lr'
    }, {
        name: 'Libya',
        code: 'ly'
    }, {
        name: 'Liechtenstein',
        code: 'li'
    }, {
        name: 'Lithuania',
        code: 'lt'
    }, {
        name: 'Luxembourg',
        code: 'lu'
    }, {
        name: 'Macao',
        code: 'mo'
    }, {
        name: 'Macedonia, The Former Yugoslav Republic Of',
        code: 'mk'
    }, {
        name: 'Madagascar',
        code: 'mg'
    }, {
        name: 'Malawi',
        code: 'mw'
    }, {
        name: 'Malaysia',
        code: 'my'
    }, {
        name: 'Maldives',
        code: 'mv'
    }, {
        name: 'Mali',
        code: 'ml'
    }, {
        name: 'Marshall Islands',
        code: 'mh'
    }, {
        name: 'Mauritania',
        code: 'mr'
    }, {
        name: 'Mauritius',
        code: 'mu'
    }, {
        name: 'Mayotte',
        code: 'yt'
    }, {
        name: 'Mexico',
        code: 'mx'
    }, {
        name: 'Micronesia, Federated States Of',
        code: 'fm'
    }, {
        name: 'Moldova, Republic Of',
        code: 'md'
    }, {
        name: 'Monaco',
        code: 'mc'
    }, {
        name: 'Mongolia',
        code: 'mn'
    }, {
        name: 'Montenegro',
        code: 'me'
    }, {
        name: 'Montserrat',
        code: 'ms'
    }, {
        name: 'Morocco',
        code: 'ma'
    }, {
        name: 'Mozambique',
        code: 'mz'
    }, {
        name: 'Myanmar',
        code: 'mm'
    }, {
        name: 'Namibia',
        code: 'na'
    }, {
        name: 'Nauru',
        code: 'nr'
    }, {
        name: 'Nepal',
        code: 'np'
    }, {
        name: 'New Zealand',
        code: 'nz'
    }, {
        name: 'Nicaragua',
        code: 'ni'
    }, {
        name: 'Niger',
        code: 'ne'
    }, {
        name: 'Nigeria',
        code: 'ng'
    }, {
        name: 'Niue',
        code: 'nu'
    }, {
        name: 'Norfolk Island',
        code: 'nf'
    }, {
        name: 'Northern Mariana Islands',
        code: 'mp'
    }, {
        name: 'Norway',
        code: 'no'
    }, {
        name: 'Oman',
        code: 'om'
    }, {
        name: 'Pakistan',
        code: 'pk'
    }, {
        name: 'Palau',
        code: 'pw'
    }, {
        name: 'Palestinian Territory, Occupied',
        code: 'ps'
    }, {
        name: 'Panama',
        code: 'pa'
    }, {
        name: 'Papua New Guinea',
        code: 'pg'
    }, {
        name: 'Paraguay',
        code: 'py'
    }, {
        name: 'Peru',
        code: 'pe'
    }, {
        name: 'Philippines',
        code: 'ph'
    }, {
        name: 'Pitcairn',
        code: 'pn'
    }, {
        name: 'Poland',
        code: 'pl'
    }, {
        name: 'Portugal',
        code: 'pt'
    }, {
        name: 'Puerto Rico',
        code: 'pr'
    }, {
        name: 'Qatar',
        code: 'qa'
    }, {
        name: 'Romania',
        code: 'ro'
    }, {
        name: 'Russian Federation',
        code: 'ru'
    }, {
        name: 'Rwanda',
        code: 'rw'
    }, {
        name: 'Saint Helena, Ascension And Tristan Da Cunha',
        code: 'sh'
    }, {
        name: 'Saint Kitts And Nevis',
        code: 'kn'
    }, {
        name: 'Saint Lucia',
        code: 'lc'
    }, {
        name: 'Saint Vincent And The Grenadines',
        code: 'vc'
    }, {
        name: 'Samoa',
        code: 'ws'
    }, {
        name: 'San Marino',
        code: 'sm'
    }, {
        name: 'Sao Tome And Principe',
        code: 'st'
    }, {
        name: 'Saudi Arabia',
        code: 'sa'
    }, {
        name: 'Senegal',
        code: 'sn'
    }, {
        name: 'Serbia',
        code: 'rs'
    }, {
        name: 'Seychelles',
        code: 'sc'
    }, {
        name: 'Sierra Leone',
        code: 'sl'
    }, {
        name: 'Singapore',
        code: 'sg'
    }, {
        name: 'Sint Maarten (dutch Part)',
        code: 'sx'
    }, {
        name: 'Slovakia',
        code: 'sk'
    }, {
        name: 'Slovenia',
        code: 'si'
    }, {
        name: 'Solomon Islands',
        code: 'sb'
    }, {
        name: 'Somalia',
        code: 'so'
    }, {
        name: 'South Africa',
        code: 'za'
    }, {
        name: 'South Georgia And The South Sandwich Islands',
        code: 'gs'
    }, {
        name: 'South Sudan',
        code: 'ss'
    }, {
        name: 'Sri Lanka',
        code: 'lk'
    }, {
        name: 'Sudan',
        code: 'sd'
    }, {
        name: 'Suriname',
        code: 'sr'
    }, {
        name: 'Svalbard And Jan Mayen',
        code: 'sj'
    }, {
        name: 'Swaziland',
        code: 'sz'
    }, {
        name: 'Sweden',
        code: 'se'
    }, {
        name: 'Switzerland',
        code: 'ch'
    }, {
        name: 'Syrian Arab Republic',
        code: 'sy'
    }, {
        name: 'Taiwan, Province Of China',
        code: 'tw'
    }, {
        name: 'Tajikistan',
        code: 'tj'
    }, {
        name: 'Tanzania, United Republic Of',
        code: 'tz'
    }, {
        name: 'Timor-leste',
        code: 'tl'
    }, {
        name: 'Togo',
        code: 'tg'
    }, {
        name: 'Tokelau',
        code: 'tk'
    }, {
        name: 'Tonga',
        code: 'to'
    }, {
        name: 'Trinidad And Tobago',
        code: 'tt'
    }, {
        name: 'Tunisia',
        code: 'tn'
    }, {
        name: 'Turkey',
        code: 'tr'
    }, {
        name: 'Turkmenistan',
        code: 'tm'
    }, {
        name: 'Turks And Caicos Islands',
        code: 'tc'
    }, {
        name: 'Tuvalu',
        code: 'tv'
    }, {
        name: 'Uganda',
        code: 'ug'
    }, {
        name: 'Ukraine',
        code: 'ua'
    }, {
        name: 'United Arab Emirates',
        code: 'ae'
    }, {
        name: 'United Kingdom',
        code: 'gb'
    }, {
        name: 'Uruguay',
        code: 'uy'
    }, {
        name: 'Uzbekistan',
        code: 'uz'
    }, {
        name: 'Vanuatu',
        code: 'vu'
    }, {
        name: 'Venezuela, Bolivarian Republic Of',
        code: 've'
    }, {
        name: 'Viet Nam',
        code: 'vn'
    }, {
        name: 'Virgin Islands, British',
        code: 'vg'
    }, {
        name: 'Western Sahara',
        code: 'eh'
    }, {
        name: 'Yemen',
        code: 'ye'
    }, {
        name: 'Zambia',
        code: 'zm'
    }, {
        name: 'Zimbabwe',
        code: 'zw'
    }
]);
