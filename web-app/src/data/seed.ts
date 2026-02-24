import type { Asset, SANRecord, SANReturn, TransactionLog } from '@/types';

interface SeedData {
  assets: Asset[];
  sans: SANRecord[];
  returns: SANReturn[];
  transactions: TransactionLog[];
}

export const seedData: SeedData = {
  "assets": [
    {
      "id": "asset-0001",
      "item": "Desktop Mini G9",
      "lastCount": 60,
      "newCount": 62,
      "threshold": 10,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0002",
      "item": "Dock Thunderbolt Slim",
      "lastCount": 18,
      "newCount": 19,
      "threshold": 4,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0003",
      "item": "Dock Thunderbolt G2",
      "lastCount": 3,
      "newCount": 9,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0004",
      "item": "Dock Thunderbolt G4",
      "lastCount": 78,
      "newCount": 75,
      "threshold": 20,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0005",
      "item": "Laptop 840 G10",
      "lastCount": 43,
      "newCount": 45,
      "threshold": 30,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0006",
      "item": "Laptop 840 G9",
      "lastCount": 8,
      "newCount": 8,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0007",
      "item": "Laptop Bag",
      "lastCount": 16,
      "newCount": 28,
      "threshold": 10,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0008",
      "item": "Laptop Charger",
      "lastCount": 498,
      "newCount": 98,
      "threshold": 10,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0009",
      "item": "Laptop x360 G8",
      "lastCount": 22,
      "newCount": 22,
      "threshold": 4,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0010",
      "item": "Monitor 24\"",
      "lastCount": 9,
      "newCount": 6,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0011",
      "item": "Monitor 34\" Ultrawide",
      "lastCount": 9,
      "newCount": 7,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0012",
      "item": "USB DVD-RW Drive",
      "lastCount": 12,
      "newCount": 8,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0013",
      "item": "Wired Headset Poly",
      "lastCount": 78,
      "newCount": 75,
      "threshold": 20,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0014",
      "item": "Wired Keyboard",
      "lastCount": 44,
      "newCount": 47,
      "threshold": 20,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0015",
      "item": "Wired Mouse",
      "lastCount": 48,
      "newCount": 51,
      "threshold": 20,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0016",
      "item": "Wireless Headset Poly",
      "lastCount": 18,
      "newCount": 20,
      "threshold": 4,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0017",
      "item": "Wireless KB & Mouse",
      "lastCount": 9,
      "newCount": 7,
      "threshold": 3,
      "location": "basement-4.2"
    },
    {
      "id": "asset-0018",
      "item": "Desktop Mini G9",
      "lastCount": 4,
      "newCount": 7,
      "threshold": 10,
      "location": "build-room"
    },
    {
      "id": "asset-0019",
      "item": "Dock Thunderbolt Slim",
      "lastCount": 1,
      "newCount": 6,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0020",
      "item": "Dock Thunderbolt G2",
      "lastCount": 0,
      "newCount": 1,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0021",
      "item": "Dock Thunderbolt G4",
      "lastCount": 0,
      "newCount": 3,
      "threshold": 20,
      "location": "build-room"
    },
    {
      "id": "asset-0022",
      "item": "Laptop 840 G10",
      "lastCount": 6,
      "newCount": 8,
      "threshold": 30,
      "location": "build-room"
    },
    {
      "id": "asset-0023",
      "item": "Laptop 840 G9",
      "lastCount": 3,
      "newCount": 2,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0024",
      "item": "Laptop Bag",
      "lastCount": 0,
      "newCount": 25,
      "threshold": 10,
      "location": "build-room"
    },
    {
      "id": "asset-0025",
      "item": "Laptop Charger",
      "lastCount": 5,
      "newCount": 35,
      "threshold": 10,
      "location": "build-room"
    },
    {
      "id": "asset-0026",
      "item": "Laptop x360 G8",
      "lastCount": 0,
      "newCount": 4,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0027",
      "item": "Monitor 24\"",
      "lastCount": 53,
      "newCount": 28,
      "threshold": 6,
      "location": "build-room"
    },
    {
      "id": "asset-0028",
      "item": "Monitor 34\" Ultrawide",
      "lastCount": 0,
      "newCount": 5,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0029",
      "item": "USB DVD-RW Drive",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 5,
      "location": "build-room"
    },
    {
      "id": "asset-0030",
      "item": "Wired Headset Poly",
      "lastCount": 0,
      "newCount": 10,
      "threshold": 20,
      "location": "build-room"
    },
    {
      "id": "asset-0031",
      "item": "Wired Keyboard",
      "lastCount": 9,
      "newCount": 12,
      "threshold": 20,
      "location": "build-room"
    },
    {
      "id": "asset-0032",
      "item": "Wired Mouse",
      "lastCount": 34,
      "newCount": 19,
      "threshold": 20,
      "location": "build-room"
    },
    {
      "id": "asset-0033",
      "item": "Wireless Headset Poly",
      "lastCount": 3,
      "newCount": 4,
      "threshold": 3,
      "location": "build-room"
    },
    {
      "id": "asset-0034",
      "item": "Wireless KB & Mouse",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 5,
      "location": "build-room"
    },
    {
      "id": "asset-0035",
      "item": "Desktop Mini G9",
      "lastCount": 4,
      "newCount": 8,
      "threshold": 10,
      "location": "darwin"
    },
    {
      "id": "asset-0036",
      "item": "Dock Thunderbolt Slim",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 5,
      "location": "darwin"
    },
    {
      "id": "asset-0037",
      "item": "Dock Thunderbolt G2",
      "lastCount": 0,
      "newCount": 25,
      "threshold": 5,
      "location": "darwin"
    },
    {
      "id": "asset-0038",
      "item": "Dock Thunderbolt G4",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 20,
      "location": "darwin"
    },
    {
      "id": "asset-0039",
      "item": "Laptop 840 G10",
      "lastCount": 0,
      "newCount": 2,
      "threshold": 30,
      "location": "darwin"
    },
    {
      "id": "asset-0040",
      "item": "Laptop 840 G9",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 5,
      "location": "darwin"
    },
    {
      "id": "asset-0041",
      "item": "Laptop Bag",
      "lastCount": 10,
      "newCount": 9,
      "threshold": 10,
      "location": "darwin"
    },
    {
      "id": "asset-0042",
      "item": "Laptop Charger",
      "lastCount": 0,
      "newCount": 30,
      "threshold": 10,
      "location": "darwin"
    },
    {
      "id": "asset-0043",
      "item": "Laptop x360 G8",
      "lastCount": 0,
      "newCount": 3,
      "threshold": 3,
      "location": "darwin"
    },
    {
      "id": "asset-0044",
      "item": "Monitor 24\"",
      "lastCount": 54,
      "newCount": 52,
      "threshold": 10,
      "location": "darwin"
    },
    {
      "id": "asset-0045",
      "item": "Monitor 34\" Ultrawide",
      "lastCount": 0,
      "newCount": 30,
      "threshold": 6,
      "location": "darwin"
    },
    {
      "id": "asset-0046",
      "item": "USB DVD-RW Drive",
      "lastCount": 0,
      "newCount": 30,
      "threshold": 6,
      "location": "darwin"
    },
    {
      "id": "asset-0047",
      "item": "Wired Headset Poly",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 20,
      "location": "darwin"
    },
    {
      "id": "asset-0048",
      "item": "Wired Keyboard",
      "lastCount": 0,
      "newCount": 30,
      "threshold": 20,
      "location": "darwin"
    },
    {
      "id": "asset-0049",
      "item": "Wired Mouse",
      "lastCount": 0,
      "newCount": 24,
      "threshold": 20,
      "location": "darwin"
    },
    {
      "id": "asset-0050",
      "item": "Wireless Headset Poly",
      "lastCount": 0,
      "newCount": 4,
      "threshold": 3,
      "location": "darwin"
    },
    {
      "id": "asset-0051",
      "item": "Wireless KB & Mouse",
      "lastCount": 0,
      "newCount": 0,
      "threshold": 5,
      "location": "darwin"
    },
    {
      "id": "asset-0052",
      "item": "Laptop 840 G6",
      "lastCount": 15,
      "newCount": 39,
      "threshold": 8,
      "location": "level-17"
    },
    {
      "id": "asset-0053",
      "item": "Monitor 24\"",
      "lastCount": 3,
      "newCount": 27,
      "threshold": 5,
      "location": "level-17"
    },
    {
      "id": "asset-0054",
      "item": "Monitor 34\" Ultrawide",
      "lastCount": 30,
      "newCount": 25,
      "threshold": 5,
      "location": "level-17"
    },
    {
      "id": "asset-0055",
      "item": "Laptop 840 G6",
      "lastCount": 2,
      "newCount": 4,
      "threshold": 3,
      "location": "basement-4.3"
    }
  ],
  "sans": [
    {
      "sanNumber": "SAN125045",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:29:34",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125047",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:29:47",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125043",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:29:53",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125067",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:29:56",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125078",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:01",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125060",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:05",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125059",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:11",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125065",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:17",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125063",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:23",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125064",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:29",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125054",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:34",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125061",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:45",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125071",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:30:59",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125072",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:31:09",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125053",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:31:14",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125077",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:31:23",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125076",
      "item": "Desktop Mini G9",
      "timestamp": "2024-01-10T16:31:28",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122589",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:39:28",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122596",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:39:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122603",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:39:40",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122611",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:39:47",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122590",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:39:53",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122593",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:40:16",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122597",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:40:40",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122602",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:40:49",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122610",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:40:53",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122599",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:40:58",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122592",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:03",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122607",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:08",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122608",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:15",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122598",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:20",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122591",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:26",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122613",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:42",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122604",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:41:50",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122605",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:42:01",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122606",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:42:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122601",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:42:13",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122595",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:42:19",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122609",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:43:15",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122594",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:43:21",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122612",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:43:39",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122304",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:43:46",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122305",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:43:53",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122600",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-10T16:44:23",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN121911",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN120358",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:19",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN121929",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:29",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN121895",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:38",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN120286",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:46",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN120342",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-10T16:50:57",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106013",
      "item": "Laptop x360 G8",
      "timestamp": "2024-01-10T16:51:46",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106014",
      "item": "Laptop x360 G8",
      "timestamp": "2024-01-10T16:52:00",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106026",
      "item": "Laptop x360 G8",
      "timestamp": "2024-01-10T16:52:08",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106008",
      "item": "Laptop x360 G8",
      "timestamp": "2024-01-10T16:52:17",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN111111",
      "item": "Laptop 840 G10",
      "timestamp": "2024-01-11T12:06:10",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN120950",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-12T10:54:13",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN120864",
      "item": "Laptop 840 G9",
      "timestamp": "2024-01-12T10:54:20",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN467985",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T19:51:04",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN154856",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T19:51:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN354687",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-04T19:51:17",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN868686",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T20:27:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN474747",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T20:27:21",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN32323",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:00:10",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN387876",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:17:22",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN747474",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:17:31",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN737373",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:18:36",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN85685",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-04T21:19:02",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN353535",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:20:50",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN777777",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:20:57",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN153759",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:22:59",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN080808",
      "item": "Laptop 840 G9",
      "timestamp": "2024-02-04T21:23:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN255443",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:23:51",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN323232",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:24:49",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN111888",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:26:23",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN797979",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T21:53:39",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN323233",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T22:25:08",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN632546",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-04T22:25:21",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN642456",
      "item": "Laptop 840 G9",
      "timestamp": "2024-02-04T22:25:28",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN55555",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-04T23:26:30",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN43434",
      "item": "Laptop 840 G9",
      "timestamp": "2024-02-05T07:51:00",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN123445",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-12T20:40:06",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN455667",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-12T20:40:26",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN333345",
      "item": "Laptop 840 G10",
      "timestamp": "2024-02-12T20:40:34",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN343434",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-19T08:21:12",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN333666",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-21T00:26:26",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN565656",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-21T06:38:56",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN132435",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-21T06:52:21",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN222444",
      "item": "Laptop 840 G9",
      "timestamp": "2024-02-21T06:52:44",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN112233",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-21T07:57:42",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN344556",
      "item": "Desktop Mini G9",
      "timestamp": "2024-02-21T07:57:46",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN345678",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:14:29",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN876543",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:14:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN345677",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:14:48",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN777776",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:14:58",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN888887",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:15:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN777666",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:15:10",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN666555",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:15:22",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN555666",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-08T20:15:24",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN122211",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-09T23:49:28",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN36365",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-09T23:49:38",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN555555",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-09T23:50:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN685968",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T10:12:10",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN494948",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T10:12:16",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN484948",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T10:12:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN494849",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T10:12:36",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN484847",
      "item": "Laptop x360 G8",
      "timestamp": "2024-03-10T10:36:53",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN232324",
      "item": "Laptop x360 G8",
      "timestamp": "2024-03-10T10:36:57",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN696969",
      "item": "Laptop 840 G9",
      "timestamp": "2024-03-10T10:37:16",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN686868",
      "item": "Laptop 840 G9",
      "timestamp": "2024-03-10T10:37:20",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN232334",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T15:07:05",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN565667",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T15:07:07",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN787889",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T15:07:10",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN787845",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T15:11:29",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN464643",
      "item": "Laptop 840 G10",
      "timestamp": "2024-03-10T15:11:45",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN161613",
      "item": "Laptop 840 G10",
      "timestamp": "2024-03-10T15:11:48",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN484846",
      "item": "Laptop 840 G10",
      "timestamp": "2024-03-10T15:12:05",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN008855",
      "item": "Desktop Mini G9",
      "timestamp": "2024-03-10T15:26:09",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125998",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T13:16:43",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125999",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T13:16:47",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN126998",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T14:54:43",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN126999",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T14:54:47",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN126985",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T14:56:48",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN127888",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:10:21",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN125447",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:10:36",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN222222",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:10:43",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN333333",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:10:47",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN456545",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:28:26",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN555554",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:28:34",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN353634",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:28:38",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN444455",
      "item": "Desktop Mini G9",
      "timestamp": "2024-11-17T18:28:40",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN444444",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T18:44:41",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN343435",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T18:49:44",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN555444",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T18:49:46",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN45453",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T18:49:54",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN456753",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:52:31",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN111567",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:52:32",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN494946",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:52:37",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN166544",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:52:40",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN493574",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:56:13",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN165478",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:56:16",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN254687",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:56:18",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN264578",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T18:56:19",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN482659",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T19:03:41",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN356784",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T19:03:43",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN154687",
      "item": "Laptop x360 G8",
      "timestamp": "2024-11-17T19:03:45",
      "location": "darwin"
    },
    {
      "sanNumber": "SAN457865",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T20:05:59",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125335",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T23:27:40",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN125448",
      "item": "Laptop 840 G10",
      "timestamp": "2024-11-17T23:27:42",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN105223",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T11:37:39",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN105224",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T11:37:42",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN105221",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T11:47:41",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN105222",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T11:47:47",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106335",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T11:51:28",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN106336",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T11:51:36",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN108852",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T12:55:39",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN108853",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T12:55:48",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN102152",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T12:59:43",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN102102",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T12:59:49",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN102103",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T13:02:31",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN102104",
      "item": "Laptop 840 G10",
      "timestamp": "2025-06-28T13:02:34",
      "location": "basement-4.2"
    },
    {
      "sanNumber": "SAN103666",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T13:07:00",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN103667",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T13:07:04",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN103668",
      "item": "Desktop Mini G9",
      "timestamp": "2025-06-28T13:07:11",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN104402",
      "item": "Laptop x360 G8",
      "timestamp": "2025-06-28T13:10:37",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN104403",
      "item": "Laptop x360 G8",
      "timestamp": "2025-06-28T13:10:41",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN104404",
      "item": "Laptop x360 G8",
      "timestamp": "2025-06-28T13:10:52",
      "location": "build-room"
    },
    {
      "sanNumber": "SAN104405",
      "item": "Laptop x360 G8",
      "timestamp": "2025-06-28T13:10:54",
      "location": "build-room"
    }
  ],
  "returns": [
    {
      "id": "ret-0001",
      "sanNumber": "123456",
      "generation": "G10",
      "returnedBy": "omuma",
      "returnedTo": "tylle",
      "notes": "",
      "timestamp": "2024-11-18T22:25:08"
    },
    {
      "id": "ret-0002",
      "sanNumber": "111112",
      "generation": "G10",
      "returnedBy": "ewew",
      "returnedTo": "wewe",
      "notes": "",
      "timestamp": "2024-11-18T22:26:14"
    },
    {
      "id": "ret-0003",
      "sanNumber": "123456",
      "generation": "G10",
      "returnedBy": "ihihg",
      "returnedTo": "huhuh",
      "notes": "Test One Test Two Test",
      "timestamp": "2024-11-18T22:28:48"
    },
    {
      "id": "ret-0004",
      "sanNumber": "124564",
      "generation": "G10",
      "returnedBy": "omumv",
      "returnedTo": "omumf",
      "notes": "",
      "timestamp": "2024-11-18T22:55:28"
    },
    {
      "id": "ret-0005",
      "sanNumber": "343535",
      "generation": "G10",
      "returnedBy": "sdfsd",
      "returnedTo": "gfdg",
      "notes": "dfgfdg",
      "timestamp": "2024-11-18T23:03:02"
    },
    {
      "id": "ret-0006",
      "sanNumber": "efef",
      "generation": "G10",
      "returnedBy": "efef",
      "returnedTo": "fefe",
      "notes": "ffef",
      "timestamp": "2024-11-18T23:03:27"
    },
    {
      "id": "ret-0007",
      "sanNumber": "234567",
      "generation": "G10",
      "returnedBy": "dfderer",
      "returnedTo": "dfdfdf",
      "notes": "fdf",
      "timestamp": "2024-11-18T23:10:56"
    }
  ],
  "transactions": [
    {
      "id": "txn-0120",
      "timestamp": "2025-06-28T13:10:55",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 4,
      "location": "build-room"
    },
    {
      "id": "txn-0119",
      "timestamp": "2025-06-28T13:10:54",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN104405"
    },
    {
      "id": "txn-0118",
      "timestamp": "2025-06-28T13:10:52",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN104404"
    },
    {
      "id": "txn-0117",
      "timestamp": "2025-06-28T13:10:41",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN104403"
    },
    {
      "id": "txn-0116",
      "timestamp": "2025-06-28T13:10:37",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN104402"
    },
    {
      "id": "txn-0115",
      "timestamp": "2025-06-28T13:10:22",
      "item": "Wired Keyboard",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0070",
      "timestamp": "2025-06-28T13:10:12",
      "item": "Monitor 24\"",
      "action": "subtract",
      "volume": 3,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0113",
      "timestamp": "2025-06-28T13:07:11",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN103668"
    },
    {
      "id": "txn-0114",
      "timestamp": "2025-06-28T13:07:11",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0112",
      "timestamp": "2025-06-28T13:07:04",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN103667"
    },
    {
      "id": "txn-0111",
      "timestamp": "2025-06-28T13:07:00",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN103666"
    },
    {
      "id": "txn-0110",
      "timestamp": "2025-06-28T13:06:51",
      "item": "Monitor 34\" Ultrawide",
      "action": "add",
      "volume": 5,
      "location": "build-room"
    },
    {
      "id": "txn-0069",
      "timestamp": "2025-06-28T13:06:44",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 12,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0067",
      "timestamp": "2025-06-28T13:02:34",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN102104"
    },
    {
      "id": "txn-0068",
      "timestamp": "2025-06-28T13:02:34",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0066",
      "timestamp": "2025-06-28T13:02:31",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN102103"
    },
    {
      "id": "txn-0065",
      "timestamp": "2025-06-28T13:02:21",
      "item": "Wired Mouse",
      "action": "add",
      "volume": 3,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0109",
      "timestamp": "2025-06-28T13:02:14",
      "item": "Monitor 24\"",
      "action": "subtract",
      "volume": 25,
      "location": "build-room"
    },
    {
      "id": "txn-0063",
      "timestamp": "2025-06-28T12:59:49",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN102102"
    },
    {
      "id": "txn-0064",
      "timestamp": "2025-06-28T12:59:49",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0062",
      "timestamp": "2025-06-28T12:59:43",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN102152"
    },
    {
      "id": "txn-0107",
      "timestamp": "2025-06-28T12:55:48",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN108853"
    },
    {
      "id": "txn-0108",
      "timestamp": "2025-06-28T12:55:48",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "build-room"
    },
    {
      "id": "txn-0106",
      "timestamp": "2025-06-28T12:55:39",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN108852"
    },
    {
      "id": "txn-0105",
      "timestamp": "2025-06-28T12:55:27",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 25,
      "location": "build-room"
    },
    {
      "id": "txn-0061",
      "timestamp": "2025-06-28T12:52:48",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 10,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0104",
      "timestamp": "2025-06-28T11:51:46",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 50,
      "location": "build-room"
    },
    {
      "id": "txn-0059",
      "timestamp": "2025-06-28T11:51:36",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN106336"
    },
    {
      "id": "txn-0060",
      "timestamp": "2025-06-28T11:51:36",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0058",
      "timestamp": "2025-06-28T11:51:28",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN106335"
    },
    {
      "id": "txn-0057",
      "timestamp": "2025-06-28T11:51:15",
      "item": "Laptop Bag",
      "action": "subtract",
      "volume": 20,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0056",
      "timestamp": "2025-06-28T11:47:48",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0055",
      "timestamp": "2025-06-28T11:47:47",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN105222"
    },
    {
      "id": "txn-0054",
      "timestamp": "2025-06-28T11:47:41",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN105221"
    },
    {
      "id": "txn-0053",
      "timestamp": "2025-06-28T11:46:58",
      "item": "Wired Mouse",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0052",
      "timestamp": "2025-06-28T11:46:53",
      "item": "Laptop Bag",
      "action": "subtract",
      "volume": 25,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0102",
      "timestamp": "2025-06-28T11:37:42",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN105224"
    },
    {
      "id": "txn-0103",
      "timestamp": "2025-06-28T11:37:42",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "build-room"
    },
    {
      "id": "txn-0101",
      "timestamp": "2025-06-28T11:37:39",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN105223"
    },
    {
      "id": "txn-0100",
      "timestamp": "2025-06-28T11:37:27",
      "item": "Wired Mouse",
      "action": "subtract",
      "volume": 15,
      "location": "build-room"
    },
    {
      "id": "txn-0051",
      "timestamp": "2025-06-28T11:37:16",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 7,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0154",
      "timestamp": "2025-06-27T20:45:23",
      "item": "Monitor 24\"",
      "action": "subtract",
      "volume": 2,
      "location": "darwin"
    },
    {
      "id": "txn-0099",
      "timestamp": "2025-06-27T20:45:16",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0098",
      "timestamp": "2025-06-27T00:16:59",
      "item": "Dock Thunderbolt G2",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0097",
      "timestamp": "2025-06-27T00:16:43",
      "item": "Dock Thunderbolt G4",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0050",
      "timestamp": "2024-11-19T23:10:18",
      "item": "Dock Thunderbolt G4",
      "action": "subtract",
      "volume": 3,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0049",
      "timestamp": "2024-11-18T22:30:49",
      "item": "Laptop Charger",
      "action": "subtract",
      "volume": 400,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0048",
      "timestamp": "2024-11-18T21:28:29",
      "item": "Laptop Charger",
      "action": "add",
      "volume": 456,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0162",
      "timestamp": "2024-11-17T23:48:42",
      "item": "Laptop 840 G6",
      "action": "add",
      "volume": 2,
      "location": "basement-4.3"
    },
    {
      "id": "txn-0047",
      "timestamp": "2024-11-17T23:27:43",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0046",
      "timestamp": "2024-11-17T23:27:42",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN125448"
    },
    {
      "id": "txn-0045",
      "timestamp": "2024-11-17T23:27:40",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN125335"
    },
    {
      "id": "txn-0043",
      "timestamp": "2024-11-17T20:05:59",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN457865"
    },
    {
      "id": "txn-0044",
      "timestamp": "2024-11-17T20:05:59",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0152",
      "timestamp": "2024-11-17T19:03:45",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN154687"
    },
    {
      "id": "txn-0153",
      "timestamp": "2024-11-17T19:03:45",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 3,
      "location": "darwin"
    },
    {
      "id": "txn-0151",
      "timestamp": "2024-11-17T19:03:43",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN356784"
    },
    {
      "id": "txn-0150",
      "timestamp": "2024-11-17T19:03:41",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN482659"
    },
    {
      "id": "txn-0042",
      "timestamp": "2024-11-17T18:59:55",
      "item": "Dock Thunderbolt G2",
      "action": "add",
      "volume": 6,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0041",
      "timestamp": "2024-11-17T18:56:20",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 4,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0040",
      "timestamp": "2024-11-17T18:56:19",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN264578"
    },
    {
      "id": "txn-0039",
      "timestamp": "2024-11-17T18:56:18",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN254687"
    },
    {
      "id": "txn-0038",
      "timestamp": "2024-11-17T18:56:16",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN165478"
    },
    {
      "id": "txn-0037",
      "timestamp": "2024-11-17T18:56:13",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN493574"
    },
    {
      "id": "txn-0035",
      "timestamp": "2024-11-17T18:52:40",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN166544"
    },
    {
      "id": "txn-0036",
      "timestamp": "2024-11-17T18:52:40",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 4,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0034",
      "timestamp": "2024-11-17T18:52:37",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN494946"
    },
    {
      "id": "txn-0033",
      "timestamp": "2024-11-17T18:52:32",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN111567"
    },
    {
      "id": "txn-0032",
      "timestamp": "2024-11-17T18:52:31",
      "item": "Laptop x360 G8",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN456753"
    },
    {
      "id": "txn-0095",
      "timestamp": "2024-11-17T18:49:54",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN45453"
    },
    {
      "id": "txn-0096",
      "timestamp": "2024-11-17T18:49:54",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0094",
      "timestamp": "2024-11-17T18:49:46",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN555444"
    },
    {
      "id": "txn-0093",
      "timestamp": "2024-11-17T18:49:44",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN343435"
    },
    {
      "id": "txn-0091",
      "timestamp": "2024-11-17T18:44:41",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN444444"
    },
    {
      "id": "txn-0092",
      "timestamp": "2024-11-17T18:44:41",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0160",
      "timestamp": "2024-11-17T18:43:14",
      "item": "Laptop 840 G6",
      "action": "add",
      "volume": 24,
      "location": "level-17"
    },
    {
      "id": "txn-0159",
      "timestamp": "2024-11-17T18:43:11",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 24,
      "location": "level-17"
    },
    {
      "id": "txn-0149",
      "timestamp": "2024-11-17T18:43:00",
      "item": "Wired Mouse",
      "action": "add",
      "volume": 24,
      "location": "darwin"
    },
    {
      "id": "txn-0148",
      "timestamp": "2024-11-17T18:42:55",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 24,
      "location": "darwin"
    },
    {
      "id": "txn-0031",
      "timestamp": "2024-11-17T18:29:29",
      "item": "Monitor 34\" Ultrawide",
      "action": "subtract",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0147",
      "timestamp": "2024-11-17T18:28:41",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 4,
      "location": "darwin"
    },
    {
      "id": "txn-0146",
      "timestamp": "2024-11-17T18:28:40",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN444455"
    },
    {
      "id": "txn-0145",
      "timestamp": "2024-11-17T18:28:38",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN353634"
    },
    {
      "id": "txn-0144",
      "timestamp": "2024-11-17T18:28:34",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN555554"
    },
    {
      "id": "txn-0143",
      "timestamp": "2024-11-17T18:28:26",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN456545"
    },
    {
      "id": "txn-0141",
      "timestamp": "2024-11-17T18:10:47",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN333333"
    },
    {
      "id": "txn-0142",
      "timestamp": "2024-11-17T18:10:47",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 3,
      "location": "darwin"
    },
    {
      "id": "txn-0140",
      "timestamp": "2024-11-17T18:10:43",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN222222"
    },
    {
      "id": "txn-0139",
      "timestamp": "2024-11-17T18:10:36",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN125447"
    },
    {
      "id": "txn-0138",
      "timestamp": "2024-11-17T18:10:21",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN127888"
    },
    {
      "id": "txn-0158",
      "timestamp": "2024-11-17T17:58:28",
      "item": "Monitor 34\" Ultrawide",
      "action": "subtract",
      "volume": 5,
      "location": "level-17"
    },
    {
      "id": "txn-0137",
      "timestamp": "2024-11-17T17:55:07",
      "item": "Wireless Headset Poly",
      "action": "add",
      "volume": 4,
      "location": "darwin"
    },
    {
      "id": "txn-0030",
      "timestamp": "2024-11-17T17:55:00",
      "item": "Dock Thunderbolt G4",
      "action": "add",
      "volume": 4,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0135",
      "timestamp": "2024-11-17T14:58:12",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN126987"
    },
    {
      "id": "txn-0136",
      "timestamp": "2024-11-17T14:58:12",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "darwin"
    },
    {
      "id": "txn-0134",
      "timestamp": "2024-11-17T14:56:49",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "darwin"
    },
    {
      "id": "txn-0133",
      "timestamp": "2024-11-17T14:56:48",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN126985"
    },
    {
      "id": "txn-0132",
      "timestamp": "2024-11-17T14:56:43",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN126987"
    },
    {
      "id": "txn-0130",
      "timestamp": "2024-11-17T14:54:47",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN126999"
    },
    {
      "id": "txn-0131",
      "timestamp": "2024-11-17T14:54:47",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "darwin"
    },
    {
      "id": "txn-0129",
      "timestamp": "2024-11-17T14:54:43",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "darwin",
      "sanNumber": "SAN126998"
    },
    {
      "id": "txn-0157",
      "timestamp": "2024-11-17T13:20:35",
      "item": "Laptop 840 G6",
      "action": "add",
      "volume": 15,
      "location": "level-17"
    },
    {
      "id": "txn-0156",
      "timestamp": "2024-11-17T13:20:29",
      "item": "Monitor 34\" Ultrawide",
      "action": "add",
      "volume": 30,
      "location": "level-17"
    },
    {
      "id": "txn-0128",
      "timestamp": "2024-11-17T13:20:12",
      "item": "Wired Keyboard",
      "action": "add",
      "volume": 30,
      "location": "darwin"
    },
    {
      "id": "txn-0127",
      "timestamp": "2024-11-17T13:20:11",
      "item": "USB DVD-RW Drive",
      "action": "add",
      "volume": 30,
      "location": "darwin"
    },
    {
      "id": "txn-0126",
      "timestamp": "2024-11-17T13:20:09",
      "item": "Monitor 34\" Ultrawide",
      "action": "add",
      "volume": 30,
      "location": "darwin"
    },
    {
      "id": "txn-0125",
      "timestamp": "2024-11-17T13:20:08",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 30,
      "location": "darwin"
    },
    {
      "id": "txn-0124",
      "timestamp": "2024-11-17T13:20:05",
      "item": "Laptop Charger",
      "action": "add",
      "volume": 30,
      "location": "darwin"
    },
    {
      "id": "txn-0090",
      "timestamp": "2024-11-17T13:19:57",
      "item": "Laptop Charger",
      "action": "add",
      "volume": 30,
      "location": "build-room"
    },
    {
      "id": "txn-0089",
      "timestamp": "2024-11-17T13:19:45",
      "item": "Laptop Charger",
      "action": "add",
      "volume": 5,
      "location": "build-room"
    },
    {
      "id": "txn-0028",
      "timestamp": "2024-11-17T13:16:47",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN125999"
    },
    {
      "id": "txn-0029",
      "timestamp": "2024-11-17T13:16:47",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0027",
      "timestamp": "2024-11-17T13:16:43",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN125998"
    },
    {
      "id": "txn-0155",
      "timestamp": "2024-11-17T12:22:50",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 3,
      "location": "level-17"
    },
    {
      "id": "txn-0123",
      "timestamp": "2024-11-17T12:10:10",
      "item": "Laptop Bag",
      "action": "subtract",
      "volume": 1,
      "location": "darwin"
    },
    {
      "id": "txn-0122",
      "timestamp": "2024-11-17T12:10:03",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 10,
      "location": "darwin"
    },
    {
      "id": "txn-0121",
      "timestamp": "2024-11-17T12:09:56",
      "item": "Dock Thunderbolt G2",
      "action": "add",
      "volume": 25,
      "location": "darwin"
    },
    {
      "id": "txn-0161",
      "timestamp": "2024-11-17T12:09:49",
      "item": "Laptop 840 G6",
      "action": "add",
      "volume": 2,
      "location": "basement-4.3"
    },
    {
      "id": "txn-0026",
      "timestamp": "2024-11-17T12:01:23",
      "item": "Monitor 24\"",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0088",
      "timestamp": "2024-11-17T11:36:36",
      "item": "Monitor 24\"",
      "action": "subtract",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0025",
      "timestamp": "2024-11-17T11:36:27",
      "item": "Dock Thunderbolt Slim",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0024",
      "timestamp": "2024-03-10T15:26:54",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0023",
      "timestamp": "2024-03-10T15:26:38",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN464613"
    },
    {
      "id": "txn-0021",
      "timestamp": "2024-03-10T15:26:09",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN008855"
    },
    {
      "id": "txn-0022",
      "timestamp": "2024-03-10T15:26:09",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0020",
      "timestamp": "2024-03-10T15:26:05",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN464613"
    },
    {
      "id": "txn-0019",
      "timestamp": "2024-03-10T15:19:45",
      "item": "Laptop Bag",
      "action": "subtract",
      "volume": 100,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0018",
      "timestamp": "2024-03-10T15:19:13",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 100,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0017",
      "timestamp": "2024-03-10T15:17:23",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0016",
      "timestamp": "2024-03-10T15:17:19",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN686867"
    },
    {
      "id": "txn-0015",
      "timestamp": "2024-03-10T15:17:11",
      "item": "Desktop Mini G9",
      "action": "subtract",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN959584"
    },
    {
      "id": "txn-0013",
      "timestamp": "2024-03-10T15:12:15",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN686867"
    },
    {
      "id": "txn-0014",
      "timestamp": "2024-03-10T15:12:15",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0012",
      "timestamp": "2024-03-10T15:12:05",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN484846"
    },
    {
      "id": "txn-0010",
      "timestamp": "2024-03-10T15:11:48",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN161613"
    },
    {
      "id": "txn-0011",
      "timestamp": "2024-03-10T15:11:48",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0009",
      "timestamp": "2024-03-10T15:11:45",
      "item": "Laptop 840 G10",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN464643"
    },
    {
      "id": "txn-0007",
      "timestamp": "2024-03-10T15:11:33",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN959584"
    },
    {
      "id": "txn-0008",
      "timestamp": "2024-03-10T15:11:33",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 2,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0006",
      "timestamp": "2024-03-10T15:11:29",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2",
      "sanNumber": "SAN787845"
    },
    {
      "id": "txn-0086",
      "timestamp": "2024-03-10T15:07:10",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN787889"
    },
    {
      "id": "txn-0087",
      "timestamp": "2024-03-10T15:07:10",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 3,
      "location": "build-room"
    },
    {
      "id": "txn-0085",
      "timestamp": "2024-03-10T15:07:07",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN565667"
    },
    {
      "id": "txn-0084",
      "timestamp": "2024-03-10T15:07:05",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN232334"
    },
    {
      "id": "txn-0005",
      "timestamp": "2024-03-10T12:00:49",
      "item": "USB DVD-RW Drive",
      "action": "subtract",
      "volume": 4,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0004",
      "timestamp": "2024-03-10T12:00:40",
      "item": "Monitor 24\"",
      "action": "subtract",
      "volume": 3,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0003",
      "timestamp": "2024-03-10T12:00:36",
      "item": "Laptop Bag",
      "action": "add",
      "volume": 3,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0002",
      "timestamp": "2024-03-10T11:24:45",
      "item": "Wired Keyboard",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0001",
      "timestamp": "2024-03-10T11:24:39",
      "item": "Wired Keyboard",
      "action": "add",
      "volume": 1,
      "location": "basement-4.2"
    },
    {
      "id": "txn-0083",
      "timestamp": "2024-02-19T20:49:29",
      "item": "Wireless Headset Poly",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0082",
      "timestamp": "2024-02-04T23:27:10",
      "item": "Wireless Headset Poly",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0081",
      "timestamp": "2024-02-04T23:26:51",
      "item": "Wireless Headset Poly",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0080",
      "timestamp": "2024-02-04T23:26:30",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN55555"
    },
    {
      "id": "txn-0079",
      "timestamp": "2024-02-04T21:24:49",
      "item": "Desktop Mini G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN323232"
    },
    {
      "id": "txn-0078",
      "timestamp": "2024-01-12T10:56:14",
      "item": "Dock Thunderbolt Slim",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0077",
      "timestamp": "2024-01-12T10:55:09",
      "item": "Dock Thunderbolt Slim",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0076",
      "timestamp": "2024-01-12T10:54:20",
      "item": "Laptop 840 G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN120864"
    },
    {
      "id": "txn-0075",
      "timestamp": "2024-01-12T10:54:13",
      "item": "Laptop 840 G9",
      "action": "add",
      "volume": 1,
      "location": "build-room",
      "sanNumber": "SAN120950"
    },
    {
      "id": "txn-0074",
      "timestamp": "2024-01-12T10:53:25",
      "item": "Wired Keyboard",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0073",
      "timestamp": "2024-01-12T10:53:06",
      "item": "Wireless Headset Poly",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0072",
      "timestamp": "2024-01-12T10:52:50",
      "item": "Wired Mouse",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    },
    {
      "id": "txn-0071",
      "timestamp": "2024-01-12T10:52:14",
      "item": "Wired Headset Poly",
      "action": "add",
      "volume": 1,
      "location": "build-room"
    }
  ]
};
