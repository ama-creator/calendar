const dom = {
  calendar: document.getElementById('calendar'),
  year: document.getElementById('year'),
}

// Получить текущий год и вывести значение в .desc 
const year = new Date().getFullYear();
dom.year.innerHTML = year

// Проверить на високосный год 
function isLeapYear(year) {
  if (year % 4 === 0 && (year % 100 != 0 || year % 400 === 0) ) {
    return 1
  } 
  return 0
}

const months = [
  {
    title: 'Скучный<br>НОвый год',
    name: 'Январь',
    days: 31, 
  },
  {
    title: 'Снова<br>холод',
    name: 'Февраль',
    days: 28 + isLeapYear(year), 
  },
  {
    title: 'Снова<br>грязь',
    name: 'Март',
    days: 31, 
  },
  {
    title: 'Скучные<br>шутники',
    name: 'Апрель',
    days: 30, 
  },
  {
    title: 'Скучный<br>день труда',
    name: 'Май',
    days: 31, 
  },
  {
    title: 'Скучные<br>школьники',
    name: 'Июнь',
    days: 30, 
  },
  {
    title: 'Снова<br>жара',
    name: 'Июль',
    days: 31, 
  },
  {
    title: 'Скучный<br>отпуск',
    name: 'Август',
    days: 31, 
  },
  {
    title: 'Скучное<br>3 сентября',
    name: 'Сентябрь',
    days: 30, 
  },
  {
    title: 'Снова<br>дождь',
    name: 'Октябрь',
    days: 31, 
  },
  {
    title: 'Высокие<br>скидки',
    name: 'Ноябрь',
    days: 30, 
  },
  {
    title: 'Снова<br>подарки',
    name: 'Декабрь',
    days: 31, 
  }
];

// Список праздников 
const holidays = [
  [1, 0, 2022],
  [1, 0, 2022],
  [1, 0, 2022]
]

// Выделить праздничный день в календаре 
function isHoliday(day, month, year, cell) {
  let isHoliday = false
  if (cell % 7 === 0 || (cell+1) % 7 === 0) {
    return true
  }
  holidays.forEach(date => {
    if (date[0] === day && date[1] === month && date[2] === year) {
      isHoliday = true
    }
  })
  return isHoliday
}

// Рендер месяца 
function renderCalendar(year) {
  for (let i = 0; i < 12; i++) {
    renderMonth(i, year);
  }  
}
renderCalendar(year)

// Формирует месяц календаря в .month
function renderMonth(monthIdx, year) {
  const month = months[monthIdx];
  const monthHeadString = buildMonthHead(month.title, month.name);
  const monthWeekDayNamesString = buildWeekDaysNames();
  const monthDates = buildDates(year, monthIdx, month.days)
  const monthBox = document.createElement('div');
  monthBox.className = 'month'
  const monthContentHTML = []

  monthContentHTML.push(monthHeadString)
  monthContentHTML.push(['<div class="month-content">'])
  monthContentHTML.push(monthWeekDayNamesString);
  monthContentHTML.push(monthDates)
  monthContentHTML.push('</div>')

  monthBox.innerHTML = monthContentHTML.join('');
  dom.calendar.appendChild(monthBox)
}

function buildMonthHead(title, monthName) {
  return `
  <div class="month-title">${title}</div>
  <div class="month-name">${monthName}</div>
  `
}

// Создает дни недели
function buildWeekDaysNames() {
  const weekDayNames = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
  const daysNames = [];
  for (let i = 0; i < 7; i++) {
    const dayNameTag = `<div class="month-date month-date--accent">${weekDayNames[i]}</div>`;
    daysNames.push(dayNameTag)
  }
  return daysNames.join('')
}

// Создает даты
function buildDates(year, month, daysCount) { 
  const date = new Date(year, month, 1);
  const datesHTML = [];
  const weekDayStart = date.getDay();
  let i = 1;
  let day = 1;
  while (day <= daysCount) {
    let dateHTML;
    if (i < weekDayStart || weekDayStart === 0 && i < 7) {
      dateHTML = buildDate('')
      datesHTML.push(dateHTML)
    } else {
      const isHoly = isHoliday(day, month, year, i)
      dateHTML = buildDate(day, isHoly)
      datesHTML.push(dateHTML)
      day++
    }
    i++ 
  }
  return datesHTML.join('')
}

// Функция формирует ячейку 
function buildDate(content, isAccent = false) {
  const cls = isAccent ? 'month-date month-date--accent' : 'month-date';
  return `<div class="${cls}">${content}</div>`
}
