'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'advanced_panchang',
    urls: [
        {
            requests: [
                {
                    method: 'GET',
                    response: {
                        day: 'Wednesday',
                        sunrise: '7:3:17',
                        sunset: '18:43:38',
                        moonrise: '10:59:45',
                        moonset: '0:9:13',
                        tithi: {
                            details: {
                                tithi_number: 7,
                                tithi_name: 'Shukla-Saptami',
                                special: 'Bhadra Tithi',
                                summary:
                                    'Favourable for starting any new work, debate, beginning of a journey and physical exercise.',
                                deity: 'Indra'
                            },
                            end_time: {
                                hour: 10,
                                minute: 55,
                                second: 8
                            }
                        },
                        nakshatra: {
                            details: {
                                nak_number: 3,
                                nak_name: 'Krittika',
                                ruler: 'Sun',
                                deity: 'Agni',
                                special: 'Adhomukh Nakshatra',
                                summary:
                                    'This nakshatra is of a mixed quality. Good for immediate actions, competition, work with metals. It is suitable to perform the routine activities, day-to-day duties, but it is not recommended to start new important deeds.'
                            },
                            end_time: {
                                hour: 17,
                                minute: 48,
                                second: 8
                            }
                        },
                        yog: {
                            details: {
                                yog_number: 26,
                                yog_name: 'Endra',
                                special:
                                    'Auspicious yoga,Good for all Auspicious Deeds.',
                                meaning:
                                    '(Chief) � interest in education and knowledge; helpful, well-off.'
                            },
                            end_time: {
                                hour: 7,
                                minute: 57,
                                second: 19
                            }
                        },
                        karan: {
                            details: {
                                karan_number: 7,
                                karan_name: 'Vanija',
                                special:
                                    'It is suited for sale transactions and sellers may reap good profits whereas buyers may incur losses in this Karana.',
                                deity: 'Manibhadra'
                            },
                            end_time: {
                                hour: 10,
                                minute: 57,
                                second: 8
                            }
                        },
                        hindu_maah: {
                            adhik_status: false,
                            purnimanta: 'Phalguna',
                            amanta: 'Phalguna'
                        },
                        paksha: 'Shukla-Paksha',
                        ritu: 'Shishir',
                        sun_sign: 'Aquarius',
                        moon_sign: 'Taurus',
                        ayana: 'Uttarayana',
                        panchang_yog: ' Sarvarth Siddhi Yog',
                        vikram_samvat: 2071,
                        shaka_samvat: 1936,
                        shaka_samvat_name: 'Jay',
                        vkram_samvat_name: 'Plavang',
                        disha_shool: 'NORTH',
                        disha_shool_remedies: [],
                        nak_shool: 'none',
                        moon_nivas: 'SOUTH',
                        abhijit_muhurta: {
                            start: '12:29',
                            end: '01:15'
                        },
                        rahukaal: {
                            start: '12 : 52 : 59',
                            end: '2 : 20 : 29'
                        },
                        guliKaal: {
                            start: '11 : 25 : 29',
                            end: '12 : 52 : 59'
                        },
                        yamghant_kaal: {
                            start: '08 : 30 : 29',
                            end: '09 : 57 : 59'
                        }
                    }
                }
            ]
        }
    ]
});
