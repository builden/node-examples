/**
 * YYYY     2014            4 digit year
 * YY       14              2 digit year
 * Q        1..4            Quarter of year. Sets month to first month in quarter.
 * M MM     1..12           Month number
 * MMM MMMM January..Dec    Month name in locale set by moment.locale()
 * D DD     1..31           Day of month
 * Do       1st..31st       Day of month with ordinal
 * DDD DDDD 1..365          Day of year
 * X        1410715640.579  Unix timestamp
 * x        1410715640579   Unix ms timestamp
 *
 * H HH     0..23           24 hour time
 * h hh     1..12           12 hour time used with a A.
 * a A      am pm           Post or ante meridiem
 * m mm     0..59           Minutes
 * s ss     0..59           Seconds
 * S        0..9            Tenths of a second
 * SS       0..99           Hundreds of a second
 * SSS      0..999          Thousandths of a second
 * Z ZZ     +12:00          Offset from UTC as +-HH:mm, +-HHmm, or Z
 *
 * http://momentjs.com/
 */
var moment = require('moment');

// format
var today = moment();
console.log(fmt(today));
console.log(today.year());
console.log(today.month());  // [0..11]
console.log(today.daysInMonth()); // [0..31]
console.log(today.hour());
console.log(today.minute());
console.log(today.second());
// to obj
console.log(today.toObject());
// to native Date object
console.log(today.toDate());

// value of
console.log(today.valueOf()); // GMT

// is the same day
console.log(today.isSame('2015-08-31 00:22:33', 'day'));

// start of day
// will change origin datatime，if don't want, please clone a new instance
console.log(fmt(today.clone().startOf('day'))); // YYYY-MM-DD 00:00:00:000

// end of day
console.log(fmt(today.clone().endOf('day'))); // YYYY-MM-DD 23:59:59:999

// diff
var a = moment('2015-09-01 10:00:01');
var b = moment('2015-09-02 10:00:00');
console.log('diff ' + b.diff(a, 'days'));  // 超过24小时才算一天, return 0
var aStart = a.clone().startOf('day')
var bStart = b.clone().startOf('day');
console.log('diff ' + bStart.diff(aStart, 'day')); // return 1


// add & subtract
/*
  Key	Shorthand
  years	y
  quarters	Q
  months	M
  weeks	w
  days	d
  hours	h
  minutes	m
  seconds	s
  milliseconds	ms
*/
console.log(fmt(today.clone().add(1, 'days')));
console.log(fmt(today.clone().subtract(1, 'hours')));

function fmt(day) {
  return day.format('YYYY-MM-DD HH:mm:ss.SSS');
}