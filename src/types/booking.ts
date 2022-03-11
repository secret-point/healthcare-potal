export interface BookingSearchForm {
  insurance: Nullable<string>;
  language: Nullable<string>;
  type: Nullable<string>;
  state: Nullable<string>;
}

export interface ICareMemberAvailableTime {
  time: string;
  slotsAvailable: number;
}

export interface ICareMemberAvailableDate {
  date: string;
  availableTimes: ICareMemberAvailableTime[];
}

export interface ICareMemberAvailableDatesAndTimes {
  appointmentTypeID: string;
  calendarID: string;
  availableDates: ICareMemberAvailableDate[];
}

export interface ICareMemberAvailableDates {
  appointmentTypeID: string;
  calendarID: string;
  availableDates: { date: string }[];
}
