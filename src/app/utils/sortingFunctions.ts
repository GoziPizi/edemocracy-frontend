import { HistoricEventParty } from "../models/historicEventParty";

export function sortEventByDate(a: HistoricEventParty, b: HistoricEventParty): number {
  return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
}

export function sortEventsByDate(events: HistoricEventParty[]): HistoricEventParty[] {
  return events.sort(sortEventByDate);
}

//makes the two revere

export function sortEventsByDateDesc(events: HistoricEventParty[]): HistoricEventParty[] {
  return events.sort(sortEventByDate).reverse();
}