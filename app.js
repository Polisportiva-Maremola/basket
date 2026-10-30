/* ============================================================
   POLISPORTIVA MAREMOLA — app.js
   ============================================================ */
(function () {
  'use strict';

  /* ── LIVE CLOCK (HUD) ── */
  var clockEl = document.getElementById('clock');
  function tickClock() {
    if (!clockEl) return;
    var n = new Date();
    var p = function (x) { return String(x).padStart(2, '0'); };
    clockEl.textContent = p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds());
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ── MATCHES DATASET (42 partite ufficiali 2026/27) ── */
  var allMatches = [
  {
    "id": "dr2-a-1",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 1,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "bye": true,
    "match": "TURNO DI RIPOSO"
  },
  {
    "id": "dr2-a-2",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 2,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "564",
    "date": "2026-11-08",
    "day": "DOM",
    "time": "19:30",
    "datetime": "2026-11-08T19:30:00",
    "home": "ALASSIO",
    "away": "MAREMOLA",
    "homeCrest": "ALA",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "ALASSIO",
    "opponentCrest": "ALA",
    "location": "ALASSIO",
    "bye": false
  },
  {
    "id": "dr2-a-3",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 3,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "567",
    "date": "2026-11-14",
    "day": "SAB",
    "time": "19:00",
    "datetime": "2026-11-14T19:00:00",
    "home": "MAREMOLA",
    "away": "CAIRO",
    "homeCrest": "MAR",
    "awayCrest": "CAI",
    "isHome": true,
    "opponent": "CAIRO",
    "opponentCrest": "CAI",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "dr2-a-4",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 4,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "568",
    "date": "2026-11-22",
    "day": "DOM",
    "time": "18:00",
    "datetime": "2026-11-22T18:00:00",
    "home": "ALBENGA",
    "away": "MAREMOLA",
    "homeCrest": "ALB",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "ALBENGA",
    "opponentCrest": "ALB",
    "location": "ALBENGA",
    "bye": false
  },
  {
    "id": "dr2-a-5",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 5,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "572",
    "date": "2026-11-27",
    "day": "VEN",
    "time": "20:45",
    "datetime": "2026-11-27T20:45:00",
    "home": "MAREMOLA",
    "away": "LOANO",
    "homeCrest": "MAR",
    "awayCrest": "LOA",
    "isHome": true,
    "opponent": "LOANO",
    "opponentCrest": "LOA",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "dr2-a-6",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 6,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "574",
    "date": "2026-12-12",
    "day": "SAB",
    "time": "20:30",
    "datetime": "2026-12-12T20:30:00",
    "home": "MAREMOLA",
    "away": "VADO",
    "homeCrest": "MAR",
    "awayCrest": "VAD",
    "isHome": true,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "dr2-a-7",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 7,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "578",
    "date": "2026-12-20",
    "day": "DOM",
    "time": "18:30",
    "datetime": "2026-12-20T18:30:00",
    "home": "OSPEDALETTI",
    "away": "MAREMOLA",
    "homeCrest": "OSP",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "OSPEDALETTI",
    "opponentCrest": "OSP",
    "location": "OSPEDALETTI",
    "bye": false
  },
  {
    "id": "dr2-r-1",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 1,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "bye": true,
    "match": "TURNO DI RIPOSO"
  },
  {
    "id": "dr2-r-2",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 2,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "585",
    "date": "2027-01-29",
    "day": "VEN",
    "time": "20:45",
    "datetime": "2027-01-29T20:45:00",
    "home": "MAREMOLA",
    "away": "ALASSIO",
    "homeCrest": "MAR",
    "awayCrest": "ALA",
    "isHome": true,
    "opponent": "ALASSIO",
    "opponentCrest": "ALA",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "dr2-r-3",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 3,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "588",
    "date": "2027-02-05",
    "day": "VEN",
    "time": "21:00",
    "datetime": "2027-02-05T21:00:00",
    "home": "CAIRO",
    "away": "MAREMOLA",
    "homeCrest": "CAI",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "CAIRO",
    "opponentCrest": "CAI",
    "location": "CAIRO",
    "bye": false
  },
  {
    "id": "dr2-r-4",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 4,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "591",
    "date": "2027-02-13",
    "day": "SAB",
    "time": "19:00",
    "datetime": "2027-02-13T19:00:00",
    "home": "MAREMOLA",
    "away": "ALBENGA",
    "homeCrest": "MAR",
    "awayCrest": "ALB",
    "isHome": true,
    "opponent": "ALBENGA",
    "opponentCrest": "ALB",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "dr2-r-5",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 5,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "593",
    "date": "2027-02-26",
    "day": "VEN",
    "time": "20:45",
    "datetime": "2027-02-26T20:45:00",
    "home": "LOANO",
    "away": "MAREMOLA",
    "homeCrest": "LOA",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "LOANO",
    "opponentCrest": "LOA",
    "location": "LOANO",
    "bye": false
  },
  {
    "id": "dr2-r-6",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 6,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "595",
    "date": "2027-03-07",
    "day": "DOM",
    "time": "20:00",
    "datetime": "2027-03-07T20:00:00",
    "home": "VADO",
    "away": "MAREMOLA",
    "homeCrest": "VAD",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "VADO",
    "bye": false
  },
  {
    "id": "dr2-r-7",
    "category": "dr2",
    "categoryName": "DR2 Maschile",
    "categoryShort": "DR2",
    "round": 7,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "600",
    "date": "2027-03-13",
    "day": "SAB",
    "time": "19:00",
    "datetime": "2027-03-13T19:00:00",
    "home": "MAREMOLA",
    "away": "OSPEDALETTI",
    "homeCrest": "MAR",
    "awayCrest": "OSP",
    "isHome": true,
    "opponent": "OSPEDALETTI",
    "opponentCrest": "OSP",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-a-1",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 1,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "805",
    "date": "2026-10-24",
    "day": "SAB",
    "time": "17:30",
    "datetime": "2026-10-24T17:30:00",
    "home": "VADO",
    "away": "MAREMOLA",
    "homeCrest": "VAD",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "VADO",
    "bye": false
  },
  {
    "id": "u17-a-2",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 2,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "808",
    "date": "2026-10-31",
    "day": "SAB",
    "time": "17:00",
    "datetime": "2026-10-31T17:00:00",
    "home": "MAREMOLA",
    "away": "BORDIGHERA",
    "homeCrest": "MAR",
    "awayCrest": "BOR",
    "isHome": true,
    "opponent": "BORDIGHERA",
    "opponentCrest": "BOR",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-a-3",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 3,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "bye": true,
    "match": "TURNO DI RIPOSO"
  },
  {
    "id": "u17-a-4",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 4,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "815",
    "date": "2026-11-15",
    "day": "DOM",
    "time": "11:00",
    "datetime": "2026-11-15T11:00:00",
    "home": "COGOLETO",
    "away": "MAREMOLA",
    "homeCrest": "COG",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "COGOLETO",
    "opponentCrest": "COG",
    "location": "COGOLETO",
    "bye": false
  },
  {
    "id": "u17-a-5",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 5,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "817",
    "date": "2026-11-22",
    "day": "DOM",
    "time": "11:00",
    "datetime": "2026-11-22T11:00:00",
    "home": "MAREMOLA",
    "away": "IMPERIA",
    "homeCrest": "MAR",
    "awayCrest": "IMP",
    "isHome": true,
    "opponent": "IMPERIA",
    "opponentCrest": "IMP",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-a-6",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 6,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "821",
    "date": "2026-12-07",
    "day": "LUN",
    "time": "18:00",
    "datetime": "2026-12-07T18:00:00",
    "home": "SANREMO",
    "away": "MAREMOLA",
    "homeCrest": "SAN",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "SANREMO",
    "opponentCrest": "SAN",
    "location": "SANREMO",
    "bye": false
  },
  {
    "id": "u17-a-7",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 7,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "824",
    "date": "2026-12-12",
    "day": "SAB",
    "time": "16:00",
    "datetime": "2026-12-12T16:00:00",
    "home": "MAREMOLA",
    "away": "FINALE L.",
    "homeCrest": "MAR",
    "awayCrest": "FIN",
    "isHome": true,
    "opponent": "FINALE L.",
    "opponentCrest": "FIN",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-r-1",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 1,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "826",
    "date": "2026-12-19",
    "day": "SAB",
    "time": "17:00",
    "datetime": "2026-12-19T17:00:00",
    "home": "MAREMOLA",
    "away": "VADO",
    "homeCrest": "MAR",
    "awayCrest": "VAD",
    "isHome": true,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-r-2",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 2,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "831",
    "date": "2027-01-16",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2027-01-16T15:00:00",
    "home": "BORDIGHERA",
    "away": "MAREMOLA",
    "homeCrest": "BOR",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "BORDIGHERA",
    "opponentCrest": "BOR",
    "location": "BORDIGHERA",
    "bye": false
  },
  {
    "id": "u17-r-3",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 3,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "bye": true,
    "match": "TURNO DI RIPOSO"
  },
  {
    "id": "u17-r-4",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 4,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "836",
    "date": "2027-01-30",
    "day": "SAB",
    "time": "17:00",
    "datetime": "2027-01-30T17:00:00",
    "home": "MAREMOLA",
    "away": "COGOLETO",
    "homeCrest": "MAR",
    "awayCrest": "COG",
    "isHome": true,
    "opponent": "COGOLETO",
    "opponentCrest": "COG",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-r-5",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 5,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "840",
    "date": "2027-02-06",
    "day": "SAB",
    "time": "18:00",
    "datetime": "2027-02-06T18:00:00",
    "home": "IMPERIA",
    "away": "MAREMOLA",
    "homeCrest": "IMP",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "IMPERIA",
    "opponentCrest": "IMP",
    "location": "IMPERIA",
    "bye": false
  },
  {
    "id": "u17-r-6",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 6,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "841",
    "date": "2027-02-13",
    "day": "SAB",
    "time": "17:00",
    "datetime": "2027-02-13T17:00:00",
    "home": "MAREMOLA",
    "away": "SANREMO",
    "homeCrest": "MAR",
    "awayCrest": "SAN",
    "isHome": true,
    "opponent": "SANREMO",
    "opponentCrest": "SAN",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u17-r-7",
    "category": "u17",
    "categoryName": "Under 17",
    "categoryShort": "U17",
    "round": 7,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "846",
    "date": "2027-02-19",
    "day": "VEN",
    "time": "18:30",
    "datetime": "2027-02-19T18:30:00",
    "home": "FINALE L.",
    "away": "MAREMOLA",
    "homeCrest": "FIN",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "FINALE L.",
    "opponentCrest": "FIN",
    "location": "FINALE L.",
    "bye": false
  },
  {
    "id": "u14f-a-1",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 1,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1046",
    "date": "2026-11-19",
    "day": "GIO",
    "time": "18:15",
    "datetime": "2026-11-19T18:15:00",
    "home": "MAREMOLA",
    "away": "TAGGIA",
    "homeCrest": "MAR",
    "awayCrest": "TAG",
    "isHome": true,
    "opponent": "TAGGIA",
    "opponentCrest": "TAG",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-a-2",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 2,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1050",
    "date": "2026-11-08",
    "day": "DOM",
    "time": "14:00",
    "datetime": "2026-11-08T14:00:00",
    "home": "LERICI",
    "away": "MAREMOLA",
    "homeCrest": "LER",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "LERICI",
    "opponentCrest": "LER",
    "location": "LERICI",
    "bye": false
  },
  {
    "id": "u14f-a-3",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 3,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1054",
    "date": "2026-11-14",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2026-11-14T15:00:00",
    "home": "MAREMOLA",
    "away": "ALASSIO",
    "homeCrest": "MAR",
    "awayCrest": "ALA",
    "isHome": true,
    "opponent": "ALASSIO",
    "opponentCrest": "ALA",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-a-4",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 4,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1055",
    "date": "2026-11-28",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2026-11-28T15:00:00",
    "home": "MAREMOLA",
    "away": "ARDITA GE",
    "homeCrest": "MAR",
    "awayCrest": "ARD",
    "isHome": true,
    "opponent": "ARDITA GE",
    "opponentCrest": "ARD",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-a-5",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 5,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1062",
    "date": "2026-12-13",
    "day": "DOM",
    "time": "16:00",
    "datetime": "2026-12-13T16:00:00",
    "home": "VADO",
    "away": "MAREMOLA",
    "homeCrest": "VAD",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "VADO",
    "bye": false
  },
  {
    "id": "u14f-a-6",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 6,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1065",
    "date": "2026-12-19",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2026-12-19T15:00:00",
    "home": "MAREMOLA",
    "away": "LA SPEZIA",
    "homeCrest": "MAR",
    "awayCrest": "SPZ",
    "isHome": true,
    "opponent": "LA SPEZIA",
    "opponentCrest": "SPZ",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-a-7",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 7,
    "phase": "andata",
    "phaseName": "Girone di Andata",
    "code": "1067",
    "date": "2027-01-17",
    "day": "DOM",
    "time": "15:00",
    "datetime": "2027-01-17T15:00:00",
    "home": "MY BASKET GE",
    "away": "MAREMOLA",
    "homeCrest": "MYB",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "MY BASKET GE",
    "opponentCrest": "MYB",
    "location": "MY BASKET GE",
    "bye": false
  },
  {
    "id": "u14f-r-1",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 1,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1074",
    "date": "2027-01-22",
    "day": "VEN",
    "time": "18:00",
    "datetime": "2027-01-22T18:00:00",
    "home": "TAGGIA",
    "away": "MAREMOLA",
    "homeCrest": "TAG",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "TAGGIA",
    "opponentCrest": "TAG",
    "location": "TAGGIA",
    "bye": false
  },
  {
    "id": "u14f-r-2",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 2,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1076",
    "date": "2027-02-06",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2027-02-06T15:00:00",
    "home": "MAREMOLA",
    "away": "LERICI",
    "homeCrest": "MAR",
    "awayCrest": "LER",
    "isHome": true,
    "opponent": "LERICI",
    "opponentCrest": "LER",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-r-3",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 3,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1081",
    "date": "2027-02-11",
    "day": "GIO",
    "time": "18:20",
    "datetime": "2027-02-11T18:20:00",
    "home": "ALASSIO",
    "away": "MAREMOLA",
    "homeCrest": "ALA",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "ALASSIO",
    "opponentCrest": "ALA",
    "location": "ALASSIO",
    "bye": false
  },
  {
    "id": "u14f-r-4",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 4,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1083",
    "date": "2027-02-21",
    "day": "DOM",
    "time": "15:00",
    "datetime": "2027-02-21T15:00:00",
    "home": "ARDITA GE",
    "away": "MAREMOLA",
    "homeCrest": "ARD",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "ARDITA GE",
    "opponentCrest": "ARD",
    "location": "ARDITA GE",
    "bye": false
  },
  {
    "id": "u14f-r-5",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 5,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1090",
    "date": "2027-02-18",
    "day": "GIO",
    "time": "18:15",
    "datetime": "2027-02-18T18:15:00",
    "home": "MAREMOLA",
    "away": "VADO",
    "homeCrest": "MAR",
    "awayCrest": "VAD",
    "isHome": true,
    "opponent": "VADO",
    "opponentCrest": "VAD",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  },
  {
    "id": "u14f-r-6",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 6,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1093",
    "date": "2027-03-06",
    "day": "SAB",
    "time": "18:00",
    "datetime": "2027-03-06T18:00:00",
    "home": "LA SPEZIA",
    "away": "MAREMOLA",
    "homeCrest": "SPZ",
    "awayCrest": "MAR",
    "isHome": false,
    "opponent": "LA SPEZIA",
    "opponentCrest": "SPZ",
    "location": "LA SPEZIA",
    "bye": false
  },
  {
    "id": "u14f-r-7",
    "category": "u14f",
    "categoryName": "Under 14 Femm.",
    "categoryShort": "U14F",
    "round": 7,
    "phase": "ritorno",
    "phaseName": "Girone di Ritorno",
    "code": "1097",
    "date": "2027-03-13",
    "day": "SAB",
    "time": "15:00",
    "datetime": "2027-03-13T15:00:00",
    "home": "MAREMOLA",
    "away": "MY BASKET GE",
    "homeCrest": "MAR",
    "awayCrest": "MYB",
    "isHome": true,
    "opponent": "MY BASKET GE",
    "opponentCrest": "MYB",
    "location": "PalaMaremola · Pietra Ligure",
    "bye": false
  }
];

  // Se disponibile matches.json tramite fetch, carica la versione più aggiornata
  if (window.fetch) {
    fetch('matches.json')
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (data && data.matches && data.matches.length) {
          allMatches = data.matches;
          updateNextMatch();
          renderCalendar(currentCalCat, currentCalFilter);
        }
      })
      .catch(function () {});
  }

  /* ── DYNAMIC NEXT MATCH & COUNTDOWN ── */
  var cdEls = {
    d: document.querySelector('[data-cd=d]'),
    h: document.querySelector('[data-cd=h]'),
    m: document.querySelector('[data-cd=m]'),
    s: document.querySelector('[data-cd=s]')
  };

  var target = null;
  var nextMatch = null;

  function updateNextMatch() {
    var now = Date.now();
    var valid = (allMatches || []).filter(function (m) {
      if (m.bye || !m.datetime) return false;
      var t = new Date(m.datetime).getTime();
      return t >= now - 2 * 3600 * 1000; // incontro in corso o futuro
    });
    valid.sort(function (a, b) {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    });
    nextMatch = valid.length ? valid[0] : (allMatches || []).find(function (m) { return !m.bye; });

    if (!nextMatch) return;
    target = new Date(nextMatch.datetime);

    var catEl = document.getElementById('scorebugCategory');
    if (catEl) {
      catEl.textContent = 'Prossima · ' + nextMatch.categoryName + ' · ' + (nextMatch.phase === 'andata' ? 'Andata' : 'Ritorno') + ' G' + nextMatch.round;
    }

    var codeEl = document.getElementById('scorebugCode');
    if (codeEl) {
      codeEl.innerHTML = '<span class="dot-live"></span> Gara #' + nextMatch.code;
    }

    var homeEl = document.getElementById('scorebugHome');
    var awayEl = document.getElementById('scorebugAway');
    if (homeEl && awayEl) {
      if (nextMatch.isHome) {
        homeEl.innerHTML = '<div class="crest">MAR</div><b>Maremola</b><span>Casa · PalaMaremola</span>';
        awayEl.innerHTML = '<div class="crest">' + nextMatch.awayCrest + '</div><b>' + nextMatch.away + '</b><span>Trasferta</span>';
      } else {
        homeEl.innerHTML = '<div class="crest">' + nextMatch.homeCrest + '</div><b>' + nextMatch.home + '</b><span>Casa</span>';
        awayEl.innerHTML = '<div class="crest">MAR</div><b>Maremola</b><span>Trasferta</span>';
      }
    }

    var whenEl = document.getElementById('scorebugWhen');
    if (whenEl) {
      var d = nextMatch.date.split('-');
      var dayMonth = d[2] + '/' + d[1];
      whenEl.textContent = nextMatch.day + ' ' + dayMonth + ' · ' + nextMatch.time + ' · ' + (nextMatch.isHome ? 'PalaMaremola' : nextMatch.opponent);
    }

    var locEl = document.getElementById('scorebugLocation');
    if (locEl) {
      locEl.textContent = nextMatch.isHome ? 'Palazzetto · Pietra Ligure' : 'Trasferta · ' + nextMatch.opponent;
    }

    tickCountdown();
  }

  function tickCountdown() {
    if (!target) return;
    var diff = Math.max(0, target.getTime() - Date.now());
    var s = Math.floor(diff / 1000);
    var pad = function (x) { return String(x).padStart(2, '0'); };
    if (cdEls.d) cdEls.d.textContent = pad(Math.floor(s / 86400));
    if (cdEls.h) cdEls.h.textContent = pad(Math.floor((s % 86400) / 3600));
    if (cdEls.m) cdEls.m.textContent = pad(Math.floor((s % 3600) / 60));
    if (cdEls.s) cdEls.s.textContent = pad(s % 60);
  }

  updateNextMatch();
  setInterval(tickCountdown, 1000);

  /* ── TICKER (broadcast bottom line) ── */
  var feed = [
    { k: 'Prossima', t: 'U17: Maremola — Bordighera · Sab 31/10 17:00', up: true },
    { k: 'DR2', t: 'Esordio ad Alassio · Dom 08/11 19:30', up: true },
    { k: 'U14 Femm.', t: 'Trasferta a Lerici · Dom 08/11 14:00' },
    { k: 'PalaMaremola', t: 'Viale Repubblica 74 · Ingresso libero' },
    { k: 'Under 17', t: 'Stagione 2026/27 al via', up: true },
    { k: 'Tesseramenti', t: 'Stagione 26/27 · Iscrizioni aperte' }
  ];
  var track = document.getElementById('ticker');
  if (track) {
    var html = feed.map(function (i) {
      return '<span class="ticker-item"><span class="k">' + i.k + '</span> <span class="' +
        (i.up ? 'up' : '') + '">' + i.t + '</span></span>';
    }).join('');
    track.innerHTML = html + html; // duplicate for seamless -50% loop
  }

  /* ── ROSTER (2K-style player cards) ── */
  var rosters = {
    prima: [
      { n: 'M. Ferro', r: 'Playmaker', pos: 'PG', num: 4, ovr: 86, cap: true, st: [['PT', 18], ['AS', 7], ['3P', 41]] },
      { n: 'L. Conti', r: 'Ala grande', pos: 'PF', num: 11, ovr: 84, st: [['PT', 14], ['RB', 9], ['ST', 2]] },
      { n: 'D. Russo', r: 'Guardia', pos: 'SG', num: 8, ovr: 82, st: [['PT', 16], ['3P', 38], ['AS', 4]] },
      { n: 'A. Bianchi', r: 'Centro', pos: 'C', num: 23, ovr: 81, st: [['PT', 12], ['RB', 11], ['BS', 2]] },
      { n: 'G. Marino', r: 'Ala piccola', pos: 'SF', num: 7, ovr: 79, st: [['PT', 13], ['RB', 6], ['AS', 3]] },
      { n: 'S. Greco', r: 'Guardia', pos: 'SG', num: 15, ovr: 77, st: [['PT', 9], ['3P', 35], ['ST', 1]] },
      { n: 'F. Costa', r: 'Playmaker', pos: 'PG', num: 3, ovr: 76, st: [['PT', 7], ['AS', 5], ['ST', 2]] },
      { n: 'R. Esposito', r: 'Centro', pos: 'C', num: 33, ovr: 75, st: [['PT', 8], ['RB', 8], ['BS', 1]] }
    ],
    under: [
      { n: 'T. Riva', r: 'Playmaker', pos: 'PG', num: 5, ovr: 74, cap: true, st: [['PT', 15], ['AS', 6], ['3P', 33]] },
      { n: 'N. Galli', r: 'Ala', pos: 'SF', num: 9, ovr: 72, st: [['PT', 13], ['RB', 7], ['ST', 2]] },
      { n: 'E. Moretti', r: 'Guardia', pos: 'SG', num: 12, ovr: 71, st: [['PT', 12], ['3P', 31], ['AS', 3]] },
      { n: 'P. Villa', r: 'Centro', pos: 'C', num: 21, ovr: 70, st: [['PT', 10], ['RB', 10], ['BS', 2]] },
      { n: 'C. Sala', r: 'Ala grande', pos: 'PF', num: 14, ovr: 69, st: [['PT', 9], ['RB', 8], ['ST', 1]] },
      { n: 'M. Lombardi', r: 'Guardia', pos: 'SG', num: 6, ovr: 68, st: [['PT', 8], ['3P', 29], ['AS', 2]] }
    ],
    mini: [
      { n: 'Aquilotti', r: '2015 — 2016', pos: 'U8', num: 0, ovr: 99, cap: true, st: [['DIV', 18], ['👟', 2], ['🏀', 1]] },
      { n: 'Scoiattoli', r: '2017 — 2018', pos: 'U7', num: 0, ovr: 99, st: [['DIV', 22], ['👟', 2], ['🏀', 1]] },
      { n: 'Pulcini', r: '2019', pos: 'U6', num: 0, ovr: 99, st: [['DIV', 14], ['👟', 2], ['🏀', 1]] }
    ]
  };

  var rosterTeamPhoto = document.getElementById('rosterTeamPhoto');
  var grid = document.getElementById('rosterGrid');
  function renderRoster(key) {
    if (!grid) return;
    if (rosterTeamPhoto) {
      if (key === 'under') {
        rosterTeamPhoto.classList.remove('hidden');
      } else {
        rosterTeamPhoto.classList.add('hidden');
      }
    }
    var list = rosters[key] || [];
    grid.innerHTML = list.map(function (p) {
      var stats = p.st.map(function (s) {
        return '<div class="pstat"><b>' + s[1] + '</b><span>' + s[0] + '</span></div>';
      }).join('');
      var num = p.num > 0 ? p.num : '🏀';
      return '<article class="pcard">' +
        (p.cap ? '<span class="captain-flag">' + (key === 'mini' ? 'Squad' : 'Capitano') + '</span>' : '') +
        '<div class="pcard-top">' +
          '<div class="ovr"><b>' + p.ovr + '</b><span>OVR</span></div>' +
          '<span class="pos">' + p.pos + '</span>' +
        '</div>' +
        '<div class="pnum">' + num + '</div>' +
        '<div class="pcard-body">' +
          '<div class="pname">' + p.n + '<small>' + p.r + '</small></div>' +
          '<div class="pstats">' + stats + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    // micro stagger-in
    Array.prototype.forEach.call(grid.children, function (el, i) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1)';
      setTimeout(function () { el.style.opacity = 1; el.style.transform = 'none'; }, 40 + i * 45);
    });
  }
  renderRoster('prima');

  var tabs = document.querySelectorAll('.tab[data-roster]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      t.setAttribute('aria-selected', 'true');
      renderRoster(t.getAttribute('data-roster'));
    });
  });

  /* ── CALENDARI COMPONENT ── */
  var currentCalCat = 'all';
  var currentCalFilter = 'all';
  var calGrid = document.getElementById('calGrid');
  var calDlBtn = document.getElementById('calDownloadBtn');

  var pdfMap = {
    dr2: 'assets/calendari/calendario-dr2-2026-2027.pdf',
    u17: 'assets/calendari/calendario-u17-2026-2027.pdf',
    u14f: 'assets/calendari/calendario-u14f-2026-2027.pdf',
    all: 'assets/calendari/calendario-dr2-2026-2027.pdf'
  };

  function renderCalendar(cat, filter) {
    if (!calGrid) return;
    currentCalCat = cat || currentCalCat;
    currentCalFilter = filter || currentCalFilter;

    if (calDlBtn && pdfMap[currentCalCat]) {
      calDlBtn.setAttribute('href', pdfMap[currentCalCat]);
    }

    var now = Date.now();
    var list = (allMatches || []).filter(function (m) {
      if (currentCalCat !== 'all' && m.category !== currentCalCat) return false;
      if (currentCalFilter === 'andata' && m.phase !== 'andata') return false;
      if (currentCalFilter === 'ritorno' && m.phase !== 'ritorno') return false;
      if (currentCalFilter === 'home' && (!m.isHome || m.bye)) return false;
      return true;
    });

    if (!list.length) {
      calGrid.innerHTML = '<div class="mcard bye"><div class="mcard-bye-title">Nessuna partita trovata</div><div class="mcard-bye-sub">Prova a selezionare un altro filtro</div></div>';
      return;
    }

    calGrid.innerHTML = list.map(function (m) {
      if (m.bye) {
        return '<article class="mcard bye">' +
          '<div class="mcard-meta"><span class="mcard-cat">' + m.categoryShort + '</span> <span class="mcard-phase">' + m.phaseName + ' · G' + m.round + '</span></div>' +
          '<div class="mcard-bye-title">TURNO DI RIPOSO</div>' +
          '<div class="mcard-bye-sub">Nessun match ufficiale in questa giornata</div>' +
        '</article>';
      }

      var matchTime = new Date(m.datetime).getTime();
      var isNext = nextMatch && nextMatch.id === m.id;
      var isPast = matchTime < now - 2 * 3600 * 1000;
      var d = m.date.split('-');
      var dayMonth = d[2] + '/' + d[1];

      return '<article class="mcard' + (isNext ? ' next' : '') + (isPast ? ' past' : '') + '">' +
        '<div class="mcard-top">' +
          '<div class="mcard-meta">' +
            '<span class="mcard-cat">' + m.categoryShort + '</span>' +
            '<span class="mcard-phase">' + (m.phase === 'andata' ? 'AND' : 'RIT') + ' · G' + m.round + '</span>' +
          '</div>' +
          (isNext ? '<span class="pill pill-live"><span class="dot-live"></span> PROSSIMA</span>' : '<span class="mcard-code">GARA #' + m.code + '</span>') +
        '</div>' +
        '<div class="mcard-teams">' +
          '<div class="mcard-team ' + (m.isHome ? 'home-highlight' : '') + '">' +
            '<div class="mcard-crest">' + m.homeCrest + '</div>' +
            '<b>' + m.home + '</b>' +
            '<span class="badge-tag ' + (m.isHome ? 'home' : 'away') + '">' + (m.isHome ? 'CASA' : 'OSP') + '</span>' +
          '</div>' +
          '<div class="mcard-vs">VS</div>' +
          '<div class="mcard-team ' + (!m.isHome ? 'home-highlight' : '') + '">' +
            '<div class="mcard-crest">' + m.awayCrest + '</div>' +
            '<b>' + m.away + '</b>' +
            '<span class="badge-tag ' + (!m.isHome ? 'home' : 'away') + '">' + (!m.isHome ? 'CASA' : 'TRASF') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="mcard-foot">' +
          '<span class="mcard-when">' + m.day + ' ' + dayMonth + ' · ' + m.time + '</span>' +
          '<span class="mcard-loc" title="' + m.location + '">' + m.location + '</span>' +
        '</div>' +
      '</article>';
    }).join('');

    Array.prototype.forEach.call(calGrid.children, function (el, i) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .35s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1)';
      setTimeout(function () { el.style.opacity = 1; el.style.transform = 'none'; }, 20 + Math.min(i, 14) * 25);
    });
  }

  renderCalendar('all', 'all');

  var calTabs = document.querySelectorAll('.tab[data-cal]');
  calTabs.forEach(function (t) {
    t.addEventListener('click', function () {
      calTabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      t.setAttribute('aria-selected', 'true');
      renderCalendar(t.getAttribute('data-cal'), currentCalFilter);
    });
  });

  var calFilters = document.querySelectorAll('.cal-filter[data-filter]');
  calFilters.forEach(function (f) {
    f.addEventListener('click', function () {
      calFilters.forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
      renderCalendar(currentCalCat, f.getAttribute('data-filter'));
    });
  });

  /* ── COUNT-UP for hero meta ── */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var b = el.querySelector('b');
    if (!b || isNaN(target)) return;
    var suffix = /\+/.test(b.textContent) ? '+' : '';
    var start = null, dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var prog = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - prog, 3);
      b.textContent = Math.round(target * eased) + (prog === 1 ? suffix : '');
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── REVEAL + count-up on scroll ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (e.target.classList.contains('hero-meta')) {
          e.target.querySelectorAll('.m').forEach(countUp);
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  var heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) io.observe(heroMeta);

  /* ── ACTIVE NAV on scroll ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = '#' + e.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { if (s) spy.observe(s); });

  /* ── MOBILE MENU ── */
  var burger = document.getElementById('burger');
  var hud = document.getElementById('hud');
  if (burger && hud) {
    burger.addEventListener('click', function () { hud.classList.toggle('open'); });
    hud.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { hud.classList.remove('open'); });
    });
  }

  /* ── LIVE OFFCANVAS ── */
  var liveToggle = document.getElementById('liveToggle');
  var liveOffcanvas = document.getElementById('liveOffcanvas');
  var liveClose = document.getElementById('liveClose');
  var liveBackdrop = document.getElementById('liveBackdrop');
  var liveFrame = document.getElementById('liveFrame');
  var lastFocus = null;

  function startLiveFrame() {
    if (!liveFrame) return;
    var src = liveFrame.getAttribute('data-src');
    if (src && liveFrame.getAttribute('src') !== src) {
      liveFrame.setAttribute('src', src);
    }
  }

  function stopLiveFrame() {
    if (!liveFrame) return;
    liveFrame.removeAttribute('src');
  }

  function openLiveOffcanvas() {
    if (!liveOffcanvas) return;
    lastFocus = document.activeElement;
    liveOffcanvas.classList.add('open');
    liveOffcanvas.setAttribute('aria-hidden', 'false');
    document.body.classList.add('live-open');
    if (liveToggle) liveToggle.setAttribute('aria-expanded', 'true');
    startLiveFrame();
    if (liveClose) liveClose.focus();
  }

  function closeLiveOffcanvas() {
    if (!liveOffcanvas || !liveOffcanvas.classList.contains('open')) return;
    liveOffcanvas.classList.remove('open');
    liveOffcanvas.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('live-open');
    if (liveToggle) liveToggle.setAttribute('aria-expanded', 'false');
    stopLiveFrame();
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  if (liveToggle && liveOffcanvas) {
    liveToggle.addEventListener('click', function () {
      if (liveOffcanvas.classList.contains('open')) {
        closeLiveOffcanvas();
      } else {
        openLiveOffcanvas();
      }
    });
  }

  if (liveClose) {
    liveClose.addEventListener('click', closeLiveOffcanvas);
  }

  if (liveBackdrop) {
    liveBackdrop.addEventListener('click', closeLiveOffcanvas);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLiveOffcanvas();
    }
  });
})();
