/**
 * Sample / Prototype Data
 * Not official government or council information.
 * phone and adminComment are only visible in the Admin panel.
 */

const sampleReports = [
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

export default sampleReports;
