import React from 'react';
import { eachDayOfInterval, differenceInCalendarWeeks, format } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import './style.css';

const data = eachDayOfInterval({
  start: new Date(2023, 0, 1),
  end: new Date(2023, 11, 31),
}).map((entry) => {
  return {
    date: entry,
    count: Math.floor(Math.random() * 10) + 1,
  };
});

const weeks = Array.from({
  length:
    Math.abs(
      differenceInCalendarWeeks(new Date(2023, 0, 1), new Date(2023, 11, 31))
    ) + 1,
});

const days = Array.from({ length: 7 });

const getColor = (count) => {
  if (count >= 1 && count <= 3) {
    return '#DDFFBB';
  } else if (count >= 4 && count <= 6) {
    return '#A4D0A4';
  } else if (count >= 7 && count <= 10) {
    return '#41644A';
  } else {
    return '#E3F2C1';
  }
};

export default function App() {
  return (
    <>
      <svg>
        {weeks.map((_, idx) => {
          return (
            <g key={idx} transform={`translate(${idx * 15}, 0)`}>
              {days.map((_, didx) => {
                const dayIndex = didx;
                const index = idx * 7 + dayIndex;

                return (
                  data[index] && (
                    <rect
                      key={index}
                      width={13}
                      height={13}
                      x={0}
                      y={dayIndex * 15}
                      fill={getColor(data[index].count)}
                      data-tooltip-id="day"
                      data-tooltip-content={format(
                        new Date(data[index].date),
                        'do MMM yyyy'
                      )}
                      style={{ cursor: 'pointer' }}
                    >
                      {index}
                    </rect>
                  )
                );
              })}
            </g>
          );
        })}
      </svg>
      <Tooltip id="day" />
    </>
  );
}
