/**
 * CleanRoute Initial Store Data
 * Sample / Prototype Data - Not official government data.
 */

export const initialAreas = [
  {
    id: 1,
    district: "Malabe",
    subAreas: [
      { id: 11, name: "Malabe Town" },
      { id: 12, name: "Thalawathugoda" },
      { id: 13, name: "Koswatta" },
      { id: 14, name: "Athurugiriya" },
    ],
  },
  {
    id: 2,
    district: "Kaduwela",
    subAreas: [
      { id: 21, name: "Kaduwela Town" },
      { id: 22, name: "Mulleriyawa" },
      { id: 23, name: "Angoda" },
      { id: 24, name: "Kolonnawa" },
    ],
  },
  {
    id: 3,
    district: "Battaramulla",
    subAreas: [
      { id: 31, name: "Battaramulla Town" },
      { id: 32, name: "Sri Jayawardenepura Kotte" },
      { id: 33, name: "Pelawatta" },
      { id: 34, name: "Koswattha" },
    ],
  },
  {
    id: 4,
    district: "Maharagama",
    subAreas: [
      { id: 41, name: "Maharagama Town" },
      { id: 42, name: "Boralesgamuwa" },
      { id: 43, name: "Nugegoda" },
      { id: 44, name: "Piliyandala" },
    ],
  },
];

export const initialSchedules = [
  {
    id: 1,
    district: "Malabe",
    area: "Malabe Town",
    lastCollectedDate: "2026-09-01",
    nextCollectionDate: "2026-09-08",
  },
  {
    id: 2,
    district: "Malabe",
    area: "Thalawathugoda",
    lastCollectedDate: "2026-09-01",
    nextCollectionDate: "2026-09-08",
  },
  {
    id: 3,
    district: "Kaduwela",
    area: "Kaduwela Town",
    lastCollectedDate: "2026-09-02",
    nextCollectionDate: "2026-09-09",
  },
  {
    id: 4,
    district: "Kaduwela",
    area: "Mulleriyawa",
    lastCollectedDate: "2026-09-03",
    nextCollectionDate: "2026-09-10",
  },
  {
    id: 5,
    district: "Battaramulla",
    area: "Battaramulla Town",
    lastCollectedDate: "2026-09-03",
    nextCollectionDate: "2026-09-10",
  },
  {
    id: 6,
    district: "Maharagama",
    area: "Maharagama Town",
    lastCollectedDate: "2026-09-04",
    nextCollectionDate: "2026-09-11",
  },
];

export const initialReports = [
  {
    id: 1,
    district: "Malabe",
    area: "Malabe Town",
    collectionDate: "2026-09-08",
    description: "Garbage truck did not arrive on the scheduled collection day.",
    phone: "0771234567",
    status: "Pending",
    adminComment: "",
  },
  {
    id: 2,
    district: "Kaduwela",
    area: "Kaduwela Town",
    collectionDate: "2026-09-02",
    description: "Scheduled collection was missed. Waste is overflowing from bins.",
    phone: "0712345678",
    status: "Resolved",
    adminComment: "Collection team dispatched on 04 Sep. Issue has been resolved.",
  },
  {
    id: 3,
    district: "Battaramulla",
    area: "Battaramulla Town",
    collectionDate: "2026-09-03",
    description: "Waste collection truck passed by without collecting from our street.",
    phone: "0761112233",
    status: "Pending",
    adminComment: "",
  },
  {
    id: 4,
    district: "Maharagama",
    area: "Maharagama Town",
    collectionDate: "2026-09-04",
    description: "No collection service was provided this week in our neighbourhood.",
    phone: "0754456789",
    status: "Resolved",
    adminComment: "Verified with local team. Extra round scheduled and completed.",
  },
  {
    id: 5,
    district: "Malabe",
    area: "Thalawathugoda",
    collectionDate: "2026-09-01",
    description: "Collection was skipped for the second consecutive week.",
    phone: "0779988776",
    status: "Pending",
    adminComment: "",
  },
];

// In-memory data store for clean REST operations
export const dataStore = {
  areas: [...initialAreas],
  schedules: [...initialSchedules],
  reports: [...initialReports],
};
