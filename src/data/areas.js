/**
 * Default hierarchical area data.
 * Admins can add districts and sub-areas at runtime via the Admin panel.
 * This data is Sample / Prototype Data only.
 */

const DEFAULT_AREAS = [
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

export default DEFAULT_AREAS;
