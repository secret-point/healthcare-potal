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

export interface ICareMemberAvailability {
  appointmentTypeID: string;
  calendarID: string;
  availableDates: ICareMemberAvailableDate[];
}
